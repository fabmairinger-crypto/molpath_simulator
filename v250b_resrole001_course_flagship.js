/* MolPath Simulator v2.5.0b — RES_ROLE_001 Course Flagship Layer (delta)
   Scope: RES_ROLE_001_v1_3 only.
   Curates the last-minute authorship conflict -> contribution reconstruction -> CRediT mapping -> ICMJE eligibility -> proposed author order -> accountability resolution -> final authorship agreement/audit trail teaching path.
   IMPORTANT: Course Flagship quality level only — this patch does NOT promote the case to Signature Case.
   Existing scoring IDs, correctness semantics and research workflow navigation are preserved.
*/
(function(){
'use strict';
const CASE_ID='RES_ROLE_001_v1_3';
const ASSETS=Object.freeze({
  crisis:'assets/res_role_001/submission_crisis_manuscript_chat_001.png',
  timeline:'assets/res_role_001/contribution_reconstruction_timeline_001.png',
  credit:'assets/res_role_001/credit_contribution_matrix_001.png',
  criteria:'assets/res_role_001/icmje_authorship_criteria_gate_001.png',
  order:'assets/res_role_001/proposed_authorship_order_board_001.png',
  accountability:'assets/res_role_001/bioinformatician_accountability_resolution_001.png',
  final:'assets/res_role_001/final_authorship_agreement_audit_001.png'
});
window.MolPathRESROLE001CourseFlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function complete(){try{return !!caseIsComplete()}catch(_){return !!(state?.finalized||state?.research?.finalized)}}
function E(x){
  try{return esc(x==null?'':String(x))}
  catch(_){return String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
}
function asset(title,src,cls=''){
  return `<figure class="rr1-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener" data-asset-title="${E(title)}"><img src="${src}" alt="${E(title)}"></a><div class="rr1-provenance">Synthetisches Trainingsasset · fiktives Forschungsprojekt / fiktive Personen</div></figure>`;
}
function block(title,items,cls=''){
  return `<div class="rr1-block ${cls}"><div class="rr1-head"><h4>${E(title)}</h4><span class="rr1-pill">COURSE FLAGSHIP</span></div><div class="rr1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`;
}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    /* Course Flagship != Signature Case. Do not touch c.signature_case. */
    c.course_flagship=true;
    c.deep_dive=true;
    c.title='Autorenschaftskonflikt vor Submission → Contribution, CRediT, ICMJE und Accountability';
    c.short='RES: Autorenschaft vor Submission';
    c.difficulty='advanced';
    c.estimated_time_min='15–18';
    c.tags=Array.from(new Set([].concat(c.tags||[],[
      'Course Flagship','RES','Autorenschaft','ICMJE','CRediT','Research Governance','Accountability','Publikation','Teamkonflikt'
    ]).filter(Boolean).filter(x=>x!=='Signature Case')));
    c.research_intro={
      'Fall-ID':'RES_ROLE_001',
      'Projektidee':'Dienstag, 21.05.2024, 18:15 Uhr: knapp 48 Stunden vor Submission eskaliert die Autorenfrage eines translationalen Multi-omics-Manuskripts.',
      'Ausgangslage':'Die Postdoktorandin führte Hauptanalyse, Figuren, First Draft und Revisionen. Die Klinikerin fordert wegen rund 60 % Rekrutierung Co-Erstautorenschaft. Die PI möchte Prof. X aus strategischen Gründen ergänzen. Der Bioinformatiker hat einen großen methodischen Beitrag, seine finale Accountability ist aber noch offen.',
      'Kernentscheidung':'Beiträge rekonstruieren, CRediT deskriptiv nutzen, ICMJE-Autorenschaft separat prüfen, Reihenfolge contribution-basiert begründen und verbleibende Accountability vor finalem Lock schließen.',
      'Problem':'Recruitment, technische Arbeit, Hierarchie, Writing und Gesamtverantwortung sind verschiedene Beitragstypen. Weder Prozentzahlen noch CRediT-Kategorien oder institutionelle Position dürfen automatisch Autorenrang erzeugen.'
    };
    c.research_context={
      'Projekt':'Multi-omics-Studie beim metastasierten kolorektalen Karzinom (n=162); Manuskript nahezu final, Submission-Deadline 23.05.2024, 23:59.',
      'Beitragslage':'Postdoc: wissenschaftlicher Gesamtlead/Analyse/Writing. Klinikerin: Rekrutierung und klinische Daten. Pathologie: Histologie/Annotation/Interpretation. Bioinformatik: Pipeline und integrative Analysen. PI: Konzeption/Supervision/Funding. Prof. X: kein dokumentierter direkter Forschungsbeitrag.',
      'Governance':'Contribution, Authorship Eligibility und Author Order werden als getrennte Entscheidungen behandelt. Alle finalen Autoren müssen Manuskriptfreigabe und Accountability dokumentieren.',
      'Ziel':'Eine faire, nachvollziehbare und submission-fähige Autorenentscheidung mit dokumentierter Contribution, erfüllten Kriterien und vollständigem Audit-Trail.'
    };

    const hyp=Object.fromEntries((c.hypothesis_options||[]).map(x=>[x.id,x]));
    if(hyp.start_vague){hyp.start_vague.label='Die PI legt die Reihenfolge pragmatisch nach Hierarchie und Konfliktpotenzial fest, damit die Submission nicht gefährdet wird.';hyp.start_vague.feedback='Falsch: Hierarchie und politischer Druck ersetzen weder dokumentierte Beiträge noch Autorenschaftskriterien.'}
    if(hyp.structured){hyp.structured.label='Zuerst Beiträge anhand von Projektartefakten rekonstruieren; danach CRediT-Rollen beschreiben, ICMJE-Kriterien personenspezifisch prüfen und erst anschließend die Reihenfolge begründen.';hyp.structured.feedback='Optimal: Contribution, Eligibility und Author Order werden transparent und in der richtigen Reihenfolge entschieden.'}
    if(hyp.more_data){hyp.more_data.label='Die Autorenfrage bis nach Submission vertagen und später anhand der endgültigen Publikation klären.';hyp.more_data.feedback='Zu spät: Die Autorenliste, finale Zustimmung und Verantwortlichkeit müssen vor Submission geklärt sein.'}

    const pico=Object.fromEntries((c.pico_options||[]).map(x=>[x.id,x]));
    if(pico.vague){pico.vague.label='Entscheidungsregel: Wer am meisten Patienten, Stunden oder CRediT-Kategorien beigetragen hat, steht weiter vorne.';pico.vague.feedback='Zu grob: Beitragstypen und Verantwortung lassen sich nicht sinnvoll auf eine einzige Zahl reduzieren.'}
    if(pico.specific){pico.specific.label='Entscheidungsrahmen: dokumentierte Beiträge → CRediT-Beschreibung → Autorenschaftskriterien/Accountability → relative Gesamtbeiträge für die Reihenfolge → finale Zustimmung und Audit.';pico.specific.feedback='Gut: Der Prozess trennt Beschreibung, Eligibility, Reihenfolge und finale Verantwortung.'}
    if(pico.tech_only){pico.tech_only.label='Eine CRediT-Matrix genügt; aus Anzahl und Gewicht der Kategorien kann die Autorenliste automatisch berechnet werden.';pico.tech_only.feedback='Falsch: CRediT beschreibt Beiträge, entscheidet aber weder automatisch Autorenschaft noch Rang.'}

    const design=Object.fromEntries((c.design_options||[]).map(x=>[x.id,x]));
    if(design.cohort){design.cohort.label='Contribution Ledger aus Git/Analyse-Commits, Manuskriptversionen, Recruitment Logs, Pathologie-/Laborrecords und Meeting Minutes rekonstruieren';design.cohort.feedback='Richtig: Erst die faktische Beitragsbasis herstellen.'}
    if(design.endpoint){design.endpoint.label='Vor der Reihenfolge getrennt definieren: Wer erfüllt Autorenschaftskriterien, wer ist nur Contributor, und welche Punkte sind noch conditional';design.endpoint.feedback='Richtig.'}
    if(design.resources){design.resources.label='Submission-Deadline, verfügbare Zeit für gemeinsame Interpretation/Revision und finale Sign-offs realistisch einplanen';design.resources.feedback='Richtig.'}
    if(design.roles){design.roles.label='CRediT-Rollen, Manuskriptverantwortung, Corresponding Author und Entscheidungs-/Moderationsprozess transparent festhalten';design.roles.feedback='Richtig.'}
    if(design.no_plan){design.no_plan.label='Reihenfolge jetzt politisch festlegen und Kriterien nur dokumentieren, falls später jemand widerspricht';design.no_plan.feedback='Falsch: Das würde die Dokumentation zur nachträglichen Rechtfertigung degradieren.'}

    const meth=Object.fromEntries((c.method_options||[]).map(x=>[x.id,x]));
    if(meth.fit_method){meth.fit_method.label='CRediT als deskriptive Taxonomie für tatsächlich dokumentierte Contributions verwenden';meth.fit_method.feedback='Richtig: CRediT macht sichtbar, wer was beigetragen hat.'}
    if(meth.orthogonal){meth.orthogonal.label='Autorenschaft anschließend separat anhand der vier ICMJE-Kriterien inklusive finaler Zustimmung und Accountability prüfen';meth.orthogonal.feedback='Richtig: Contribution allein ist nicht identisch mit Autorenschaft.'}
    if(meth.qc){meth.qc.label='Vorgeschlagene Reihenfolge gegen Gesamtbeitrag, Writing/Revision, wissenschaftliche Verantwortung und dokumentierte Interessenkonflikte plausibilisieren';meth.qc.feedback='Richtig.'}
    if(meth.overkill){meth.overkill.label='Co-Erstautorenschaft als Standardkompromiss einsetzen, sobald zwei Personen einen Konflikt um Platz 1 haben';meth.overkill.feedback='Falsch: Co-First soll vergleichbare substanzielle Beiträge abbilden, nicht Konflikte kaschieren.'}

    const ana=Object.fromEntries((c.analysis_options||[]).map(x=>[x.id,x]));
    if(ana.analysis_plan){ana.analysis_plan.label='Proposed Order schriftlich begründen: Postdoc First, Klinikerin Second, Pathologie Third, Bioinformatik conditional Fourth, PI Last/Senior';ana.analysis_plan.feedback='Richtig: Die Reihenfolge folgt der dokumentierten relativen Contribution, nicht Status oder Rekrutierungsquote.'}
    if(ana.multiple){ana.multiple.label='Bioinformatiker-Accountability als offenen Gate-Punkt markieren und durch gemeinsame Interpretation, kritische Revision und explizite Verantwortungsübernahme schließen';ana.multiple.feedback='Richtig: Ein großer methodischer Beitrag wird anerkannt und der verbleibende Autorenprozess real ermöglicht.'}
    if(ana.repro){ana.repro.label='Finale CRediT Statements, Author Agreements, COI, Corresponding Author, Lock-Zeitpunkt und Entscheidungsdatei auditierbar archivieren';ana.repro.feedback='Richtig.'}
    if(ana.p_hack){ana.p_hack.label='Prof. X als Seniorautor ergänzen und der Klinikerin Co-First geben, um institutionelle Unterstützung und Submission-Frieden zu sichern';ana.p_hack.feedback='Falsch: Politische Konfliktvermeidung darf keine Gift-/Honorary- oder unbegründete Co-First-Autorenschaft erzeugen.'}

    const pit=Object.fromEntries((c.pitfall_options||[]).map(x=>[x.id,x]));
    if(pit.harking){pit.harking.label='Warnsignal: Autorenschaftskriterien werden erst nach gewünschter Reihenfolge passend interpretiert';pit.harking.feedback='Richtig erkannt: Kriterien dürfen nicht post hoc zur Rechtfertigung einer bereits politisch festgelegten Liste dienen.'}
    if(pit.governance){pit.governance.label='Beiträge, Autorenschaft, Reihenfolge, finale Zustimmung und Accountability vor Submission transparent dokumentieren';pit.governance.feedback='Richtig.'}
    if(pit.negative){pit.negative.label='Auch die Option „Contributor/Acknowledgement statt Autorenschaft“ als legitime, respektvolle Würdigung akzeptieren';pit.negative.feedback='Richtig: Nicht jede relevante Unterstützung muss Autorenschaft bedeuten.'}
    if(pit.story_after){pit.story_after.label='Wenn alle Beteiligten am Ende unterschreiben, ist die Entstehung der Autorenliste unabhängig von Beiträgen und Kriterien egal';pit.story_after.feedback='Falsch: Zustimmung heilt keine sachlich unbegründete Gift-/Honorary-Authorship-Entscheidung.'}

    c.expected_output={
      'Kernentscheidung':'Contribution, Autorenschaftsberechtigung und Reihenfolge getrennt und dokumentiert entscheiden.',
      'Empfohlener Projektpfad':'Contribution Reconstruction → CRediT → ICMJE Gate → Proposed Order → Accountability Resolution → Final Author Agreement & Audit Lock.',
      'Minimalstandard':'Dokumentierte Beiträge, alle Autorenschaftskriterien, begründete Reihenfolge, finale Manuskriptfreigabe, Accountability, CRediT/COI und nachvollziehbarer Audit-Trail.',
      'No-Go':'Gift/Honorary Authorship, automatischer Rang aus Recruitment-Prozent oder CRediT-Anzahl, Co-First als Konfliktpflaster oder Submission mit ungeklärter Accountability.'
    };
    c.optimal_summary='Optimale Lösung: Beiträge objektiv rekonstruieren, CRediT deskriptiv nutzen, ICMJE-Kriterien separat prüfen, die Reihenfolge aus dem relativen Gesamtbeitrag begründen und vor Submission alle Accountability-/Approval-Gates schließen.';

    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.title='Autorenschaft vor Submission: Contribution, Eligibility, Reihenfolge und Accountability';
        d.target_course='RES Basics';
        d.deep_dive_priority='course_flagship_res_role';
        d.target_role='PI / Scientist / Clinician / Pathologist / Bioinformatician';
        d.estimated_minutes_deep='15–18';
        d.is_signature_case=false;
        d.learning_objectives=[
          'Contribution, Autorenschaftsberechtigung und Autorenreihenfolge als getrennte Entscheidungen behandeln.',
          'Dokumentierte Projektartefakte und CRediT zur transparenten Rekonstruktion von Beiträgen nutzen.',
          'ICMJE-Autorenschaftskriterien inklusive finaler Zustimmung und Accountability auf alle Personen konsistent anwenden.',
          'Co-First-, Senior- und Corresponding-Author-Rollen anhand realer Beiträge statt Hierarchie oder Konfliktdruck begründen.',
          'Accountability-Lücken vor Submission aktiv schließen und die finale Einigung auditierbar dokumentieren.'
        ];
        d.opening_scene='Dienstag, 21. Mai 2024, 18:15 Uhr. In knapp 48 Stunden endet die Submission-Frist. Die Postdoktorandin hat Hauptanalyse, Figuren, First Draft und Revisionen getragen. Die Klinikerin fordert Co-Erstautorenschaft wegen rund 60 % Rekrutierung. Die PI möchte Prof. X aus strategischen Gründen ergänzen. Gleichzeitig hat der Bioinformatiker einen großen methodischen Beitrag geleistet, aber die finale biologische Interpretation noch nicht mitverantwortet.';
        d.case_briefing='Ihre Aufgabe ist nicht, einen politischen Kompromiss zu finden, sondern einen fairen und nachvollziehbaren Autorenprozess herzustellen. Rekrutierung, Histopathologie, Bioinformatik, Writing, Supervision und Funding sind unterschiedliche Contribution-Profile. CRediT beschreibt diese Beiträge; Autorenschaftskriterien und Reihenfolge müssen anschließend separat entschieden werden. Vor dem finalen Lock müssen alle Autoren die finale Version genehmigen und Verantwortung übernehmen.';
        d.context_cards=[
          {title:'Postdoktorandin',content:'Konzept/Design mitgeführt, Hauptanalyse und integrative Auswertung, Figuren, First Draft und Revisionen.',teaching_point:'Der größte wissenschaftliche Gesamtbeitrag spricht für die Erstautorenposition.'},
          {title:'Klinikerin & Pathologie',content:'Klinikerin: ~60 % Rekrutierung, klinische Daten und kritische Revision. Pathologie: Histopathologie, Annotation, Biomarkerinterpretation und Revision.',teaching_point:'Substantielle domänenspezifische Beiträge sind autorenschaftsrelevant, aber nicht automatisch Co-First.'},
          {title:'Bioinformatiker',content:'Pipeline, Omics-Integration und Signature-Analysen sind zentral; initial fehlt noch explizite Accountability für biologische Interpretation und Gesamtarbeit.',teaching_point:'Technische Exzellenz und Accountability müssen zusammengeführt werden.'},
          {title:'PI / Prof. X',content:'PI: Konzeption, Supervision, Funding, kritische Revision und Gesamtverantwortung. Prof. X: Abteilungsleitung, aber kein dokumentierter direkter Forschungsbeitrag.',teaching_point:'Seniorität kann Beitrag sein, institutionelle Position allein aber nicht.'}
        ];
        d.pre_results=[
          {title:'Manuskript & Kommunikation',content:'Manuskript nahezu final; Autorenzeile offen. Chat/Mails dokumentieren Co-First-Forderung und Wunsch nach strategischer Aufnahme von Prof. X.'},
          {title:'Contribution Reconstruction',content:'Git/Analyse-Commits, Recruitment Logs, Pathologie-Records, Figure-Versionen und Manuskripthistorie erlauben eine faktische Rekonstruktion.'},
          {title:'Submission Clock',content:'Deadline 23.05.2024, 23:59. Genug Zeit für einen strukturierten Entscheidungs- und Accountability-Termin – aber nicht für Vertagung bis nach Submission.'}
        ];
        d.material_or_resource_constraints=[
          'Die Submission-Deadline darf nicht als Begründung für Gift/Honorary Authorship missbraucht werden.',
          'Co-First-Autorenschaft darf nur vergleichbare substanzielle Gesamtbeiträge abbilden.',
          'Ein großer methodischer Beitrag darf nicht entwertet werden; offene Accountability muss realistisch vor Submission erfüllbar gemacht werden.',
          'Alle finalen Autoren müssen finale Version, Contribution Statement und Verantwortung bestätigen.',
          'Die Entscheidung soll die Zusammenarbeit erhalten und für zukünftige Projekte einen früheren Rollenprozess etablieren.'
        ];
        const gates=Object.fromEntries((d.reasoning_gate_upgrade||[]).map(x=>[x.id,x]));
        if(gates.first){gates.first.prompt='Was ist der erste belastbare Schritt im aktuellen Autorenkonflikt?'; const o=Object.fromEntries((gates.first.options||[]).map(x=>[x.id,x])); if(o.matrix)o.matrix.label='Beiträge aller Beteiligten anhand dokumentierter Projektartefakte rekonstruieren und transparent gegenüberstellen.'; if(o.pi_decides)o.pi_decides.label='PI entscheidet allein nach Hierarchie und institutionellem Risiko.'; if(o.samples)o.samples.label='Rekrutierungsquote entscheidet den Rang.'; if(o.submit_now)o.submit_now.label='Submission jetzt durchführen und Autorenschaft später korrigieren.'; gates.first.rationale='Ohne faktische Contribution-Basis werden Eligibility und Reihenfolge zur Macht- oder Erinnerungsfrage.'}
        if(gates.credit){gates.credit.prompt='Welche Funktion hat die CRediT-Matrix?'; const o=Object.fromEntries((gates.credit.options||[]).map(x=>[x.id,x])); if(o.describe)o.describe.label='Sie beschreibt Contribution-Profile transparent; Autorenschaftskriterien und Reihenfolge werden anschließend separat bewertet.'; if(o.automatic)o.automatic.label='Jede CRediT-Kategorie erzeugt automatisch Autorenschaft.'; if(o.rank)o.rank.label='Die Anzahl der CRediT-Kategorien bestimmt automatisch den Rang.'; if(o.irrelevant)o.irrelevant.label='CRediT ist bei Autorenschaftskonflikten ohne Nutzen.'; gates.credit.rationale='CRediT beantwortet „wer hat was getan?“, aber nicht allein „wer ist Autor?“ oder „wer steht wo?“.'}
        if(gates.prof){gates.prof.prompt='Wie gehen Sie mit Prof. X um?'; const o=Object.fromEntries((gates.prof.options||[]).map(x=>[x.id,x])); if(o.no_auto)o.no_auto.label='Nicht automatisch aufnehmen: ohne dokumentierten substantiellen Beitrag und erfüllten Autorenprozess keine Autorenschaft; Entscheidung professionell begründen.'; if(o.gift)o.gift.label='Aufnehmen, um institutionellen Ärger zu vermeiden.'; if(o.last)o.last.label='Automatisch als Letztautor, da Abteilungsleiter.'; if(o.hide)o.hide.label='Ohne Erklärung aus der Autorenkommunikation entfernen.'; gates.prof.rationale='Honorary/Gift Authorship wird nicht durch Hierarchie legitimiert; gleichzeitig gehört die Entscheidung transparent kommuniziert.'}
        d.decision_task='Erstellen Sie eine nachvollziehbare Autorenentscheidung: rekonstruieren Sie Contribution, mappen Sie CRediT-Rollen, prüfen Sie Autorenschafts-Eligibility und Accountability, begründen Sie die Reihenfolge und definieren Sie den finalen Lock-/Approval-Prozess vor der Submission.';
        d.expected_path=[
          'Contribution Ledger aus Projektartefakten und Kommunikation rekonstruieren.',
          'Tätigkeiten als CRediT-Rollen beschreiben, ohne Kategorien zu einem Rangscore zu addieren.',
          'Alle vorgeschlagenen Autoren personenspezifisch gegen die vier Autorenschaftskriterien prüfen.',
          'Prof. X ohne dokumentierten substantiellen Forschungsbeitrag nicht als Honorary/Guest Author aufnehmen.',
          'Postdoc aufgrund wissenschaftlichen Gesamtleads als First Author; Klinikerin als Second Author statt automatischem Co-First; Pathologie Third; Bioinformatik conditional Fourth; PI Last/Senior.',
          'Bioinformatiker in gemeinsame Interpretation und kritische Revision einbinden und explizite Accountability dokumentieren.',
          'Nach 5/5 erfüllter Eligibility finale Author Agreements, CRediT, COI, Corresponding Author und Reihenfolge bestätigen und locken.',
          'Submission-Paket mit vollständigem Audit-Trail als READY FOR SUBMISSION abschließen.'
        ];
        d.acceptable_alternatives=[
          'Co-First ist vertretbar, wenn zwei Personen tatsächlich vergleichbare substanzielle Gesamtbeiträge inklusive Writing/Verantwortung nachweisen; hier trägt die Rekrutierungsquote allein diese Gleichstellung nicht.',
          'Bei nicht lösbarem Konflikt kann eine neutrale institutionelle Ombuds-/Moderationsstelle eingeschaltet werden; Gift Authorship bleibt dennoch keine Lösung.'
        ];
        d.low_value_traps=[
          {label:'60 % Rekrutierung = Co-First',why_bad:'Rekrutierung ist substantiell, bildet aber nicht automatisch Analyse, Writing, Interpretation und Gesamtlead ab.'},
          {label:'CRediT-Kategorien zählen',why_bad:'Anzahl und Tiefe von CRediT-Rollen sind keine automatische Rangformel.'},
          {label:'Prof. X aus Politik aufnehmen',why_bad:'Institutionelle Position ohne substantiellen Beitrag erzeugt Honorary/Gift Authorship.'},
          {label:'Bioinformatik nur als Service behandeln',why_bad:'Ein zentraler methodischer/intellektueller Beitrag muss sichtbar werden; offene Accountability ist ein lösbares Gate, kein Grund zur Entwertung.'},
          {label:'Submission zuerst, Autorenschaft später',why_bad:'Final Approval und Accountability müssen vor der Einreichung geklärt sein.'}
        ];
        d.twist={title:'Großer Bioinformatik-Beitrag – aber Criterion 4 ist noch offen',content:'Die Contribution- und CRediT-Rekonstruktion zeigt, dass Dr. D. Pipeline, Omics-Integration und zentrale Signature-Analysen verantwortet hat. Gleichzeitig sagt er zunächst, er könne für die biologischen Schlussfolgerungen noch keine Verantwortung übernehmen.',why_critical:'Das ist weder ein Grund, seinen Beitrag kleinzureden, noch eine automatische Autorenzulassung. Das Team organisiert eine echte Joint-Interpretation-/Revision-Session, passt Claims und Limitationen an und ermöglicht Dr. D., nach informierter Prüfung Accountability zu übernehmen.'};
        d.result_packages=[
          {id:'optimal',title:'Contribution-basiert, kriteriensicher, vollständig accountable',result:'Postdoc First, Klinikerin Second, Pathologie Third, Bioinformatik nach geschlossener Accountability Fourth, PI Last/Senior. Prof. X wird nicht als Honorary Author aufgenommen. Alle fünf bestätigen finale Version, CRediT, Reihenfolge und Accountability; Author List wird auditierbar gelockt.',feedback:'Faire Autorenschaft wird über Beiträge, Kriterien und Verantwortung statt Hierarchie oder Konfliktdruck gelöst.'},
          {id:'incomplete',title:'Politischer Kompromiss ohne sauberen Gate-Prozess',result:'Eine Liste wird vereinbart, aber Contribution, Eligibility, Accountability oder finale Zustimmung bleiben unklar.',feedback:'Kurzfristig ruhig, aber wissenschaftlich und governance-seitig fragil.'},
          {id:'wrong',title:'Hierarchie und Prozentzahlen entscheiden',result:'Prof. X wird Ehrenautor, Recruitment erzeugt automatisch Co-First und Accountability des Bioinformatikers bleibt ungeklärt.',feedback:'Contribution, Kriterien und Verantwortung werden durch Macht- und Statuslogik ersetzt.'}
        ];
        d.followup_logic=[
          {trigger:'Bioinformatiker akzeptiert nach Joint Interpretation Accountability',action:'Criterion 4 als erfüllt dokumentieren, Position 4 bestätigen und finalen Author-Approval-Prozess starten.',consequence:'Großer methodischer Beitrag und Autorenverantwortung sind konsistent.'},
          {trigger:'Bioinformatiker lehnt Accountability auch nach fairer Einbindung ab',action:'Keine Autorenschaft erzwingen; Contribution transparent im Contributor/Acknowledgement-Kontext würdigen und Autorenliste neu prüfen.',consequence:'Autorenschaft bleibt an Verantwortung gekoppelt.'},
          {trigger:'Beiträge ändern sich in Revision substanziell',action:'Contribution Matrix und Reihenfolge transparent erneut prüfen.',consequence:'Autorenrang bleibt an reale Beiträge gebunden.'},
          {trigger:'Folgeprojekt startet',action:'Rollen-/Authorship-Gespräch bei Projektstart und erneut vor Manuskriptphase als Meilenstein etablieren.',consequence:'Last-minute-Konflikte werden deutlich reduziert.'}
        ];
        d.debrief_points=[
          'CRediT beschreibt Contributions; es ist kein Autorenschafts- oder Rangalgorithmus.',
          'Autorenschaftsberechtigung und Autorenreihenfolge sind getrennte Entscheidungen.',
          'Recruitment, Materialzugang, Funding oder Hierarchie begründen nicht allein eine bestimmte Autorenposition.',
          'Accountability ist ein echtes Kriterium und sollte durch Beteiligung an Interpretation/Revision ermöglicht statt nur administrativ abgefragt werden.',
          'Co-First ist für vergleichbare Gesamtbeiträge gedacht, nicht als Konfliktpflaster.',
          'Finale Author Agreements, CRediT, COI, Approval und Lock machen die Entscheidung nachvollziehbar und submission-ready.'
        ];
        d.instructor_notes={
          model_answer:'Ich friere die politische Diskussion zunächst ein und rekonstruiere die tatsächlichen Beiträge aus Projektartefakten. CRediT nutze ich zur Beschreibung, nicht als Ranking. Danach prüfe ich die vier Autorenschaftskriterien personenspezifisch. Die Postdoktorandin trägt den größten wissenschaftlichen Gesamtlead und bleibt First Author; die Klinikerin erhält für Rekrutierung/klinische Daten und Revision eine substanzielle Second-Author-Rolle, aber keine automatische Co-First-Position. Pathologie folgt an Position 3. Der Bioinformatiker ist zunächst conditional; in einer Joint-Interpretation-/Revision-Session werden biologische Claims, Limitationen und seine Analysen gemeinsam geprüft, danach akzeptiert er Accountability und Position 4 wird bestätigt. Die PI ist Last/Senior Author aufgrund Konzeption, Supervision, Funding, Revision und Gesamtverantwortung. Prof. X wird mangels substantiellen dokumentierten Beitrags nicht als Autor aufgenommen. Erst nach allen 5/5 Sign-offs werden Reihenfolge, CRediT/COI und Author List gelockt und das Paket als submission-ready abgeschlossen.',
          scoring_focus:['contribution reconstruction','CRediT is descriptive','ICMJE eligibility','author order rationale','no honorary authorship','accountability resolution','final approval/audit'],
          discussion_questions:['Wann ist Co-First-Autorenschaft sachlich gerechtfertigt und wann nur Konfliktmanagement?','Wie kann ein Team große technische/bioinformatische Contributions würdigen, ohne Accountability zu verwässern?','Welche Meilensteine sollten Autorenschaft in zukünftigen Projekten frühzeitig adressieren?']
        };
        d.report_additions=['Course Flagship: sieben phasengekoppelte Originalansichten','Referenzpfad: Submission Crisis → Contribution Reconstruction → CRediT → ICMJE Gate → Proposed Order → Accountability Resolution → Final Author Agreement/Audit','Finaler Status: fünf voll eligible Autoren, keine Honorary Authorship, Autorenliste gelockt und Submission-Paket ready.'];
      }
    }catch(_){ }
  }catch(e){console.error('[RES_ROLE_001 Course Flagship] case patch failed',e)}
}

