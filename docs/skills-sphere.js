// Three.js skills sphere background (depends on THREE + SKILLS_DATA + SKILL_CATEGORY_COLORS)
window.initSkillsSphere = function initSkillsSphere(canvas, _attempt=0){
  if(!canvas){console.warn('[skills-sphere] canvas not found'); return;}
  // Ensure THREE is present; if not, inject fallback script & retry with increasing delay
  if(!window.THREE){
    // Expanded list includes non-minified variants because some newer Three.js versions no longer ship three.min.js on all CDNs
    const cdns=[
      'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.min.js',
      'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.js',
      'https://unpkg.com/three@0.161.0/build/three.min.js',
      'https://unpkg.com/three@0.161.0/build/three.js',
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.161.0/three.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.161.0/three.js'
    ];
    // Track which index we've tried via data attribute
    let idx=parseInt(document.documentElement.getAttribute('data-three-cdn-idx')||'0',10);
    if(!document.getElementById('threejs-fallback')){
      const lib=document.createElement('script');
      lib.id='threejs-fallback';
      lib.src=cdns[idx % cdns.length];
      lib.onload=()=>{console.info('[skills-sphere] loaded three from', lib.src); initSkillsSphere(canvas,_attempt+1);};
      lib.onerror=()=>{
        console.warn('[skills-sphere] cdn failed', lib.src);
        lib.remove();
        document.documentElement.setAttribute('data-three-cdn-idx', (idx+1).toString());
        setTimeout(()=>initSkillsSphere(canvas,_attempt+1), 120);
      };
      document.head.appendChild(lib);
    } else if(_attempt<90){
      // existing tag present but not yet executed
      return setTimeout(()=>initSkillsSphere(canvas,_attempt+1),100);
    } else {
      console.error('[skills-sphere] THREE not loaded after multi-CDN attempts');
      showLoadError(canvas,'Unable to load 3D engine');
    }
    return; // wait for load path
  }
  if(!window.SKILLS_DATA){ if(_attempt<30){return setTimeout(()=>initSkillsSphere(canvas,_attempt+1),80);} console.error('[skills-sphere] skills data missing'); showLoadError(canvas,'Skills data not available'); return; }

  const skills = window.SKILLS_DATA;
  const colors = window.SKILL_CATEGORY_COLORS || {};

  // Ensure canvas has layout size; if zero, retry
  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;
  if((!cw || !ch) && _attempt<25){ return setTimeout(()=>initSkillsSphere(canvas,_attempt+1),80); }
  // Fallback explicit size if still zero
  if(!canvas.style.width) canvas.style.width = '100%';
  if(!canvas.style.height) canvas.style.height = '100%';

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2('#030508',0.0007);
  const camera=new THREE.PerspectiveCamera(68,1,0.1,4000); camera.position.set(0,0,1050);
  function resize(){
    const w=canvas.clientWidth||cw||800; const h=canvas.clientHeight||ch||600;
    if(!w||!h) return; // skip invalid
    renderer.setSize(w,h,false);
    camera.aspect=w/h; camera.updateProjectionMatrix();
  }
  resize();
  const group=new THREE.Group(); scene.add(group);
  const N=skills.length; const radius=560; const spheres=[];
  // Build sphere
  for(let i=0;i<N;i++){
    const s=skills[i];
    const phi=Math.acos(-1 + (2*i)/N);
    const theta=Math.sqrt(N*Math.PI)*phi;
    const x=radius*Math.sin(phi)*Math.cos(theta);
    const y=radius*Math.sin(phi)*Math.sin(theta);
    const z=radius*Math.cos(phi);
    const r=6 + s.importance*3;
    const geo=new THREE.SphereGeometry(r,20,20);
    const mat=new THREE.MeshBasicMaterial({color:colors[s.category]||0xffffff});
    const mesh=new THREE.Mesh(geo,mat);
    mesh.position.set(x,y,z);
    mesh.userData.skill=s;
    group.add(mesh); spheres.push(mesh);
  }
  if(!spheres.length){console.error('[skills-sphere] no spheres created'); showLoadError(canvas,'No skills to render');}
  // Starfield
  const starGeo=new THREE.BufferGeometry(); const starCount=700; const pos=new Float32Array(starCount*3);
  for(let i=0;i<starCount;i++){const R=1500*Math.random(); const th=Math.random()*Math.PI*2; const ph=Math.acos(2*Math.random()-1); pos[i*3]=R*Math.sin(ph)*Math.cos(th); pos[i*3+1]=R*Math.sin(ph)*Math.sin(th); pos[i*3+2]=R*Math.cos(ph);} starGeo.setAttribute('position',new THREE.BufferAttribute(pos,3)); scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x1a3b55,size:2,opacity:.32,transparent:true})));
  const raycaster=new THREE.Raycaster(); const pointer=new THREE.Vector2(-100,-100); let hovered=null;
  const tooltip=document.createElement('div'); Object.assign(tooltip.style,{position:'absolute',pointerEvents:'none',fontSize:'11px',padding:'4px 6px',background:'rgba(10,15,22,.9)',border:'1px solid #1d2c38',borderRadius:'4px',color:'#e8f4fa',letterSpacing:'0.5px',transform:'translate(-50%,-140%)',whiteSpace:'nowrap',opacity:'0',transition:'opacity .18s'}); canvas.parentElement.style.position='relative'; canvas.parentElement.appendChild(tooltip);
  canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect(); pointer.x=((e.clientX-r.left)/r.width)*2-1; pointer.y=-((e.clientY-r.top)/r.height)*2+1;});
  canvas.addEventListener('mouseleave',()=>{pointer.x=-100; pointer.y=-100; if(hovered){hovered.scale.divideScalar(1.35); hovered=null; tooltip.style.opacity='0';}});
  let t=0; let frames=0;
  function animate(){
    requestAnimationFrame(animate);
    t+=0.0012; frames++;
    group.rotation.y+=0.0009; group.rotation.x+=0.0003;
    const pulse = Math.sin(t*2);
    spheres.forEach(m=>{const imp=m.userData.skill.importance; const scale=1 + pulse*0.035; m.scale.setScalar(scale);});
    raycaster.setFromCamera(pointer,camera);
    const hits=raycaster.intersectObjects(spheres);
    if(hits.length){const obj=hits[0].object; if(hovered!==obj){ if(hovered){hovered.scale.divideScalar(1.35);} hovered=obj; hovered.scale.multiplyScalar(1.35);} if(hovered){ tooltip.textContent=hovered.userData.skill.name; tooltip.style.left=(pointer.x*0.5+0.5)*canvas.clientWidth+'px'; tooltip.style.top=(( -pointer.y*0.5+0.5)*canvas.clientHeight)+'px'; tooltip.style.opacity='1'; }} else { if(hovered){hovered.scale.divideScalar(1.35); hovered=null;} tooltip.style.opacity='0'; }
    renderer.render(scene,camera);
    if(frames===2){console.info('[skills-sphere] started render', {size:[canvas.clientWidth,canvas.clientHeight], spheres:spheres.length});}
  }
  animate();
  window.addEventListener('resize',()=>{resize();});
};

function showLoadError(canvas,msg){
  if(!canvas) return; if(canvas.__error_shown) return; canvas.__error_shown=true;
  const note=document.createElement('div');
  note.textContent=msg;
  Object.assign(note.style,{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',color:'#8fa3b5',fontSize:'12px',fontFamily:'Inter,system-ui,sans-serif',background:'rgba(10,15,22,0.6)',padding:'6px 10px',border:'1px solid #22313f',borderRadius:'4px'});
  canvas.parentElement.style.position='relative';
  canvas.parentElement.appendChild(note);
}