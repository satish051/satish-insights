import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (document.body.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const handleHomeClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" onClick={handleHomeClick} className="logo text-gradient" style={{ display: 'flex', alignItems: 'center' }}>
          <Zap size={28} />
        </Link>
        
        <nav className="nav-links">
          <Link to="/" onClick={handleHomeClick}>Home</Link>
          <a href="/#topics">Topics</a>
          <a href="/#works">Works</a>
          <a href="/#insights">Insights</a>
          <a href="/#newsletter">Newsletter</a>
          <button onClick={toggleTheme} className="theme-toggle" style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', transition: 'color 0.3s ease'}}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer'}}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu glass-panel"
          >
            <Link to="/" onClick={handleHomeClick}>Home</Link>
            <a href="/#topics" onClick={closeMobileMenu}>Topics</a>
            <a href="/#works" onClick={closeMobileMenu}>Works</a>
            <a href="/#insights" onClick={closeMobileMenu}>Insights</a>
            <a href="/#newsletter" onClick={closeMobileMenu}>Newsletter</a>
            <button onClick={toggleTheme} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', padding: '16px'}}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />} 
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
