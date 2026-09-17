/* MolPath Simulator v2.6.0-rc1 — MTB_HEM_001 Asset / Content Upgrade
   Requires the current rc1 state with MTB_CNS_003_ASSET01 already applied.
   Scope: MTB_HEM_001_v1_3 only.
   Adds seven curated synthetic training assets and aligns the case-local narrative/deep-dive.
   No course membership, global score weights, global filters, language registry or Signature taxonomy are changed.
*/
(function(){
'use strict';
const CASE_ID='MTB_HEM_001_v1_3';
const PATCH_ID='v2.6.0-rc1+MTB_HEM_001_ASSET01';
const ASSETS=Object.freeze({
  referral:'assets/mtb_hem_001/referral_hematology_001.png',
  blood:'assets/mtb_hem_001/peripheral_blood_smear_001.png',
  aspirate:'assets/mtb_hem_001/bone_marrow_aspirate_001.png',
  trephine:'assets/mtb_hem_001/bone_marrow_trephine_001.png',
  flowCyto:'assets/mtb_hem_001/flow_cytogenetics_001.png',
  ngs:'assets/mtb_hem_001/myeloid_ngs_001.png',
  final:'assets/mtb_hem_001/integrated_hematopath_final_001.png'
});
window.MolPathMTBHEM001Assets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function selected(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function finalized(){try{return !!state?.finalized}catch(_){return false}}
function step(){try{return state?.step||''}catch(_){return ''}}
function E(x){try{return typeof esc==='function'?esc(x==null?'':String(x)):String(x??'')}catch(_){return String(x??'')}}
function asset(title,src,cls=''){return `<figure class="hem1-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${E(title)}"></a><div class="hem1-prov">Synthetisches Trainingsasset · educational only · keine realen Patientendaten</div></figure>`}
function block(title,items,badge='CASE EVIDENCE',cls=''){return `<div class="hem1-block ${cls}"><div class="hem1-head"><h4>${E(title)}</h4><span class="hem1-pill">${E(badge)}</span></div><div class="hem1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID);if(!c)return;
    c.title='Persistierende Zytopenien mit DTA-Klon → CCUS vs. myelodysplastische Neoplasie';
    c.short='Zytopenien + DTA-Klon: CCUS vs. MDS';
    c.difficulty='advanced';c.estimated_time_min='12–16';
    const story=Object.fromEntries((c.story||[]).map(x=>[x.id,x]));
    if(story.intake)story.intake.items=[['Fall-ID','MTB_HEM_001'],['Patient','72 Jahre, männlich'],['Einsender','Hämatologie / Hämatopathologie'],['Klinische Frage','Persistierende Zytopenien: CCUS oder myelodysplastische Neoplasie? Welche Rolle spielt ein DTA-Mutationsmuster?']];
    if(story.history)story.history.items=[['Klinischer Verlauf','Seit etwa 6 Monaten persistierende makrozytäre Anämie, Neutropenie und Thrombozytopenie mit langsamer Progredienz.'],['Aktuelles Blutbild','Hb 9,5 g/dL; MCV 106 fL; Leukozyten 3,0 ×10^9/L; Neutrophile 1,3 ×10^9/L; Thrombozyten 105 ×10^9/L.'],['Sekundäre Ursachen','Vitamin B12, Folat, Eisenstatus, TSH sowie Nieren-/Leberparameter unauffällig; keine relevante Myelotoxin-Exposition.'],['Entscheidungsdruck','Klonale Hämatopoese soll von einer manifesten myeloischen Neoplasie abgegrenzt werden.']];
    if(story.histo)story.histo.items=[['Peripheres Blut','Makrozytose und diskrete Dysgranulopoese; keine zirkulierende Blastenzunahme.'],['Knochenmarkaspirat','Signifikante Dysplasie mehrerer Zellreihen; Dyserythropoese und Dysgranulopoese, einzelne dysplastische Megakaryozyten; Blasten ca. 2–3 %.'],['Trepanobiopsie','Für das Alter deutlich hyperzelluläres Knochenmark mit dysplastischer Megakaryopoese; CD34-positive Blasten niedrig, keine Blastennesterung.'],['Arbeitsdiagnose','Morphologisch myelodysplastische Neoplasie bei niedriger Blastenzahl; molekulare Befunde dienen der Klonalitäts- und Integrationsbewertung.']];
    if(story.material)story.material.items=[['Material','EDTA-Blut, Knochenmarkaspirat und Knochenmarktrepanobiopsie.'],['Durchflusszytometrie','Myeloische Blasten ca. 2,8 %; leichte Reifungsasynchronie der Granulopoese, kein AML-typisches Muster.'],['Zytogenetik','46,XY[20]; keine klonale numerische oder strukturelle Aberration in der konventionellen Karyotypisierung.'],['Molekularpathologie','Gezieltes myeloisches DNA-NGS; Varianten müssen im Kontext von Zytopenien und Morphologie interpretiert werden.']];
    c.result_sections=[
      {label:'Myeloisches NGS / klonale Hämatopoese',test_any:['epigenetic_heme_panel'],result:'DNMT3A NM_022552.5:c.2645G>A, p.Arg882His (VAF 31,2 %); TET2 NM_001127208.3:c.3646C>T, p.Arg1216Ter (VAF 27,8 %); ASXL1 NM_015338.5:c.1934dup, p.Gly646Trpfs*12 (VAF 18,6 %). Das DTA-Muster belegt klonale Hämatopoese, ist aber für sich allein nicht spezifisch für MDS.'},
      {label:'Integrierte Hämatopathologie',test_any:['broad_pan_panel'],result:'Persistierende Zytopenien, signifikante Dysplasie mehrerer Zellreihen und niedrige Blastenzahl sind mit einer myelodysplastischen Neoplasie mit niedriger Blastenzahl vereinbar; konventionelle Zytogenetik 46,XY[20].'}
    ];
    c.always_findings=[['Morphologie','Signifikante Dysplasie mehrerer Zellreihen bei niedriger Blastenzahl (ca. 2–3 %).'],['Klinischer Kontext','Persistierende, anderweitig nicht erklärte Anämie, Neutropenie und Thrombozytopenie.'],['Zytogenetik / Flow','46,XY[20]; keine relevante Blastenzunahme, leichte myeloische Reifungsasynchronie.']];
    c.complete_interpretation='Integrierte Diagnose: myelodysplastische Neoplasie mit niedriger Blastenzahl (WHO-HAEM5: MDS-LB; ICC: MDS, NOS with multilineage dysplasia). Diagnosebegründend sind die persistierenden Zytopenien und die signifikante Dysplasie mehrerer Zellreihen bei niedriger Blastenzahl. DNMT3A-, TET2- und ASXL1-Varianten belegen klonale Hämatopoese und unterstützen die Integration, sind jedoch für sich allein nicht MDS-spezifisch.';
    c.partial_interpretation='Teilbefund: Der Nachweis von DNMT3A/TET2/ASXL1 beweist klonale Hämatopoese, unterscheidet allein aber nicht zwischen CHIP, CCUS und MDS. Für die Diagnose sind Zytopenien, Knochenmarkmorphologie, Blastenzahl und weitere klassifikationsrelevante Befunde erforderlich.';
    c.mtb_checks=[['morphology','Persistierende Zytopenien und signifikante multilineäre Dysplasie als diagnosebegründende Befunde benennen'],['clone','DTA-Mutationen als Klonalitätsnachweis, nicht als alleinigen MDS-Beweis einordnen'],['classification','WHO-HAEM5 MDS-LB und ICC MDS, NOS with multilineage dysplasia korrekt zuordnen'],['limits','Methodengrenzen des zielgerichteten DNA-Panels transparent kommunizieren'],['bad','Falschaussage: DNMT3A/TET2/ASXL1 allein diagnostizieren MDS']];
    c.optimal_summary='Optimale Lösung: Persistierende Zytopenien + diagnostisch relevante Dysplasie mehrerer Zellreihen + niedrige Blastenzahl integrieren; DTA-Klon als Klonalitätsnachweis einordnen, ohne die Molekulargenetik als alleinigen Diagnosebeweis zu überinterpretieren.';
    c.tags=Array.from(new Set([].concat(c.tags||[],['MDS-LB','CCUS','DNMT3A','TET2','ASXL1','Klonale Hämatopoese']).filter(Boolean)));

    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.title='Der Klon ist echt – aber die Morphologie entscheidet';
        d.estimated_minutes_deep='12–16';
        d.opening_scene='Ein 72-jähriger Patient hat seit Monaten eine progrediente makrozytäre Anämie, Neutropenie und Thrombozytopenie. Die zentrale Frage ist nicht nur, ob ein myeloischer Klon existiert, sondern ob die Kriterien einer myelodysplastischen Neoplasie erfüllt sind.';
        d.case_briefing='Persistierende, anderweitig ungeklärte Zytopenien; peripheres Blut mit diskreter Dysgranulopoese. Knochenmarkaspirat und Trepanobiopsie zeigen signifikante Dysplasie mehrerer Zellreihen bei niedriger Blastenzahl (ca. 2–3 %). Flow unterstützt eine leichte myeloische Reifungsstörung, die konventionelle Zytogenetik ist 46,XY[20]. Das myeloische DNA-Panel zeigt DNMT3A, TET2 und ASXL1.';
        d.context_cards=[
          {title:'Zytopenien sind persistierend',content:'Hb 9,5 g/dL, Neutrophile 1,3 ×10^9/L, Thrombozyten 105 ×10^9/L; sekundäre Ursachen abgeklärt.',teaching_point:'CHIP passt bei anderweitig ungeklärten Zytopenien nicht.'},
          {title:'Morphologie überschreitet die CCUS-Grenze',content:'Signifikante Dysplasie mehrerer Zellreihen; Blasten ca. 2–3 %.',teaching_point:'Die MDS-Diagnose wird hier nicht durch DTA-Mutationen, sondern durch die integrierten diagnostischen Kriterien getragen.'},
          {title:'Klonalität ist real, aber nicht spezifisch',content:'DNMT3A p.Arg882His 31,2 %, TET2 p.Arg1216Ter 27,8 %, ASXL1 p.Gly646Trpfs*12 18,6 %.',teaching_point:'DTA-Varianten kommen in CHIP, CCUS und MDS vor.'}
        ];
        d.pre_results=[
          {title:'Blutbild',content:'Persistierende makrozytäre Anämie, Neutropenie und Thrombozytopenie.'},
          {title:'Knochenmark',content:'Signifikante multilineäre Dysplasie; Blasten ca. 2–3 %.'},
          {title:'Flow / Zytogenetik',content:'Blasten ca. 2,8 %, leichte Reifungsasynchronie; 46,XY[20].'}
        ];
        d.learning_objectives=['DTA-Mutationen als Klonalitätsmarker und nicht als automatische MDS-Diagnose einordnen.','CHIP, CCUS und MDS anhand von Zytopenien und diagnostischer Morphologie trennen.','Signifikante Dysplasie mehrerer Zellreihen und niedrige Blastenzahl korrekt in WHO-HAEM5/ICC einordnen.','Methodengrenzen eines zielgerichteten DNA-Panels berücksichtigen.','Molekulare Befunde in einen hämatopathologischen Gesamtbefund integrieren.'];
        d.reasoning_gate_upgrade=[
          {id:'mutation_meaning',type:'single_choice',prompt:'Was beweisen DNMT3A/TET2/ASXL1 in diesem Fall?',options:[{id:'clone',label:'Klonale Hämatopoese; die Mutationen allein diagnostizieren kein MDS.'},{id:'mds',label:'Allein dadurch ist ein MDS bewiesen.'},{id:'aml',label:'Allein dadurch ist AML bewiesen.'},{id:'germline',label:'Es handelt sich automatisch um Keimbahnvarianten.'}],correct:['clone'],rationale:'DTA-Mutationen überlappen stark zwischen CHIP, CCUS und myeloischen Neoplasien.'},
          {id:'ccus_mds',type:'single_choice',prompt:'Welcher Befund verschiebt diesen Fall von CCUS zu einer myelodysplastischen Neoplasie?',options:[{id:'dysplasia',label:'Signifikante Dysplasie mehrerer Zellreihen bei persistierenden Zytopenien.'},{id:'vaf',label:'Eine VAF über 20 %.'},{id:'threegenes',label:'Drei mutierte Gene.'},{id:'age',label:'Das Alter über 70 Jahre.'}],correct:['dysplasia'],rationale:'Die diagnostisch relevante Morphologie bei persistierenden Zytopenien begründet hier die myeloische Neoplasie; die DTA-Mutationen stützen die Klonalität.'},
          {id:'classification',type:'single_choice',prompt:'Wie wird die niedrige Blastenkonstellation klassifiziert?',options:[{id:'mdslb',label:'WHO-HAEM5: MDS-LB; ICC: MDS, NOS with multilineage dysplasia.'},{id:'aml',label:'AML.'},{id:'chip',label:'CHIP.'},{id:'ccus',label:'CCUS trotz signifikanter Dysplasie.'}],correct:['mdslb'],rationale:'Bei niedriger Blastenzahl und signifikanter Dysplasie mehrerer Zellreihen passt die WHO-/ICC-Einordnung dieses Falls.'}
        ];
        d.decision_task='Ordnen Sie die DTA-Mutationen im Kontext von persistierenden Zytopenien und diagnostischer Knochenmarkdysplasie ein und formulieren Sie die integrierte hämatopathologische Diagnose.';
        d.expected_path=['Persistierende ungeklärte Zytopenien als klinische Voraussetzung anerkennen.','Signifikante Dysplasie mehrerer Zellreihen als diagnosebegründenden Befund priorisieren.','Niedrige Blastenzahl (ca. 2–3 %) korrekt einordnen.','DTA-Varianten als Nachweis klonaler Hämatopoese, nicht als alleinigen MDS-Beweis werten.','WHO-HAEM5 MDS-LB und ICC MDS, NOS with multilineage dysplasia korrekt benennen.','Grenzen des zielgerichteten DNA-Panels kommunizieren.'];
        d.twist={title:'Drei pathogene Varianten – und trotzdem entscheidet nicht das NGS',content:'DNMT3A, TET2 und ASXL1 belegen einen myeloischen Klon. Die definitive MDS-Einordnung entsteht aber erst aus persistierenden Zytopenien und signifikanter Dysplasie mehrerer Zellreihen.',why_critical:'Der Fall trainiert die Trennung von Klonalität und Entitätsdiagnose und verhindert molekulares Overcalling.'};
        d.result_packages=[
          {id:'optimal',title:'Klonalität korrekt integriert',result:'Persistierende Zytopenien + signifikante multilineäre Dysplasie + niedrige Blastenzahl → MDS-LB; DTA-Klon unterstützt die Klonalität.',feedback:'Morphologie, Klinik und Molekulargenetik korrekt hierarchisiert.'},
          {id:'partial',title:'MDS erkannt, Begründung unsauber',result:'Richtige Entität, aber DTA-Mutationen werden als primär diagnosebegründend dargestellt.',feedback:'Die diagnostische Hierarchie bleibt unsauber.'},
          {id:'wrong',title:'NGS diagnostiziert MDS',result:'DNMT3A/TET2/ASXL1 werden ohne diagnostische Morphologie als ausreichender MDS-Beweis verwendet.',feedback:'Molekulares Overcalling.'}
        ];
        d.followup_logic=[{trigger:'Diagnose MDS-LB',action:'Risikostratifizierung und klinisch-hämatologische Therapieplanung interdisziplinär anschließen.',consequence:'Molekulare und klinische Risikofaktoren können anschließend strukturiert bewertet werden.'},{trigger:'Molekularbefund ohne diagnostische Dysplasie',action:'CCUS/CHIP-Differenzialdiagnose statt automatischer MDS-Diagnose prüfen.',consequence:'Überdiagnose wird vermieden.'}];
        d.debrief_points=['DTA-Mutationen sind häufige Marker klonaler Hämatopoese, aber nicht MDS-spezifisch.','Persistierende Zytopenien unterscheiden CHIP von CCUS/MDS-Konstellationen.','In diesem Fall überschreitet die signifikante Dysplasie mehrerer Zellreihen die CCUS-Grenze.','Niedrige Blastenzahl schließt eine myelodysplastische Neoplasie nicht aus.','Die Diagnose entsteht aus integrierter Hämatopathologie, nicht aus dem NGS-Panel allein.'];
        if(d.instructor_notes){d.instructor_notes.model_answer='Die DTA-Mutationen belegen einen myeloischen Klon, sind aber nicht MDS-spezifisch. Diagnosebegründend sind die persistierenden ungeklärten Zytopenien und die signifikante Dysplasie mehrerer Zellreihen bei niedriger Blastenzahl. Integrierte Einordnung: WHO-HAEM5 MDS-LB; ICC MDS, NOS with multilineage dysplasia.';d.instructor_notes.scoring_focus=['Klonalität ≠ Diagnose','persistierende Zytopenien','multilineäre Dysplasie','niedrige Blastenzahl','WHO/ICC-Integration'];}
        d.report_additions={content_status:'DE master · asset-upgraded',key_turning_point:'Signifikante Dysplasie macht aus der klonalen Zytopenie eine myelodysplastische Neoplasie',core_message:'DTA-Mutationen zeigen Klonalität; die MDS-Diagnose wird im integrierten klinisch-morphologischen Kontext gestellt.',pattern:'Zytopenien → Blut/KM-Morphologie → Flow/Zytogenetik → DTA-Klon → integrierte MDS-LB-Diagnose'};
      }
    }catch(_){}
  }catch(e){console.error('[MTB_HEM_001 asset upgrade] content patch failed',e)}
}

function baselineAddon(s){
  if(s==='intake')return block('Hämatologischer Auftrag',[asset('Einsendeschein · persistierende Zytopenien / CCUS vs. MDS',ASSETS.referral,'doc')],'CASE FILE');
  if(s==='histo')return block('Morphologische Diagnostik',[asset('Peripherer Blutausstrich · subtile Dysplasie',ASSETS.blood),asset('Knochenmarkaspirat · signifikante Dysplasie mehrerer Zellreihen',ASSETS.aspirate),asset('Knochenmarktrepanobiopsie · Architektur und Megakaryopoese',ASSETS.trephine,'wide')],'MORPHOLOGY');
  return '';
}
function molecularAddon(){
  if(!selected('epigenetic_heme_panel'))return '';
  return block('Integrierende Zusatzdiagnostik',[asset('Durchflusszytometrie + konventionelle Zytogenetik',ASSETS.flowCyto),asset('Myeloisches NGS · DTA-Klon, Klonalität ≠ Diagnose',ASSETS.ngs)],'HEMATOLOGY','hem1-critical');
}
function finalAddon(){
  if(!(finalized()&&selected('epigenetic_heme_panel')))return '';
  return block('Integrierter hämatopathologischer Abschluss',[asset('Finaler integrierter Befund · MDS mit niedriger Blastenzahl',ASSETS.final,'wide')],'FINAL','hem1-complete');
}
function wrapRenderer(name,fn){
  const prev=window[name];if(typeof prev!=='function')return;
  const wrapped=function(){let html=prev.apply(this,arguments);if(!active())return html;return fn(html,arguments)};
  try{window[name]=wrapped}catch(_){}
  try{eval(name+'=wrapped')}catch(_){}
}
function styles(){if(document.getElementById('hem1AssetUpgradeStyles'))return;const s=document.createElement('style');s.id='hem1AssetUpgradeStyles';s.textContent=`
.hem1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.hem1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.hem1-head h4{margin:0;color:var(--primary,#0f4c75)}
.hem1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.hem1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.hem1-grid.single{grid-template-columns:1fr}.hem1-asset.wide{grid-column:1/-1}
.hem1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.hem1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.hem1-asset a{display:block;background:#f2f6f9}.hem1-asset img{width:100%;height:auto;display:block;object-fit:contain}.hem1-asset.doc img{max-height:900px;object-fit:contain}.hem1-prov{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.hem1-critical{border-color:#f1c478;background:linear-gradient(180deg,#fff,#fffcf4)}.hem1-complete{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.hem1-grid{grid-template-columns:1fr}.hem1-asset.wide{grid-column:auto}.hem1-asset.doc img{max-height:none}}
`;document.head.appendChild(s)}
function install(){
  if(window.__MolPathMTBHEM001AssetUpgradeInstalled)return;
  window.__MolPathMTBHEM001AssetUpgradeInstalled=true;
  patchCase();styles();
  wrapRenderer('renderContent',(html)=>inject(html,baselineAddon(step())));
  wrapRenderer('renderReport',(html)=>inject(html,molecularAddon()));
  wrapRenderer('renderMtb',(html)=>inject(html,finalAddon()));
  try{if(typeof renderCasePicker==='function')renderCasePicker();if(typeof renderKpi==='function')renderKpi();if(active()&&typeof render==='function')render()}catch(e){console.warn('[MTB_HEM_001 asset upgrade] rerender warning',e)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathMTBHEM001AssetUpgrade=Object.freeze({patch:PATCH_ID,base:'v2.6.0-rc1+MTB_CNS_003_ASSET01',caseId:CASE_ID,assetCount:7,logicChanges:'case-local narrative/deep-dive alignment only',taxonomyChanges:false,assets:ASSETS});
})();
