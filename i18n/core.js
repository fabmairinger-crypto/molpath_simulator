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
const localeTemplateCache=new WeakMap();
function escapeTemplateRegExp(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function localeTemplateRules(dict){
  if(!dict||typeof dict!=='object')return [];
  if(localeTemplateCache.has(dict))return localeTemplateCache.get(dict);
  const rules=[];
  Object.keys(dict).forEach(source=>{
    if(!/\{[^}]+\}/.test(source))return;
    const names=[];let pattern='^',cursor=0;const re=/\{([^}]+)\}/g;let m;
    while((m=re.exec(source))){pattern+=escapeTemplateRegExp(source.slice(cursor,m.index));names.push(m[1]);pattern+='(.+?)';cursor=m.index+m[0].length;}
    pattern+=escapeTemplateRegExp(source.slice(cursor))+'$';
    try{rules.push({source,target:dict[source],names,re:new RegExp(pattern,'u')});}catch(_e){}
  });
  localeTemplateCache.set(dict,rules);return rules;
}
function localizeCaptured(value,dict){
  if(Object.prototype.hasOwnProperty.call(dict,value))return dict[value];
  return String(value).split(/(, | · )/).map(part=>Object.prototype.hasOwnProperty.call(dict,part)?dict[part]:part).join('');
}
function translateLocaleTemplate(source,dict){
  for(const rule of localeTemplateRules(dict)){
    const match=rule.re.exec(source);if(!match)continue;
    let out=rule.target;
    rule.names.forEach((name,i)=>{out=out.split('{'+name+'}').join(localizeCaptured(match[i+1],dict));});
    return out;
  }
  return undefined;
}
function tr(s,lang,node){
  if(!s)return s;
  lang=languageRegistry.normalize(lang);
  if(lang===languageRegistry.source)return s;
  const d=DICT[lang]||{};
  let legacyValue;
  try{
    if(window.MolPathI18nResolve){
      legacyValue=window.MolPathI18nResolve(s,lang,node,d);
      if(legacyValue!==undefined&&legacyValue!==null&&legacyValue!==s)return legacyValue;
    }
  }catch(_e){}
  if(Object.prototype.hasOwnProperty.call(d,s))return d[s];
  const templated=translateLocaleTemplate(s,d);if(templated!==undefined)return templated;
  if(legacyValue!==undefined&&legacyValue!==null)return legacyValue;
  return s;
}
function qs(sel,root){return (root||document).querySelector(sel);}

