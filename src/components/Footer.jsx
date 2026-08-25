import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Zap } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" onClick={scrollToTop} className="logo text-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Zap size={24} /> Satish Insights
            </Link>
            <p className="footer-text" style={{ marginBottom: '24px', maxWidth: '300px', textAlign: 'left' }}>
              Exploring the intersections of code, wealth creation, and living a meaningful life.
            </p>
            <div className="footer-socials" style={{ justifyContent: 'flex-start' }}>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter size={20} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links Column */}
          <div className="footer-links-col">
            <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Navigation</h4>
            <Link to="/" onClick={scrollToTop}>Home</Link>
            <a href="/#works">My Works</a>
            <a href="/#insights">Latest Insights</a>
          </div>

          {/* Legal Column */}
          <div className="footer-links-col">
            <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>Legal</h4>
            <Link to="/privacy" onClick={scrollToTop}>Privacy Policy</Link>
            <Link to="/terms" onClick={scrollToTop}>Terms of Service</Link>
            <a href="mailto:contact@satishinsights.com">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text">© {new Date().getFullYear()} Satish Insights. All ideas are simple.</p>
        </div>
      </div>
    </footer>
  );
}
