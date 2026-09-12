/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });

/* ---------- Services ---------- */
const services = [
  {icon:'M4 20L20 4M4 4h16v16', title:'Logo Design', desc:'Distinct marks built to hold up at any size, on any surface.'},
  {icon:'M3 12h18M3 6h18M3 18h18', title:'Brand Identity', desc:'Complete visual systems — color, type, voice, and rules to keep it consistent.'},
  {icon:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', title:'Social Media Design', desc:'Templates and campaign assets built for the feed, not just the frame.'},
  {icon:'M4 4h16v16H4zM4 10h16', title:'Flyer & Poster Design', desc:'Print-ready layouts that grab attention in a few seconds flat.'},
  {icon:'M6 3h12l2 5v13H4V8z', title:'Product Packaging', desc:'Shelf-ready packaging design that sells before anyone opens it.'},
  {icon:'M8 3l4 3 4-3 3 5-3 2v11H5V10L2 8z', title:'T-Shirt & Clothing Branding', desc:'Apparel graphics and brand systems for clothing lines.'},
  {icon:'M3 6h18v12H3zM3 10h18', title:'Business Cards', desc:'First impressions, printed — clean, considered, memorable.'},
  {icon:'M4 4h16v16H4zM4 12h16', title:'Brochures', desc:'Multi-page layouts that guide a reader with intent.'},
  {icon:'M3 3l18 9-18 9V3z', title:'Advertising Design', desc:'Campaign creative built to perform across print and digital.'},
  {icon:'M5 3l14 9-14 9V3z', title:'Motion Graphics', desc:'Animated brand assets for social, web, and video intros.'},
  {icon:'M12 2l2.4 7.2H22l-6 4.6L18.4 21 12 16.4 5.6 21 8 13.8l-6-4.6h7.6z', title:'AI-Powered Creative Design', desc:'AI-assisted workflows that speed up exploration without flattening the outcome.'},
];
const serviceGrid = document.getElementById('serviceGrid');
services.forEach(s=>{
  const el = document.createElement('div');
  el.className = 'service-card';
  el.innerHTML = `<div class="service-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="${s.icon}"/></svg></div>
    <h3>${s.title}</h3><p>${s.desc}</p>`;
  serviceGrid.appendChild(el);
});

/* ---------- Process ---------- */
const processData = [
  {n:'01', t:'Discover', d:"Understand the client's goals and vision."},
  {n:'02', t:'Concept', d:'Develop creative ideas and visual direction.'},
  {n:'03', t:'Design', d:'Create the final visual solution.'},
  {n:'04', t:'Refine', d:'Review feedback and perfect the details.'},
  {n:'05', t:'Deliver', d:'Provide professional, production-ready files.'},
];
const processSteps = document.getElementById('processSteps');
processData.forEach(s=>{
  const el = document.createElement('div');
  el.className = 'process-step';
  el.innerHTML = `<div class="process-badge">${s.n}</div><h4>${s.t}</h4><p>${s.d}</p>`;
  processSteps.appendChild(el);
});

/* ---------- Pricing ---------- */
const pricingData = [
  {tier:'Starter', name:'Starter', featured:false, features:['Logo Design','2 Concepts','2 Revisions','Final Files']},
  {tier:'Professional', name:'Professional', featured:true, features:['Logo','Brand Identity','Social Media Designs','Multiple Revisions','Complete Brand Files']},
  {tier:'Premium', name:'Premium', featured:false, features:['Full Brand Identity','Marketing Materials','Social Media Package','Packaging / Clothing Design','Motion Graphics','Complete Brand Guidelines']},
];
const pricingGrid = document.getElementById('pricingGrid');
pricingData.forEach(p=>{
  const el = document.createElement('div');
  el.className = 'price-card' + (p.featured?' featured':'');
  el.innerHTML = `<div class="price-tier mono">${p.tier}</div><div class="price-name">${p.name}</div>
    <ul class="price-features">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>
    <a href="/contact/" class="price-cta">Get Started</a>`;
  pricingGrid.appendChild(el);
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

/* ---------- Process line fill on scroll into view ---------- */
const processTrack = document.getElementById('processTrack');
const processFill = document.getElementById('processFill');
const processStepEls = ()=>document.querySelectorAll('.process-step');
if('IntersectionObserver' in window){
  const pio = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        processFill.style.width = '100%';
        let i=0;
        const steps = processStepEls();
        const timer = setInterval(()=>{
          if(i<steps.length){ steps[i].classList.add('on'); i++; }
          else clearInterval(timer);
        }, 220);
        pio.unobserve(entry.target);
      }
    });
  }, {threshold:0.3});
  pio.observe(processTrack);
}
