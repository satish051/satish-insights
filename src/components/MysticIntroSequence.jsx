import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mysticAudio } from '../utils/mysticAudio';

export default function MysticIntroSequence({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // We can't auto-play audio reliably without interaction, 
    // but we can try playing it as the sequence progresses if the user happened to click.
    // If not, it will just be a visual spectacle.

    // Sequence Timing
    // 0.0s - Stage 0: The Spark
    const t1 = setTimeout(() => {
      setStage(1); // 1.0s - Stage 1: The Flipbook
    }, 1000);

    const t2 = setTimeout(() => {
      setStage(2); // 3.5s - Stage 2: Seal of Vishanti
    }, 3500);

    const t3 = setTimeout(() => {
      setStage(3); // 5.0s - Stage 3: The Breach
      try { mysticAudio.playPortalOpen(); } catch(e){}
    }, 5000);

    const t4 = setTimeout(() => {
      onComplete(); // 6.5s - Intro Finished
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000',
        zIndex: 9999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence>
        {/* Stage 0: The Spark */}
        {stage === 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#F39C12',
              borderRadius: '50%',
              boxShadow: '0 0 20px 5px #F39C12, 0 0 40px 10px #FFD700'
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Stage 1: The Flipbook */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            className="intro-flipbook"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 900,
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '-2px',
              textTransform: 'uppercase',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              // Using CSS repeating gradients and rapid animation to simulate the flashing images
              backgroundImage: 'repeating-conic-gradient(from 0deg, #0B0C10 0deg 10deg, #F39C12 10deg 20deg, #FFD700 20deg 30deg, #8B5CF6 30deg 40deg)',
              backgroundSize: '200% 200%',
              animation: 'flipbook-flash 0.1s infinite alternate'
            }}
          >
            SATISH INSIGHTS
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Stage 2 & 3: Seal of Vishanti & The Breach */}
        {(stage === 2 || stage === 3) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              scale: stage === 3 ? 15 : 1, // The Breach zooms past camera
              rotate: stage === 3 ? 45 : 0
            }}
            transition={{ 
              duration: stage === 3 ? 1.5 : 0.5, 
              ease: stage === 3 ? "easeIn" : "easeOut" 
            }}
            style={{ position: 'absolute', width: '80vmin', height: '80vmin' }}
          >
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <g fill="none" stroke="#F39C12" strokeWidth="1.5" className="vishanti-lines">
                <circle cx="50" cy="50" r="48" />
                <circle cx="50" cy="50" r="44" />
                <circle cx="50" cy="50" r="25" />
                {/* Internal Geometry */}
                <path d="M50,6 Q94,50 50,94 Q6,50 50,6" />
                <path d="M25,25 L75,75 M25,75 L75,25" />
                <path d="M50,25 A25,25 0 0,1 75,50 A25,25 0 0,1 50,75 A25,25 0 0,1 25,50 A25,25 0 0,1 50,25" />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Blinding Flash on Breach */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }} // Flash at the very end of the breach
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#fff',
              zIndex: 10
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes flipbook-flash {
          0% { background-position: 0% 0%; filter: hue-rotate(0deg); }
          50% { background-position: 100% 100%; filter: hue-rotate(90deg); }
          100% { background-position: 50% 50%; filter: hue-rotate(180deg); }
        }
        .vishanti-lines {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: draw-seal 1.5s ease-out forwards;
        }
        @keyframes draw-seal {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