function addonForCurrentStep(){
  if(!active()||!state)return '';
  switch(state.step){
    case 'project_idea':
      return block('Submission Crisis – Deadline, Beiträge und Machtkonflikt treffen gleichzeitig aufeinander',[
        asset('Manuskript + Teamkommunikation · ~48 h bis Submission · Autorenzeile noch offen',ASSETS.crisis,'wide')
      ]);
    case 'hypothesis':
      if(!state.research?.hypothesis)return '';
      return block('Contribution Reconstruction – erst Fakten, noch keine Autorenentscheidung',[
        asset('Projekt-Timeline & Contribution Ledger · dokumentierte Beiträge statt Erinnerung oder Hierarchie',ASSETS.timeline,'wide')
      ]);
    case 'methods':
      return block('Contribution beschreiben, Autorenschaft separat prüfen',[
        asset('CRediT Contribution Matrix · deskriptiv, nicht hierarchisch',ASSETS.credit,'wide'),
        asset('ICMJE Authorship Criteria Gate · Eligible / Conditional / Not eligible',ASSETS.criteria,'wide')
      ],'rr1-criteria');
    case 'analysis':
      return block('Proposed Author Order – contribution-basiert, aber noch nicht final gelockt',[
        asset('Proposed Authorship & Order Decision Board · Dr. D. conditional pending Criterion 4',ASSETS.order,'wide')
      ],'rr1-order');
    case 'feedback': {
      let out=block('Accountability Gap Resolution – aus „conditional“ wird echte Eligibility',[
        asset('Joint Interpretation & Revision · Criterion 4 geschlossen · Dr. D. jetzt 4/4 eligible',ASSETS.accountability,'wide')
      ],'rr1-accountability');
      if(complete()) out+=block('Final Authorship Agreement – Lock & Submission Audit Trail',[
        asset('Final Author List · 5/5 Sign-offs · CRediT/COI · READY FOR SUBMISSION',ASSETS.final,'wide')
      ],'rr1-final');
      return out;
    }
    default:return '';
  }
}

