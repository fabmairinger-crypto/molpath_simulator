/* MolPath Simulator v2.5.0b — LAB_PRE_001 Course Flagship Layer (delta)
   Scope: LAB_PRE_001_v1_3 only.
   Adds the curated unlabeled-primary-container teaching path and seven approved training assets.
   IMPORTANT: Course Flagship quality level only — this patch does NOT promote the case to Signature Case.
   Existing scoring IDs and LAB workflow semantics are retained.
*/
(function(){
'use strict';
const CASE_ID='LAB_PRE_001_v1_3';
const ASSETS=Object.freeze({
  intake:'assets/lab_pre_001/specimen_intake_unlabeled_edta_001.png',
  hardStop:'assets/lab_pre_001/lims_identity_hard_stop_001.png',
  communication:'assets/lab_pre_001/request_communication_plausibility_001.png',
  quarantine:'assets/lab_pre_001/quarantine_chain_of_custody_001.png',
  rca:'assets/lab_pre_001/root_cause_process_reconstruction_001.png',
  recollection:'assets/lab_pre_001/recollection_identity_verified_001.png',
  closure:'assets/lab_pre_001/deviation_capa_final_disposition_001.png'
});
window.MolPathLABPRE001CourseFlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function complete(){try{return !!(state?.finalized||state?.lab?.finalized||caseIsComplete())}catch(_){return false}}
function hasRoot(id){try{return !!state?.lab?.rootCause?.has(id)}catch(_){return false}}
function hasCapa(id){try{return !!state?.lab?.capa?.has(id)}catch(_){return false}}
function E(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function asset(title,src,cls=''){
  return `<figure class="lp1-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" data-asset-title="${E(title)}"><img src="${src}" alt="${E(title)}"></a><div class="lp1-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`;
}
function block(title,items,cls=''){
  return `<div class="lp1-block ${cls}"><div class="lp1-head"><h4>${E(title)}</h4><span class="lp1-pill">COURSE FLAGSHIP</span></div><div class="lp1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`;
}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    /* Course Flagship != Signature Case. Do not promote c.signature_case. */
    c.course_flagship=true;
    c.deep_dive=true;
    c.title='Unbeschriftetes Primärgefäß → Identität nicht konstruieren, Probe sperren und sicher neu gewinnen';
    c.short='LAB PRE: unbeschriftetes Primärgefäß';
    c.difficulty='intermediate';
    c.estimated_time_min='10–15';
    c.tags=Array.from(new Set([].concat(c.tags||[],[
      'Course Flagship','Methods Focus','Labor','QM','Präanalytik','Patientenidentität','Traceability','Quarantäne','CAPA','Patientensicherheit'
    ]).filter(Boolean).filter(x=>x!=='Signature Case')));
    c.qc_title='Primärgefäß unbeschriftet – Begleitdaten plausibel, Identität trotzdem nicht gesichert';
    c.run_overview={
      'Fall-ID':'LAB_PRE_001',
      'Modus':'Labor/QM-Cockpit',
      'Material':'EDTA-Vollblut; Primärgefäß ohne Patientenname, Geburtsdatum oder Barcode.',
      'Begleitdaten':'Transportbeutel und Anforderungsschein stimmen vollständig überein.',
      'Kernproblem':'Die Begleitdokumentation identifiziert den Beutel und den Auftrag – nicht das unbeschriftete Primärgefäß.',
      'Kernentscheidung':'Probe nicht nachbeschriften oder analysieren; Identitätsproblem dokumentieren, Quarantäne einleiten und bei neu gewinnbarer Blutprobe eine korrekt identifizierte Neuentnahme anfordern.'
    };
    c.qc_event={
      'Ereignis':'Ein unbeschriftetes EDTA-Primärgefäß trifft in einem korrekt beschrifteten Transportbeutel mit passendem Auftrag ein.',
      'Plausibilität':'Station und Auftrag sprechen dafür, dass nur diese eine EDTA-Probe zu diesem Patienten versandt wurde.',
      'Risiko':'Eine falsche Zuordnung könnte einen molekularen Befund dem falschen Patienten zuordnen – ein nicht akzeptables Patientensicherheitsrisiko.',
      'Hard Stop':'Die Identität des Primärgefäßes kann retrospektiv nicht durch Telefonat, Erinnerung oder Außenverpackung hergestellt werden.',
      'Kernfrage':'Wie wird die Probe sicher gesperrt, wie wird der Vorfall rekonstruiert und wie wird der Prozess so korrigiert, dass er nicht erneut auftritt?'
    };

    const byId=Object.fromEntries((c.decision_options||[]).map(x=>[x.id,x]));
    if(byId.release_fast){
      byId.release_fast.label='Probe nach telefonischer Bestätigung der Station nachbeschriften und sofort weiterbearbeiten.';
      byId.release_fast.feedback='Falsch: Eine telefonische Plausibilitätsaussage kann die Identität eines unbeschrifteten Primärgefäßes nicht nachträglich herstellen.';
    }
    if(byId.comment_only){
      byId.comment_only.label='Probe weiterbearbeiten und die fehlende Primärgefäß-Kennzeichnung lediglich als Kommentar dokumentieren.';
      byId.comment_only.feedback='Nicht ausreichend: Dokumentation allein beseitigt das Identitätsrisiko nicht. Die Probe bleibt nicht akzeptabel.';
    }
    if(byId.risk_based_stop){
      byId.risk_based_stop.label='Probe sofort in Quarantäne sperren, Senderkontakt nur zur Sachverhaltsklärung dokumentieren, Neuentnahme anfordern und die neue Probe separat accessionieren.';
      byId.risk_based_stop.feedback='Optimal: Plausibilität wird dokumentiert, aber nicht mit Identität verwechselt. Die ursprüngliche Probe bleibt nicht akzeptabel; die Patientenversorgung erfolgt über eine neue korrekt identifizierte Probe.';
    }
    if(byId.delete_problem){
      byId.delete_problem.label='Unbeschriftetes Röhrchen verwerfen, ohne Abweichung/Chain-of-Custody zu dokumentieren, und nur die Neuentnahme bearbeiten.';
      byId.delete_problem.feedback='Falsch: Die Patientenversorgung wird zwar durch eine Neuentnahme geschützt, aber der Vorfall wäre nicht rückverfolgbar und die Prozessursache bliebe unbehandelt.';
    }

    const root=Object.fromEntries((c.root_cause_options||[]).map(x=>[x.id,x]));
    if(root.traceability){
      root.traceability.label='Entnahme → Bedside-Kennzeichnung → Übergabe → Verpackung → Transport → Probeneingang als Chain-of-Custody rekonstruieren.';
      root.traceability.feedback='Richtig: Der Prozessbruch wird erst durch die zeitliche Rekonstruktion und die versagten Kontrollbarrieren belastbar.';
    }
    if(root.sop_version){
      root.sop_version.label='Prüfen, ob Bedside-Labeling und ein verpflichtender Pre-transport-Check technisch/organisatorisch als Hard Stop hinterlegt sind.';
      root.sop_version.feedback='Richtig: Eine SOP ist nur wirksam, wenn der Workflow das Verlassen bzw. Verpacken einer unbeschrifteten Probe tatsächlich verhindert.';
    }
    if(root.technical_repeat){
      root.technical_repeat.label='Eine neue EDTA-Probe mit zwei Identifikatoren am Patienten entnehmen, sofort beschriften, gegen Auftrag/Armband prüfen und als neue Accession erfassen.';
      root.technical_repeat.feedback='Richtig: Die alte Probe wird nicht gerettet; Patientensicherheit wird durch eine vollständig neu identifizierte Probe hergestellt.';
    }
    if(root.communication){
      root.communication.label='Senderaussagen („das kann nur Herr K. sein“) dokumentieren, aber ausdrücklich als Plausibilitätsinformation und nicht als Identitätsnachweis behandeln.';
      root.communication.feedback='Richtig: Kommunikation klärt den Sachverhalt, ersetzt jedoch niemals die erforderliche Kennzeichnung des Primärgefäßes.';
    }
    if(root.ignore_pressure)root.ignore_pressure.feedback='Falsch: Auch bei dringlicher Diagnostik darf aus Plausibilität keine Patientenidentität konstruiert werden.';
    if(root.verbal_only)root.verbal_only.feedback='Falsch: Der Vorfall, die Sperre, die Kommunikation und die Neuentnahme müssen auditfest im LIMS/QM-System dokumentiert sein.';

    const capa=Object.fromEntries((c.capa_components||[]).map(x=>[x.id,x]));
    if(capa.deviation)capa.deviation.label='Deviation zur ursprünglichen Accession mit fehlender Primärgefäß-Kennzeichnung und finaler Verwerfung dokumentieren.';
    if(capa.immediate)capa.immediate.label='Sofortmaßnahme: Probe in physische und digitale Quarantäne; kein Öffnen, Aliquotieren, Extrahieren oder Analysieren.';
    if(capa.rootcause)capa.rootcause.label='RCA: Unterbrechung des Bedside-Labelings plus fehlender verpflichtender Kontrollpunkt vor Übergabe/Transport.';
    if(capa.corrective)capa.corrective.label='Correction: korrekt beschriftete Neuentnahme als neue Accession; ursprüngliche Probe bleibt dauerhaft nicht akzeptabel.';
    if(capa.preventive)capa.preventive.label='Prävention: Bedside-Label-Hard-Stop, Pre-transport-Check, robuste Labeldrucker-Verfügbarkeit, SOP-Update und gezielte Schulung.';
    if(capa.effectiveness)capa.effectiveness.label='Wirksamkeitscheck terminieren: 0 unbeschriftete Primärgefäße und 100 % dokumentierte Pre-transport-Checks in definierter Stichprobe.';

    c.optimal_summary='Optimale Lösung: Das unbeschriftete EDTA-Primärgefäß wird unmittelbar in physische und digitale Quarantäne versetzt und nicht analysiert. Auftrag, Transportbeutel und telefonische Aussagen können die Zuordnung plausibel machen, stellen aber keine Identität des Primärgefäßes her. Die Station wird zur Sachverhaltsklärung kontaktiert, eine neue korrekt beschriftete EDTA-Probe wird als eigene Accession angefordert und nach Zwei-Identifier-/Barcode-Prüfung akzeptiert. Die RCA zeigt zwei versagte Barrieren: Bedside-Kennzeichnung wurde unterbrochen und der Workflow erlaubte die Übergabe/Verpackung ohne verpflichtenden Primärgefäß-Check. Die Deviation wird geschlossen; CAPA bleibt bis zur Wirksamkeitsprüfung offen.';

    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=false;
        d.deep_dive_priority='course_flagship';
        d.title='Unbeschriftetes Primärgefäß: Plausibilität ist kein Identitätsnachweis';
        d.opening_scene='Im Probeneingang liegt ein EDTA-Röhrchen ohne Name, Geburtsdatum oder Barcode. Transportbeutel und Auftrag sind dagegen vollständig und konsistent beschriftet. Die Station sagt am Telefon: „Das kann nur Herr K. sein.“';
        d.case_briefing='Der Fall ist bewusst verführerisch: Alle Begleitinformationen passen. Trotzdem lässt sich die Identität des Primärgefäßes nicht retrospektiv erzeugen. Die Probe ist neu gewinnbar; Patientensicherheit hat Vorrang vor einer plausiblen, aber nicht belegten Zuordnung.';
        d.learning_objectives=[
          'Primärgefäß-Identität von Plausibilität der Begleitdokumentation unterscheiden.',
          'Unbeschriftete neu gewinnbare Proben als Hard Stop behandeln und nicht nachträglich labeln.',
          'Quarantäne und Chain-of-Custody physisch und digital auditfest dokumentieren.',
          'RCA auf versagte Prozessbarrieren statt auf individuelle Schuldzuweisung ausrichten.',
          'Correction der Patientenversorgung von CAPA des zugrunde liegenden Prozessproblems trennen.'
        ];
        d.context_cards=[
          {title:'Begleitdaten passen',content:'Auftrag und Transportbeutel tragen dieselben Patientendaten und dieselbe Auftrags-ID.',teaching_point:'Das identifiziert die Begleitdokumente, nicht das Primärgefäß.'},
          {title:'Station ist sich sicher',content:'Telefonisch heißt es: „Heute wurde nur diese eine Probe geschickt; das kann nur Herr K. sein.“',teaching_point:'Erinnerung und Plausibilität ersetzen keine Kennzeichnung am Entnahmeort.'},
          {title:'Probe ist neu gewinnbar',content:'Es handelt sich um EDTA-Vollblut; eine sichere Neuentnahme ist möglich.',teaching_point:'Damit besteht kein vertretbarer Grund, eine nicht gesicherte Identität zu akzeptieren.'}
        ];
        d.pre_results=[
          {title:'Primärgefäß',content:'EDTA-Vollblut, intakt, aber ohne Patientenname, Geburtsdatum oder Barcode.'},
          {title:'Transportbeutel',content:'Beschriftet; Patientendaten und Auftrags-ID stimmen mit dem Anforderungsschein überein.'},
          {title:'Auftrag',content:'Molekularpathologische DNA-NGS-Anforderung aus EDTA-Vollblut; vollständig dokumentiert.'}
        ];
        d.reasoning_gates=[
          {id:'identity_gate',question:'Kann ein Telefonat die Identität des unbeschrifteten Primärgefäßes bestätigen?',expected:'Nein. Es kann Plausibilität dokumentieren, aber die fehlende Primärgefäß-Kennzeichnung nicht ersetzen.'},
          {id:'quarantine_gate',question:'Was geschieht mit der ursprünglichen Probe?',expected:'Physische und digitale Quarantäne; kein Öffnen, Aliquotieren, Extrahieren oder Analysieren; spätere finale Disposition dokumentieren.'},
          {id:'replacement_gate',question:'Wie wird der Patientenfall sicher weitergeführt?',expected:'Neue EDTA-Probe mit zwei Identifikatoren und Barcode am Patienten gewinnen und als separate neue Accession erfassen.'}
        ];
        d.acceptable_alternatives=[
          'Bei nicht oder nur unter erheblichem Risiko neu gewinnbaren Materialien können lokale SOPs eine streng definierte ärztlich verantwortete Ausnahmebewertung vorsehen; dieser Flagship-Fall betrifft bewusst problemlos neu gewinnbares EDTA-Blut.',
          'Die konkrete Quarantäne-Aufbewahrungsdauer und der Zeitpunkt der Verwerfung richten sich nach lokaler SOP; die Probe bleibt bis zur dokumentierten finalen Disposition nicht verwendbar.'
        ];
        d.twist={title:'„Das kann nur Herr K. sein.“',content:'Die Station liefert mehrfach eine hoch plausible Zuordnung, Auftrag und Beutel passen ebenfalls.',why_critical:'Je plausibler die Geschichte wirkt, desto leichter wird aus einer Vermutung eine scheinbare Identität. Genau hier muss der Prozess-Hard-Stop greifen.'};
        d.result_packages=[
          {id:'optimal',title:'Quarantäne → Neuentnahme → RCA → CAPA',result:'Ursprüngliche Probe nicht analysiert und verworfen; neue Probe korrekt identifiziert und separat accessioniert. RCA identifiziert zwei versagte Barrieren; CAPA bleibt bis zur Wirksamkeitskontrolle offen.',feedback:'Vollständige Trennung von Patientensicherheit, Prozessrekonstruktion und Systemprävention.'},
          {id:'relabel',title:'Telefonisch bestätigt und nachbeschriftet',result:'Die Plausibilitätsaussage wird fälschlich als Identitätsnachweis verwendet.',feedback:'Nicht akzeptabel bei einer unbeschrifteten neu gewinnbaren Primärprobe.'},
          {id:'discard_no_qm',title:'Probe verworfen, Vorfall nicht aufgearbeitet',result:'Patient akut geschützt, aber Prozessursache und Wiederholungsrisiko bleiben bestehen.',feedback:'Correction ohne RCA/CAPA ist QM-seitig unvollständig.'}
        ];
        d.followup_logic=[
          {trigger:'Neue Probe korrekt beschriftet und Identität verifiziert',action:'Neue Accession akzeptieren und regulären Präanalytik-/Analytikprozess starten',consequence:'Patientenversorgung ist wieder sicher möglich.'},
          {trigger:'RCA zeigt fehlenden Bedside-/Pre-transport-Hard-Stop',action:'CAPA mit Workflow-, SOP-, Technik- und Schulungsmaßnahmen eröffnen',consequence:'Deviation kann geschlossen werden; CAPA bleibt bis Wirksamkeitsnachweis offen.'}
        ];
        d.debrief_points=[
          'Plausibilität ist kein Identitätsnachweis.',
          'Unbeschriftete neu gewinnbare Primärproben dürfen nicht retrospektiv nachbeschriftet werden.',
          'Quarantäne ist ein kontrollierter physischer und digitaler Zustand, kein bloßes LIMS-Label.',
          'Die neue Probe löst den Patientenfall; die CAPA löst das Prozessproblem.'
        ];
        d.instructor_notes={
          model_answer:'Ursprüngliches EDTA-Röhrchen sofort in Quarantäne. Auftrag, Beutel und Telefonat dokumentieren, aber nicht zur Identitätskonstruktion verwenden. Neuentnahme als neue Accession mit zwei Identifikatoren/Barcode. RCA rekonstruiert Entnahme, Bedside-Labeling, Übergabe und Verpackung und identifiziert zwei versagte Barrieren. Deviation schließen, CAPA mit Hard Stops, Pre-transport-Check, Druckerverfügbarkeit, SOP/Schulung und Wirksamkeitscheck offen weiterführen.',
          scoring_focus:['Patientenidentität','Hard Stop','Chain-of-Custody','RCA','CAPA'],
          discussion_questions:['Warum reicht die eindeutige telefonische Erinnerung der Station nicht aus?','Wann könnten lokale SOPs bei nicht neu gewinnbarem Material Ausnahmen zulassen?','Welche technische Barriere verhindert zuverlässig, dass ein unbeschriftetes Röhrchen den Entnahmeplatz verlässt?']
        };
        d.report_additions=['Course Flagship: sieben phasengekoppelte Originalansichten','Referenzpfad: HARD STOP → Quarantäne → Kommunikation → RCA → Neuentnahme → CAPA','Kernregel: Begleitdokumentation und Plausibilität ersetzen keine Primärgefäß-Identität'];
      }
    }catch(_){ }
  }catch(e){console.error('[LAB_PRE_001 Course Flagship] case patch failed',e)}
}

