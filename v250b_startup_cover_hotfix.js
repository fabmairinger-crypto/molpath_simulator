/* MolPath Simulator v2.5.0b — visual startup cover hotfix
   Scope: hide historical intermediate startup renders only.
   Does NOT wrap/replace render(), alter case logic, responsive behavior, i18n,
   event handlers, or startup patch execution. */
(function(){
  'use strict';

  const VERSION='v2.5.0b';
  const READY_CLASS='mp-boot-ready';
  const MIN_SETTLE_MS=360; // existing delayed startup cosmetics peak at 180 ms
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

  function reveal(){
    if(revealed)return;
    revealed=true;
    ensureFinalVersionStyle();
    stampVersion();
    // two frames ensure final DOM/CSS mutations have been painted underneath
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        document.body.classList.add(READY_CLASS);
      });
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
    base:'v2.5.0b + asset modal test1',
    reveal:reveal
  });
})();
