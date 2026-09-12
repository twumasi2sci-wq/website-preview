/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });

/* ---------- Why choose us ---------- */
const whyData = [
  {n:'01', t:'Creative Thinking', d:'Original concepts designed specifically for each client.'},
  {n:'02', t:'Professional Quality', d:'Clean, polished designs ready for professional use.'},
  {n:'03', t:'Modern Technology', d:'Modern design tools, AI-assisted workflows, and advanced creative techniques.'},
  {n:'04', t:'Attention to Detail', d:'Every element is carefully considered.'},
];
const whyGrid = document.getElementById('whyGrid');
whyData.forEach(w=>{
  const el = document.createElement('div');
  el.className = 'why-card';
  el.innerHTML = `<div class="why-num mono">${w.n}</div><h3>${w.t}</h3><p>${w.d}</p>`;
  whyGrid.appendChild(el);
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
