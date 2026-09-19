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

/* ---------- Submission animation overlay ---------- */
const submitOverlay = document.getElementById('submitOverlay');
const mailAnim = document.getElementById('mailAnim');
const stateLoading = document.getElementById('stateLoading');
const stateSuccess = document.getElementById('stateSuccess');
const stateFailure = document.getElementById('stateFailure');
const submitAnotherBtn = document.getElementById('submitAnotherBtn');
const tryAgainBtn = document.getElementById('tryAgainBtn');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function wait(ms){
  return new Promise((resolve)=>setTimeout(resolve, ms));
}
function setMailPhase(phase){
  mailAnim.classList.remove('phase-compose','phase-insert','phase-sending','phase-success','phase-failure');
  if(phase) mailAnim.classList.add(phase);
}
function setOverlayState(state){
  // state: 'loading' | 'success' | 'failure' | null
  stateLoading.classList.toggle('is-active', state === 'loading');
  stateSuccess.classList.toggle('is-active', state === 'success');
  stateFailure.classList.toggle('is-active', state === 'failure');
}
function openSubmitOverlay(){
  submitOverlay.classList.add('open');
  submitOverlay.setAttribute('aria-hidden', 'false');
}
function closeSubmitOverlay(){
  submitOverlay.classList.remove('open');
  submitOverlay.setAttribute('aria-hidden', 'true');
  setMailPhase(null);
  setOverlayState(null);
  spSubmitBtn.disabled = false;
  spSubmitBtn.textContent = 'Send Project Request';
}

tryAgainBtn.addEventListener('click', ()=>{
  spFormError.classList.remove('show');
  closeSubmitOverlay();
  spSubmitBtn.focus();
});
submitAnotherBtn.addEventListener('click', ()=>{
  spFormSuccess.classList.remove('show');
  closeSubmitOverlay();
  document.getElementById('sp-name').focus();
});
document.addEventListener('keydown', (e)=>{
  if(e.key !== 'Escape' || !submitOverlay.classList.contains('open')) return;
  if(stateFailure.classList.contains('is-active')) tryAgainBtn.click();
  else if(stateSuccess.classList.contains('is-active')) submitAnotherBtn.click();
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

  // Open the overlay and start the mail-delivery choreography. This is purely
  // visual — the actual Netlify submission below is what determines whether
  // the sequence ends in the success (flies away) or failure (tears open) state.
  setOverlayState('loading');
  setMailPhase(null);
  openSubmitOverlay();

  const composeDelay = prefersReducedMotion ? 0 : 350;
  const insertDelay = prefersReducedMotion ? 0 : 550;
  const minSendDelay = prefersReducedMotion ? 0 : 900;
  const resultHoldDelay = prefersReducedMotion ? 0 : 900;

  requestAnimationFrame(()=>setMailPhase('phase-compose'));
  const choreography = wait(composeDelay)
    .then(()=>{ setMailPhase('phase-insert'); return wait(insertDelay); })
    .then(()=>{ setMailPhase('phase-sending'); return wait(minSendDelay); });

  // The REAL Netlify Forms submission — this, not the animation timer,
  // decides whether the sequence resolves as success or failure.
  const submission = fetch('/', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodeFormData(startProjectForm)
  }).then((res)=>{
    if(!res.ok) throw new Error('Network response was not ok');
  });

  Promise.all([choreography, submission])
    .then(()=>{
      // Real submission succeeded AND the minimum animation beat has played.
      setMailPhase('phase-success');
      spFormSuccess.classList.add('show');
      return wait(resultHoldDelay).then(()=>{
        setOverlayState('success');
        startProjectForm.reset();
        submitAnotherBtn.focus();
      });
    })
    .catch(()=>{
      // Real submission failed — wait for the choreography beat, then tear.
      return choreography.then(()=>{
        setMailPhase('phase-failure');
        spFormError.classList.add('show');
        return wait(resultHoldDelay).then(()=>{
          setOverlayState('failure');
          tryAgainBtn.focus();
        });
      });
    });
});
