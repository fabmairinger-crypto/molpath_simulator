const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const run=__dirname,roots=[process.argv[2]||path.join(run,'../a6_12/candidate'),process.argv[3]||path.join(run,'candidate')];
function environment(root){
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),script=html.match(/<script id="v240z11_global_baseline_polish"[^>]*>([\s\S]*?)<\/script>/)[1];
 let steps=[['brief','Auftrag'],['material','Material'],['reasoning','Reasoning'],['report','Report']],lang='de',domain='mtb',element=null,writes=0,identity=0;
 const make=()=>({className:'',scrollLeft:0,clientWidth:100,_html:'',buttonIdentity:0,active:{offsetLeft:200,offsetWidth:20},get innerHTML(){return this._html},set innerHTML(v){writes++;this.buttonIdentity=++identity;this._html=String(v).replace(/ disabled(?=>)/g,' disabled=""')},querySelector(){return this.active}});
 element=make();const ctx=vm.createContext({window:null,document:{readyState:'loading',addEventListener(){},getElementById(id){return id==='steps'?element:null},querySelectorAll(){return []}},console:{log(){},warn(...a){throw new Error(a.join(' '))}},localStorage:{getItem(){return lang}},currentSteps(){return steps},state:{step:'brief',viewed:{}},isLab(){return domain==='lab'},isResearch(){return domain==='res'},WeakMap,Map,Set});ctx.window=ctx;ctx.MolPathI18n={translate(s,l){return l==='de'?s:l+': '+s}};
 const exposed=script.replace('function z11PostRender(){','window.qaTimeline=z11RenderTimeline;function z11PostRender(){');vm.runInContext(exposed,ctx);
 return {ctx,make,render(){ctx.qaTimeline();return {html:element.innerHTML,className:element.className,scroll:element.scrollLeft}},get node(){return element},get writes(){return writes},configure(o){if(o.lang)lang=o.lang;if(o.domain)domain=o.domain;if(o.steps)steps=o.steps;if(o.step)ctx.state.step=o.step;if(o.viewed)ctx.state.viewed=o.viewed},replace(){element=make()}};
}
const [a,b]=roots.map(environment),checks=[];function check(name,fn){fn();checks.push({name,pass:true})}
function equal(){assert.deepStrictEqual(b.render(),a.render())}
check('initial serialized DOM parity',equal);
check('repeat render retains buttons despite browser-style attribute serialization',()=>{const n=b.node.buttonIdentity,w=b.writes;equal();assert.strictEqual(b.node.buttonIdentity,n);assert.strictEqual(b.writes,w)});
for(const domain of ['mtb','lab','res'])for(const lang of ['de','en','ro','el','es','fr','ru','tr','ar','fa','uk']){
 check(domain+' '+lang+' step/visited/locked parity',()=>{for(const e of [a,b])e.configure({domain,lang,step:'material',viewed:{brief:true}});equal();const n=b.node.buttonIdentity;equal();assert.strictEqual(b.node.buttonIdentity,n)})
}
check('future gate added and removed',()=>{for(const steps of [[['brief','Auftrag'],['report','Report'],['reasoning_follow','Gate 2']],[['brief','Auftrag'],['report','Report']]]){for(const e of [a,b])e.configure({steps,step:'report',viewed:{brief:true,report:true}});equal()}});
check('external DOM mutation repaired on next render',()=>{for(const e of [a,b])e.node.innerHTML='<button>EXTERNAL CHANGE</button>';const w=b.writes;equal();assert.strictEqual(b.writes,w+1)});
check('replacement root receives new markup',()=>{a.replace();b.replace();equal();assert(b.node.innerHTML.includes('z11-top-step'))});
check('scroll correction retained even without DOM rewrite',()=>{for(const e of [a,b])e.node.scrollLeft=0;const w=b.writes;equal();assert.strictEqual(b.writes,w);assert.strictEqual(b.node.scrollLeft,160)});
check('case with empty steps remains unchanged',()=>{for(const e of [a,b])e.configure({steps:[]});const w=b.writes;equal();assert.strictEqual(b.writes,w)});
const result={status:'PASS',total:checks.length,passed:checks.length,checks,writes:{baseline:a.writes,candidate:b.writes},limit:'isolated actual timeline script with DOM serialization fixture and synthetic labels; complete actual-language rendering is covered separately by ordered runtime QA'};fs.writeFileSync(path.join(run,'timeline_qa.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({status:result.status,total:result.total,writes:result.writes}));
