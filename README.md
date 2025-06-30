# Automated Financial News Sentiment Trading Bot

## Overview

This project implements an end-to-end trading bot that:

1. Gathers the latest Indian business & financial news headlines via NewsData.io.
2. Extracts the most probable NSE ticker symbol for each headline using Google Gemini.
3. Runs sentiment analysis on the headline with FinBERT.
4. Executes **BUY** market orders on Zerodha's Kite Connect API when:
   - Sentiment is **positive** **and** confidence > 0.80, **and**
   - The trade can be funded with `CAPITAL_PER_TRADE`.
5. Logs every step with precise, readable timestamps for complete auditability.

All computation happens inside **Google Colab** with a beautiful web frontend for easy control and monitoring.

---

## 🌟 New Frontend Features

### Modern Web Interface

- **Professional Landing Page** with project overview and features
- **Secure Zerodha Integration** with API key management
- **Real-time Dashboard** with live activity logs and statistics
- **Google Colab Integration** for seamless notebook execution
- **Responsive Design** that works on desktop and mobile

### Key Features

- ✅ One-click Zerodha Kite Connect login
- ✅ Real-time trading bot status and controls
- ✅ Live activity log with timestamped entries
- ✅ Configuration management (capital, thresholds)
- ✅ Statistics tracking (news processed, orders placed, success rate)
- ✅ Beautiful, modern UI with smooth animations

---

## Quick Start (Three Options)

### Option 1: Web Interface (Recommended)

1. **Open the web interface** by opening `index.html` in your browser
2. **Connect to Zerodha** using your API credentials
3. **Configure settings** (capital per trade, sentiment threshold)
4. **Add your Google Colab notebook URL**
5. **Click "Start Trading Bot"** to begin automated trading

### Option 2: Google Colab Only

1. **Open the notebook** `trading_bot.ipynb` in Colab.
2. **Save your API keys** in the current Colab runtime:

```python
from google.colab import userdata

# News & LLM keys
userdata.set("NEWSDATA_API_KEY", "<YOUR_NEWSDATA_API_KEY>")
userdata.set("GEMINI_API_KEY", "<YOUR_GEMINI_API_KEY>")

# Zerodha / Kite Connect keys
userdata.set("ZERODHA_API_KEY", "<YOUR_ZERODHA_API_KEY>")
userdata.set("ZERODHA_API_SECRET", "<YOUR_ZERODHA_API_SECRET>")  # needed only if you generate a fresh session
userdata.set("ZERODHA_ACCESS_TOKEN", "<YOUR_ACCESS_TOKEN>")       # see below
```

These values are stored **only** for the current Colab session and are never persisted.

3. **Generate `ACCESS_TOKEN` once per day** (optional)

   ```python
   from kiteconnect import KiteConnect

   kite = KiteConnect(api_key="<YOUR_ZERODHA_API_KEY>")
   request_token = "<REQUEST_TOKEN_FROM_LOGIN_REDIRECT>"
   data = kite.generate_session(request_token, api_secret="<YOUR_ZERODHA_API_SECRET>")
   print(data["access_token"])  # copy-paste this into userdata.set above
   ```

4. **Configure your capital**
   Inside the notebook, change `CAPITAL_PER_TRADE` (default ₹25,000) as desired.

5. **Run all cells**. The bot will:
   • install dependencies • download models • start analysing news • place orders when criteria are met.

### Option 3: React Frontend (Local Development)

1. Ensure you have **Node.js (v16+)** and **npm** installed.
2. From the project root, install JavaScript dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

4. Your default browser should automatically open `http://localhost:3000`. If it doesn't, open the URL manually.
5. Log in with your Zerodha credentials and configure the bot just like in Option 1—changes you make will hot-reload without a full refresh.

---

## Files

