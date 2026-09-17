/* =========================================================
   CRIMSON — Start a Project page script
   Mobile menu, form validation, Netlify Forms AJAX submit,
   and the envelope submission animation.

   STRUCTURE NOTE: the code that prevents the native page
   reload and performs the real Netlify submission is wired
   up FIRST and is self-contained. The animation subsystem is
   wrapped separately so that if anything in it ever throws,
   the form still submits correctly and the visitor still gets
   a clear text result — it can never fall back to a native
   browser form submission (the "page reloads before the
   animation can play" failure mode).

   The animation's SUCCESS/FAILURE branch only ever fires
   after the real fetch() to Netlify resolves. Clicking the
   button only starts the neutral "packing the letter" motion
   — it never claims an outcome on its own.
   ========================================================= */

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if(navToggle && mobileMenu && mobileClose){
  navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });
}

/* ---------- Core form elements (required for submission to work at all) ---------- */
const startProjectForm = document.getElementById('startProjectForm');
const spSubmitBtn = document.getElementById('spSubmitBtn');
const spSrAnnounce = document.getElementById('spSrAnnounce');

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
  if(el){
    el.addEventListener('input', ()=>setInvalid(el, false));
    el.addEventListener('change', ()=>setInvalid(el, false));
  }
});

/* ---------- Plain-text fallback result (used if the animation subsystem
   is ever unavailable or throws — the visitor always gets a real result) ---------- */
function showPlainResult(ok){
  spSrAnnounce.textContent = ok
    ? "Thank you! Your project request has been sent successfully. We'll get back to you soon."
    : 'Something went wrong. Please try again or contact us directly.';
  spSubmitBtn.textContent = ok ? 'Sent ✓' : 'Send Project Request';
  if(!ok){
    spSubmitBtn.disabled = false;
  }
  // Minimal inline banner so the result is visible even without the animation CSS/JS.
  let banner = document.getElementById('spPlainBanner');
  if(!banner){
    banner = document.createElement('div');
    banner.id = 'spPlainBanner';
    banner.setAttribute('role', ok ? 'status' : 'alert');
    banner.style.marginTop = '18px';
    banner.style.padding = '16px 18px';
    banner.style.borderRadius = '6px';
    banner.style.fontSize = '14px';
    startProjectForm.appendChild(banner);
  }
  banner.style.border = '1px solid ' + (ok ? 'var(--crimson-bright)' : '#E8A93A');
  banner.style.color = ok ? 'var(--white)' : '#E8A93A';
  banner.textContent = ok
    ? "✓ Thank you! Your project request has been sent successfully. We'll get back to you soon."
    : '⚠ Something went wrong. Please try again or contact us directly.';
  if(ok) startProjectForm.reset();
}

