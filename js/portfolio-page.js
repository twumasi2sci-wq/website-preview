/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });

/* ---------- Data ---------- */
const categories = ['All','Branding','Logo Design','Social Media','Flyers & Posters','Packaging','Clothing','Advertising','Motion Graphics'];

const projects = [
  {
    id:'essence-beverage', title:'Crimson Essence Beverage Branding', cat:'Branding', client:'Essence Beverage Co.',
    type:'Brand Identity', date:'Feb 2024', tools:'Adobe Illustrator, Photoshop',
    colors:['#C8102E','#0A0A0C','#F5F3F0'],
    desc:'A full identity system for a premium beverage brand — wordmark, can design, and a color system built to stand out on a crowded shelf while feeling unmistakably premium.',
    size:'wide', media:{kind:'svg', c1:'#C8102E', c2:'#0A0A0C'}
  },
  {
    id:'data-wrld', title:'Crimson Data Wrld Campaign', cat:'Advertising', client:'Data Wrld',
    type:'Ad Campaign', date:'Apr 2024', tools:'Adobe InDesign, Illustrator',
    colors:['#1a1a1e','#C8102E','#F5F3F0'],
    desc:'A campaign identity for a data infrastructure company — grid-driven layouts, a restrained type system, and ad units built to work across LinkedIn, print, and out-of-home.',
    size:'tall', media:{kind:'svg', c1:'#1a1a1e', c2:'#C8102E'}
  },
  {
    id:'northline-apparel', title:'Clothing Brand Identity', cat:'Clothing', client:'Northline Apparel',
    type:'Brand Identity', date:'Jun 2024', tools:'Adobe Illustrator, Photoshop',
    colors:['#0A0A0C','#38383E','#F5F3F0'],
    desc:'Logo, tag system, and garment graphics for an emerging streetwear label — designed to read equally well on a hangtag and a billboard.',
    size:'normal', media:{kind:'svg', c1:'#0A0A0C', c2:'#38383E'}
  },
  {
    id:'maison-vale', title:'Luxury Product Packaging', cat:'Packaging', client:'Maison Vale',
    type:'Packaging Design', date:'Sep 2023', tools:'Adobe Illustrator, Dimension',
    colors:['#161618','#C8102E','#F5F3F0'],
    desc:'Box structure, foil treatment, and unboxing sequence for a luxury fragrance brand — every material choice built to signal quality before the lid is even off.',
    size:'normal', media:{kind:'svg', c1:'#161618', c2:'#C8102E'}
  },
  {
    id:'ember-ash', title:'Restaurant Branding', cat:'Branding', client:'Ember & Ash',
    type:'Brand Identity', date:'Nov 2023', tools:'Adobe Illustrator, InDesign',
    colors:['#2a1210','#C8102E','#F5F3F0'],
    desc:'Full identity for a chef-driven restaurant — menu system, signage, and a mark that carries the warmth of the kitchen into every printed piece.',
    size:'normal', media:{kind:'svg', c1:'#2a1210', c2:'#C8102E'}
  },
  {
    id:'fieldnote-coffee', title:'Social Media Campaign', cat:'Social Media', client:'Fieldnote Coffee',
    type:'Social Content System', date:'Jan 2025', tools:'Adobe Photoshop, Figma',
    colors:['#0A0A0C','#5C1720','#F5F3F0'],
    desc:'A flexible social template system that let an in-house team ship consistent, on-brand content daily without a designer in the loop for every post.',
    size:'wide', media:{kind:'svg', c1:'#0A0A0C', c2:'#5C1720'}
  },
  {
    id:'halstead-partners', title:'Corporate Brand Identity', cat:'Branding', client:'Halstead Partners',
    type:'Brand Identity', date:'Mar 2024', tools:'Adobe Illustrator, InDesign',
    colors:['#131316','#38383E','#F5F3F0'],
    desc:'A brand identity for a financial advisory firm — a mark and system designed to read as established and trustworthy from day one.',
    size:'normal', media:{kind:'svg', c1:'#131316', c2:'#38383E'}
  },
  {
    id:'kinetic-labs', title:'Motion Reel — Product Launch', cat:'Motion Graphics', client:'Kinetic Labs',
    type:'Motion Graphics', date:'Jul 2024', tools:'After Effects, Cinema 4D',
    colors:['#0A0A0C','#C8102E','#F5F3F0'],
    desc:'An animated identity sting and product reveal sequence built around a kinetic type system, used across the launch film and paid social cutdowns.',
    size:'tall', media:{kind:'svg', c1:'#0A0A0C', c2:'#C8102E'}
  },
  {
    id:'riverside-night-market', title:'Poster Series — Night Market', cat:'Flyers & Posters', client:'Riverside Night Market',
    type:'Poster Design', date:'Aug 2023', tools:'Adobe Illustrator, Photoshop',
    colors:['#1a1a1e','#8a1524','#F5F3F0'],
    desc:'A flexible poster template system for a recurring event — bold type, a repeatable grid, and a palette that shifts slightly with each edition.',
    size:'normal', media:{kind:'svg', c1:'#1a1a1e', c2:'#8a1524'}
  },
  {
    id:'crimson-tshirts', title:'CRIMSON STUDIO T-SHIRT DESIGNS', cat:'Clothing', client:'Crimson Studio',
    type:'T-Shirt Design', date:'May 2026', tools:'Adobe Photoshop, Adobe Illustrator',
    colors:['#F97316','#0A0A0C','#F5F3F0','#C8102E'],
    desc:'Creative custom T-shirt designs for Crimson Studio featuring bold character artwork, typography, distinctive graphic compositions, and a range of unique visual concepts.',
    size:'wide',
    detailUrl:'/portfolio/crimson-studio-t-shirt-designs/',
    media:{
      kind:'gallery',
      images:Array.from({length:13}, (_,i)=>{
        const n = String(i+1).padStart(2,'0');
        return {
          src:`../images/clothing/crimson-studio/crimson-studio-shirt-${n}.jpg`,
          alt:`Crimson Studio T-shirt design ${n}`
        };
      })
    }
  },
];

