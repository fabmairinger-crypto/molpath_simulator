/* MolPath Simulator v2.5.0b — polished fixed startup cover hotfix
   Scope: visual startup cover only.
   Does NOT wrap/replace render(), alter case logic, responsive behavior, i18n,
   event handlers, or startup patch execution. */
(function(){
  'use strict';

  const VERSION='v2.5.0b';
  const MIN_SETTLE_MS=360; // existing delayed startup cosmetics peak at 180 ms
  const EXIT_MS=280;
  let revealed=false;

  function ensureFinalVersionStyle(){
    try{
      if(document.getElementById('v250b-final-version-style'))return;
      const style=document.createElement('style');
      style.id='v250b-final-version-style';
      style.textContent="#v20bVersion::after{content:'v2.5.0b'!important}";
      document.body.appendChild(style);
    }catch(_){ }
  }

  function stampVersion(){
    try{
      window.MOLPATH_APP_VERSION=VERSION;
      document.title='MolPath Simulator '+VERSION;
      const els=[
        document.getElementById('v20bVersion'),
        document.getElementById('versionBadge'),
        ...document.querySelectorAll('.v20b-topstatus .v20b-pill.primary')
      ].filter(Boolean);
      els.forEach(function(el){
        el.setAttribute('data-i18n-skip','1');
        el.textContent=VERSION;
      });
    }catch(_){ }
  }

  function dismissOverlay(){
    try{
      const overlay=document.getElementById('mpBootScreen');
      if(!overlay)return;
      overlay.classList.add('mp-boot-exit');
      setTimeout(function(){
        try{ overlay.remove(); }catch(_){ }
      },EXIT_MS);
    }catch(_){ }
  }

  function reveal(){
    if(revealed)return;
    revealed=true;
    ensureFinalVersionStyle();
    stampVersion();
    // Two frames allow the final underlying DOM/CSS state to settle before fade-out.
    requestAnimationFrame(function(){
      requestAnimationFrame(dismissOverlay);
    });
  }

  function settleAndReveal(){
    setTimeout(reveal,MIN_SETTLE_MS);
  }

  ensureFinalVersionStyle();

  if(document.readyState==='complete'){
    settleAndReveal();
  }else{
    window.addEventListener('load',settleAndReveal,{once:true});
  }

  // Fail-safe: never strand the user behind the cover if a local asset delays load.
  setTimeout(reveal,4500);

  window.MolPathStartupCoverHotfix=Object.freeze({
    version:VERSION,
    base:'v2.5.0b + asset modal + startup cover',
    reveal:reveal
  });
})();
