// Theme toggle (more playful "vibe" control)
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const storageKey = 'site-theme';

  function applyTheme(theme){
    if(theme === 'dark') root.classList.add('theme-dark'); else root.classList.remove('theme-dark');
    try{ localStorage.setItem(storageKey, theme); }catch(e){}

    if(toggle){
      const icon = toggle.querySelector('.theme-icon');
      const sub = document.getElementById('theme-sub');
      toggle.classList.toggle('is-dark', theme === 'dark');
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      const labelOn = 'dark mode enabled!';
      const labelOff = 'enable dark mode!';
      toggle.setAttribute('aria-label', theme === 'dark' ? labelOn : labelOff);
      toggle.title = theme === 'dark' ? labelOn : labelOff;
      if(icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
      if(sub) sub.textContent = theme === 'dark' ? labelOn : labelOff;
      // tiny animation cue
      toggle.classList.add('anim');
      setTimeout(()=> toggle.classList.remove('anim'), 380);
    }
  }

  function init(){
    let saved = null; try{ saved = localStorage.getItem(storageKey); }catch(e){}
    if(!saved){
      saved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(saved);

    if(toggle){
      toggle.addEventListener('click', ()=>{
        const cur = root.classList.contains('theme-dark') ? 'dark' : 'light';
        applyTheme(cur === 'dark' ? 'light' : 'dark');
      });
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
