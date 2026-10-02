/* MolPath rc2-clean A6.3 canonical data integration — SAFE INTEGRATION CANDIDATE
   Loaded after all historical content/asset layers + documented 12-case curation,
   immediately before the final Signature Taxonomy Freeze.
   Purpose: make the A4b/A5 canonical data the final data authority WITHOUT removing historical runtime hooks yet.
*/
(function(root){'use strict';
const VERSION='rc2-A6.3-canonical-integration-01';
function clone(x){if(typeof structuredClone==='function')return structuredClone(x);return JSON.parse(JSON.stringify(x));}
function replaceObject(target,source){
  if(!target||typeof target!=='object'||Array.isArray(target))throw new Error('replaceObject target invalid');
  Object.keys(target).forEach(k=>{try{delete target[k]}catch(_){target[k]=undefined}});
  Object.assign(target,clone(source));
  return target;
}
function syncCaseArray(target,source){
  const oldById=new Map((target||[]).filter(Boolean).map(x=>[String(x.id),x]));
  const next=[];
  for(const src of source){
    const id=String(src.id);let dst=oldById.get(id);
    if(!dst)dst={};
    replaceObject(dst,src);next.push(dst);
  }
  target.splice(0,target.length,...next);
}
function syncRecordArrayMap(arr,map,sourceMap,orderIds,key='case_id'){
  const existing=new Map();
  (arr||[]).forEach(x=>{if(x&&x[key]!=null)existing.set(String(x[key]),x)});
  if(map&&typeof map==='object')Object.keys(map).forEach(id=>{const x=map[id];if(x&&!existing.has(String(id)))existing.set(String(id),x)});
  const next=[];
  for(const id of orderIds){
    if(!Object.prototype.hasOwnProperty.call(sourceMap,id))continue;
    let dst=existing.get(String(id));if(!dst)dst={};
    replaceObject(dst,sourceMap[id]);next.push(dst);
  }
  arr.splice(0,arr.length,...next);
  Object.keys(map).forEach(k=>delete map[k]);
  next.forEach(x=>{map[String(x[key])]=x});
}
function syncArrayById(arr,source,key='id'){
  const existing=new Map((arr||[]).filter(Boolean).map(x=>[String(x[key]),x]));
  const next=[];
  for(const src of source){let dst=existing.get(String(src[key]));if(!dst)dst={};replaceObject(dst,src);next.push(dst)}
  arr.splice(0,arr.length,...next);
}
function eq(a,b){try{return JSON.stringify(a)===JSON.stringify(b)}catch(_){return false}}
function countKeys(x){return x&&typeof x==='object'?Object.keys(x).length:0}

if(!root.MolPathCompatibilityA5)throw new Error('A6 integration requires MolPathCompatibilityA5');
const built=root.MolPathCompatibilityA5.build();
const ids=built.cases.map(c=>String(c.id));

if(typeof cases==='undefined'||!Array.isArray(cases))throw new Error('historical cases[] missing');
if(typeof V15_META_RECORDS==='undefined'||typeof V15_GATE_RECORDS==='undefined'||typeof V15_CAP_RECORDS==='undefined'||typeof V15_METHOD_RULE_RECORDS==='undefined')throw new Error('V15 record arrays missing');
if(typeof V15_META_MAP==='undefined'||typeof V15_GATE_MAP==='undefined'||typeof V15_CAP_MAP==='undefined'||typeof V15_METHOD_RULE_MAP==='undefined')throw new Error('V15 maps missing');
if(typeof DEEP_DIVE_CASES_V17==='undefined'||typeof DEEP_DIVE_MAP_V17==='undefined')throw new Error('Deep-Dive interfaces missing');
if(typeof COURSES_V16==='undefined'||!Array.isArray(COURSES_V16))throw new Error('COURSES_V16 missing');

// Preserve active top-level case object identity where possible; only its content becomes canonical.
syncCaseArray(cases,built.cases);
syncRecordArrayMap(V15_META_RECORDS,V15_META_MAP,built.V15_META_MAP,ids,'case_id');
syncRecordArrayMap(V15_GATE_RECORDS,V15_GATE_MAP,built.V15_GATE_MAP,ids,'case_id');
syncRecordArrayMap(V15_CAP_RECORDS,V15_CAP_MAP,built.V15_CAP_MAP,ids,'case_id');
syncRecordArrayMap(V15_METHOD_RULE_RECORDS,V15_METHOD_RULE_MAP,built.V15_METHOD_RULE_MAP,ids,'case_id');
syncRecordArrayMap(DEEP_DIVE_CASES_V17,DEEP_DIVE_MAP_V17,built.DEEP_DIVE_MAP_V17,ids,'case_id');
syncArrayById(COURSES_V16,built.COURSES_V16,'id');

// Keep the legacy case.v15 compatibility pointer structurally and semantically aligned with the canonical V15 metadata record.
cases.forEach(c=>{if(c&&V15_META_MAP[c.id])c.v15=V15_META_MAP[c.id]});

// The confirmed persistent z12 metadata writer is disabled source-level in the A6 candidate index.
const z12WriterDisabled=root.MolPathZ12MetadataWriterDisabledA6===true;

const courseIds=new Set();COURSES_V16.forEach(c=>(c&&Array.isArray(c.cases)?c.cases:[]).forEach(id=>courseIds.add(String(id))));
const signatureCount=cases.filter(c=>c&&c.signature_case===true).length;
const checks={
  cases91:cases.length===91&&new Set(cases.map(c=>String(c.id))).size===91,
  deep91:DEEP_DIVE_CASES_V17.length===91&&countKeys(DEEP_DIVE_MAP_V17)===91,
  v15Meta91:countKeys(V15_META_MAP)===91,
  v15Gate91:countKeys(V15_GATE_MAP)===91,
  v15Cap91:countKeys(V15_CAP_MAP)===91,
  v15Method91:countKeys(V15_METHOD_RULE_MAP)===91,
  courses5:COURSES_V16.length===5,
  courseCases23:courseIds.size===23,
  signature30BeforeFinalFreeze:signatureCount===30,
  z12WriterDisabled:z12WriterDisabled,
  z12LegacyTableRemoved:(typeof V240Z12_META==='undefined'),
  methodFocusCanonical:!!(root.MolPathMethodFocusRegistry&&root.MolPathCanonicalMethodFocusA5&&eq(root.MolPathMethodFocusRegistry.registry,root.MolPathCanonicalMethodFocusA5.registry)),
  casePayloadCanonical:eq(cases,built.cases),
  deepPayloadCanonical:eq(DEEP_DIVE_CASES_V17,built.DEEP_DIVE_CASES_V17),
  coursesCanonical:eq(COURSES_V16,built.COURSES_V16)
};
const pass=Object.values(checks).every(Boolean);
root.MolPathCanonicalIntegrationA6=Object.freeze({version:VERSION,pass,checks:Object.freeze(checks),counts:Object.freeze({cases:cases.length,deep:DEEP_DIVE_CASES_V17.length,courses:COURSES_V16.length,courseCases:courseIds.size,signatureBeforeFinalFreeze:signatureCount}),policy:'canonical data synced once; z12 legacy table removed/writer disabled; course + Methods Focus registries canonical; hybrid renderer/i18n layers read detached presentation records; semantic hybrid writers retired'});
if(!pass)throw new Error('A6 canonical integration self-check failed: '+JSON.stringify(checks));
root.MolPathPresentationA6.configure({cases:cases,meta:V15_META_MAP,gate:V15_GATE_MAP,deep:DEEP_DIVE_MAP_V17});
if(typeof activeCase!=='undefined'&&activeCase)activeCase=root.MolPathPresentationA6.case(activeCase.id)||activeCase;
try{console.log('[MolPath '+VERSION+'] canonical data integration PASS',root.MolPathCanonicalIntegrationA6)}catch(_){}
})(typeof window!=='undefined'?window:globalThis);
