import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [showShield, setShowShield] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setShowShield(true);
      setTimeout(() => setShowShield(false), 2000); // Hide shield after animation
    } else {
      // Success logic
      alert("Subscribed!");
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="container animate-fade-in">
      <div className="newsletter-card glass-panel">
        <h2>Join the Inner Circle</h2>
        <p>Get a weekly digest of simple, high-signal insights on technology, money, and building a meaningful life.</p>
        
        <form className="newsletter-form" onSubmit={handleSubmit} style={{ position: 'relative' }}>
          <input 
            type="email" 
            placeholder="Your best email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <AnimatePresence>
            {showShield && (
              <motion.div
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '10px',
                  width: '60px',
                  height: '60px',
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              >
                {/* Eldritch Shield Mandala SVG */}
                <svg viewBox="0 0 100 100" className="eldritch-shield" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px var(--accent-cyan))' }}>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeDasharray="5,5" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" />
                  <polygon points="50,15 85,75 15,75" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
                  <polygon points="50,85 15,25 85,25" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
                  <circle cx="50" cy="50" r="10" fill="var(--accent-cyan)" opacity="0.5" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <MagneticButton className="btn-primary hover-target" onClick={handleSubmit}>
            Subscribe
          </MagneticButton>
        </form>
      </div>
    </section>
  );
}

