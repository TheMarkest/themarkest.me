// src/components/ui/ScrollAppear.tsx
"use client";

import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAppearProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
  delay?: string; // e.g., 'delay-100', 'delay-200'
}

const ScrollAppear: React.FC<ScrollAppearProps> = ({
  children,
  className,
  threshold = 0.1,
  once = true,
  delay = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          } else if (!once) {
            // If not 'once', allow element to become invisible again for re-triggering animations
            // This might be desired for some effects, but typically 'once' is true for scroll reveals
             // setIsVisible(false); 
          }
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={elementRef}
      className={cn('scroll-appear', isVisible ? 'visible' : '', delay, className)}
    >
      {children}
    </div>
  );
};

export default ScrollAppear;
