// Projects tag filter and search
(function(){
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function init(){
    const grid = qs('#projects-grid');
    if(!grid) return;
    const cards = qsa('.project-card', grid);
    const tagBar = qs('#tag-bar');
    const searchInput = qs('#tag-search');

    // collect tags
    const tagSet = new Set();
    cards.forEach(c => {
      const tags = (c.dataset.tags||'').split(',').map(t=>t.trim()).filter(Boolean);
      tags.forEach(t=>tagSet.add(t));
      c.dataset._tags = JSON.stringify(tags);
    });
    const tags = Array.from(tagSet).sort();

    // render tag buttons
    const btnContainer = document.createElement('div');
    btnContainer.className = 'tag-buttons';
    tags.forEach(tag => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tag-btn';
      b.textContent = tag;
      b.dataset.tag = tag;
      btnContainer.appendChild(b);
    });
    tagBar.appendChild(btnContainer);

    let activeTags = new Set();

    function filter(){
      const q = (searchInput && searchInput.value||'').toLowerCase().trim();
      cards.forEach(c => {
        const title = (c.dataset.title||'');
        const cardTags = JSON.parse(c.dataset._tags || '[]');
        const matchesTags = activeTags.size === 0 || Array.from(activeTags).every(t => cardTags.includes(t));
        const matchesQuery = q === '' || title.includes(q) || (c.textContent||'').toLowerCase().includes(q);
        c.style.display = (matchesTags && matchesQuery) ? '' : 'none';
      });
    }

    // tag button events
    btnContainer.addEventListener('click', (e)=>{
      const b = e.target.closest('button.tag-btn');
      if(!b) return;
      const tag = b.dataset.tag;
      if(b.classList.contains('active')){ b.classList.remove('active'); activeTags.delete(tag); }
      else { b.classList.add('active'); activeTags.add(tag); }
      filter();
    });

    // search
    if(searchInput){
      searchInput.addEventListener('input', ()=>filter());
    }

    // initial
    filter();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