function wrap(name,fn,guard){
  const prev=window[name]; if(typeof prev!=='function')return;
  const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;if(guard&&!guard())return html;return fn(html,arguments)};
  try{window[name]=wrapped}catch(_){}
  try{eval(name+'=wrapped')}catch(_){}
}

function overviewAddon(html){return inject(html,block('Probeneingang – das Problem ist physisch sichtbar',[
  asset('Unbeschriftetes EDTA-Primärgefäß · beschrifteter Transportbeutel und passender Auftrag',ASSETS.intake,'wide')
]));}
function qcAddon(html){return inject(html,block('Identity Hard Stop – Begleitdaten können das Primärgefäß nicht identifizieren',[
  asset('LIMS Accession · QUARANTÄNE / NICHT AKZEPTIERT',ASSETS.hardStop,'wide')
]));}
function decisionAddon(html){return inject(html,block('Die Plausibilitätsfalle – „das kann nur Herr K. sein“',[
  asset('Anforderungsschein und Kommunikationslog · Plausibilität dokumentieren, aber nicht als Identitätsnachweis verwenden',ASSETS.communication,'wide')
]));}
function rootAddon(html){
  const items=[asset('Quarantäne / Chain-of-Custody · physische und digitale Sperre',ASSETS.quarantine,'wide')];
  if(hasRoot('traceability')||hasRoot('sop_version'))items.push(asset('Root-Cause-Prozessrekonstruktion · zwei versagte Barrieren',ASSETS.rca,'wide'));
  return inject(html,block('Sichern und rekonstruieren – keine nachträgliche Identitätskonstruktion',items,'lp1-investigation'));
}
function capaAddon(html){
  if(!(hasRoot('technical_repeat')||hasRoot('traceability')||hasCapa('corrective')||hasCapa('immediate')))return html;
  return inject(html,block('Correction der Patientenversorgung – sichere Neuentnahme',[
    asset('Neue EDTA-Probe · Bedside-Labeling, Zwei-Identifier-Check und separate Accession',ASSETS.recollection,'wide')
  ],'lp1-confirm'));
}
function auditAddon(html){
  if(!complete())return html;
  return inject(html,block('Deviation geschlossen – CAPA bis Wirksamkeitscheck offen',[
    asset('Finale Disposition · alte Probe verworfen, Ersatzprobe akzeptiert, CAPA mit Wirksamkeitsziel',ASSETS.closure,'wide')
  ],'lp1-closure'));
}

