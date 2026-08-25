/* MolPath Simulator v2.5.0b — Signature Taxonomy Freeze / Badge Cleanup
   Purpose:
   - Course Case => Signature Case invariant.
   - One final Signature truth source after all historical runtime patches.
   - Deep Dive remains internal content-depth metadata, not a visible quality badge.
   - FLAGSHIP / COURSE FLAGSHIP are removed as visible prestige badges.
   - Signature is shown only in the case library and active-case hero.
   This file MUST be loaded last. */
(function(){
'use strict';

const VERSION='v2.5.0b-signature-taxonomy-freeze1';
const EXTRA_SIGNATURE_BASE_IDS=new Set([
  // Existing curated non-course signatures retained.
  'MTB_CRC_002',
  'MTB_CNS_001',
  // Additional simulator parade/showcase cases agreed for the final set.
  'MTB_HEM_001',
  'MTB_CNS_003',
  'LAB_RUN_004',
  'RES_VAL_001',
  'MET_FISH_001'
]);

function baseId(id){
  return String(id||'').replace(/_v\d+(?:_\d+)+$/,'');
}
function allCases(){
  try{return (typeof cases!=='undefined'&&Array.isArray(cases))?cases:[]}catch(_){return []}
}
function courses(){
  try{return (typeof COURSES_V16!=='undefined'&&Array.isArray(COURSES_V16))?COURSES_V16:[]}catch(_){return []}
}
function courseIds(){
  const out=new Set();
  courses().forEach(course=>(course&&Array.isArray(course.cases)?course.cases:[]).forEach(id=>out.add(String(id))));
  return out;
}
function finalIds(){
  const out=courseIds();
  allCases().forEach(c=>{if(c&&EXTRA_SIGNATURE_BASE_IDS.has(baseId(c.id)))out.add(c.id)});
  return out;
}
function finalBaseIds(){return new Set([...finalIds()].map(baseId))}
function isSignature(c){
  if(!c)return false;
  const ids=finalIds();
  return ids.has(String(c.id))||EXTRA_SIGNATURE_BASE_IDS.has(baseId(c.id));
}
function isCourseCase(c){return !!c&&courseIds().has(String(c.id))}

function cleanTags(tags,sig){
  const drop=new Set(['signature case','deep dive','flagship','course flagship']);
  const out=[];
  (Array.isArray(tags)?tags:[]).forEach(tag=>{
    const raw=String(tag||'').trim();
    if(!raw||drop.has(raw.toLowerCase()))return;
    if(!out.includes(raw))out.push(raw);
  });
  if(sig)out.push('Signature Case');
  return out;
}

function applyModel(){
  const ids=finalIds();
  allCases().forEach(c=>{
    if(!c)return;
    const sig=ids.has(String(c.id));
    c.signature_case=sig;
    c.deep_dive=true; // retained as internal universal content-depth baseline
    c.tags=cleanTags(c.tags,sig);
    if(isCourseCase(c))c.course_case=true;
    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined'&&DEEP_DIVE_MAP_V17)?DEEP_DIVE_MAP_V17[c.id]:null;
      if(d)d.is_signature_case=sig;
    }catch(_){}
  });

  // Keep the old signature-filter registry aligned for diagnostics/external consumers.
  try{
    if(window.MolPathSignatureCaseFilter){
      window.MolPathSignatureCaseFilter.version=VERSION;
      window.MolPathSignatureCaseFilter.ids=[...ids];
    }
  }catch(_){}
  return ids;
}

// Central public truth source + compatibility aliases used by historical patches.
window.MolPathIsSignatureCase=isSignature;
window.MolPathIsCourseCase=isCourseCase;
try{isSigCase=function(c=activeCase){return isSignature(c)}}catch(_){}
try{isSig=function(c=activeCase){return isSignature(c)}}catch(_){}
try{v17IsSignature=function(c=activeCase){return isSignature(c)}}catch(_){}

function E(x){
  try{return typeof esc==='function'?esc(x):String(x??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]||m))}catch(_){return String(x??'')}
}
function active(){try{return typeof activeCase!=='undefined'?activeCase:null}catch(_){return null}}
function deep(c=active()){try{return typeof v17Deep==='function'?v17Deep(c):null}catch(_){return null}}

