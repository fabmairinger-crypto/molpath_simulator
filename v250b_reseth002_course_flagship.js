/* MolPath Simulator v2.5.0b — RES_ETH_002 Course Flagship Layer (delta)
   Scope: RES_ETH_002_v1_3 only.
   Curates the Research-WES incidental BRCA2 finding -> consent/policy -> evidence review -> governance -> diagnostic confirmation -> counseling -> audit closure teaching path.
   IMPORTANT: Course Flagship quality level only — this patch does NOT promote the case to Signature Case.
   Existing scoring IDs, correctness semantics and research workflow navigation are preserved.
*/
(function(){
'use strict';
const CASE_ID='RES_ETH_002_v1_3';
const ASSETS=Object.freeze({
  research:'assets/res_eth_002/research_wes_brca2_incidental_finding_001.png',
  consent:'assets/res_eth_002/consent_return_of_results_policy_001.png',
  evidence:'assets/res_eth_002/variant_evidence_research_vs_clinical_001.png',
  governance:'assets/res_eth_002/governance_decision_board_001.png',
  confirm:'assets/res_eth_002/diagnostic_germline_confirmation_001.png',
  counseling:'assets/res_eth_002/genetic_counseling_return_of_results_001.png',
  closure:'assets/res_eth_002/final_governance_audit_closure_001.png'
});
window.MolPathRESETH002CourseFlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function complete(){try{return !!caseIsComplete()}catch(_){return !!(state?.finalized||state?.research?.finalized)}}
function E(x){
  try{return esc(x==null?'':String(x))}
  catch(_){return String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
}
function asset(title,src,cls=''){
  return `<figure class="re2-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener" data-asset-title="${E(title)}"><img src="${src}" alt="${E(title)}"></a><div class="re2-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`;
}
function block(title,items,cls=''){
  return `<div class="re2-block ${cls}"><div class="re2-head"><h4>${E(title)}</h4><span class="re2-pill">COURSE FLAGSHIP</span></div><div class="re2-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`;
}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    /* Course Flagship != Signature Case. Do not touch c.signature_case. */
    c.course_flagship=true;
    c.deep_dive=true;
    c.title='Research-WES findet BRCA2-Nebenbefund → Return-of-Results, Bestätigung und Humangenetik';
    c.short='RES: Research finding → Return?';
    c.difficulty='advanced';
    c.estimated_time_min='15–18';
    c.tags=Array.from(new Set([].concat(c.tags||[],[
      'Course Flagship','RES','Ethik','Governance','WES','BRCA2','Keimbahn','Return of Results','Humangenetik','Einwilligung','Datenschutz'
    ]).filter(Boolean).filter(x=>x!=='Signature Case')));
    c.research_intro={
      'Fall-ID':'RES_ETH_002',
      'Projektidee':'In einem onkologischen Research-WES wird unerwartet BRCA2 c.5946delT p.(Ser1982Argfs*22) mit etwa 51 % VAF im Tumor entdeckt.',
      'Ausgangslage':'Die Research-Pipeline bewertet den Frameshift als hochrelevant und möglicherweise keimbahnständig. Der Datensatz ist jedoch ausdrücklich Research Use Only und nicht für klinische Befundung validiert.',
      'Kernentscheidung':'Darf oder muss dieser potenziell relevante Nebenbefund zurückgemeldet werden – und welcher kontrollierte Pfad ist dafür erforderlich?',
      'Problem':'Actionability und starke Pathogenitätsevidenz machen einen Research-Fund noch nicht automatisch rückmeldefähig. Consent, Governance, klinische Bestätigung, Datenschutz und humangenetische Beratung müssen zusammenpassen.'
    };
    c.research_context={
      'Research finding':'Tumor-WES, BRCA2 c.5946delT, Frameshift/LoF, VAF ca. 51 %, gute Coverage; Research-Interpretation: starke Evidenz für Pathogenität, mögliche Keimbahnherkunft.',
      'Consent':'Teilnehmerin hat vorab in die Rückmeldung medizinisch relevanter Nebenbefunde eingewilligt, sofern die Return-of-Results-Policy erfüllt ist; Recht auf Nichtwissen/Widerruf ist dokumentiert.',
      'Governance':'Research-Ergebnisse werden nicht direkt zurückgegeben. Vor Kontakt sind Policy-Check, autorisierte Reidentifikation, diagnostische Bestätigung und ein definierter humangenetischer Beratungsweg erforderlich.',
      'Ziel':'Aus einem potenziell relevanten Research-Signal wird nur über einen nachvollziehbaren, klinisch validierten und patientenzentrierten Prozess ein rückmeldefähiger Befund.'
    };

    const hyp=Object.fromEntries((c.hypothesis_options||[]).map(x=>[x.id,x]));
    if(hyp.start_vague){hyp.start_vague.label='Den Research-WES-Befund direkt als klinisch relevanten BRCA2-Keimbahnbefund behandeln und die Patientin zeitnah informieren.';hyp.start_vague.feedback='Falsch: Research-Annotation, Pathogenität und Keimbahnstatus sind getrennte Evidenzstufen; direkte Rückmeldung ohne Policy und Bestätigung kann schaden.'}
    if(hyp.structured){hyp.structured.label='Vor jeder Rückmeldung Consent/Return-of-Results-Policy, Governance, technische Evidenz, klinische Bestätigung und humangenetischen Beratungsweg prüfen.';hyp.structured.feedback='Optimal: Return-of-Results ist ein vorab definierter Prozess und keine spontane Reaktion auf einen auffälligen VCF-Eintrag.'}
    if(hyp.more_data){hyp.more_data.label='Den Befund zunächst nur sammeln und später entscheiden, ob und wie relevante Nebenbefunde zurückgegeben werden.';hyp.more_data.feedback='Teilweise verständlich, aber zu spät: Rückmeldepolicy, Consent und Verantwortlichkeiten müssen vor Auftreten des Nebenbefunds geregelt sein.'}

    const pico=Object.fromEntries((c.pico_options||[]).map(x=>[x.id,x]));
    if(pico.vague){pico.vague.label='P: alle auffälligen WES-Varianten; I: spontane Einzelfallentscheidung; C: keine; O: Rückgabe, wenn der Befund wichtig wirkt.';pico.vague.feedback='Zu vage: Ohne definierte Return-Kriterien drohen inkonsistente, nicht auditierbare Entscheidungen.'}
    if(pico.specific){pico.specific.label='P: Teilnehmende mit vorab dokumentiertem RoR-Consent; I: standardisierter Review- und Bestätigungspfad; C: nicht erfüllte Policy-Kriterien; O: regelkonforme Bestätigung, Beratung, Rückmeldung und Auditierbarkeit.';pico.specific.feedback='Gut: Die Rückmeldefrage wird als strukturierter Governance- und Validierungsprozess formuliert.'}
    if(pico.tech_only){pico.tech_only.label='PICO/Governance ist nicht nötig, wenn WES, ClinVar und Read-Level-QC technisch überzeugend sind.';pico.tech_only.feedback='Falsch: Technische Qualität ersetzt weder Einwilligung noch klinische Bestätigung oder qualifizierte Rückmeldung.'}

    const design=Object.fromEntries((c.design_options||[]).map(x=>[x.id,x]));
    if(design.cohort){design.cohort.label='Teilnehmerkreis, Consent-Version, erlaubte Reidentifikation und Geltungsbereich der Return-of-Results-Policy definieren';design.cohort.feedback='Richtig.'}
    if(design.endpoint){design.endpoint.label='Vorab definieren, welche Nebenbefunde als potenziell rückmeldefähig gelten und wann der Prozess als compliant abgeschlossen ist';design.endpoint.feedback='Richtig.'}
    if(design.resources){design.resources.label='Kapazität für diagnostische Bestätigung, Humangenetik, Counseling und dokumentiertes Follow-up sicherstellen';design.resources.feedback='Richtig.'}
    if(design.roles){design.roles.label='Forschungsteam, Molekularpathologie, Humangenetik, Ethics/Governance und Datenschutz mit klaren Verantwortlichkeiten festlegen';design.roles.feedback='Richtig.'}
    if(design.no_plan){design.no_plan.label='Return-of-Results-Regeln erst festlegen, wenn tatsächlich ein interessanter Nebenbefund auftaucht';design.no_plan.feedback='Falsch: Genau diese post-hoc Improvisation soll ein Governance-Framework verhindern.'}

    const meth=Object.fromEntries((c.method_options||[]).map(x=>[x.id,x]));
    if(meth.fit_method){meth.fit_method.label='Research-WES als Signalquelle behandeln; klinische Bestätigung nur mit geeignetem diagnostisch validiertem Assay und unabhängigem Material';meth.fit_method.feedback='Richtig.'}
    if(meth.orthogonal){meth.orthogonal.label='Read-Level-/Variant-QC prüfen und den Keimbahnverdacht in einer unabhängig entnommenen EDTA-Blutprobe diagnostisch und orthogonal bestätigen';meth.orthogonal.feedback='Richtig: Erst die unabhängige klinische Bestätigung kann einen reportierbaren Keimbahnbefund erzeugen.'}
    if(meth.qc){meth.qc.label='Sample Identity, Coverage/VAF, Annotation, Datenprovenienz, Reidentifikationsweg und Audit-Trail dokumentieren';meth.qc.feedback='Richtig.'}
    if(meth.overkill){meth.overkill.label='Alle als pathogenic annotierten Research-WES-Varianten direkt zurückgeben, damit kein potenziell wichtiger Befund verloren geht';meth.overkill.feedback='Falsch: Das übergeht Validierung, Consent, Kontext und die Gefahr unnötiger Fehlalarme.'}

    const ana=Object.fromEntries((c.analysis_options||[]).map(x=>[x.id,x]));
    if(ana.analysis_plan){ana.analysis_plan.label='Vor Datenzugriff festlegen, wie potenzielle Nebenbefunde evidenzbasiert geprüft, eskaliert, bestätigt und ggf. zurückgegeben werden';ana.analysis_plan.feedback='Richtig.'}
    if(ana.multiple){ana.multiple.label='Research-Interpretation, Variant-Pathogenität, Keimbahnherkunft und klinische Reportierbarkeit als getrennte Ebenen dokumentieren';ana.multiple.feedback='Richtig.'}
    if(ana.repro){ana.repro.label='Research record, Consent-Version, Governance-Votum, diagnostische Accession, Befund und Counseling-Notiz verknüpft und reproduzierbar archivieren';ana.repro.feedback='Richtig.'}
    if(ana.p_hack){ana.p_hack.label='Variantenlisten so lange durchsuchen, bis ein medizinisch besonders spektakulärer rückmeldefähiger Fund entsteht';ana.p_hack.feedback='Falsch: Das ist nicht der Zweck eines geregelten Return-of-Results-Prozesses.'}

    const pit=Object.fromEntries((c.pitfall_options||[]).map(x=>[x.id,x]));
    if(pit.harking){pit.harking.label='Warnsignal: Rückmeldekriterien oder Interpretation werden erst nach Kenntnis des konkreten spektakulären BRCA2-Funds angepasst';pit.harking.feedback='Richtig erkannt.'}
    if(pit.governance){pit.governance.label='Consent, Recht auf Nichtwissen, Datenschutz/Reidentifikation und Return-of-Results-Verantwortlichkeiten vorab klären';pit.governance.feedback='Richtig.'}
    if(pit.negative){pit.negative.label='Auch nicht rückmeldefähige oder nicht bestätigte Research-Funde als legitimes Ergebnis des Review-Prozesses dokumentieren';pit.negative.feedback='Richtig.'}
    if(pit.story_after){pit.story_after.label='Wenn der Befund wichtig genug wirkt, kann man die Rückmeldepolicy im Einzelfall nachträglich passend interpretieren';pit.story_after.feedback='Falsch: Policy und Consent müssen konsistent und nachvollziehbar angewendet werden.'}

    c.expected_output={
      'Kernentscheidung':'Research-Fund nicht direkt kommunizieren. Zuerst Consent/Policy und Governance prüfen, Pathogenität und Keimbahnstatus trennen, unabhängig diagnostisch bestätigen und erst danach im humangenetischen Beratungsweg zurückgeben.',
      'Empfohlener Projektpfad':'Research-WES-Fund → Consent/RoR-Policy → Evidence Review → Governance Board → unabhängige diagnostische Blutprobe → klinische Bestätigung → Post-Test-Counseling/Return → Audit Closure.',
      'Minimalstandard':'Dokumentiertes Opt-in/Recht auf Nichtwissen, autorisierte Reidentifikation, Variant-/Sample-QC, klinisch validierter Bestätigungstest, qualifizierte genetische Beratung, Datenschutz und vollständiger Audit-Trail.',
      'No-Go':'Research-VCF direkt als klinischen Keimbahnbefund reportieren, ~50 % Tumor-VAF als Keimbahnbeweis werten, Angehörige ohne Einwilligung kontaktieren oder unbestätigte Befunde in die Versorgung übernehmen.'
    };
    c.optimal_summary='Optimale Lösung: Der BRCA2-Research-Fund wird nicht direkt zurückgegeben. Die vorab dokumentierte Return-of-Results-Einwilligung erlaubt grundsätzlich die Rückmeldung medizinisch relevanter Nebenbefunde, aber erst nach Governance-Review und klinischer Bestätigung. Die unabhängige EDTA-Blutprobe bestätigt BRCA2 c.5946delT mit etwa 49 % VAF als heterozygote Keimbahnvariante; der diagnostische Befund wird anschließend in einer humangenetischen Post-Test-Beratung kontrolliert zurückgegeben. Research Record und klinischer Befund bleiben getrennt, der gesamte Prozess wird auditierbar geschlossen.';

    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=false;
        d.deep_dive_priority='course_flagship';
        d.title='Research-WES-Nebenbefund: BRCA2 von Research-Signal bis kontrollierter Rückmeldung';
        d.estimated_minutes_deep='15–18';
        d.opening_scene='Im Research-WES eines Tumors fällt BRCA2 c.5946delT p.(Ser1982Argfs*22) mit etwa 51 % VAF und überzeugender Read-Qualität auf. Die Annotation spricht stark für Pathogenität und eine mögliche Keimbahnherkunft. Gleichzeitig steht über dem Datensatz: RESEARCH USE ONLY – NOT FOR CLINICAL REPORTING. Im Team fällt die Frage: „Dürfen wir die Patientin jetzt informieren?“';
        d.case_briefing='Ihre Aufgabe ist, aus einem medizinisch relevanten Research-Signal einen ethisch, rechtlich und diagnostisch belastbaren Return-of-Results-Pfad zu machen. Die Teilnehmerin hat vorab in die Rückmeldung medizinisch relevanter Nebenbefunde eingewilligt, sofern die Studienpolicy erfüllt ist. Der Tumorbefund ist jedoch noch kein klinischer Keimbahnbefund. Sie müssen Pathogenität, Keimbahnstatus, Consent, Governance, Bestätigungsdiagnostik, Counseling und Dokumentation sauber trennen und wieder zusammenführen.';
        d.learning_objectives=[
          'Research finding und klinisch validierten genetischen Befund konsequent trennen.',
          'Variant-Pathogenität, Keimbahnherkunft und klinische Reportierbarkeit als unterschiedliche Fragen bewerten.',
          'Return-of-Results an vorab dokumentierten Consent, Recht auf Nichtwissen und Governance koppeln.',
          'Unabhängige diagnostische Bestätigung vor klinischer Rückgabe verlangen.',
          'Genetische Beratung, Datenschutz und Auditierbarkeit als Bestandteile des Rückmeldeprozesses verstehen.'
        ];
        d.context_cards=[
          {title:'Research-WES',content:'BRCA2 c.5946delT, Frameshift/LoF, Tumor-VAF ca. 51 %, gute Coverage; Research Use Only.',teaching_point:'Technische Plausibilität und Datenbankevidenz machen einen Research-Fund noch nicht klinisch reportierbar.'},
          {title:'Consent',content:'Dokumentiertes Opt-in für medizinisch relevante Nebenbefunde, sofern die institutionelle RoR-Policy erfüllt ist.',teaching_point:'Autonomie und Recht auf Nichtwissen werden vor dem Befund organisiert, nicht danach improvisiert.'},
          {title:'Governance',content:'Research-Ergebnisse dürfen nicht direkt zurückgegeben werden; Reidentifikation und Eskalation erfolgen nur im autorisierten Prozess.',teaching_point:'Das Board genehmigt den Abklärungspfad, nicht den klinischen Befund.'},
          {title:'Diagnostische Ebene',content:'Keimbahnstatus ist im Tumor allein unbestätigt; eine unabhängige diagnostische Probe ist erforderlich.',teaching_point:'~50 % VAF im Tumor ist ein Hinweis, kein Keimbahnbeweis.'}
        ];
        d.pre_results=[
          {title:'Research Evidence',content:'Frameshift/LoF in BRCA2; ClinVar/BRCA Exchange/LOVD unterstützen die medizinische Relevanz; gnomAD praktisch nicht beobachtet.'},
          {title:'Policy Status',content:'RoR-Consent v2.1 ist unterschrieben; Rückgabe nur nach Governance und klinischer Bestätigung.'},
          {title:'Current Status',content:'Möglicherweise keimbahnständig und hochrelevant – aber noch kein klinisch validierter, rückmeldefähiger Befund.'}
        ];
        d.material_or_resource_constraints=[
          'Die Teilnehmerin darf nicht durch einen unbestätigten Research-Befund unnötig alarmiert werden.',
          'Ein potenziell relevanter hereditärer Befund darf gleichzeitig nicht ohne dokumentierte Prüfung verloren gehen.',
          'Reidentifikation aus pseudonymisierten Research-Daten darf nur autorisiert und zweckgebunden erfolgen.',
          'Diagnostische Bestätigung, Humangenetik und Post-Test-Counseling müssen organisatorisch verfügbar sein.',
          'Research Record und klinischer Befund müssen als getrennte Provenienzketten erhalten bleiben.'
        ];
        d.reasoning_gate_upgrade=[
          {id:'meaning',type:'single_choice',prompt:'Was können Sie aus dem Research-WES aktuell sicher sagen?',options:[
            {id:'potential',label:'Es liegt ein technisch plausibler, medizinisch relevanter BRCA2-Research-Fund mit möglicher Keimbahnherkunft vor; Keimbahnstatus und klinische Reportierbarkeit sind noch unbestätigt.'},
            {id:'germline',label:'Die Patientin hat sicher eine pathogene BRCA2-Keimbahnvariante.'},
            {id:'somatic',label:'Die Variante ist sicher rein somatisch.'},
            {id:'report',label:'Die Research-Annotation darf direkt als klinischer Befund übernommen werden.'}
          ],correct:['potential'],rationale:'Pathogenitätsevidenz, Keimbahnherkunft und klinische Reportierbarkeit sind getrennte Ebenen.'},
          {id:'next',type:'multi_select',prompt:'Welche Schritte gehören vor die tatsächliche Rückgabe?',options:[
            {id:'consent',label:'Consent, Recht auf Nichtwissen und Return-of-Results-Policy prüfen.'},
            {id:'evidence',label:'Variant-/Sample-QC und Evidenz fachlich re-evaluieren.'},
            {id:'governance',label:'Governance-Review und autorisierten Reidentifikations-/Eskalationspfad nutzen.'},
            {id:'confirm',label:'Unabhängige klinische Keimbahndiagnostik durchführen.'},
            {id:'counsel',label:'Bestätigten Befund im humangenetischen Beratungsweg zurückgeben.'},
            {id:'mail',label:'Research-VCF unmittelbar an die Patientin mailen.'}
          ],correct:['consent','evidence','governance','confirm','counsel'],rationale:'Eine verantwortbare Rückgabe braucht Consent, Evidenzprüfung, Governance, Diagnostik und qualifizierte Kommunikation.'},
          {id:'vaf',type:'single_choice',prompt:'Wie ist die Tumor-VAF von etwa 51 % zu interpretieren?',options:[
            {id:'hint',label:'Sie ist mit Heterozygotie vereinbar und begründet einen Keimbahnverdacht, beweist aber im Tumorgewebe keine konstitutionelle Keimbahnherkunft.'},
            {id:'proof',label:'51 % VAF beweist unabhängig vom Material eine Keimbahnvariante.'},
            {id:'benign',label:'Eine VAF nahe 50 % spricht gegen Pathogenität.'},
            {id:'irrelevant',label:'VAF spielt bei der biologischen Herkunft keinerlei Rolle.'}
          ],correct:['hint'],rationale:'Tumorbiologie, Kopienzahl und klonale Zusammensetzung können VAFs beeinflussen; die unabhängige Normalprobe entscheidet.'}
        ];
        d.decision_task='Entwerfen Sie den minimalen Return-of-Results-Pfad vom BRCA2-Research-Fund bis zu einer möglichen klinischen Rückgabe und markieren Sie ausdrücklich, an welchen Stellen noch nicht mit der Teilnehmerin über einen bestätigten Keimbahnbefund gesprochen werden darf.';
        d.expected_path=[
          'Research-Fund als potenziell relevanten Nebenbefund markieren, nicht als klinische Diagnose.',
          'Consent-Version, Recht auf Nichtwissen und projektspezifische Return-of-Results-Policy prüfen.',
          'Research-QC, Sample Identity, Annotation und Pathogenitätsevidenz re-evaluieren.',
          'Governance Board / autorisierte Reidentifikation und Verantwortlichkeiten aktivieren.',
          'Teilnehmerin zunächst zum Beratungs-/Bestätigungsprozess kontaktieren, ohne unbestätigten Keimbahnclaim.',
          'Unabhängige diagnostische EDTA-Blutprobe mit validiertem Assay und orthogonaler Bestätigung untersuchen.',
          'Bei bestätigter Keimbahnvariante diagnostischen Befund finalisieren.',
          'Post-Test-Counseling und kontrollierte Rückmeldung entsprechend dokumentierter Präferenz durchführen.',
          'Research Record, diagnostischen Befund, Counseling und RoR-Registry auditierbar verknüpfen.'
        ];
        d.acceptable_alternatives=[
          'Ein lokales Genetics/Secondary-Findings-Board kann den Governance-Review übernehmen, wenn Rollen und Kriterien vorab definiert sind.',
          'Bei unklarer oder widersprüchlicher Einwilligung ist formale ethisch/rechtliche Klärung vor Reidentifikation/Rückgabe angemessen.'
        ];
        d.low_value_traps=[
          {label:'ClinVar = klinischer Befund',why_bad:'Datenbankkonsens unterstützt Pathogenität, ersetzt aber weder Keimbahnbeweis noch diagnostische Validierung.'},
          {label:'Tumor-VAF 50 % = Keimbahn',why_bad:'Eine tumorbasierte VAF kann eine Keimbahnvariante vermuten lassen, beweist sie aber nicht.'},
          {label:'Actionable = automatisch returnable',why_bad:'Rückgabe hängt zusätzlich von Consent, Policy, Bestätigung, Counseling und Governance ab.'},
          {label:'Angehörige direkt informieren',why_bad:'Familienrelevanz begründet ein Beratungs-/Angebotsszenario, keine automatische Weitergabe ohne Einwilligung.'}
        ];
        d.twist={title:'Der Keimbahnverdacht bestätigt sich – aber erst der Prozess macht ihn rückmeldefähig',content:'Die unabhängig entnommene EDTA-Blutprobe bestätigt BRCA2 c.5946delT mit etwa 49 % Allelfraktion; Sanger bestätigt den Befund orthogonal. Erst jetzt ist die Keimbahnherkunft diagnostisch bestätigt und ein finaler klinischer Befund möglich.',why_critical:'Der Fall zeigt, dass ein Research-Fund durchaus „richtig“ sein kann und dennoch vor Bestätigung nicht klinisch kommuniziert werden darf. Sicherheit entsteht durch die Evidenz- und Governance-Kette, nicht durch die Dramatik des Fundes.'};
        d.result_packages=[
          {id:'optimal',title:'Policy + Governance + diagnostische Bestätigung + Counseling',result:'Der Research-Fund wird nicht direkt zurückgegeben. Nach Consent-/Policy-Check, Governance und unabhängiger diagnostischer Bestätigung wird die pathogene BRCA2-Keimbahnvariante im humangenetischen Beratungsweg kontrolliert mitgeteilt; Audit-Trail ist vollständig.',feedback:'Saubere Trennung von Research, Diagnostik und patientenzentrierter Rückgabe.'},
          {id:'incomplete',title:'Diagnostisch bestätigt, aber Governance/Consent unklar',result:'Die Variante ist technisch bestätigt, doch Rückmeldeberechtigung, Reidentifikation und Verantwortlichkeiten sind nicht belastbar dokumentiert.',feedback:'Technische Richtigkeit allein macht einen Return-of-Results-Prozess nicht compliant.'},
          {id:'wrong',title:'Research-VCF wird direkt zur Diagnose',result:'Die Patientin erhält vor Governance und unabhängiger Bestätigung die Aussage einer BRCA2-Keimbahnvariante.',feedback:'Kritischer Fehler: Research-Annotation wird mit klinisch validierter Diagnostik verwechselt.'}
        ];
        d.followup_logic=[
          {trigger:'Consent/Policy erfüllt, klinische Bestätigung noch offen',action:'Governance-gesteuerten Beratungs- und Bestätigungspfad starten; noch keinen bestätigten Keimbahnclaim zurückgeben.',consequence:'Autonomie und Patientensicherheit bleiben gewahrt.'},
          {trigger:'Unabhängige Diagnostik bestätigt BRCA2-Keimbahnvariante',action:'Finalen diagnostischen Befund autorisieren und Post-Test-Counseling/Return-of-Results durchführen.',consequence:'Research-Signal wird kontrolliert in Versorgung überführt.'},
          {trigger:'Bestätigung negativ oder nicht eindeutig',action:'Kein klinischer Keimbahnbefund; Research-Fund entsprechend zurückstufen und Governance-Entscheidung dokumentieren.',consequence:'Unbestätigte Signale werden nicht überreportiert.'}
        ];
        d.debrief_points=[
          'Research finding ist keine klinische Diagnose – selbst wenn die Variante später bestätigt wird.',
          'Pathogenität, Keimbahnstatus und Rückmeldefähigkeit sind drei getrennte Fragen.',
          'Tumor-VAF um 50 % begründet einen Verdacht, aber keinen Keimbahnbeweis.',
          'Return-of-Results braucht vorab Consent, Governance und einen autorisierten Reidentifikationsweg.',
          'Unabhängige diagnostische Bestätigung und genetische Beratung sind Bestandteile der Evidenz- und Kommunikationskette.'
        ];
        d.instructor_notes={
          model_answer:'Ich behandle BRCA2 c.5946delT zunächst als hochrelevanten Research-Nebenbefund, nicht als klinischen Keimbahnbefund. Vor Patientenkontakt über ein bestätigtes Ergebnis prüfe ich Consent/RoR-Policy, QC/Evidenz und Governance. Der Board-Beschluss erlaubt nur den Abklärungspfad. Eine unabhängige EDTA-Blutprobe wird mit klinisch validiertem Assay und Sanger untersucht und bestätigt die Variante mit ~49 % als heterozygote Keimbahnvariante. Erst danach erfolgt der finale diagnostische Befund und die kontrollierte Post-Test-Rückmeldung in der Humangenetik. Alle Records bleiben getrennt provenance-sicher und werden im Audit-Trail verknüpft.',
          scoring_focus:['research vs clinical','consent/return policy','germline confirmation','governance','genetic counseling','audit trail'],
          discussion_questions:['Welche Nebenbefunde sollte eine WES-Studie vorab in ihrer Return-of-Results-Policy definieren?','Wie viel Evidenz ist nötig, bevor ein Research-Signal überhaupt in einen Bestätigungspfad eskaliert wird?','Welche Informationen dürfen Angehörige ohne ausdrückliche Einwilligung erhalten?']
        };
        d.report_additions=['Course Flagship: sieben phasengekoppelte Originalansichten','Referenzpfad: Research WES → Consent/Policy → Evidence Review → Governance → Diagnostic Confirmation → Counseling → Audit Closure','Finaler Status: diagnostisch bestätigte BRCA2-Keimbahnvariante kontrolliert zurückgegeben; RoR-Prozess policy-compliant geschlossen.'];
      }
    }catch(_){ }
  }catch(e){console.error('[RES_ETH_002 Course Flagship] case patch failed',e)}
}

