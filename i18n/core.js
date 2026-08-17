/* MolPath Simulator v2.5.0b — i18n core */
(function(){
'use strict';
const VERSION='v2.5.0b i18n Registry Compatibility Adapter';
const languageRegistry=window.MolPathLanguageRegistry;
const localeRegistry=window.MolPathLocaleRegistry;
if(!languageRegistry||!localeRegistry)throw new Error('MolPath i18n registries were not loaded');
const LANGS=languageRegistry.labelsObject();
const DICT=localeRegistry.buildDictionary();
const textSource=new WeakMap();
const attrSource=new WeakMap();
let applying=false;
let applyRaf=0;
function currentLang(){
  let raw='de';
  try{raw=localStorage.getItem('molpath_lang')||document.documentElement.lang||languageRegistry.source;}catch(_e){raw=document.documentElement.lang||languageRegistry.source;}
  return languageRegistry.normalize(raw);
}
function tr(s,lang,node){
  if(!s)return s;
  lang=languageRegistry.normalize(lang);
  if(lang===languageRegistry.source)return s;
  const d=DICT[lang]||{};
  try{if(window.MolPathI18nResolve){const v=window.MolPathI18nResolve(s,lang,node,d);if(v!==undefined&&v!==null)return v;}}catch(_e){}
  return Object.prototype.hasOwnProperty.call(d,s)?d[s]:s;
}
function qs(sel,root){return (root||document).querySelector(sel);}
function createPanel(){
  if(qs('#molpathI18nPanel'))return;
  const side=qs('.sidebar'); if(!side)return;
  const panel=document.createElement('div'); panel.id='molpathI18nPanel'; panel.className='i18n-panel'; panel.setAttribute('data-i18n-skip','1');
  const lang=currentLang();
  const label=tr('Sprache / Language',lang);
  const fixed=tr('Feste Sprachschicht',lang);
  const note=tr('Fehlende Übersetzungen fallen auf Deutsch zurück.',lang);
  const options=languageRegistry.list().map(def=>'<option value="'+def.code+'" '+(def.code===lang?'selected':'')+'>'+def.label+'</option>').join('');
  panel.innerHTML='<label for="molpathLangSelect">'+label+'<span class="i18n-chip">Clean Translation Rebuild</span></label><select id="molpathLangSelect">'+options+'</select><div class="i18n-note"><b>'+fixed+':</b> '+note+'</div>';
  const anchor=qs('.sidebar .powered')||qs('.sidebar .brand');
  if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(panel,anchor.nextSibling);else side.prepend(panel);
  qs('#molpathLangSelect',panel).addEventListener('change',function(ev){setLang(ev.target.value);});
}
function setLang(lang){
  lang=languageRegistry.normalize(lang);
  try{localStorage.setItem('molpath_lang',lang);}catch(_e){}
  languageRegistry.applyDocumentLanguage(lang);
  const p=qs('#molpathI18nPanel'); if(p)p.remove();
  createPanel();
  try{if(typeof render==='function')render();}catch(e){console.warn('i18n render refresh skipped',e);}
  setTimeout(scheduleApply,0);
  return lang;
}
function shouldSkipNode(node){
  const p=node.parentElement;
  if(!p)return true;
  if(p.closest('[data-i18n-skip]'))return true;
  const tag=p.tagName;
  return tag==='SCRIPT'||tag==='STYLE'||tag==='NOSCRIPT'||tag==='TEXTAREA'||tag==='CODE'||tag==='PRE';
}
function translateTextNode(node,lang){
  if(shouldSkipNode(node))return;
  if(!textSource.has(node))textSource.set(node,node.nodeValue);
  const original=textSource.get(node);
  const trimmed=original.trim();
  if(!trimmed)return;
  const lead=(original.match(/^\s*/)||[''])[0];
  const trail=(original.match(/\s*$/)||[''])[0];
  node.nodeValue=lead+tr(trimmed,lang,node)+trail;
}
function translateAttrs(el,lang){
  if(el.closest&&el.closest('[data-i18n-skip]'))return;
  ['placeholder','title','aria-label'].forEach(a=>{
    if(!el.hasAttribute||!el.hasAttribute(a))return;
    let rec=attrSource.get(el); if(!rec){rec={};attrSource.set(el,rec);}
    if(!(a in rec))rec[a]=el.getAttribute(a);
    el.setAttribute(a,tr(rec[a],lang,el));
  });
}
function apply(){
  if(applying)return; applying=true;
  const lang=currentLang();
  try{
    languageRegistry.applyDocumentLanguage(lang);
    createPanel();
    const roots=[qs('.sidebar'),qs('.main')].filter(Boolean);
    roots.forEach(root=>{
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);
      const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
      nodes.forEach(n=>translateTextNode(n,lang));
      root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>translateAttrs(el,lang));
    });
  }finally{applying=false;}
  try{if(typeof window.MolPathI18nAfterApply==='function')window.MolPathI18nAfterApply(lang);}catch(_e){}
}
function scheduleApply(){
  if(applying||applyRaf)return;
  applyRaf=requestAnimationFrame(function(){applyRaf=0;apply();});
}
function startObserver(){
  const app=qs('.app')||document.body;
  const mo=new MutationObserver(function(){if(!applying)scheduleApply();});
  mo.observe(app,{childList:true,subtree:true});
  window.MolPathI18nObserver=mo;
}
window.MolPathI18n={version:VERSION,languages:LANGS,languageRegistry,localeRegistry,setLang,apply:scheduleApply,applyNow:apply,translate:tr,dict:DICT,currentLang,sourceLanguage:languageRegistry.source};
function boot(){setLang(currentLang());startObserver();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
