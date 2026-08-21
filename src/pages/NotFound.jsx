import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import Newsletter from '../components/Newsletter';

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'center' }}
    >
      <section className="container" style={{ textAlign: 'center', padding: '120px 0' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Compass size={80} style={{ color: 'var(--text-muted)', marginBottom: '32px', opacity: 0.5 }} />
          <h1 className="text-gradient" style={{ fontSize: '5rem', marginBottom: '16px' }}>404</h1>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Wandering Off the Path?</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 40px' }}>
            The insight you are looking for seems to have vanished or moved to a new dimension.
          </p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Home size={18} /> Return to Home
          </Link>
        </motion.div>
      </section>
      
      <Newsletter />
    </motion.main>
  );
}
