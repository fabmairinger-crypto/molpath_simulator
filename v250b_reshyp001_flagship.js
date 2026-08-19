/* MolPath Simulator v2.5.0b — RES_HYP_001 Flagship Asset Layer
   Scope: RES_HYP_001_v0_9 only.
   Additive media layer only: no scoring, choices, correctness, gates, research logic or completion semantics are changed.
*/
(function(){
'use strict';
const CASE_ID='RES_HYP_001_v0_9';
const ASSETS=Object.freeze({
  idea:'assets/res_hyp_001/project_onepager_initial_001.png',
  cohort:'assets/res_hyp_001/cohort_spreadsheet_40cases_001.png',
  qc:'assets/res_hyp_001/ffpe_rna_qc_dashboard_001.png',
  clinical:'assets/res_hyp_001/clinical_data_completeness_001.png',
  pca:'assets/res_hyp_001/pca_batch_confounders_001.png',
  attrition:'assets/res_hyp_001/cohort_attrition_40_to_26_001.png',
  plan:'assets/res_hyp_001/pico_analysis_plan_001.png',
  results:'assets/res_hyp_001/caf_tgfb_discovery_results_001.png',
  roadmap:'assets/res_hyp_001/discovery_validation_roadmap_001.png'
});
window.MolPathRESHYP001FlagshipAssets=ASSETS;
function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function done(){try{return !!caseIsComplete()}catch(_){return !!(state?.finalized||state?.research?.finalized)}}
function esc2(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function lang(){try{return window.MolPathI18n?.currentLang?.()||window.MolPathLanguageRegistry?.normalize(document.body?.getAttribute('data-molpath-lang')||'de')||'de'}catch(_){return 'de'}}
function T(){
  const fallback={
    start:'Ausgangsidee',feasibility:'Kohorten- & Materialrealität',batch:'Technische Confounder / Batch',eligibility:'Klinische Vollständigkeit & Cohort Attrition',plan:'Fokussierter Studien- und Analyseplan',results:'Explorative Discovery-Ergebnisse',roadmap:'Discovery → Validierung → Translation',
    synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
    idea:'Initialer Projekt-One-Pager · „Wir messen mal alles“',cohort:'Kohortenübersicht · 40 Archivfälle',qc:'FFPE-/RNA-QC · technische Eignung',clinical:'Clinical Data Completeness · Outcome-Verfügbarkeit',pca:'RNA-Seq PCA · Batch- und Confounder-Check',attrition:'Cohort Flow · 40 → 26 evaluierbare Fälle',planAsset:'PICO & prädefinierter Analyseplan',resultsAsset:'CAF/TGFβ Discovery Result Snapshot · n=26',roadmapAsset:'Translational Roadmap · unabhängige Validierung'
  };
  try{return {...fallback,...(window.MolPathLocaleRegistry?.namespace('resHyp001',lang())||{})}}catch(_){return fallback}
}
function asset(title,src,cls=''){return `<figure class="rh1-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="rh1-provenance">${esc2(T().synthetic)}</div></figure>`}
function block(title,items,cls=''){return `<div class="rh1-block ${cls}"><div class="rh1-head"><h4>${esc2(title)}</h4><span class="rh1-pill">FLAGSHIP</span></div><div class="rh1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const idx=html.lastIndexOf('</section>');return idx>=0?html.slice(0,idx)+addon+html.slice(idx):html+addon}
function startBlock(){return block(T().start,[asset(T().idea,ASSETS.idea,'doc')])}
function feasibilityBlock(){return block(T().feasibility,[asset(T().cohort,ASSETS.cohort,'wide'),asset(T().qc,ASSETS.qc,'wide')])}
function batchBlock(){return block(T().batch,[asset(T().pca,ASSETS.pca,'wide')])}
function eligibilityBlock(){return block(T().eligibility,[asset(T().clinical,ASSETS.clinical,'wide'),asset(T().attrition,ASSETS.attrition,'wide')])}
function planResultsBlock(){return block(T().plan,[asset(T().planAsset,ASSETS.plan,'wide')])+block(T().results,[asset(T().resultsAsset,ASSETS.results,'wide')])}
function roadmapBlock(){return block(T().roadmap,[asset(T().roadmapAsset,ASSETS.roadmap,'wide')],'rh1-closure')}
function styles(){if(document.getElementById('rh1FlagshipStyles'))return;const s=document.createElement('style');s.id='rh1FlagshipStyles';s.textContent=`
.rh1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.rh1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.rh1-head h4{margin:0;color:var(--primary)}
.rh1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#fff4e6;color:#9a4f00;border:1px solid #f3c996;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.rh1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.rh1-grid.single{grid-template-columns:1fr}.rh1-asset.wide{grid-column:1/-1}
.rh1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.rh1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.rh1-asset a{display:block;background:#f2f6f9}.rh1-asset img{width:100%;height:auto;display:block;object-fit:contain}.rh1-asset.doc img{max-height:900px;object-fit:contain}.rh1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.rh1-closure{border-color:#abefc6;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.rh1-grid{grid-template-columns:1fr}.rh1-asset.wide{grid-column:auto}.rh1-asset.doc img{max-height:none}}
`;document.head.appendChild(s)}
function install(){
  if(window.__MolPathRESHYP001FlagshipInstalled)return;window.__MolPathRESHYP001FlagshipInstalled=true;styles();
  const prevBox=window.renderResearchBox;
  if(typeof prevBox==='function'){
    const wrapped=function(title,obj,next){let html=prevBox.apply(this,arguments);if(!active())return html;if(next==='context'||title==='Projektidee')html=inject(html,startBlock());return html};
    try{window.renderResearchBox=wrapped}catch(_){} try{renderResearchBox=wrapped}catch(_){}
  }
  const prevSingle=window.renderResearchSingle;
  if(typeof prevSingle==='function'){
    const wrapped=function(field,list,title,next){let html=prevSingle.apply(this,arguments);if(!active())return html;if(field==='hypothesis'&&state?.research?.hypothesis)html=inject(html,feasibilityBlock());return html};
    try{window.renderResearchSingle=wrapped}catch(_){} try{renderResearchSingle=wrapped}catch(_){}
  }
  const prevMulti=window.renderResearchMulti;
  if(typeof prevMulti==='function'){
    const wrapped=function(field,list,title,next,help){let html=prevMulti.apply(this,arguments);if(!active())return html;if(field==='methods')html=inject(html,batchBlock());if(field==='analysis')html=inject(html,eligibilityBlock());return html};
    try{window.renderResearchMulti=wrapped}catch(_){} try{renderResearchMulti=wrapped}catch(_){}
  }
  const prevFeedback=window.renderResearchFeedback;
  if(typeof prevFeedback==='function'){
    const wrapped=function(){let html=prevFeedback.apply(this,arguments);if(!active())return html;html=inject(html,planResultsBlock());if(done())html=inject(html,roadmapBlock());return html};
    try{window.renderResearchFeedback=wrapped}catch(_){} try{renderResearchFeedback=wrapped}catch(_){}
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathRESHYP001Flagship=Object.freeze({base:'v2.5.0b+LAB_POST_001+LAB_DOC_001',caseId:CASE_ID,assetCount:9,phaseGating:{project_idea:[1],after_hypothesis:[2,3],methods:[5],analysis:[4,6],feedback:[7,8],post_completion:[9]},logicChanges:false,spoilerGuard:'clinical completeness asset is gated with attrition because the approved image contains n=26'});
})();
