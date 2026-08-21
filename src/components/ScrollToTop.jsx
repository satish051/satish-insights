import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // A small timeout ensures it runs after framer-motion exit animations finish routing out
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }, 150);
    
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