// Report / teaching UI: keep content, remove obsolete Deep-Dive taxonomy and use the final signature truth.
try{
  if(typeof v18BadgeHtml==='function')v18BadgeHtml=function(){
    const cm=v18CaseMeta(); const sig=isSignature(active());
    return `<div class="v18-badges"><span class="badge">${E(cm.domain)}</span><span class="badge">${E(cm.length)}</span><span class="badge">${E(cm.difficulty)}</span><span class="badge">${E(modeMeta().label)}</span>${sig?'<span class="badge sig">Signature Case</span>':''}</div>`;
  };
}catch(_){}
try{
  if(typeof v18OverviewHtml==='function')v18OverviewHtml=function(){
    const cm=v18CaseMeta(); const d=cm.d;
    return `<h2>1. Fallübersicht</h2><table><tr><th>Fall-ID</th><td>${E(activeCase.id)}</td></tr><tr><th>Titel</th><td>${E(activeCase.title)}</td></tr><tr><th>Domäne</th><td>${E(cm.domain)}</td></tr><tr><th>Schwierigkeit / Länge</th><td>${E(cm.difficulty)} · ${E(cm.length)}</td></tr><tr><th>Status</th><td>${E(cm.status)}</td></tr>${d?`<tr><th>Fallprofil</th><td>${E(d.title||activeCase.title)} · ${E(d.estimated_minutes_deep||'')}</td></tr>`:''}<tr><th>Signature Case</th><td>${isSignature(activeCase)?'ja':'nein'}</td></tr></table>`;
  };
}catch(_){}
try{
  if(typeof v18InstructorProfile==='function')v18InstructorProfile=function(){
    const cm=v18CaseMeta(); const d=cm.d;
    const course=d?.target_course||(typeof v16CourseIsActive==='function'&&v16CourseIsActive()?v16Course().title:'—');
    return `<h2>1. Didaktisches Fallprofil</h2><table><tr><th>Fall</th><td>${E(activeCase.id)} · ${E(activeCase.title)}</td></tr><tr><th>Zielgruppe</th><td>${E(d?.target_role||'Pathologie / Molekularpathologie / Labor / Forschung je nach Fallmodus')}</td></tr><tr><th>Kurszuordnung</th><td>${E(course)}</td></tr><tr><th>Schwierigkeit / Länge</th><td>${E(cm.difficulty)} · ${E(cm.length)}</td></tr><tr><th>Signature Case</th><td>${isSignature(activeCase)?'ja':'nein'}</td></tr></table>`;
  };
}catch(_){}
try{
  if(typeof v17DeepReportAddon==='function')v17DeepReportAddon=function(kind){
    const d=deep(); if(!d)return ''; const notes=d.instructor_notes||{}; const sig=isSignature(activeCase);
    return `<h2>${sig?'Signature Case':'Erweitertes Fallprofil'}</h2><table><tr><th>Falltitel</th><td>${E(d.title||'')}</td></tr><tr><th>Zielrolle</th><td>${E(d.target_role||'')}</td></tr><tr><th>Target Course</th><td>${E(d.target_course||'')}</td></tr><tr><th>Dauer</th><td>${E(d.estimated_minutes_deep||'')}</td></tr><tr><th>Signature Case</th><td>${sig?'ja':'nein'}</td></tr></table><h2>Twist / kritischer Wendepunkt</h2><div class="warn">${E(d.twist?.title||'')}<br>${E(d.twist?.content||'')}<br><b>Warum kritisch:</b> ${E(d.twist?.why_critical||'')}</div><h2>Lernziele</h2>${v17List(d.learning_objectives)}<h2>Typische Fallen</h2>${v17Arr(d.low_value_traps).length?`<ul>${v17Arr(d.low_value_traps).map(t=>`<li><b>${E(t.label)}</b>: ${E(t.why_bad)}</li>`).join('')}</ul>`:'<p class="muted">Keine spezifischen Fallen hinterlegt.</p>'}<h2>Debrief</h2>${v17List(d.debrief_points)}${kind==='instructor'?`<h2>Dozenten-Notizen${sig?' · Signature Case':''}</h2><p>${E(notes.model_answer||'')}</p><h3>Scoring-Fokus</h3>${v17List(notes.scoring_focus||[])}<h3>Diskussionsfragen</h3>${v17List(notes.discussion_questions||[])}`:''}`;
  };
}catch(_){}
try{
  if(typeof v17DeepBadge==='function')v17DeepBadge=function(){return isSignature(active())?'<span class="badge v17-signature-badge">Signature Case</span>':''};
}catch(_){}
try{
  if(typeof v17OpeningBlock==='function')v17OpeningBlock=function(d){const sig=isSignature(active())?'<span class="badge v17-signature-badge">Signature Case</span>':'';return `<div class="v17-opening"><div>${sig}<h3>${E(d?.title||active()?.title||'')}</h3><p>${E(d?.opening_scene||'')}</p></div></div>`};
}catch(_){}

