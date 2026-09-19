/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });

/* ---------- Data ---------- */
/* Each entry is a whole collection of related designs. Clicking a card
   navigates straight to that collection's dedicated project page — there is
   no in-page modal here anymore; the full gallery, lightbox, and navigation
   live on the project page itself (see js/collection-gallery.js). */
const categories = ['All','Branding','Logo Design','Social Media','Flyers & Posters','Packaging','Clothing','Advertising','Motion Graphics'];

const projects = [
  {
    id:'church-ministry', title:'CHURCH & MINISTRY DESIGNS', cat:'Flyers & Posters',
    desc:'A collection of event posters and campaign flyers created for churches and ministries, harvest services, conventions, and gospel programmes.',
    count:6,
    thumb:{src:"../images/portfolio/church-ministry/6 x 4 copy (2).JPG", alt:"CHURCH & MINISTRY DESIGNS — collection thumbnail"},
    detailUrl:'/portfolio/church-ministry-designs/'
  },
  {
    id:'food-catering', title:'FOOD & CATERING DESIGNS', cat:'Advertising',
    desc:'A collection of promotional flyers created for restaurants, caterers, food products, and drink brands.',
    count:23,
    thumb:{src:"../images/portfolio/food-catering/17 X 21 copy.jpg", alt:"FOOD & CATERING DESIGNS — collection thumbnail"},
    detailUrl:'/portfolio/food-catering-designs/'
  },
  {
    id:'beauty-fashion', title:'BEAUTY & FASHION DESIGNS', cat:'Advertising',
    desc:'A collection of promotional designs created for beauty parlours, nail studios, and fashion-related businesses.',
    count:3,
    thumb:{src:"../images/portfolio/beauty-fashion/104 x 117 copy.jpg", alt:"BEAUTY & FASHION DESIGNS — collection thumbnail"},
    detailUrl:'/portfolio/beauty-fashion-designs/'
  },
  {
    id:'business-commercial', title:'BUSINESS & COMMERCIAL DESIGNS', cat:'Advertising',
    desc:'A collection of advertising designs created for local shops, bars, and general commercial businesses.',
    count:7,
    thumb:{src:"../images/portfolio/business-commercial/Peace corner copy.jpg", alt:"BUSINESS & COMMERCIAL DESIGNS — collection thumbnail"},
    detailUrl:'/portfolio/business-commercial-designs/'
  },
  {
    id:'school-education', title:'SCHOOL & EDUCATION DESIGNS', cat:'Flyers & Posters',
    desc:'A collection of promotional banners and posters created for schools and educational programmes.',
    count:3,
    thumb:{src:"../images/portfolio/school-education/45 x 36  B.jpg", alt:"SCHOOL & EDUCATION DESIGNS — collection thumbnail"},
    detailUrl:'/portfolio/school-education-designs/'
  },
  {
    id:'events-community', title:'EVENTS & COMMUNITY DESIGNS', cat:'Flyers & Posters',
    desc:'A community outreach poster created for a free health-screening event.',
    count:1,
    thumb:{src:"../images/portfolio/events-community/Calvary copy.jpg", alt:"EVENTS & COMMUNITY DESIGNS — collection thumbnail"},
    detailUrl:'/portfolio/events-community-designs/'
  },
  {
    id:'branding-logo', title:'BRANDING & LOGO DESIGN', cat:'Branding',
    desc:'A collection of logo and brand identity marks created for local businesses.',
    count:2,
    thumb:{src:"../images/portfolio/branding-logo/3s.JPG", alt:"BRANDING & LOGO DESIGN — collection thumbnail"},
    detailUrl:'/portfolio/branding-logo-designs/'
  },
  {
    id:'crimson-tshirts', title:'CRIMSON STUDIO T-SHIRT DESIGNS', cat:'Clothing',
    desc:'Creative custom T-shirt designs for Crimson Studio featuring bold character artwork, typography, distinctive graphic compositions, and a range of unique visual concepts.',
    count:13,
    thumb:{src:"../images/clothing/crimson-studio/crimson-studio-shirt-01.jpg", alt:"CRIMSON STUDIO T-SHIRT DESIGNS — collection thumbnail"},
    detailUrl:'/portfolio/crimson-studio-t-shirt-designs/'
  },
];

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
/* Every card is a plain link straight to its collection's dedicated page —
   there is no click-to-open-modal step. */
const portfolioGrid = document.getElementById('portfolioGrid');
projects.forEach((p)=>{
  const el = document.createElement('a');
  el.href = p.detailUrl;
  el.className = 'portfolio-item collection-card';
  el.dataset.cat = p.cat;
  el.innerHTML = `
    <div class="p-visual"><img src="${p.thumb.src}" alt="${p.thumb.alt}" loading="lazy" decoding="async"></div>
    <div class="p-badge">${p.count} Design${p.count === 1 ? '' : 's'}</div>
    <div class="p-overlay collection-overlay">
      <div class="p-cat">${p.cat}</div>
      <div class="p-title">${p.title}</div>
      <p class="collection-desc">${p.desc}</p>
      <span class="collection-cta">View Full Project
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
      </span>
    </div>
  `;
  portfolioGrid.appendChild(el);
});

function filterPortfolio(cat){
  document.querySelectorAll('.portfolio-item').forEach(el=>{
    const show = cat === 'All' || el.dataset.cat === cat;
    el.classList.toggle('hidden-item', !show);
  });
}

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
