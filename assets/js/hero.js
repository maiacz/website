// Hero animations and microinteractions
(function(){
  function init(){
    const hero = document.querySelector('.hero-animated');
    if(!hero) return;
    const wave = hero.querySelector('.wave');
    const sparkles = hero.querySelectorAll('.spark');
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if(!prefersReduced){
      // entrance animation
      requestAnimationFrame(()=> setTimeout(()=> hero.classList.add('animate'), 80));

      // gentle wave animation on hover
      if(wave){
        hero.addEventListener('mouseenter', ()=> wave.style.transform = 'rotate(18deg) translateY(-2px)');
        hero.addEventListener('mouseleave', ()=> wave.style.transform = 'none');
      }

      // subtle mouse parallax for sparkles
      hero.addEventListener('mousemove', (e)=>{
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        sparkles.forEach((s, i)=>{
          const depth = (i+1)/6;
          s.style.transform = `translate(${x * 18 * depth}px, ${y * 12 * depth}px)`;
        });
      });

      // reset on leave
      hero.addEventListener('mouseleave', ()=>{
        sparkles.forEach(s=> s.style.transform = 'translate(0,0)');
      });
    } else {
      // ensure visible
      hero.classList.add('animate');
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
