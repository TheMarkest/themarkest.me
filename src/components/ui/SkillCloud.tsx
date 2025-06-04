
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

const SkillCloud: React.FC<SkillCloudProps> = ({ width = 800, height = 600 }) => { // Increased default size for background
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
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 300; // Adjusted camera Z for larger radius

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Create skill objects (sprites)
    const skillObjects: THREE.Sprite[] = [];

    skillsData.forEach((skill, index) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      const fontSize = 12 + skill.importance * 2; // Adjusted font size scaling for more skills
      context.font = `bold ${fontSize}px Space Grotesk, monospace`;
      const textMetrics = context.measureText(skill.name);
      const textWidth = textMetrics.width;
      
      canvas.width = textWidth + 10; // Reduced padding slightly
      canvas.height = fontSize + 5;  // Reduced padding slightly

      context.font = `bold ${fontSize}px Space Grotesk, monospace`;
      context.fillStyle = skillCategoryColors[skill.category] || '#FFFFFF';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(skill.name, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.85 }); // Slightly transparent
      const sprite = new THREE.Sprite(material);
      
      const spriteWidth = canvas.width * 0.4; 
      const spriteHeight = canvas.height * 0.4;
      sprite.scale.set(spriteWidth, spriteHeight, 1);

      const phi = Math.acos(-1 + (2 * index) / skillsData.length);
      const theta = Math.sqrt(skillsData.length * Math.PI) * phi;
      const radius = 220; // Increased radius for more skills
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      sprite.position.set(x, y, z);

      scene.add(sprite);
      skillObjects.push(sprite);
    });

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100); // Initialize mouse off-screen
    let hoveredSprite: THREE.Sprite | null = null;

    const onMouseMove = (event: MouseEvent) => {
      if (!currentMount) return;
      const rect = currentMount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / currentMount.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / currentMount.clientHeight) * 2 + 1;
    };
    currentMount.addEventListener('mousemove', onMouseMove);
    currentMount.addEventListener('mouseleave', () => { // Reset hover when mouse leaves
        mouse.x = -100;
        mouse.y = -100;
    });


    // Animation loop
    let rotX = 0.0005; // Slower rotation
    let rotY = 0.00025; // Slower rotation

    const animate = () => {
      requestAnimationFrame(animate);

      skillObjects.forEach(obj => {
        obj.position.applyMatrix4(new THREE.Matrix4().makeRotationY(rotX));
        obj.position.applyMatrix4(new THREE.Matrix4().makeRotationX(rotY));
        // Keep sprites facing the camera
        obj.quaternion.copy(camera.quaternion);
      });
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(skillObjects);

      if (intersects.length > 0 && intersects[0].object instanceof THREE.Sprite) {
        const newHoveredSprite = intersects[0].object as THREE.Sprite;
        if (hoveredSprite !== newHoveredSprite) {
          if (hoveredSprite) {
            hoveredSprite.scale.divideScalar(1.15);
            (hoveredSprite.material as THREE.SpriteMaterial).opacity = 0.85;
          }
          hoveredSprite = newHoveredSprite;
          hoveredSprite.scale.multiplyScalar(1.15);
          (hoveredSprite.material as THREE.SpriteMaterial).opacity = 1.0;
        }
      } else {
        if (hoveredSprite) {
          hoveredSprite.scale.divideScalar(1.15);
          (hoveredSprite.material as THREE.SpriteMaterial).opacity = 0.85;
          hoveredSprite = null;
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (!currentMount) return;
        const newWidth = currentMount.clientWidth;
        const newHeight = currentMount.clientHeight; // Use full clientHeight for background
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    };
    
    const resizeObserver = new ResizeObserver(handleResize);
    if (currentMount) { // Observe the mountRef itself if it's defining the size
      resizeObserver.observe(currentMount);
    }
    handleResize(); 


    return () => {
      resizeObserver.disconnect();
      currentMount.removeEventListener('mousemove', onMouseMove);
      currentMount.removeEventListener('mouseleave', () => {
        mouse.x = -100;
        mouse.y = -100;
      });
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
      skillObjects.length = 0; // Clear the array
    };
  }, [isClient]); // Removed width/height dependencies as it will now adapt to parent

  if (!isClient) {
    // For background, the placeholder might not be visible or necessary. 
    // It's better to have a div that takes up space.
    return <div style={{ width: '100%', height: '100%' }} className="absolute inset-0 -z-10" />;
  }
  // Ensure the div takes up space and is styled for background usage.
  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} className="absolute inset-0 -z-10 cursor-grab active:cursor-grabbing opacity-50" />;
};

export default SkillCloud;
