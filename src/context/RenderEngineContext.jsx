import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

const RenderEngineContext = createContext(null);

export const useRenderEngine = () => {
  const context = useContext(RenderEngineContext);
  if (!context) {
    throw new Error('useRenderEngine must be used within a RenderEngineProvider');
  }
  return context;
};

export const RenderEngineProvider = ({ children }) => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const fpsRef = useRef(60);
  const framesRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    // Visibility
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Scroll tracking
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // FPS Tracking loop
    let animationFrameId;
    const trackFPS = (currentTime) => {
      framesRef.current++;
      const deltaTime = currentTime - lastTimeRef.current;
      
      if (deltaTime >= 1000) {
        fpsRef.current = (framesRef.current * 1000) / deltaTime;
        framesRef.current = 0;
        lastTimeRef.current = currentTime;
        
        // Auto-downgrade magic on very low FPS (< 30)
        if (fpsRef.current < 30) {
          setIsLowEndDevice(true);
        }
      }
      animationFrameId = requestAnimationFrame(trackFPS);
    };
    animationFrameId = requestAnimationFrame(trackFPS);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const value = {
    isLowEndDevice,
    isTabHidden,
    scrollPosition,
    getFPS: () => fpsRef.current
  };

  return (
    <RenderEngineContext.Provider value={value}>
      {children}
    </RenderEngineContext.Provider>
  );
};
