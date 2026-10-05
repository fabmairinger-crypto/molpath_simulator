// Reproducible source/runtime QA with a deliberately small DOM test double.
// This verifies JS execution, renderer callbacks and data stability; it is not a visual browser test.
const fs=require('fs'),path=require('path'),vm=require('vm'),crypto=require('crypto');
const root=path.resolve(process.argv[2]||'work/candidate');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const qaMetrics={corePaint:0,afterApplyFrames:0,observersCreated:0,observersObserved:0,observerDisconnects:0,scheduled:0};
const errors=[],logs=[],listeners=new Map(),nodes=new Map(),storage=new Map();
let clock=0,nextTask=1,tasks=[];const cancelledTasks=new Set();
function schedule(fn,ms=0,interval=false){qaMetrics.scheduled++;const id=nextTask++;tasks.push({id,at:clock+(interval?Math.max(1,ms):Math.max(0,ms)),fn,interval,ms});return id}
function clearTask(id){cancelledTasks.add(id);tasks=tasks.filter(t=>t.id!==id)}
function flush(maxClock=1000,maxTasks=5000){let n=0;while(tasks.length&&n<maxTasks){tasks.sort((a,b)=>a.at-b.at||a.id-b.id);const t=tasks.shift();if(cancelledTasks.has(t.id))continue;if(t.at>maxClock){tasks.unshift(t);break;}clock=t.at;try{if(typeof t.fn==='function')t.fn();else vm.runInContext(t.fn,ctx);}catch(e){errors.push({stage:'task',message:e.stack.split('\n').slice(0,5).join('\n')});}if(t.interval&&!cancelledTasks.has(t.id))tasks.push({...t,at:clock+Math.max(1,t.ms)});n++}if(n>=maxTasks&&tasks.some(t=>t.at<=maxClock))errors.push({stage:'clock',message:'task limit reached',pending:tasks.slice(0,6).map(t=>({at:t.at,callback:String(t.fn).slice(0,160)}))});clock=Math.max(clock,maxClock);return n}
function style(){return new Proxy({setProperty(k,v){this[k]=v},removeProperty(k){delete this[k]},getPropertyValue(k){return this[k]||''}},{get(t,k){return k in t?t[k]:''}})}
class Node{
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.nodeType=1;this.attributes={};this.dataset={};this.children=[];this.childNodes=this.children;this.style=style();this._html='';this._text='';this._value=tag==='select'?'all':'';this.checked=false;this.disabled=false;this.parentNode=null;this.parentElement=null;this.listeners=new Map();this.isConnected=true;this.className='';this.id='';const self=this;this.classList={add(...v){self.className=[...new Set([...self.className.split(/\s+/),...v])].filter(Boolean).join(' ')},remove(...v){self.className=self.className.split(/\s+/).filter(x=>!v.includes(x)).join(' ')},contains(v){return self.className.split(/\s+/).includes(v)},toggle(v,on){on=on===undefined?!this.contains(v):on;on?this.add(v):this.remove(v);return on}};}
 set innerHTML(s){this._html=String(s);this.children=[];this.childNodes=this.children;parseNodes(this._html,this);if(this.tagName==='TEMPLATE'){this.content=new Node('fragment');parseNodes(this._html,this.content)}}get innerHTML(){return this._html}
 set textContent(s){this._text=String(s);this._html=this._text}get textContent(){return this._text||this._html.replace(/<[^>]+>/g,'')}
 get innerText(){return this.textContent}get firstChild(){return this.children[0]||null}get lastChild(){return this.children.at(-1)||null}get firstElementChild(){return this.firstChild}get nextSibling(){return null}get options(){return this.children.filter(x=>x.tagName==='OPTION')}
 set value(v){this._value=String(v)}get value(){return this._value}
 setAttribute(k,v){this.attributes[k]=String(v);if(k==='id'){this.id=String(v);nodes.set(this.id,this)}if(k==='class')this.className=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(v);if(k==='value')this.value=v;if(k==='selected'&&this.parentNode)this.parentNode.value=this.value;}
 getAttribute(k){if(k==='id')return this.id||null;if(k==='class')return this.className;return this.attributes[k]??null}hasAttribute(k){return this.getAttribute(k)!==null}removeAttribute(k){delete this.attributes[k]}
 appendChild(n){if(n===this)throw new Error('invalid DOM cycle');if(n.parentNode)n.parentNode.removeChild(n);n.parentNode=this;n.parentElement=this;this.children.push(n);if(n.id)nodes.set(n.id,n);return n}append(...ns){ns.forEach(n=>this.appendChild(n))}prepend(n){this.appendChild(n)}insertBefore(n,b){return this.appendChild(n)}removeChild(n){this.children=this.children.filter(x=>x!==n);this.childNodes=this.children;n.parentNode=null;n.parentElement=null;return n}remove(){this.isConnected=false;if(this.id)nodes.delete(this.id);if(this.parentNode)this.parentNode.removeChild(this)}replaceWith(n){if(this.parentNode)this.parentNode.appendChild(n);this.remove()}
 insertAdjacentHTML(where,s){this._html+=String(s);parseNodes(String(s),this)}insertAdjacentElement(where,n){return this.appendChild(n)}cloneNode(deep){const n=new Node(this.tagName.toLowerCase());n.attributes={...this.attributes};n.id=this.id;n.className=this.className;n._text=this._text;n._value=this._value;n._html=this._html;if(deep)this.children.forEach(c=>n.appendChild(c.cloneNode?c.cloneNode(true):c));return n}
 addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,[]);this.listeners.get(type).push(fn)}removeEventListener(){}dispatchEvent(e){e.target=this;(this.listeners.get(e.type)||[]).forEach(fn=>fn(e));if(typeof this['on'+e.type]==='function')this['on'+e.type](e);return true}
 matches(sel){if(sel.includes(','))return sel.split(',').some(s=>this.matches(s.trim()));if(sel.startsWith('#'))return this.id===sel.slice(1);if(sel.startsWith('.'))return sel.split('.').slice(1).every(c=>this.classList.contains(c.split(/[ :\[]/)[0]));return this.tagName.toLowerCase()===sel.toLowerCase()}
 querySelectorAll(sel){if(sel.includes(','))return [...new Set(sel.split(',').flatMap(x=>this.querySelectorAll(x.trim())))];const last=sel.trim().split(/\s+/).at(-1);const all=[];const walk=n=>{n.children.forEach(c=>{if(c.matches(last))all.push(c);walk(c)})};walk(this);return all}querySelector(sel){if(/^#[\w-]+$/.test(sel))return nodes.get(sel.slice(1))||null;return this.querySelectorAll(sel)[0]||null}closest(sel){let n=this;while(n){if(n.matches(sel))return n;n=n.parentElement}return null}contains(n){return this===n||this.children.some(c=>c.contains(n))}
 getBoundingClientRect(){return {x:0,y:0,left:0,top:0,right:1200,bottom:800,width:1200,height:800}}scrollIntoView(){}scrollTo(){}focus(){}click(){this.dispatchEvent({type:'click',preventDefault(){},stopPropagation(){}})}get offsetWidth(){return 1200}get offsetHeight(){return 800}get clientWidth(){return 1200}get clientHeight(){return 800}
}
function parseNodes(s,parent){const re=/<(\w+)\b([^>]*)>/g;let m;while((m=re.exec(s))){const n=new Node(m[1]);for(const a of m[2].matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g))n.setAttribute(a[1],a[2]??a[3]??a[4]??'');parent.appendChild(n);}}
const doc=new Node('html');doc.documentElement=doc;doc.head=new Node('head');doc.body=new Node('body');doc.append(doc.head,doc.body);doc.readyState='loading';doc.title='MolPath Simulator';doc.createElement=t=>new Node(t);doc.createTextNode=t=>({nodeType:3,nodeValue:t,textContent:t});doc.getElementById=id=>nodes.get(id)||null;doc.addEventListener=(type,fn)=>{if(!listeners.has(type))listeners.set(type,[]);listeners.get(type).push(fn)};doc.createTreeWalker=()=>({nextNode(){return null}});doc.createDocumentFragment=()=>new Node('fragment');doc.currentScript=null;
parseNodes(html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/g,''),doc.body);
const ctx=vm.createContext({document:doc,console:{log(...v){logs.push(v.map(String).join(' '))},warn(...v){logs.push('WARN '+v.map(String).join(' '))},error(...v){logs.push('ERROR '+v.map(String).join(' '))}},setTimeout:(f,m)=>schedule(f,m),setInterval:(f,m)=>schedule(f,m,true),clearTimeout:clearTask,clearInterval:clearTask,requestAnimationFrame:f=>schedule(f,16),cancelAnimationFrame:clearTask,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},MutationObserver:class{constructor(fn){this.fn=fn;qaMetrics.observersCreated++;}observe(){qaMetrics.observersObserved++;}disconnect(){qaMetrics.observerDisconnects++;}},NodeFilter:{SHOW_TEXT:4},Node,Element:Node,HTMLElement:Node,Event:class{constructor(type,o){this.type=type;Object.assign(this,o)}preventDefault(){}stopPropagation(){}},navigator:{language:'de',userAgent:'MolPath QA DOM test double'},location:{href:'http://qa.local/index.html',protocol:'http:',hostname:'qa.local',pathname:'/index.html'},innerWidth:1280,innerHeight:900,devicePixelRatio:1,performance:{now:()=>clock},getComputedStyle:n=>({...n.style,display:n.style.display||'block'}),structuredClone,URL,Blob,TextEncoder,TextDecoder,Map,Set,WeakMap,WeakSet,atob:s=>Buffer.from(s,'base64').toString('binary'),btoa:s=>Buffer.from(s,'binary').toString('base64'),fetch:()=>Promise.reject(new Error('network disabled in source QA'))});
ctx.qaMetrics=qaMetrics;ctx.window=ctx;ctx.globalThis=ctx;ctx.self=ctx;ctx.addEventListener=doc.addEventListener;ctx.removeEventListener=()=>{};ctx.scrollTo=()=>{};ctx.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){}});ctx.open=()=>({document:{open(){},write(){},close(){}},focus(){},print(){}});
const loaded=[];
const contentTrace=[];
let lastContent=null;
function traceContent(name){
 const raw=vm.runInContext(`typeof cases!=='undefined'?JSON.stringify({cases,deep:typeof DEEP_DIVE_CASES_V17!=='undefined'?DEEP_DIVE_CASES_V17:[],canonical:MolPathCanonicalDataA4b.cases,integrated:!!window.MolPathCanonicalIntegrationA6}):null`,ctx,{timeout:10000});
 if(!raw)return;
 const value=JSON.parse(raw);
 const target={cases:value.canonical.map(r=>{const c=r.case;if(c.course_case===false)delete c.course_case;return c}),deep:value.canonical.map(r=>r.deep_dive)};
 function differences(rows,wanted,key){
  const map=new Map(wanted.map(row=>[row[key],row]));
  return rows.flatMap(row=>{
   const other=map.get(row[key]);
   if(!other)return [{id:row[key],fields:['__missing']}];
   const fields=[...new Set([...Object.keys(row),...Object.keys(other)])].filter(k=>JSON.stringify(row[k])!==JSON.stringify(other[k]));
   return fields.length?[{id:row[key],fields}]:[];
  });
 }
 const record={source:name,caseCount:value.cases.length,deepCount:value.deep.length,caseOrder:value.cases.map(c=>c.id),deepOrder:value.deep.map(d=>d.case_id),caseDiff:differences(value.cases,target.cases,'id'),deepDiff:differences(value.deep,target.deep,'case_id'),integrated:value.integrated};
 if(lastContent){record.caseWrites=differences(value.cases,lastContent.cases,'id');record.deepWrites=differences(value.deep,lastContent.deep,'case_id');}
 contentTrace.push(record);
 lastContent={cases:value.cases,deep:value.deep};
}

