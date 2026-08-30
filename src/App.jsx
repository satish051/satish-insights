import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Article from './pages/Article';
import Category from './pages/Category';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CustomCursor from './components/CustomCursor';
import NotFound from './pages/NotFound';
import Transcript from './pages/Transcript';
import ParticleField from './components/ParticleField';

const PageTransition = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ scaleX: 1, originX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ scaleX: 1, originX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--accent-gradient)',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />
      {children}
    </>
  );
};

function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      
      <ParticleField />
      
      <div className="app-container">
        <Header />
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/article/:slug" element={<Article />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/transcript" element={<Transcript />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}

export default App;
