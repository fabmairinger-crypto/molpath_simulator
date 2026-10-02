/* MolPath rc2-clean A5 Compatibility Adapter + A6.3 detached presentation.
   Definitions load early; build()/install() require A4b + A5 courses/methods at call time.
   A6 integration supplies canonical compatibility data once and configures display records. */
(function(root){'use strict';
const VERSION='rc2-A5-compatibility-adapter-01';

function clone(x){
  if(typeof structuredClone==='function')return structuredClone(x);
  return JSON.parse(JSON.stringify(x));
}
function baseId(id){return String(id||'').replace(/_v\d+(?:_\d+)+$/,'');}
function requireData(){
  const canonical=root.MolPathCanonicalDataA4b;
  const courseData=root.MolPathCanonicalCoursesA5;
  const methodData=root.MolPathCanonicalMethodFocusA5;
  if(!canonical||!Array.isArray(canonical.cases))throw new Error('MolPathCanonicalDataA4b missing/invalid');
  if(!courseData||!Array.isArray(courseData.courses))throw new Error('MolPathCanonicalCoursesA5 missing/invalid');
  if(!methodData||!methodData.registry)throw new Error('MolPathCanonicalMethodFocusA5 missing/invalid');
  return {canonical,courseData,methodData};
}
function build(){
  const {canonical,courseData,methodData}=requireData();
  const records=canonical.cases;
  const cases=records.map(r=>{
    const c=clone(r.case);
    // Historical runtime only created course_case on true course cases; keep compatibility exact.
    if(c.course_case===false)delete c.course_case;
    return c;
  });
  const V15_META_MAP={};
  const V15_GATE_MAP={};
  const V15_CAP_MAP={};
  const V15_METHOD_RULE_MAP={};
  const DEEP_DIVE_CASES_V17=[];
  records.forEach(r=>{
    const id=r.id;
    V15_META_MAP[id]=clone(r.case.v15);
    V15_GATE_MAP[id]=clone(r.evaluation.clinical_reasoning_gate);
    V15_CAP_MAP[id]=clone(r.evaluation.score_cap);
    V15_METHOD_RULE_MAP[id]=clone(r.evaluation.method_rules);
    DEEP_DIVE_CASES_V17.push(clone(r.deep_dive));
  });
  const DEEP_DIVE_MAP_V17=Object.fromEntries(DEEP_DIVE_CASES_V17.map(d=>[d.case_id,d]));
  const COURSES_V16=clone(courseData.courses);
  const methodRegistry=clone(methodData.registry);
  const methodFocusRegistry={
    version:methodData.version,
    driverCount:Object.keys(methodRegistry).length,
    domains:clone(methodData.domains),
    registry:methodRegistry,
    rule:methodData.rule
  };
  const courseIds=new Set();
  COURSES_V16.forEach(course=>(course&&Array.isArray(course.cases)?course.cases:[]).forEach(id=>courseIds.add(String(id))));
  const signatureIds=new Set(records.filter(r=>r.taxonomy&&r.taxonomy.signature_case).map(r=>r.id));
  const signatureBaseIds=new Set([...signatureIds].map(baseId));
  const EXTRA_SIGNATURE_BASE_IDS=[...signatureBaseIds].filter(b=>![...courseIds].map(baseId).includes(b));
  const signatureTaxonomy={
    version:'v2.6.0-rc1-signature-taxonomy-freeze4-loop-safe',
    rule:'Course Case => Signature Case',
    courseCaseCount:courseIds.size,
    extraSignatureBaseIds:EXTRA_SIGNATURE_BASE_IDS,
    signatureCaseIds:[...signatureIds],
    signatureBaseIds:[...signatureBaseIds],
    signatureCount:signatureIds.size,
    caseLibraryFilterAuthority:'finalFilteredCases',
    visiblePrestigeBadge:'Signature Case only',
    deepDiveVisibility:'internal metadata only'
  };
  return {
    version:VERSION,
    cases,
    V15_META_MAP,
    V15_GATE_MAP,
    V15_CAP_MAP,
    V15_METHOD_RULE_MAP,
    DEEP_DIVE_CASES_V17,
    DEEP_DIVE_MAP_V17,
    COURSES_V16,
    MolPathMethodFocusRegistry:methodFocusRegistry,
    MolPathSignatureTaxonomyFreeze:signatureTaxonomy,
    MolPathIsSignatureCase:function(c){return !!c&&signatureIds.has(String(c.id));},
    MolPathIsCourseCase:function(c){return !!c&&courseIds.has(String(c.id));}
  };
}
function install(opts){
  opts=opts||{};
  if(opts.force!==true)throw new Error('A5 adapter install blocked: pass {force:true} explicitly. Dry-run is the default.');
  const x=build();
  root.cases=x.cases;
  root.V15_META_MAP=x.V15_META_MAP;
  root.V15_GATE_MAP=x.V15_GATE_MAP;
  root.V15_CAP_MAP=x.V15_CAP_MAP;
  root.V15_METHOD_RULE_MAP=x.V15_METHOD_RULE_MAP;
  root.DEEP_DIVE_CASES_V17=x.DEEP_DIVE_CASES_V17;
  root.DEEP_DIVE_MAP_V17=x.DEEP_DIVE_MAP_V17;
  root.COURSES_V16=x.COURSES_V16;
  root.MolPathMethodFocusRegistry=Object.freeze(x.MolPathMethodFocusRegistry);
  root.MolPathSignatureTaxonomyFreeze=Object.freeze(x.MolPathSignatureTaxonomyFreeze);
  root.MolPathIsSignatureCase=x.MolPathIsSignatureCase;
  root.MolPathIsCourseCase=x.MolPathIsCourseCase;
  return x;
}
root.MolPathCompatibilityA5=Object.freeze({version:VERSION,build,install});
// A6.3: detached display records. Canonical case, V15 and Deep-Dive records stay authoritative.
const presentationProviders=new Map();
const presentationRoots=new WeakMap();
const presentationProtected=new Set(['id','case_id','base_id','version','mode','logic','difficulty','difficulty_label','case_type','length_class','estimated_time_min','estimated_minutes','estimated_minutes_deep','case_status','status','review_flag','review_priority','met_addon_type','tags','test_any','tests','suggest','allowed_tests','bad_tests','optimal_tests','acceptable_alternatives','result_truth','signature_case','course_case','course_ids','deep_dive','is_signature_case','method_filter_eligible','method_focus_domains','method_issue_types','correct','correct_option_ids','answer_key','answer_key_status','kind','type','class','position','question_types','score','budget','score_domain','target_course','domain','subdomain','domains','issues','assets','src']);
let presentationData=null,presentationLang='',presentationViews={};
function displayLang(){
  let l='de';try{l=(document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||'de'}catch(_){}
  return root.MolPathLanguageRegistry?root.MolPathLanguageRegistry.normalize(l):l;
}
function displayReady(){return !!presentationData}
function ensureDisplayLanguage(){const l=displayLang();if(l!==presentationLang){presentationLang=l;presentationViews={}}return l}
function translateDisplayString(s,l){
  if(l==='de')return s;
  const dict=root.MolPathI18n&&root.MolPathI18n.dict&&root.MolPathI18n.dict[l];
  return dict&&typeof dict[s]==='string'?dict[s]:s;
}
function displayStrings(v,key,l){
  if(presentationProtected.has(key))return v;
  if(typeof v==='string')return translateDisplayString(v,l);
  if(Array.isArray(v)){
    if(key==='mtb_checks')return v.map(row=>Array.isArray(row)?row.map((cell,i)=>displayStrings(cell,i===0?'id':'',l)):displayStrings(row,'',l));
    return v.map(x=>displayStrings(x,'',l));
  }
  if(v&&typeof v==='object'){Object.keys(v).forEach(k=>{v[k]=displayStrings(v[k],k,l)});}
  return v;
}
function displayRecord(kind,id){
  if(!presentationData)return null;
  const l=ensureDisplayLanguage(),key=kind+':'+id;
  if(presentationViews[key])return presentationViews[key];
  const src=presentationData[kind]&&presentationData[kind][id];if(!src)return null;
  const view=displayStrings(clone(src),'',l);presentationViews[key]=view;
  presentationRoots.set(view,{kind,id});
  if(kind==='case'){
    view.v15=displayRecord('meta',id)||view.v15;
    const provider=presentationProviders.get(id);if(provider)provider(view,displayRecord('deep',id),l);
  }
  return view;
}
function displayTarget(target){
  if(!presentationData||!target||typeof target!=='object')return target;
  const ref=presentationRoots.get(target);return ref?displayRecord(ref.kind,ref.id):target;
}
// Keyed arrays keep case/story/question identity. Only display strings are translated;
// outdated source wording cannot overwrite a curated canonical value.
function mergeDisplayStrings(target,source,localized,key=''){
  if(presentationProtected.has(key)||!target||!source||!localized)return target;
  target=displayTarget(target);
  if(Array.isArray(target)&&Array.isArray(source)&&Array.isArray(localized)){
    const keyed=source.some(x=>x&&typeof x==='object'&&!Array.isArray(x)&&x.id!=null);
    target.forEach((cur,i)=>{
      let si=i,li=i;
      if(keyed&&cur&&cur.id!=null){si=source.findIndex(x=>x&&x.id===cur.id);li=localized.findIndex(x=>x&&x.id===cur.id)}
      if(si<0||li<0||si>=source.length||li>=localized.length)return;
      const a=source[si],b=localized[li];
      if(typeof cur==='string'&&typeof a==='string'&&typeof b==='string'){
        if(!(key==='mtb_checks'&&i===0)&&(cur===a||cur===translateDisplayString(a,ensureDisplayLanguage())))target[i]=b;
      }else mergeDisplayStrings(cur,a,b,key==='mtb_checks'?'mtb_checks':'');
    });return target;
  }
  if(typeof target==='object'&&typeof source==='object'&&typeof localized==='object'){
    Object.keys(source).forEach(k=>{
      if(presentationProtected.has(k)||!(k in target)||!(k in localized))return;
      const a=source[k],b=localized[k],cur=target[k];
      if(typeof cur==='string'&&typeof a==='string'&&typeof b==='string'){
        if(cur===a||cur===translateDisplayString(a,ensureDisplayLanguage()))target[k]=b;
      }else mergeDisplayStrings(cur,a,b,k);
    });
  }return target;
}
function configureDisplay(data){
  presentationData={case:Object.fromEntries(data.cases.map(c=>[c.id,c])),meta:data.meta,gate:data.gate,deep:data.deep};
  for(const kind of Object.keys(presentationData))Object.entries(presentationData[kind]).forEach(([id,src])=>presentationRoots.set(src,{kind,id}));
  presentationLang='';presentationViews={};
}
root.MolPathPresentationA6=Object.freeze({
  get ready(){return displayReady()},
  configure:configureDisplay,
  case:id=>displayRecord('case',id),deep:id=>displayRecord('deep',id),meta:id=>displayRecord('meta',id),gate:id=>displayRecord('gate',id),
  target:displayTarget,mergeStrings:mergeDisplayStrings,
  register:function(id,provider){if(typeof provider!=='function')throw new Error('display provider required');presentationProviders.set(id,provider)},
  refresh:function(id){const c=displayRecord('case',id),provider=presentationProviders.get(id);if(c&&provider)provider(c,displayRecord('deep',id),ensureDisplayLanguage());return c},
  policy:'detached localization and presentation; canonical semantic records are never display targets'
});

})(typeof window!=='undefined'?window:globalThis);
