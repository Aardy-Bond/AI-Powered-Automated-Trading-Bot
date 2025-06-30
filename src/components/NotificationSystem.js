import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useTradingBot } from '../context/TradingBotContext';

const NotificationContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 768px) {
    left: 1rem;
    right: 1rem;
    top: 1rem;
  }
`;

const Notification = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${props => {
    if (props.type === 'success') return '#10b981';
    if (props.type === 'error') return '#ef4444';
    if (props.type === 'warning') return '#f59e0b';
    return '#6366f1';
  }};
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 300px;
  max-width: 400px;
`;

const NotificationIcon = styled.div`
  color: ${props => {
    if (props.type === 'success') return '#10b981';
    if (props.type === 'error') return '#ef4444';
    if (props.type === 'warning') return '#f59e0b';
    return '#6366f1';
  }};
  font-size: 1.25rem;
`;

const NotificationContent = styled.div`
  flex: 1;
  color: #1e293b;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const NotificationSystem = () => {
  const { state, actions } = useTradingBot();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationTriangle />;
      case 'warning':
        return <FaExclamationTriangle />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <NotificationContainer>
      <AnimatePresence>
        {state.notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <NotificationIcon type={notification.type}>
              {getIcon(notification.type)}
            </NotificationIcon>
            <NotificationContent>
              {notification.message}
            </NotificationContent>
            <CloseButton
              onClick={() => actions.removeNotification(notification.id)}
            >
              <FaTimes />
            </CloseButton>
          </Notification>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
};

export default NotificationSystem; 