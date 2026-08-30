import { useEffect, useRef } from 'react';

const RUNES = 'ᚠᚢᚦᚩᚱᚳᚷᚹᚻᚾᛁᛄᛇᛈᛉᛋᛏᛒᛖᛗᛚᛝᛟᛞ';

export const useRuneText = (text, delay = 0) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Set a11y classes
    el.classList.add('rune-cipher-text');
    el.setAttribute('data-rune', text.replace(/[a-zA-Z]/g, () => RUNES[Math.floor(Math.random() * RUNES.length)]));

    let animationFrameId;
    let startTime;
    const DURATION = 600; // 600ms translation
    
    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      let currentText = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          currentText += ' ';
          continue;
        }
        
        // Character by character resolve based on progress
        const charProgressThreshold = i / text.length;
        if (progress > charProgressThreshold) {
          // Add some randomness even after threshold is reached briefly
          if (progress > charProgressThreshold + 0.1 || progress === 1) {
            currentText += text[i];
          } else {
            currentText += RUNES[Math.floor(Math.random() * RUNES.length)];
          }
        } else {
          currentText += RUNES[Math.floor(Math.random() * RUNES.length)];
        }
      }

      el.setAttribute('data-rune', currentText);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            startTime = null;
            animationFrameId = requestAnimationFrame(animate);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [text, delay]);

  return elementRef;
};
