/* MolPath Simulator v2.4.0z17 — MTB_OVAR_001 Premium / Flagship
   Base: v2.4.0z16
   Scope: MTB_OVAR_001_v0_7 only.
   Adds approved baseline and test-gated evidence to the existing two-round OVAR artifact workflow.
*/
(function(){
'use strict';
const O17_VERSION='v2.4.0z17';
const O17_CASE='MTB_OVAR_001_v0_7';
const O17_ASSETS=Object.freeze({
  letter:'assets/mtb_ovar_001/oncology_mtb_letter_001.png',
  ct:'assets/mtb_ovar_001/ct_abdomen_pelvis_recurrence_001.png',
  heOverview:'assets/mtb_ovar_001/he_overview_001.png',
  heZoom:'assets/mtb_ovar_001/he_zoom_001.png',
  ihc:'assets/mtb_ovar_001/ihc_pax8_wt1_p53_p16_001.png',
  tumorNgs:'assets/mtb_ovar_001/tumor_brca_hrr_ngs_001.png',
  hrd:'assets/mtb_ovar_001/hrd_genomic_scar_grayzone_001.png',
  qc:'assets/mtb_ovar_001/ffpe_artifact_qc_001.png',
  liquid:'assets/mtb_ovar_001/liquid_biopsy_brca1_confirmation_001.png',
  final:'assets/mtb_ovar_001/integrated_mtb_final_001.png'
});
window.MolPathOVAR001FlagshipAssets=O17_ASSETS;

function active(){try{return !!activeCase&&activeCase.id===O17_CASE}catch(_){return false}}
function st(){try{return state||{}}catch(_){return {}}}
function phase(){try{return st().ovarMP?.phase||'round1'}catch(_){return 'round1'}}
function currentStep(){try{return st().step||''}catch(_){return ''}}
function arr(x){return Array.isArray(x)?x:[]}
function selectedNow(){try{return Array.from(st().selected||[])}catch(_){return []}}
function p1(){try{const x=arr(st().ovarMP?.phase1Selected);return x.length?x:selectedNow()}catch(_){return selectedNow()}}
function p2(){try{const x=arr(st().ovarMP?.phase2Selected);return x.length?x:selectedNow()}catch(_){return selectedNow()}}
function has(xs,id){return arr(xs).includes(id)}
function p1BRCA(){return has(p1(),'tumor_brca_hrr')}
function p1HRD(){return has(p1(),'hrd_score')}
function p1Complete(){return p1BRCA()&&p1HRD()}
function p2Liquid(){return has(p2(),'liquid_biopsy')}
function finalReady(){return phase()==='final'&&p2Liquid()}
function esc2(v){try{return esc(v==null?'':String(v))}catch(_){return String(v==null?'':v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}}
function lang(){
  try{
    const x=((document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||localStorage.getItem('molpath_language')||document.documentElement.lang||'de').toLowerCase();
    return ['de','en','ro','el','es','fr'].includes(x)?x:'de';
  }catch(_){return 'de'}
}
const COPY={
 de:{clinical:'Klinische Originaldokumente',letter:'Onkologie-/MTB-Arztbrief',ct:'CT Abdomen/Becken · Rezidivsituation',histo:'Digitale Histologie / IHC',heOverview:'HE Übersicht · Primärresektat',heZoom:'HE Detail · HGSOC',ihc:'IHC-Panel · PAX8 / WT1 / p53 / p16',r1:'Runde 1 · Evidenz aus altem FFPE',tumorNgs:'Tumor-BRCA/HRR-NGS · BRCA1-LoF',hrd:'HRD / Genomic Scar · Gray Zone',qc:'FFPE-QC / Artefakt-Check',r2:'Runde 2 · Bestätigung',liquid:'Liquid Biopsy · BRCA1-Bestätigung',final:'Finale Integration',integrated:'Integrierter Molekularbefund / MTB-Abschlussbericht',synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten'},
 en:{clinical:'Original clinical documents',letter:'Oncology / MTB clinical letter',ct:'CT abdomen/pelvis · recurrent disease',histo:'Digital histology / IHC',heOverview:'H&E overview · primary resection',heZoom:'H&E detail · HGSOC',ihc:'IHC panel · PAX8 / WT1 / p53 / p16',r1:'Round 1 · evidence from archival FFPE',tumorNgs:'Tumour BRCA/HRR NGS · BRCA1 LoF',hrd:'HRD / genomic scar · gray zone',qc:'FFPE QC / artefact check',r2:'Round 2 · confirmation',liquid:'Liquid biopsy · BRCA1 confirmation',final:'Final integration',integrated:'Integrated molecular report / MTB final report',synthetic:'Synthetic training asset · educational only · no real patient data'},
 ro:{clinical:'Documente clinice originale',letter:'Scrisoare oncologie / MTB',ct:'CT abdomen/pelvis · recidivă',histo:'Histologie digitală / IHC',heOverview:'HE overview · rezecție primară',heZoom:'HE detaliu · HGSOC',ihc:'Panel IHC · PAX8 / WT1 / p53 / p16',r1:'Runda 1 · dovezi din FFPE vechi',tumorNgs:'NGS tumoral BRCA/HRR · BRCA1 LoF',hrd:'HRD / genomic scar · zonă gri',qc:'QC FFPE / verificare artefacte',r2:'Runda 2 · confirmare',liquid:'Biopsie lichidă · confirmare BRCA1',final:'Integrare finală',integrated:'Raport molecular integrat / raport final MTB',synthetic:'Asset sintetic de instruire · doar educațional · fără date reale de pacient'},
 el:{clinical:'Αρχικά κλινικά έγγραφα',letter:'Ογκολογική επιστολή / MTB',ct:'CT κοιλίας/πυέλου · υποτροπή',histo:'Ψηφιακή ιστολογία / IHC',heOverview:'HE επισκόπηση · πρωτογενής εκτομή',heZoom:'HE λεπτομέρεια · HGSOC',ihc:'Panel IHC · PAX8 / WT1 / p53 / p16',r1:'Γύρος 1 · στοιχεία από παλαιό FFPE',tumorNgs:'NGS όγκου BRCA/HRR · BRCA1 LoF',hrd:'HRD / genomic scar · γκρίζα ζώνη',qc:'FFPE QC / έλεγχος artefact',r2:'Γύρος 2 · επιβεβαίωση',liquid:'Liquid biopsy · επιβεβαίωση BRCA1',final:'Τελική ολοκλήρωση',integrated:'Ολοκληρωμένη μοριακή αναφορά / τελικό MTB',synthetic:'Συνθετικό εκπαιδευτικό asset · μόνο για εκπαίδευση · χωρίς πραγματικά δεδομένα ασθενών'},
 es:{clinical:'Documentos clínicos originales',letter:'Carta de oncología / MTB',ct:'TC abdomen/pelvis · recidiva',histo:'Histología digital / IHQ',heOverview:'HE panorámica · resección primaria',heZoom:'HE detalle · HGSOC',ihc:'Panel IHQ · PAX8 / WT1 / p53 / p16',r1:'Ronda 1 · evidencia de FFPE antiguo',tumorNgs:'NGS tumoral BRCA/HRR · BRCA1 LoF',hrd:'HRD / genomic scar · zona gris',qc:'QC FFPE / control de artefactos',r2:'Ronda 2 · confirmación',liquid:'Biopsia líquida · confirmación BRCA1',final:'Integración final',integrated:'Informe molecular integrado / informe final MTB',synthetic:'Asset sintético de entrenamiento · solo educativo · sin datos reales de pacientes'},
 fr:{clinical:'Documents cliniques originaux',letter:'Courrier d’oncologie / RCP',ct:'TDM abdomen/pelvis · récidive',histo:'Histologie numérique / IHC',heOverview:'HE vue d’ensemble · résection primaire',heZoom:'HE détail · HGSOC',ihc:'Panel IHC · PAX8 / WT1 / p53 / p16',r1:'Tour 1 · données de l’ancien FFPE',tumorNgs:'NGS tumoral BRCA/HRR · BRCA1 LoF',hrd:'HRD / genomic scar · zone grise',qc:'QC FFPE / contrôle des artefacts',r2:'Tour 2 · confirmation',liquid:'Biopsie liquide · confirmation BRCA1',final:'Intégration finale',integrated:'Rapport moléculaire intégré / rapport final RCP',synthetic:'Asset synthétique de formation · usage éducatif uniquement · aucune donnée réelle de patient'}
};
function T(){return COPY[lang()]||COPY.de}
function asset(title,src,cls=''){
  return `<figure class="o17-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="o17-prov">${esc2(T().synthetic)}</div></figure>`;
}
function block(title,body,badge='FLAGSHIP'){
  return `<div class="o17-block"><div class="o17-head"><h4>${esc2(title)}</h4><span class="o17-pill">${esc2(badge)}</span></div>${body}</div>`;
}
function grid(items,wide=false){return `<div class="o17-grid ${wide?'single':''}">${items.join('')}</div>`}
function baselineAddon(step){
  if(step==='intake')return block(T().clinical,grid([asset(T().letter,O17_ASSETS.letter,'doc')],true),'CASE FILE');
  if(step==='history')return block(T().clinical,grid([asset(T().ct,O17_ASSETS.ct,'wide')],true),'RADIOLOGY');
  if(step==='histo')return block(T().histo,grid([asset(T().heOverview,O17_ASSETS.heOverview),asset(T().heZoom,O17_ASSETS.heZoom),asset(T().ihc,O17_ASSETS.ihc,'wide')]),'HISTOLOGY');
  return '';
}
function round1Addon(){
  const items=[];
  if(p1BRCA())items.push(asset(T().tumorNgs,O17_ASSETS.tumorNgs,'wide'));
  if(p1HRD())items.push(asset(T().hrd,O17_ASSETS.hrd,'wide'));
  if(p1Complete())items.push(asset(T().qc,O17_ASSETS.qc,'wide'));
  return items.length?block(T().r1,grid(items,true),'TEST-GATED'):'';
}
function round2Addon(){
  return p2Liquid()?block(T().r2,grid([asset(T().liquid,O17_ASSETS.liquid,'wide')],true),'TEST-GATED'):'';
}
function finalAddon(){
  return finalReady()?block(T().final,grid([asset(T().integrated,O17_ASSETS.final,'wide')],true),'FINAL MTB'):'';
}
function injectBeforeSectionEnd(html,addon){
  if(!addon||typeof html!=='string')return html;
  const pos=html.lastIndexOf('</section>');
  return pos>=0?html.slice(0,pos)+addon+html.slice(pos):html+addon;
}

/* Baseline evidence is available before molecular testing. */
const PREV_CONTENT=window.renderContent;
if(typeof PREV_CONTENT==='function'){
  window.renderContent=function(){
    const html=PREV_CONTENT.apply(this,arguments);
    if(!active())return html;
    return injectBeforeSectionEnd(html,baselineAddon(currentStep()));
  };
  try{renderContent=window.renderContent}catch(_){ }
}

/* Round-specific assay evidence. No cross-phase leakage. */
const PREV_REPORT=window.renderReport;
if(typeof PREV_REPORT==='function'){
  window.renderReport=function(){
    const html=PREV_REPORT.apply(this,arguments);
    if(!active())return html;
    if(currentStep()==='report')return injectBeforeSectionEnd(html,round1Addon());
    if(currentStep()==='follow_report')return injectBeforeSectionEnd(html,round2Addon());
    return html;
  };
  try{renderReport=window.renderReport}catch(_){ }
}

/* The integrated report exists only after the correct second-round confirmation path. */
const PREV_MTB=window.renderMtb;
if(typeof PREV_MTB==='function'){
  window.renderMtb=function(){
    const html=PREV_MTB.apply(this,arguments);
    if(!active())return html;
    return injectBeforeSectionEnd(html,finalAddon());
  };
  try{renderMtb=window.renderMtb}catch(_){ }
}

function styles(){
  if(document.getElementById('o17FlagshipStyles'))return;
  const s=document.createElement('style');s.id='o17FlagshipStyles';s.textContent=`
  #v20bVersion{font-size:0!important}#v20bVersion::after{content:'v2.4.0z17'!important;font-size:.72rem!important;line-height:1.1}
  .o17-block{border:1px solid var(--line,#d8e4ef);border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .o17-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.o17-head h4{margin:0;color:var(--primary,#0f4c75)}
  .o17-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#ecfdf3;color:#067647;border:1px solid #abefc6;font-size:.69rem;font-weight:900;letter-spacing:.04em}
  .o17-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.o17-grid.single{grid-template-columns:1fr}.o17-grid .wide{grid-column:1/-1}
  .o17-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc}.o17-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}
  .o17-asset a{display:block;background:#f2f6f9}.o17-asset img{width:100%;height:auto;display:block;object-fit:contain}.o17-asset.doc img{max-height:900px;object-fit:contain}.o17-prov{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  @media(max-width:1000px){.o17-grid{grid-template-columns:1fr}.o17-grid .wide{grid-column:auto}.o17-asset.doc img{max-height:none}}
  `;document.head.appendChild(s);
}
function stamp(){
  try{
    window.MOLPATH_APP_VERSION=O17_VERSION;document.title='MolPath Simulator '+O17_VERSION;
    const els=[document.getElementById('v20bVersion'),document.getElementById('versionBadge'),...document.querySelectorAll('.v20b-topstatus .v20b-pill.primary')].filter(Boolean);
    els.forEach(el=>{el.setAttribute('data-i18n-skip','1');if(el.id!=='v20bVersion')el.textContent=O17_VERSION});
  }catch(_){ }
}
const PREV_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_AFTER==='function')PREV_AFTER(l)}catch(_){ }stamp()};
const PREV_RENDER=window.render;
if(typeof PREV_RENDER==='function'){
  window.render=function(){const out=PREV_RENDER.apply(this,arguments);stamp();return out};
  try{render=window.render}catch(_){ }
}
function boot(){styles();stamp();try{if(typeof render==='function')render()}catch(err){console.error(O17_VERSION+' OVAR flagship boot failed',err)}setTimeout(stamp,100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);

window.MolPathOVAR001Flagship=Object.freeze({
  version:O17_VERSION,base:'v2.4.0z16',caseId:O17_CASE,assetCount:10,
  baseline:{intake:['oncology letter'],history:['CT abdomen/pelvis'],histo:['H&E overview','H&E zoom','PAX8/WT1/p53/p16 IHC']},
  testGated:{tumor_brca_hrr:['tumour BRCA/HRR NGS'],hrd_score:['HRD/genomic scar report'],round1_complete:['FFPE artifact/QC workspace'],liquid_biopsy:['liquid-biopsy BRCA1 confirmation'],final_after_liquid:['integrated MTB report']},
  rejectedAssets:['BRAF qPCR misgeneration','MLH1 methylation misgeneration','unapproved duplicate BRCA/HRR intermediate'],
  guardrail:'accepted_bad path never reveals liquid-biopsy or integrated-final evidence'
});
})();
