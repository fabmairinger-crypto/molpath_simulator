/* MolPath Simulator v2.5.0b — RES_IMPL_001 Course Flagship Layer (delta)
   Scope: RES_IMPL_001_v1_3 only.
   Curates the published-biomarker -> local transfer -> analytical validation -> independent clinical validation -> operations -> implementation-gate teaching path.
   IMPORTANT: Course Flagship quality level only — this patch does NOT promote the case to Signature Case.
   Existing scoring IDs, correctness semantics and research workflow navigation are preserved.
*/
(function(){
'use strict';
const CASE_ID='RES_IMPL_001_v1_3';
const ASSETS=Object.freeze({
  publication:'assets/res_impl_001/publication_discovery_signature_001.png',
  cohorts:'assets/res_impl_001/discovery_vs_routine_cohort_001.png',
  transfer:'assets/res_impl_001/rnaseq_nanostring_assay_transfer_001.png',
  analytical:'assets/res_impl_001/analytical_validation_nanostring_001.png',
  clinical:'assets/res_impl_001/independent_clinical_validation_001.png',
  operations:'assets/res_impl_001/operational_validation_workflow_cost_001.png',
  gate:'assets/res_impl_001/implementation_gate_final_decision_001.png'
});
window.MolPathRESIMPL001CourseFlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function complete(){try{return !!caseIsComplete()}catch(_){return !!(state?.finalized||state?.research?.finalized)}}
function E(x){
  try{return esc(x==null?'':String(x))}
  catch(_){return String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
}
function asset(title,src,cls=''){
  return `<figure class="ri1-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener" data-asset-title="${E(title)}"><img src="${src}" alt="${E(title)}"></a><div class="ri1-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`;
}
function block(title,items,cls=''){
  return `<div class="ri1-block ${cls}"><div class="ri1-head"><h4>${E(title)}</h4><span class="ri1-pill">COURSE FLAGSHIP</span></div><div class="ri1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`;
}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    /* Course Flagship != Signature Case. Do not touch c.signature_case. */
    c.course_flagship=true;
    c.deep_dive=true;
    c.title='Publiziert ist nicht routinefähig → RESponder-Signatur von Discovery bis kontrollierter Implementierung';
    c.short='RES: Biomarker → Routine?';
    c.difficulty='advanced';
    c.estimated_time_min='12–15';
    c.tags=Array.from(new Set([].concat(c.tags||[],[
      'Course Flagship','RES','Translation','Biomarker','RNA-Expression','NSCLC','Immuntherapie','NanoString','Analytische Validierung','Klinische Validierung','Implementierung'
    ]).filter(Boolean).filter(x=>x!=='Signature Case')));
    c.research_intro={
      'Fall-ID':'RES_IMPL_001',
      'Projektidee':'Eine publizierte 23-Gen-RNA-Signatur zur Vorhersage des ICI-Ansprechens beim fortgeschrittenen NSCLC soll möglichst direkt in die molekularpathologische Routine übernommen werden.',
      'Ausgangslage':'Die RESponder-Signatur wurde per RNA-seq in einer selektierten Studienkohorte entwickelt und publiziert. Die Routine arbeitet jedoch mit heterogenen FFPE-Proben, geringerem RNA-Input und benötigt einen robusten, standardisierbaren Workflow.',
      'Kernentscheidung':'Welche Evidenz- und Validierungsschichten fehlen zwischen überzeugender Publikation und verantwortbarem Routineeinsatz – analytisch, klinisch, operativ, organisatorisch und ökonomisch?',
      'Problem':'Publikationsperformance ist Evidenz, aber keine lokale Routinevalidierung. Plattformtransfer, Präanalytik, Cut-off, klinische Utility, TAT, Kosten, QM/Governance und Erstattung müssen getrennt geprüft werden.'
    };
    c.research_context={
      'Publikation':'23-Gen-RESponder-Score; RNA-seq; fortgeschrittenes NSCLC unter PD-1/PD-L1-basierter Therapie; Discovery/Validation mit publizierter AUC um 0,84.',
      'Lokale Routine':'FFPE-Kleinbiopsien und teils zytologische Präparate; niedrigere und variablere RNA-Qualität; Zielplattform NanoString nCounter mit custom 23-gene CodeSet.',
      'Validierungsrahmen':'Technischer Transfer in gepaarten FFPE-Proben, analytische Validierung unter definierten Input-/DV200-Grenzen, unabhängige klinische Validierung und anschließende Operations-/Implementation-Bewertung.',
      'Ziel':'Am Ende steht kein binäres „Paper gut/schlecht“, sondern ein Stage-Gate: unrestricted routine use, kontrollierte prospektive Implementierung oder Research-only.'
    };

    const hyp=Object.fromEntries((c.hypothesis_options||[]).map(x=>[x.id,x]));
    if(hyp.paper_enough){hyp.paper_enough.label='Die publizierte AUC von etwa 0,84 reicht aus; wenn wir den Score technisch messen können, kann er direkt als Routinebefund angeboten werden.';hyp.paper_enough.feedback='Falsch: Publizierte klinische Performance ersetzt weder lokale analytische Validierung noch die Prüfung von Materialtransfer, Cut-off, Workflow und klinischem Zusatznutzen.'}
    if(hyp.layered){hyp.layered.label='Plattformtransfer, analytische Validität, unabhängige klinische Validität und operative Implementierbarkeit getrennt prüfen und erst danach über den Routineeinsatz entscheiden.';hyp.layered.feedback='Optimal: Diese Ebenen beantworten unterschiedliche Fragen. Ein Test kann technisch funktionieren und trotzdem klinisch oder organisatorisch noch nicht routinefähig sein.'}
    if(hyp.prospective_first){hyp.prospective_first.label='Die Signatur sofort prospektiv mitberichten und später prüfen, ob sie Entscheidungen oder Outcomes verbessert.';hyp.prospective_first.feedback='Zu früh: Vor jeder klinischen Nutzung müssen Messbereich, Präzision, Reproduzierbarkeit, QC und technische Ausfallgrenzen des lokalen Assays feststehen.'}

    const pico=Object.fromEntries((c.pico_options||[]).map(x=>[x.id,x]));
    if(pico.implementation){pico.implementation.label='P: unabhängige fortgeschrittene NSCLC-Routinekohorte unter PD-1/PD-L1-basierter Therapie; I: gelockter NanoString-RESponder-Score; C: klinischer Outcome-/Standardbiomarker-Kontext; O: analytische Robustheit, ORR-Discrimination/Calibration, Fail-Rate, TAT, Kosten und Implementation Readiness.';pico.implementation.feedback='Gut: Der Transfer wird als Kette aus analytischen, klinischen und operativen Endpunkten geplant, ohne diese Ebenen gleichzusetzen.'}
    if(pico.aauc_only){pico.aauc_only.label='Nur die AUC in einer kleinen lokalen Fallserie bestimmen; wenn sie hoch bleibt, gilt der Biomarker als implementiert.';pico.aauc_only.feedback='Zu eng: Routinefähigkeit ist mehr als eine AUC und umfasst insbesondere Präanalytik, technische Ausfälle, Cut-off-Stabilität, Workflow, Governance und klinische Utility.'}
    if(pico.workflow_only){pico.workflow_only.label='Nur TAT und Kosten testen; die Publikation liefert die klinische Validität bereits vollständig.';pico.workflow_only.feedback='Unvollständig: Eine fremde Studienkohorte beantwortet nicht automatisch die klinische Performance im lokalen Routinekollektiv.'}

    const design=Object.fromEntries((c.design_options||[]).map(x=>[x.id,x]));
    if(design.assay_transfer){design.assay_transfer.label='RNA-seq → NanoString-Transfer in gepaarten FFPE-Proben und anschließende analytische Validierung mit prädefinierten Akzeptanzkriterien';design.assay_transfer.feedback='Richtig: Korrelation zeigt Machbarkeit; Präzision, Reproduzierbarkeit, Mindestinput, DV200-Grenzen und Robustheit müssen separat belegt werden.'}
    if(design.cutoff_lock){design.cutoff_lock.label='Score-Algorithmus und primären Cut-off vor Outcome-Auswertung locken; post-hoc Cut-off-Analysen ausdrücklich explorativ kennzeichnen';design.cutoff_lock.feedback='Richtig: Ein lokal optimierter Cut-off im selben Datensatz ist Re-Discovery und benötigt eine weitere prospektive Bestätigung.'}
    if(design.clinical_check){design.clinical_check.label='Unabhängige NSCLC-Routinekohorte mit vorab definiertem Outcome und Analyseplan klinisch validieren';design.clinical_check.feedback='Richtig: Externe Transportierbarkeit muss im Zielsetting geprüft werden.'}
    if(design.workflow){design.workflow.label='Workflow, TAT, Materialverbrauch, QC-Fail-Rate, Netto-Kapazität, lokale Kosten und Reporting-Verantwortlichkeiten systematisch testen';design.workflow.feedback='Richtig: Operative Machbarkeit ist ein eigener Validierungsschritt.'}
    if(design.exclude_failures){design.exclude_failures.label='Low-DV200- oder Low-Input-Proben aus allen Auswertungen entfernen, damit die Performance der auswertbaren Fälle maximal bleibt';design.exclude_failures.feedback='Falsch: Routineausfälle sind selbst ein Implementierungsendpunkt und müssen sichtbar bleiben.'}

    const meth=Object.fromEntries((c.method_options||[]).map(x=>[x.id,x]));
    if(meth.preanalytics){meth.preanalytics.label='FFPE-Alter, Tumoranteil, RNA-Input und DV200 dokumentieren; validierten Mindestinput ≥50 ng und DV200 ≥30 % als technische Einsatzgrenzen verwenden';meth.preanalytics.feedback='Richtig: Der Assay darf nur innerhalb seiner analytisch validierten Material- und Qualitätsgrenzen eingesetzt werden.'}
    if(meth.controls){meth.controls.label='NanoString-Kontrollen, Housekeeping/Normalisierung, QC-Flags und Run-Akzeptanzkriterien festlegen';meth.controls.feedback='Richtig.'}
    if(meth.lot_operator){meth.lot_operator.label='Repeatability sowie Between-run-, Operator- und relevante Lot-/Gerätevariation prüfen';meth.lot_operator.feedback='Richtig.'}
    if(meth.reporting){meth.reporting.label='Indikation, validierte Materialgrenzen, „nicht auswertbar“, explorativen Cut-off und klinische Limitationen im Reporting vorab festlegen';meth.reporting.feedback='Richtig: Reporting muss die tatsächliche Evidenzstufe transparent machen.'}
    if(meth.negative_fail){meth.negative_fail.label='Technisch nicht auswertbare Probe als RESponder-low/biomarker-negativ klassifizieren';meth.negative_fail.feedback='Falsch: analytisches Versagen ist kein biologisch negatives Ergebnis.'}

    const ana=Object.fromEntries((c.analysis_options||[]).map(x=>[x.id,x]));
    if(ana.agreement){ana.agreement.label='Cross-platform agreement/technische Reproduzierbarkeit getrennt von klinischer Discrimination, Calibration und Outcome-Assoziation auswerten';ana.agreement.feedback='Richtig: analytische und klinische Validität dürfen nicht sprachlich vermischt werden.'}
    if(ana.failure_rate){ana.failure_rate.label='Nicht-auswertbare Fälle und Performance in Low-DV200-/Low-Input-Strata als eigenen Implementierungsendpunkt berichten';ana.failure_rate.feedback='Richtig.'}
    if(ana.cost_tat){ana.cost_tat.label='TAT, Netto-Durchsatz, Kontrollpositionen, Materialverbrauch und lokale Vollkosten statt nur Reagenzienpreis betrachten';ana.cost_tat.feedback='Richtig.'}
    if(ana.refit_cutoff){ana.refit_cutoff.label='Den Cut-off in der unabhängigen Routinekohorte auf 0,15 optimieren und diese Performance im selben Datensatz als endgültig validiert deklarieren';ana.refit_cutoff.feedback='Falsch: 0,15 kann explorativ interessant sein, benötigt aber prospektive unabhängige Bestätigung.'}

    c.expected_output={
      'Kernentscheidung':'Kein unkontrollierter Routine-Go-live. Der Biomarker ist analytisch robust und zeigt unabhängige klinische Signalstärke, aber Cut-off, Clinical Utility/Impact, QM/Governance und Erstattung sind noch nicht vollständig etabliert.',
      'Empfohlener Projektpfad':'Publikation kritisch einordnen → lokale Kohorten-/Material-Transportierbarkeit prüfen → RNA-seq/NanoString-Transfer → analytische Validierung → unabhängige klinische Validierung → Workflow/TAT/Kosten/Kapazität → Implementation Gate → kontrollierte prospektive Validierungs-/Impact-Studie.',
      'Minimalstandard':'NanoString-CodeSet gelockt; RNA ≥50 ng, DV200 ≥30 %; analytische Präzision/Reproduzierbarkeit; unabhängige NSCLC-Kohorte; Cut-off transparent als explorativ; TAT/Kosten/QM/Reporting; prospektive Utility-/Impact-Evaluation vor unrestricted routine use.',
      'No-Go':'Publikations-AUC als lokale Routinevalidierung ausgeben, technischen Fail als negativ werten, post-hoc Cut-off als final validiert bezeichnen oder klinische Utility ohne prospektive Impact-Daten behaupten.'
    };
    c.optimal_summary='Optimale Lösung: Die RESponder-Signatur wird nicht direkt aus dem Paper in die Routine übernommen. Der Transfer RNA-seq → NanoString ist technisch machbar und der Assay analytisch unter definierten FFPE-/RNA-Grenzen validiert. In einer unabhängigen NSCLC-Routinekohorte bleibt ein klinisches Signal bestehen (AUC etwa 0,71), aber schwächer als in der Discovery-Kohorte; der lokal günstigere Cut-off 0,15 ist post hoc und bleibt explorativ. Workflow, TAT und Kosten sind operativ machbar. Deshalb: NO-GO für unrestricted routine use, aber GO für kontrollierte prospektive Implementierung/Validierung mit gelocktem Cut-off, Endpunkten, QM/Governance und Impact-/Health-Economic-Evaluation.';

    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=false;
        d.deep_dive_priority='course_flagship';
        d.title='Publiziert ist nicht routinefähig: RESponder-Signatur von Discovery bis Implementation Gate';
        d.opening_scene='Im Journal Club wirkt die neue 23-Gen-RNA-Signatur überzeugend: fortgeschrittenes NSCLC unter ICI, deutliche Heatmap-Trennung, AUC etwa 0,84 und starke Outcome-Assoziation. Die spontane Frage aus der Onkologie lautet: „Können wir das direkt in die Routine übernehmen?“';
        d.case_briefing='Ihre Aufgabe ist nicht, das Paper nachzuerzählen, sondern Translation zu betreiben: Ist die Studienpopulation auf unsere Routine übertragbar? Kann der Score auf einer FFPE-tauglichen Routineplattform robust gemessen werden? Hält die klinische Performance unabhängig? Und sind Workflow, Qualität, Governance, Kosten und Utility ausreichend für eine verantwortbare Routineentscheidung?';
        d.learning_objectives=[
          'Publikationsperformance von lokaler Routinevalidierung unterscheiden.',
          'Technischen Plattformtransfer von vollständiger analytischer Validierung trennen.',
          'Analytische Validität, klinische Validität und klinische Utility/Impact als getrennte Evidenzschichten bewerten.',
          'Post-hoc Cut-off-Optimierung als explorativ erkennen und prospektive Bestätigung verlangen.',
          'TAT, Netto-Durchsatz, Materialgrenzen, Kosten, QM/Governance und Erstattung in ein Implementation Gate integrieren.'
        ];
        d.context_cards=[
          {title:'Starkes Paper',content:'23-Gene-RESponder-Score aus RNA-seq; AUC etwa 0,84 und deutliches klinisches Signal.',teaching_point:'Das rechtfertigt Translation – aber noch keinen lokalen Routinebefund.'},
          {title:'Andere Routinepopulation',content:'Mehr kleine/ältere FFPE-Proben, teils Zytologie, niedrigerer RNA-Input/DV200, heterogenere Vorbehandlung.',teaching_point:'Gleiche Tumorentität bedeutet nicht automatisch gleiche Transportierbarkeit.'},
          {title:'Routineplattform',content:'NanoString nCounter custom 23-gene CodeSet statt Discovery-RNA-seq.',teaching_point:'Gute Cross-platform-Korrelation zeigt Machbarkeit, nicht klinische Austauschbarkeit.'},
          {title:'Implementation Gate',content:'Analytik und Operations können „grün“ sein, während Utility, Governance oder Reimbursement noch offen bleiben.',teaching_point:'Routinefähigkeit ist eine mehrdimensionale Entscheidung.'}
        ];
        d.pre_results=[
          {title:'Discovery-Evidenz',content:'Publizierte RESponder-Signatur mit starker Heatmap-/ROC-/PFS-Trennung in selektierter NSCLC-Kohorte.'},
          {title:'Lokale Materialrealität',content:'FFPE-Routine mit höherem Probenalter, niedrigerem RNA-Input und deutlich breiterer DV200-Verteilung.'},
          {title:'Zielplattform',content:'NanoString nCounter mit 23-Gene-CodeSet; Ziel ist ein standardisierter Score, nicht eine neue lokale Discovery.'}
        ];
        d.reasoning_gates=[
          {id:'transport_gate',question:'Reicht die publizierte Performance für einen lokalen Routine-Go-live?',expected:'Nein. Population, Material, Präanalytik und Plattform unterscheiden sich; Transportierbarkeit muss geprüft werden.'},
          {id:'validation_gate',question:'Was muss analytisch vor klinischer Nutzung des NanoString-Scores belegt sein?',expected:'Präzision, Reproduzierbarkeit, QC/Normalisierung, Mindestinput, DV200-Grenzen, Robustheit und definierter Umgang mit nicht auswertbaren Proben.'},
          {id:'implementation_gate',question:'Welche offenen Punkte verhindern trotz AUC 0,71 und operativer Machbarkeit den unrestricted routine use?',expected:'Explorativer Cut-off, fehlende prospektive Clinical Utility/Impact, noch nicht vollständig gelockte QM/Governance-Prozesse sowie offene Health-Economic-/Reimbursement-Evidenz.'}
        ];
        d.twist={title:'Der Biomarker funktioniert – aber schwächer',content:'In der unabhängigen NSCLC-Routinekohorte bleibt die Discrimination signifikant, fällt aber auf AUC etwa 0,71. Ein Cut-off von 0,15 verbessert im selben Datensatz die Sensitivität, ist jedoch post hoc optimiert.',why_critical:'Das ist weder ein Scheitern noch ein Routine-Go. Die richtige Antwort ist kontrollierte prospektive Bestätigung statt Cut-off-Re-Discovery als „Validierung“ zu verkaufen.'};
        d.result_packages=[
          {id:'optimal',title:'NO-GO unrestricted / GO controlled implementation',result:'Analytisch validiert und operativ machbar; klinisches Signal unabhängig bestätigt, aber Cut-off und Utility noch prospektiv offen. Kontrollierte prospektive Validierungs-/Impact-Studie wird gestartet.',feedback:'Vollständige Integration von Analytik, Klinik, Operations und Governance.'},
          {id:'paper_to_routine',title:'Paper → Routine',result:'Publizierte AUC und technische Messbarkeit werden fälschlich als ausreichende Routinevalidierung gewertet.',feedback:'Überzieht die Evidenz und ignoriert Transportierbarkeit, Utility und Implementierungsrisiken.'},
          {id:'research_only_forever',title:'Alles bleibt Research-only',result:'Das unabhängige klinische Signal und die gute analytische/operative Machbarkeit werden ignoriert.',feedback:'Zu defensiv: Die Daten rechtfertigen eine kontrollierte prospektive Implementierung, nur noch keinen unrestricted routine use.'}
        ];
        d.followup_logic=[
          {trigger:'Analytischer Transfer besteht innerhalb definierter Grenzen',action:'Unabhängige klinische Validierung mit gelocktem primären Analyseplan durchführen',consequence:'Klinische Transportierbarkeit wird quantifiziert.'},
          {trigger:'Klinisches Signal bleibt bestehen, Cut-off-Optimierung ist aber post hoc',action:'Cut-off als explorativ deklarieren und prospektiv bestätigen',consequence:'Re-Discovery wird nicht als Validierung fehlinterpretiert.'},
          {trigger:'Operations sind machbar, Utility/Reimbursement aber offen',action:'Kontrollierte prospektive Implementation mit Impact-, Health-Economic- und Governance-Endpunkten',consequence:'Stage-Gate statt vorschnellem Routine-Go-live.'}
        ];
        d.debrief_points=[
          'Publication is evidence; routine implementation is a separate validation project.',
          '„Wir können es messen“ ist nicht dasselbe wie „wir dürfen es klinisch verwenden“.',
          'Analytische Validität, klinische Validität und Clinical Utility sind unterschiedliche Ebenen.',
          'Ein post-hoc optimierter Cut-off bleibt explorativ, selbst wenn er plausibel aussieht.',
          'Die Routineentscheidung integriert zusätzlich TAT, Netto-Kapazität, Kosten, QM/Governance und Erstattung.'
        ];
        d.instructor_notes={
          model_answer:'Nicht direkt implementieren. Zuerst externe Kohorten-/Materialunterschiede erfassen, RNA-seq → NanoString in gepaarten FFPE-Proben transferieren und den Assay analytisch mit Mindestinput ≥50 ng und DV200 ≥30 % validieren. Danach unabhängige NSCLC-Routinekohorte auswerten. AUC ~0,71 bestätigt ein reales, aber schwächeres Signal; Cut-off 0,15 bleibt post hoc/explorativ. Operations sind mit 12 Positionen/Cartridge, typischerweise 10 Patienten + 2 Kontrollen, ~20–24 h TAT und modellierbaren Kosten machbar. Final: NO-GO unrestricted routine use, GO controlled prospective implementation/validation bis Utility, Governance und Reimbursement belegt sind.',
          scoring_focus:['Transportierbarkeit','Analytische Validierung','Cut-off-Disziplin','Klinische Utility','Implementation Gate'],
          discussion_questions:['Wann ist eine unabhängige klinische Validierung ausreichend – und wann braucht man zusätzlich Utility/Impact?','Welche Fehler entstehen, wenn Cut-offs im selben Datensatz optimiert und bewertet werden?','Welche lokalen Operationsdaten gehören zwingend in eine Routine-Go/No-Go-Entscheidung?']
        };
        d.report_additions=['Course Flagship: sieben phasengekoppelte Originalansichten','Referenzpfad: Paper → Cohort Shift → Platform Transfer → Analytical Validation → Independent Clinical Validation → Operations → Implementation Gate','Finale Entscheidung: NO-GO unrestricted routine use / GO controlled prospective implementation'];
      }
    }catch(_){ }
  }catch(e){console.error('[RES_IMPL_001 Course Flagship] case patch failed',e)}
}

