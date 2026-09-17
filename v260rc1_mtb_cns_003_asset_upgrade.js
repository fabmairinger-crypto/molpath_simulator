/* MolPath Simulator v2.6.0-rc1 — MTB_CNS_003 Asset / Content Upgrade
   Scope: MTB_CNS_003_v1_3 only.
   Adds seven curated synthetic training assets and aligns the case-local narrative with the existing Deep-Dive logic.
   No score weights, completion semantics, course membership, global filters, language registry or Signature taxonomy are changed.
*/
(function(){
'use strict';
const CASE_ID='MTB_CNS_003_v1_3';
const PATCH_ID='v2.6.0-rc1+MTB_CNS_003_ASSET01';
const ASSETS=Object.freeze({
  referral:'assets/mtb_cns_003/referral_neurosurgery_001.png',
  heOverview:'assets/mtb_cns_003/he_overview_001.png',
  heDetail:'assets/mtb_cns_003/he_detail_001.png',
  ihc:'assets/mtb_cns_003/ihc_panel_001.png',
  methylB1:'assets/mtb_cns_003/methylation_b1_low_tumor_001.png',
  methylB2:'assets/mtb_cns_003/methylation_b2_hgap_001.png',
  final:'assets/mtb_cns_003/integrated_neuropath_final_001.png'
});
window.MolPathMTBCNS003Assets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function selected(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function finalized(){try{return !!state?.finalized}catch(_){return false}}
function step(){try{return state?.step||''}catch(_){return ''}}
function E(x){try{return typeof esc==='function'?esc(x==null?'':String(x)):String(x??'')}catch(_){return String(x??'')}}
function asset(title,src,cls=''){return `<figure class="cns3-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${E(title)}"></a><div class="cns3-prov">Synthetisches Trainingsasset · educational only · keine realen Patientendaten</div></figure>`}
function block(title,items,badge='CASE EVIDENCE',cls=''){return `<div class="cns3-block ${cls}"><div class="cns3-head"><h4>${E(title)}</h4><span class="cns3-pill">${E(badge)}</span></div><div class="cns3-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID);if(!c)return;
    c.difficulty='advanced';c.estimated_time_min='12–18';
    const story=Object.fromEntries((c.story||[]).map(x=>[x.id,x]));
    if(story.intake)story.intake.items=[['Fall-ID','MTB_CNS_003'],['Patientin','47 Jahre, weiblich'],['Einsender','Neurochirurgie / Neuropathologie'],['Klinische Frage','Histologisch unklarer ZNS-Tumor – kann die DNA-Methylierungsprofilierung die Entität zuverlässig klassifizieren?']];
    if(story.history)story.history.items=[['Klinische Präsentation','Progrediente Kopfschmerzen, Gangunsicherheit und intermittierender Schwindel.'],['Bildgebung','3,8 cm große Raumforderung der linken hinteren Schädelgrube mit heterogener Kontrastmittelaufnahme und perifokalem Ödem.'],['Operation','Subtotale Resektion / repräsentative Probenentnahme.'],['Entscheidungsdruck','Morphologie und Basis-IHC erlauben keine sichere Entitätszuordnung; eine belastbare integrierte Diagnose wird benötigt.']];
    if(story.histo)story.histo.items=[['Morphologie','Heterogener glialer Tumor mit piloid/fibrillären Arealen und fokal ependymal anmutender perivaskulärer Orientierung; keine eindeutige konventionelle Entität.'],['Vor-IHC','GFAP diffus positiv, OLIG2 heterogen, EMA fokal dot-like; ATRX nukleär erhalten; p53 niedrig/fokal; Ki-67 fokal etwa 15–20 %.'],['Differenzialdiagnose','Morphologisch überlappende gliale/piloide und ependymale Merkmale.'],['Offene Frage','Kann ein validierter CNS-Methylierungsclassifier die definitive Klassifikation ermöglichen?']];
    if(story.material)story.material.items=[['Material','FFPE-Resektionsmaterial; zwei verfügbare Paraffinblöcke.'],['Block B1','Tumoranteil ca. 15 %; hoher Anteil nicht-neoplastischen Gewebes.'],['Block B2','Tumoranteil ca. 65 %; vitaler, repräsentativer Tumoranteil.'],['Präanalytik','Ein technisch bestandener Array ist bei niedrigem Tumoranteil nicht automatisch diagnostisch klassifizierbar; bei Low-confidence Ergebnis ist B2 zu priorisieren.']];
    c.result_sections=[
      {label:'Methylierungsclassifier / Methylom',test_any:['cns_methylation_classifier','bisulfite_pcr'],result:'B1 (~15 % Tumor) liefert trotz technisch erfolgreicher Analyse keinen belastbaren Klassenruf. Re-Analyse aus B2 (~65 % Tumor) ergibt einen hochkonfidenten Match zur DNA-Methylierungsklasse High-grade astrocytoma with piloid features (HGAP), calibrated score 0,96.'},
      {label:'Molekulare Integration',test_any:['broad_pan_panel'],result:'IDH1/2-Wildtyp; keine H3-K27M-Mutation nachweisbar. Das methylierungsbasierte Copy-number-Profil zeigt eine homozygote CDKN2A/B-Deletion auf 9p21 sowie zusätzliche segmentale Veränderungen.'}
    ];
    c.always_findings=[['Morphologie','Histologisch uneindeutiger posterior-fossärer glialer Tumor mit piloid/fibrillären und fokal ependymal anmutenden Merkmalen.'],['Präanalytik','B1 ca. 15 % Tumor; B2 ca. 65 % Tumor. Die Materialrepräsentativität ist für die Classifier-Interpretation entscheidend.']];
    c.complete_interpretation='Definitive integrierte Klassifikation als High-grade astrocytoma with piloid features (HGAP). Die Entitätszuordnung wird durch das hochkonfidente DNA-Methylierungsprofil aus Block B2 (calibrated score 0,96) etabliert; Histomorphologie, Immunphänotyp und Copy-number-Befunde sind konkordant. Der technisch erfolgreiche B1-Lauf war aufgrund des niedrigen Tumoranteils nicht klassifizierbar und darf nicht als definitive Diagnose verwendet werden.';
    c.partial_interpretation='Teilbefund: Ein Low-confidence/unklassifizierbares Ergebnis aus tumorarmem Material reicht nicht zur definitiven Entitätszuordnung. Tumoranteil, Array-QC und Classifier-Confidence müssen geprüft und bei verfügbarem tumorreicherem Material die Analyse wiederholt werden.';
    c.mtb_checks=[['methylom','HGAP als DNA-methylierungsdefinierte Entität korrekt einordnen'],['material','B1 (~15 %) nicht überinterpretieren und B2 (~65 %) als repräsentatives Material priorisieren'],['integration','Methylierungsprofil, Histologie/IHC und Copy-number-Profil integriert kommunizieren'],['bad','Falschaussage: technisch bestandener Array bzw. höchster Low-score-Treffer genügt für eine definitive Diagnose']];
    c.optimal_summary='Optimale Lösung: Morphologische Unsicherheit als sinnvolle Classifier-Indikation erkennen; B1-Low-confidence nicht reporten; B2 analysieren; hochkonfidenten HGAP-Methylierungsmatch als entscheidenden Klassifikationsbefund nutzen und mit Morphologie/IHC/CNV integrieren.';
    c.tags=Array.from(new Set([].concat(c.tags||[],['HGAP','CNS','Classifier-QC','Materialrepräsentativität']).filter(Boolean)));

    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.title='Der Classifier ist nur so gut wie Probe und Plausibilität';
        d.opening_scene='Ein technisch erfolgreicher Methylierungsarray aus Block B1 (~15 % Tumor) liefert keinen belastbaren Klassenruf. Die entscheidende Frage ist nicht, welcher niedrige Score am höchsten ist, sondern ob das Material für eine definitive Klassifikation repräsentativ genug war.';
        d.case_briefing='47-jährige Patientin mit 3,8 cm großer, heterogen kontrastmittelaufnehmender Raumforderung der linken hinteren Schädelgrube. Morphologie und IHC zeigen überlappende gliale/piloide und ependymale Merkmale. B1 enthält nur ca. 15 % Tumor, B2 ca. 65 %. Die definitive Entitätszuordnung gelingt erst aus dem tumorreichen Block.';
        d.pre_results=[{title:'Block B1',content:'ca. 15 % Tumor; technisch analysierbar, aber für einen belastbaren Classifier-Call nicht ausreichend repräsentativ'},{title:'Block B2',content:'ca. 65 % vitaler Tumor; bevorzugtes Material für die Re-Analyse'},{title:'Histologie / IHC',content:'piloid/fibrilläre Morphologie; GFAP+, OLIG2 heterogen, EMA fokal dot-like; keine eindeutige konventionelle Entität'}];
        d.expected_path=['Morphologische Unsicherheit als legitime Classifier-Indikation erkennen.','B1 mit ca. 15 % Tumor als Risikomaterial identifizieren.','Technisch erfolgreichen, aber nicht klassifizierbaren B1-Lauf nicht überinterpretieren.','B2 mit ca. 65 % Tumor für die Re-Analyse verwenden.','HGAP-Methylierungsklasse mit calibrated score 0,96 als entscheidenden Klassifikationsbefund einordnen.','Histologie/IHC und methylierungsbasiertes Copy-number-Profil als konkordante integrative Befunde bewerten.'];
        const rg=(d.reasoning_gate_upgrade||[]).find(x=>x&&x.id==='repeat');
        if(rg){rg.prompt='Block B2 (~65 % Tumor) liefert einen hochkonfidenten Match zur Methylierungsklasse HGAP (score 0,96). Was folgt?';rg.options=[{id:'integrate',label:'Die methylierungsdefinierte Entität als HGAP klassifizieren und Morphologie/IHC/CNV integrativ auf Konkordanz prüfen.'},{id:'classifier_only',label:'Alle histologischen und immunhistochemischen Befunde verwerfen.'},{id:'still_ignore',label:'Den Classifier grundsätzlich ignorieren.'},{id:'bisulfite',label:'Erst eine fokale Bisulfit-PCR muss die Entitätsbezeichnung bestätigen.'}];rg.correct=['integrate'];rg.rationale='HGAP ist eine DNA-methylierungsdefinierte Entität. Der hochkonfidente, plausible B2-Match ermöglicht hier die definitive Klassifikation; die übrigen Befunde dienen der integrierten Plausibilisierung.';}
        d.twist={title:'Technisch bestanden ist nicht gleich diagnostisch klassifizierbar',content:'B1 (~15 % Tumor) besteht die technische Array-QC, liefert aber keinen belastbaren Klassenruf. Erst B2 (~65 % Tumor) ergibt einen eindeutigen HGAP-Match (score 0,96).',why_critical:'Materialrepräsentativität und Classifier-Confidence sind Teil der diagnostischen Freigabe. Bei einer methylierungsdefinierten Entität kann unzureichendes Material die definitive Klassifikation verhindern.'};
        d.result_packages=[{id:'optimal',title:'Material-QC vor Klassenname',result:'B1 nicht überinterpretiert; B2 liefert HGAP, calibrated score 0,96; CDKN2A/B homozygot deletiert; Morphologie/IHC/CNV konkordant.',feedback:'Classifier korrekt als validiertes Laborverfahren und als entscheidenden Klassifikationsbefund einer methylierungsdefinierten Entität genutzt.'},{id:'partial',title:'Richtige Klasse, unsaubere Präanalytik',result:'HGAP erkannt, aber der nicht klassifizierbare B1-Lauf wird nicht klar von der diagnostisch verwertbaren B2-Analyse getrennt.',feedback:'Material- und Freigabelogik bleibt unvollständig.'},{id:'wrong',title:'Low-score overcalled',result:'Ein niedriger B1-Topmatch wird als Diagnose berichtet.',feedback:'Kritischer Befundfreigabefehler.'}];
        d.followup_logic=[{trigger:'B1: Low-confidence / kein belastbarer Klassenruf',action:'Tumoranteil und Materialrepräsentativität prüfen; B2 priorisieren.',consequence:'Keine Scheinsicherheit aus einem technisch bestandenen, diagnostisch aber unzureichenden Lauf.'},{trigger:'B2: HGAP score 0,96 + plausible Integration',action:'Definitive Klassifikation als HGAP; Morphologie/IHC/CNV auf Konkordanz prüfen und integriert berichten.',consequence:'Methylierungsprofil ermöglicht die Entitätszuordnung.'}];
        d.debrief_points=['CNS-Methylierungsclassifier sind besonders bei morphologisch schwierigen Tumoren leistungsfähig.','Tumoranteil und Materialrepräsentativität beeinflussen die diagnostische Classifier-Leistung trotz technisch bestandener Array-QC.','Ein niedriger Score bzw. fehlender Klassenruf darf nicht durch Auswahl des höchsten Treffers ersetzt werden.','HGAP ist eine DNA-methylierungsdefinierte Entität; der hochkonfidente Methylierungsmatch ist für die definitive Klassifikation zentral.','Copy-number-Profil, Histologie und Immunphänotyp dienen der integrierten Plausibilisierung.'];
        if(d.instructor_notes){d.instructor_notes.model_answer='B1 (~15 % Tumor) ist technisch erfolgreich analysiert, erlaubt aber keinen belastbaren Klassenruf und wird nicht diagnostisch overcalled. Die Re-Analyse aus B2 (~65 % Tumor) ergibt einen hochkonfidenten Match zur DNA-Methylierungsklasse HGAP (score 0,96). Damit wird der Tumor als High-grade astrocytoma with piloid features klassifiziert; Morphologie/IHC und der homozygote CDKN2A/B-Verlust im methylierungsbasierten CNV-Profil sind konkordant.';d.instructor_notes.scoring_focus=['Materialrepräsentativität','Classifier-QC/Confidence','HGAP als methylierungsdefinierte Entität','integrierte Plausibilisierung','kein Low-score-Overcalling'];}
        d.report_additions={content_status:'DE master · asset-upgraded',key_turning_point:'B1 (~15 %) nicht klassifizierbar → B2 (~65 %) HGAP score 0,96',core_message:'Technische Array-QC ersetzt keine ausreichende Tumorrepräsentativität; bei HGAP ist der Methylierungsclassifier zentral für die definitive Klassifikation.',pattern:'Morphologische Unsicherheit → Materialwahl → B1 no-call → B2 HGAP → integrierter Abschluss'};
      }
    }catch(_){ }
  }catch(e){console.error('[MTB_CNS_003 asset upgrade] content patch failed',e)}
}

function baselineAddon(s){
  if(s==='intake')return block('Klinischer Auftrag',[asset('Neurochirurgische Einsendung / diagnostische Fragestellung',ASSETS.referral,'doc')],'CASE FILE');
  if(s==='histo')return block('Morphologie und Basis-IHC',[asset('HE · Übersicht',ASSETS.heOverview),asset('HE · Detailmorphologie',ASSETS.heDetail),asset('Basis-IHC · überlappendes gliales/ependymales Profil',ASSETS.ihc,'wide')],'MORPHOLOGY');
  return '';
}
function classifierAddon(){
  if(!selected('cns_methylation_classifier'))return '';
  return block('DNA-Methylierungsprofilierung · Material entscheidet',[asset('B1 (~15 % Tumor) · technisch bestanden, kein belastbarer Klassenruf',ASSETS.methylB1,'wide'),asset('B2 (~65 % Tumor) · HGAP, calibrated score 0,96',ASSETS.methylB2,'wide')],'METHYLATION','cns3-critical');
}
function finalAddon(){
  if(!(finalized()&&selected('cns_methylation_classifier')&&selected('broad_pan_panel')))return '';
  return block('Integrierter neuropathologischer Abschluss',[asset('Finaler integrierter Befund · High-grade astrocytoma with piloid features (HGAP)',ASSETS.final,'wide')],'FINAL','cns3-complete');
}

function wrapRenderer(name,fn){
  const prev=window[name];if(typeof prev!=='function')return;
  const wrapped=function(){let html=prev.apply(this,arguments);if(!active())return html;return fn(html,arguments)};
  try{window[name]=wrapped}catch(_){}
  try{eval(name+'=wrapped')}catch(_){}
}

function styles(){if(document.getElementById('cns3AssetUpgradeStyles'))return;const s=document.createElement('style');s.id='cns3AssetUpgradeStyles';s.textContent=`
.cns3-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.cns3-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.cns3-head h4{margin:0;color:var(--primary,#0f4c75)}
.cns3-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.cns3-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.cns3-grid.single{grid-template-columns:1fr}.cns3-asset.wide{grid-column:1/-1}
.cns3-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.cns3-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.cns3-asset a{display:block;background:#f2f6f9}.cns3-asset img{width:100%;height:auto;display:block;object-fit:contain}.cns3-asset.doc img{max-height:900px;object-fit:contain}.cns3-prov{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.cns3-critical{border-color:#f1c478;background:linear-gradient(180deg,#fff,#fffcf4)}.cns3-complete{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.cns3-grid{grid-template-columns:1fr}.cns3-asset.wide{grid-column:auto}.cns3-asset.doc img{max-height:none}}
`;document.head.appendChild(s)}

function install(){
  if(window.__MolPathMTBCNS003AssetUpgradeInstalled)return;
  window.__MolPathMTBCNS003AssetUpgradeInstalled=true;
  patchCase();styles();
  wrapRenderer('renderContent',(html)=>inject(html,baselineAddon(step())));
  wrapRenderer('renderReport',(html)=>inject(html,classifierAddon()));
  wrapRenderer('renderMtb',(html)=>inject(html,finalAddon()));
  try{if(typeof renderCasePicker==='function')renderCasePicker();if(typeof renderKpi==='function')renderKpi();if(active()&&typeof render==='function')render()}catch(e){console.warn('[MTB_CNS_003 asset upgrade] rerender warning',e)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathMTBCNS003AssetUpgrade=Object.freeze({patch:PATCH_ID,base:'v2.6.0-rc1',caseId:CASE_ID,assetCount:7,logicChanges:false,taxonomyChanges:false,assets:ASSETS});
})();
