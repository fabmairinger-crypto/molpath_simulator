/* MolPath Simulator v2.5.0b — MET_NGS_004 Course Flagship Layer (delta)
   Scope: MET_NGS_004_v1_3 only.
   Adds the curated tumor-only BRCA2 → germline-confirmation teaching path and promotes the case to Signature Case.
   The H&E image is retained as an additional contextual asset.
   Scoring, correctness, required groups, method selection and completion semantics remain unchanged.
*/
(function(){
'use strict';
const CASE_ID='MET_NGS_004_v1_3';
const ASSETS=Object.freeze({
  variant:'assets/met_ngs_004/tumor_ngs_variant_001.png',
  tumorReport:'assets/met_ngs_004/tumor_only_report_001.png',
  pedigree:'assets/met_ngs_004/family_history_pedigree_001.png',
  referral:'assets/met_ngs_004/genetics_referral_001.png',
  germline:'assets/met_ngs_004/germline_confirmation_001.png',
  paired:'assets/met_ngs_004/paired_interpretation_001.png',
  hrdContext:'assets/met_ngs_004/hrd_parp_context_001.png',
  he:'assets/met_ngs_004/he_metastasis_bonus_001.png'
});
window.MolPathMETNGS004FlagshipAssets=ASSETS;
function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function hasSel(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function complete(){try{return !!state?.report&&state.report.kind==='complete'}catch(_){return false}}
function finalized(){try{return !!state?.finalized}catch(_){return false}}
function E(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function asset(title,src,cls=''){return `<figure class="mn4-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${E(title)}"></a><div class="mn4-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`}
function block(title,items,cls=''){return `<div class="mn4-block ${cls}"><div class="mn4-head"><h4>${E(title)}</h4><span class="mn4-pill">COURSE FLAGSHIP</span></div><div class="mn4-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}

function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    c.signature_case=true;c.deep_dive=true;
    c.tags=Array.from(new Set([].concat(c.tags||[],[
      'Signature Case','Course Flagship','Methods Focus','BRCA2','Tumor-only NGS','Germline','Hereditary cancer','PARP'
    ]).filter(Boolean)));
    const story=Object.fromEntries((c.story||[]).map(x=>[x.id,x]));
    if(story.intake){story.intake.items=[
      ['Fall-ID','MET_NGS_004'],
      ['Einsender','Uroonkologie / Molekulares Tumorboard'],
      ['Klinische Information','61-jähriger Patient mit metastasiertem kastrationsresistentem Prostatakarzinom (mCRPC). Tumor-only NGS einer FFPE-Knochenmetastase zeigt eine pathogene truncierende BRCA2-Variante mit 48 % VAF.'],
      ['Fragestellung','Wie werden therapeutische Tumorrelevanz und möglicher Keimbahnursprung methodisch korrekt getrennt und anschließend integriert?']
    ]}
    if(story.history){story.history.items=[
      ['Familienanamnese','Schwester mit Mammakarzinom mit 46 Jahren; Vater mit Prostatakarzinom mit 58 Jahren.'],
      ['Tumorprofil','Pathogene BRCA2-Loss-of-function-Variante, VAF 48 %.'],
      ['Didaktische Falle','Eine VAF nahe 50 % im Tumor wird fälschlich als Beweis einer Keimbahnmutation interpretiert.'],
      ['Ziel','Tumorbiomarker und hereditäre Diagnostik zunächst trennen und erst nach konstitutioneller Bestätigung zusammenführen.']
    ]}
    if(story.histo){story.histo.items=[
      ['Histologie','Metastasiertes Prostataadenokarzinom in einer Knochenmetastase.'],
      ['Tumor-NGS','BRCA2 c.5944_5947del (p.Ser1982Argfs*22), pathogene Frameshift-/Loss-of-function-Variante, VAF 48 %.'],
      ['Offen','Somatische Alteration, Keimbahnvariante oder Keimbahnvariante mit zusätzlicher Tumorevolution?'],
      ['Hinweis','Tumorreinheit, LOH und Copy-number können die VAF deutlich verschieben; Tumor-VAF allein beweist keine Keimbahnherkunft.']
    ]}
    if(story.material){story.material.items=[
      ['Tumormaterial','FFPE-Knochenmetastase; Tumoranteil ca. 60 %.'],
      ['Tumor-only Ergebnis','BRCA2-LoF technisch überzeugend, VAF 48 %, hohe Coverage.'],
      ['Konstitutionelles Material','EDTA-Vollblut für bestätigende Keimbahndiagnostik verfügbar.'],
      ['Governance','Humangenetische Beratung/Einwilligung und getrennte Dokumentation der hereditären Ebene erforderlich.']
    ]}
    if(Array.isArray(c.result_sections))c.result_sections.forEach(r=>{
      if(!r||!Array.isArray(r.test_any))return;
      if(r.test_any.includes('tumor_brca_hrr')||r.test_any.includes('broad_pan_panel'))r.result='Tumor-only NGS: pathogene BRCA2 c.5944_5947del (p.Ser1982Argfs*22), VAF 48 %, hohe technische Qualität. Therapeutisch relevante BRCA2-Alteration; eine Keimbahnherkunft kann aus Tumorgewebe allein weder bestätigt noch ausgeschlossen werden.';
      if(r.test_any.includes('tumor_normal_germline'))r.result='Konstitutionelle EDTA-Blut-Analyse bestätigt dieselbe BRCA2-Variante heterozygot bei ca. 49 % Allelanteil: pathogene Keimbahnvariante. Die Tumor-VAF war ein starker Hinweis, aber nicht der Beweis.';
      if(r.test_any.includes('germline_referral'))r.result='Humangenetische Beratung und konstitutionelle Testung werden veranlasst; Familienanamnese und mögliche Kaskadentestung werden getrennt vom reinen Tumorbefund adressiert.';
    });
    c.complete_interpretation='Die pathogene BRCA2 c.5944_5947del (p.Ser1982Argfs*22) ist im Tumor therapeutisch relevant. Tumor-only NGS mit 48 % VAF beweist jedoch keine Keimbahnherkunft, da Tumorreinheit, LOH und Copy-number die Allelfrequenz beeinflussen. Die Analyse aus EDTA-Blut bestätigt die Variante heterozygot als pathogene Keimbahnvariante. Damit müssen tumorbezogene Therapieimplikation und hereditäre Diagnose als zwei getrennte, anschließend integrierte klinische Ebenen dokumentiert werden.';
    c.partial_interpretation='Teilbefund: Die BRCA2-Alteration im Tumor ist therapeutisch relevant und begründet bei VAF/Familienanamnese einen Keimbahnverdacht. Eine hereditäre Diagnose darf erst nach Testung konstitutionellen Materials gestellt werden.';
    c.optimal_summary='Optimale Lösung: BRCA2 im Tumor therapeutisch einordnen, die 48-%-VAF als Verdacht statt Beweis kommunizieren, humangenetische Beratung und konstitutionelle Testung veranlassen und nach Bestätigung die hereditäre Ebene einschließlich Kaskadentestung separat dokumentieren.';
    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=true;d.deep_dive_priority='signature';
        d.opening_scene='Ein technisch überzeugender Tumor-only BRCA2-Call liegt bei 48 % VAF. Die Zahl wirkt „keimbahntypisch“, ist im Tumor aber kein Herkunftsnachweis. Die Familienanamnese erhöht den Verdacht – die entscheidende diagnostische Trennlinie bleibt das konstitutionelle Material.';
        d.case_briefing='61-jähriger Patient mit mCRPC. In einer FFPE-Knochenmetastase findet sich BRCA2 c.5944_5947del (p.Ser1982Argfs*22) bei 48 % VAF und ca. 60 % Tumoranteil. Schwester mit Mammakarzinom (46 J.), Vater mit Prostatakarzinom (58 J.). EDTA-Blut bestätigt die Variante heterozygot als Keimbahnvariante.';
        d.learning_objectives=[
          'Tumor-only VAF nicht als direkten Herkunftsnachweis interpretieren.',
          'Therapeutische Tumorrelevanz und hereditäre Diagnose als getrennte Fragestellungen bearbeiten.',
          'Familienanamnese als Verdachtsverstärker, nicht als molekularen Beweis, einordnen.',
          'Konstitutionelle Testung und humangenetische Beratung methodengerecht veranlassen und dokumentieren.'
        ];
        d.context_cards=[
          {title:'48 % ist ein Hinweis, kein Beweis',content:'Tumorreinheit, LOH und Copy-number können eine somatische oder keimbahnbedingte Variante in sehr unterschiedliche VAF-Bereiche verschieben.',teaching_point:'Herkunft braucht konstitutionelles Material.'},
          {title:'Eine Variante – zwei klinische Ebenen',content:'Dasselbe BRCA2-Ereignis kann therapeutisch im Tumor relevant und zugleich hereditär bedeutsam sein.',teaching_point:'Somatische und hereditäre Aussage getrennt dokumentieren.'},
          {title:'Familienanamnese verändert die Prätestwahrscheinlichkeit',content:'Frühes Mamma- und Prostatakarzinom in der Familie verstärken den Keimbahnverdacht, ersetzen aber keine Testung.',teaching_point:'Klinischer Kontext steuert Reflexdiagnostik.'}
        ];
        d.pre_results=[
          {title:'Tumorprobe',content:'FFPE-Knochenmetastase, Tumoranteil ca. 60 %'},
          {title:'Tumor-only NGS',content:'BRCA2 c.5944_5947del, VAF 48 %, pathogene LoF-Variante'},
          {title:'Familienanamnese',content:'Schwester Mammakarzinom 46 J.; Vater Prostatakarzinom 58 J.'}
        ];
        d.twist={title:'Der Verdacht bestätigt sich – aber erst im richtigen Material',content:'EDTA-Blut bestätigt dieselbe BRCA2-Variante heterozygot bei etwa 49 % Allelanteil.',why_critical:'Der Fall zeigt die Grenze von Tumor-only NGS und warum eine plausible VAF keinen Keimbahnnachweis ersetzt.'};
        d.report_additions=['Tumor-VAF ≠ Keimbahnnachweis','Konstitutionelle Bestätigung als methodische Trennlinie','Therapieebene und hereditäre Ebene getrennt berichten'];
      }
    }catch(_){ }
  }catch(e){console.error('[MET_NGS_004 Flagship] case patch failed',e)}
}

function wrap(name,fn){const prev=window[name];if(typeof prev!=='function')return;const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;return fn(html,arguments)};try{window[name]=wrapped}catch(_){}try{eval(name+'=wrapped')}catch(_){} }

function storyAddon(html,args){
  const id=args&&args[0];
  if(id==='history')return inject(html,block('Familienanamnese – Prätestwahrscheinlichkeit für hereditäre Prädisposition',[
    asset('Humangenetischer Stammbaum / Familienanamnese',ASSETS.pedigree,'wide')
  ]));
  if(id==='histo')return inject(html,block('Morphologischer Kontext (zusätzliches Asset)',[
    asset('HE · Knochenmetastase eines Prostatakarzinoms',ASSETS.he,'wide')
  ],'mn4-context'));
  return html;
}

function labAddon(html){
  const items=[];
  if(hasSel('tumor_brca_hrr')||hasSel('broad_pan_panel')){
    items.push(asset('Tumor-only NGS Variant Review · BRCA2-LoF, VAF 48 %',ASSETS.variant,'wide'));
    items.push(asset('Tumor-only Befund · therapeutisch relevant, mögliche Keimbahnherkunft ausdrücklich offen',ASSETS.tumorReport,'wide'));
  }
  if(hasSel('germline_referral')||hasSel('tumor_normal_germline')){
    items.push(asset('Überweisung / Anfrage Humangenetik · Beratung und konstitutionelle Testung',ASSETS.referral,'wide'));
  }
  if(hasSel('tumor_normal_germline')){
    items.push(asset('EDTA-Blut · dieselbe BRCA2-Variante heterozygot als Keimbahnvariante bestätigt',ASSETS.germline,'wide'));
  }
  if(!items.length)return html;
  return inject(html,block('Methodischer Verlauf: Tumor-only → Keimbahnklärung',items,'mn4-confirm'));
}

function reportAddon(html){
  if(!(complete()&&hasSel('tumor_normal_germline')))return html;
  return inject(html,block('Integrierte Bewertung – Tumor vs. Keimbahn',[
    asset('Paired Interpretation · gleiche Variante, unterschiedliche diagnostische Ebenen',ASSETS.paired,'wide')
  ],'mn4-complete'));
}

function mtbAddon(html){
  if(!(finalized()&&hasSel('tumor_normal_germline')))return html;
  return inject(html,block('Optionaler therapeutischer Zusatzkontext – nicht Teil des Keimbahnnachweises',[
    asset('Synthetischer HRD/PARP-Lehrreport · nur als post-completion Therapiekontext',ASSETS.hrdContext,'wide')
  ],'mn4-closure'));
}

function styles(){
  if(document.getElementById('mn4FlagshipStyles'))return;
  const s=document.createElement('style');s.id='mn4FlagshipStyles';s.textContent=`
.mn4-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.mn4-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.mn4-head h4{margin:0;color:var(--primary)}
.mn4-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#5d2b86;border:1px solid #ddc9ee;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.mn4-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mn4-grid.single{grid-template-columns:1fr}.mn4-asset.wide{grid-column:1/-1}
.mn4-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.mn4-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.mn4-asset a{display:block;background:#f2f6f9}.mn4-asset img{width:100%;height:auto;display:block;object-fit:contain}.mn4-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.mn4-context{border-color:#c7d2dd;background:linear-gradient(180deg,#fff,#f8fafc)}.mn4-confirm{border-color:#9dc7e8;background:linear-gradient(180deg,#fff,#f5faff)}.mn4-complete,.mn4-closure{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.mn4-grid{grid-template-columns:1fr}.mn4-asset.wide{grid-column:auto}}
`;document.head.appendChild(s);
}

function install(){
  if(window.__MolPathMETNGS004FlagshipInstalled)return;
  window.__MolPathMETNGS004FlagshipInstalled=true;
  patchCase();styles();wrap('storyStep',storyAddon);wrap('renderLab',labAddon);wrap('renderReport',reportAddon);wrap('renderMtb',mtbAddon);
  try{renderCasePicker();renderKpi();if(active())render()}catch(_){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();

window.MolPathMETNGS004Flagship=Object.freeze({
  base:'v2.5.0b+METHOD_FOCUS+MET_COURSE_4of5',
  caseId:CASE_ID,
  assetCount:8,
  phaseGating:{history:[3],histo_context:[8],tumor_brca_hrr:[1,2],germline_path:[4],tumor_normal_germline:[5],complete_report:[6],post_completion:[7]},
  contentAlignment:{age:61,diagnosis:'mCRPC',tumorCellContent:'ca. 60%',variant:'BRCA2 c.5944_5947del (p.Ser1982Argfs*22)',tumorVAF:'48%',germlineVAF:'49%'},
  signaturePromotion:true,
  logicChanges:false
});
})();
