import React from 'react';
import styled from 'styled-components';
import { FaChartLine, FaGithub, FaLinkedin } from 'react-icons/fa';

const FooterSection = styled.footer`
  background: #1e293b;
  color: white;
  padding: 3rem 0 2rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  
  svg {
    color: #6366f1;
    font-size: 1.5rem;
  }
`;

const Copyright = styled.p`
  color: #94a3b8;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    width: 2.5rem;
    height: 2.5rem;
    background: #334155;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      background: #6366f1;
      transform: translateY(-2px);
    }
  }
`;

const Footer = () => {
  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <div>
            <Logo>
              <FaChartLine />
              <span>IntelliTrade</span>
            </Logo>
            <Copyright>
              © 2024 IntelliTrade. AI-Powered Automated Trading Bot for Sentiment-Based Stock Execution.
            </Copyright>
          </div>
          
          <SocialLinks>
            <a href="https://github.com/Aardy-Bond" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/aaryanbondekar/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </SocialLinks>
        </FooterContent>
      </Container>
    </FooterSection>
  );
};

export default Footer; 
