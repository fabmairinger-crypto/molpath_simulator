(function(){
'use strict';
const CASE_ID='RES_HYP_001_v0_9';
const ROOT='assets/res_hyp_001/';
const ASSETS=Object.freeze({
  idea:ROOT+'project_onepager_initial_001.png',
  cohort:ROOT+'cohort_spreadsheet_40cases_001.png',
  qc:ROOT+'ffpe_rna_qc_dashboard_001.png',
  clinical:ROOT+'clinical_data_completeness_001.png',
  pca:ROOT+'pca_batch_confounders_001.png',
  attrition:ROOT+'cohort_attrition_40_to_26_001.png',
  plan:ROOT+'pico_analysis_plan_001.png',
  results:ROOT+'caf_tgfb_discovery_results_001.png',
  roadmap:ROOT+'discovery_validation_roadmap_001.png'
});
function active(){try{return typeof activeCase!=='undefined'&&activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function complete(){try{return !!(state&&(state.finalized||state.research?.finalized))}catch(_){return false}}
function esc2(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function lang(){try{return window.MolPathI18n?.currentLang?.()||document.body?.getAttribute('data-molpath-lang')||'de'}catch(_){return 'de'}}
function T(){
 const f={
  synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
  start:'Ausgangsidee', feasibility:'Kohorten- & Materialrealität', batch:'Technische Confounder / Batch', eligibility:'Klinische Vollständigkeit & Cohort Attrition', plan:'Fokussierter Studien- und Analyseplan', results:'Explorative Discovery-Ergebnisse', roadmap:'Discovery → Validierung → Translation',
  idea:'Initialer Projekt-One-Pager · „Wir messen mal alles“', cohort:'Kohortenübersicht · 40 Archivfälle', qc:'FFPE-/RNA-QC · technische Eignung', clinical:'Clinical Data Completeness · Outcome-Verfügbarkeit', pca:'RNA-Seq PCA · Batch- und Confounder-Check', attrition:'Cohort Flow · 40 → 26 evaluierbare Fälle', planAsset:'PICO & prädefinierter Analyseplan', resultsAsset:'CAF/TGFβ Discovery Result Snapshot · n=26', roadmapAsset:'Translational Roadmap · unabhängige Validierung'
 };
 try{return Object.assign(f,window.MolPathLocaleRegistry?.namespace?.('resHyp001',lang())||{})}catch(_){return f}
}
function fig(title,src,cls=''){return `<figure class="rh1x-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${esc2(src)}" target="_blank" rel="noopener"><img src="${esc2(src)}" alt="${esc2(title)}"></a><div class="rh1x-provenance">${esc2(T().synthetic)}</div></figure>`}
function block(key,title,items){return `<div class="rh1x-block" data-rh1x="${esc2(key)}"><div class="rh1x-head"><h4>${esc2(title)}</h4><span class="rh1x-pill">FLAGSHIP</span></div><div class="rh1x-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function desired(){
 if(!active()||!state)return [];
 const step=state.step, t=T();
 if(step==='project_idea') return [block('idea',t.start,[fig(t.idea,ASSETS.idea,'doc')])];
 if(step==='hypothesis'&&state.research?.hypothesis) return [block('feasibility',t.feasibility,[fig(t.cohort,ASSETS.cohort,'wide'),fig(t.qc,ASSETS.qc,'wide')])];
 if(step==='methods') return [block('batch',t.batch,[fig(t.pca,ASSETS.pca,'wide')])];
 if(step==='analysis') return [block('eligibility',t.eligibility,[fig(t.clinical,ASSETS.clinical,'wide'),fig(t.attrition,ASSETS.attrition,'wide')])];
 if(step==='feedback'){
   const out=[block('plan',t.plan,[fig(t.planAsset,ASSETS.plan,'wide')]),block('results',t.results,[fig(t.resultsAsset,ASSETS.results,'wide')])];
   if(complete()) out.push(block('roadmap',t.roadmap,[fig(t.roadmapAsset,ASSETS.roadmap,'wide')]));
   return out;
 }
 return [];
}
function sync(){
 let c; try{c=document.getElementById('content')}catch(_){return}
 if(!c)return;
 c.querySelectorAll?.('[data-rh1x]').forEach(n=>n.remove());
 const list=desired(); if(!list.length)return;
 c.insertAdjacentHTML('beforeend',list.join(''));
}
function style(){if(document.getElementById('rh1xStyles'))return;const s=document.createElement('style');s.id='rh1xStyles';s.textContent=`
.rh1x-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.rh1x-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.rh1x-head h4{margin:0;color:var(--primary)}
.rh1x-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#fff4e6;color:#9a4f00;border:1px solid #f3c996;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.rh1x-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.rh1x-grid.single{grid-template-columns:1fr}.rh1x-asset.wide{grid-column:1/-1}
.rh1x-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.rh1x-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.rh1x-asset a{display:block;background:#f2f6f9}.rh1x-asset img{width:100%;height:auto;display:block;object-fit:contain}.rh1x-asset.doc img{max-height:900px;object-fit:contain}.rh1x-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
@media(max-width:1000px){.rh1x-grid{grid-template-columns:1fr}.rh1x-asset.wide{grid-column:auto}.rh1x-asset.doc img{max-height:none}}
`;document.head.appendChild(s)}
function boot(){
 if(window.__MolPathRESHYP001DomFix2)return; window.__MolPathRESHYP001DomFix2=true; style();
 const c=document.getElementById('content'); if(c&&window.MutationObserver){const mo=new MutationObserver(()=>queueMicrotask(sync));mo.observe(c,{childList:true,subtree:false});window.__MolPathRESHYP001DomObserver=mo}
 document.addEventListener('click',()=>queueMicrotask(sync),true);
 window.addEventListener('molpath:languagechange',()=>queueMicrotask(sync));
 sync();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.MolPathRESHYP001Flagship=Object.freeze({base:'v2.5.0b+LAB_POST_001+LAB_DOC_001',caseId:CASE_ID,assetCount:9,hook:'DOM observer FIX2',logicChanges:false});
})();