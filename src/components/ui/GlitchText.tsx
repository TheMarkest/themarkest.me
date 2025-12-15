// src/components/ui/GlitchText.tsx
"use client";

import { cn } from '@/lib/utils';
import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, as: Component = 'div' }) => {
  return (
    <Component className={cn('glitch-wrapper', className)}>
      <div className="glitch" data-text={text}>
        {text}
      </div>
    </Component>
  );
};

export default GlitchText;
