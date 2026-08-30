import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useRenderEngine } from '../context/RenderEngineContext';
import { mysticAudio } from '../utils/mysticAudio';

export default function SentientFAB() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { isLowEndDevice } = useRenderEngine();
  
  // Spring physics for organic floating
  const springConfig = { damping: 15, stiffness: 100, mass: 1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);
  
  const fabRef = useRef(null);

  useEffect(() => {
    if (isLowEndDevice) return; // Disable heavy physics tracking on low-end
    
    let lastTime = performance.now();
    
    const handleMouseMove = (e) => {
      if (!fabRef.current) return;
      
      const rect = fabRef.current.getBoundingClientRect();
      const fabCenterX = rect.left + rect.width / 2;
      const fabCenterY = rect.top + rect.height / 2;
      
      const dx = e.clientX - fabCenterX;
      const dy = e.clientY - fabCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const currentTime = performance.now();
      const dt = currentTime - lastTime;
      lastTime = currentTime;
      
      // Calculate cursor velocity roughly based on distance change over time (dt)
      // If cursor is very close and moving fast towards it, dodge!
      
      if (distance < 150 && !isHovered) {
        // Calculate dodge vector (away from cursor)
        const dodgeX = -(dx / distance) * 80; // Dodge distance
        const dodgeY = -(dy / distance) * 80;
        
        springX.set(dodgeX);
        springY.set(dodgeY);
        
        // Return to center after a short delay
        setTimeout(() => {
          if (!isHovered) {
            springX.set(0);
            springY.set(0);
          }
        }, 400);
      }
    };
    
    // Ambient floating (Figure 8)
    let animationFrameId;
    let time = 0;
    
    const ambientFloat = () => {
      time += 0.02;
      // Only float if it hasn't dodged recently
      if (Math.abs(springX.get()) < 10 && !isHovered) {
        springX.set(Math.sin(time) * 15);
        springY.set(Math.sin(time * 2) * 10);
      }
      animationFrameId = requestAnimationFrame(ambientFloat);
    };

    window.addEventListener('mousemove', handleMouseMove);
    ambientFloat();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isLowEndDevice, springX, springY]);

  const handleHover = (start) => {
    setIsHovered(start);
    if (start) {
      springX.set(0);
      springY.set(0);
      mysticAudio.startHoverHum();
    } else {
      mysticAudio.stopHoverHum();
    }
  };

  return (
    <motion.button
      ref={fabRef}
      className="sentient-fab"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        x: springX,
        y: springY,
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'var(--panel-bg)',
        border: '1px solid var(--panel-border)',
        boxShadow: '0 0 20px var(--shadow-magic)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--accent-cyan)',
        cursor: 'pointer',
        zIndex: 9990
      }}
      onClick={() => window.location.href = '#newsletter'}
    >
      <MessageCircle size={28} />
    </motion.button>
  );
}
