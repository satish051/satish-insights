import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = '', duration = 1.5 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);
  
  const target = parseInt(value, 10) || 0;

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        }
      });
      return controls.stop;
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="stat-value" style={{ display: 'inline-block' }}>
      {displayValue}{suffix}
    </span>
  );
};

export default AnimatedCounter;
