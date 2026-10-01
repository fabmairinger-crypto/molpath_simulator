/* MolPath rc2-clean A5 Compatibility Adapter — DRY-RUN CANDIDATE
   Purpose: regenerate historical data interfaces from one canonical source without mutating the current simulator unless install() is explicitly called.
   Required before this file: rc2_A4b_canonical_cases_lossless.js, rc2_A5_courses.js, rc2_A5_method_focus.js
   NOT wired into index.html. */
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
})(typeof window!=='undefined'?window:globalThis);
