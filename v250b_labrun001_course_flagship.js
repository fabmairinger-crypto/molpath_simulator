/* MolPath Simulator v2.5.0b — LAB_RUN_001 Course Flagship Layer (delta)
   Scope: LAB_RUN_001_v1_3 only.
   Adds the curated weak-positive-control teaching path and seven approved training assets.
   IMPORTANT: Course Flagship quality level only — this patch does NOT promote the case to Signature Case.
   Scoring IDs, correctness semantics and LAB workflow navigation remain compatible with the existing v2.4.0v deep-dive layer.
*/
(function(){
'use strict';
const CASE_ID='LAB_RUN_001_v1_3';
const ASSETS=Object.freeze({
  overview:'assets/lab_run_001/run_qc_overview_001.png',
  positiveDetail:'assets/lab_run_001/positive_control_detail_001.png',
  patientQc:'assets/lab_run_001/patient_qc_coverage_matrix_001.png',
  trend:'assets/lab_run_001/positive_control_trend_001.png',
  traceability:'assets/lab_run_001/control_traceability_001.png',
  repeat:'assets/lab_run_001/control_repeat_confirmation_001.png',
  closure:'assets/lab_run_001/deviation_capa_final_disposition_001.png'
});
window.MolPathLABRUN001CourseFlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function complete(){try{return !!(state?.finalized||state?.lab?.finalized||caseIsComplete())}catch(_){return false}}
function hasRoot(id){try{return !!state?.lab?.rootCause?.has(id)}catch(_){return false}}
function hasCapa(id){try{return !!state?.lab?.capa?.has(id)}catch(_){return false}}
function E(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function asset(title,src,cls=''){
  return `<figure class="lr1-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${E(title)}"></a><div class="lr1-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`;
}
function block(title,items,cls=''){
  return `<div class="lr1-block ${cls}"><div class="lr1-head"><h4>${E(title)}</h4><span class="lr1-pill">COURSE FLAGSHIP</span></div><div class="lr1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`;
}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    /* Course Flagship != Signature Case. Do not touch c.signature_case. */
    c.course_flagship=true;
    c.deep_dive=true;
    c.title='Positivkontrolle systematisch zu schwach → Run sperren, Ursache belegen und Patientenbefunde sicher reanalysieren';
    c.short='LAB RUN: schwache Positivkontrolle';
    c.difficulty='advanced';
    c.estimated_time_min='12–15';
    c.tags=Array.from(new Set([].concat(c.tags||[],[
      'Course Flagship','Methods Focus','Labor','QM','NGS','Positivkontrolle','Run-QC','Traceability','CAPA','Patientensicherheit'
    ]).filter(Boolean).filter(x=>x!=='Signature Case')));
    c.qc_title='Schwache Positivkontrolle bei formal guten Patientenlibraries';
    c.run_overview={
      'Fall-ID':'LAB_RUN_001',
      'Modus':'Labor/QM-Cockpit',
      'Assay':'OncoComprehensive Assay v3 · amplicon-basiertes DNA-NGS · Illumina NextSeq 550',
      'Patienten-QC':'Formal unauffällig; Coverage, Q30, Uniformity und NTC innerhalb Spezifikation.',
      'Positivkontrolle':'Alle fünf erwarteten Hotspot-Varianten detektiert, aber systematisch deutlich unter dem validierten VAF-Akzeptanzbereich.',
      'Kernentscheidung':'Run nicht vorschnell freigeben: Kontrollversagen technisch einordnen, Ursache rückverfolgen und Gültigkeit der Patientenbefunde belegen.'
    };
    c.qc_event={
      'Ereignis':'Die fünf erwarteten Kontrollvarianten liegen statt ca. 10 % VAF nur bei etwa 0,2–0,6 %; die Positivkontrolle besteht die Akzeptanzkriterien nicht.',
      'Patientenproben':'Globale Patienten-QC wirkt sehr gut; NTC unauffällig.',
      'Risiko':'Gute Coverage ersetzt keinen gültigen Nachweis der analytischen Detektionsleistung. Insbesondere negative bzw. niedrig-allelige Befunde dürfen nicht durch eine formal gute Library-QC abgesichert werden.',
      'Muster':'Alle Kontrolltargets sind in ähnlicher Richtung betroffen; historisch war die Kontrolle stabil.',
      'Kernfrage':'Liegt ein kontrollspezifischer Ansatzfehler oder ein run-/assayweites Sensitivitätsproblem vor – und was darf bis zur Klärung freigegeben werden?'
    };

    const byId=Object.fromEntries((c.decision_options||[]).map(x=>[x.id,x]));
    if(byId.hold_investigate){
      byId.hold_investigate.label='Run zunächst sperren. Kontrolltrend, Rohdaten und Traceability prüfen; die Positivkontrolle mit korrekt rückverfolgtem Ausgangsmaterial gezielt wiederholen und erst danach über Patientenbefunde entscheiden.';
      byId.hold_investigate.feedback='Optimal: Das Kontrollversagen wird als fehlender Gültigkeitsnachweis behandelt. Ursache und betroffene Leistungsdimension werden vor einer Freigabe technisch belegt.';
    }
    if(byId.release_strong_positive_only){
      byId.release_strong_positive_only.label='Robuste positive Patientenbefunde nach dokumentierter Einzelfall-Risikobewertung vorläufig freigeben; negative und low-VAF-kritische Fälle bleiben gesperrt.';
      byId.release_strong_positive_only.feedback='Nur als SOP-definierte Ausnahme denkbar. In diesem Fall spricht der systematische Kontrollabfall zunächst für einen konsequenten Run-Hold bis zur Ursachenklärung.';
    }
    if(byId.release_all_patient_qc){
      byId.release_all_patient_qc.label='Alle Patientenbefunde freigeben, weil Coverage, Q30 und Uniformity der Patientenproben gut aussehen.';
      byId.release_all_patient_qc.feedback='Falsch: Sample-QC ist kein Ersatz für die nicht bestandene Positivkontrolle und belegt die erwartete analytische Sensitivität nicht.';
    }
    if(byId.repeat_all_immediately){
      byId.repeat_all_immediately.label='Ohne Traceability-Prüfung sofort den kompletten Patientenrun ab Extraktion wiederholen.';
      byId.repeat_all_immediately.feedback='Patientensicherer als Durchwinken, aber unnötig breit. Zuerst muss die plausible Fehlerstelle eingegrenzt werden; anschließend wird gezielt und SOP-basiert reanalysiert.';
    }

    const root=Object.fromEntries((c.root_cause_options||[]).map(x=>[x.id,x]));
    if(root.control_trend)root.control_trend.feedback='Richtig: Die letzten Runs waren stabil; der abrupte gemeinsame VAF-Abfall spricht gegen eine langsame Drift.';
    if(root.control_aliquot){root.control_aliquot.label='Aliquot-ID, Herstell-/Arbeitsblatt, Verdünnungsstatus, Lagerung, Freeze-thaw und Pipettierschein der Positivkontrolle prüfen.';root.control_aliquot.feedback='Richtig: Traceability kann zeigen, ob Stock-Standard und bereits vorverdünntes Arbeitsaliquot verwechselt wurden.'}
    if(root.lot_instrument)root.lot_instrument.feedback='Richtig: Stabile Instrument-/Run-QC und unauffällige NTC/Parallelparameter helfen, ein globales Sequenzierungsproblem abzugrenzen.';
    if(root.raw_metrics)root.raw_metrics.feedback='Richtig: Alle fünf Varianten sind vorhanden, aber systematisch zu niedrig – ein wichtiges Muster für die Ursachenhypothese.';
    if(root.patient_negatives)root.patient_negatives.feedback='Richtig: Bis die analytische Gültigkeit wieder belegt ist, bleiben negative/low-VAF-kritische Aussagen besonders schutzbedürftig.';

    c.optimal_summary='Optimale Lösung: Run sperren und die Positivkontrolle als nicht bestandenen Gültigkeitsnachweis behandeln. Der historische Trend ist stabil, die Patienten-QC unauffällig und alle fünf Kontrollvarianten sind systematisch zu niedrig. Traceability zeigt, dass im fehlerhaften Ansatz ein bereits 1:10 in WT-DNA vorverdünntes Arbeitsaliquot nochmals nach SOP verdünnt wurde. Die korrekt aus STOCK neu angesetzte Kontrolle liegt wieder bei etwa 10 % VAF und bestätigt die Ursache. Der ursprüngliche Patientenrun bleibt ungültig/nicht freigegeben; Patientenbefunde werden vor endgültiger Freigabe SOP-gerecht reanalysiert. Abweichung, Korrektur, Prävention und Wirksamkeitscheck werden als CAPA dokumentiert.';

    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=false;
        d.deep_dive_priority='course_flagship';
        d.title='Schwache Positivkontrolle: Gute Patienten-QC ersetzt keinen gültigen Sensitivitätsnachweis';
        d.opening_scene='Ein Targeted-DNA-NGS-Run wirkt auf den ersten Blick hervorragend: Patientenlibraries, Coverage, Q30 und NTC sind unauffällig. Die Positivkontrolle fällt jedoch bei allen fünf erwarteten Varianten gemeinsam auf etwa 0,2–0,6 % VAF ab, obwohl rund 10 % erwartet werden.';
        d.case_briefing='Der Run soll zeitnah freigegeben werden. Die zentrale Frage lautet nicht nur „pass/fail“, sondern warum die Kontrolle systematisch zu schwach ist und ob die formal guten Patientenmetriken eine Freigabe rechtfertigen. Der Kontrolltrend war zuvor stabil.';
        d.learning_objectives=[
          'Run-Level-Kontrollen als Nachweis analytischer Leistungsfähigkeit und nicht als formalen Haken verstehen.',
          'Gute Sample-QC von einem gültigen Sensitivitätsnachweis des Assays unterscheiden.',
          'Kontrolltrend und Traceability zur Trennung von kontrollspezifischem Ansatzfehler und runweitem Problem nutzen.',
          'Technische Hypothesen durch eine gezielte Kontrollwiederholung bestätigen.',
          'Correction, CAPA und finale Patientenfreigabe als getrennte Schritte dokumentieren.'
        ];
        d.context_cards=[
          {title:'Patienten-QC sieht gut aus',content:'Coverage, Q30 und Uniformity liegen innerhalb Spezifikation; NTC negativ.',teaching_point:'Das macht das Kontrollversagen nicht irrelevant.'},
          {title:'Positivkontrolle systematisch zu niedrig',content:'Alle fünf erwarteten Varianten sind detektiert, liegen aber deutlich unter dem validierten VAF-Bereich.',teaching_point:'Das Muster spricht für einen gemeinsamen technischen Einfluss.'},
          {title:'Historie stabil',content:'Vorherige Kontrollruns lagen konsistent um etwa 10 % VAF; der aktuelle Run ist ein abrupter Ausreißer.',teaching_point:'Trenddaten helfen bei der Root-Cause-Hypothese.'}
        ];
        d.pre_results=[
          {title:'Kontrolltrend',content:'Historische Median-VAF ca. 9,5–10,1 %; aktuell ca. 0,3 %.'},
          {title:'Traceability-Spur',content:'Im aktuellen Run wurde Aliquot A1-WD10 verwendet; vorherige erfolgreiche Runs nutzten A1-STOCK.'},
          {title:'Ansatzdokumentation',content:'A1-WD10 ist bereits als 1:10-Arbeitsstandard in WT-Referenz-DNA hergestellt; die SOP fordert für den Run den unverdünnten Stock-Standard.'}
        ];
        d.reasoning_gate_upgrade=[
          {id:'meaning',type:'single_choice',prompt:'Was bedeutet die nicht bestandene Positivkontrolle trotz sehr guter Patienten-QC?',options:[
            {id:'validity_missing',label:'Die erwartete analytische Leistungsfähigkeit ist für diesen Run nicht ausreichend belegt.'},
            {id:'coverage_overrides',label:'Die gute Coverage der Patienten ersetzt den Kontrollnachweis.'},
            {id:'all_results_false',label:'Jedes einzelne Patientenresultat ist automatisch falsch.'},
            {id:'documentation_only',label:'Es handelt sich nur um ein Dokumentationsproblem.'}
          ],correct:['validity_missing'],rationale:'Sample-QC und Run-Level-Leistungsnachweis beantworten unterschiedliche Fragen.'},
          {id:'pattern',type:'single_choice',prompt:'Welcher Befund lenkt die Ursachenanalyse am stärksten auf ein kontrollspezifisches Ansatz-/Materialproblem?',options:[
            {id:'global_control_shift',label:'Alle fünf Kontrollvarianten fallen gemeinsam ab, während Run-QC, NTC und historische Runs unauffällig sind.'},
            {id:'one_target',label:'Nur ein einzelnes Target fällt aus.'},
            {id:'all_samples_bad',label:'Alle Patientenlibraries zeigen schlechte Q30-Werte.'},
            {id:'ntc_positive',label:'Die NTC ist deutlich positiv.'}
          ],correct:['global_control_shift'],rationale:'Ein gemeinsamer VAF-Shift der Kontrolle bei sonst stabilen Run-Metriken macht Traceability des Kontrollansatzes besonders relevant.'},
          {id:'traceability',type:'single_choice',prompt:'Die Historie zeigt A1-STOCK bei früheren erfolgreichen Runs, aktuell aber A1-WD10. Das Arbeitsblatt weist A1-WD10 als bereits 1:10 in WT-DNA vorverdünnt aus. Was ist die beste Hypothese?',options:[
            {id:'double_dilution',label:'Ein vorverdünntes Arbeitsaliquot wurde nochmals nach der Stock-SOP verdünnt; dadurch fällt die Kontroll-VAF ungefähr um eine Größenordnung.'},
            {id:'buffer_dilution',label:'Verdünnung mit Puffer allein senkt selektiv nur die Varianten-VAF.'},
            {id:'sequencer_drift',label:'Ein langsamer Sequencer-Drift ist bewiesen.'},
            {id:'contamination',label:'Die negative Kontrolle beweist eine Kontamination.'}
          ],correct:['double_dilution'],rationale:'Nur die zusätzliche Verdünnung des mutierten Standards in WT-Hintergrund erklärt den starken VAF-Abfall bei weiterhin gutem Gesamt-DNA-/Run-QC.'},
          {id:'confirmation',type:'single_choice',prompt:'Wie wird diese Ursachenhypothese belastbar bestätigt?',options:[
            {id:'repeat_stock',label:'Kontrolle aus eindeutigem STOCK-Ausgangsmaterial SOP-konform neu ansetzen und dieselben fünf VAFs erneut messen.'},
            {id:'release_now',label:'Patientenrun direkt freigeben, weil die Ursache plausibel klingt.'},
            {id:'delete_control',label:'Fehlgeschlagene Kontrolle aus dem Run entfernen.'},
            {id:'repeat_report',label:'Nur den Bericht neu generieren.'}
          ],correct:['repeat_stock'],rationale:'Die technische Wiederholung muss die vermutete Fehlerstelle gezielt verändern und die erwartete Performance wiederherstellen.'}
        ];
        d.expected_path=[
          'Run und Patientenfreigabe zunächst sperren.',
          'Kontrollmuster und historische Trends bewerten.',
          'Traceability von Stock, Arbeitsaliquot, Pipettierschein und Second-Person-Check rekonstruieren.',
          'Doppelte Verdünnung als Hypothese formulieren.',
          'Kontrolle aus korrekt gekennzeichnetem STOCK neu ansetzen und technische Performance bestätigen.',
          'Ursprünglichen Run nicht rückwirkend validieren; Patientenbefunde SOP-gerecht reanalysieren.',
          'Deviation/CAPA mit Prävention und Wirksamkeitsprüfung abschließen.'
        ];
        d.acceptable_alternatives=[
          'Lokale SOPs können in anderen Konstellationen eine dokumentierte Teilfreigabe robuster positiver Befunde vorsehen; im dargestellten Flagship-Pfad bleibt der ursprüngliche Run aufgrund des systematischen Kontrollversagens gesperrt.',
          'Bei erneut schwacher korrekt angesetzter Kontrolle müsste der Scope auf Reagenzien, Assay und Instrument erweitert werden.'
        ];
        d.twist={title:'Der Unterschied steckt in der Aliquot-ID',content:'Frühere erfolgreiche Runs verwendeten A1-STOCK. Im fehlerhaften Run wurde A1-WD10 eingesetzt – ein bereits 1:10 in WT-Referenz-DNA vorverdünntes Arbeitsaliquot – und anschließend nochmals nach der Stock-SOP verdünnt.',why_critical:'Die Gesamt-DNA und globale Run-QC können dabei gut bleiben, während die mutierten Allele relativ zum WT-Hintergrund nochmals etwa zehnfach verdünnt werden.'};
        d.result_packages=[
          {id:'optimal',title:'Hold → Traceability → gezielte Bestätigung → sichere Reanalyse',result:'Korrekt aus STOCK neu angesetzte Positivkontrolle liegt wieder um 10 % VAF. Die doppelte Verdünnung wird als Ursache bestätigt. Der ursprüngliche Run bleibt ungültig; Patientenbefunde werden reanalysiert. CAPA adressiert Kennzeichnung und Second-Person-Check.',feedback:'Vollständige Trennung von technischer Correction, Patientenfreigabe und Systemprävention.'},
          {id:'release_all',title:'Alles freigegeben',result:'Gute Patienten-QC wird als Ersatz für die nicht bestandene Positivkontrolle interpretiert.',feedback:'Nicht akzeptabel: Der analytische Gültigkeitsnachweis fehlt.'},
          {id:'repeat_all',title:'Blind alles neu gestartet',result:'Der komplette Prozess wird ohne Traceability wiederholt; Ursache und Präventionspotenzial bleiben unklar.',feedback:'Patientensicherer als Durchwinken, aber methodisch und QM-seitig unvollständig.'}
        ];
        d.followup_logic=[
          {trigger:'Kontrolle aus STOCK wieder im Zielbereich',action:'Ursache dokumentieren, ursprünglichen Run invalidieren und Patientenbefunde gemäß SOP reanalysieren',consequence:'Finale Freigabe erst nach erfolgreicher Reanalyse/QC.'},
          {trigger:'Kontrolle aus STOCK erneut schwach',action:'Scope auf Assay, Reagenzien und Instrument erweitern',consequence:'Run bleibt gesperrt bis die Performance wieder belegt ist.'}
        ];
        d.debrief_points=[
          'Gute Coverage ersetzt keine bestandene Positivkontrolle.',
          'Traceability kann eine scheinbare Assay-Schwäche als kontrollspezifischen Ansatzfehler auflösen.',
          'Eine erfolgreiche Kontrollwiederholung validiert den ursprünglichen Patientenrun nicht rückwirkend.',
          'Correction behebt das akute Problem; CAPA verhindert die Wiederholung und braucht einen Wirksamkeitscheck.'
        ];
        d.instructor_notes={
          model_answer:'Run sperren. Trend und Traceability prüfen. Die Differenz A1-STOCK versus A1-WD10 erkennen: Das bereits 1:10 in WT-DNA vorverdünnte Arbeitsaliquot wurde nochmals 1:10 angesetzt. Die Kontrolle wird aus STOCK korrekt wiederholt und liegt wieder bei etwa 10 % VAF. Damit ist der Ansatzfehler bestätigt. Der ursprüngliche Patientenrun bleibt ungültig und Patientenbefunde werden vor Freigabe reanalysiert. CAPA umfasst eindeutige Kennzeichnung, verpflichtenden Second-Person-Check, Schulung und Wirksamkeitsmonitoring.',
          scoring_focus:['Run-Control-Logik','Traceability','Hypothesenbestätigung','Patientenfreigabe','CAPA'],
          discussion_questions:['Warum kann der Gesamt-DNA-Input trotz doppelter Verdünnung der Varianten unauffällig bleiben?','Welche Aliquot-Kennzeichnung verhindert Stock/Working-Standard-Verwechslungen am zuverlässigsten?','Wann genügt ein Kontroll-Repeat und wann muss der komplette Patientenprozess wiederholt werden?']
        };
        d.report_additions=['Course Flagship: sieben phasengekoppelte Originalansichten','Root Cause: vorverdünntes Arbeitsaliquot A1-WD10 statt STOCK','Referenzpfad: HOLD → Trend → Traceability → Kontroll-Repeat → Reanalyse → CAPA'];
      }
    }catch(_){ }
  }catch(e){console.error('[LAB_RUN_001 Course Flagship] case patch failed',e)}
}

