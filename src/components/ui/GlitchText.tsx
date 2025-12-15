// src/components/ui/GlitchText.tsx
"use client";

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, as: Component = 'div' }) => {
  const [randomDelays, setRandomDelays] = useState({
    skew: '0s',
    red: '0s',
    blue: '0s',
    green: '0s',
    line1: '0s',
    line2: '0s',
  });

  useEffect(() => {
    // This ensures that random values are generated only on the client-side
    // and helps to avoid hydration mismatches.
    setRandomDelays({
      skew: `${Math.random() * 2}s`,
      red: `${Math.random() * 0.5}s`,
      blue: `${Math.random() * 0.5}s`,
      green: `${Math.random() * 0.5}s`,
      line1: `${Math.random() * 2}s`,
      line2: `${Math.random() * 2 + 1}s`, // Ensure second line has a different start
    });
  }, []);

  return (
    <Component 
      className={cn('glitch', className)}
      style={{ '--anim-skew-delay': randomDelays.skew } as React.CSSProperties}
    >
      <span 
        className="glitch__color glitch__color--red"
        style={{ '--anim-color-delay': randomDelays.red } as React.CSSProperties}
      >{text}</span>
      <span 
        className="glitch__color glitch__color--blue"
        style={{ '--anim-color-delay': randomDelays.blue } as React.CSSProperties}
      >{text}</span>
      <span 
        className="glitch__color glitch__color--green"
        style={{ '--anim-color-delay': randomDelays.green } as React.CSSProperties}
      >{text}</span>
      <span className="glitch__main">{text}</span>
      <span 
        className="glitch__line glitch__line--first"
        style={{ '--anim-line-delay': randomDelays.line1 } as React.CSSProperties}
      ></span>
      <span 
        className="glitch__line glitch__line--second"
        style={{ '--anim-line-delay': randomDelays.line2 } as React.CSSProperties}
      ></span>
    </Component>
  );
};

export default GlitchText;
