/**
 * Three.js Skills Sphere
 * 3D visualization of skills with interactive hover effects
 */

import { waitFor } from './utils.js';

let scene, camera, renderer, group, spheres;
let mouse = new THREE.Vector2(-100, -100);
let raycaster;
let hoveredObject = null;
let tooltip = null;
let animationId = null;

/**
 * Check WebGL support
 */
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

/**
 * Show fallback UI when WebGL is not supported
 */
function showFallback(canvas) {
  if (!canvas) return;
  
  canvas.style.display = 'none';
  document.body.classList.add('no-webgl');
  
  // Create fallback message
  const fallback = document.createElement('div');
  fallback.className = 'webgl-fallback';
  fallback.innerHTML = `
    <div class="fallback-content">
      <p>⚠️ 3D визуализация недоступна</p>
      <p class="fallback-subtitle">Ваш браузер не поддерживает WebGL</p>
    </div>
  `;
  
  canvas.parentNode.insertBefore(fallback, canvas);
  
  console.warn('[Skills Sphere] WebGL not supported, showing fallback UI');
}

/**
 * Initialize the skills sphere
 */
async function initSkillsSphere(canvas) {
  if (!canvas) {
    console.warn('[Skills Sphere] Canvas element not found');
    return;
  }
  
  // Check WebGL support
  if (!checkWebGLSupport()) {
    showFallback(canvas);
    return;
  }
  
  // Wait for THREE.js to load
  try {
    await waitFor(() => typeof THREE !== 'undefined', 5000);
  } catch (error) {
    console.error('[Skills Sphere] THREE.js not loaded');
    showFallback(canvas);
    return;
  }
  
  // Wrap initialization in try-catch
  try {
    await initializeScene(canvas);
  } catch (error) {
    console.error('[Skills Sphere] Initialization failed:', error);
    showFallback(canvas);
  }
}

/**
 * Initialize the Three.js scene
 */
async function initializeScene(canvas) {
  
  // Wait for skills data
  let skillsData;
  try {
    const response = await fetch('/data/skills.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    skillsData = await response.json();
  } catch (error) {
    console.error('[Skills Sphere] Failed to load skills data:', error);
    throw error;
  }
  
  if (!skillsData || !skillsData.skills || skillsData.skills.length === 0) {
    console.warn('[Skills Sphere] No skills data available');
    throw new Error('No skills data');
  }
  
  const skills = skillsData.skills;
  const colors = skillsData.categoryColors || {};
  
  // Setup renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  
  // Setup scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#030508', 0.0007);
  
  // Setup camera
  camera = new THREE.PerspectiveCamera(68, 1, 0.1, 4000);
  camera.position.set(0, 0, 1050);
  
  // Resize handler
  function resize() {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    
    if (!width || !height) return;
    
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  
  resize();
  
  // Create skill spheres group
  group = new THREE.Group();
  scene.add(group);
  
  const sphereCount = skills.length;
  const radius = 560;
  spheres = [];
  
  // Create spheres using Fibonacci sphere algorithm
  for (let i = 0; i < sphereCount; i++) {
    const skill = skills[i];
    
    // Fibonacci sphere distribution
    const phi = Math.acos(-1 + (2 * i) / sphereCount);
    const theta = Math.sqrt(sphereCount * Math.PI) * phi;
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    // Sphere size based on importance
    const sphereRadius = 6 + (skill.importance || 1) * 3;
    
    const geometry = new THREE.SphereGeometry(sphereRadius, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      color: colors[skill.category] || 0xffffff
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.userData.skill = skill;
    mesh.userData.originalScale = 1;
    
    group.add(mesh);
    spheres.push(mesh);
  }
  
  console.log(`[Skills Sphere] Created ${spheres.length} skill spheres`);
  
  // Add starfield background
  createStarfield();
  
  // Setup raycaster for hover detection
  raycaster = new THREE.Raycaster();
  
  // Create tooltip element
  tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.style.position = 'absolute';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.opacity = '0';
  canvas.parentElement.style.position = 'relative';
  canvas.parentElement.appendChild(tooltip);
  
  // Mouse move handler
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  });
  
  // Mouse leave handler
  canvas.addEventListener('mouseleave', () => {
    mouse.x = -100;
    mouse.y = -100;
    if (hoveredObject) {
      hoveredObject.scale.divideScalar(1.35);
      hoveredObject = null;
      tooltip.classList.remove('visible');
    }
  });
  
  // Animation loop
  let time = 0;
  let frames = 0;
  
  function animate() {
    animationId = requestAnimationFrame(animate);
    
    time += 0.001;
    frames++;
    
    // Rotate the group
    group.rotation.y += 0.0009;
    group.rotation.x += 0.0003;
    
    // Pulse effect
    const pulse = Math.sin(time * 2);
    spheres.forEach(mesh => {
      const importance = mesh.userData.skill.importance || 1;
      const scale = 1 + pulse * 0.035 * (importance / 3);
      mesh.userData.originalScale = scale;
    });
    
    // Raycasting for hover
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(spheres);
    
    if (intersects.length > 0) {
      const object = intersects[0].object;
      
      // New hover
      if (hoveredObject !== object) {
        if (hoveredObject) {
          hoveredObject.scale.divideScalar(1.35);
        }
        hoveredObject = object;
        hoveredObject.scale.multiplyScalar(1.35);
      }
      
      // Update tooltip
      if (hoveredObject && hoveredObject.userData.skill) {
        tooltip.textContent = hoveredObject.userData.skill.name;
        
        // Position tooltip
        const canvasRect = canvas.getBoundingClientRect();
        const x = (mouse.x * 0.5 + 0.5) * canvasRect.width;
        const y = (-mouse.y * 0.5 + 0.5) * canvasRect.height;
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
        tooltip.style.transform = 'translate(-50%, calc(-100% - 10px))';
        tooltip.classList.add('visible');
      }
    } else {
      if (hoveredObject) {
        hoveredObject.scale.divideScalar(1.35);
        hoveredObject = null;
      }
      tooltip.classList.remove('visible');
    }
    
    renderer.render(scene, camera);
    
    if (frames === 2) {
      console.log('[Skills Sphere] Animation started');
    }
  }
  
  animate();
  
  // Window resize handler
  window.addEventListener('resize', resize);
  
  console.log('[Skills Sphere] Initialized successfully');
}

/**
 * Create starfield background
 */
function createStarfield() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 700;
  const positions = new Float32Array(starCount * 3);
  
  for (let i = 0; i < starCount; i++) {
    const radius = 1500 * Math.random();
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const starMaterial = new THREE.PointsMaterial({
    color: 0x1a3b55,
    size: 2,
    opacity: 0.32,
    transparent: true
  });
  
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

/**
 * Cleanup function
 */
function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (renderer) {
    renderer.dispose();
  }
  
  if (tooltip && tooltip.parentElement) {
    tooltip.parentElement.removeChild(tooltip);
  }
}

export {
  initSkillsSphere,
  cleanup
};
