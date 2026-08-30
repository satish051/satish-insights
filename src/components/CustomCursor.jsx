import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { mysticAudio } from '../utils/mysticAudio';
import { useRenderEngine } from '../context/RenderEngineContext';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const canvasRef = useRef(null);
  const { isLowEndDevice } = useRenderEngine();

  useEffect(() => {
    let animationFrameId;
    let particles = [];
    let shockwaves = [];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let lastMousePos = { x: -100, y: -100 };
    let isHovering = false;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    class Spark {
      constructor(x, y, isBurst = false, isDark = true) {
        this.x = x;
        this.y = y;
        this.isDark = isDark;
        this.isBurst = isBurst;
        
        if (isBurst) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 12 + 5;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.life = 1.5;
          this.decay = Math.random() * 0.04 + 0.02;
          this.size = Math.random() * 4 + 2;
        } else {
          // Dark = fast sparks, Light = slow dust
          const speedMult = isDark ? 4 : 1.5;
          this.vx = (Math.random() - 0.5) * speedMult;
          this.vy = (Math.random() - 0.5) * speedMult + (isDark ? -2 : 0);
          this.life = 1;
          this.decay = Math.random() * (isDark ? 0.03 : 0.015) + (isDark ? 0.02 : 0.005);
          this.size = Math.random() * (isDark ? 3 : 4) + 1;
        }
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        
        if (this.isDark) {
          this.vy += 0.15; // gravity
          this.vx *= 0.95; // friction
          // Floor collision
          if (this.y + this.size > canvas.height) {
            this.y = canvas.height - this.size;
            this.vy *= -0.6;
            this.vx *= 0.8;
          }
        } else {
          // Motes float
          this.vy += (Math.random() - 0.5) * 0.1;
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vx *= 0.98;
          this.vy *= 0.98;
        }
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.isDark) {
          ctx.fillStyle = `rgba(243, 156, 18, ${this.life})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#F39C12';
        } else {
          ctx.fillStyle = `rgba(184, 134, 11, ${this.life * 0.8})`; // Muted golden dust
          ctx.shadowBlur = 0; // Less expensive for daylight
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Shockwave {
      constructor(x, y, isDark) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.life = 1;
        this.decay = 0.03;
        this.expansionSpeed = 15;
        this.isDark = isDark;
      }
      update() {
        this.radius += this.expansionSpeed;
        this.life -= this.decay;
        this.expansionSpeed *= 0.92;
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.isDark ? `rgba(255, 215, 0, ${this.life})` : `rgba(255, 255, 255, ${this.life * 0.8})`;
        ctx.lineWidth = 4 * this.life;
        if (this.isDark) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#F39C12';
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Calculate velocity for hum
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      lastMousePos = { x: e.clientX, y: e.clientY };

      // Only modulate pitch by velocity if we are NOT inside a card (which modulates by X/Y coordinates)
      const target = e.target;
      if (isHovering && !target.closest('.article-card') && !target.closest('.work-card')) {
        mysticAudio.updateHoverHum(velocity);
      }
      
      if (!isLowEndDevice) {
        const isDark = document.body.classList.contains('dark');
        const amount = isDark ? 3 : 1; // Less motes for daylight
        for (let i = 0; i < amount; i++) {
          particles.push(new Spark(e.clientX, e.clientY, false, isDark));
        }
      }
    };

    const handleMouseDown = (e) => {
      if (isLowEndDevice) return;
      const isDark = document.body.classList.contains('dark');
      shockwaves.push(new Shockwave(e.clientX, e.clientY, isDark));
      for (let i = 0; i < 50; i++) {
        particles.push(new Spark(e.clientX, e.clientY, true, isDark));
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      let newVariant = "default";
      let newText = "";
      
      if (target.closest('.article-card')) {
        newText = "Read"; newVariant = "text";
      } else if (target.closest('.work-card')) {
        newText = "Visit ↗"; newVariant = "text";
      } else if (target.closest('.photo-item')) {
        newText = "View"; newVariant = "text";
      } else if (target.closest('.cursor-grab') || target.classList?.contains('cursor-grab')) {
        newVariant = "grab";
      } else if (target.closest('a') || target.closest('button') || target.classList?.contains('hover-target')) {
        newVariant = "hover";
      }

      setCursorVariant(newVariant);
      setCursorText(newText);

      if (newVariant !== "default") {
        if (!isHovering) {
          try { mysticAudio.playHoverChime(); } catch(e){}
        }
        isHovering = true;
        mysticAudio.startHoverHum();
      } else {
        isHovering = false;
        mysticAudio.stopHoverHum();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        shockwaves[i].update();
        shockwaves[i].draw(ctx);
        if (shockwaves[i].life <= 0) {
          shockwaves.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    animate();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('resize', handleResize);
      mysticAudio.stopHoverHum();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLowEndDevice]);

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
      backgroundColor: "rgba(243, 156, 18, 0.1)",
      borderColor: "rgba(243, 156, 18, 0)",
      scale: 1.5,
      opacity: 1
    },
    grab: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "rgba(243, 156, 18, 0.2)",
      borderColor: "rgba(243, 156, 18, 0)",
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
      borderColor: "#F39C12",
      scale: 1,
      opacity: 1
    }
  };

  const textSpring = { type: "spring", stiffness: 400, damping: 28 };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .custom-cursor-dot, .custom-cursor-outline, .cursor-canvas {
            display: none !important;
          }
        }
      `}</style>

      {/* Spark Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="cursor-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998
        }}
      />

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
              color: '#F39C12',
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
