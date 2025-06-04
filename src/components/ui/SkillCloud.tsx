// src/components/ui/SkillCloud.tsx
"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import type { Skill } from '@/data/skills';
import { skillsData, skillCategoryColors } from '@/data/skills';

interface SkillCloudProps {
  width?: number;
  height?: number;
}

const SkillCloud: React.FC<SkillCloudProps> = ({ width = 600, height = 400 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    currentMount.appendChild(renderer.domElement);

    // Create skill objects (sprites)
    const skillObjects: THREE.Sprite[] = [];
    const texts: { sprite: THREE.Sprite; initialPosition: THREE.Vector3 }[] = [];

    skillsData.forEach((skill, index) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      const fontSize = 14 + skill.importance * 2.5; // Scale font size by importance
      context.font = `bold ${fontSize}px Space Grotesk, monospace`;
      const textWidth = context.measureText(skill.name).width;
      
      // Adjust canvas size dynamically based on text width and font size
      canvas.width = textWidth + 20; // Add some padding
      canvas.height = fontSize + 10; // Add some padding

      // Re-apply font after canvas resize
      context.font = `bold ${fontSize}px Space Grotesk, monospace`;
      context.fillStyle = skillCategoryColors[skill.category] || '#FFFFFF';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(skill.name, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      
      // Scale sprite based on text importance and aspect ratio of canvas
      const spriteWidth = canvas.width * 0.5; // Adjust multiplier as needed
      const spriteHeight = canvas.height * 0.5; // Adjust multiplier as needed
      sprite.scale.set(spriteWidth, spriteHeight, 1);

      // Position sprites in a sphere
      const phi = Math.acos(-1 + (2 * index) / skillsData.length);
      const theta = Math.sqrt(skillsData.length * Math.PI) * phi;
      const radius = 150; 
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      sprite.position.set(x, y, z);

      scene.add(sprite);
      skillObjects.push(sprite);
      texts.push({ sprite, initialPosition: new THREE.Vector3(x,y,z) });
    });

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredSprite: THREE.Sprite | null = null;

    const onMouseMove = (event: MouseEvent) => {
      if (!currentMount) return;
      const rect = currentMount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
    };
    currentMount.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let rotX = 0.001;
    let rotY = 0.0005;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate all skill objects
      skillObjects.forEach(obj => {
        obj.position.applyMatrix4(new THREE.Matrix4().makeRotationY(rotX));
        obj.position.applyMatrix4(new THREE.Matrix4().makeRotationX(rotY));
      });
      
      // Raycasting for hover effects
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(skillObjects);

      if (intersects.length > 0) {
        if (hoveredSprite !== intersects[0].object) {
          // Reset previous hovered sprite
          if (hoveredSprite) {
            hoveredSprite.scale.divideScalar(1.2);
            (hoveredSprite.material as THREE.SpriteMaterial).opacity = 1.0;
          }
          hoveredSprite = intersects[0].object as THREE.Sprite;
          hoveredSprite.scale.multiplyScalar(1.2);
          (hoveredSprite.material as THREE.SpriteMaterial).opacity = 0.7; // Example hover effect
        }
      } else {
        if (hoveredSprite) {
          hoveredSprite.scale.divideScalar(1.2);
          (hoveredSprite.material as THREE.SpriteMaterial).opacity = 1.0;
          hoveredSprite = null;
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = currentMount.clientWidth;
      const newHeight = Math.min(newWidth * (height/width), height); // Maintain aspect ratio up to max height
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Use ResizeObserver for better handling of parent resize
    const resizeObserver = new ResizeObserver(handleResize);
    if (currentMount.parentElement) {
      resizeObserver.observe(currentMount.parentElement);
    }
    handleResize(); // Initial size


    // Cleanup
    return () => {
      resizeObserver.disconnect();
      currentMount.removeEventListener('mousemove', onMouseMove);
      if (renderer.domElement.parentNode === currentMount) {
         currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.children.forEach(child => {
        if (child instanceof THREE.Sprite) {
          child.material.map?.dispose();
          child.material.dispose();
        }
      });
    };
  }, [isClient, width, height]); // Re-run effect if width/height props change

  if (!isClient) {
    return <div style={{ width: `${width}px`, height: `${height}px` }} className="bg-card/50 rounded-lg flex items-center justify-center text-muted-foreground"><p>Loading Skill Matrix...</p></div>;
  }

  return <div ref={mountRef} style={{ width: '100%', maxWidth: `${width}px`, height: `${height}px`, margin: '0 auto' }} className="cursor-grab active:cursor-grabbing" />;
};

export default SkillCloud;