/* ---------- SVG mockup generator ---------- */
function mockSVG(p, seed){
  const s = seed || 1;
  return `<svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g${s}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${p.media.c1}"/>
        <stop offset="100%" stop-color="${p.media.c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#g${s})"/>
    <circle cx="${80+s*30}" cy="${100+s*20}" r="${60+s*8}" fill="rgba(245,243,240,0.05)"/>
    <rect x="${40}" y="${260+s*4}" width="${180}" height="${2}" fill="rgba(245,243,240,0.25)"/>
    <text x="40" y="330" font-family="Unbounded, sans-serif" font-weight="700" font-size="22" fill="rgba(245,243,240,0.92)">${p.title.split(' ').slice(0,2).join(' ')}</text>
    <text x="40" y="354" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="1" fill="rgba(200,16,46,0.95)">${p.cat.toUpperCase()}</text>
  </svg>`;
}

/* ---------- Small metadata icons ---------- */
const ICONS = {
  person:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>',
  grid:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  calendar:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
  pencil:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  palette:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a9 9 0 1 0 0 18c1 0 2-.5 2-2 0-.7-.3-1.1-.6-1.5-.3-.4-.6-.8-.6-1.5 0-1 .8-2 2-2h2a4 4 0 0 0 4-4c0-4.5-4-7-8.8-7Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/></svg>'
};

/* ---------- Render filters ---------- */
const filterRow = document.getElementById('filterRow');
categories.forEach((c,i)=>{
  const b = document.createElement('button');
  b.className = 'filter-btn' + (i===0?' active':'');
  b.textContent = c;
  b.dataset.cat = c;
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    filterPortfolio(c);
  });
  filterRow.appendChild(b);
});

/* ---------- Render portfolio grid ---------- */
const portfolioGrid = document.getElementById('portfolioGrid');
projects.forEach((p,i)=>{
  const el = document.createElement('div');
  el.className = 'portfolio-item' + (p.size==='wide'?' wide':'') + (p.size==='tall'?' tall':'');
  el.dataset.cat = p.cat;
  const visual = p.media.kind==='gallery'
    ? `<img src="${p.media.images[0].src}" alt="${p.media.images[0].alt}" loading="lazy" decoding="async">`
    : mockSVG(p, (i%5)+1);
  const badge = p.media.kind==='gallery' ? `<div class="p-badge mono">${p.media.images.length} Designs</div>` : '';
  el.innerHTML = `<div class="p-visual">${visual}</div>
    ${badge}
    <div class="p-overlay"><div class="p-cat mono">${p.cat}</div><div class="p-title">${p.title}</div></div>`;
  el.addEventListener('click', ()=>openProject(i));
  el.setAttribute('tabindex','0');
  el.setAttribute('role','button');
  el.setAttribute('aria-label','View project: '+p.title);
  el.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openProject(i);} });
  portfolioGrid.appendChild(el);
});

function filterPortfolio(cat){
  document.querySelectorAll('.portfolio-item').forEach((el)=>{
    const show = cat==='All' || el.dataset.cat===cat;
    el.classList.toggle('hidden-item', !show);
  });
}

/* ---------- Project viewer (modal) ---------- */
const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');
let currentProjectIndex = 0;
let currentDesignIndex = 0;

function metaRow(iconKey, label, valueHtml){
  return `<div class="viewer-meta-row">
    <span class="viewer-meta-icon">${ICONS[iconKey]}</span>
    <div><div class="viewer-meta-k mono">${label}</div><div class="viewer-meta-v">${valueHtml}</div></div>
  </div>`;
}