| File                                | Purpose                                                            |
| ----------------------------------- | ------------------------------------------------------------------ |
| `index.html`                        | Main web interface with modern UI/UX design                        |
| `styles.css`                        | CSS styling for the web interface                                  |
| `script.js`                         | JavaScript for frontend functionality and Colab integration        |
| `colab_integration.py`              | Python backend for handling Colab and Zerodha API communication    |
| `trading_bot.ipynb`                 | Main Colab-ready notebook with structured cells for easy execution |
| `trading_bot.py`                    | Standalone Python script version (can be imported or run directly) |
| `kiteconnect api documentation.pdf` | Official Zerodha Kite Connect documentation (reference)            |
| `Untitled1.ipynb`                   | Original proof-of-concept sentiment notebook (kept for history)    |

---

## Web Interface Usage

### 1. Landing Page

- **Hero Section** with project overview and key statistics
- **Features Section** highlighting AI capabilities and automation
- **How It Works** step-by-step process explanation

### 2. Dashboard

- **Kite Login** secure credential input and connection
- **Bot Configuration** capital per trade and sentiment threshold settings
- **Bot Controls** start/stop buttons with real-time status
- **Activity Log** live timestamped logs of all bot activities
- **Statistics** real-time tracking of performance metrics

### 3. Integration Flow

```
Web Frontend → JavaScript API Calls → Python Backend → Google Colab → Trading Execution
```

---

## Detailed Logic

1. **Headline Acquisition**
   • Calls [NewsData.io](https://newsdata.io/) endpoint `latest` filtering by business category and Indian region.
2. **Ticker Extraction (Gemini)**
   • Prompts Gemini 2 Flash with the raw headline plus regex-derived company hints.
   • Expects strict JSON `{ "company_name": "…", "ticker_symbol": "…" }`.
3. **Sentiment Analysis (FinBERT)**
   • Uses `ProsusAI/finbert` transformer (3-class: positive / neutral / negative).
4. **Trading Rule**
   ```text
   if sentiment == "positive" and confidence > 0.80:
       live_price = kite.ltp("NSE:<TICKER>")["NSE:<TICKER>"]["last_price"]
       if CAPITAL_PER_TRADE > live_price:
           qty = int(CAPITAL_PER_TRADE / live_price)
           if qty > 0:
               place buy market order (PRODUCT_CNC)
   ```
5. **Logging**
   All messages are prefixed like:
   `[2025-06-07 14:30:00] - NEWS: "Infosys published record quarterly profit"`

---

## Required API Keys

You need to obtain the following API keys before running the bot:

### NewsData.io API

- **Purpose**: Fetch latest Indian financial news headlines
- **How to get**: Sign up at [newsdata.io](https://newsdata.io/) and get your API key
- **Store as**: `NEWSDATA_API_KEY`

### Google Gemini API

- **Purpose**: Extract NSE ticker symbols from news headlines using AI
- **How to get**: Get API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Store as**: `GEMINI_API_KEY`

### Zerodha Kite Connect API

- **Purpose**: Place actual buy orders on NSE
- **How to get**:
  1. Sign up for Kite Connect at [kite.trade](https://kite.trade)
  2. Create an app to get API key
  3. Generate access token daily (see notebook for details)
- **Store as**: `ZERODHA_API_KEY` and `ZERODHA_ACCESS_TOKEN`

---

## Required Packages (auto-installed in notebook)

- `google-generativeai`
- `transformers` + `torch`
- `kiteconnect`
- `requests`

For the web interface (optional, for backend integration):

- `flask`
- `flask-cors`

---

## Development Setup

### Frontend Only

1. Clone the repository
2. Open `index.html` in a modern web browser
3. The interface will work in demo mode without backend

### Full Integration

1. Install Python dependencies: `pip install flask flask-cors requests`
2. Run the backend: `python colab_integration.py`
3. Open `index.html` and configure to use `http://localhost:5000` as API endpoint
4. Connect your Google Colab notebook and Zerodha credentials

---

## Screenshots

### Landing Page

- Modern hero section with gradient design
- Feature cards with animated hover effects
- Step-by-step process timeline

### Dashboard

- Clean, professional layout
- Real-time status indicators
- Live activity log with color-coded entries
- Responsive grid layout

---

## Disclaimer

This repository is a **technology demonstration**. Trading in financial markets involves risk. The authors are **not responsible** for any financial loss. Use at your own discretion.
