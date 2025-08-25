// Three.js skills sphere background (depends on THREE + SKILLS_DATA + SKILL_CATEGORY_COLORS)
window.initSkillsSphere = function(canvas){
  if(!canvas || !window.THREE || !window.SKILLS_DATA) return;
  const skills = window.SKILLS_DATA;
  const colors = window.SKILL_CATEGORY_COLORS || {};
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2('#030508',0.0009);
  const camera=new THREE.PerspectiveCamera(70,1,0.1,3000); camera.position.set(0,0,1000);
  function resize(){const w=canvas.clientWidth||800; const h=canvas.clientHeight||600; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix();}
  resize();
  const group=new THREE.Group(); scene.add(group);
  const N=skills.length; const radius=550; const spheres=[];
  skills.forEach((s,i)=>{const phi=Math.acos(-1 + (2*i)/N); const theta=Math.sqrt(N*Math.PI)*phi; const x=radius*Math.sin(phi)*Math.cos(theta); const y=radius*Math.sin(phi)*Math.sin(theta); const z=radius*Math.cos(phi); const r=6 + s.importance*3; const geo=new THREE.SphereGeometry(r,24,24); const mat=new THREE.MeshBasicMaterial({color:colors[s.category]||0xffffff}); const m=new THREE.Mesh(geo,mat); m.position.set(x,y,z); m.userData.skill=s; group.add(m); spheres.push(m);});
  // star field
  const starGeo=new THREE.BufferGeometry(); const starCount=800; const positions=new Float32Array(starCount*3); for(let i=0;i<starCount;i++){const R=1600*Math.random(); const th=Math.random()*Math.PI*2; const ph=Math.acos(2*Math.random()-1); positions[i*3]=R*Math.sin(ph)*Math.cos(th); positions[i*3+1]=R*Math.sin(ph)*Math.sin(th); positions[i*3+2]=R*Math.cos(ph);} starGeo.setAttribute('position', new THREE.BufferAttribute(positions,3)); scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x184050,size:2,transparent:true,opacity:.35})));
  const raycaster=new THREE.Raycaster(); const pointer=new THREE.Vector2(-100,-100); let hovered=null; const tooltip=document.createElement('div'); Object.assign(tooltip.style,{position:'absolute',pointerEvents:'none',fontSize:'11px',padding:'4px 6px',background:'rgba(10,15,22,.85)',border:'1px solid #22313f',borderRadius:'4px',color:'#e8f4fa',letterSpacing:'0.5px',transform:'translate(-50%,-140%)',whiteSpace:'nowrap',opacity:'0',transition:'opacity .18s'}); canvas.parentElement.style.position='relative'; canvas.parentElement.appendChild(tooltip);
  canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect(); pointer.x=((e.clientX-r.left)/r.width)*2-1; pointer.y=-((e.clientY-r.top)/r.height)*2+1;});
  canvas.addEventListener('mouseleave',()=>{pointer.x=-100; pointer.y=-100; if(hovered){hovered.scale.divideScalar(1.35); hovered=null; tooltip.style.opacity='0';}});
  let t=0;
  function animate(){requestAnimationFrame(animate); t+=0.0012; group.rotation.y+=0.0009; group.rotation.x+=0.0003; spheres.forEach(m=>{const imp=m.userData.skill.importance; const scale=1+Math.sin(t*2+imp)*0.04; m.scale.setScalar(scale);}); raycaster.setFromCamera(pointer,camera); const hits=raycaster.intersectObjects(spheres); if(hits.length){const obj=hits[0].object; if(hovered!==obj){ if(hovered) hovered.scale.divideScalar(1.35); hovered=obj; hovered.scale.multiplyScalar(1.35);} tooltip.textContent=hovered.userData.skill.name; tooltip.style.left=(pointer.x*0.5+0.5)*canvas.clientWidth+'px'; tooltip.style.top=(( -pointer.y*0.5+0.5)*canvas.clientHeight)+'px'; tooltip.style.opacity='1';} else { if(hovered){hovered.scale.divideScalar(1.35); hovered=null;} tooltip.style.opacity='0'; } renderer.render(scene,camera);} animate(); window.addEventListener('resize',resize);
};