function run(code,name){
code=code.replace('function render(){if(window.MolPathPresentationA6','function render(){window.qaMetrics.corePaint++;if(window.MolPathPresentationA6');
code=code.replace(/window\.MolPathI18nAfterApply\s*=\s*function\([^)]*\)\s*\{/g,m=>m+'window.qaMetrics.afterApplyFrames++;');
try{vm.runInContext(code,ctx,{filename:name,timeout:10000});loaded.push(name);traceContent(name)}catch(e){errors.push({stage:'load',file:name,message:e.stack.split('\n').slice(0,6).join('\n')});}}
function loadFile(src){if(src==='i18n/qa.js'){loaded.push(src+' (unchanged diagnostic layer omitted)');return}const p=path.join(root,src);if(!fs.existsSync(p)){errors.push({stage:'missing',file:src});return}doc.currentScript={src:'http://qa.local/'+src};run(fs.readFileSync(p,'utf8'),src);doc.currentScript=null;}
doc.write=s=>{for(const m of s.matchAll(/<script\b[^>]*src=["']([^"']+)["'][^>]*>/g))loadFile(m[1].replace('http://qa.local/',''))};
let inline=0;
for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/g)){const src=m[1].match(/\bsrc=["']([^"']+)["']/);src?loadFile(src[1]):run(m[2],'index:inline:'+(inline++)+':'+(m[1].match(/\bid=["']([^"']+)["']/)?.[1]||'main'));}
console.log('ordered sources loaded',loaded.length,'load errors',errors.length,JSON.stringify(errors));
function evaluate(code){return vm.runInContext(code,ctx,{timeout:10000})}
function snapshot(){return evaluate('JSON.stringify({cases,meta:V15_META_MAP,gate:V15_GATE_MAP,cap:V15_CAP_MAP,method:V15_METHOD_RULE_MAP,deep:DEEP_DIVE_CASES_V17,deepMap:DEEP_DIVE_MAP_V17,courses:COURSES_V16,canonical:MolPathCanonicalDataA4b})')}
function digest(v){return crypto.createHash('sha256').update(v).digest('hex')}
function changed(a,b){a=JSON.parse(a);b=JSON.parse(b);const out={};for(const k of Object.keys(a)){if(JSON.stringify(a[k])===JSON.stringify(b[k]))continue;if(k==='cases'||k==='deep'){const id=k==='cases'?'id':'case_id';const bm=new Map(b[k].map(x=>[x[id],x]));out[k]=a[k].filter(x=>JSON.stringify(x)!==JSON.stringify(bm.get(x[id]))).map(x=>x[id])}else out[k]=Object.keys(a[k]).filter(x=>JSON.stringify(a[k][x])!==JSON.stringify(b[k][x]));}return out}
const preBoot=snapshot();doc.readyState='interactive';let bootIndex=0;for(const fn of listeners.get('DOMContentLoaded')||[]){try{vm.runInContext('qaBootCallback()',Object.assign(ctx,{qaBootCallback:fn}),{timeout:5000});}catch(e){errors.push({stage:'DOMContentLoaded',callback:fn.toString().slice(0,150),message:e.stack.split('\n').slice(0,5).join('\n')})}if(++bootIndex%20===0)console.log('boot callbacks',bootIndex);}
doc.readyState='complete';flush(1500);console.log('boot completed, errors',errors.length,'pending timers',tasks.length);
const afterBoot=snapshot(),boot={...qaMetrics,DOMContentLoadedCallbacks:(listeners.get('DOMContentLoaded')||[]).length},phases=[];
for(const lang of ['de','en','ro','el','es','fr','ru','tr','ar','fa','uk','de']){
 const before={...qaMetrics};evaluate(`MolPathI18n.setLang(${JSON.stringify(lang)})`);flush(clock+200);
 phases.push({lang,delta:Object.fromEntries(Object.keys(qaMetrics).map(k=>[k,qaMetrics[k]-before[k]])),stable:snapshot()===afterBoot});
}
const result={root,boot,final:{...qaMetrics},phases,afterBootHash:digest(afterBoot),finalHash:digest(snapshot()),errors,environment:'actual ordered sources with QA-only counters, scheduled VM clock, DOM double; not elapsed browser time'};
const output=process.argv[3];fs.writeFileSync(output,JSON.stringify(result,null,2));console.log(JSON.stringify({boot:result.boot,final:result.final,errors,output},null,2));if(errors.length||result.afterBootHash!==result.finalHash)process.exitCode=1;
