import React from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle Theme"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-muted)',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.g
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 45 : 0,
            opacity: isDark ? 0 : 1
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ originX: '12px', originY: '12px' }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>

        <motion.circle
          cx="12"
          cy="12"
          r={isDark ? "8" : "5"}
          initial={false}
          animate={{
            r: isDark ? 8 : 5
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          fill="currentColor"
        />

        <motion.circle
          cx="12"
          cy="12"
          r="8"
          fill="var(--bg-color, #0f172a)"
          initial={false}
          animate={{
            cx: isDark ? 16 : 30,
            cy: isDark ? 8 : 0,
            opacity: isDark ? 1 : 0
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          stroke="none"
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;