function styles(){
  if(document.getElementById('rr1CourseFlagshipStyles'))return;
  const s=document.createElement('style');s.id='rr1CourseFlagshipStyles';s.textContent=`
.rr1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.rr1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.rr1-head h4{margin:0;color:var(--primary)}
.rr1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#6b2fa0;border:1px solid #dec9ef;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.rr1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.rr1-grid.single{grid-template-columns:1fr}.rr1-asset.wide{grid-column:1/-1}
.rr1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.rr1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.rr1-asset a{display:block;background:#f2f6f9}.rr1-asset img{width:100%;height:auto;display:block;object-fit:contain}.rr1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.rr1-criteria{border-color:#d6c4e8;background:linear-gradient(180deg,#fff,#fbf8ff)}.rr1-order{border-color:#f0cf9b;background:linear-gradient(180deg,#fff,#fffaf2)}.rr1-accountability{border-color:#d8b8e8;background:linear-gradient(180deg,#fff,#fcf8ff)}.rr1-final{border-color:#a8cfb7;background:linear-gradient(180deg,#fff,#f5fff8)}
@media(max-width:1000px){.rr1-grid{grid-template-columns:1fr}.rr1-asset.wide{grid-column:auto}}
`;document.head.appendChild(s);
}

function install(){
  if(window.__MolPathRESROLE001CourseFlagshipInstalled)return;
  window.__MolPathRESROLE001CourseFlagshipInstalled=true;
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

window.MolPathRESROLE001CourseFlagship=Object.freeze({
  base:'v2.5.0b+METHOD_FOCUS+MET_COURSE_5of5+LAB_RUN_001+LAB_PRE_001+RES_IMPL_001+RES_ETH_002',
  caseId:CASE_ID,
  assetCount:7,
  phaseGating:{project_idea:[1],hypothesis_after_choice:[2],methods:[3,4],analysis:[5],feedback:[6],post_completion:[7]},
  signaturePromotion:false,
  courseFlagship:true,
  logicChanges:false,
  courseProgress:'23/23',
  modalEscaper:'v250b_asset_modal_hotfix.js escaper-v2'
});
})();