/* ---------- Animation subsystem (optional layer — never blocks submission) ---------- */
let playSubmissionAnimation = null;
try{
  const submitOverlay = document.getElementById('submitOverlay');
  const envScene = document.getElementById('envScene');
  const submitResult = document.getElementById('submitResult');
  const submitResultTitle = document.getElementById('submitResultTitle');
  const submitResultMsg = document.getElementById('submitResultMsg');
  const submitAgainBtn = document.getElementById('submitAgainBtn');
  const submitTryAgainBtn = document.getElementById('submitTryAgainBtn');

  if(!submitOverlay || !envScene || !submitResult || !submitResultTitle || !submitResultMsg || !submitAgainBtn || !submitTryAgainBtn){
    throw new Error('Submission animation elements are missing from the page — falling back to plain text result.');
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = reduceMotion
    ? {doc:0, pack:60, seal:120, wait:180, successReveal:260, failReveal:260}
    : {doc:20, pack:620, seal:1320, wait:1870, successReveal:1300, failReveal:1080};

  let sceneTimers = [];
  function clearSceneTimers(){
    sceneTimers.forEach(t=>clearTimeout(t));
    sceneTimers = [];
  }
  function resetScene(){
    clearSceneTimers();
    envScene.className = 'env-scene';
  }

  function openOverlay(){
    submitOverlay.classList.add('open');
    submitOverlay.setAttribute('aria-hidden', 'false');
  }
  function closeOverlay(){
    submitOverlay.classList.remove('open');
    submitOverlay.setAttribute('aria-hidden', 'true');
    submitResult.classList.remove('show');
    resetScene();
  }

  function showResult(ok){
    submitResultTitle.textContent = ok ? 'PROJECT REQUEST SENT' : 'PROJECT REQUEST FAILED';
    submitResultTitle.className = 'submit-result-title ' + (ok ? 'is-success' : 'is-fail');
    submitResultMsg.textContent = ok
      ? "Thank you! Your project request has been sent successfully. We'll get back to you soon."
      : "Something went wrong. Please try again or contact us directly.";
    submitAgainBtn.style.display = ok ? 'inline-flex' : 'none';
    submitTryAgainBtn.style.display = ok ? 'none' : 'inline-flex';
    submitResult.classList.add('show');
    (ok ? submitAgainBtn : submitTryAgainBtn).focus();
  }

  playSubmissionAnimation = function(resultPromise){
    openOverlay();
    resetScene();

    sceneTimers.push(setTimeout(()=> envScene.classList.add('play-doc'), T.doc));
    sceneTimers.push(setTimeout(()=> envScene.classList.add('play-pack'), T.pack));
    sceneTimers.push(setTimeout(()=> envScene.classList.add('play-seal'), T.seal));

    sceneTimers.push(setTimeout(async ()=>{
      envScene.classList.add('play-wait');
      const waitStarted = Date.now();
      const minWaitMs = reduceMotion ? 40 : 350;

      let ok;
      try{
        ok = await resultPromise; // <-- only resolves once the real request finishes
      } catch(_e){
        ok = false;
      }

      const elapsed = Date.now() - waitStarted;
      const extra = Math.max(0, minWaitMs - elapsed);

      sceneTimers.push(setTimeout(()=>{
        envScene.classList.remove('play-wait');
        if(ok){
          envScene.classList.add('play-success');
          spSrAnnounce.textContent = "Thank you! Your project request has been sent successfully. We'll get back to you soon.";
          sceneTimers.push(setTimeout(()=> showResult(true), T.successReveal));
        } else {
          envScene.classList.add('play-fail');
          spSrAnnounce.textContent = 'Something went wrong. Please try again or contact us directly.';
          sceneTimers.push(setTimeout(()=> showResult(false), T.failReveal));
        }
      }, extra));
    }, T.wait));
  };

  submitAgainBtn.addEventListener('click', ()=>{
    closeOverlay();
    startProjectForm.reset();
    spSubmitBtn.disabled = false;
    spSubmitBtn.textContent = 'Send Project Request';
    spSrAnnounce.textContent = '';
    document.getElementById('sp-name').focus();
  });

  submitTryAgainBtn.addEventListener('click', ()=>{
    closeOverlay();
    // Form fields are intentionally left exactly as the visitor entered them.
    spSubmitBtn.disabled = false;
    spSubmitBtn.textContent = 'Send Project Request';
    spSrAnnounce.textContent = '';
    document.getElementById('sp-name').focus();
  });

} catch(animationSetupError){
  // The animation layer failed to initialize. This is intentionally non-fatal:
  // submission below still works and falls back to showPlainResult().
  playSubmissionAnimation = null;
}

/* ---------- Submit handler (always attached, regardless of animation health) ---------- */
startProjectForm.addEventListener('submit', function(e){
  e.preventDefault(); // <-- must run first: this alone stops the native reload/navigate

  // Guard against duplicate submissions while a request is in flight
  if(spSubmitBtn.disabled) return;

  if(!validateStartProjectForm()){
    const firstInvalid = startProjectForm.querySelector('.invalid input, .invalid select, .invalid textarea');
    if(firstInvalid) firstInvalid.focus();
    return;
  }

  spSubmitBtn.disabled = true;
  spSubmitBtn.textContent = 'Sending…';
  spSrAnnounce.textContent = 'Sending your project request…';

  // The real, actual Netlify Forms submission — its outcome is the only
  // thing that ever decides which animation branch (or fallback text) plays.
  const resultPromise = fetch('/', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodeFormData(startProjectForm)
  }).then((res)=> res.ok).catch(()=> false);

  if(playSubmissionAnimation){
    try{
      playSubmissionAnimation(resultPromise);
    } catch(_playError){
      resultPromise.then(showPlainResult);
    }
  } else {
    resultPromise.then(showPlainResult);
  }
});
