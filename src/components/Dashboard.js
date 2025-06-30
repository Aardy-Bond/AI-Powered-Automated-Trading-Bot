import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaCog, 
  FaPlay, 
  FaStop, 
  FaTrash, 
  FaSignInAlt,
  FaSpinner
} from 'react-icons/fa';
import { useTradingBot } from '../context/TradingBotContext';

const DashboardSection = styled.section`
  padding: 5rem 0;
  background: white;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1e293b;
`;

// Login Section
const LoginSection = styled(motion.div)`
  margin-bottom: 3rem;
`;

const LoginCard = styled(motion.div)`
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  img {
    height: 3rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1e293b;
  }
  
  p {
    color: #64748b;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #1e293b;
  }
  
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: white;
    
    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
  }
`;

// Dashboard Header
const DashboardHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
`;

const UserDetails = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  p {
    color: #64748b;
    font-size: 0.875rem;
  }
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #10b981;
  
  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  }
`;

// Dashboard Grid
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardCard = styled(motion.div)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  ${props => props.fullWidth && `
    grid-column: 1 / -1;
  `}
`;

const CardHeader = styled.div`
  background: #f8fafc;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
`;

// Buttons
const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  min-width: 140px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: #6366f1;
  color: white;
  width: 100%;
  
  &:hover:not(:disabled) {
    background: #4f46e5;
    transform: translateY(-1px);
  }
`;

const SuccessButton = styled(Button)`
  background: #10b981;
  color: white;
  
  &:hover:not(:disabled) {
    background: #059669;
    transform: translateY(-1px);
  }
`;

const DangerButton = styled(Button)`
  background: #ef4444;
  color: white;
  
  &:hover:not(:disabled) {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
  
  &:hover:not(:disabled) {
    background: #e2e8f0;
    transform: translateY(-1px);
  }
`;

// Activity Log
const ActivityLog = styled.div`
  max-height: 400px;
  overflow-y: auto;
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

const LogEntry = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  .log-time {
    color: ${props => {
      if (props.type === 'error') return '#ef4444';
      if (props.type === 'success') return '#10b981';
      if (props.type === 'info') return '#6366f1';
      return '#64748b';
    }};
    font-weight: 500;
    min-width: 140px;
  }
  
  .log-message {
    color: #1e293b;
    flex: 1;
  }
`;

const Dashboard = () => {
  const { state, actions } = useTradingBot();
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const handleKiteLogin = () => {
    actions.setKiteConfig({ apiKey, apiSecret });
    actions.initiateKiteLogin();
  };

  const handleConfigChange = (field, value) => {
    actions.setConfig({ [field]: value });
  };

  return (
    <DashboardSection id="dashboard">
      <Container>
        <SectionTitle>Trading Dashboard</SectionTitle>
        
        <AnimatePresence mode="wait">
          {!state.isLoggedIn ? (
            <LoginSection
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LoginCard>
                <LoginHeader>
                  <img 
                    src="https://kite.zerodha.com/static/images/kite-logo.svg" 
                    alt="Kite by Zerodha" 
                  />
                  <h3>Connect Your Zerodha Account</h3>
                  <p>Secure login to enable automated trading</p>
                </LoginHeader>
                
                <InputGroup>
                  <label htmlFor="apiKey">API Key</label>
                  <input
                    type="text"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Kite API key"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="apiSecret">API Secret</label>
                  <input
                    type="password"
                    id="apiSecret"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    placeholder="Enter your API secret"
                  />
                </InputGroup>
                
                <PrimaryButton
                  onClick={handleKiteLogin}
                  disabled={state.loading || !apiKey || !apiSecret}
                  whileTap={{ scale: 0.98 }}
                >
                  {state.loading ? (
                    <>
                      <FaSpinner className="spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt />
                      Connect to Kite
                    </>
                  )}
                </PrimaryButton>
              </LoginCard>
            </LoginSection>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardHeader>
                <UserInfo>
                  <UserAvatar>
                    <FaUser />
                  </UserAvatar>
                  <UserDetails>
                    <h3>Connected to Kite</h3>
                    <p>Trading Account Active</p>
                  </UserDetails>
                </UserInfo>
                
                <ConnectionStatus>
                  <div className="status-indicator" />
                  <span>Connected</span>
                </ConnectionStatus>
              </DashboardHeader>
              
              <DashboardGrid>
                {/* Bot Configuration */}
                <DashboardCard
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <CardHeader>
                    <h3>Bot Configuration</h3>
                    <FaCog />
                  </CardHeader>
                  <CardContent>
                    <InputGroup>
                      <label>Capital Per Trade (₹)</label>
                      <input
                        type="number"
                        value={state.config.capitalPerTrade}
                        onChange={(e) => handleConfigChange('capitalPerTrade', parseInt(e.target.value))}
                        min="1000"
                        step="1000"
                      />
                    </InputGroup>
                    
                    <InputGroup>
                      <label>Sentiment Threshold</label>
                      <input
                        type="number"
                        value={state.config.sentimentThreshold}
                        onChange={(e) => handleConfigChange('sentimentThreshold', parseFloat(e.target.value))}
                        min="0.1"
                        max="1.0"
                        step="0.1"
                      />
                    </InputGroup>
                    
                    <InputGroup>
                      <label>Google Colab Notebook URL</label>
                      <input
                        type="url"
                        value={state.config.colabNotebook}
                        onChange={(e) => handleConfigChange('colabNotebook', e.target.value)}
                        placeholder="https://colab.research.google.com/..."
                      />
                    </InputGroup>
                  </CardContent>
                </DashboardCard>
                
                {/* Bot Status */}
                <DashboardCard
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardHeader>
                    <h3>Bot Status</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className={`status-indicator ${state.isBotRunning ? 'active' : 'inactive'}`} />
                      <span>{state.isBotRunning ? 'Active' : 'Inactive'}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div style={{ marginBottom: '2rem' }}>
                      {!state.isBotRunning ? (
                        <SuccessButton
                          onClick={actions.startTradingBot}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaPlay />
                          Start Trading Bot
                        </SuccessButton>
                      ) : (
                        <DangerButton
                          onClick={actions.stopTradingBot}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaStop />
                          Stop Trading Bot
                        </DangerButton>
                      )}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                      <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                          News Processed
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6366f1' }}>
                          {state.stats.newsProcessed}
                        </div>
                      </div>
                      
                      <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                          Orders Placed
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6366f1' }}>
                          {state.stats.ordersPlaced}
                        </div>
                      </div>
                      
                      <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                          Success Rate
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6366f1' }}>
                          {state.stats.successRate.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </DashboardCard>
                
                {/* Activity Log */}
                <DashboardCard
                  fullWidth
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardHeader>
                    <h3>Live Activity Log</h3>
                    <SecondaryButton
                      onClick={actions.clearLogs}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaTrash />
                      Clear Log
                    </SecondaryButton>
                  </CardHeader>
                  <CardContent>
                    <ActivityLog>
                      {state.logs.map((log) => (
                        <LogEntry key={log.id} type={log.type}>
                          <span className="log-time">[{log.timestamp}]</span>
                          <span className="log-message">{log.message}</span>
                        </LogEntry>
                      ))}
                    </ActivityLog>
                  </CardContent>
                </DashboardCard>
              </DashboardGrid>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </DashboardSection>
  );
};

export default Dashboard; 