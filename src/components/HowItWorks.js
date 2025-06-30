import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaNewspaper, FaBrain, FaChartLine, FaRocket } from 'react-icons/fa';

const HowItWorksSection = styled.section`
  padding: 5rem 0;
  background: white;
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

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Step = styled(motion.div)`
  text-align: center;
  position: relative;
`;

const StepNumber = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
`;

const StepIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const StepDescription = styled.p`
  color: #64748b;
  line-height: 1.7;
`;

const ConnectorLine = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #10b981);
  transform: translateX(-50%);
  z-index: -1;
  
  @media (max-width: 768px) {
    display: none;
  }
  
  &:last-child {
    display: none;
  }
`;

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <FaNewspaper />,
      title: "News Monitoring",
      description: "Continuously fetch the latest Indian financial news headlines from NewsData.io API for real-time market intelligence."
    },
    {
      number: 2,
      icon: <FaBrain />,
      title: "AI Analysis",
      description: "Use Gemini AI to extract stock tickers and FinBERT model to analyze sentiment with confidence scoring."
    },
    {
      number: 3,
      icon: <FaChartLine />,
      title: "Decision Making",
      description: "Evaluate sentiment scores against thresholds and retrieve live stock prices for trade quantity calculation."
    },
    {
      number: 4,
      icon: <FaRocket />,
      title: "Trade Execution",
      description: "Automatically execute BUY orders through Zerodha Kite API when all criteria are met with comprehensive logging."
    }
  ];

  return (
    <HowItWorksSection id="how-it-works">
      <Container>
        <SectionTitle>How It Works</SectionTitle>
        <ProcessSteps>
          {steps.map((step, index) => (
            <Step
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <StepNumber>{step.number}</StepNumber>
              <StepIcon>{step.icon}</StepIcon>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
              {index < steps.length - 1 && <ConnectorLine />}
            </Step>
          ))}
        </ProcessSteps>
      </Container>
    </HowItWorksSection>
  );
};

export default HowItWorks; 