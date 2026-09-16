/* ---------- Shared page background particles ---------- */
/* Reuses the exact particle logic from home.js so About/Services/Portfolio/Contact
   render the same animated background as the Home hero. */
(function(){
  const particleContainer = document.getElementById('particles');
  if(!particleContainer) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for(let i=0;i<24;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100+'%';
    p.style.top = Math.random()*100+'%';
    p.style.animationDelay = (Math.random()*9)+'s';
    p.style.animationDuration = (7+Math.random()*6)+'s';
    particleContainer.appendChild(p);
  }
})();
