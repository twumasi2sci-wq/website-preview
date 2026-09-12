/* =========================================================
   CRIMSON — Start a Project page script
   Self-contained: mobile menu, form validation, Netlify Forms
   AJAX submit with duplicate-submission guard.
   ========================================================= */

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });

/* ---------- Form: validation + Netlify Forms AJAX submit ---------- */
const startProjectForm = document.getElementById('startProjectForm');
const spSubmitBtn = document.getElementById('spSubmitBtn');
const spFormSuccess = document.getElementById('spFormSuccess');
const spFormError = document.getElementById('spFormError');

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

function validateStartProjectForm(){
  let valid = true;

  const name = document.getElementById('sp-name');
  if(name.value.trim().length < 2){ setInvalid(name, true); valid = false; } else setInvalid(name, false);

  const email = document.getElementById('sp-email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailPattern.test(email.value.trim())){ setInvalid(email, true); valid = false; } else setInvalid(email, false);

  const phone = document.getElementById('sp-phone');
  const phonePattern = /^[0-9+()\-\s]{7,20}$/;
  if(phone.value.trim().length > 0 && !phonePattern.test(phone.value.trim())){ setInvalid(phone, true); valid = false; } else setInvalid(phone, false);

  const type = document.getElementById('sp-type');
  if(!type.value){ setInvalid(type, true); valid = false; } else setInvalid(type, false);

  const budget = document.getElementById('sp-budget');
  if(!budget.value){ setInvalid(budget, true); valid = false; } else setInvalid(budget, false);

  const message = document.getElementById('sp-desc');
  if(message.value.trim().length < 5){ setInvalid(message, true); valid = false; } else setInvalid(message, false);

  return valid;
}

['sp-name','sp-email','sp-phone','sp-type','sp-budget','sp-desc'].forEach(id=>{
  const el = document.getElementById(id);
  el.addEventListener('input', ()=>setInvalid(el, false));
  el.addEventListener('change', ()=>setInvalid(el, false));
});

startProjectForm.addEventListener('submit', function(e){
  e.preventDefault();

  // Guard against duplicate submissions while a request is in flight
  if(spSubmitBtn.disabled) return;

  spFormSuccess.classList.remove('show');
  spFormError.classList.remove('show');

  if(!validateStartProjectForm()){
    const firstInvalid = startProjectForm.querySelector('.invalid input, .invalid select, .invalid textarea');
    if(firstInvalid) firstInvalid.focus();
    return;
  }

  spSubmitBtn.disabled = true;
  spSubmitBtn.textContent = 'Sending…';

  fetch('/', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodeFormData(startProjectForm)
  })
  .then((res)=>{
    if(!res.ok) throw new Error('Network response was not ok');
    spFormSuccess.classList.add('show');
    startProjectForm.reset();
  })
  .catch(()=>{
    spFormError.classList.add('show');
  })
  .finally(()=>{
    spSubmitBtn.disabled = false;
    spSubmitBtn.textContent = 'Send Project Request';
  });
});
