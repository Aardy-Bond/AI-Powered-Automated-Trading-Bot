import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Action Types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_KITE_CONFIG: 'SET_KITE_CONFIG',
  SET_LOGIN_STATUS: 'SET_LOGIN_STATUS',
  SET_BOT_STATUS: 'SET_BOT_STATUS',
  UPDATE_STATS: 'UPDATE_STATS',
  ADD_LOG: 'ADD_LOG',
  CLEAR_LOGS: 'CLEAR_LOGS',
  SET_CONFIG: 'SET_CONFIG',
  SET_ERROR: 'SET_ERROR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
};

// Initial State
const initialState = {
  loading: false,
  isLoggedIn: false,
  isBotRunning: false,
  kiteConfig: {
    apiKey: '',
    apiSecret: '',
    accessToken: ''
  },
  config: {
    capitalPerTrade: 25000,
    sentimentThreshold: 0.8,
    colabNotebook: ''
  },
  stats: {
    newsProcessed: 0,
    ordersPlaced: 0,
    successRate: 0
  },
  logs: [],
  notifications: [],
  error: null
};

// Reducer
function tradingBotReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_KITE_CONFIG:
      return { 
        ...state, 
        kiteConfig: { ...state.kiteConfig, ...action.payload } 
      };
    
    case ActionTypes.SET_LOGIN_STATUS:
      return { ...state, isLoggedIn: action.payload };
    
    case ActionTypes.SET_BOT_STATUS:
      return { ...state, isBotRunning: action.payload };
    
    case ActionTypes.UPDATE_STATS:
      return { 
        ...state, 
        stats: { ...state.stats, ...action.payload } 
      };
    
    case ActionTypes.ADD_LOG:
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
        ...action.payload
      };
      
      return {
        ...state,
        logs: [...state.logs.slice(-49), newLog] // Keep only last 50 logs
      };
    
    case ActionTypes.CLEAR_LOGS:
      return { 
        ...state, 
        logs: [{
          id: Date.now(),
          timestamp: new Date().toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }),
          type: 'info',
          message: 'Activity log cleared'
        }]
      };
    
    case ActionTypes.SET_CONFIG:
      return { 
        ...state, 
        config: { ...state.config, ...action.payload } 
      };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload
        }]
      };
    
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    default:
      return state;
  }
}

// Context
const TradingBotContext = createContext();

// Provider Component
export function TradingBotProvider({ children }) {
  const [state, dispatch] = useReducer(tradingBotReducer, initialState);

  // Actions
  const actions = {
    setLoading: (loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    },

    setKiteConfig: (config) => {
      dispatch({ type: ActionTypes.SET_KITE_CONFIG, payload: config });
    },

    setLoginStatus: (status) => {
      dispatch({ type: ActionTypes.SET_LOGIN_STATUS, payload: status });
    },

    setBotStatus: (status) => {
      dispatch({ type: ActionTypes.SET_BOT_STATUS, payload: status });
    },

    updateStats: (stats) => {
      dispatch({ type: ActionTypes.UPDATE_STATS, payload: stats });
    },

    addLog: (type, message) => {
      dispatch({ 
        type: ActionTypes.ADD_LOG, 
        payload: { type, message } 
      });
    },

    clearLogs: () => {
      dispatch({ type: ActionTypes.CLEAR_LOGS });
    },

    setConfig: (config) => {
      dispatch({ type: ActionTypes.SET_CONFIG, payload: config });
    },

    setError: (error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    },

    addNotification: (type, message) => {
      const id = Date.now();
      dispatch({ 
        type: ActionTypes.ADD_NOTIFICATION, 
        payload: { type, message } 
      });
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
      }, 5000);
    },

    removeNotification: (id) => {
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
    },

    // API Actions
    initiateKiteLogin: async () => {
      try {
        actions.setLoading(true);
        
        const { apiKey, apiSecret } = state.kiteConfig;
        if (!apiKey || !apiSecret) {
          actions.addNotification('error', 'Please enter both API Key and API Secret');
          return;
        }

        // Simulate Kite login (in real implementation, this would redirect to Kite)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock successful login
        actions.setKiteConfig({ accessToken: `mock_token_${Date.now()}` });
        actions.setLoginStatus(true);
        actions.addLog('success', '✅ Successfully connected to Zerodha Kite');
        actions.addLog('info', '🔑 Access token generated successfully');
        actions.addLog('info', '📡 Ready to start trading bot');
        actions.addNotification('success', 'Successfully connected to Zerodha Kite!');
        
      } catch (error) {
        actions.setError(error.message);
        actions.addNotification('error', 'Failed to connect to Kite');
      } finally {
        actions.setLoading(false);
      }
    },

    startTradingBot: async () => {
      try {
        if (!state.isLoggedIn) {
          actions.addNotification('error', 'Please login to Kite first');
          return;
        }

        if (!state.config.colabNotebook) {
          actions.addNotification('error', 'Please enter your Google Colab notebook URL');
          return;
        }

        actions.setBotStatus(true);
        actions.addLog('success', '🚀 Trading bot started successfully');
        actions.addLog('info', '🔗 Connected to Google Colab notebook');
        actions.addLog('info', '📰 Starting news analysis pipeline...');
        actions.addNotification('success', 'Trading bot started successfully!');

        // Start simulated bot activity
        actions.simulateBotActivity();

      } catch (error) {
        actions.setError(error.message);
        actions.addNotification('error', 'Failed to start trading bot');
      }
    },

    stopTradingBot: () => {
      actions.setBotStatus(false);
      actions.addLog('info', '⏹️ Trading bot stopped');
      actions.addNotification('info', 'Trading bot stopped');
    },

    simulateBotActivity: () => {
      if (!state.isBotRunning) return;

      const activities = [
        {
          message: 'Fetched 15 latest financial headlines from NewsData.io',
          type: 'info',
          processNews: true
        },
        {
          message: 'Analyzing sentiment: "Reliance Industries reports 12% profit growth" - Sentiment: positive (0.89)',
          type: 'success',
          processNews: true
        },
        {
          message: 'Ticker extracted: RELIANCE - Live price: ₹2,847.50',
          type: 'info'
        },
        {
          message: 'Criteria met! Placing BUY order for 8 shares of RELIANCE',
          type: 'success',
          placeOrder: true
        },
        {
          message: 'ORDER EXECUTED: Bought 8 shares of RELIANCE at market price. Order ID: 240115001234',
          type: 'success',
          placeOrder: true
        }
      ];

      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      actions.addLog(randomActivity.type, randomActivity.message);

      // Update stats
      if (randomActivity.processNews) {
        actions.updateStats({ 
          newsProcessed: state.stats.newsProcessed + 1 
        });
      }

      if (randomActivity.placeOrder) {
        actions.updateStats({ 
          ordersPlaced: state.stats.ordersPlaced + 1,
          successRate: Math.min(95, state.stats.successRate + Math.random() * 5)
        });
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    actions.addLog('info', '🎯 Application initialized successfully');
    actions.addLog('info', '📋 Please connect to your Zerodha account to begin trading');
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let interval;
    if (state.isBotRunning) {
      interval = setInterval(() => {
        actions.simulateBotActivity();
      }, Math.random() * 3000 + 2000);
    }
    return () => clearInterval(interval);
  }, [state.isBotRunning]);

  return (
    <TradingBotContext.Provider value={{ state, actions }}>
      {children}
    </TradingBotContext.Provider>
  );
}

// Hook to use context
export function useTradingBot() {
  const context = useContext(TradingBotContext);
  if (!context) {
    throw new Error('useTradingBot must be used within a TradingBotProvider');
  }
  return context;
} 