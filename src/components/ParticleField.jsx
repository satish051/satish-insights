import React, { useEffect, useRef } from 'react';

const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationFrameId;
    let isHidden = false;
    let isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 30 : 80;
    
    const mouse = { x: null, y: null };
    const scroll = { y: 0 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
    };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    const handleScroll = () => {
      scroll.y = window.scrollY;
    };
    
    const handleVisibilityChange = () => {
      isHidden = document.hidden;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            this.vx += (dx / distance) * force * 0.02;
            this.vy += (dy / distance) * force * 0.02;
          }
        }
        
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw(ctx, isDark) {
        ctx.beginPath();
        // Parallax effect tied to scroll
        const parallaxY = this.y - scroll.y * 0.1;
        // Wrap around vertically taking parallax into account
        let drawY = parallaxY % canvas.height;
        if (drawY < 0) drawY += canvas.height;
        
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(14, 165, 233, 0.6)' : 'rgba(100, 116, 139, 0.4)';
        ctx.fill();
      }
    }

    const init = () => {
      handleResize();
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };
    
    const animate = () => {
      if (!isHidden) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = document.body.classList.contains('dark');
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw(ctx, isDark);
          
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            // Calculate distance considering parallax wrap
            let py1 = (particles[i].y - scroll.y * 0.1) % canvas.height;
            if (py1 < 0) py1 += canvas.height;
            let py2 = (particles[j].y - scroll.y * 0.1) % canvas.height;
            if (py2 < 0) py2 += canvas.height;
            
            const dy = py1 - py2;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, py1);
              ctx.lineTo(particles[j].x, py2);
              const opacity = 1 - (distance / 120);
              ctx.strokeStyle = isDark ? `rgba(14, 165, 233, ${opacity * 0.3})` : `rgba(100, 116, 139, ${opacity * 0.2})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