function addonForCurrentStep(){
  if(!active()||!state)return '';
  switch(state.step){
    case 'project_idea':
      return block('Publikationssignal – überzeugend, aber noch keine Routinevalidierung',[
        asset('Publikation / Discovery-Evidenz · 23-Gen-RESponder-Signatur bei NSCLC unter ICI',ASSETS.publication,'wide')
      ]);
    case 'hypothesis':
      if(!state.research?.hypothesis)return '';
      return block('Transportierbarkeit – gleiche Krankheit, andere Routine',[
        asset('Discovery-Kohorte vs. lokale Routinekohorte · Population, Material und RNA-Qualität',ASSETS.cohorts,'wide')
      ]);
    case 'methods':
      return block('Technischer Transfer und analytische Validierung',[
        asset('RNA-seq → NanoString nCounter · Cross-platform Assay Transfer',ASSETS.transfer,'wide'),
        asset('Analytische Validierung · Präzision, Reproduzierbarkeit, Mindestinput und Robustheit',ASSETS.analytical,'wide')
      ],'ri1-methods');
    case 'analysis':
      return block('Unabhängige klinische Validierung – Signal bleibt, Effekt wird realistischer',[
        asset('Unabhängige NSCLC-Routinekohorte · AUC, Calibration und explorativer Cut-off',ASSETS.clinical,'wide')
      ],'ri1-clinical');
    case 'feedback': {
      let out=block('Operationalisierung – ein valider Assay muss auch als Prozess funktionieren',[
        asset('Workflow, TAT, Netto-Durchsatz und lokale Kostenmodellierung',ASSETS.operations,'wide')
      ],'ri1-operations');
      if(complete()) out+=block('Implementation Gate – finale Go/No-Go-Entscheidung',[
        asset('Stage-Gate · NO-GO unrestricted routine / GO controlled prospective implementation',ASSETS.gate,'wide')
      ],'ri1-closure');
      return out;
    }
    default:return '';
  }
}

