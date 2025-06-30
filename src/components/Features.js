import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBrain, FaRocket, FaShieldAlt, FaNewspaper, FaChartLine, FaCog } from 'react-icons/fa';

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background: #f8fafc;
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.7;
`;

const Features = () => {
  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Analysis",
      description: "Advanced sentiment analysis using FinBERT model to evaluate financial news and market sentiment with high accuracy."
    },
    {
      icon: <FaNewspaper />,
      title: "Real-time News Processing",
      description: "Continuous monitoring of financial news from multiple sources with automated ticker extraction using Gemini AI."
    },
    {
      icon: <FaRocket />,
      title: "Automated Execution",
      description: "Instant trade execution through Zerodha Kite API when sentiment criteria and confidence thresholds are met."
    },
    {
      icon: <FaShieldAlt />,
      title: "Risk Management",
      description: "Built-in capital management with configurable trade limits and comprehensive audit logging for all activities."
    },
    {
      icon: <FaChartLine />,
      title: "Live Dashboard",
      description: "Real-time monitoring of bot performance, trade statistics, and live activity logs with modern web interface."
    },
    {
      icon: <FaCog />,
      title: "Cloud Integration",
      description: "Seamless Google Colab integration for cloud-based execution with secure API key management and configuration."
    }
  ];

  return (
    <FeaturesSection id="features">
      <Container>
        <SectionTitle>Key Features</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default Features; 