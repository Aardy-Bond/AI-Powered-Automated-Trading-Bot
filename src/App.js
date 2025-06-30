import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';

// Context
import { TradingBotProvider } from './context/TradingBotContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #1e293b;
    background: #ffffff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <TradingBotProvider>
      <Router>
        <GlobalStyle />
        <AppContainer>
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <MainContent>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Features />
                  <HowItWorks />
                  <Dashboard />
                </>
              } />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </MainContent>
          <Footer />
          <NotificationSystem />
        </AppContainer>
      </Router>
    </TradingBotProvider>
  );
}

export default App; 