function styles(){
  if(document.getElementById('ri1CourseFlagshipStyles'))return;
  const s=document.createElement('style');s.id='ri1CourseFlagshipStyles';s.textContent=`
.ri1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.ri1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.ri1-head h4{margin:0;color:var(--primary)}
.ri1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#6b2fa0;border:1px solid #dec9ef;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.ri1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.ri1-grid.single{grid-template-columns:1fr}.ri1-asset.wide{grid-column:1/-1}
.ri1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.ri1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.ri1-asset a{display:block;background:#f2f6f9}.ri1-asset img{width:100%;height:auto;display:block;object-fit:contain}.ri1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.ri1-methods{border-color:#b9c6f0;background:linear-gradient(180deg,#fff,#f7f8ff)}.ri1-clinical{border-color:#b4d8c4;background:linear-gradient(180deg,#fff,#f6fff9)}.ri1-operations{border-color:#e5cf9f;background:linear-gradient(180deg,#fff,#fffbf2)}.ri1-closure{border-color:#8eb5dc;background:linear-gradient(180deg,#fff,#f3f8ff)}
@media(max-width:1000px){.ri1-grid{grid-template-columns:1fr}.ri1-asset.wide{grid-column:auto}}
`;document.head.appendChild(s);
}

function install(){
  if(window.__MolPathRESIMPL001CourseFlagshipInstalled)return;
  window.__MolPathRESIMPL001CourseFlagshipInstalled=true;
  patchCase();styles();
  const prev=window.renderContent;
  if(typeof prev==='function'){
    const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;return inject(html,addonForCurrentStep())};
    try{window.renderContent=wrapped}catch(_){}
    try{renderContent=wrapped}catch(_){}
  }
  try{renderCasePicker();renderKpi();if(active())render()}catch(_){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();

window.MolPathRESIMPL001CourseFlagship=Object.freeze({
  base:'v2.5.0b+METHOD_FOCUS+MET_COURSE_5of5+LAB_RUN_001+LAB_PRE_001',
  caseId:CASE_ID,
  assetCount:7,
  phaseGating:{project_idea:[1],hypothesis_after_choice:[2],methods:[3,4],analysis:[5],feedback:[6],post_completion:[7]},
  signaturePromotion:false,
  courseFlagship:true,
  logicChanges:false,
  modalEscaper:'v250b_asset_modal_hotfix.js escaper-v2'
});
})();