function addonForCurrentStep(){
  if(!active()||!state)return '';
  switch(state.step){
    case 'project_idea':
      return block('Research-WES – medizinisch relevant, aber ausdrücklich noch kein klinischer Befund',[
        asset('Research-WES Variant Review · BRCA2 c.5946delT · possible germline · Research Use Only',ASSETS.research,'wide')
      ]);
    case 'hypothesis':
      if(!state.research?.hypothesis)return '';
      return block('Consent & Return-of-Results – der Rückmelderahmen muss vor dem Einzelfall stehen',[
        asset('Studienprotokoll, Einwilligung und Return-of-Results-Policy · dokumentiertes Opt-in',ASSETS.consent,'wide')
      ]);
    case 'methods':
      return block('Evidenzprüfung und Governance – Pathogenität ist nicht gleich Keimbahnstatus',[
        asset('Variant Evidence · Research Interpretation vs. Clinical Classification',ASSETS.evidence,'wide'),
        asset('Ethics & Governance Board · CONDITIONAL PROCEED für den Bestätigungspfad',ASSETS.governance,'wide')
      ],'re2-governance');
    case 'analysis':
      return block('Unabhängige klinische Bestätigung – erst jetzt wird der Keimbahnstatus belastbar',[
        asset('Diagnostische EDTA-Blutprobe · NGS + Sanger · BRCA2 germline confirmed',ASSETS.confirm,'wide')
      ],'re2-confirm');
    case 'feedback': {
      let out=block('Genetische Beratung & kontrollierte Rückmeldung',[
        asset('Post-Test-Counseling · patientenzentrierte Return-of-Results-Kommunikation',ASSETS.counseling,'wide')
      ],'re2-counsel');
      if(complete()) out+=block('Final Governance – Audit Trail & Case Closure',[
        asset('Policy Compliance, Linked Records & Audit Closure · CASE CLOSED',ASSETS.closure,'wide')
      ],'re2-closure');
      return out;
    }
    default:return '';
  }
}

