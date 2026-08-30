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

  // Define geometric shards for the mirror dimension effect
  const shards = [
    'polygon(0% 0%, 100% 0%, 80% 40%, 0% 60%)',
    'polygon(100% 0%, 100% 100%, 60% 80%, 80% 40%)',
    'polygon(0% 60%, 80% 40%, 60% 80%, 0% 100%)',
    'polygon(60% 80%, 100% 100%, 0% 100%)'
  ];

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ perspective: '1200px', ...style, position: 'relative' }}
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
          transformStyle: 'preserve-3d',
        }}
      >
        {/* The Glowing Void underneath the card */}
        <div 
          style={{
            position: 'absolute',
            inset: '-10px',
            background: 'var(--accent-gradient)',
            opacity: isHovered ? 0.4 : 0,
            transition: 'opacity 0.4s ease',
            filter: 'blur(10px)',
            zIndex: 0,
          }}
        />

        {/* The Fractured Shards */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          {shards.map((clipPath, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                inset: 0,
                clipPath,
                backgroundColor: 'var(--panel-bg)',
                border: '1px solid var(--panel-border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transform: isHovered && !isMobile
                  ? `translateZ(${10 + index * 5}px) scale(1.02)`
                  : 'translateZ(0px) scale(1)',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // springy pop
              }}
            />
          ))}
          
          {/* Actual content layered above the shards */}
          <div style={{ position: 'relative', zIndex: 2, transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)', transition: 'transform 0.4s ease' }}>
            {children}
          </div>
        </div>

        {/* Spotlight overlay (dynamic light following cursor) */}
        {isHovered && !isMobile && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 100%)`,
              zIndex: 3,
              borderRadius: 'inherit',
              transform: 'translateZ(40px)', // float light above card
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;
