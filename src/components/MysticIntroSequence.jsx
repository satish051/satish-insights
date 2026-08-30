import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mysticAudio } from '../utils/mysticAudio';

export default function MysticIntroSequence({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 0.0s - Stage 0: The Spark
    const t1 = setTimeout(() => {
      setStage(2); // 1.0s - Stage 2: Seal of Vishanti
    }, 1000);

    const t2 = setTimeout(() => {
      setStage(3); // 2.5s - Stage 3: The Breach
      try { mysticAudio.playPortalOpen(); } catch(e){}
    }, 2500);

    const t3 = setTimeout(() => {
      onComplete(); // 4.0s - Intro Finished
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