function renderProject(){
  const p = projects[currentProjectIndex];
  const isGallery = p.media.kind === 'gallery';
  currentDesignIndex = 0;

  const swatchesHtml = `<div class="viewer-swatches">${p.colors.map(c=>`<span class="viewer-swatch" style="background:${c}" title="${c}"></span>`).join('')}</div>`;

  const stageHtml = isGallery ? `
    <div class="viewer-main-image">
      <img id="viewerMainImg" src="${p.media.images[0].src}" alt="${p.media.images[0].alt}" loading="eager" decoding="async">
      <button class="viewer-design-nav prev" id="designPrev" aria-label="Previous design">‹</button>
      <button class="viewer-design-nav next" id="designNext" aria-label="Next design">›</button>
      <div class="viewer-design-counter mono">T-SHIRT <strong id="designCounterNum">01</strong> / ${p.media.images.length}</div>
    </div>
    <div class="viewer-thumbs" id="viewerThumbs">
      ${p.media.images.map((img,idx)=>`<button class="viewer-thumb${idx===0?' active':''}" data-idx="${idx}" aria-label="View ${img.alt}"><img src="${img.src}" alt="${img.alt}" loading="lazy"></button>`).join('')}
    </div>
  ` : `
    <div class="viewer-main-image">${mockSVG(p, (currentProjectIndex%5)+1)}</div>
  `;

  modalContent.innerHTML = `
    <button class="viewer-close" id="modalCloseBtn" aria-label="Close project viewer">✕</button>
    <div class="viewer-body">
      <div class="viewer-stage">${stageHtml}</div>
      <div class="viewer-info">
        <div class="viewer-cat mono">${p.type}</div>
        <h3 class="viewer-title">${p.title}</h3>
        <div class="viewer-title-rule"></div>
        <p class="viewer-desc">${p.desc}</p>
        <div class="viewer-meta">
          ${metaRow('person','Client', p.client)}
          ${metaRow('grid','Category', p.cat)}
          ${metaRow('calendar','Date', p.date)}
          ${metaRow('pencil','Tools', p.tools)}
          ${metaRow('palette','Colors', swatchesHtml)}
        </div>
        ${p.detailUrl
          ? `<a class="viewer-cta" id="viewFullBtn" href="${p.detailUrl}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg> View Full Project</a>`
          : `<button class="viewer-cta" id="viewFullBtn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg> View Full Project</button>`}
      </div>
    </div>
    <div class="viewer-projectnav">
      <button class="viewer-projectnav-btn" id="prevProjectBtn">‹ <span class="label">Previous Project</span></button>
      <div class="viewer-projectcounter mono"><strong>${String(currentProjectIndex+1).padStart(2,'0')}</strong> / ${String(projects.length).padStart(2,'0')}</div>
      <button class="viewer-projectnav-btn" id="nextProjectBtn"><span class="label">Next Project</span> ›</button>
    </div>`;

  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('prevProjectBtn').addEventListener('click', ()=>{
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    renderProject();
  });
  document.getElementById('nextProjectBtn').addEventListener('click', ()=>{
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    renderProject();
  });

  if(isGallery){
    const mainImg = document.getElementById('viewerMainImg');
    const counterNum = document.getElementById('designCounterNum');
    const thumbs = document.querySelectorAll('.viewer-thumb');

    function showDesign(idx){
      currentDesignIndex = (idx + p.media.images.length) % p.media.images.length;
      const img = p.media.images[currentDesignIndex];
      mainImg.style.opacity = '0';
      setTimeout(()=>{
        mainImg.src = img.src;
        mainImg.alt = img.alt;
        mainImg.style.opacity = '1';
      }, 120);
      counterNum.textContent = String(currentDesignIndex+1).padStart(2,'0');
      thumbs.forEach(t=>t.classList.toggle('active', Number(t.dataset.idx)===currentDesignIndex));
      const activeThumb = document.querySelector(`.viewer-thumb[data-idx="${currentDesignIndex}"]`);
      if(activeThumb) activeThumb.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
    }

    document.getElementById('designPrev').addEventListener('click', ()=>showDesign(currentDesignIndex - 1));
    document.getElementById('designNext').addEventListener('click', ()=>showDesign(currentDesignIndex + 1));
    thumbs.forEach(t=>t.addEventListener('click', ()=>showDesign(Number(t.dataset.idx))));
  }
}

function openProject(i){
  currentProjectIndex = i;
  renderProject();
  modalBackdrop.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modalBackdrop.classList.remove('open');
  document.body.style.overflow='';
}
modalBackdrop.addEventListener('click', (e)=>{ if(e.target===modalBackdrop) closeModal(); });
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape') closeModal();
  if(!modalBackdrop.classList.contains('open')) return;
  if(e.key==='ArrowLeft'){
    const prevDesignBtn = document.getElementById('designPrev');
    if(prevDesignBtn) prevDesignBtn.click();
  }
  if(e.key==='ArrowRight'){
    const nextDesignBtn = document.getElementById('designNext');
    if(nextDesignBtn) nextDesignBtn.click();
  }
});

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

/* ---------- Deep link: #project-N auto-opens that project's viewer ----------
   Used by the dedicated T-shirt project page's Previous/Next Project
   controls to hand off back into this portfolio page at the right project. */
(function handleProjectDeepLink(){
  const match = location.hash.match(/^#project-(\d+)$/);
  if(!match) return;
  const idx = Number(match[1]);
  if(idx < 0 || idx >= projects.length) return;
  openProject(idx);
})();
