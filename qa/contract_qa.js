// Semantic contracts independent of renderer markup. Executed inside the ordered-source VM.
function qaDisplayContracts(){
  const issues=[];
  const machine=new Set(['id','case_id','base_id','mode','logic','version','difficulty','difficulty_label','case_type','length_class','estimated_time_min','estimated_minutes','estimated_minutes_deep','status','case_status','tags','allowed_tests','bad_tests','optimal_tests','acceptable_alternatives','test_any','tests','suggest','result_truth','correct','correct_option_ids','answer_key','answer_key_status','kind','type','class','position','question_types','score','budget','score_domain','signature_case','course_case','is_signature_case','deep_dive','method_filter_eligible','method_focus_domains','method_issue_types','domain','subdomain','target_course','met_addon_type','assets','src']);
  function fail(path,reason){if(issues.length<60)issues.push({path,reason})}
  function walk(a,b,p,key=''){
    if(machine.has(key)&&JSON.stringify(a)!==JSON.stringify(b))fail(p,'machine value changed');
    if(a===null||typeof a!=='object'){
      if((typeof a!=='string'||machine.has(key))&&a!==b)fail(p,'scalar changed');
      if(typeof a!==typeof b)fail(p,'type changed');return;
    }
    if(a===b)fail(p,'display object aliases canonical object');
    if(!b||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)){fail(p,'shape changed');return}
    if(Array.isArray(a)){
      if(a.length!==b.length)fail(p,'array length changed');
      if(key==='mtb_checks')a.forEach((row,i)=>{if(Array.isArray(row)&&row[0]!==b[i]?.[0])fail(p+'['+i+'][0]','MTB check id changed')});
      a.forEach((x,i)=>walk(x,b[i],p+'['+i+']'));return;
    }
    if(JSON.stringify(Object.keys(a).sort())!==JSON.stringify(Object.keys(b).sort()))fail(p,'record fields changed');
    Object.keys(a).forEach(k=>walk(a[k],b[k],p+'.'+k,k));
  }
  cases.forEach(c=>{
    walk(c,MolPathPresentationA6.case(c.id),'case:'+c.id);
    walk(DEEP_DIVE_MAP_V17[c.id],MolPathPresentationA6.deep(c.id),'deep:'+c.id);
    walk(V15_META_MAP[c.id],MolPathPresentationA6.meta(c.id),'meta:'+c.id);
    walk(V15_GATE_MAP[c.id],MolPathPresentationA6.gate(c.id),'gate:'+c.id);
  });
  return {records:cases.length*4,issues};
}
function qaHybridReports(){
  const ids=['MTB_CRC_002_v1_3','MTB_CRC_001_v0_6','MTB_NSCLC_002_v1_3','MET_NGS_003_v1_0','MTB_OVAR_002_v1_3','MTB_IO_001_v1_0'];
  const rows=[];
  for(const id of ids){
    activeCase=MolPathPresentationA6.case(id);initState();
    const absent=renderReport();
    const wanted=activeCase.required_groups.map(g=>g.suggest||g.tests[0]);
    state.selected=new Set(wanted.slice(0,1));state.report=buildReport();state.step='report';
    const partial=renderReport(),partialKind=state.report.kind;
    state.selected=new Set(wanted);state.report=buildReport();
    const full=renderReport(),fullKind=state.report.kind;
    state.finalized=true;const final=renderMtb();
    rows.push({id,pass:typeof absent==='string'&&absent.length>0&&partialKind==='partial'&&fullKind==='complete'&&[partial,full,final].every(s=>typeof s==='string'&&s.length>0&&!s.includes('undefined')&&!s.includes('BRCA2 c.X p.Y')),partialKind,fullKind,bytes:{absent:absent.length,partial:partial.length,full:full.length,final:final.length},images:{absent:(absent.match(/<img\b/g)||[]).length,partial:(partial.match(/<img\b/g)||[]).length,full:(full.match(/<img\b/g)||[]).length}});
  }
  // Both MLH1 spellings must lead to the same CRC completeness.
  for(const id of ids.slice(0,1))for(const alias of ['mlh1_methylation','methylation_mlh1']){
    activeCase=MolPathPresentationA6.case(id);initState();
    state.selected=new Set(activeCase.required_groups.map(g=>g.id==='mlh1'?alias:(g.suggest||g.tests[0])));
    rows.push({id,alias,pass:missingTests().length===0&&buildReport().kind==='complete'});
  }
  for(const ngs of ['colon_ngs_panel','broad_pan_panel']){
    activeCase=MolPathPresentationA6.case('MTB_CRC_001_v0_6');initState();state.selected=new Set(['mmr_ihc','msi_pcr_ngs','mlh1_methylation',ngs]);
    rows.push({id:activeCase.id,ngs,pass:missingTests().length===0&&buildReport().kind==='complete'});
  }
  return rows;
}
