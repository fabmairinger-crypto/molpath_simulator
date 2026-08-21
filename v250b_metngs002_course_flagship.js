/* MolPath Simulator v2.5.0b — MET_NGS_002 Course Flagship Layer
   Scope: MET_NGS_002_v1_3 only.
   Promotes the curated Deep Dive to Signature Case and adds phase-aware training assets.
   Case scoring, correctness, required groups, method selection and completion semantics remain unchanged.
*/
(function(){
'use strict';
const CASE_ID='MET_NGS_002_v1_3';
const ASSETS=Object.freeze({
  referral:'assets/met_ngs_002/progress_referral_001.png',
  qc:'assets/met_ngs_002/ffpe_dna_qc_001.png',
  viewer:'assets/met_ngs_002/t790m_variant_viewer_001.png',
  artifact:'assets/met_ngs_002/ct_artifact_pattern_001.png',
  repeat:'assets/met_ngs_002/repeat_extraction_result_001.png',
  orthogonal:'assets/met_ngs_002/orthogonal_confirmation_001.png',
  amended:'assets/met_ngs_002/amended_report_001.png'
});
window.MolPathMETNGS002FlagshipAssets=ASSETS;
function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function hasSel(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function complete(){try{return !!state?.report&&state.report.kind==='complete'}catch(_){return false}}
function E(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function asset(title,src,cls=''){return `<figure class="mn2-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${E(title)}"></a><div class="mn2-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`}
function block(title,items,cls=''){return `<div class="mn2-block ${cls}"><div class="mn2-head"><h4>${E(title)}</h4><span class="mn2-pill">COURSE FLAGSHIP</span></div><div class="mn2-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}
function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    c.signature_case=true;c.deep_dive=true;
    c.tags=Array.from(new Set([].concat(c.tags||[],['Signature Case','Course Flagship','Methods Focus','FFPE','Low VAF','Artefakt-QC']).filter(Boolean)));
    const story=Object.fromEntries((c.story||[]).map(x=>[x.id,x]));
    if(story.intake){story.intake.items=[['Fall-ID','MET_NGS_002'],['Einsender','Thoraxonkologie / Molekulares Tumorboard'],['Klinische Information','67-jähriger Patient mit EGFR-mutiertem NSCLC und radiologischem Progress unter zielgerichteter Therapie. In der Rebiopsie erscheint EGFR p.T790M mit 1,4 % VAF.'],['Fragestellung','Echte niedrigfrequente Resistenzmutation oder FFPE-bedingtes C>T-Artefakt?']]}
    if(story.history){story.history.items=[['Bekannter Treiber','EGFR p.L858R bleibt mit hoher VAF robust nachweisbar.'],['Neuer Call','EGFR p.T790M mit 1,4 % VAF, knapp oberhalb der Reporting-Grenze.'],['Präanalytik','FFPE-Material mit deutlicher Fragmentierung und erhöhtem Deaminierungsrisiko.'],['Didaktische Falle','Therapeutische Attraktivität des Genbefunds darf nicht mit analytischer Validität des einzelnen Calls verwechselt werden.']]}
    if(story.histo){story.histo.items=[['Histologie','Vitales Adenokarzinom; Tumoranteil etwa 20 %.'],['Sequenzdaten','T790M mit sehr niedriger VAF; mehrere zusätzliche sehr niedrigfrequente C>T/G>A-Ereignisse.'],['Offene Frage','Echte Subklonmutation oder FFPE-bedingte Cytosindesaminierung?'],['Hinweis','Ein klinisch attraktiver Call verdient besonders strenge Call-level-QC.']]}
    if(story.material){story.material.items=[['Material','FFPE-Rebiopsie, Material limitiert.'],['DNA','deutlich fragmentiert; erhöhtes FFPE-Artefaktrisiko.'],['Alternative','unabhängige Re-Extraktion aus weiterem Material möglich.'],['Ressourcen','orthogonale sensitive Zielmethode gezielt verfügbar.']]}
    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=true;d.deep_dive_priority='signature';
        d.opening_scene='Auf dem Variantenboard leuchtet EGFR p.T790M mit 1,4 % VAF. Klinisch wäre der Befund hochrelevant – gleichzeitig zeigt die FFPE-DNA ein deutliches Schadensmuster. Die Kernfrage ist nicht, ob T790M therapierbar wäre, sondern ob dieser konkrete Call analytisch belastbar ist.';
        d.case_briefing='67-jähriger Patient mit EGFR-mutiertem NSCLC und Progress. Der bekannte EGFR-Treiber bleibt robust nachweisbar; neu erscheint p.T790M mit 1,4 % VAF in artefaktanfälligem FFPE-Material. Call-level-QC, Reproduzierbarkeit und unabhängige Bestätigung entscheiden über die Befundfreigabe.';
        (d.pre_results||[]).forEach(x=>{if(x&&x.title==='FFPE-QC')x.content='deutlich fragmentiert; erhöhtes C>T/G>A-Deaminierungsrisiko';if(x&&x.title==='Neuer Call')x.content='EGFR p.T790M, 1,4 % VAF'});
        d.report_additions=['Flagship-Twist: klinisch attraktivster Call ist analytisch der schwächste','Keine starre VAF-Grenze – Call-level-QC und Reproduzierbarkeit entscheiden','Referenzpfad: FFPE-QC → Read-Kontext → unabhängige Re-Extraktion → orthogonale Bestätigung → korrigierter Abschlussbefund'];
      }
    }catch(_){ }
  }catch(e){console.error('[MET_NGS_002 Flagship] case patch failed',e)}
}
function wrap(name,fn){const prev=window[name];if(typeof prev!=='function')return;const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;return fn(html,arguments)};try{window[name]=wrapped}catch(_){}try{eval(name+'=wrapped')}catch(_){}}
function storyAddon(html,args){
  const id=args&&args[0];
  if(id==='intake')return inject(html,block('Klinischer Progressionsauftrag',[asset('Anforderung molekularpathologische Resistenzdiagnostik',ASSETS.referral,'doc')]));
  if(id==='material')return inject(html,block('Präanalytik: Warum dieser Low-VAF-Call besondere Vorsicht braucht',[asset('FFPE-DNA-Qualitätskontrolle · Fragmentierung und Deaminierungsrisiko',ASSETS.qc,'wide')],'mn2-warning'));
  if(id==='histo')return inject(html,block('Initialer Low-VAF-Befund',[asset('Variant Viewer · EGFR p.T790M bei 1,4 % VAF',ASSETS.viewer,'wide')]));
  return html;
}
function labAddon(html){
  const items=[];
  if(hasSel('ffpe_artifact_review'))items.push(asset('Read-Kontext und FFPE-Artefaktmuster',ASSETS.artifact,'wide'));
  if(hasSel('orthogonal_confirmation')){
    items.push(asset('Unabhängige Re-Extraktion · T790M nicht reproduzierbar',ASSETS.repeat,'wide'));
    items.push(asset('Orthogonale Bestätigung · ddPCR + Digital NGS negativ, Primärtreiber positiv',ASSETS.orthogonal,'wide'));
  }
  if(!items.length)return html;
  return inject(html,block(hasSel('orthogonal_confirmation')?'Analytische Absicherung des Low-VAF-Calls':'Call-level Artefaktprüfung',items,hasSel('orthogonal_confirmation')?'mn2-confirm':'mn2-warning'));
}
function reportAddon(html){if(!complete())return html;return inject(html,block('Korrigierter Abschlussbefund',[asset('T790M nicht validiert · keine therapeutische Berücksichtigung',ASSETS.amended,'wide')],'mn2-complete'))}
function styles(){if(document.getElementById('mn2FlagshipStyles'))return;const s=document.createElement('style');s.id='mn2FlagshipStyles';s.textContent=`
.mn2-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.mn2-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.mn2-head h4{margin:0;color:var(--primary)}
.mn2-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#5d2b86;border:1px solid #ddc9ee;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.mn2-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mn2-grid.single{grid-template-columns:1fr}.mn2-asset.wide{grid-column:1/-1}
.mn2-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.mn2-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.mn2-asset a{display:block;background:#f2f6f9}.mn2-asset img{width:100%;height:auto;display:block;object-fit:contain}.mn2-asset.doc img{max-height:900px;object-fit:contain}.mn2-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.mn2-warning{border-color:#f5c16c;background:linear-gradient(180deg,#fff,#fffbf2)}.mn2-confirm{border-color:#9dc7e8;background:linear-gradient(180deg,#fff,#f5faff)}.mn2-complete{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.mn2-grid{grid-template-columns:1fr}.mn2-asset.wide{grid-column:auto}.mn2-asset.doc img{max-height:none}}
`;document.head.appendChild(s)}
function install(){if(window.__MolPathMETNGS002FlagshipInstalled)return;window.__MolPathMETNGS002FlagshipInstalled=true;patchCase();styles();wrap('storyStep',storyAddon);wrap('renderLab',labAddon);wrap('renderReport',reportAddon);try{renderCasePicker();renderKpi();if(active())render()}catch(_){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathMETNGS002Flagship=Object.freeze({base:'v2.5.0b+METHOD_FOCUS+MET_NGS_001',caseId:CASE_ID,assetCount:7,phaseGating:{intake:[1],material:[2],histo:[3],artifact_review:[4],orthogonal_confirmation:[5,6],complete_report:[7]},signaturePromotion:true,logicChanges:false});
})();