// Cross-platform flag language picker.
// Native <select> controls on Windows often render Unicode flag emoji as
// regional-indicator letter pairs (e.g. "DE", "GB"). Keep the native select
// as the state/accessibility source, but render a small SVG-flag dropdown on top.
const FLAG_SVG={
  de:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="5.34" y="0" fill="#111"/><rect width="24" height="5.34" y="5.33" fill="#d00"/><rect width="24" height="5.34" y="10.66" fill="#ffce00"/></svg>',
  en:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#21468b"/><path d="M0 0 24 16M24 0 0 16" stroke="#fff" stroke-width="4"/><path d="M0 0 24 16M24 0 0 16" stroke="#cf142b" stroke-width="1.8"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5"/><path d="M12 0v16M0 8h24" stroke="#cf142b" stroke-width="2.6"/></svg>',
  ro:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="8" height="16" fill="#002b7f"/><rect x="8" width="8" height="16" fill="#fcd116"/><rect x="16" width="8" height="16" fill="#ce1126"/></svg>',
  el:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#0d5eaf"/><g fill="#fff"><rect y="1.78" width="24" height="1.78"/><rect y="5.33" width="24" height="1.78"/><rect y="8.89" width="24" height="1.78"/><rect y="12.44" width="24" height="1.78"/><rect width="10" height="8.9" fill="#0d5eaf"/><rect x="4" width="2" height="8.9"/><rect y="3.45" width="10" height="2"/></g></svg>',
  es:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#aa151b"/><rect y="4" width="24" height="8" fill="#f1bf00"/></svg>',
  fr:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="8" height="16" fill="#0055a4"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#ef4135"/></svg>',
  ru:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#fff"/><rect y="5.33" width="24" height="5.34" fill="#0039a6"/><rect y="10.67" width="24" height="5.33" fill="#d52b1e"/></svg>',
  tr:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#e30a17"/><circle cx="9.2" cy="8" r="4.1" fill="#fff"/><circle cx="10.6" cy="8" r="3.25" fill="#e30a17"/><path d="m15.2 5.7.65 1.45 1.58.16-1.18 1.06.35 1.55-1.38-.8-1.36.8.33-1.55-1.17-1.06 1.57-.16z" fill="#fff"/></svg>',
  ar:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#006c35"/><path d="M5 6.1h14M7 9.7h10" stroke="#fff" stroke-width="1.15" stroke-linecap="round"/><path d="M8 11.7h9" stroke="#fff" stroke-width=".8" stroke-linecap="round"/></svg>',
  fa:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="5.33" fill="#239f40"/><rect y="5.33" width="24" height="5.34" fill="#fff"/><rect y="10.67" width="24" height="5.33" fill="#da0000"/><circle cx="12" cy="8" r="1.7" fill="#da0000"/><path d="M12 6.3v3.4M10.5 8h3" stroke="#fff" stroke-width=".45"/></svg>',
  uk:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="8" y="0" fill="#0057b7"/><rect width="24" height="8" y="8" fill="#ffd700"/></svg>'
};
function ensureFlagPickerStyles(){
  if(document.getElementById('mpFlagLangPickerStyle'))return;
  const st=document.createElement('style');st.id='mpFlagLangPickerStyle';st.textContent=`
  .mp-lang-picker{position:relative;width:100%;min-width:0;direction:ltr}
  .mp-lang-native{position:absolute!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;overflow:hidden!important;white-space:nowrap!important}
  .mp-lang-button{width:100%;min-height:40px;display:flex;align-items:center;gap:9px;border:1px solid var(--line,#d8e4ef);background:#fff;color:var(--text,#0b1b34);border-radius:12px;padding:8px 34px 8px 11px;font:inherit;font-weight:800;text-align:left;cursor:pointer;position:relative}
  .mp-lang-button:hover{border-color:#9bc8d7}.mp-lang-button:focus-visible{outline:0;border-color:var(--primary2,#1b7aa2);box-shadow:0 0 0 3px rgba(27,122,162,.12)}
  .mp-lang-button:after{content:'⌄';position:absolute;right:11px;top:50%;transform:translateY(-53%);font-size:15px;color:#344054}
  .mp-lang-flag{display:inline-flex;flex:0 0 24px;width:24px;height:16px;border-radius:2px;overflow:hidden;box-shadow:0 0 0 1px rgba(16,24,40,.16);background:#fff}
  .mp-lang-flag svg{display:block;width:24px;height:16px}
  .mp-lang-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:auto}
  .mp-lang-menu{display:none;position:absolute;z-index:2147483640;top:calc(100% + 5px);left:0;width:100%;min-width:180px;max-height:330px;overflow:auto;padding:5px;background:#fff;border:1px solid #c9d9e7;border-radius:12px;box-shadow:0 14px 30px rgba(15,35,55,.18)}
  .mp-lang-picker.open .mp-lang-menu{display:block}
  .mp-lang-option{width:100%;display:flex;align-items:center;gap:9px;border:0;border-radius:8px;background:#fff;color:#0b1b34;padding:8px 9px;font:inherit;font-weight:650;text-align:left;cursor:pointer}
  .mp-lang-option:hover,.mp-lang-option:focus-visible{outline:0;background:#eef6fb}.mp-lang-option[aria-current="true"]{background:#e7f3fb;font-weight:850}
  #mpHomeScreen .mph-lang .mp-lang-picker{width:150px}#mpHomeScreen .mph-lang .mp-lang-button{min-height:36px;padding-top:7px;padding-bottom:7px;border-radius:11px}
  @media(max-width:560px){#mpHomeScreen .mph-lang .mp-lang-picker{width:132px}}
  `;document.head.appendChild(st);
}
function flagMarkup(code){return '<span class="mp-lang-flag" aria-hidden="true">'+(FLAG_SVG[code]||'')+'</span>';}
function enhanceLanguageSelect(select){
  if(!select||select.dataset.mpFlagEnhanced==='1')return select;
  ensureFlagPickerStyles();
  const parent=select.parentNode;if(!parent)return select;
  const picker=document.createElement('div');picker.className='mp-lang-picker';picker.setAttribute('data-i18n-skip','1');
  parent.insertBefore(picker,select);picker.appendChild(select);select.classList.add('mp-lang-native');select.dataset.mpFlagEnhanced='1';
  const button=document.createElement('button');button.type='button';button.className='mp-lang-button';button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');
  const menu=document.createElement('div');menu.className='mp-lang-menu';menu.setAttribute('role','listbox');
  languageRegistry.list().forEach(def=>{
    const opt=document.createElement('button');opt.type='button';opt.className='mp-lang-option';opt.dataset.lang=def.code;opt.setAttribute('role','option');opt.innerHTML=flagMarkup(def.code)+'<span class="mp-lang-name" dir="auto"></span>';
    opt.querySelector('.mp-lang-name').textContent=def.label;menu.appendChild(opt);
  });
  picker.appendChild(button);picker.appendChild(menu);
  function sync(){
    const def=languageRegistry.get(select.value||currentLang());
    button.innerHTML=flagMarkup(def.code)+'<span class="mp-lang-name" dir="auto"></span>';
    button.querySelector('.mp-lang-name').textContent=def.label;
    button.setAttribute('aria-label',def.label);
    menu.querySelectorAll('.mp-lang-option').forEach(o=>o.setAttribute('aria-current',o.dataset.lang===def.code?'true':'false'));
  }
  function close(){picker.classList.remove('open');button.setAttribute('aria-expanded','false');}
  button.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();const willOpen=!picker.classList.contains('open');document.querySelectorAll('.mp-lang-picker.open').forEach(x=>x.classList.remove('open'));picker.classList.toggle('open',willOpen);button.setAttribute('aria-expanded',willOpen?'true':'false');});
  menu.addEventListener('click',ev=>{const o=ev.target.closest('.mp-lang-option');if(!o)return;ev.preventDefault();const code=o.dataset.lang;if(select.value!==code){select.value=code;select.dispatchEvent(new Event('change',{bubbles:true}));}sync();close();});
  button.addEventListener('keydown',ev=>{if(ev.key==='Escape'){close();button.focus();}});
  select.addEventListener('change',sync);sync();
  if(!enhanceLanguageSelect.docBound){enhanceLanguageSelect.docBound=true;document.addEventListener('click',ev=>{document.querySelectorAll('.mp-lang-picker.open').forEach(p=>{if(!p.contains(ev.target)){p.classList.remove('open');const b=p.querySelector('.mp-lang-button');if(b)b.setAttribute('aria-expanded','false');}});});document.addEventListener('keydown',ev=>{if(ev.key==='Escape')document.querySelectorAll('.mp-lang-picker.open').forEach(p=>{p.classList.remove('open');const b=p.querySelector('.mp-lang-button');if(b)b.setAttribute('aria-expanded','false');});});}
  return picker;
}
window.MolPathEnhanceLanguageSelect=enhanceLanguageSelect;
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
  const langSelect=qs('#molpathLangSelect',panel);langSelect.addEventListener('change',function(ev){setLang(ev.target.value);});enhanceLanguageSelect(langSelect);
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
