import React from 'react';
import { motion } from 'framer-motion';

const RevealText = ({ children, as = 'h2', className = '', direction = 'left', delay = 0 }) => {
  const Component = motion.create(as);
  
  const clipPathStart = direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
  const clipPathEnd = 'inset(0 0 0 0)';
  
  return (
    <Component
      className={className}
      initial={{ clipPath: clipPathStart }}
      whileInView={{ clipPath: clipPathEnd }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeInOut', delay }}
    >
      {children}
    </Component>
  );
};

export default RevealText;
