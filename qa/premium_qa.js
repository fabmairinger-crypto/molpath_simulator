const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const run=__dirname,roots=[process.argv[2]||path.join(run,'../a6_11/candidate'),process.argv[3]||path.join(run,'candidate')];
function environment(root){
 let calls=0,lists=0;const texts=[],warnings=[];
 const document={readyState:'loading',currentScript:null,write(){},addEventListener(){},body:{getAttribute(){return 'de'}},querySelectorAll(sel){return sel==='.lab24-section,.res24i-section'?[{}]:sel==='.lab24-section .warnbox'?warnings:[]},createTreeWalker(){let i=0;return {nextNode(){this.currentNode=texts[i++];return !!this.currentNode}}}};
 const ctx=vm.createContext({document,window:null,localStorage:{getItem(){return 'de'}},NodeFilter:{SHOW_TEXT:4},Map,Set,filteredCases(){return []}});ctx.window=ctx;
 const execute=s=>vm.runInContext(s,ctx);
 execute(fs.readFileSync(path.join(root,'i18n/languages.js'),'utf8'));
 const codes=ctx.MolPathLanguageRegistry.codes();for(const code of codes)execute(fs.readFileSync(path.join(root,'i18n',code+'.js'),'utf8'));
 const original=ctx.MolPathLocaleRegistry,language=ctx.MolPathLanguageRegistry;
 ctx.MolPathLocaleRegistry={...original,namespace(...args){calls++;return original.namespace(...args)}};
 ctx.MolPathLanguageRegistry={...language,list(){lists++;return language.list()}};
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');let script=html.match(/<script id="v240l_performance_signature_filter"[^>]*>([\s\S]*?)<\/script>/)[1];
 script=script.replace('const prevAfter=window.MolPathI18nAfterApply;','window.qaLocalize=localizePremium;const prevAfter=window.MolPathI18nAfterApply;');execute(script);
 return {ctx,codes,original,language,texts,warnings,apply(values,lang){document.body.getAttribute=()=>lang;texts.splice(0,texts.length,...values.map(nodeValue=>({nodeValue})));calls=lists=0;ctx.qaLocalize();return {values:texts.map(x=>x.nodeValue),calls,lists}}};
}
const [a,b]=roots.map(environment),checks=[],metrics=[];
const keys=['labRun','labQc','labDecision','labCause','labCapa','labAudit','caseFile','projectBrief','constraints','recorded','pending','ready','resProject','resContext','resHypothesis','resPico','resDesign','resMethods','resAnalysis','deviation','immediate','rootCause','corrective','preventive','effectiveness'];
const corpus=['','  ','unknown text','12 unknown','-1 selected','1.5 selected'];
for(const code of a.codes){const copy=a.original.namespace('v240l',code);for(const k of keys)corpus.push(copy[k],' \t'+copy[k]+'\n');for(const n of ['0','1','12','0003','999999'])corpus.push(n+' '+copy.selected,'  '+n+' '+copy.selected+'\t');}
for(const lang of a.codes){const x=a.apply(corpus,lang),y=b.apply(corpus,lang);assert.deepStrictEqual(y.values,x.values);assert(y.calls<=12&&y.lists===1);checks.push({name:'exact mixed-language text/whitespace/count parity '+lang,pass:true,nodes:corpus.length});metrics.push({lang,before:x.calls,after:y.calls,listBefore:x.lists,listAfter:y.lists});}
// A later registry update must be visible in the next pass, with source fallback.
for(const e of [a,b]){const old=e.original.get('en');e.original.register('en',{...old,namespaces:{...old.namespaces,v240l:{...old.namespaces.v240l,labRun:'UPDATED RUN',selected:'UPDATED COUNT'}}});}
const x=a.apply(['Laufdaten','12 ausgewählt','UPDATED RUN','4 UPDATED COUNT'],'en'),y=b.apply(['Laufdaten','12 ausgewählt','UPDATED RUN','4 UPDATED COUNT'],'en');assert.deepStrictEqual(y.values,x.values);assert(y.values.includes('UPDATED RUN'));checks.push({name:'locale update visible on next pass',pass:true});
for(const e of [a,b])e.warnings.push({textContent:'CAPA nochmal',innerHTML:''});a.apply([],'de');b.apply([],'de');assert.deepStrictEqual(b.warnings,a.warnings);checks.push({name:'didactic CAPA warnbox parity',pass:true});
const result={status:'PASS',checks,total:checks.length,passed:checks.length,metrics,limit:'actual isolated premium script and actual locale sources; text-node DOM fixture, no browser timing claim'};fs.writeFileSync(path.join(run,'premium_qa.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
