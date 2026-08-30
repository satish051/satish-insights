import React from 'react';
import { useRuneText } from '../hooks/useRuneText';

export default function RuneHeading({ children, className = '', as: Component = 'h2', delay = 0, ...props }) {
  // Ensure children is a single string for this effect
  const textContent = typeof children === 'string' ? children : '';
  const runeRef = useRuneText(textContent, delay);

  if (!textContent) {
    return <Component className={className} {...props}>{children}</Component>;
  }

  return (
    <Component ref={runeRef} className={`rune-cipher-text ${className}`} {...props}>
      {textContent}
    </Component>
  );
}