function styles(){
  if(document.getElementById('lp1CourseFlagshipStyles'))return;
  const s=document.createElement('style');s.id='lp1CourseFlagshipStyles';s.textContent=`
.lp1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.lp1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.lp1-head h4{margin:0;color:var(--primary)}
.lp1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.lp1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.lp1-grid.single{grid-template-columns:1fr}.lp1-asset.wide{grid-column:1/-1}
.lp1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.lp1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.lp1-asset a{display:block;background:#f2f6f9}.lp1-asset img{width:100%;height:auto;display:block;object-fit:contain}.lp1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.lp1-investigation{border-color:#f0cf9f;background:linear-gradient(180deg,#fff,#fffaf2)}.lp1-confirm{border-color:#9dc7e8;background:linear-gradient(180deg,#fff,#f5faff)}.lp1-closure{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.lp1-grid{grid-template-columns:1fr}.lp1-asset.wide{grid-column:auto}}
`;document.head.appendChild(s);
}

function install(){
  if(window.__MolPathLABPRE001CourseFlagshipInstalled)return;
  window.__MolPathLABPRE001CourseFlagshipInstalled=true;
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

window.MolPathLABPRE001CourseFlagship=Object.freeze({
  base:'v2.5.0b+METHOD_FOCUS+MET_COURSE_5of5+LAB_RUN_001',
  caseId:CASE_ID,
  assetCount:7,
  phaseGating:{run_overview:[1],qc_event:[2],decision:[3],root_cause:[4,5],capa:[6],post_completion:[7]},
  rootCause:'Interrupted bedside labeling plus missing mandatory verification before handover/transport',
  signaturePromotion:false,
  courseFlagship:true,
  logicChanges:false
});
})();
