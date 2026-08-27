import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Zap } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <style>{`
        .social-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
        }
        .social-icon-wrapper .tooltip {
          position: absolute;
          bottom: 100%;
          margin-bottom: 8px;
          background: var(--panel-border);
          color: var(--text-main);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(5px);
          transition: all 0.3s ease;
          white-space: nowrap;
          pointer-events: none;
        }
        .social-icon-wrapper:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .social-twitter:hover { color: #1DA1F2 !important; }
        .social-linkedin:hover { color: #0A66C2 !important; }
        body.dark .social-github:hover { color: #fff !important; }
        body:not(.dark) .social-github:hover { color: #333 !important; }
      `}</style>
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
            <div className="footer-socials" style={{ justifyContent: 'flex-start', display: 'flex', gap: '16px' }}>
              <MagneticButton>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-wrapper social-twitter" style={{ transition: 'color 0.3s ease' }}>
                  <Twitter size={20} />
                  <span className="tooltip">Twitter</span>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-wrapper social-github" style={{ transition: 'color 0.3s ease' }}>
                  <Github size={20} />
                  <span className="tooltip">Github</span>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-wrapper social-linkedin" style={{ transition: 'color 0.3s ease' }}>
                  <Linkedin size={20} />
                  <span className="tooltip">LinkedIn</span>
                </a>
              </MagneticButton>
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
