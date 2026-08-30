import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';
import { mysticAudio } from '../utils/mysticAudio';

const TiltCard = ({ children, className = '', style = {} }) => {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setMousePosition({ x: mouseX, y: mouseY });
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    rotateX.set(-yPct * 12);
    rotateY.set(xPct * 12);
    
    // Dynamically change pitch based on X/Y coordinates over the card!
    mysticAudio.updateCardHum(xPct, yPct);
  }, [isMobile, rotateX, rotateY]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovered(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovered(false);
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [isMobile, rotateX, rotateY]);

  const spotlightColor = 'rgba(243, 156, 18, 0.15)'; // Eldritch Orange

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ perspective: '1000px', ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Children (links/cards) — always on top and fully clickable */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>

        {/* Spotlight + shine overlays — purely decorative, no pointer events */}
        {isHovered && !isMobile && (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 100%)`,
                zIndex: 3,
                borderRadius: 'inherit',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '-100%',
                left: '-100%',
                width: '50%',
                height: '300%',
                background: 'linear-gradient(to right, transparent, rgba(255,215,0,0.1), transparent)', // Gold shine
                transform: `rotate(45deg) translateX(${mousePosition.x - 200}px)`,
                pointerEvents: 'none',
                zIndex: 3,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;
