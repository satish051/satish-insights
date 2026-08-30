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
    <motion.div
      initial={{ opacity: 0, rotateY: 90, scale: 0.5 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }}
      exit={{ opacity: 0, rotateY: -90, scale: 0.5, transition: { duration: 0.4, ease: "easeIn" } }}
      style={{ transformOrigin: 'center', perspective: '1200px', width: '100%' }}
    >
      {children}
    </motion.div>
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
