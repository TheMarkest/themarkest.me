// src/components/ui/GlitchText.tsx
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, as: Component = 'div' }) => {
  return (
    <Component className={cn("glitch", className)} data-text={text}>
      {text}
    </Component>
  );
};

export default GlitchText;