function styles(){
  if(document.getElementById('re2CourseFlagshipStyles'))return;
  const s=document.createElement('style');s.id='re2CourseFlagshipStyles';s.textContent=`
.re2-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.re2-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.re2-head h4{margin:0;color:var(--primary)}
.re2-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#6b2fa0;border:1px solid #dec9ef;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.re2-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.re2-grid.single{grid-template-columns:1fr}.re2-asset.wide{grid-column:1/-1}
.re2-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.re2-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.re2-asset a{display:block;background:#f2f6f9}.re2-asset img{width:100%;height:auto;display:block;object-fit:contain}.re2-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.re2-governance{border-color:#d1c4e9;background:linear-gradient(180deg,#fff,#faf7ff)}.re2-confirm{border-color:#b4d8c4;background:linear-gradient(180deg,#fff,#f6fff9)}.re2-counsel{border-color:#bfd8e8;background:linear-gradient(180deg,#fff,#f5fbff)}.re2-closure{border-color:#9ab7d7;background:linear-gradient(180deg,#fff,#f3f8ff)}
@media(max-width:1000px){.re2-grid{grid-template-columns:1fr}.re2-asset.wide{grid-column:auto}}
`;document.head.appendChild(s);
}

function install(){
  if(window.__MolPathRESETH002CourseFlagshipInstalled)return;
  window.__MolPathRESETH002CourseFlagshipInstalled=true;
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

window.MolPathRESETH002CourseFlagship=Object.freeze({
  base:'v2.5.0b+METHOD_FOCUS+MET_COURSE_5of5+LAB_RUN_001+LAB_PRE_001+RES_IMPL_001',
  caseId:CASE_ID,
  assetCount:7,
  phaseGating:{project_idea:[1],hypothesis_after_choice:[2],methods:[3,4],analysis:[5],feedback:[6],post_completion:[7]},
  signaturePromotion:false,
  courseFlagship:true,
  logicChanges:false,
  modalEscaper:'v250b_asset_modal_hotfix.js escaper-v2'
});
})();
