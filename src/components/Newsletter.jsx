import React from 'react';
import MagneticButton from './MagneticButton';

export default function Newsletter() {
  return (
    <section id="newsletter" className="container animate-fade-in">
      <div className="newsletter-card glass-panel">
        <h2>Join the Inner Circle</h2>
        <p>Get a weekly digest of simple, high-signal insights on technology, money, and building a meaningful life.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your best email" required />
          <MagneticButton className="btn-primary hover-target" onClick={(e) => e.target.closest('form').dispatchEvent(new Event('submit'))}>
            Subscribe
          </MagneticButton>
        </form>
      </div>
    </section>
  );
}
