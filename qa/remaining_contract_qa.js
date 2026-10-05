// Exercise existing OVAR multi-round actions, CRC bundle scoring and LAB cards.
// Exact baseline equality is evaluated separately; this introduces no clinical rules.
function qaRemainingScenarios(){
 const rows=[];
 function htmlHash(s){return {sha256:qaSha256(String(s)),bytes:String(s).length};}
 function inspect(name,report){
  const patient=patientScore(),total=totalScore();
  renderScoreCard();
  const scoreHtml=document.getElementById('scorecard')?.innerHTML,reportHtml=renderReport(),content=renderContent();
  const cart=cartHtml([]),feedback=finalFeedback();
  rows.push({name,id:activeCase.id,pass:[patient.pct,total.pct].every(Number.isFinite)&&[scoreHtml,reportHtml,content,cart,feedback].every(s=>typeof s==='string'&&s.length>0),
   step:state.step,phase:state.ovarMP?.phase,decision:state.ovarMP?.decision,
   report:report||null,patient,total,totals:totals(),steps:currentSteps(),
   html:{score:htmlHash(scoreHtml),report:htmlHash(reportHtml),content:htmlHash(content),cart:htmlHash(cart),feedback:htmlHash(feedback)}});
 }
 for(const [name,ids] of [['CRC absent',[]],['CRC partial',['ras_panel_crc']],['CRC focused',['ras_panel_crc','braf_v600e_crc','mmr_ihc','msi_pcr_ngs','mlh1_methylation']],['CRC colon NGS',['colon_ngs_panel','mmr_ihc','msi_pcr_ngs','mlh1_methylation']],['CRC broad NGS',['broad_pan_panel','mmr_ihc','mlh1_methylation']]]){
  switchCase('MTB_CRC_001_v0_6');state.selected=new Set(ids);state.step='report';state.report=buildReport();['intake','history','histo','material'].forEach(k=>state.viewed[k]=true);state.mtb.points={bundle:true,mmr:true,ras:true,mlh1:true};inspect(name,state.report);
 }
 const labs=['LAB_DOC_002_v1_3','LAB_AUDIT_001_v1_3','LAB_CAPA_001_v1_3','LAB_QM_001_v1_3','LAB_LLM_001_v1_3','LAB_DIGI_001_v1_3','LAB_DIGI_002_v1_3','LAB_DATA_001_v1_3','LAB_DATA_002_v1_3','LAB_LIMS_001_v1_3'];
 for(const id of labs){
  switchCase(id);const d=MolPathPresentationA6.deep(id),before=JSON.stringify(d);
  const context=v17Cards(d.context_cards),pre=v17Cards(d.pre_results),opening=v17OpeningBlock(d);
  rows.push({name:'LAB canonical cards',id,pass:typeof d.case_briefing==='string'&&[context,pre,opening].every(s=>typeof s==='string'&&s.length>0)&&JSON.stringify(d)===before,
   html:{context:htmlHash(context),pre:htmlHash(pre),opening:htmlHash(opening),content:htmlHash(renderContent())}});
 }
 for(const input of [[{label:'QA label',value:'QA value'}],[{title:'QA title',content:'QA content'}],[{title:'QA title',label:'QA label',content:'',value:'QA value'}]]){
  const before=JSON.stringify(input),html=v17Cards(input);
  rows.push({name:'LAB renderer fallback',input,pass:JSON.stringify(input)===before&&typeof html==='string'&&html.includes('QA')&&!html.includes('undefined'),html:htmlHash(html)});
 }
 return rows;
}
