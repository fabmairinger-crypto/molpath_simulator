/* MolPath Simulator v2.5.0b — RES_HYP_001 Flagship Asset Layer — stable renderer wrapper FIX3
   Scope: RES_HYP_001_v0_9 only.
   Additive media layer only: no scoring, choices, correctness, research state or completion semantics are changed.
   Important: no MutationObserver / click listener / DOM polling. The existing renderContent() output is decorated once per render.
*/
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
window.MolPathRESHYP001FlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function complete(){try{return !!caseIsComplete()}catch(_){return !!(state?.finalized||state?.research?.finalized)}}
function esc2(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}}
function lang(){try{return window.MolPathI18n?.currentLang?.()||window.MolPathLanguageRegistry?.normalize(document.body?.getAttribute('data-molpath-lang')||'de')||'de'}catch(_){return 'de'}}
function T(){
  const fallback={
    synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
    start:'Ausgangsidee',
    feasibility:'Kohorten- & Materialrealität',
    batch:'Technische Confounder / Batch',
    eligibility:'Klinische Vollständigkeit & Cohort Attrition',
    plan:'Fokussierter Studien- und Analyseplan',
    results:'Explorative Discovery-Ergebnisse',
    roadmap:'Discovery → Validierung → Translation',
    idea:'Initialer Projekt-One-Pager · „Wir messen mal alles“',
    cohort:'Kohortenübersicht · 40 Archivfälle',
    qc:'FFPE-/RNA-QC · technische Eignung',
    clinical:'Clinical Data Completeness · Outcome-Verfügbarkeit',
    pca:'RNA-Seq PCA · Batch- und Confounder-Check',
    attrition:'Cohort Flow · 40 → 26 evaluierbare Fälle',
    planAsset:'PICO & prädefinierter Analyseplan',
    resultsAsset:'CAF/TGFβ Discovery Result Snapshot · n=26',
    roadmapAsset:'Translational Roadmap · unabhängige Validierung'
  };
  try{return {...fallback,...(window.MolPathLocaleRegistry?.namespace('resHyp001',lang())||{})}}catch(_){return fallback}
}
function asset(title,src,cls=''){
  return `<figure class="rh1-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="rh1-provenance">${esc2(T().synthetic)}</div></figure>`;
}
function block(title,items,cls=''){
  return `<div class="rh1-block ${cls}"><div class="rh1-head"><h4>${esc2(title)}</h4><span class="rh1-pill">FLAGSHIP</span></div><div class="rh1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`;
}
function inject(html,addon){
  if(!html||!addon)return html;
  const idx=html.lastIndexOf('</section>');
  return idx>=0?html.slice(0,idx)+addon+html.slice(idx):html+addon;
}
function addonForCurrentStep(){
  if(!active()||!state)return '';
  const t=T();
  switch(state.step){
    case 'project_idea':
      return block(t.start,[asset(t.idea,ASSETS.idea,'doc')]);
    case 'hypothesis':
      if(!state.research?.hypothesis)return '';
      return block(t.feasibility,[asset(t.cohort,ASSETS.cohort,'wide'),asset(t.qc,ASSETS.qc,'wide')]);
    case 'methods':
      return block(t.batch,[asset(t.pca,ASSETS.pca,'wide')]);
    case 'analysis':
      return block(t.eligibility,[asset(t.clinical,ASSETS.clinical,'wide'),asset(t.attrition,ASSETS.attrition,'wide')]);
    case 'feedback': {
      let out=block(t.plan,[asset(t.planAsset,ASSETS.plan,'wide')])+block(t.results,[asset(t.resultsAsset,ASSETS.results,'wide')]);
      if(complete())out+=block(t.roadmap,[asset(t.roadmapAsset,ASSETS.roadmap,'wide')],'rh1-closure');
      return out;
    }
    default:return '';
  }
}
function styles(){
  if(document.getElementById('rh1FlagshipStyles'))return;
  const s=document.createElement('style');s.id='rh1FlagshipStyles';s.textContent=`
  .rh1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .rh1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.rh1-head h4{margin:0;color:var(--primary)}
  .rh1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#6b2fa0;border:1px solid #dec9ef;font-size:.68rem;font-weight:900;letter-spacing:.05em}
  .rh1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.rh1-grid.single{grid-template-columns:1fr}.rh1-asset.wide{grid-column:1/-1}
  .rh1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.rh1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.rh1-asset a{display:block;background:#f2f6f9}.rh1-asset img{width:100%;height:auto;display:block;object-fit:contain}.rh1-asset.doc img{max-height:900px;object-fit:contain}.rh1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  .rh1-closure{border-color:#abefc6;background:linear-gradient(180deg,#fff,#f4fff7)}
  @media(max-width:1000px){.rh1-grid{grid-template-columns:1fr}.rh1-asset.wide{grid-column:auto}.rh1-asset.doc img{max-height:none}}
  `;document.head.appendChild(s);
}
function install(){
  if(window.__MolPathRESHYP001FlagshipInstalled)return;
  window.__MolPathRESHYP001FlagshipInstalled=true;
  styles();
  const prev=window.renderContent;
  if(typeof prev!=='function')return;
  const wrapped=function(){
    const html=prev.apply(this,arguments);
    if(!active())return html;
    return inject(html,addonForCurrentStep());
  };
  try{window.renderContent=wrapped}catch(_){}
  try{renderContent=wrapped}catch(_){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathRESHYP001Flagship=Object.freeze({
  base:'v2.5.0b+LAB_POST_001+LAB_DOC_001',
  caseId:CASE_ID,
  assetCount:9,
  hook:'renderContent wrapper FIX3',
  phaseGating:{project_idea:[1],hypothesis_after_choice:[2,3],methods:[5],analysis:[4,6],feedback:[7,8],post_completion:[9]},
  logicChanges:false,
  observers:0
});
})();
