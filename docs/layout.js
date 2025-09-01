// Dynamically load shared header / footer partials
(function(){
  async function inject(id, path){
    try {
      const r = await fetch(path);
      if(!r.ok) throw new Error(r.status);
      const html = await r.text();
      const mount = document.getElementById(id);
      if(mount){ mount.innerHTML = html; if(window.refreshDynamic) window.refreshDynamic(); }
    } catch(e){
      console.error('layout inject failed', id, e);
      // Fallback inline minimal markup (useful for file:// viewing where fetch is blocked)
      const mount=document.getElementById(id);
      if(mount && !mount.innerHTML){
        if(id==='site-header'){
          mount.innerHTML='<header class="cabinet-bar" id="main-header"><div class="logo"><a href="index.html">LOGO</a></div><button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="main-nav"><span class="bar"></span><span class="bar"></span><span class="bar"></span></button><nav class="nav" id="main-nav"><a href="index.html" class="active">Home</a></nav><div class="lang-switch"><button id="lang-en" data-lang="en">EN</button><button id="lang-ru" data-lang="ru">RU</button></div></header>';
        } else if(id==='site-footer') {
          mount.innerHTML='<footer id="main-footer" class="cabinet-footer"><div class="footer-inner"><small>&copy; <span id="year"></span> TheMarkest</small><a href="#top" class="back-to-top">▲</a></div></footer>';
        }
      }
      // Retry dynamic functions later if they appear
      if(!window.refreshDynamic){
        let tries=0; const wait=()=>{if(window.refreshDynamic){window.refreshDynamic();} else if(tries++<40){setTimeout(wait,100);} }; wait();
      }
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const headerMount=document.getElementById('site-header');
    const footerMount=document.getElementById('site-footer');
    if(headerMount) inject('site-header','partials/header.html');
    if(footerMount) inject('site-footer','partials/footer.html');
    // If skills canvas exists but init not yet run (in case scripts order), attempt init
    const canvas=document.getElementById('skills-canvas');
    if(canvas && window.initSkillsSphere && !canvas.__initialized){
      window.initSkillsSphere(canvas);
      canvas.__initialized=true;
    }
  });
})();