function wrap(name,fn,guard){
  const prev=window[name]; if(typeof prev!=='function')return;
  const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;if(guard&&!guard())return html;return fn(html,arguments)};
  try{window[name]=wrapped}catch(_){}
  try{eval(name+'=wrapped')}catch(_){}
}

function overviewAddon(html){return inject(html,block('Run-QC – erstes Warnsignal',[
  asset('NGS Run-QC-Übersicht · Patientenmetriken gut, Positivkontrolle auffällig',ASSETS.overview,'wide')
]));}
function qcAddon(html){return inject(html,block('Kontroll-QC – was ist tatsächlich nicht bestanden?',[
  asset('Positivkontrolle · Soll-/Ist-VAF und Variantendetail',ASSETS.positiveDetail,'wide')
]));}
function decisionAddon(html){return inject(html,block('Die Freigabefalle: gute Patienten-QC',[
  asset('Patienten-QC / Coverage-Matrix · formal unauffällige Libraries',ASSETS.patientQc,'wide')
]));}
function rootAddon(html){
  const items=[asset('QC-Trend · abrupter gemeinsamer VAF-Abfall der Positivkontrolle',ASSETS.trend,'wide')];
  if(hasRoot('control_aliquot')||hasRoot('control_trend'))items.push(asset('Traceability · Stock vs. vorverdünntes Arbeitsaliquot',ASSETS.traceability,'wide'));
  return inject(html,block('Ursachenanalyse – Trend und Traceability',items,'lr1-investigation'));
}
function capaAddon(html){
  if(!(hasRoot('control_aliquot')||hasRoot('technical_repeat')||hasCapa('targeted_repeat')||hasCapa('corrective')))return html;
  return inject(html,block('Technische Bestätigung – Hypothese gezielt testen',[
    asset('Kontroll-Repeat · korrekt aus STOCK angesetzt, VAF wieder im Zielbereich',ASSETS.repeat,'wide')
  ],'lr1-confirm'));
}
function auditAddon(html){
  if(!complete())return html;
  return inject(html,block('Abweichung, CAPA und finale Disposition',[
    asset('Finale Disposition · ursprünglicher Run ungültig, Patienten-Reanalyse vor Freigabe',ASSETS.closure,'wide')
  ],'lr1-closure'));
}

