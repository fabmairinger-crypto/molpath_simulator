/* MolPath Simulator v2.5.0b — MET_RNA_001 Course Flagship Layer
   Scope: MET_RNA_001_v1_3 only.
   Promotes the curated Deep Dive to Signature Case and adds phase-aware training assets.
   Case scoring, correctness, required groups, method selection and completion semantics remain unchanged.
*/
(function(){
'use strict';
const CASE_ID='MET_RNA_001_v1_3';
const ASSETS=Object.freeze({
  he:'assets/met_rna_001/he_overview_001.png',
  ihc:'assets/met_rna_001/alk_ihc_001.png',
  dna:'assets/met_rna_001/dna_fusion_report_001.png',
  coverage:'assets/met_rna_001/dna_intron_coverage_001.svg',
  rna:'assets/met_rna_001/rna_fusion_viewer_001.png',
  fish:'assets/met_rna_001/alk_fish_001.png',
  integrated:'assets/met_rna_001/integrated_report_001.svg'
});
window.MolPathMETRNA001FlagshipAssets=ASSETS;
function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function hasSel(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function complete(){try{return !!state?.report&&state.report.kind==='complete'}catch(_){return false}}
function E(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function asset(title,src,cls=''){return `<figure class="mr1-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${E(title)}"></a><div class="mr1-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`}
function block(title,items,cls=''){return `<div class="mr1-block ${cls}"><div class="mr1-head"><h4>${E(title)}</h4><span class="mr1-pill">COURSE FLAGSHIP</span></div><div class="mr1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}
function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    c.signature_case=true;c.deep_dive=true;
    c.tags=Array.from(new Set([].concat(c.tags||[],['Signature Case','Course Flagship','Methods Focus','RNA-NGS','Fusion','Assaydesign','ALK']).filter(Boolean)));
    const story=Object.fromEntries((c.story||[]).map(x=>[x.id,x]));
    if(story.intake){story.intake.items=[['Fall-ID','MET_RNA_001'],['Einsender','Thoraxpathologie / Molekulares Tumorboard'],['Klinische Information','67-jähriger Patient mit pulmonaler spindelzelliger Läsion und ausgeprägtem entzündlichem Hintergrund; Morphologie IMT-kompatibel.'],['Fragestellung','Wie wird ein weiter bestehender Fusionsverdacht nach negativem DNA-NGS methodengerecht abgeklärt?']]}
    if(story.history){story.history.items=[['Morphologischer Kontext','Spindelzellproliferation mit lymphoplasmazellulärem Infiltrat und vereinzelten Eosinophilen.'],['ALK-IHC','in der vorliegenden Probe nicht beweisend; ein ALK-Rearrangement wird dadurch nicht sicher ausgeschlossen.'],['DNA-NGS','kein sicherer Fusionscall; globale Lauf-QC unauffällig.'],['Didaktische Falle','„Gen im Panel“ wird fälschlich mit vollständiger intronischer Breakpointabdeckung gleichgesetzt.']]}
    if(story.histo){story.histo.items=[['HE','IMT-kompatible pulmonale Spindelzellproliferation mit entzündlichem Infiltrat.'],['IHC','ALK in dieser Probe nicht beweisend; SMA fokal, übrige gezeigte Marker ohne spezifischen Fusionsnachweis.'],['Offene Frage','Ist der negative DNA-Fusionscall biologisch negativ oder methodisch nicht ausreichend sensitiv?'],['Hinweis','Prätestwahrscheinlichkeit entsteht aus Morphologie, IHC und Assaygrenzen gemeinsam.']]}
    if(story.material){story.material.items=[['Material','FFPE-Lungenbiopsie, RNA für gezielte Fusionsanalyse verfügbar.'],['DNA-QC','global technisch gut; keine relevante SNV/Indel/CNV.'],['ALK-Targeting','relevanter intronischer Breakpointbereich in Intron 19 im DNA-Design unzureichend abgedeckt.'],['Nächster Schritt','RNA-basierte Fusionsdiagnostik; ALK-Break-apart-FISH als orthogonaler Rearrangementnachweis.']]}
    if(Array.isArray(c.result_sections))c.result_sections.forEach(r=>{if(r&&Array.isArray(r.test_any)&&r.test_any.some(x=>x==='fusion_rna_ngs'||x==='rna_fusion_panel'))r.result='RNA-basierte Fusionsdiagnostik weist eine exprimierte TPM3::ALK-Fusion nach. ALK-Break-apart-FISH kann das Rearrangement orthogonal bestätigen.'});
    c.complete_interpretation='Integrierte Interpretation vollständig: Der negative DNA-Fusionscall schließt ein ALK-Rearrangement wegen unvollständiger intronischer Breakpointabdeckung nicht aus. RNA-NGS weist TPM3::ALK nach; ALK-Break-apart-FISH bestätigt das Rearrangement orthogonal.';
    c.partial_interpretation='Teilbefund: Bei fortbestehender Fusionsprätestwahrscheinlichkeit darf ein negativer DNA-Call ohne Prüfung des Assaydesigns nicht als universeller Fusionsausschluss formuliert werden.';
    c.optimal_summary='Optimale Lösung: Prätestwahrscheinlichkeit und DNA-Assaydesign prüfen, RNA-Fusionsdiagnostik ergänzen und das ALK-Rearrangement bei Bedarf orthogonal mit FISH bestätigen.';
    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=true;d.deep_dive_priority='signature';
        d.opening_scene='Die Morphologie spricht für eine fusionsgetriebene pulmonale Spindelzellläsion, doch das DNA-Panel meldet keine Fusion. Der Fall beginnt bei der Frage, ob „DNA-negativ“ hier wirklich „biologisch negativ“ bedeutet.';
        d.case_briefing='67-jähriger Patient mit IMT-kompatibler pulmonaler Spindelzellproliferation. Die ALK-IHC ist in der vorliegenden Probe nicht beweisend; das DNA-NGS bleibt ohne Fusionscall. Die technische Detailansicht zeigt jedoch eine relevante intronische Target-Lücke. RNA-NGS und FISH klären, ob ein ALK-Rearrangement dennoch vorliegt.';
        d.learning_objectives=[
          'Grenzen DNA-basierter Fusionsdetektion durch Breakpoint-/Intronabdeckung verstehen.',
          'RNA-NGS als komplementären Nachweis exprimierter Fusionstranskripte nutzen.',
          'Prätestwahrscheinlichkeit aus Morphologie und nicht beweisender IHC in die Methodenauswahl integrieren.',
          'FISH als orthogonalen Rearrangementnachweis mit begrenzter Partnerinformation einordnen.'
        ];
        d.context_cards=[
          {title:'Panelinhalt ≠ vollständige Fusionsabdeckung',content:'Ein Gen kann im Panel enthalten sein, ohne dass jeder relevante intronische Breakpoint erfasst wird.',teaching_point:'Assaydesign bestimmt Sensitivität.'},
          {title:'RNA fragt nach dem Produkt',content:'Ein RNA-Fusionsassay kann das tatsächlich exprimierte Chimärtranskript nachweisen.',teaching_point:'RNA und DNA sind komplementär.'},
          {title:'Negative IHC beendet die Frage nicht automatisch',content:'Bei passender Morphologie und methodisch plausibler Fusionshypothese kann eine nicht beweisende IHC die molekulare Reflexdiagnostik nicht ersetzen.',teaching_point:'Prätestwahrscheinlichkeit ist integriert, nicht eindimensional.'}
        ];
        d.pre_results=[{title:'Morphologie',content:'IMT-kompatibel'},{title:'ALK-IHC',content:'nicht beweisend / negativ in dieser Probe'},{title:'DNA-NGS',content:'kein Fusionscall; intronische Coverage limitiert'}];
        const g=(d.reasoning_gate_upgrade||[]).find(x=>x&&x.id==='dna_negative');
        if(g){g.prompt='Wie ist der negative DNA-Fusionscall bei IMT-kompatibler Morphologie zu bewerten?';g.rationale='Fusionssensitivität hängt vom Assaydesign ab; ein negativer DNA-Call kann bei intronischen Target-Lücken nicht sicher ausschließen.'}
        d.twist={title:'Die Fusion war die ganze Zeit exprimiert',content:'RNA-NGS weist TPM3::ALK nach; FISH bestätigt das ALK-Rearrangement.',why_critical:'Der negative DNA-Call war methodisch begrenzt, nicht biologisch endgültig.'};
        d.report_additions=['Twist: DNA-negativ trotz echter Fusion','RNA als komplementäre Ebene','Referenzpfad: Prätestwahrscheinlichkeit → Assaydesign → RNA/FISH'];
      }
    }catch(_){ }
  }catch(e){console.error('[MET_RNA_001 Flagship] case patch failed',e)}
}
function wrap(name,fn){const prev=window[name];if(typeof prev!=='function')return;const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;return fn(html,arguments)};try{window[name]=wrapped}catch(_){}try{eval(name+'=wrapped')}catch(_){}}
function storyAddon(html,args){
  const id=args&&args[0];
  if(id==='histo')return inject(html,block('Morphologie und Vor-IHC',[
    asset('HE-Übersicht · pulmonale spindelzellige Läsion, IMT-kompatibel',ASSETS.he,'wide'),
    asset('Immunhistochemische Übersicht · ALK in dieser Probe nicht beweisend',ASSETS.ihc,'wide')
  ]));
  if(id==='history')return inject(html,block('Vorbefund: DNA-NGS bleibt ohne Fusionsnachweis',[asset('DNA-NGS Ergebnisbericht · kein sicherer Fusionscall, RNA-Reflex empfohlen',ASSETS.dna,'wide')],'mr1-warning'));
  if(id==='material')return inject(html,block('Warum der negative DNA-Call nicht ausschließt',[asset('ALK-Lokus · intronische Target-Lücke im relevanten Breakpointbereich',ASSETS.coverage,'wide')],'mr1-warning'));
  return html;
}
function labAddon(html){
  const items=[];
  if(hasSel('fusion_rna_ngs')||hasSel('rna_fusion_panel'))items.push(asset('RNA-Fusionsanalyse · TPM3::ALK (Exon 6 → Exon 20) nachgewiesen',ASSETS.rna,'wide'));
  if(hasSel('fusion_fish'))items.push(asset('ALK Break-Apart FISH · Rearrangement orthogonal bestätigt',ASSETS.fish,'wide'));
  if(!items.length)return html;
  return inject(html,block(items.length>1?'Komplementäre Fusionsdiagnostik':'Fusionsdiagnostik',items,'mr1-confirm'));
}
function reportAddon(html){if(!complete())return html;return inject(html,block('Integrierter Abschlussbefund',[asset('DNA-negativ war nicht Fusions-negativ · TPM3::ALK durch RNA + FISH gesichert',ASSETS.integrated,'wide')],'mr1-complete'))}
function styles(){if(document.getElementById('mr1FlagshipStyles'))return;const s=document.createElement('style');s.id='mr1FlagshipStyles';s.textContent=`
.mr1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.mr1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.mr1-head h4{margin:0;color:var(--primary)}
.mr1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef5ff;color:#214d86;border:1px solid #c6d9ef;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.mr1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mr1-grid.single{grid-template-columns:1fr}.mr1-asset.wide{grid-column:1/-1}
.mr1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.mr1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.mr1-asset a{display:block;background:#f2f6f9}.mr1-asset img{width:100%;height:auto;display:block;object-fit:contain}.mr1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.mr1-warning{border-color:#f5c16c;background:linear-gradient(180deg,#fff,#fffbf2)}.mr1-confirm{border-color:#9dc7e8;background:linear-gradient(180deg,#fff,#f5faff)}.mr1-complete{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.mr1-grid{grid-template-columns:1fr}.mr1-asset.wide{grid-column:auto}}
`;document.head.appendChild(s)}
function install(){if(window.__MolPathMETRNA001FlagshipInstalled)return;window.__MolPathMETRNA001FlagshipInstalled=true;patchCase();styles();wrap('storyStep',storyAddon);wrap('renderLab',labAddon);wrap('renderReport',reportAddon);try{renderCasePicker();renderKpi();if(active())render()}catch(_){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathMETRNA001Flagship=Object.freeze({base:'v2.5.0b+METHOD_FOCUS+MET_NGS_001+MET_NGS_002',caseId:CASE_ID,assetCount:7,phaseGating:{histo:[1,2],history:[3],material:[4],rna_selection:[5],fish_selection:[6],complete_report:[7]},signaturePromotion:true,logicChanges:false});
})();
