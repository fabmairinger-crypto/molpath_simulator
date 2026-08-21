/* MolPath Simulator v2.5.0b — MET_NGS_001 Course Flagship Layer
   Scope: MET_NGS_001_v1_3 only.
   Promotes the curated Deep Dive to Signature Case and adds phase-aware training assets.
   Case scoring, correctness, required groups, method selection and completion semantics remain unchanged.
*/
(function(){
'use strict';
const CASE_ID='MET_NGS_001_v1_3';
const ASSETS=Object.freeze({
  referral:'assets/met_ngs_001/referral_request_001.png',
  qc:'assets/met_ngs_001/ngs_qc_dashboard_001.png',
  coverage:'assets/met_ngs_001/egfr_ex20_coverage_detail_001.png',
  initialReport:'assets/met_ngs_001/initial_negative_panel_report_001.png',
  orthogonal:'assets/met_ngs_001/orthogonal_egfr_ex20_result_001.png',
  amended:'assets/met_ngs_001/amended_integrated_report_001.png',
  comparison:'assets/met_ngs_001/method_comparison_card_001.svg'
});
window.MolPathMETNGS001FlagshipAssets=ASSETS;
function active(){try{return !!activeCase&&activeCase.id===CASE_ID}catch(_){return false}}
function hasSel(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function complete(){try{return !!state?.report&&state.report.kind==='complete'}catch(_){return false}}
function finalized(){try{return !!state?.finalized}catch(_){return false}}
function E(x){try{return esc(x==null?'':String(x))}catch(_){return String(x==null?'':x)}}
function asset(title,src,cls=''){return `<figure class="mn1-asset ${cls}"><figcaption>${E(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${E(title)}"></a><div class="mn1-provenance">Synthetisches Trainingsasset · keine realen Patientendaten</div></figure>`}
function block(title,items,cls=''){return `<div class="mn1-block ${cls}"><div class="mn1-head"><h4>${E(title)}</h4><span class="mn1-pill">COURSE FLAGSHIP</span></div><div class="mn1-grid ${items.length===1?'single':''}">${items.join('')}</div></div>`}
function inject(html,addon){if(!html||!addon)return html;const i=html.lastIndexOf('</section>');return i>=0?html.slice(0,i)+addon+html.slice(i):html+addon}
function patchCase(){
  try{
    const c=(cases||[]).find(x=>x&&x.id===CASE_ID); if(!c)return;
    c.signature_case=true;c.deep_dive=true;c.tags=Array.from(new Set([].concat(c.tags||[],['Signature Case','Course Flagship','Methods Focus']).filter(Boolean)));
    const story=Object.fromEntries((c.story||[]).map(x=>[x.id,x]));
    if(story.intake){const m=Object.fromEntries(story.intake.items||[]);m['Klinische Information']='59-jährige Nie-Raucherin mit metastasiertem pulmonalem Adenokarzinom. Das DNA-Panel wird als „kein therapierbarer Treiber nachweisbar“ zusammengefasst.';story.intake.items=Object.entries(m)}
    if(story.history){const m=Object.fromEntries(story.history.items||[]);m['QC-Hinweis']='Der NGS-Lauf ist global technisch überzeugend, EGFR-Exon 20 erreicht lokal jedoch nur etwa 6× Coverage und unterschreitet damit klar das laborintern validierte Mindestkriterium für einen belastbaren negativen Call.';story.history.items=Object.entries(m)}
    if(story.histo){const m=Object.fromEntries(story.histo.items||[]);m['Tumoranteil']='ca. 25 %.';story.histo.items=Object.entries(m)}
    try{
      const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[CASE_ID]:null;
      if(d){
        d.is_signature_case=true;d.deep_dive_priority='signature';
        d.opening_scene='Der Bericht sagt „kein therapierbarer Treiber“. Im QC-Tab fällt aber eine einzige rote Zielregion auf: EGFR-Exon 20 mit nur etwa 6× Coverage. Der übrige Lauf ist technisch überzeugend. Genau dort darf aus „nichts gesehen“ kein „sicher nicht vorhanden“ werden.';
        d.case_briefing='59-jährige Nie-Raucherin mit metastasiertem Lungenadenokarzinom. Das Panel ist global technisch gut, aber EGFR-Exon 20 unterschreitet deutlich das validierte Mindestkriterium. Das Board muss entscheiden, ob limitiert berichtet, wiederholt oder orthogonal geschlossen wird.';
        (d.context_cards||[]).forEach(x=>{if(x&&x.title==='Global gut, lokal schlecht')x.content='Global sehr gute Laufmetriken; EGFR-Exon 20 lokal nur etwa 6× Coverage.'});
        (d.pre_results||[]).forEach(x=>{if(x&&x.title==='Tumoranteil')x.content='ca. 25 %';if(x&&x.title==='Lokale QC')x.content='EGFR-Exon 20 mit deutlicher Unterabdeckung (ca. 6×) unter dem laborintern validierten Mindestkriterium'});
        d.report_additions=['Flagship-Twist: relevante Information liegt in der regionsspezifischen QC, nicht im langen Negativbericht','Kernfehler: nicht ausreichend untersucht ≠ negativ','Referenzpfad: Coverage prüfen → Limitation explizit machen → orthogonal schließen → korrigierten Befund erstellen'];
      }
    }catch(_){ }
  }catch(e){console.error('[MET_NGS_001 Flagship] case patch failed',e)}
}
function wrap(name,fn){const prev=window[name];if(typeof prev!=='function')return;const wrapped=function(){const html=prev.apply(this,arguments);if(!active())return html;return fn(html,arguments)};try{window[name]=wrapped}catch(_){}try{eval(name+'=wrapped')}catch(_){}}
function storyAddon(html,args){const id=args&&args[0];if(id==='intake')return inject(html,block('Klinische Primärunterlagen',[asset('Onkologische Anforderung / MTB-Auftrag',ASSETS.referral,'doc'),asset('Initialer DNA-Panel-Befund · Negativaussage mit lokaler Limitation',ASSETS.initialReport,'doc')]));if(id==='history')return inject(html,block('Run-QC: global überzeugend',[asset('NGS-Lauf · Qualitätsübersicht',ASSETS.qc,'wide')]));if(id==='material')return inject(html,block('Target-QC: die entscheidende rote Zeile',[asset('EGFR Exon 20 · Coverage-Detailansicht',ASSETS.coverage,'wide')],'mn1-critical'));return html}
function labAddon(html){if(!hasSel('coverage_review'))return html;return inject(html,block('QC-Review bestätigt die lokale Aussagegrenze',[asset('Regionsspezifische Coverage-Prüfung',ASSETS.coverage,'wide')]))}
function reportAddon(html){const items=[];if(hasSel('orthogonal_confirmation'))items.push(asset('Orthogonale EGFR-Exon-20-Nachtestung · Insertion nachgewiesen',ASSETS.orthogonal,'doc'));if(complete())items.push(asset('Korrigierter integrierter Abschlussbefund',ASSETS.amended,'doc'));return items.length?inject(html,block(complete()?'Diagnostische Lücke geschlossen':'Orthogonale Nachtestung',items,complete()?'mn1-complete':'')):html}
function mtbAddon(html){if(!finalized())return html;return inject(html,block('Take-home: Welche Nachteststrategie schließt die Lücke wirklich?',[asset('Identischer Assay vs. orthogonale Bestätigung',ASSETS.comparison,'wide')],'mn1-closure'))}
function styles(){if(document.getElementById('mn1FlagshipStyles'))return;const s=document.createElement('style');s.id='mn1FlagshipStyles';s.textContent=`
.mn1-block{border:1px solid #c8dbe7;border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
.mn1-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.mn1-head h4{margin:0;color:var(--primary)}
.mn1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#f5efff;color:#5d2b86;border:1px solid #ddc9ee;font-size:.68rem;font-weight:900;letter-spacing:.05em}
.mn1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mn1-grid.single{grid-template-columns:1fr}.mn1-asset.wide{grid-column:1/-1}
.mn1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc;min-width:0}.mn1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.mn1-asset a{display:block;background:#f2f6f9}.mn1-asset img{width:100%;height:auto;display:block;object-fit:contain}.mn1-asset.doc img{max-height:900px;object-fit:contain}.mn1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
.mn1-critical{border-color:#f5c16c;background:linear-gradient(180deg,#fff,#fffbf2)}.mn1-complete,.mn1-closure{border-color:#9dd9b7;background:linear-gradient(180deg,#fff,#f4fff7)}
@media(max-width:1000px){.mn1-grid{grid-template-columns:1fr}.mn1-asset.wide{grid-column:auto}.mn1-asset.doc img{max-height:none}}
`;document.head.appendChild(s)}
function install(){if(window.__MolPathMETNGS001FlagshipInstalled)return;window.__MolPathMETNGS001FlagshipInstalled=true;patchCase();styles();wrap('storyStep',storyAddon);wrap('renderLab',labAddon);wrap('renderReport',reportAddon);wrap('renderMtb',mtbAddon);try{renderCasePicker();renderKpi();if(active())render()}catch(_){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.MolPathMETNGS001Flagship=Object.freeze({base:'v2.5.0b+METHOD_FOCUS_PATCH01',caseId:CASE_ID,assetCount:7,phaseGating:{intake:[1,4],history:[2],material:[3],orthogonal_report:[5],complete_report:[6],post_completion:[7]},contentAlignment:{age:59,tumorCellContent:'ca. 25%',egfrExon20Coverage:'ca. 6x'},signaturePromotion:true,logicChanges:false});
})();
