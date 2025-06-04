// src/components/ui/GlitchText.tsx
"use client";

import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, as: Component = 'span' }) => {
  const [glitchText, setGlitchText] = useState(text);

  // The CSS animations handle the continuous effect. 
  // This useEffect is just to update the data-text attribute if the text prop changes.
  useEffect(() => {
    setGlitchText(text);
  }, [text]);

  return (
    <Component
      className={cn('glitch-base', className)}
      data-text={glitchText}
    >
      {glitchText}
    </Component>
  );
};

export default GlitchText;
