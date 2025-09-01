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
          mount.innerHTML='<header class="panel panel-header"><div class="panel-bar"><span class="panel-title">/navigation</span><nav id="main-nav"><a href="index.html">Home</a></nav></div></header>';
        } else if(id==='site-footer') {
          mount.innerHTML='<footer class="panel panel-footer"><div class="panel-bar"><span class="panel-title">/footer</span></div><div class="footer-inner"><small>&copy; <span id="year"></span> TheMarkest</small></div></footer>';
        }
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