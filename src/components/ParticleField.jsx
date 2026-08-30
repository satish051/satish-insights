import React, { useEffect, useRef, useState } from 'react';

const ParticleField = () => {
  const canvasRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationFrameId;
    let isHidden = document.hidden;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const handleVisibilityChange = () => {
      isHidden = document.hidden;
    };

    class Spark {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // initial random distribution
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100; // start slightly below
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = -Math.random() * 2 - 1; // move up
        this.size = Math.random() * 2 + 1;
        this.life = Math.random() * 0.5 + 0.5; // opacity
        this.decay = Math.random() * 0.005 + 0.002;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        
        // Wobble
        this.vx += (Math.random() - 0.5) * 0.2;
        
        if (this.life <= 0 || this.y < 0) {
          this.reset();
        }
      }
      
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 156, 18, ${this.life})`; // Eldritch Orange
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#F39C12';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const init = () => {
      handleResize();
      particles = Array.from({ length: 80 }, () => new Spark());
    };
    
    const animate = () => {
      if (!isHidden && isInView) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw(ctx);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleField;