const PRESTIGE_REMOVE=new Set(['deep dive','flagship','course flagship']);
function normText(el){return String(el&&el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase()}
function caseIdFromCard(card){
  if(!card)return '';
  const explicit=card.getAttribute('data-case-id'); if(explicit)return explicit;
  const m=String(card.getAttribute('onclick')||'').match(/switchCase\('([^']+)'\)/); return m?m[1]:'';
}
function caseById(id){return allCases().find(c=>c&&c.id===id)||null}
function ensureLibraryBadges(){
  document.querySelectorAll('.v20b-case-card').forEach(card=>{
    const c=caseById(caseIdFromCard(card)); if(!c)return;
    const holder=card.querySelector('.v20b-badges'); if(!holder)return;
    holder.querySelectorAll('.badge.signature').forEach(b=>b.remove());
    if(isSignature(c))holder.insertAdjacentHTML('afterbegin','<span class="badge signature" data-signature-authority="final">Signature</span>');
  });
}
function ensureHeroBadge(){
  const h=document.getElementById('heroTitle'); const c=active(); if(!h||!c)return;
  h.querySelectorAll('.v17-case-badge,.badge').forEach(b=>{const t=normText(b);if(t==='signature'||t==='signature case'||PRESTIGE_REMOVE.has(t))b.remove()});
  if(isSignature(c))h.insertAdjacentHTML('beforeend',' <span class="v17-case-badge" data-signature-authority="final">Signature Case</span>');
}
function removePrestigeBadges(){
  const selectors=['.badge','.v17-case-badge','[class*="-pill"]'];
  document.querySelectorAll(selectors.join(',')).forEach(el=>{
    const t=normText(el);
    if(PRESTIGE_REMOVE.has(t)){el.remove();return}
    if(t==='signature'||t==='signature case'){
      const allowed=el.closest('#heroTitle')||el.closest('.v20b-case-card .v20b-badges')||el.closest('#v240lSignatureField');
      if(!allowed)el.remove();
    }
  });
}
function fixDashboardSignatureCount(){
  const count=finalIds().size;
  document.querySelectorAll('.v20b-metric').forEach(m=>{
    const label=String(m.querySelector('span')?.textContent||'').trim().toLowerCase();
    if(label==='signature'){const b=m.querySelector('b');if(b)b.textContent=String(count)}
  });
}
const TEXT_REPLACEMENTS=new Map([
  ['flagship integration','Integrated interpretation'],
  ['integrare flagship','Integrare integrată'],
  ['integración flagship','Interpretación integrada'],
  ['intégration flagship','Interprétation intégrée']
]);
function neutralizeVisibleTerminology(){
  document.querySelectorAll('h1,h2,h3,h4,h5,th,label,.small,.muted').forEach(el=>{
    if(el.children.length)return;
    const raw=String(el.textContent||'').trim(); const repl=TEXT_REPLACEMENTS.get(raw.toLowerCase());
    if(repl)el.textContent=repl;
  });
}
function cleanup(){
  applyModel();
  removePrestigeBadges();
  ensureLibraryBadges();
  ensureHeroBadge();
  fixDashboardSignatureCount();
  neutralizeVisibleTerminology();
}

function wrapGlobal(name){
  try{
    const fn=window[name]; if(typeof fn!=='function'||fn.__signatureTaxonomyFreezeWrapped)return;
    const wrapped=function(){const out=fn.apply(this,arguments);cleanup();return out};
    wrapped.__signatureTaxonomyFreezeWrapped=true;
    window[name]=wrapped;
    try{eval(name+'=window[name]')}catch(_){}
  }catch(_){}
}

function install(){
  const ids=applyModel();
  wrapGlobal('render');
  wrapGlobal('renderCasePicker');
  wrapGlobal('renderKpi');
  const prevAfter=window.MolPathI18nAfterApply;
  window.MolPathI18nAfterApply=function(lang){try{if(typeof prevAfter==='function')prevAfter(lang)}catch(_){}cleanup()};
  try{if(typeof render==='function')render();else cleanup()}catch(err){console.error('[MolPath '+VERSION+'] final render failed',err);cleanup()}
  // Asset layers are synchronous, but one delayed pass also catches legacy boot-time repaint/stamping without a permanent observer.
  setTimeout(cleanup,150);
  setTimeout(cleanup,500);
  window.MolPathSignatureTaxonomyFreeze=Object.freeze({
    version:VERSION,
    rule:'Course Case => Signature Case',
    courseCaseCount:courseIds().size,
    extraSignatureBaseIds:[...EXTRA_SIGNATURE_BASE_IDS],
    signatureCaseIds:[...ids],
    signatureBaseIds:[...finalBaseIds()],
    signatureCount:ids.size,
    visiblePrestigeBadge:'Signature Case only',
    deepDiveVisibility:'internal metadata only'
  });
  try{console.log('[MolPath '+VERSION+'] Signature taxonomy frozen: '+ids.size+' signatures; '+courseIds().size+' unique course cases.')}catch(_){}
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
