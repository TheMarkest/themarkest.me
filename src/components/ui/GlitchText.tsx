// src/components/ui/GlitchText.tsx
"use client";

import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float time;
  uniform float glitchAmount;
  uniform vec2 resolution;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    vec4 originalColor = texture2D(tDiffuse, uv);

    // Digital Glitch
    float randomVal = random(vec2(trunc(uv.y * 100.0), time));
    if (randomVal < glitchAmount * 0.1) {
      uv.x += (random(vec2(time, 1.0)) - 0.5) * 0.1 * glitchAmount;
    }

    // Scanline displacement
    float scanline = sin(uv.y * 800.0 * (1.0 + glitchAmount * 0.1)) / 30.0;
    scanline *= smoothstep(0.1, 0.0, abs(uv.y - mod(time * 0.1, 1.0))); // moving scanline
    uv.x += scanline * glitchAmount;
    
    // RGB Shift
    vec2 R_uv = vec2(uv.x + (random(vec2(time, 2.0)) - 0.5) * 0.01 * glitchAmount, uv.y);
    vec2 G_uv = uv;
    vec2 B_uv = vec2(uv.x - (random(vec2(time, 4.0)) - 0.5) * 0.01 * glitchAmount, uv.y);

    float r = texture2D(tDiffuse, R_uv).r;
    float g = texture2D(tDiffuse, G_uv).g;
    float b = texture2D(tDiffuse, B_uv).b;

    gl_FragColor = vec4(r, g, b, originalColor.a);
  }
`;

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, as: Component = 'div' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Memoize shaders and uniforms to prevent re-creation on re-render
  const shaderStuff = useMemo(() => {
    return {
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 },
        glitchAmount: { value: 0.0 },
        resolution: { value: new THREE.Vector2() },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    
    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = rendererRef.current || new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // --- Text Canvas ---
    const textCanvas = document.createElement('canvas');
    const textContext = textCanvas.getContext('2d');
    if (!textContext) return;
    
    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    
    shaderStuff.uniforms.tDiffuse.value = textTexture;
    
    // --- Render Target ---
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial(shaderStuff);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // --- Sizing and Drawing ---
    let observer: ResizeObserver;
    const updateSizeAndText = () => {
        if (!currentMount || !textContext) return;
        const rect = currentMount.getBoundingClientRect();
        const dpr = window.devicePixelRatio;

        const newWidth = rect.width;
        const newHeight = rect.height;

        if (newWidth === 0 || newHeight === 0) return;

        renderer.setSize(newWidth, newHeight);
        shaderStuff.uniforms.resolution.value.set(newWidth * dpr, newHeight * dpr);

        textCanvas.width = newWidth * dpr;
        textCanvas.height = newHeight * dpr;
        
        const computedStyle = getComputedStyle(currentMount);
        textContext.font = computedStyle.font;
        textContext.fillStyle = computedStyle.color;
        textContext.textAlign = 'left';
        textContext.textBaseline = 'top';

        textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
        textContext.fillText(text, 0, 0, textCanvas.width);
        textTexture.needsUpdate = true;
    };
    
    // --- Animation Loop ---
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      shaderStuff.uniforms.time.value = clock.getElapsedTime();
      
      // Control glitch intensity
      let glitchValue = Math.sin(clock.getElapsedTime() * 2.0) * Math.cos(clock.getElapsedTime() * 15.0);
      glitchValue = THREE.MathUtils.smoothstep(glitchValue, 0.7, 1.0);
      glitchValue *= Math.pow(Math.random(), 5.0) * 0.2; // Add random bursts
      shaderStuff.uniforms.glitchAmount.value = glitchValue;

      renderer.render(scene, camera);
    };

    // --- Initialization & Cleanup ---
    const init = () => {
        updateSizeAndText();
        observer = new ResizeObserver(updateSizeAndText);
        observer.observe(currentMount);
        animate();
    };

    const cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        if (observer && currentMount) observer.unobserve(currentMount);
        if (currentMount && renderer.domElement.parentNode === currentMount) {
            currentMount.removeChild(renderer.domElement);
        }
        // Don't dispose the renderer itself, but clean up scene objects
        scene.remove(plane);
        geometry.dispose();
        material.dispose();
        textTexture.dispose();
    };

    init();

    return cleanup;
  }, [text, locale, shaderStuff]);

  // The component itself is just a sized div that will host the canvas.
  // The 'glitch' class is kept for semantic purposes but does not apply CSS animations.
  return (
    <Component ref={mountRef} className={cn('glitch', className)} data-text={text}>
      {/* Fallback for no-JS or error */}
      <span style={{ visibility: 'hidden' }}>{text}</span>
    </Component>
  );
};

export default GlitchText;
