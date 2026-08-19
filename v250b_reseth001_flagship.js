/* MolPath Simulator v2.5.0b — RES_ETH_001 Flagship Asset Layer — stable renderer wrapper
   Scope: RES_ETH_001_v1_0 only.
   Additive media layer only: no scoring, choices, correctness, research state or completion semantics are changed.
   Important: no MutationObserver / click listener / DOM polling. The existing renderContent() output is decorated once per render.
*/
(function(){
'use strict';
const CASE_ID='RES_ETH_001_v1_0';
const ROOT='assets/res_eth_001/';
const ASSETS=Object.freeze({
  synopsis:ROOT+'project_synopsis_001.png',
  archive:ROOT+'archive_ffpe_inventory_001.png',
  consent:ROOT+'consent_secondary_use_matrix_001.png',
  reserve:ROOT+'material_reserve_eligibility_001.png',
  privacy:ROOT+'pseudonymisation_access_model_001.png',
  approval:ROOT+'ethics_material_release_001.png',
  sharing:ROOT+'data_sharing_governance_001.png',
  brca:ROOT+'brca1_tumor_only_ngs_001.png',
  incidental:ROOT+'incidental_finding_workflow_001.png',
  closure:ROOT+'governance_closeout_001.png'
});
window.MolPathRESETH001FlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function complete(){try{return !!caseIsComplete()}catch(_){return !!(state?.finalized||state?.research?.finalized)}}
function esc2(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}}
function lang(){try{return window.MolPathI18n?.currentLang?.()||window.MolPathLanguageRegistry?.normalize(document.body?.getAttribute('data-molpath-lang')||'de')||'de'}catch(_){return 'de'}}
function T(){
  const fallback={
    synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
    start:'Projektantrag / Ausgangslage',governance:'Consent & Governance Reality Check',material:'Materialschutz / Block Eligibility',privacy:'Datenschutz & Pseudonymisierung',approval:'Ethikfreigabe & Data Sharing',twist:'Nebenbefund-Twist · BRCA1',workflow:'Nebenbefund- & Keimbahnverdachtsprozess',closure:'Governance-Abschluss',
    synopsis:'Study Synopsis · 120 Archiv-FFPE-Fälle',archive:'Pathologie-Archiv · 120 FFPE-Blöcke',consent:'Consent / Secondary-Use Matrix',reserve:'Materialreserve & Block Eligibility',privacyAsset:'Pseudonymisierung & Rollen-/Zugriffsmodell',approvalAsset:'Ethics Amendment & Material Release',sharingAsset:'Data Sharing & Governance Matrix',brca:'Tumor-only NGS Report · BRCA1 mit möglicher Keimbahnrelevanz',incidental:'Incidental Finding Review & Workflow · BRCA1',closureAsset:'Project Governance Close-out Dossier'
  };
  try{return {...fallback,...(window.MolPathLocaleRegistry?.namespace('resEth001',lang())||{})}}catch(_){return fallback}
}
function asset(title,src,cls=''){
  return `<figure class="re1-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="re1-provenance">${esc2(T().synthetic)}</div></figure>`;
}
function block(title,items,cls=''){
  return `<div class="re1-block ${cls}"><div class="re1-head"><h4>${esc2(title)}</h4><span class="re1-pill">FLAGSHIP</span></div><div class="re1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`;
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
      return block(t.start,[asset(t.synopsis,ASSETS.synopsis,'doc')]);
    case 'hypothesis':
      if(!state.research?.hypothesis)return '';
      return block(t.governance,[asset(t.archive,ASSETS.archive,'wide'),asset(t.consent,ASSETS.consent,'wide')]);
    case 'design':
      if(!state.research?.design?.size)return '';
      return block(t.material,[asset(t.reserve,ASSETS.reserve,'wide')]);
    case 'methods':
      if(!state.research?.methods?.size)return '';
      return block(t.privacy,[asset(t.privacyAsset,ASSETS.privacy,'wide')]);
    case 'analysis':
      return block(t.approval,[asset(t.approvalAsset,ASSETS.approval,'wide'),asset(t.sharingAsset,ASSETS.sharing,'wide')])+block(t.twist,[asset(t.brca,ASSETS.brca,'wide')]);
    case 'feedback': {
      let out=block(t.workflow,[asset(t.incidental,ASSETS.incidental,'wide')]);
      if(complete())out+=block(t.closure,[asset(t.closureAsset,ASSETS.closure,'wide')],'re1-closure');
      return out;
    }
    default:return '';
  }
}
function styles(){
  if(document.getElementById('re1FlagshipStyles'))return;
  const s=document.createElement('style');s.id='re1FlagshipStyles';s.textContent=`
  .re1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .re1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.re1-head h4{margin:0;color:var(--primary)}
  .re1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#6b2fa0;border:1px solid #dec9ef;font-size:.68rem;font-weight:900;letter-spacing:.05em}
  .re1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.re1-grid.single{grid-template-columns:1fr}.re1-asset.wide{grid-column:1/-1}
  .re1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.re1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.re1-asset a{display:block;background:#f2f6f9}.re1-asset img{width:100%;height:auto;display:block;object-fit:contain}.re1-asset.doc img{max-height:900px;object-fit:contain}.re1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  .re1-closure{border-color:#abefc6;background:linear-gradient(180deg,#fff,#f4fff7)}
  @media(max-width:1000px){.re1-grid{grid-template-columns:1fr}.re1-asset.wide{grid-column:auto}.re1-asset.doc img{max-height:none}}
  `;document.head.appendChild(s);
}
function install(){
  if(window.__MolPathRESETH001FlagshipInstalled)return;
  window.__MolPathRESETH001FlagshipInstalled=true;
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
window.MolPathRESETH001Flagship=Object.freeze({
  base:'v2.5.0b+LAB_POST_001+LAB_DOC_001+RES_HYP_001_FIX3',
  caseId:CASE_ID,
  assetCount:10,
  hook:'renderContent wrapper',
  phaseGating:{project_idea:[1],hypothesis_after_choice:[2,3],design_after_choice:[4],methods_after_choice:[5],analysis:[6,7,8],feedback:[9],post_completion:[10]},
  logicChanges:false,
  observers:0
});
})();
