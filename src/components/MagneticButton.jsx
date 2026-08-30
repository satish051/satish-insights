import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className, onClick, href }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const Inner = () => (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      className={`mystic-btn ${className}`}
      onClick={onClick}
    >
      <span className="mystic-btn-content">{children}</span>
      <div className={`mystic-spell ${isHovered ? 'active' : ''}`}>
        <svg viewBox="0 0 100 100" className="spell-circle">
          <circle cx="50" cy="50" r="45" stroke="#F39C12" strokeWidth="1" fill="none" strokeDasharray="5,5" />
          <circle cx="50" cy="50" r="35" stroke="#FFD700" strokeWidth="0.5" fill="none" strokeDasharray="10,2" />
          <polygon points="50,10 85,75 15,75" stroke="#F39C12" strokeWidth="0.5" fill="none" />
          <polygon points="50,90 85,25 15,25" stroke="#FFD700" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} style={{ display: 'inline-block', textDecoration: 'none' }}>
        <Inner />
      </a>
    );
  }

  return <Inner />;
}
