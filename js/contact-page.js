/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });

/* ---------- Testimonials ---------- */
const testiData = [
  {name:'Alina Marsh', biz:'Founder, Essence Beverage Co.', quote:'CRIMSON took a vague brief and gave back an identity that felt like it had always existed. Our can redesign alone lifted retail pickup within a quarter.'},
  {name:'Devon Okafor', biz:'CMO, Data Wrld', quote:"The campaign system they built is still the backbone of everything we ship a year later. Rare to get design that's this considered and this fast."},
  {name:'Priya Nathan', biz:'Owner, Ember & Ash', quote:'They understood the restaurant before they ever designed a single asset. The brand feels exactly like walking into the room.'},
  {name:'Marcus Reyes', biz:'Founder, Northline Apparel', quote:'Every deliverable was production-ready, no back and forth about file specs. Just clean, usable work on time.'},
];
const testiGrid = document.getElementById('testiGrid');
testiData.forEach(t=>{
  const initials = t.name.split(' ').map(x=>x[0]).join('');
  const el = document.createElement('div');
  el.className = 'testi-card';
  el.innerHTML = `<div class="testi-stars">★★★★★</div><p class="testi-quote">"${t.quote}"</p>
    <div class="testi-person"><div class="testi-avatar">${initials}</div><div><div class="name">${t.name}</div><div class="biz">${t.biz}</div></div></div>`;
  testiGrid.appendChild(el);
});

/* ---------- Social row ---------- */
const socials = [
  {label:'WhatsApp', handle:'+233 506 084 942', href:'https://wa.me/233506084942', external:true},
  {label:'Email', handle:'crimsonwrld122@gmail.com', href:'mailto:crimsonwrld122@gmail.com', external:false},
  {label:'Instagram', handle:'@Crimson_wrld', href:'https://www.instagram.com/Crimson_wrld', external:true},
  {label:'Facebook', handle:'Crimson studio', href:'https://www.facebook.com/profile.php?id=61593715563813&mibextid=wwXlfr', external:true},
  {label:'TikTok', handle:'@crimson_wrld0', href:'https://www.tiktok.com/@crimson_wrld0', external:true},
];
const socialRow = document.getElementById('socialRow');
socials.forEach(s=>{
  const a = document.createElement('a');
  a.href = s.href;
  if(s.external){
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  a.innerHTML = `<span>${s.label}<br><span class="handle">${s.handle}</span></span><span class="arrow">↗</span>`;
  socialRow.appendChild(a);
});

/* ---------- Contact form: Netlify Forms AJAX submit + validation ---------- */
const projectForm = document.getElementById('projectForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

function encodeFormData(form){
  return new URLSearchParams(new FormData(form)).toString();
}

function fieldWrap(input){
  return input.closest('div');
}
function setInvalid(input, isInvalid){
  const wrap = fieldWrap(input);
  if(!wrap) return;
  wrap.classList.toggle('invalid', isInvalid);
}

function validateForm(){
  let valid = true;

  const name = document.getElementById('f-name');
  if(name.value.trim().length < 2){ setInvalid(name, true); valid = false; } else setInvalid(name, false);

  const email = document.getElementById('f-email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailPattern.test(email.value.trim())){ setInvalid(email, true); valid = false; } else setInvalid(email, false);

  const phone = document.getElementById('f-phone');
  const phonePattern = /^[0-9+()\-\s]{7,20}$/;
  if(phone.value.trim().length > 0 && !phonePattern.test(phone.value.trim())){ setInvalid(phone, true); valid = false; } else setInvalid(phone, false);

  const type = document.getElementById('f-type');
  if(!type.value){ setInvalid(type, true); valid = false; } else setInvalid(type, false);

  const budget = document.getElementById('f-budget');
  if(!budget.value){ setInvalid(budget, true); valid = false; } else setInvalid(budget, false);

  const message = document.getElementById('f-desc');
  if(message.value.trim().length < 5){ setInvalid(message, true); valid = false; } else setInvalid(message, false);

  return valid;
}

['f-name','f-email','f-phone','f-type','f-budget','f-desc'].forEach(id=>{
  const el = document.getElementById(id);
  el.addEventListener('input', ()=>setInvalid(el, false));
  el.addEventListener('change', ()=>setInvalid(el, false));
});

projectForm.addEventListener('submit', function(e){
  e.preventDefault();

  // Guard against duplicate submissions while a request is in flight
  if(submitBtn.disabled) return;

  formSuccess.classList.remove('show');
  formError.classList.remove('show');

  if(!validateForm()){
    const firstInvalid = projectForm.querySelector('.invalid input, .invalid select, .invalid textarea');
    if(firstInvalid) firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  fetch('/', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodeFormData(projectForm)
  })
  .then((res)=>{
    if(!res.ok) throw new Error('Network response was not ok');
    formSuccess.classList.add('show');
    projectForm.reset();
  })
  .catch(()=>{
    formError.classList.add('show');
  })
  .finally(()=>{
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Project Request';
  });
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
