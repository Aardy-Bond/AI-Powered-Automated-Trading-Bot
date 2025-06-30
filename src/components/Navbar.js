import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
  z-index: 100;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #6366f1;
  cursor: pointer;
  
  svg {
    font-size: 1.5rem;
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    color: #6366f1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 0;
    height: 2px;
    background: #6366f1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const Navbar = ({ currentPage, setCurrentPage }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NavbarContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContent>
        <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FaChartLine />
          <span>IntelliTrade</span>
        </Logo>
        
        <NavMenu>
          <NavLink onClick={() => scrollToSection('features')}>
            Features
          </NavLink>
          <NavLink onClick={() => scrollToSection('how-it-works')}>
            How It Works
          </NavLink>
          <NavLink onClick={() => scrollToSection('dashboard')}>
            Dashboard
          </NavLink>
        </NavMenu>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar; 