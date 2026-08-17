/* MolPath Simulator v2.5.0b — central language + locale registry */
(function(){
'use strict';
const SOURCE='de';
const DEFINITIONS=[
  {code:'de',label:'Deutsch',dir:'ltr',file:'de.js'},
  {code:'en',label:'English',dir:'ltr',file:'en.js'},
  {code:'ro',label:'Română',dir:'ltr',file:'ro.js'},
  {code:'el',label:'Ελληνικά',dir:'ltr',file:'el.js'},
  {code:'es',label:'Español',dir:'ltr',file:'es.js'},
  {code:'fr',label:'Français',dir:'ltr',file:'fr.js'}
];
const defs=new Map();
const aliases=new Map();
function canonicalKey(code){return String(code||'').trim().replace('_','-').toLowerCase();}
function addDefinition(def){
  if(!def||!def.code)throw new Error('MolPath language definition requires code');
  const normalized={code:String(def.code),label:String(def.label||def.code),dir:def.dir==='rtl'?'rtl':'ltr',file:String(def.file||def.code+'.js'),aliases:Array.isArray(def.aliases)?def.aliases.map(String):[]};
  defs.set(normalized.code,normalized);
  aliases.set(canonicalKey(normalized.code),normalized.code);
  normalized.aliases.forEach(a=>aliases.set(canonicalKey(a),normalized.code));
  return normalized;
}
DEFINITIONS.forEach(addDefinition);
function resolveRegistered(code){return aliases.get(canonicalKey(code))||null;}
function isRegistered(code){return !!resolveRegistered(code);}
function normalize(code){return resolveRegistered(code)||SOURCE;}
function get(code){return defs.get(normalize(code))||defs.get(SOURCE);}
function list(){return Array.from(defs.values()).map(x=>({...x,aliases:[...(x.aliases||[])]}));}
function codes(){return list().map(x=>x.code);}
function targetCodes(){return codes().filter(code=>code!==SOURCE);}
function labelsObject(){return Object.fromEntries(list().map(x=>[x.code,x.label]));}
function applyDocumentLanguage(code){
  const lang=normalize(code); const def=get(lang);
  document.documentElement.lang=def.code;
  document.documentElement.dir=def.dir;
  if(document.body)document.body.setAttribute('data-molpath-lang',def.code);
  return def.code;
}
window.MolPathLanguageRegistry=Object.freeze({source:SOURCE,normalize,resolveRegistered,isRegistered,get,list,codes,targetCodes,labelsObject,applyDocumentLanguage});

const locales=new Map();
function register(code,payload){
  const lang=resolveRegistered(code);
  if(!lang)throw new Error('MolPath locale '+String(code)+' is not registered in languages.js');
  const data=payload&&typeof payload==='object'?payload:{};
  const messages=data.messages&&typeof data.messages==='object'?data.messages:{};
  const namespaces=data.namespaces&&typeof data.namespaces==='object'?data.namespaces:{};
  locales.set(lang,{code:lang,messages,namespaces,meta:{...(data.meta||{})}});
  return locales.get(lang);
}
function hasLocale(code){const lang=resolveRegistered(code);return !!lang&&locales.has(lang);}
function locale(code){return locales.get(normalize(code))||locales.get(SOURCE)||{code:SOURCE,messages:{},namespaces:{},meta:{}};}
function namespace(name,code){
  const source=(locale(SOURCE).namespaces||{})[name]||{};
  const target=(locale(code).namespaces||{})[name]||{};
  return {...source,...target};
}
function buildDictionary(){
  const out={};
  list().forEach(def=>{out[def.code]=locale(def.code).messages;});
  return out;
}
window.MolPathLocaleRegistry=Object.freeze({register,has:hasLocale,get:locale,namespace,buildDictionary,source:SOURCE});

// Parser-time bootstrap: index.html only loads languages.js. Locale files are
// derived from the central registry, so adding a language never requires an
// index.html edit.
function bootstrapRegisteredLocales(){
  const current=document.currentScript;
  const base=(current&&current.src)?current.src.replace(/languages\.js(?:\?.*)?$/,''): 'i18n/';
  const scripts=list().map(def=>base+def.file).concat([base+'core.js',base+'qa.js']);
  if(document.readyState==='loading'){
    document.write(scripts.map(src=>'<script src="'+src+'"></script>').join(''));
    return;
  }
  // Defensive fallback for non-parser-time loading.
  let chain=Promise.resolve();
  scripts.forEach(src=>{chain=chain.then(()=>new Promise((resolve,reject)=>{const el=document.createElement('script');el.src=src;el.onload=resolve;el.onerror=reject;document.head.appendChild(el);}));});
  window.MolPathI18nBootstrapReady=chain;
}
bootstrapRegisteredLocales();
})();
