/* MolPath Simulator v2.5.0b — LAB_POST_001 Flagship Asset Layer
   Scope: LAB_POST_001_v1_0 only.
   Additive media layer only: no scoring, choices, correctness, gates, CAPA logic or case completion semantics are changed.
*/
(function(){
'use strict';
const CASE_ID='LAB_POST_001_v1_0';
const ASSETS=Object.freeze({
  pipeline:'assets/lab_post_001/pipeline_lims_change_snapshot_001.png',
  impact:'assets/lab_post_001/impact_analysis_48_cases_001.png',
  metReview:'assets/lab_post_001/met_splice_variant_review_001.png',
  artifact:'assets/lab_post_001/v41_low_confidence_artifact_001.png',
  changeControl:'assets/lab_post_001/change_control_incomplete_001.png',
  verification:'assets/lab_post_001/pipeline_verification_plan_001.png',
  metConfirm:'assets/lab_post_001/met_rna_orthogonal_confirmation_001.png',
  patientImpact:'assets/lab_post_001/patient_impact_reanalysis_worklist_001.png',
  closure:'assets/lab_post_001/capa_change_control_closure_001.png'
});
window.MolPathLABPOST001FlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function done(){try{return !!caseIsComplete()}catch(_){return !!(state?.finalized||state?.lab?.finalized)}}
function esc2(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function lang(){try{return window.MolPathI18n?.currentLang?.()||window.MolPathLanguageRegistry?.normalize(document.body?.getAttribute('data-molpath-lang')||'de')||'de'}catch(_){return 'de'}}
function T(){
  const fallback={
    evidence:'Flagship-Evidenz / Originalansichten',
    early:'Run-Kontext & Change-Control',
    impact:'Impact-Analyse',
    investigation:'Bioinformatische Investigation',
    capa:'Verifizierung & Patienten-Impact',
    closure:'Abschluss-Evidenz',
    synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
    pipeline:'Pipeline/LIMS Change Snapshot · v3.4 → v4.1',
    changeControl:'Unvollständiger Change-Control-Antrag',
    impactMatrix:'Impact-Analyse · 48 Fälle / 6 Diskordanzen',
    metReview:'MET exon 14 · Variant Review · v3.4 vs. v4.1',
    artifact:'Low-Confidence Artefakt · neuer Call in v4.1',
    verification:'Pipeline-Verifizierungs- und Reanalyseplan',
    patientImpact:'Impact- und Reanalyse-Liste der betroffenen Fälle',
    metConfirm:'Orthogonale RNA-Bestätigung · MET exon 14 skipping',
    closureDoc:'CAPA- und Change-Control-Abschlussbericht'
  };
  try{return {...fallback,...(window.MolPathLocaleRegistry?.namespace('labPost001',lang())||{})}}catch(_){return fallback}
}
function asset(title,src,cls=''){
  return `<figure class="lp1-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="lp1-provenance">${esc2(T().synthetic)}</div></figure>`;
}
function block(title,items,cls=''){
  return `<div class="lp1-block ${cls}"><div class="lp1-head"><h4>${esc2(title)}</h4><span class="lp1-pill">FLAGSHIP</span></div><div class="lp1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`;
}
function inject(html,addon){
  if(!html||!addon)return html;
  const idx=html.lastIndexOf('</section>');
  return idx>=0?html.slice(0,idx)+addon+html.slice(idx):html+addon;
}
function earlyBlock(){return block(T().early,[asset(T().pipeline,ASSETS.pipeline),asset(T().changeControl,ASSETS.changeControl,'doc')]);}
function impactBlock(){return block(T().impact,[asset(T().impactMatrix,ASSETS.impact,'wide')]);}
function investigationBlock(){return block(T().investigation,[asset(T().metReview,ASSETS.metReview),asset(T().artifact,ASSETS.artifact)]);}
function capaBlock(){return block(T().capa,[asset(T().verification,ASSETS.verification,'doc'),asset(T().patientImpact,ASSETS.patientImpact,'doc')]);}
function closureBlock(){return block(T().closure,[asset(T().metConfirm,ASSETS.metConfirm,'doc'),asset(T().closureDoc,ASSETS.closure,'doc')],'lp1-closure');}

function wrap(name,addonFn,guardFn){
  const prev=window[name];
  if(typeof prev!=='function')return;
  const wrapped=function(){
    const html=prev.apply(this,arguments);
    if(!active())return html;
    if(guardFn&&!guardFn())return html;
    return inject(html,addonFn());
  };
  try{window[name]=wrapped}catch(_){ }
  try{eval(name+'=wrapped')}catch(_){ }
}

function install(){
  if(window.__MolPathLABPOST001FlagshipInstalled)return;
  window.__MolPathLABPOST001FlagshipInstalled=true;
  styles();
  wrap('renderRunOverview',earlyBlock);
  wrap('renderQcEvent',impactBlock);
  wrap('renderRootCause',investigationBlock);
  wrap('renderCapa',capaBlock);
  wrap('renderAudit',closureBlock,done);
}

function styles(){
  if(document.getElementById('lp1FlagshipStyles'))return;
  const s=document.createElement('style');s.id='lp1FlagshipStyles';s.textContent=`
  .lp1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .lp1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.lp1-head h4{margin:0;color:var(--primary)}
  .lp1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.68rem;font-weight:900;letter-spacing:.05em}
  .lp1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.lp1-grid.single{grid-template-columns:1fr}
  .lp1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.lp1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.lp1-asset a{display:block;background:#f2f6f9}.lp1-asset img{width:100%;height:auto;display:block;object-fit:contain}.lp1-asset.doc img{max-height:820px;object-fit:contain}.lp1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  .lp1-closure{border-color:#abefc6;background:linear-gradient(180deg,#fff,#f4fff7)}
  @media(max-width:1000px){.lp1-grid{grid-template-columns:1fr}.lp1-asset.doc img{max-height:none}}
  `;document.head.appendChild(s);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathLABPOST001Flagship=Object.freeze({base:'v2.5.0b',caseId:CASE_ID,assetCount:9,phaseGating:{run_overview:[1,5],qc_event:[2],root_cause:[3,4],capa:[6,8],post_completion:[7,9]},logicChanges:false});
})();
