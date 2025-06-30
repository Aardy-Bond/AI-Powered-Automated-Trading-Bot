# trading_bot.py
"""Automated Financial News Sentiment Trading Bot
Run this script inside Google Colab after storing all required keys via google.colab.userdata.
"""

# -------------------------- INSTALL DEPENDENCIES --------------------------
# Note: In Colab you can run the following once per session. Commented here
# so that importing this module doesn't re-install packages automatically.
# !pip install -q google-generativeai kiteconnect transformers torch requests

import requests
import json
import re
import time
from datetime import datetime

import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import google.generativeai as genai
from kiteconnect import KiteConnect
from google.colab import userdata

# ------------------------------- CONFIG -----------------------------------
NEWSDATA_API_KEY = userdata.get("NEWSDATA_API_KEY")
GEMINI_API_KEY = userdata.get("GEMINI_API_KEY")
ZERODHA_API_KEY = userdata.get("ZERODHA_API_KEY")
ZERODHA_ACCESS_TOKEN = userdata.get("ZERODHA_ACCESS_TOKEN")

CAPITAL_PER_TRADE: int = 25_000  # INR

assert all([
    NEWSDATA_API_KEY,
    GEMINI_API_KEY,
    ZERODHA_API_KEY,
    ZERODHA_ACCESS_TOKEN,
]), (
    "❌ One or more credentials missing. Use google.colab.userdata.set to store them first."
)

# ----------------------- INITIALISE EXTERNAL SERVICES ---------------------

genai.configure(api_key=GEMINI_API_KEY)
_gemini_model = genai.GenerativeModel("gemini-2.0-flash")

tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
finbert_model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")
label_map = finbert_model.config.id2label

kite = KiteConnect(api_key=ZERODHA_API_KEY)
kite.set_access_token(ZERODHA_ACCESS_TOKEN)


# -------------------------------- HELPERS ---------------------------------

def log(msg: str) -> None:
    """Time-stamped console logger."""
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] - {msg}")


def get_sentiment(text: str):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = finbert_model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)
        score, idx = torch.max(probs, dim=1)
    return label_map[idx.item()], score.item()


ticker_cache: dict[str, tuple[str, str]] = {}


def extract_ticker(headline: str):
    """Use Gemini to map headline to (company, NSE ticker). Returns (None, None) on failure."""
    key = headline.lower().strip()
    if key in ticker_cache:
        return ticker_cache[key]

    prompt = (
        "You are a seasoned financial analyst specializing in Indian stock markets.\n\n"
        f"Headline: \"{headline}\"\n\n"
        "Return ONLY valid JSON:\n"
        "{\"company_name\": \"Full Official Company Name\", \"ticker_symbol\": \"NSE_SYMBOL\"}"
    )

    try:
        response = _gemini_model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.1,
                max_output_tokens=120,
            ),
        )
        text = response.text.strip()
        text = re.sub(r"^```json|```$", "", text).strip()
        data = json.loads(text)
        ticker_cache[key] = (data["company_name"], data["ticker_symbol"])
        return data["company_name"], data["ticker_symbol"]
    except Exception as exc:
        log(f"Gemini error: {exc}")
        return None, None


def fetch_recent_headlines(limit: int = 15):
    url = "https://newsdata.io/api/1/latest"
    params = {
        "apikey": NEWSDATA_API_KEY,
        "q": "finance OR stock OR IPO OR investment OR market OR NSE OR BSE",
        "country": "in",
        "language": "en",
        "category": "business",
    }

    try:
        resp = requests.get(url, params=params, timeout=20)
        data = resp.json()
        if data.get("status") != "success":
            log(f"NewsData error: {data.get('message')}")
            return []
        articles = [a for a in data.get("results", []) if "title" in a]
        articles.sort(key=lambda x: x.get("pubDate", ""), reverse=True)
        return [{"title": a["title"], "published": a.get("pubDate")} for a in articles][:limit]
    except Exception as exc:
        log(f"Error fetching news: {exc}")
        return []

# --------------------------------- CORE -----------------------------------

def run_trading_bot():
    log("=" * 90)
    log("🚀 Starting trading bot")
    log("=" * 90)

    headlines = fetch_recent_headlines()
    if not headlines:
        log("No headlines found. Exiting.")
        return

    for idx, item in enumerate(headlines, 1):
        headline = item["title"]
        log(f"[{idx}/{len(headlines)}] - NEWS: \"{headline}\"")

        company, symbol = extract_ticker(headline)
        if not (company and symbol):
            log("Ticker not identified. Skipping.")
            continue

        sentiment, confidence = get_sentiment(headline)
        log(f"Sentiment: {sentiment} (confidence={confidence:.3f})")

        if sentiment.lower() != "positive" or confidence <= 0.8:
            log("Criteria not met. Skipping trade.")
            continue

        try:
            ltp_data = kite.ltp(f"NSE:{symbol}")
            live_price = ltp_data[f"NSE:{symbol}"]["last_price"]
            log(f"Live price for {symbol}: ₹{live_price}")
        except Exception as exc:
            log(f"Failed to fetch live price: {exc}")
            continue

        if CAPITAL_PER_TRADE <= live_price:
            log("Capital per trade insufficient. Skipping.")
            continue

        quantity = int(CAPITAL_PER_TRADE / live_price)
        if quantity <= 0:
            log("Calculated quantity is 0. Skipping.")
            continue

        try:
            order_id = kite.place_order(
                variety=kite.VARIETY_REGULAR,
                exchange=kite.EXCHANGE_NSE,
                tradingsymbol=symbol,
                transaction_type=kite.TRANSACTION_TYPE_BUY,
                quantity=quantity,
                product=kite.PRODUCT_CNC,
                order_type=kite.ORDER_TYPE_MARKET,
            )
            log(
                f"ORDER EXECUTED: Bought {quantity} shares of {symbol} at market price. "
                f"Order ID: {order_id}."
            )
        except Exception as exc:
            log(f"Order placement failed: {exc}")

        time.sleep(0.5)

    log("Completed processing all headlines.")


if __name__ == "__main__":
    run_trading_bot() 