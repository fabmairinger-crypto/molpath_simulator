// Behavioral OVAR1 checks use actual navigation, answer, lab and decision handlers.
function qaOvarGates(){
 const api=MolPathOvarReasoningA610,checks=[],outcomes=[];
 const before='before_round1',after='after_round1';
 const check=(name,ok,detail=null)=>checks.push({name,pass:!!ok,detail});
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function fresh(mode='learning'){
  uiMode=mode;switchCase('MTB_OVAR_001_v0_7');
  ['intake','history','histo','material'].forEach(gotoStep);
 }
 function answerStage(correct=true){
  const qs=api.questions(state.step==='reasoning_follow'?after:before);
  for(const q of qs){
   const opts=q.options.filter(o=>correct?o.correct:!o.correct);
   const ids=q.multi&&correct?opts:opts.slice(0,1);
   ids.forEach(o=>v15AnswerGate(q.id,o.id,q.multi,true));
  }
  submitReasoningGate();
 }
 function first(correct=true){gotoStep('reasoning');answerStage(correct);v15ContinueAfterGate();}
 function round1(ids=['tumor_brca_hrr','hrd_score']){state.selected=new Set(ids);runLab();gotoStep('report');}
 function second(correct=true){gotoStep('reasoning_follow');answerStage(correct);}
 function final(ids=['liquid_biopsy']){
  ovarRejectRound1();state.selected=new Set(ids);runLab();gotoStep('follow_report');ovarFinalizeAfterRound2();
  state.mtb.points={artifact:true,confirmation:true,brca:true,hrd:true,germline:true};
 }
 function outcome(name){outcomes.push({name,patient:patientScore(),total:totalScore(),totals:totals(),report:state.report,phase:state.ovarMP.phase,decision:state.ovarMP.decision,gates:v15GateScore()});}
 fresh();
 check('first gate inserted between material and order',currentSteps().map(s=>s[0]).join(',')==='intake,history,histo,material,reasoning,order,lab,report');
 gotoStep('order');check('order blocked until first submission',state.step==='reasoning'&&!v15GateSubmitted());
 check('only two pre-run questions available',v15GateQuestions().length===2&&v15GateQuestions().every(q=>q.stage===before));
 let html=renderContent();
 check('first UI has no later question or VAF/result clue',html.includes('ovar_clinical_question')&&html.includes('ovar_archival_material')&&!html.includes('ovar_brca1_reliability')&&!html.includes('ovar_confirmation_strategy')&&!html.includes('VAF'));
 check('no assessment feedback before submission',!html.includes('gate-option correct')&&!html.includes('gate-score'));
 submitReasoningGate();check('empty submission refused',!api.submittedStage(before));
 state.selected=new Set(['tumor_brca_hrr','hrd_score']);state.step='order';runLab();
 check('direct lab call cannot bypass first gate',state.step==='reasoning'&&state.ovarMP.report1===null&&state.report===null);
 ovarRejectRound1();check('premature reject does not change phase or selection',state.ovarMP.phase==='round1'&&state.ovarMP.decision===null&&state.selected.size===2);
 gotoStep('reasoning_follow');check('premature second navigation does not reveal later questions',state.step==='reasoning'&&!renderContent().includes('ovar_brca1_reliability'));
 answerStage();
 check('first gate submitted independently',api.submittedStage(before)&&!api.submittedStage(after)&&v15GateSubmitted());
 check('correct first gate uses only applicable score denominator',v15GateScore().max===2&&v15GateScore().pct===1);
 check('future gate does not create missing-gate cap',!v15ActiveErrors(patientScore()).some(e=>e.label.includes('Gate nicht abgeschlossen')));
 v15ContinueAfterGate();check('first continuation enters order',state.step==='order');
 gotoStep('report');check('report requires actual run',state.step==='order'&&!api.afterAvailable());
 // Partial primary testing cannot unlock the second gate.
 round1(['tumor_brca_hrr']);
 check('partial round1 remains partial and has no second gate',state.report.kind==='partial'&&!api.afterAvailable()&&!currentSteps().some(s=>s[0]==='reasoning_follow'));
 gotoStep('reasoning_follow');check('partial report cannot expose second questions',state.step==='report'&&!renderContent().includes('ovar_brca1_reliability'));
 gotoStep('order');state.selected=new Set(['tumor_brca_hrr','hrd_score']);runLab();
 check('laboratory alone does not unlock later questions',state.step==='lab'&&!api.afterAvailable()&&v15GateQuestions().length===2);
 gotoStep('report');
 check('full reviewed round1 unlocks second stage only then',api.afterAvailable()&&currentSteps().findIndex(s=>s[0]==='reasoning_follow')===currentSteps().findIndex(s=>s[0]==='report')+1);
 html=renderContent();
 check('report routes through reasoning before decision',html.includes("gotoStep('reasoning_follow')")&&!html.includes('onclick="ovarAcceptRound1()"')&&!html.includes('onclick="ovarRejectRound1()"'));
 check('round1 assets test-gated and no confirmation/final assets',html.includes(MolPathOVAR001FlagshipAssets.tumorNgs)&&html.includes(MolPathOVAR001FlagshipAssets.hrd)&&html.includes(MolPathOVAR001FlagshipAssets.qc)&&!html.includes(MolPathOVAR001FlagshipAssets.liquid)&&!html.includes(MolPathOVAR001FlagshipAssets.final));
 const saved=JSON.stringify({phase:state.ovarMP.phase,decision:state.ovarMP.decision,selected:[...state.selected]});
 ovarAcceptRound1();check('direct acceptance blocked without second gate',state.step==='reasoning_follow'&&saved===JSON.stringify({phase:state.ovarMP.phase,decision:state.ovarMP.decision,selected:[...state.selected]}));
 ovarRejectRound1();check('direct rejection blocked without second gate',state.step==='reasoning_follow'&&state.ovarMP.phase==='round1');
 gotoStep('follow_order');check('round2 navigation blocked without second gate',state.step==='reasoning_follow');
 gotoStep('mtb');check('MTB navigation blocked without second gate',state.step==='reasoning_follow');
 html=renderContent();
 check('second UI shows exactly its two questions',html.includes('ovar_brca1_reliability')&&html.includes('ovar_confirmation_strategy')&&!html.includes('name="ovar_clinical_question"')&&!html.includes('name="ovar_archival_material"'));
 check('aggregate score includes both stages after report',v15GateScore().max===4&&!v15GateSubmitted());
 const firstAnswers=JSON.stringify(api.questions(before).map(q=>v15GetAnswer(q.id)));
 submitReasoningGate();check('second empty submission refused and first preserved',!api.submittedStage(after)&&JSON.stringify(api.questions(before).map(q=>v15GetAnswer(q.id)))===firstAnswers);
 answerStage();check('four answers aggregated independently of displayed stage',v15GateSubmitted()&&v15GateScore().max===4&&v15GateScore().pct===1);
 check('decision buttons appear after second submission',renderContent().includes('onclick="ovarAcceptRound1()"')&&renderContent().includes('onclick="ovarRejectRound1()"'));
 final();
 check('confirmed final reaches MTB with both gates',state.step==='mtb'&&state.ovarMP.phase==='final'&&v15GateSubmitted(),{step:state.step,phase:state.ovarMP.phase,decision:state.ovarMP.decision,report1:state.ovarMP.report1,viewed:state.viewed,gates:state.gates});
 check('correct final raw and total scores reach 100',patientScore().pct===100&&totalScore().pct===100,{patient:patientScore().pct,total:totalScore().pct});
 check('completed gates remove phantom 80 percent cap',!v15ActiveErrors(patientScore()).some(e=>e.label.includes('Gate nicht abgeschlossen')));
 check('final report contains all four reasoning rows',qaApproved.every(q=>v18ClinicalReasoningHtml().includes(esc(api.questions(q.stage).find(x=>x.id===q.id).prompt))));
 check('final asset appears after confirmation',renderMtb().includes(MolPathOVAR001FlagshipAssets.final));
 outcome('confirmed final');
 // A later visit/edit invalidates only the edited gate, with a safe continuation.
 const secondAnswers=JSON.stringify(api.questions(after).map(q=>v15GetAnswer(q.id)));
 gotoStep('reasoning');const q=api.questions(before)[0];v15AnswerGate(q.id,q.options.find(o=>o.correct).id,false,true);
 check('editing first invalidates first only',!api.submittedStage(before)&&api.submittedStage(after)&&JSON.stringify(api.questions(after).map(q=>v15GetAnswer(q.id)))===secondAnswers);
 gotoStep('mtb');check('final navigation rechecks edited gate',state.step==='reasoning');
 submitReasoningGate();v15ContinueAfterGate();check('re-submitted first gate returns to existing final phase',state.step==='mtb'&&v15GateSubmitted());
 fresh();first();round1();second();ovarAcceptRound1();state.mtb.points={artifact:true,confirmation:true,brca:true,hrd:true,germline:true};
 check('early acceptance retains existing 62 percent cap',state.ovarMP.phase==='accepted_bad'&&patientScore().pct<=62&&totalScore().pct<=62);outcome('early acceptance');
 fresh();first();round1();second();final([]);
 check('missing confirmation retains existing 78 percent cap',state.ovarMP.phase==='final'&&patientScore().pct<=78&&totalScore().pct<=78);outcome('final without confirmation');
 fresh();first(false);round1();second(false);final();
 check('wrong completed answers permit progress with existing score penalty',state.step==='mtb'&&v15GateSubmitted()&&v15GateScore().pct===0&&totalScore().pct<=80);outcome('wrong reasoning confirmed final');
 // MS scoring uses semantic IDs, not shuffled positions.
 fresh();gotoStep('reasoning');const ms=api.questions(before).find(q=>q.multi),yes=ms.options.filter(o=>o.correct),no=ms.options.filter(o=>!o.correct);
 v15AnswerGate(ms.id,yes[0].id,true,true);check('one of two correct MS choices receives half credit',v15QuestionScore(ms)===0.5);
 v15AnswerGate(ms.id,yes[1].id,true,true);check('both correct MS choices receive full credit',v15QuestionScore(ms)===1);
 v15AnswerGate(ms.id,no[0].id,true,true);check('one false MS choice subtracts half credit',v15QuestionScore(ms)===0.5);
 v15AnswerGate(ms.id,no[0].id,true,false);check('unchecked false choice is removed',v15QuestionScore(ms)===1);
 const unchanged=JSON.stringify(state.gates);v15AnswerGate(ms.id,'invalid_option',true,true);v15AnswerGate('future_question','invalid_option',false,true);
 check('invalid or unavailable answer IDs do not mutate state',JSON.stringify(state.gates)===unchanged);
 fresh();first();round1();second();gotoStep('order');state.selected=new Set(['tumor_brca_hrr','hrd_score']);runLab();
 check('rerun preserves first and invalidates only later gate',api.submittedStage(before)&&!api.submittedStage(after)&&!api.afterAvailable()&&api.questions(after).every(q=>v15GetAnswer(q.id).length===0));
 gotoStep('report');ovarRejectRound1();check('rerun requires a fresh second submission',state.ovarMP.phase==='round1'&&state.step==='reasoning_follow');
 fresh('assessment');first();gotoStep('reasoning');
 check('assessment hides correctness and score after submission',!renderContent().includes('gate-option correct')&&!renderContent().includes('gate-score')&&!renderContent().includes('Teilscore:'));
 gotoStep('order');round1();second();
 check('assessment second gate hides answers and rationale',!renderContent().includes('gate-option correct')&&!renderContent().includes('gate-score')&&!renderContent().includes(api.questions(after)[0].rationale));
 final();state.finalized=true;gotoStep('reasoning_follow');
 check('assessment feedback appears after case completion',renderContent().includes('gate-option correct')&&renderContent().includes('gate-score'));
 fresh('instructor');gotoStep('reasoning');check('instructor first gate displays solutions for first stage only',renderContent().includes('gate-option correct')&&!renderContent().includes('ovar_brca1_reliability'));
 gotoStep('order');round1();gotoStep('reasoning_follow');check('instructor can navigate to second stage after actual report',state.step==='reasoning_follow'&&renderContent().includes('gate-option correct'));
 fresh();first();round1();second();switchCase('MTB_CRC_001_v0_6');switchCase('MTB_OVAR_001_v0_7');
 check('case switch resets answers, stages and prior run',Object.keys(state.gates.answers).length===0&&!v15GateSubmitted()&&!api.submittedStage(after)&&state.ovarMP.report1===null);
 // Exact approved German source and stable translated semantic IDs.
 for(const expected of qaApproved){
  const actual=api.questions(expected.stage).find(q=>q.id===expected.id),source=MolPathCanonicalDataA4b.cases.find(r=>r.id===activeCase.id).deep_dive.reasoning_gate_upgrade.find(q=>q.id===expected.id);
  check('approved question and correct IDs '+expected.id,equal(source,expected)&&equal(actual.options.filter(o=>o.correct).map(o=>o.id).sort(),expected.correct.slice().sort()));
  check('translation complete '+expected.id,[actual.prompt,...actual.options.map(o=>o.label),actual.rationale].every(t=>typeof t==='string'&&t.length>0)&&(MolPathI18n.currentLang()==='de'||[actual.prompt,...actual.options.map(o=>o.label),actual.rationale].every(t=>![expected.prompt,...expected.options.map(o=>o.label),expected.rationale].includes(t))));
 }
 check('localized stage labels in navigation',currentSteps().find(s=>s[0]==='reasoning')[1]===api.ui(0));
 uiMode='learning';
 return {checks,outcomes};
}

