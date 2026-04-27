// Theme toggle
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const storageKey = 'site-theme';

  function applyTheme(theme){
    if(theme === 'dark') root.classList.add('theme-dark'); else root.classList.remove('theme-dark');
    try{ localStorage.setItem(storageKey, theme); }catch(e){}
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
