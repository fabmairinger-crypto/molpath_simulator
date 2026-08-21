/* MolPath Simulator v2.5.0b — MET_LB_001 Course Flagship Layer (delta)
   Scope: MET_LB_001_v1_3 only.
   Adds the curated 7-asset Liquid Biopsy / tissue-reflex teaching path and promotes the case to Signature Case.
   Scoring, correctness, required groups, method selection and completion semantics remain unchanged.
*/
(function(){
'use strict';
const CASE_ID='MET_LB_001_v1_3';
const ASSETS=Object.freeze({
  request:'assets/met_lb_001/progression_liquid_biopsy_request_001.png',
  plasma:'assets/met_lb_001/plasma_ngs_negative_001.png',
  qc:'assets/met_lb_001/liquid_biopsy_qc_001.png',
  he:'assets/met_lb_001/tissue_rebiopsy_he_001.png',
  tissue:'assets/met_lb_001/tissue_ngs_met_amplification_001.png',
  fish:'assets/met_lb_001/met_cep7_fish_001.png',
  integrated:'assets/met_lb_001/integrated_report_001.png'
});
window.MolPathMETLB001FlagshipAssets=ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function hasSel(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function complete(){try{return !!state?.report&&state.report.kind==='complete'}catch(_){return false}}
function E(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function asset(title,src,cls=''){return `<figure class="mlb1-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${E(title)}"></a><div class="mlb1-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`}
function block(title,items,cls=''){return `<div class="mlb1-block ${cls}"><div class="mlb1-head"><h4>${E(title)}</h4><span class="mlb1-pill">COURSE FLAGSHIP</span></div><div class="mlb1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    c.signature_case=true;c.deep_dive=true;
    c.tags=Array.from(new Set([].concat(c.tags||[],[
      'Signature Case','Course Flagship','Methods Focus','Liquid Biopsy','ctDNA','Tumor fraction','Tissue reflex','EGFR','MET amplification'
    ]).filter(Boolean)));

    const story=Object.fromEntries((c.story||[]).map(x=>[x.id,x]));
    if(story.intake){story.intake.items=[
      ['Fall-ID','MET_LB_001'],
      ['Einsender','Thoraxonkologie / Molekulares Tumorboard'],
      ['Klinische Information','64-jährige Patientin mit metastasiertem EGFR-mutiertem Lungenadenokarzinom und radiologischem Progress unter Osimertinib.'],
      ['Fragestellung','Zunächst Liquid Biopsy zur molekularen Resistenzabklärung: Ist ein negatives Plasmaergebnis ausreichend belastbar?']
    ]}
    if(story.history){story.history.items=[
      ['Vorbekannter Treiber','EGFR Exon 19 Deletion im Ausgangstumor.'],
      ['Therapie','Osimertinib seit 09/2023 mit initialer Krankheitskontrolle.'],
      ['Aktuell','Progress mit zugänglicher Lebermetastase.'],
      ['Didaktische Falle','Ein formal negativer Plasma-NGS-Bericht wird mit einem molekular negativen Tumor gleichgesetzt.']
    ]}
    if(story.histo){story.histo.items=[
      ['Plasma-NGS','Keine tumorassoziierte Variante nachweisbar; auch der bekannte EGFR-Treiber fehlt.'],
      ['Plasma-QC','Analytischer Lauf technisch gültig, geschätzte ctDNA-/Tumorfraktion jedoch <0,1 %.'],
      ['Offene Frage','Ist das Ergebnis biologisch negativ oder lediglich nicht ausreichend informativ?'],
      ['Hinweis','Das Fehlen eines bekannten klonalen Tumormarkers ist ein starkes Warnsignal für unzureichendes Tumorsignal im Plasma.']
    ]}
    if(story.material){story.material.items=[
      ['Plasma','8,2 mL; präanalytisch regelrecht, cfDNA technisch analysierbar.'],
      ['Tumorfraktion','<0,1 %; unterhalb des belastbaren Bereichs für breite Ausschlussaussagen.'],
      ['Progressionsgewebe','Lebermetastase bildgesteuert biopsierbar; ca. 55–60 % Tumor im repräsentativen Schnitt.'],
      ['Reflexstrategie','Gewebe-NGS mit Copy-number-Analyse; MET/CEP7-FISH zur orthogonalen Bestätigung einer MET-Amplifikation.']
    ]}

    if(Array.isArray(c.result_sections))c.result_sections.forEach(r=>{
      if(!r||!Array.isArray(r.test_any))return;
      if(r.test_any.includes('liquid_biopsy'))r.result='Plasma-NGS: kein tumorassoziierter Befund; auch die bekannte EGFR Exon 19 Deletion nicht nachweisbar. Geschätzte ctDNA-Tumorfraktion <0,1 % – negatives Ergebnis nicht ausreichend informativ.';
      if(r.test_any.includes('rebiopsy_tissue'))r.result='Rebiopsie einer progredienten Lebermetastase bestätigt vitales Adenokarzinom mit ca. 55–60 % Tumoranteil und liefert belastbares Material für die Resistenzdiagnostik.';
      if(r.test_any.includes('broad_pan_panel'))r.result='Gewebe-NGS zeigt die persistierende EGFR Exon 19 Deletion und eine hochgradige MET-Amplifikation als plausiblen Bypass-Resistenzmechanismus; MET/CEP7-FISH bestätigt die Kopienzahlalteration orthogonal.';
    });
    c.complete_interpretation='Die negative Liquid Biopsy war wegen sehr niedriger ctDNA-Tumorfraktion und fehlendem Nachweis sogar des bekannten EGFR-Treibers nicht ausreichend informativ. Die Geweberebiopsie zeigt die persistierende EGFR Exon 19 Deletion und eine hochgradige MET-Amplifikation; MET/CEP7-FISH bestätigt die Amplifikation orthogonal. Plasma-negativ bedeutete hier nicht Tumor-negativ.';
    c.partial_interpretation='Teilbefund: Ein negatives Plasma-NGS darf bei sehr niedriger Tumorfraktion nicht als sicherer Ausschluss eines Resistenzmechanismus interpretiert werden.';
    c.optimal_summary='Optimale Lösung: Plasma-Negativität auf Informativität prüfen, fehlenden bekannten Treiber als Warnsignal erkennen und bei zugänglichem Progressionsgewebe tissue-basiert reflexen; hier wird eine MET-Amplifikation sichtbar und orthogonal bestätigt.';

    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=true;d.deep_dive_priority='signature';
        d.opening_scene='Der Plasma-Report ist leer – nicht einmal die bekannte EGFR Exon 19 Deletion erscheint. Die technische QC ist bestanden, doch die geschätzte Tumorfraktion liegt unter 0,1 %. Die Kernfrage lautet deshalb nicht nur „Was wurde nicht gefunden?“, sondern „War überhaupt genug Tumorsignal vorhanden, um etwas sicher auszuschließen?“';
        d.case_briefing='64-jährige Patientin mit EGFR-mutiertem metastasiertem Lungenadenokarzinom und Progress unter Osimertinib. Plasma-NGS bleibt ohne Tumorbefund bei extrem niedriger ctDNA-Fraktion. Eine Lebermetastase ist biopsierbar; im Gewebe werden der bekannte EGFR-Treiber und eine MET-Amplifikation nachgewiesen, die durch MET/CEP7-FISH bestätigt wird.';
        d.learning_objectives=[
          'Negative ctDNA-Ergebnisse von biologisch informativen Negativbefunden unterscheiden.',
          'Tumorfraktion, Shedding und den bekannten Tumormarker als Plausibilitätsanker nutzen.',
          'Bei nichtinformativem Plasma und klinischer Relevanz eine Tissue-Reflexstrategie begründen.',
          'NGS-basierte Copy-number-Calls mit einer orthogonalen Methode wie MET/CEP7-FISH einordnen.'
        ];
        d.context_cards=[
          {title:'Negativ ist asymmetrisch',content:'Ein positiver validierter ctDNA-Befund kann hochinformativ sein; ein negatives Ergebnis kann bei niedrigem Shedding falsch-negativ sein.',teaching_point:'Negativaussagen brauchen Informativitätskontext.'},
          {title:'Der bekannte Treiber ist eine biologische Plausibilitätskontrolle',content:'Wenn selbst die etablierte EGFR Exon 19 Deletion im Plasma fehlt, ist eine breite Wildtyp-Aussage besonders fragil.',teaching_point:'Vorwissen hilft, die Probe zu beurteilen.'},
          {title:'Plasma und Gewebe sind komplementär',content:'Bei zugänglichem Progressionsgewebe kann Tissue-Profiling einen im Plasma unsichtbaren Resistenzmechanismus zeigen.',teaching_point:'Liquid Biopsy ersetzt Gewebe nicht in jeder Situation.'}
        ];
        d.pre_results=[
          {title:'Bekannter Treiber',content:'EGFR Exon 19 Deletion im Ausgangstumor'},
          {title:'Plasma-NGS',content:'kein tumorassoziierter Befund'},
          {title:'ctDNA/Tumorfraktion',content:'<0,1 % – sehr niedrig / nicht ausreichend informativ'}
        ];
        d.material_or_resource_constraints=['Plasma präanalytisch korrekt und technisch analysierbar.','ctDNA-Tumorfraktion <0,1 %.','Progressionsgewebe zugänglich und mit ca. 55–60 % Tumoranteil gut profilierbar.','Copy-number-Calls benötigen bei klinischer Konsequenz eine methodengerechte Validierung.'];
        const g=(d.reasoning_gate_upgrade||[]).find(x=>x&&x.id==='negative');
        if(g){g.prompt='Wie ist ein formal negatives Plasma-NGS bei ctDNA <0,1 % und fehlendem bekannten EGFR-Treiber zu bewerten?';g.rationale='Die Analyse kann technisch valide sein, ohne biologisch genügend Tumor-DNA für eine belastbare Ausschlussaussage zu enthalten.'}
        const r=(d.reasoning_gate_upgrade||[]).find(x=>x&&x.id==='reflex');
        if(r){r.prompt='Eine progrediente Lebermetastase ist biopsierbar. Was ist der sinnvollste nächste Schritt?';r.rationale='Bei klinisch relevantem Progress und nichtinformativem Plasma sollte zugängliches Tumorgewebe zur Resistenzklärung genutzt werden.'}
        d.twist={title:'Der Resistenzmechanismus war im Plasma unsichtbar',content:'Im Progressionsgewebe bleibt die EGFR Exon 19 Deletion nachweisbar; zusätzlich zeigt sich eine hochgradige MET-Amplifikation, orthogonal durch MET/CEP7-FISH bestätigt.',why_critical:'Der negative Plasma-Report war kein Tumor-Wildtyp, sondern eine nicht ausreichend informative Negativaussage.'};
        d.report_additions=['Twist: Plasma-negativ trotz echtem Resistenzmechanismus','ctDNA-Tumorfraktion als Teil der Befundinterpretation','Referenzpfad: Plasma-QC → Informativität → Tissue-Reflex → CNV-Bestätigung'];
      }
    }catch(_){ }
  }catch(e){console.error('[MET_LB_001 Flagship] case patch failed',e)}
}

function wrap(name,fn){const prev=window[name];if(typeof prev!=='function')return;const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;return fn(html,arguments)};try{window[name]=wrapped}catch(_){}try{eval(name+'=wrapped')}catch(_){} }

function storyAddon(html,args){
  const id=args&&args[0];
  if(id==='intake')return inject(html,block('Klinischer Auftrag – Liquid Biopsy bei Progress',[
    asset('Anforderung molekularpathologische Resistenzdiagnostik · Plasma / ctDNA',ASSETS.request,'wide')
  ]));
  return html;
}

function labAddon(html){
  const items=[];
  if(hasSel('liquid_biopsy')){
    items.push(asset('Plasma-NGS · formal negativ, kein tumorassoziierter Befund',ASSETS.plasma,'wide'));
    items.push(asset('Liquid-Biopsy-QC · ctDNA <0,1 %: technisch valide, biologisch nicht ausreichend informativ',ASSETS.qc,'wide'));
  }
  if(hasSel('rebiopsy_tissue')){
    items.push(asset('Geweberebiopsie · HE, metastasiertes Adenokarzinom mit ausreichendem Tumoranteil',ASSETS.he,'wide'));
  }
  if(hasSel('broad_pan_panel')){
    items.push(asset('Gewebe-NGS · EGFR Exon 19 Deletion persistiert + MET-Amplifikation',ASSETS.tissue,'wide'));
    items.push(asset('MET/CEP7-FISH · MET-Amplifikation orthogonal bestätigt',ASSETS.fish,'wide'));
  }
  if(!items.length)return html;
  return inject(html,block('Methodischer Verlauf: Plasma → Tissue-Reflex',items,'mlb1-confirm'));
}

function reportAddon(html){
  if(!complete())return html;
  return inject(html,block('Integrierter Abschlussbefund',[
    asset('Negatives Plasma bei sehr niedriger ctDNA schließt einen Resistenzmechanismus nicht aus',ASSETS.integrated,'wide')
  ],'mlb1-complete'));
}

function styles(){
  if(document.getElementById('mlb1FlagshipStyles'))return;
  const s=document.createElement('style');s.id='mlb1FlagshipStyles';s.textContent=`
.mlb1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.mlb1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.mlb1-head h4{margin:0;color:var(--primary)}
.mlb1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef5ff;color:#214d86;border:1px solid #c6d9ef;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.mlb1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mlb1-grid.single{grid-template-columns:1fr}.mlb1-asset.wide{grid-column:1/-1}
.mlb1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.mlb1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.mlb1-asset a{display:block;background:#f2f6f9}.mlb1-asset img{width:100%;height:auto;display:block;object-fit:contain}.mlb1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.mlb1-confirm{border-color:#9dc7e8;background:linear-gradient(180deg,#fff,#f5faff)}.mlb1-complete{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.mlb1-grid{grid-template-columns:1fr}.mlb1-asset.wide{grid-column:auto}}
`;document.head.appendChild(s);
}

function install(){
  if(window.__MolPathMETLB001FlagshipInstalled)return;
  window.__MolPathMETLB001FlagshipInstalled=true;
  patchCase();styles();wrap('storyStep',storyAddon);wrap('renderLab',labAddon);wrap('renderReport',reportAddon);
  try{renderCasePicker();renderKpi();if(active())render()}catch(_){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();

window.MolPathMETLB001Flagship=Object.freeze({
  base:'v2.5.0b+METHOD_FOCUS+MET_NGS_001+MET_NGS_002+MET_RNA_001',
  caseId:CASE_ID,
  assetCount:7,
  phaseGating:{intake:[1],liquid_biopsy:[2,3],rebiopsy_tissue:[4],broad_pan_panel:[5,6],complete_report:[7]},
  signaturePromotion:true,
  logicChanges:false
});
})();