function styles(){
  if(document.getElementById('lr1CourseFlagshipStyles'))return;
  const s=document.createElement('style');s.id='lr1CourseFlagshipStyles';s.textContent=`
.lr1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.lr1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.lr1-head h4{margin:0;color:var(--primary)}
.lr1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.lr1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.lr1-grid.single{grid-template-columns:1fr}.lr1-asset.wide{grid-column:1/-1}
.lr1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.lr1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.lr1-asset a{display:block;background:#f2f6f9}.lr1-asset img{width:100%;height:auto;display:block;object-fit:contain}.lr1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.lr1-investigation{border-color:#f0cf9f;background:linear-gradient(180deg,#fff,#fffaf2)}.lr1-confirm{border-color:#9dc7e8;background:linear-gradient(180deg,#fff,#f5faff)}.lr1-closure{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.lr1-grid{grid-template-columns:1fr}.lr1-asset.wide{grid-column:auto}}
`;document.head.appendChild(s);
}

function install(){
  if(window.__MolPathLABRUN001CourseFlagshipInstalled)return;
  window.__MolPathLABRUN001CourseFlagshipInstalled=true;
  patchCase();styles();
  wrap('renderRunOverview',overviewAddon);
  wrap('renderQcEvent',qcAddon);
  wrap('renderDecision',decisionAddon);
  wrap('renderRootCause',rootAddon);
  wrap('renderCapa',capaAddon);
  wrap('renderAudit',auditAddon);
  try{renderCasePicker();renderKpi();if(active())render()}catch(_){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();

window.MolPathLABRUN001CourseFlagship=Object.freeze({
  base:'v2.5.0b+METHOD_FOCUS+MET_COURSE_5of5',
  caseId:CASE_ID,
  assetCount:7,
  phaseGating:{run_overview:[1],qc_event:[2],decision:[3],root_cause:[4,5],capa:[6],post_completion:[7]},
  rootCause:'A1-WD10 pre-diluted 1:10 in WT-DNA used instead of STOCK, then diluted again according to stock SOP',
  signaturePromotion:false,
  courseFlagship:true,
  logicChanges:false
});
})();
