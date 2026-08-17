/* MolPath Simulator v2.4.0z19 — MTB_CNS_001 Premium / Flagship
   Base: v2.4.0z18
   Scope: MTB_CNS_001_v1_0 only.
   Core rule: MGMT is a separate epigenetic predictive layer; DNA-NGS does not substitute for MGMT testing.
   This module preserves the existing Deep-Dive / scoring logic and adds only approved case-local visual evidence.
*/
(function(){
'use strict';
const C19_VERSION='v2.4.0z19';
const C19_CASE='MTB_CNS_001_v1_0';
const C19_ASSETS=Object.freeze({
  referral:'assets/mtb_cns_001/referral_neurosurgery_001.png',
  mri:'assets/mtb_cns_001/mri_brain_preop_001.png',
  heOverview:'assets/mtb_cns_001/he_overview_001.png',
  heDetail:'assets/mtb_cns_001/he_detail_001.png',
  ki67:'assets/mtb_cns_001/ki67_mib1_001.png',
  idh:'assets/mtb_cns_001/idh1_idh2_001.png',
  ngs:'assets/mtb_cns_001/glioma_ngs_001.png',
  mgmt:'assets/mtb_cns_001/mgmt_methylation_001.png',
  classifier:'assets/mtb_cns_001/cns_methylation_classifier_001.png',
  final:'assets/mtb_cns_001/integrated_neuropath_final_001.png'
});
window.MolPathCNS001FlagshipAssets=C19_ASSETS;

function active(){try{return !!activeCase&&activeCase.id===C19_CASE}catch(_){return false}}
function selected(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function currentStep(){try{return state?.step||''}catch(_){return ''}}
function hasIdhSpecific(){return selected('idh1_ihc_seq')}
function hasNgs(){return selected('glioma_ngs_panel')||selected('broad_pan_panel')}
function hasMgmt(){return selected('mgmt_methylation')}
function hasClassifier(){return selected('cns_methylation_classifier')}
/* The final image itself contains IDH IHC, TERT/EGFR, MGMT and classifier results.
   Therefore all four corresponding evidence layers must have been explicitly generated. */
function finalReady(){try{return !!state?.finalized&&hasIdhSpecific()&&hasNgs()&&hasMgmt()&&hasClassifier()}catch(_){return false}}
function esc2(v){try{return esc(v==null?'':String(v))}catch(_){return String(v==null?'':v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}}
function lang(){
  try{
    const x=((document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||localStorage.getItem('molpath_language')||document.documentElement.lang||'de').toLowerCase();
    return ['de','en','ro','el','es','fr'].includes(x)?x:'de';
  }catch(_){return 'de'}
}
const COPY={
 de:{
  intake:'Klinisches Eingangsdokument',referral:'Neurochirurgische Einsendung / Anforderung',history:'Präoperative Bildgebung',mri:'MRT Schädel mit KM · links temporoparietale Raumforderung',histo:'Digitale Neuropathologie',heOverview:'HE Übersicht · hochgradig glialer Tumor / Nekrose',heDetail:'HE Detail · Atypie / mikrovaskuläre Proliferation',ki67:'Ki-67 / MIB-1 · Proliferationsindex ca. 35 %',evidence:'Testabhängige diagnostische Evidenz',idh:'IDH-Diagnostik · IDH1 R132H IHC negativ / IDH1-2 WT',ngs:'Gliom-DNA-NGS · TERT C228T / EGFR-Amplifikation / IDH-WT',mgmt:'MGMT-Promotor-Methylierung · methyliert (28 %)',classifier:'CNS-Methylierungsclassifier · Glioblastom, IDH-Wildtyp · Score 0,98',finalTitle:'Integrierter Abschluss',final:'Integrierter neuropathologischer Abschlussbefund',synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten'
 },
 en:{
  intake:'Clinical intake document',referral:'Neurosurgical referral / diagnostic request',history:'Preoperative imaging',mri:'Contrast-enhanced brain MRI · left temporoparietal mass',histo:'Digital neuropathology',heOverview:'H&E overview · high-grade glial tumour / necrosis',heDetail:'H&E detail · atypia / microvascular proliferation',ki67:'Ki-67 / MIB-1 · proliferation index about 35%',evidence:'Test-gated diagnostic evidence',idh:'IDH diagnostics · IDH1 R132H IHC negative / IDH1-2 WT',ngs:'Glioma DNA NGS · TERT C228T / EGFR amplification / IDH-WT',mgmt:'MGMT promoter methylation · methylated (28%)',classifier:'CNS methylation classifier · glioblastoma, IDH-wildtype · score 0.98',finalTitle:'Integrated finalization',final:'Integrated neuropathology final report',synthetic:'Synthetic training asset · educational only · no real patient data'
 },
 ro:{
  intake:'Document clinic de trimitere',referral:'Trimitere neurochirurgicală / cerere diagnostică',history:'Imagistică preoperatorie',mri:'RMN cerebral cu contrast · formațiune temporoparietală stângă',histo:'Neuropatologie digitală',heOverview:'HE ansamblu · tumoră glială de grad înalt / necroză',heDetail:'HE detaliu · atipie / proliferare microvasculară',ki67:'Ki-67 / MIB-1 · indice proliferativ ~35%',evidence:'Dovezi diagnostice dependente de test',idh:'Diagnostic IDH · IHC IDH1 R132H negativ / IDH1-2 WT',ngs:'NGS ADN gliom · TERT C228T / amplificare EGFR / IDH-WT',mgmt:'Metilarea promotorului MGMT · metilat (28%)',classifier:'Clasificator de metilare CNS · glioblastom, IDH-wildtype · scor 0,98',finalTitle:'Integrare finală',final:'Raport neuropatologic integrat final',synthetic:'Asset sintetic de instruire · numai educațional · fără date reale de pacient'
 },
 el:{
  intake:'Κλινικό έγγραφο παραπομπής',referral:'Νευροχειρουργική παραπομπή / διαγνωστικό αίτημα',history:'Προεγχειρητική απεικόνιση',mri:'MRI εγκεφάλου με σκιαγραφικό · αριστερή κροταφοβρεγματική μάζα',histo:'Ψηφιακή νευροπαθολογία',heOverview:'HE επισκόπηση · υψηλόβαθμος γλοιακός όγκος / νέκρωση',heDetail:'HE λεπτομέρεια · ατυπία / μικροαγγειακός πολλαπλασιασμός',ki67:'Ki-67 / MIB-1 · δείκτης πολλαπλασιασμού ~35%',evidence:'Διαγνωστικά ευρήματα ανά εξέταση',idh:'Διάγνωση IDH · IDH1 R132H IHC αρνητικό / IDH1-2 WT',ngs:'DNA NGS γλοιώματος · TERT C228T / ενίσχυση EGFR / IDH-WT',mgmt:'Μεθυλίωση προαγωγέα MGMT · μεθυλιωμένος (28%)',classifier:'CNS methylation classifier · glioblastoma, IDH-wildtype · score 0.98',finalTitle:'Τελική ολοκλήρωση',final:'Ολοκληρωμένη τελική νευροπαθολογική αναφορά',synthetic:'Συνθετικό εκπαιδευτικό asset · μόνο για εκπαίδευση · χωρίς πραγματικά δεδομένα ασθενών'
 },
 es:{
  intake:'Documento clínico de entrada',referral:'Derivación neuroquirúrgica / solicitud diagnóstica',history:'Imagen preoperatoria',mri:'RM cerebral con contraste · masa temporoparietal izquierda',histo:'Neuropatología digital',heOverview:'HE panorámica · tumor glial de alto grado / necrosis',heDetail:'HE detalle · atipia / proliferación microvascular',ki67:'Ki-67 / MIB-1 · índice proliferativo ~35%',evidence:'Evidencia diagnóstica dependiente de pruebas',idh:'Diagnóstico IDH · IHQ IDH1 R132H negativa / IDH1-2 WT',ngs:'NGS de ADN de glioma · TERT C228T / amplificación EGFR / IDH-WT',mgmt:'Metilación del promotor MGMT · metilado (28%)',classifier:'Clasificador de metilación SNC · glioblastoma, IDH-wildtype · score 0,98',finalTitle:'Integración final',final:'Informe neuropatológico integrado final',synthetic:'Asset sintético de entrenamiento · solo educativo · sin datos reales de pacientes'
 },
 fr:{
  intake:'Document clinique initial',referral:'Demande neurochirurgicale / demande diagnostique',history:'Imagerie préopératoire',mri:'IRM cérébrale avec contraste · masse temporo-pariétale gauche',histo:'Neuropathologie numérique',heOverview:'HE vue d’ensemble · tumeur gliale de haut grade / nécrose',heDetail:'HE détail · atypies / prolifération microvasculaire',ki67:'Ki-67 / MIB-1 · index de prolifération ~35 %',evidence:'Données diagnostiques conditionnées par les tests',idh:'Diagnostic IDH · IHC IDH1 R132H négative / IDH1-2 WT',ngs:'NGS ADN gliome · TERT C228T / amplification EGFR / IDH-WT',mgmt:'Méthylation du promoteur MGMT · méthylé (28 %)',classifier:'Classifieur de méthylation SNC · glioblastome, IDH-wildtype · score 0,98',finalTitle:'Intégration finale',final:'Compte rendu neuropathologique intégré final',synthetic:'Asset synthétique de formation · usage éducatif uniquement · aucune donnée réelle de patient'
 }
};
function T(){return COPY[lang()]||COPY.de}
function asset(title,src,cls=''){
  return `<figure class="c19-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="c19-prov">${esc2(T().synthetic)}</div></figure>`;
}
function block(title,body,badge='FLAGSHIP'){
  return `<div class="c19-block"><div class="c19-head"><h4>${esc2(title)}</h4><span class="c19-pill">${esc2(badge)}</span></div>${body}</div>`;
}
function grid(items,wide=false){return `<div class="c19-grid ${wide?'single':''}">${items.join('')}</div>`}
function baselineAddon(step){
  if(step==='intake')return block(T().intake,grid([asset(T().referral,C19_ASSETS.referral,'doc')],true),'CASE FILE');
  if(step==='history')return block(T().history,grid([asset(T().mri,C19_ASSETS.mri,'wide')],true),'RADIOLOGY');
  if(step==='histo')return block(T().histo,grid([asset(T().heOverview,C19_ASSETS.heOverview),asset(T().heDetail,C19_ASSETS.heDetail),asset(T().ki67,C19_ASSETS.ki67,'wide')]),'HISTOLOGY');
  return '';
}
function reportAddon(){
  const items=[];
  if(hasIdhSpecific())items.push(asset(T().idh,C19_ASSETS.idh,'wide'));
  if(hasNgs())items.push(asset(T().ngs,C19_ASSETS.ngs,'wide'));
  if(hasMgmt())items.push(asset(T().mgmt,C19_ASSETS.mgmt,'wide'));
  /* This generated classifier report also references TERT/EGFR and MGMT in its interpretation; gate those prerequisite results to prevent leakage. */
  if(hasClassifier()&&hasNgs()&&hasMgmt())items.push(asset(T().classifier,C19_ASSETS.classifier,'wide'));
  return items.length?block(T().evidence,grid(items,true),'TEST-GATED'):'';
}
function finalAddon(){return finalReady()?block(T().finalTitle,grid([asset(T().final,C19_ASSETS.final,'wide')],true),'FINAL NEUROPATH'):''}
function injectBeforeSectionEnd(html,addon){
  if(!addon||typeof html!=='string')return html;
  const pos=html.lastIndexOf('</section>');
  return pos>=0?html.slice(0,pos)+addon+html.slice(pos):html+addon;
}

/* Baseline case-file evidence. Existing case content and logic stay unchanged. */
const PREV_CONTENT=renderContent;
renderContent=function(){
  let html=PREV_CONTENT.apply(this,arguments);
  if(!active())return html;
  return injectBeforeSectionEnd(html,baselineAddon(currentStep()));
};
try{window.renderContent=renderContent}catch(_){ }

/* Test-gated assay evidence. A distractor such as tmb_msi_neuro cannot reveal any of these assets. */
const PREV_REPORT=renderReport;
renderReport=function(){
  let html=PREV_REPORT.apply(this,arguments);
  if(!active())return html;
  return injectBeforeSectionEnd(html,reportAddon());
};
try{window.renderReport=renderReport}catch(_){ }

/* Final integrated image only after true finalization AND every result shown inside that image was explicitly generated. */
const PREV_MTB=renderMtb;
renderMtb=function(){
  let html=PREV_MTB.apply(this,arguments);
  if(!active())return html;
  return injectBeforeSectionEnd(html,finalAddon());
};
try{window.renderMtb=renderMtb}catch(_){ }

function styles(){
  if(document.getElementById('c19FlagshipStyles'))return;
  const s=document.createElement('style');s.id='c19FlagshipStyles';s.textContent=`
  #v20bVersion{font-size:0!important}#v20bVersion::after{content:'v2.4.0z19'!important;font-size:.72rem!important;line-height:1.1}
  .c19-block{border:1px solid var(--line,#d7e2ea);border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .c19-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.c19-head h4{margin:0;color:var(--primary,#0f4c75)}
  .c19-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.69rem;font-weight:900;letter-spacing:.04em}
  .c19-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.c19-grid.single{grid-template-columns:1fr}.c19-grid .wide{grid-column:1/-1}
  .c19-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc}.c19-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.c19-asset a{display:block;background:#f2f6f9}.c19-asset img{width:100%;height:auto;display:block;object-fit:contain}.c19-asset.doc img{max-height:900px;object-fit:contain}.c19-prov{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  @media(max-width:1000px){.c19-grid{grid-template-columns:1fr}.c19-grid .wide{grid-column:auto}.c19-asset.doc img{max-height:none}}
  `;document.head.appendChild(s);
}
function stamp(){
  try{
    window.MOLPATH_APP_VERSION=C19_VERSION;document.title='MolPath Simulator '+C19_VERSION;
    const els=[document.getElementById('v20bVersion'),document.getElementById('versionBadge'),...document.querySelectorAll('.v20b-topstatus .v20b-pill.primary')].filter(Boolean);
    els.forEach(el=>{el.setAttribute('data-i18n-skip','1');if(el.id!=='v20bVersion')el.textContent=C19_VERSION});
  }catch(_){ }
}
const PREV_RENDER=render;
render=function(){const out=PREV_RENDER.apply(this,arguments);stamp();return out};
try{window.render=render}catch(_){ }
const PREV_I18N_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_I18N_AFTER==='function')PREV_I18N_AFTER(l)}catch(_){ }stamp();};
function boot(){styles();stamp();try{if(typeof render==='function')render()}catch(err){console.error(C19_VERSION+' CNS_001 flagship boot failed',err)}setTimeout(stamp,100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);

window.MolPathCNS001Flagship=Object.freeze({
  version:C19_VERSION,base:'v2.4.0z18',caseId:C19_CASE,assetCount:10,
  baseline:{intake:['neurosurgical referral'],history:['preoperative brain MRI'],histo:['H&E overview','H&E detail','Ki-67 / MIB-1']},
  testGated:{idh1_ihc_seq:['IDH1 R132H IHC + IDH1/2 sequencing report'],glioma_ngs_panel_or_broad:['TERT/EGFR glioma DNA-NGS report'],mgmt_methylation:['MGMT methylation report'],cns_methylation_classifier_after_ngs_mgmt:['CNS methylation classifier report'],finalized_full_evidence:['integrated neuropathology final report']},
  finalEvidence:['idh1_ihc_seq','glioma_ngs_panel|broad_pan_panel','mgmt_methylation','cns_methylation_classifier','state.finalized'],
  guardrail:'tmb_msi_neuro and other non-corresponding choices never unlock positive molecular assets; classifier image waits for NGS+MGMT because its interpretation names those findings; final image cannot reveal IDH-IHC or TERT/EGFR unless those assays were explicitly selected'
});
})();
