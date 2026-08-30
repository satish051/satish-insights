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
import { mysticAudio } from './utils/mysticAudio';
import EyeOfAgamotto from './components/EyeOfAgamotto';
import SentientFAB from './components/SentientFAB';
import MysticIntroSequence from './components/MysticIntroSequence';

const PageTransition = ({ children }) => {
  React.useEffect(() => {
    try { mysticAudio.playPortalOpen(); } catch(e){}
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* The actual page content, masked by the expanding circle */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ clipPath: 'circle(150% at 50% 50%)', transition: { duration: 0.8, ease: "easeInOut" } }}
        exit={{ clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.8, ease: "easeInOut" } }}
        style={{ width: '100%', minHeight: '100vh' }}
      >
        {children}
      </motion.div>
      
      {/* Golden Portal Ring overlay that expands and fades out */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        exit={{ scale: 0, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '100vmax',
          height: '100vmax',
          x: '-50%',
          y: '-50%',
          borderRadius: '50%',
          border: '10px solid var(--accent-purple)', // Solid gold or neon gold
          boxShadow: '0 0 50px var(--accent-cyan), inset 0 0 50px var(--accent-cyan)',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
    </div>
  );
};

function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = React.useState(() => {
    // Only show intro once per session
    return !sessionStorage.getItem('hasSeenIntro');
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <MysticIntroSequence onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {!showIntro && (
        <>
          <CustomCursor />
          <ScrollToTop />
      
      <ParticleField />
      
      <EyeOfAgamotto />
      <SentientFAB />
      
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
      )}
    </>
  );
}

export default App;
