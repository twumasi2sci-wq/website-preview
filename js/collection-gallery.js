/* =========================================================
   CRIMSON — Collection project-detail script
   Generic version of project-page.js (which stays dedicated
   to the T-shirt project). Reads its image set from
   window.COLLECTION_IMAGES (set by an inline <script> in each
   collection page) instead of a hardcoded design list.
   Gallery render, lightbox, keyboard/swipe nav, reveal-on-scroll,
   mobile menu, header scroll state, smart back navigation.
   ========================================================= */

const collectionImages = window.COLLECTION_IMAGES || [];

/* ---------- Primary gallery: large image + thumbnail strip ---------- */
const phMainImg = document.getElementById('phMainImg');
const phDesignCounterNum = document.getElementById('phDesignCounterNum');
const phThumbs = document.getElementById('phThumbs');
let currentDesign = 0;

collectionImages.forEach((d, idx)=>{
  const thumb = document.createElement('button');
  thumb.className = 'viewer-thumb' + (idx === 0 ? ' active' : '');
  thumb.dataset.idx = idx;
  thumb.setAttribute('aria-label', `View ${d.alt}`);
  thumb.innerHTML = `<img src="${d.src}" alt="${d.alt}" loading="lazy" decoding="async">`;
  thumb.addEventListener('click', ()=>showDesign(idx));
  phThumbs.appendChild(thumb);
});
const phThumbEls = document.querySelectorAll('#phThumbs .viewer-thumb');

function showDesign(idx){
  currentDesign = (idx + collectionImages.length) % collectionImages.length;
  const d = collectionImages[currentDesign];
  phMainImg.style.opacity = '0';
  setTimeout(()=>{
    phMainImg.src = d.src;
    phMainImg.alt = d.alt;
    phMainImg.style.opacity = '1';
  }, 120);
  phDesignCounterNum.textContent = String(currentDesign+1).padStart(2,'0');
  phThumbEls.forEach(t=>t.classList.toggle('active', Number(t.dataset.idx) === currentDesign));
  const activeThumb = document.querySelector(`#phThumbs .viewer-thumb[data-idx="${currentDesign}"]`);
  if(activeThumb) activeThumb.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
}

document.getElementById('phDesignPrev').addEventListener('click', ()=>showDesign(currentDesign - 1));
document.getElementById('phDesignNext').addEventListener('click', ()=>showDesign(currentDesign + 1));

/* Clicking the main image opens the full-screen lightbox at the current design */
document.getElementById('phMainImageWrap').addEventListener('click', (e)=>{
  if(e.target.closest('.viewer-design-nav')) return; // prev/next clicks shouldn't also open the lightbox
  openLightbox(currentDesign);
});

/* Left/right arrow keys move the primary gallery when the lightbox is closed */
document.addEventListener('keydown', (e)=>{
  if(lightbox.classList.contains('open')) return;
  if(document.activeElement && ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
  if(e.key === 'ArrowLeft') showDesign(currentDesign - 1);
  if(e.key === 'ArrowRight') showDesign(currentDesign + 1);
});

/* ---------- Lightbox ---------- */
const lightbox = document.getElementById('phLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounterNum = document.getElementById('lightboxCounterNum');

function showLightboxDesign(idx){
  currentDesign = (idx + collectionImages.length) % collectionImages.length;
  const d = collectionImages[currentDesign];
  lightboxImg.style.opacity = '0';
  setTimeout(()=>{
    lightboxImg.src = d.src;
    lightboxImg.alt = d.alt;
    lightboxImg.style.opacity = '1';
  }, 120);
  lightboxCounterNum.textContent = String(currentDesign+1).padStart(2,'0');
  // keep the primary gallery's counter and active thumbnail in sync
  phDesignCounterNum.textContent = String(currentDesign+1).padStart(2,'0');
  phMainImg.src = d.src;
  phMainImg.alt = d.alt;
  phThumbEls.forEach(t=>t.classList.toggle('active', Number(t.dataset.idx) === currentDesign));
}

function openLightbox(idx){
  showLightboxDesign(idx);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', ()=>showLightboxDesign(currentDesign - 1));
document.getElementById('lightboxNext').addEventListener('click', ()=>showLightboxDesign(currentDesign + 1));
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e)=>{
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') showLightboxDesign(currentDesign - 1);
  if(e.key === 'ArrowRight') showLightboxDesign(currentDesign + 1);
});

/* ---------- Touch/swipe navigation (lightbox) ---------- */
let touchStartX = 0;
let touchEndX = 0;
lightbox.addEventListener('touchstart', (e)=>{ touchStartX = e.changedTouches[0].screenX; }, {passive:true});
lightbox.addEventListener('touchend', (e)=>{
  touchEndX = e.changedTouches[0].screenX;
  const delta = touchEndX - touchStartX;
  if(Math.abs(delta) > 40){
    if(delta > 0) showLightboxDesign(currentDesign - 1);
    else showLightboxDesign(currentDesign + 1);
  }
}, {passive:true});

/* ---------- Touch/swipe navigation (primary gallery main image) ---------- */
let mainTouchStartX = 0;
document.getElementById('phMainImageWrap').addEventListener('touchstart', (e)=>{ mainTouchStartX = e.changedTouches[0].screenX; }, {passive:true});
document.getElementById('phMainImageWrap').addEventListener('touchend', (e)=>{
  const delta = e.changedTouches[0].screenX - mainTouchStartX;
  if(Math.abs(delta) > 40){
    if(delta > 0) showDesign(currentDesign - 1);
    else showDesign(currentDesign + 1);
  }
}, {passive:true});

/* ---------- Smart back button (preserve portfolio scroll position) ---------- */
document.getElementById('backToPortfolio').addEventListener('click', function(e){
  if(document.referrer && document.referrer.indexOf(location.origin) === 0 && window.history.length > 1){
    e.preventDefault();
    window.history.back();
  }
  // otherwise, let the default href="/#portfolio" navigation happen
});

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el=>io.observe(el));
} else {
  revealEls.forEach(el=>el.classList.add('is-visible'));
}
