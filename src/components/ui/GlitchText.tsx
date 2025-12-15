// src/components/ui/GlitchText.tsx
"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Simple port of the GlitchPass for our use case
class GlitchEffect {
  goWild: boolean;
  curF: number;
  randX: number;
  generateTrigger: () => void;
  generateHeight: () => void;
  uniforms: { [uniform: string]: THREE.IUniform<any> };
  material: THREE.ShaderMaterial;

  constructor() {
    this.goWild = false;
    this.curF = 0;
    this.randX = 0;

    this.generateTrigger = () => {
      this.randX = THREE.MathUtils.randInt(120, 240);
    };

    this.generateHeight = () => {
      const normal = THREE.MathUtils.randFloat(0, 1);
      return normal * normal * 0.8 + 0.2; // Skew towards smaller values
    };
    
    this.uniforms = {
      'tDiffuse': { value: null },
      'tDisp': { value: this.createDispTexture() },
      'byp': { value: 0 },
      'amount': { value: 0.08 },
      'angle': { value: 0.02 },
      'seed': { value: 0.02 },
      'seed_x': { value: 0.02 },
      'seed_y': { value: 0.02 },
      'distortion_x': { value: 0.5 },
      'distortion_y': { value: 0.6 },
      'col_s': { value: 0.05 }
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform int byp;
        uniform sampler2D tDiffuse;
        uniform sampler2D tDisp;
        uniform float amount;
        uniform float angle;
        uniform float seed;
        uniform float seed_x;
        uniform float seed_y;
        uniform float distortion_x;
        uniform float distortion_y;
        uniform float col_s;
        varying vec2 vUv;

        float rand(vec2 co){
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main() {
          if (byp == 1) {
            gl_FragColor = texture2D(tDiffuse, vUv);
            return;
          }

          vec2 p = vUv;
          float xs = floor(p.x * 0.5 + seed_x);
          float ys = floor(p.y * 0.5 + seed_y);
          
          vec4 normal = texture2D(tDisp, p * seed * 1.0);
          
          if (p.y < distortion_x + col_s && p.y > distortion_x - col_s * seed) {
            if (seed_x > 0.0) {
              p.x = 1.0 - (p.x + distortion_y * 3.0);
            } else {
              p.x = distortion_y * 10.0;
            }
          }
          
          p.x += normal.x * seed_x * (seed / 5.0);
          p.y += normal.y * seed_y * (seed / 5.0);

          vec2 offset = amount * vec2(cos(angle), sin(angle));
          vec4 cr = texture2D(tDiffuse, p + offset);
          vec4 cga = texture2D(tDiffuse, p);
          vec4 cb = texture2D(tDiffuse, p - offset);
          
          gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
        }
      `
    });
    
    this.generateTrigger();
  }

  createDispTexture(): THREE.DataTexture {
    const size = 64;
    const data = new Uint8Array(size * size * 3);
    for (let i = 0; i < data.length; i += 3) {
      data[i] = data[i+1] = data[i+2] = THREE.MathUtils.randInt(0, 255);
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBFormat);
    texture.needsUpdate = true;
    return texture;
  }

  update() {
    this.uniforms['seed'].value = Math.random();
    this.uniforms['byp'].value = 0;
    
    if (this.curF % this.randX == 0 || this.goWild) {
      this.uniforms['amount'].value = Math.random() / 30;
      this.uniforms['angle'].value = THREE.MathUtils.randFloat(-Math.PI, Math.PI);
      this.uniforms['seed_x'].value = THREE.MathUtils.randFloat(-1, 1);
      this.uniforms['seed_y'].value = THREE.MathUtils.randFloat(-1, 1);
      this.uniforms['distortion_x'].value = THREE.MathUtils.randFloat(0, 1);
      this.uniforms['distortion_y'].value = THREE.MathUtils.randFloat(0, 1);
      this.curF = 0;
      this.generateTrigger();
    } else if (this.curF % this.randX < this.randX / 5) {
      this.uniforms['byp'].value = 0;
      this.uniforms['amount'].value = Math.random() / 90;
      this.uniforms['angle'].value = THREE.MathUtils.randFloat(-Math.PI, Math.PI);
      this.uniforms['distortion_x'].value = this.uniforms['distortion_x'].value * 0.9;
      this.uniforms['distortion_y'].value = this.uniforms['distortion_y'].value * 0.9;
      this.uniforms['seed_x'].value = THREE.MathUtils.randFloat(-0.3, 0.3);
      this.uniforms['seed_y'].value = THREE.MathUtils.randFloat(-0.3, 0.3);
    } else {
       this.uniforms['byp'].value = 1;
    }
    
    this.curF++;
  }
}


const GlitchText: React.FC<GlitchTextProps> = ({ text, className, as: Component = 'div' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current || !text) return;

    let animationFrameId: number;
    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.innerHTML = ''; // Clear previous content
    currentMount.appendChild(renderer.domElement);

    // Render Target
    const renderTarget = new THREE.WebGLRenderTarget(currentMount.clientWidth, currentMount.clientHeight);

    // Glitch Effect
    const glitchEffect = new GlitchEffect();

    // Create text texture
    const createTextTexture = (txt: string, style: CSSStyleDeclaration) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return new THREE.CanvasTexture(canvas);

      const font = `${style.fontWeight || 'normal'} ${style.fontSize || '16px'} ${style.fontFamily || 'sans-serif'}`;
      context.font = font;
      const textMetrics = context.measureText(txt);
      
      canvas.width = THREE.MathUtils.ceilPowerOfTwo(textMetrics.width + 20);
      canvas.height = THREE.MathUtils.ceilPowerOfTwo(parseInt(style.lineHeight || style.fontSize, 10) * 1.2);

      context.font = font; // Re-apply font after resize
      context.fillStyle = style.color || 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(txt, canvas.width / 2, canvas.height / 2);
      
      return new THREE.CanvasTexture(canvas);
    };
    
    let textQuad: THREE.Mesh;
    const computedStyle = getComputedStyle(currentMount);
    const textTexture = createTextTexture(text, computedStyle);

    const aspect = textTexture.image.width / textTexture.image.height;
    const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true });
    const textGeometry = new THREE.PlaneGeometry(2, 2 / aspect);
    textQuad = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textQuad);

    // Post-processing scene
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    glitchEffect.uniforms['tDiffuse'].value = renderTarget.texture;
    const postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), glitchEffect.material);
    postScene.add(postQuad);


    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Render text scene to target
      renderer.setRenderTarget(renderTarget);
      renderer.render(scene, camera);

      // Render post-processing scene to screen
      glitchEffect.update();
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCamera);
    };
    animate();
    
    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      renderer.setSize(width, height);
      renderTarget.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentMount);


    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (currentMount) {
        currentMount.innerHTML = '';
      }
      textTexture.dispose();
      textMaterial.dispose();
      textGeometry.dispose();
      renderTarget.dispose();
      glitchEffect.material.dispose();
      renderer.dispose();
    };
  }, [isClient, text]);
  
  // Use a wrapper and a mount point to correctly get computed styles
  // The component itself is used for layout and sizing, the ref is for three.js
  return (
    <Component className={cn(className, 'glitch-container')} >
       <div ref={mountRef} style={{width: '100%', height: '100%'}} />
    </Component>
  );
};

export default GlitchText;
