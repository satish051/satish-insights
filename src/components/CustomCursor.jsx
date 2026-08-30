import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('.article-card')) {
        setCursorText("Read");
        setCursorVariant("text");
      } else if (target.closest('.work-card')) {
        setCursorText("Visit ↗");
        setCursorVariant("text");
      } else if (target.closest('.photo-item')) {
        setCursorText("View");
        setCursorVariant("text");
      } else if (target.closest('.cursor-grab') || target.classList?.contains('cursor-grab')) {
        setCursorVariant("grab");
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.classList?.contains('hover-target')
      ) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "transparent",
      borderColor: "var(--text-muted)",
      scale: 1,
      opacity: 1
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "rgba(14, 165, 233, 0.1)",
      borderColor: "rgba(14, 165, 233, 0)",
      scale: 1.5,
      opacity: 1
    },
    grab: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "rgba(14, 165, 233, 0.2)",
      borderColor: "rgba(14, 165, 233, 0)",
      scale: 1.8,
      opacity: 0.8
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 20,
      width: 80,
      height: 40,
      borderRadius: "8px",
      backgroundColor: "var(--panel-bg)",
      borderColor: "var(--accent-cyan)",
      scale: 1,
      opacity: 1
    }
  };

  const textSpring = { type: "spring", stiffness: 400, damping: 28 };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .custom-cursor-dot, .custom-cursor-outline, .custom-cursor-trail {
            display: none !important;
          }
        }
      `}</style>

      {/* Magic Trails */}
      {[0.05, 0.1, 0.15, 0.2].map((delay, i) => {
        const opacities = [0.6, 0.4, 0.2, 0.1];
        const sizes = [6, 4, 3, 2];
        return (
          <motion.div
            key={i}
            className="custom-cursor-trail"
            animate={{
              x: mousePosition.x - sizes[i] / 2,
              y: mousePosition.y - sizes[i] / 2,
              scale: cursorVariant !== "default" ? 0 : 1
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 28,
              delay: delay
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: sizes[i],
              height: sizes[i],
              borderRadius: "50%",
              backgroundColor: "#F39C12",
              boxShadow: "0 0 10px #F39C12",
              opacity: opacities[i],
              pointerEvents: 'none',
              zIndex: 9998
            }}
          />
        );
      })}

      {/* Main Spark */}
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: cursorVariant !== "default" ? 0 : 1
        }}
        transition={textSpring}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#FFD700",
          boxShadow: "0 0 15px #FFD700",
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />

      {/* Outer Ring / Label */}
      <motion.div
        className="custom-cursor-outline"
        variants={variants}
        animate={cursorVariant}
        transition={textSpring}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          border: '1px solid',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden'
        }}
      >
        {cursorVariant === "text" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
              whiteSpace: 'nowrap'
            }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
