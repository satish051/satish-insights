import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { name: 'Home', href: '/', isLink: true },
  { name: 'Works', href: '/#works' },
  { name: 'Photography', href: '/#photography' },
  { name: 'Insights', href: '/#insights' },
  { name: 'Newsletter', href: '/#newsletter' },
];

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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
    <motion.header 
      className="site-header"
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="container header-inner">
        <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }}>
          <Link to="/" onClick={handleHomeClick} className="logo text-gradient" style={{ display: 'flex', alignItems: 'center' }}>
            <Zap size={28} />
          </Link>
        </motion.div>
        
        <nav className="nav-links" style={{ position: 'relative' }} onMouseLeave={() => setHoveredIndex(null)}>
          {NAV_ITEMS.map((item, index) => (
            <div key={item.name} style={{ position: 'relative' }} onMouseEnter={() => setHoveredIndex(index)}>
              {item.isLink ? (
                <Link to={item.href} onClick={handleHomeClick} style={{ position: 'relative', zIndex: 10, padding: '6px 12px' }}>
                  {item.name}
                </Link>
              ) : (
                <a href={item.href} style={{ position: 'relative', zIndex: 10, padding: '6px 12px' }}>
                  {item.name}
                </a>
              )}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-pill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--panel-border)',
                    borderRadius: '20px',
                    zIndex: 0
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </div>
          ))}
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--text-muted)', margin: 'auto 8px', opacity: 0.3 }} />
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
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
            {NAV_ITEMS.map((item) => (
              item.isLink ? (
                <Link key={item.name} to={item.href} onClick={handleHomeClick}>{item.name}</Link>
              ) : (
                <a key={item.name} href={item.href} onClick={closeMobileMenu}>{item.name}</a>
              )
            ))}
            <div 
              onClick={toggleTheme} 
              style={{
                cursor: 'pointer', 
                color: 'var(--text-muted)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '16px'
              }}
            >
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} /> 
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
