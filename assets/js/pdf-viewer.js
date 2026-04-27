// Minimal PDF.js-based viewer for single-page project PDF embeds
(function(){
  const wrap = document.querySelector('.pdf-embed');
  if(!wrap) return;
  const url = wrap.getAttribute('data-pdf-url');
  if(!url) return;

  // PDF.js worker setup
  if(window.pdfjsLib){
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
  }

  const canvas = document.getElementById('pdf-canvas');
  const ctx = canvas.getContext('2d');
  const pageNoEl = document.getElementById('pdf-pageno');
  const pagesEl = document.getElementById('pdf-pages');
  const prevBtn = document.getElementById('pdf-prev');
  const nextBtn = document.getElementById('pdf-next');
  const zoomIn = document.getElementById('pdf-zoom-in');
  const zoomOut = document.getElementById('pdf-zoom-out');

  let pdfDoc = null;
  let pageNum = 1;
  let scale = 1.0;

  function renderPage(num){
    pdfDoc.getPage(num).then(function(page){
      const viewport = page.getViewport({scale: scale});
      const ratio = Math.min((wrap.clientWidth-20)/viewport.width, 1);
      const renderScale = scale * ratio;
      const vp = page.getViewport({scale: renderScale});
      canvas.width = vp.width;
      canvas.height = vp.height;
      const renderContext = {canvasContext: ctx, viewport: vp};
      page.render(renderContext);
      pageNoEl.textContent = num;
    });
  }

  function queueRender(){ renderPage(pageNum); }

  function load(){
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf){
      pdfDoc = pdf;
      pagesEl.textContent = pdfDoc.numPages;
      renderPage(pageNum);
    }).catch(function(err){
      console.error('PDF load error', err);
      const el = document.createElement('div'); el.textContent = 'Unable to load PDF.'; wrap.appendChild(el);
    });
  }

  prevBtn.addEventListener('click', ()=>{ if(pageNum<=1) return; pageNum--; queueRender(); });
  nextBtn.addEventListener('click', ()=>{ if(pageNum>=pdfDoc.numPages) return; pageNum++; queueRender(); });
  zoomIn.addEventListener('click', ()=>{ scale = Math.min(3, scale+0.25); queueRender(); });
  zoomOut.addEventListener('click', ()=>{ scale = Math.max(0.5, scale-0.25); queueRender(); });

  // handle resize
  let resizeTimer = null; window.addEventListener('resize', ()=>{ clearTimeout(resizeTimer); resizeTimer = setTimeout(()=>{ queueRender(); }, 200); });

  // start
  if(window.pdfjsLib) load(); else {
    const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js'; s.onload = load; document.body.appendChild(s);
  }
})();
