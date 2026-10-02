/* MolPath Simulator release metadata - single source of truth for user-facing version labels. */
(function(){
'use strict';
window.MolPathVersion=Object.freeze({
  app:'v2.6.0-rc1',
  release:'2.6.0-rc1',
  fom:'0.6',
  fomPdf:'docs/fom/MolPath_Flight_Operations_Manual_v0.6.pdf',
  fomPageBase:'docs/fom/pages',
  fomPages:50,
  releaseDate:'2026-08-25',
  apply:applyVersion
});
function applyVersion(){
  const app=window.MolPathVersion.app;
  window.MOLPATH_APP_VERSION=app;
  const title='MolPath Simulator '+app;if(document.title!==title)document.title=title;
  const top=document.getElementById('v20bVersion');
  const legacy=document.getElementById('versionBadge');
  // v230 uses the former hero versionBadge for case category; preserve that UI.
  const el=top||((legacy&&!legacy.classList.contains('v230-hero-badge'))?legacy:null);
  if(el){el.setAttribute('data-i18n-skip','1');if(el.textContent!==app)el.textContent=app}
}
applyVersion();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyVersion,{once:true});
})();