function qaShuffleAndLanguage(){
 const checks=[],orders=new Set(),positions=new Set(),api=MolPathOvarReasoningA610;
 uiMode='learning';MolPathI18n.setLang('de');
 for(let i=0;i<24;i++){
  switchCase('MTB_OVAR_001_v0_7');gotoStep('reasoning');const qs=v15GateQuestions();
  orders.add(qs.map(q=>q.options.map(o=>o.id).join(',')).join('|'));
  positions.add(qs[0].options.findIndex(o=>o.correct));
 }
 checks.push({name:'fresh attempts shuffle option positions',pass:orders.size>1&&positions.size>1,detail:{uniqueOrders:orders.size,correctPositions:[...positions]}});
 const first=api.questions('before_round1')[0];v15AnswerGate(first.id,first.options.find(o=>o.correct).id,false,true);
 const order=JSON.stringify(Object.fromEntries(qaApproved.map(q=>[q.id,api.questions(q.stage).find(x=>x.id===q.id).options.map(o=>o.id)]))),answer=JSON.stringify(state.gates.answers);
 for(const lang of ['de','en','ro','el','es','fr','ru','tr','ar','fa','uk','de']){
  MolPathI18n.setLang(lang);render();
  const now=JSON.stringify(Object.fromEntries(qaApproved.map(q=>[q.id,api.questions(q.stage).find(x=>x.id===q.id).options.map(o=>o.id)])));
  checks.push({name:'language preserves answers/order/score '+lang,pass:now===order&&JSON.stringify(state.gates.answers)===answer&&v15QuestionScore(api.questions('before_round1')[0])===1});
  const rtl=['ar','fa'].includes(lang);
  checks.push({name:'existing direction attributes '+lang,pass:document.documentElement.dir===(rtl?'rtl':'ltr'),detail:document.documentElement.dir});
 }
 return checks;
}
