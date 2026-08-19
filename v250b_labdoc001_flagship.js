/* MolPath Simulator v2.5.0b — LAB_DOC_001 Flagship Asset Layer
   Scope: LAB_DOC_001_v1_0 only.
   Additive media layer only: no scoring, choices, correctness, gates, CAPA logic or completion semantics are changed.
*/
(function(){
'use strict';
const CASE_ID='LAB_DOC_001_v1_0';
const ASSETS=Object.freeze({
  notebook:'assets/lab_doc_001/lab_notebook_original_001.png',
  runMeta:'assets/lab_doc_001/qpcr_run_metadata_001.png',
  amplification:'assets/lab_doc_001/qpcr_amplification_plot_001.png',
  ctTable:'assets/lab_doc_001/qpcr_ct_replicate_table_001.png',
  traceability:'assets/lab_doc_001/lims_traceability_record_001.png',
  sopLot:'assets/lab_doc_001/sop_lot_reagent_reconstruction_001.png',
  evidenceChain:'assets/lab_doc_001/evidence_chain_reconstructed_run_001.png',
  capa:'assets/lab_doc_001/deviation_capa_001.png',
  effectiveness:'assets/lab_doc_001/effectiveness_followup_audit_001.png'
});
window.MolPathLABDOC001FlagshipAssets=ASSETS;
function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function done(){try{return !!caseIsComplete()}catch(_){return !!(state?.finalized||state?.lab?.finalized)}}
function esc2(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function lang(){try{return window.MolPathI18n?.currentLang?.()||window.MolPathLanguageRegistry?.normalize(document.body?.getAttribute('data-molpath-lang')||'de')||'de'}catch(_){return 'de'}}
function T(){
  const fallback={
    start:'Primärdokumentation',raw:'Rekonstruierbare Primärdaten',trace:'Rückverfolgbarkeit & Methodenrekonstruktion',capa:'Evidence Chain & CAPA',closure:'Wirksamkeitsprüfung',
    synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
    notebook:'Original-Laborbuchseite · „PCR wie immer gemacht“',runMeta:'qPCR Run-Metadaten · Instrument-Primärquelle',amplification:'qPCR Amplifikationsplot · Probe 4 schwach reproduzierbar',ctTable:'Ct-/Replikat-/Plate-Tabelle · Probe 4',traceability:'LIMS Traceability Record · Probe 4',sopLot:'SOP-/Lot-/Reagenzien-Rekonstruktion',evidenceChain:'Rekonstruierter Evidence Chain · auditfester Run',capaDoc:'Deviation / CAPA · Dokumentationsabweichung',effectiveness:'Follow-up Audit · CAPA-Wirksamkeitsprüfung'
  };
  try{return {...fallback,...(window.MolPathLocaleRegistry?.namespace('labDoc001',lang())||{})}}catch(_){return fallback}
}
function asset(title,src,cls=''){return `<figure class="ld1-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="ld1-provenance">${esc2(T().synthetic)}</div></figure>`}
function block(title,items,cls=''){return `<div class="ld1-block ${cls}"><div class="ld1-head"><h4>${esc2(title)}</h4><span class="ld1-pill">FLAGSHIP</span></div><div class="ld1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const idx=html.lastIndexOf('</section>');return idx>=0?html.slice(0,idx)+addon+html.slice(idx):html+addon}
function startBlock(){return block(T().start,[asset(T().notebook,ASSETS.notebook,'doc')])}
function rawBlock(){return block(T().raw,[asset(T().runMeta,ASSETS.runMeta),asset(T().amplification,ASSETS.amplification),asset(T().ctTable,ASSETS.ctTable)])}
function traceBlock(){return block(T().trace,[asset(T().traceability,ASSETS.traceability),asset(T().sopLot,ASSETS.sopLot)])}
function capaBlock(){return block(T().capa,[asset(T().evidenceChain,ASSETS.evidenceChain,'wide'),asset(T().capaDoc,ASSETS.capa,'doc')])}
function closureBlock(){return block(T().closure,[asset(T().effectiveness,ASSETS.effectiveness,'doc')],'ld1-closure')}
function wrap(name,addonFn,guardFn){const prev=window[name];if(typeof prev!=='function')return;const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;if(guardFn&&!guardFn())return html;return inject(html,addonFn())};try{window[name]=wrapped}catch(_){}try{eval(name+'=wrapped')}catch(_){}}
function styles(){if(document.getElementById('ld1FlagshipStyles'))return;const s=document.createElement('style');s.id='ld1FlagshipStyles';s.textContent=`
.ld1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.ld1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.ld1-head h4{margin:0;color:var(--primary)}
.ld1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#5d2b86;border:1px solid #ddc9ee;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.ld1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.ld1-grid.single{grid-template-columns:1fr}.ld1-asset.wide{grid-column:1/-1}
.ld1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.ld1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.ld1-asset a{display:block;background:#f2f6f9}.ld1-asset img{width:100%;height:auto;display:block;object-fit:contain}.ld1-asset.doc img{max-height:880px;object-fit:contain}.ld1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.ld1-closure{border-color:#abefc6;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.ld1-grid{grid-template-columns:1fr}.ld1-asset.wide{grid-column:auto}.ld1-asset.doc img{max-height:none}}
`;document.head.appendChild(s)}
function install(){if(window.__MolPathLABDOC001FlagshipInstalled)return;window.__MolPathLABDOC001FlagshipInstalled=true;styles();wrap('renderRunOverview',startBlock);wrap('renderQcEvent',rawBlock);wrap('renderRootCause',traceBlock);wrap('renderCapa',capaBlock);wrap('renderAudit',closureBlock,done)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathLABDOC001Flagship=Object.freeze({base:'v2.5.0b+LAB_POST_001',caseId:CASE_ID,assetCount:9,phaseGating:{run_overview:[1],qc_event:[2,3,4],root_cause:[5,6],capa:[7,8],post_completion:[9]},logicChanges:false});
})();
