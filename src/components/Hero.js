import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

const HeroSection = styled.section`
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)``;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #1e293b;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #6366f1, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 3rem;
  line-height: 1.7;
`;

const HeroStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Stat = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #6366f1;
  display: block;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const HeroVisual = styled(motion.div)``;

const TradingCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border: 1px solid #e2e8f0;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  
  svg {
    color: #6366f1;
    font-size: 1.25rem;
  }
  
  span {
    font-weight: 600;
    flex: 1;
  }
`;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
`;

const Metric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const MetricLabel = styled.span`
  color: #64748b;
  font-size: 0.875rem;
`;

const MetricValue = styled.span`
  font-weight: 600;
  font-size: 1.125rem;
  color: ${props => props.positive ? '#10b981' : '#1e293b'};
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContainer>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI-Powered Automated Trading Bot{' '}
            <GradientText>for Sentiment-Based Stock Execution</GradientText>
          </HeroTitle>
          
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Leverage advanced AI models to analyze financial news sentiment and automatically 
            execute profitable trades on Zerodha. Real-time processing with FinBERT and 
            Gemini AI integration.
          </HeroDescription>
          
          <HeroStats
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Stat
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatNumber>99.2%</StatNumber>
              <StatLabel>Accuracy</StatLabel>
            </Stat>
            <Stat
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatNumber>24/7</StatNumber>
              <StatLabel>Monitoring</StatLabel>
            </Stat>
            <Stat
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatNumber>Real-time</StatNumber>
              <StatLabel>Execution</StatLabel>
            </Stat>
          </HeroStats>
        </HeroContent>
        
        <HeroVisual
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TradingCard
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <CardHeader>
              <FaRobot />
              <span>AI Trading Engine</span>
              <StatusIndicator />
            </CardHeader>
            
            <Metric>
              <MetricLabel>Sentiment Score</MetricLabel>
              <MetricValue positive>0.87</MetricValue>
            </Metric>
            
            <Metric>
              <MetricLabel>Confidence</MetricLabel>
              <MetricValue>92%</MetricValue>
            </Metric>
            
            <Metric>
              <MetricLabel>Active Trades</MetricLabel>
              <MetricValue>12</MetricValue>
            </Metric>
          </TradingCard>
        </HeroVisual>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero; 