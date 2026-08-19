/* MolPath Simulator v2.5.0b — isolated Home / Help screen
   Scope: standalone fixed home layer + help/tutorial panels + access buttons.
   Does NOT replace/wrap render(), alter case state/scoring, responsive shell,
   asset modal, i18n core behavior, or startup patch execution. Home copy is read from the central locale namespace. */
(function(){
'use strict';
const VERSION='v2.5.0b';
const ROOT_ID='mpHomeScreen';
const STYLE_ID='mpHomeScreenStyle';
let root=null;
let dialog=null;
let entered=false;
let lastFocus=null;

function homeNamespace(code){
  try{
    if(window.MolPathLocaleRegistry){
      const ns=window.MolPathLocaleRegistry.namespace('home',code||lang());
      if(ns&&ns.title)return ns;
    }
  }catch(_){ }
  throw new Error('MolPath Home i18n namespace is unavailable');
}

function lang(){
  try{return window.MolPathLanguageRegistry?window.MolPathLanguageRegistry.normalize(localStorage.getItem('molpath_lang')||document.documentElement.lang||'de'):'de';}catch(_){return 'de';}
}
function baseCopy(){return homeNamespace('de');}
function tx(){return homeNamespace(lang());}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function appStats(){
  let caseCount='91', langCount='8';
  try{if(Array.isArray(window.cases))caseCount=String(window.cases.length);else if(typeof cases!=='undefined'&&Array.isArray(cases))caseCount=String(cases.length);}catch(_){}
  try{if(window.MolPathLanguageRegistry)langCount=String(window.MolPathLanguageRegistry.codes().length);}catch(_){}
  return {caseCount,langCount};
}
function logo(){return 'assets/logos/logo_patho.png';}
function easyLogo(){return 'assets/logos/logo_easygene.png';}

function addStyles(){
 if(document.getElementById(STYLE_ID))return;
 const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#${ROOT_ID}{all:initial;position:fixed!important;inset:0!important;z-index:2147482500!important;display:block!important;width:100vw!important;height:100vh!important;height:100dvh!important;overflow:auto!important;background:radial-gradient(circle at 8% 2%,rgba(181,226,244,.85),transparent 31%),radial-gradient(circle at 94% 94%,rgba(199,235,231,.7),transparent 34%),#eef6fb!important;color:#0b1b34!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;-webkit-font-smoothing:antialiased!important;overscroll-behavior:contain!important}
#${ROOT_ID},#${ROOT_ID} *{box-sizing:border-box!important}
#${ROOT_ID}[hidden]{display:none!important}
#${ROOT_ID} .mph-shell{width:min(1180px,calc(100% - 32px));min-height:100%;margin:0 auto;padding:clamp(18px,3vw,38px) 0 28px;display:flex;flex-direction:column;gap:20px}
#${ROOT_ID} .mph-top{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:46px}
#${ROOT_ID} .mph-mini-brand{display:flex;align-items:center;gap:10px;font-size:.84rem;font-weight:850;color:#0f4c75;letter-spacing:.01em}.mph-mini-brand img{width:42px;height:42px;object-fit:contain;border-radius:50%;filter:drop-shadow(0 6px 12px rgba(15,76,117,.12))}
#${ROOT_ID} .mph-lang{display:flex;align-items:center;gap:8px;color:#475467;font-size:.78rem;font-weight:800}#${ROOT_ID} .mph-lang select{max-width:150px;border:1px solid #c9d9e7;border-radius:11px;background:#fff;padding:8px 28px 8px 10px;color:#0b1b34;font-weight:800}
#${ROOT_ID} .mph-hero{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(260px,.7fr);gap:clamp(20px,4vw,54px);align-items:center;background:rgba(255,255,255,.82);border:1px solid rgba(195,216,231,.92);border-radius:28px;padding:clamp(24px,5vw,58px);box-shadow:0 24px 70px rgba(15,35,55,.1);backdrop-filter:blur(14px)}
#${ROOT_ID} .mph-eyebrow{display:inline-flex;align-items:center;gap:8px;margin-bottom:12px;color:#0f766e;font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em}#${ROOT_ID} .mph-eyebrow:before{content:'';width:26px;height:3px;border-radius:999px;background:linear-gradient(90deg,#0f4c75,#0f766e)}
#${ROOT_ID} h1{all:unset;display:block;color:#0f4c75;font:900 clamp(2.45rem,7vw,5.2rem)/.93 Inter,ui-sans-serif,system-ui,sans-serif;letter-spacing:-.055em;margin:0 0 18px!important}#${ROOT_ID} .mph-sub{margin:0 0 24px;color:#526276;font-size:clamp(1rem,2.1vw,1.22rem);line-height:1.55;max-width:700px}
#${ROOT_ID} .mph-actions{display:flex;gap:10px;flex-wrap:wrap}#${ROOT_ID} button{font:inherit}#${ROOT_ID} .mph-btn{border:1px solid #cad9e5;border-radius:14px;padding:12px 17px;background:#fff;color:#0f4c75;font-weight:900;cursor:pointer;min-height:48px;box-shadow:0 7px 18px rgba(15,35,55,.06)}#${ROOT_ID} .mph-btn.primary{border:0;color:#fff;background:linear-gradient(135deg,#0f4c75,#1b7aa2);box-shadow:0 12px 26px rgba(15,76,117,.22)}#${ROOT_ID} .mph-btn:hover{transform:translateY(-1px)}#${ROOT_ID} .mph-btn:active{transform:translateY(0)}
#${ROOT_ID} .mph-logo-zone{display:grid;place-items:center;min-height:240px;position:relative}#${ROOT_ID} .mph-logo-zone:before,#${ROOT_ID} .mph-logo-zone:after{content:'';position:absolute;border-radius:50%;border:1px solid rgba(27,122,162,.12)}#${ROOT_ID} .mph-logo-zone:before{width:92%;aspect-ratio:1/1}#${ROOT_ID} .mph-logo-zone:after{width:72%;aspect-ratio:1/1;border-color:rgba(15,118,110,.13)}#${ROOT_ID} .mph-logo{position:relative;z-index:1;width:min(72%,245px);height:auto;object-fit:contain;border-radius:50%;filter:drop-shadow(0 22px 38px rgba(15,76,117,.19))}
#${ROOT_ID} .mph-stats{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}#${ROOT_ID} .mph-stat{display:inline-flex;align-items:center;gap:7px;border:1px solid #d6e3ed;background:#f8fbfd;border-radius:999px;padding:7px 11px;color:#475467;font-size:.76rem;font-weight:850}#${ROOT_ID} .mph-stat b{color:#0f4c75}
#${ROOT_ID} .mph-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}#${ROOT_ID} .mph-card{appearance:none;text-align:left;border:1px solid #d5e2ec;border-radius:20px;background:rgba(255,255,255,.88);padding:20px;min-height:164px;color:#0b1b34;cursor:pointer;box-shadow:0 10px 28px rgba(15,35,55,.055);transition:.16s ease}#${ROOT_ID} .mph-card:hover{border-color:#97c5d9;transform:translateY(-2px);box-shadow:0 15px 34px rgba(15,35,55,.09)}#${ROOT_ID} .mph-card-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:13px;background:#eef7fb;color:#0f4c75;font-size:1.25rem;margin-bottom:14px}#${ROOT_ID} .mph-card strong{display:block;color:#0f4c75;font-size:1rem;margin-bottom:6px}#${ROOT_ID} .mph-card span{display:block;color:#667085;font-size:.84rem;line-height:1.45}
#${ROOT_ID} .mph-foot{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;color:#667085;font-size:.74rem;padding:0 4px}#${ROOT_ID} .mph-version{font-weight:850;color:#526276}
#${ROOT_ID} .mph-dialog-layer{position:fixed;inset:0;z-index:2;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(5,15,28,.58);backdrop-filter:blur(7px)}#${ROOT_ID} .mph-dialog-layer.open{display:flex}#${ROOT_ID} .mph-dialog{width:min(900px,100%);max-height:min(86dvh,850px);overflow:auto;background:#fff;border:1px solid #d5e2ec;border-radius:22px;box-shadow:0 30px 90px rgba(5,15,28,.28)}#${ROOT_ID} .mph-dialog-head{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;background:rgba(255,255,255,.96);border-bottom:1px solid #e0e9f0;backdrop-filter:blur(10px)}#${ROOT_ID} .mph-dialog-head h2{all:unset;color:#0f4c75;font-size:1.14rem;font-weight:900}#${ROOT_ID} .mph-x{display:grid;place-items:center;width:40px;height:40px;border:1px solid #d4e1eb;border-radius:11px;background:#fff;color:#0b1b34;font-size:1.35rem;font-weight:900;cursor:pointer}#${ROOT_ID} .mph-dialog-body{padding:20px}#${ROOT_ID} .mph-dialog-body>p:first-child{margin-top:0;color:#667085}
#${ROOT_ID} .mph-guide{display:grid;gap:10px}#${ROOT_ID} .mph-guide-row{display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;align-items:start;border:1px solid #e0e9f0;border-radius:15px;padding:13px;background:#fbfdfe}#${ROOT_ID} .mph-num{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#0f4c75;color:#fff;font-weight:900}#${ROOT_ID} .mph-guide-row b{display:block;color:#0f4c75;margin-bottom:3px}#${ROOT_ID} .mph-guide-row div div{color:#667085;font-size:.86rem;line-height:1.45}
#${ROOT_ID} .mph-mode-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}#${ROOT_ID} .mph-mode{border:1px solid #dce7ef;border-radius:17px;padding:17px;background:#fbfdff}#${ROOT_ID} .mph-mode-tag{display:inline-flex;border-radius:999px;padding:5px 9px;background:#e8f3ff;color:#0f4c75;font-size:.75rem;font-weight:900;margin-bottom:10px}#${ROOT_ID} .mph-mode:nth-child(2) .mph-mode-tag{background:#ecfdf3;color:#067647}#${ROOT_ID} .mph-mode:nth-child(3) .mph-mode-tag{background:#fff4e6;color:#b54708}#${ROOT_ID} .mph-mode b{display:block;margin-bottom:6px;color:#0b1b34}#${ROOT_ID} .mph-mode p{margin:0;color:#667085;font-size:.84rem;line-height:1.5}
#${ROOT_ID} .mph-news{display:grid;gap:9px}#${ROOT_ID} .mph-news-item{display:flex;gap:10px;align-items:flex-start;padding:11px 12px;border:1px solid #e1e9f0;border-radius:13px;background:#fbfdfe;color:#475467;font-size:.88rem}#${ROOT_ID} .mph-news-item:before{content:'✓';display:grid;place-items:center;flex:0 0 24px;height:24px;border-radius:50%;background:#ecfdf3;color:#087443;font-weight:900}
#${ROOT_ID} .mph-tutorial{display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,.72fr);gap:18px;align-items:stretch}#${ROOT_ID} .mph-tut-copy{display:flex;flex-direction:column}#${ROOT_ID} .mph-tut-kicker{color:#0f766e;font-size:.75rem;font-weight:900;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}#${ROOT_ID} .mph-tut-copy h3{margin:0 0 8px;color:#0f4c75;font-size:1.35rem}#${ROOT_ID} .mph-tut-copy p{color:#667085;line-height:1.55;margin:0 0 18px}#${ROOT_ID} .mph-tut-nav{display:flex;gap:8px;margin-top:auto;flex-wrap:wrap}
#${ROOT_ID} .mph-mock{min-height:290px;border:1px solid #dce7ef;border-radius:18px;padding:14px;background:linear-gradient(145deg,#f7fbfe,#edf6fb);display:grid;grid-template-columns:78px 1fr;gap:10px;overflow:hidden}#${ROOT_ID} .mph-mock-side{border-radius:12px;background:#fff;border:1px solid #dbe6ee;padding:8px;display:grid;align-content:start;gap:7px}#${ROOT_ID} .mph-mock-side i,#${ROOT_ID} .mph-mock-main i{display:block;border-radius:7px;background:#dfeaf2;height:10px}#${ROOT_ID} .mph-mock-side i:first-child{height:46px;border-radius:50%;width:46px;margin:2px auto 8px;background:#b9d7e5}#${ROOT_ID} .mph-mock-main{display:grid;grid-template-rows:56px 34px 1fr;gap:9px}#${ROOT_ID} .mph-mock-hero,#${ROOT_ID} .mph-mock-steps,#${ROOT_ID} .mph-mock-content{border:1px solid #dbe6ee;border-radius:12px;background:#fff;padding:9px}#${ROOT_ID} .mph-mock-steps{display:flex;gap:5px}#${ROOT_ID} .mph-mock-steps i{flex:1;height:auto;background:#e8f1f6}#${ROOT_ID} .mph-mock-content{display:grid;align-content:start;gap:8px}#${ROOT_ID} .mph-mock-content i:nth-child(1){width:48%;height:13px;background:#8bbcd1}#${ROOT_ID} .mph-mock-content i:nth-child(2){width:88%}#${ROOT_ID} .mph-mock-content i:nth-child(3){width:70%}#${ROOT_ID} .mph-mock-content i:nth-child(4){height:56px;background:#edf4f8}
#${ROOT_ID} .mph-mock[data-focus="library"] .mph-mock-side{box-shadow:0 0 0 3px rgba(27,122,162,.25);border-color:#1b7aa2}#${ROOT_ID} .mph-mock[data-focus="context"] .mph-mock-hero,#${ROOT_ID} .mph-mock[data-focus="asset"] .mph-mock-content,#${ROOT_ID} .mph-mock[data-focus="order"] .mph-mock-steps,#${ROOT_ID} .mph-mock[data-focus="result"] .mph-mock-content,#${ROOT_ID} .mph-mock[data-focus="decision"] .mph-mock-content,#${ROOT_ID} .mph-mock[data-focus="debrief"] .mph-mock-hero{box-shadow:0 0 0 3px rgba(15,118,110,.23);border-color:#0f766e}
#mpHomeSidebarBtn{width:100%;margin:0 0 14px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--primary);font-weight:900;cursor:pointer;text-align:left}#mpHomeSidebarBtn:hover{background:#f7fbfe}
#mp21HomeBtn{flex:0 0 auto}body.mp-home-open{overflow:hidden!important}
@media(max-width:900px){#${ROOT_ID} .mph-hero{grid-template-columns:1fr;padding:26px}#${ROOT_ID} .mph-logo-zone{order:-1;min-height:180px}#${ROOT_ID} .mph-logo{width:min(48%,190px)}#${ROOT_ID} .mph-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#${ROOT_ID} .mph-tutorial{grid-template-columns:1fr}#${ROOT_ID} .mph-mock{min-height:240px}#${ROOT_ID} .mph-mode-grid{grid-template-columns:1fr}}
@media(max-width:560px){#mp21HomeBtn{min-width:36px!important;width:36px!important;padding:0!important}#${ROOT_ID} .mph-shell{width:min(100% - 18px,1180px);padding:10px 0 18px;gap:10px}#${ROOT_ID} .mph-top{padding:0 3px}#${ROOT_ID} .mph-mini-brand span{display:none}#${ROOT_ID} .mph-lang label{display:none}#${ROOT_ID} .mph-lang select{max-width:132px}#${ROOT_ID} .mph-hero{border-radius:19px;padding:19px 17px;gap:12px}#${ROOT_ID} .mph-logo-zone{min-height:132px}#${ROOT_ID} .mph-logo{width:min(42%,142px)}#${ROOT_ID} h1{font-size:clamp(2.2rem,14vw,3.5rem)!important;margin-bottom:12px!important}#${ROOT_ID} .mph-sub{font-size:.94rem;margin-bottom:17px}#${ROOT_ID} .mph-actions{display:grid;grid-template-columns:1fr}#${ROOT_ID} .mph-btn{width:100%}#${ROOT_ID} .mph-stats{margin-top:15px}#${ROOT_ID} .mph-grid{grid-template-columns:1fr;gap:9px}#${ROOT_ID} .mph-card{min-height:0;padding:14px;display:grid;grid-template-columns:42px 1fr;column-gap:11px}#${ROOT_ID} .mph-card-icon{grid-row:1/3;margin:0;width:40px;height:40px}#${ROOT_ID} .mph-card strong{margin:1px 0 3px}#${ROOT_ID} .mph-card span{grid-column:2}#${ROOT_ID} .mph-dialog-layer{padding:0;align-items:stretch}#${ROOT_ID} .mph-dialog{max-height:100dvh;border-radius:0;border:0;width:100%}#${ROOT_ID} .mph-dialog-body{padding:15px}#${ROOT_ID} .mph-mock{grid-template-columns:62px 1fr;min-height:220px;padding:9px}#${ROOT_ID} .mph-foot{padding:5px 4px 0}}
@media(prefers-reduced-motion:reduce){#${ROOT_ID} .mph-card,#${ROOT_ID} .mph-btn{transition:none!important}}
`;
 document.head.appendChild(s);
}

function langOptions(){
  try{return window.MolPathLanguageRegistry.list().map(d=>`<option value="${esc(d.code)}" ${d.code===lang()?'selected':''}>${esc(d.label)}</option>`).join('');}catch(_){return '<option value="de">Deutsch</option><option value="en">English</option>';}
}
function homeMarkup(){const t=tx(),st=appStats();return `
<div class="mph-shell">
  <div class="mph-top">
    <div class="mph-mini-brand"><img src="${logo()}" alt=""><span>MolPath Simulator</span></div>
    <div class="mph-lang"><label for="mpHomeLang">${esc(t.language)}</label><select id="mpHomeLang" aria-label="${esc(t.language)}">${langOptions()}</select></div>
  </div>
  <section class="mph-hero">
    <div>
      <div class="mph-eyebrow">${esc(t.eyebrow)}</div>
      <h1>${esc(t.title)}</h1>
      <p class="mph-sub">${esc(t.subtitle)}</p>
      <div class="mph-actions"><button class="mph-btn primary" type="button" data-action="start">${esc(entered?t.continue:t.start)}</button><button class="mph-btn" type="button" data-action="library">${esc(t.caseLibrary)}</button></div>
      <div class="mph-stats"><span class="mph-stat"><b>${esc(st.caseCount)}</b> ${esc(t.casesLabel)}</span><span class="mph-stat"><b>3</b> ${esc(t.areasLabel)}</span><span class="mph-stat"><b>${esc(st.langCount)}</b> ${esc(t.languagesLabel)}</span></div>
    </div>
    <div class="mph-logo-zone"><img class="mph-logo" src="${logo()}" alt="Institut für Pathologie Bochum"></div>
  </section>
  <section class="mph-grid" aria-label="${esc(t.help)}">
    <button class="mph-card" type="button" data-action="how"><span class="mph-card-icon">◎</span><strong>${esc(t.howTitle)}</strong><span>${esc(t.howText)}</span></button>
    <button class="mph-card" type="button" data-action="tutorial"><span class="mph-card-icon">➜</span><strong>${esc(t.tutorialTitle)}</strong><span>${esc(t.tutorialText)}</span></button>
    <button class="mph-card" type="button" data-action="modes"><span class="mph-card-icon">⌬</span><strong>${esc(t.modesTitle)}</strong><span>${esc(t.modesText)}</span></button>
    <button class="mph-card" type="button" data-action="news"><span class="mph-card-icon">✦</span><strong>${esc(t.newsTitle)}</strong><span>${esc(t.newsText)}</span></button>
  </section>
  <footer class="mph-foot"><span>${esc(t.footer)}</span><span class="mph-version">${VERSION}</span></footer>
</div>
<div class="mph-dialog-layer" aria-hidden="true"><div class="mph-dialog" role="dialog" aria-modal="true"><div class="mph-dialog-head"><h2 id="mphDialogTitle"></h2><button type="button" class="mph-x" data-action="close-dialog" aria-label="${esc(t.close)}">×</button></div><div class="mph-dialog-body" id="mphDialogBody"></div></div></div>`;}

function create(){
  if(root)return root;addStyles();root=document.createElement('section');root.id=ROOT_ID;root.setAttribute('data-i18n-skip','1');root.setAttribute('aria-label','MolPath Simulator Home');root.innerHTML=homeMarkup();document.body.appendChild(root);bind();syncAccessButtons();return root;
}
function bind(){
  if(!root)return;
  if(!root.dataset.mphBound){root.dataset.mphBound='1';
  root.addEventListener('click',e=>{const a=e.target.closest('[data-action]');if(!a)return;const action=a.dataset.action;if(action==='start')hide();else if(action==='library'){hide();setTimeout(openLibrary,0);}else if(action==='how')openHow();else if(action==='tutorial')openTutorial(0);else if(action==='modes')openModes();else if(action==='news')openNews();else if(action==='close-dialog')closeDialog();else if(action==='tut-next')openTutorial(Number(a.dataset.step||0)+1);else if(action==='tut-back')openTutorial(Number(a.dataset.step||0)-1);else if(action==='tut-done')closeDialog();});}
  const sel=root.querySelector('#mpHomeLang');if(sel)sel.addEventListener('change',e=>{try{if(window.MolPathI18n)window.MolPathI18n.setLang(e.target.value);else localStorage.setItem('molpath_lang',e.target.value);}catch(_){}setTimeout(refresh,20);});
  root.querySelector('.mph-dialog-layer').addEventListener('click',e=>{if(e.target.classList.contains('mph-dialog-layer'))closeDialog();});
}
function show(){const existed=!!root;create();if(existed&&root.hidden)refresh();closeDialog();lastFocus=document.activeElement;root.hidden=false;document.body.classList.add('mp-home-open');try{if(window.MolPathResponsiveShell)window.MolPathResponsiveShell.closeAll();}catch(_){}const b=root.querySelector('[data-action="start"]');try{b&&b.focus({preventScroll:true});}catch(_){} }
function hide(){if(!root)return;entered=true;root.hidden=true;document.body.classList.remove('mp-home-open');try{if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});}catch(_){} }
function refresh(){if(!root)return;const wasHidden=root.hidden;const hadDialog=dialog&&dialog.classList.contains('open');root.innerHTML=homeMarkup();bind();root.hidden=wasHidden;dialog=root.querySelector('.mph-dialog-layer');syncAccessButtons();if(hadDialog)closeDialog();}
function openDialog(title,html){create();dialog=root.querySelector('.mph-dialog-layer');root.querySelector('#mphDialogTitle').textContent=title;root.querySelector('#mphDialogBody').innerHTML=html;dialog.classList.add('open');dialog.setAttribute('aria-hidden','false');const x=dialog.querySelector('.mph-x');try{x.focus({preventScroll:true});}catch(_){} }
function closeDialog(){if(!root)return;dialog=root.querySelector('.mph-dialog-layer');if(dialog){dialog.classList.remove('open');dialog.setAttribute('aria-hidden','true');}}
function openHow(){const t=tx();const items=(t.howItems||baseCopy().howItems).map(x=>`<div class="mph-guide-row"><span class="mph-num">${esc(x[0])}</span><div><b>${esc(x[1])}</b><div>${esc(x[2])}</div></div></div>`).join('');openDialog(t.howHead||baseCopy().howHead,`<p>${esc(t.howIntro||baseCopy().howIntro)}</p><div class="mph-guide">${items}</div>`);}
function openModes(){const t=tx();const modes=t.modes||baseCopy().modes;openDialog(t.modesHead||baseCopy().modesHead,`<div class="mph-mode-grid">${modes.map(m=>`<article class="mph-mode"><span class="mph-mode-tag">${esc(m[0])}</span><b>${esc(m[1])}</b><p>${esc(m[2])}</p></article>`).join('')}</div>`);}
function openNews(){const t=tx(), items=t.newsItems||baseCopy().newsItems;openDialog(t.newsHead||baseCopy().newsHead,`<div class="mph-news">${items.map(x=>`<div class="mph-news-item">${esc(x)}</div>`).join('')}</div><p style="margin:14px 2px 0;color:#667085;font-size:.82rem">${esc(t.newsNote||baseCopy().newsNote)}</p>`);}
function mock(focus){return `<div class="mph-mock" data-focus="${esc(focus)}" aria-hidden="true"><div class="mph-mock-side"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="mph-mock-main"><div class="mph-mock-hero"><i></i><i></i></div><div class="mph-mock-steps"><i></i><i></i><i></i><i></i><i></i></div><div class="mph-mock-content"><i></i><i></i><i></i><i></i></div></div></div>`;}
function openTutorial(index){const t=tx(), steps=t.tut||baseCopy().tut;index=Math.max(0,Math.min(steps.length-1,index));const s=steps[index];const nav=`<div class="mph-tut-nav">${index>0?`<button class="mph-btn" type="button" data-action="tut-back" data-step="${index}">${esc(t.back)}</button>`:''}${index<steps.length-1?`<button class="mph-btn primary" type="button" data-action="tut-next" data-step="${index}">${esc(t.next)}</button>`:`<button class="mph-btn primary" type="button" data-action="tut-done">${esc(t.done)}</button>`}</div>`;openDialog(t.tutHead||baseCopy().tutHead,`<div class="mph-tutorial"><div class="mph-tut-copy"><div class="mph-tut-kicker">${esc((t.tutLead||baseCopy().tutLead)+' · '+(index+1)+' / '+steps.length)}</div><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p>${nav}</div>${mock(s[2])}</div>`);}
function openLibrary(){
  try{const sb=document.querySelector('.sidebar');if(matchMedia('(max-width:1400px)').matches&&window.MolPathResponsiveShell){window.MolPathResponsiveShell.closeAll();document.body.classList.add('mp21-nav-open');const search=document.getElementById('caseSearch');setTimeout(()=>{try{search&&search.focus({preventScroll:true});}catch(_){}},40);return;}const search=document.getElementById('caseSearch');if(search){search.scrollIntoView({behavior:'smooth',block:'center'});search.focus();}}catch(_){}
}
function syncAccessButtons(){
  const bar=document.getElementById('mp21CompactBar');
  if(bar&&!document.getElementById('mp21HomeBtn')){const b=document.createElement('button');b.type='button';b.className='mp21-tool';b.id='mp21HomeBtn';b.innerHTML='<span class="mp21-tool-icon">⌂</span>';b.addEventListener('click',show);const menu=document.getElementById('mp21MenuBtn');bar.insertBefore(b,menu||bar.firstChild);}
  const b=document.getElementById('mp21HomeBtn');if(b){const t=tx();b.title=t.home+' / '+t.help;b.setAttribute('aria-label',t.home+' / '+t.help);}
  const side=document.querySelector('.sidebar');if(side&&!document.getElementById('mpHomeSidebarBtn')){const x=document.createElement('button');x.id='mpHomeSidebarBtn';x.type='button';x.addEventListener('click',show);const panel=document.getElementById('molpathI18nPanel');if(panel&&panel.parentNode===side)panel.insertAdjacentElement('afterend',x);else{const brand=side.querySelector('.brand');if(brand)brand.insertAdjacentElement('afterend',x);else side.prepend(x);}}
  const x=document.getElementById('mpHomeSidebarBtn');if(x){const t=tx();x.textContent='⌂  '+t.home+' / '+t.help;}
}

// IMPORTANT: no MolPathI18nAfterApply hook here.
// The historical runtime invokes i18n repeatedly during boot; subscribing to that
// callback caused TEST4 to rebuild the Home DOM continuously and steal clicks.
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root&&!root.hidden){if(root.querySelector('.mph-dialog-layer.open')){e.preventDefault();closeDialog();}}});

function bootHomeOnce(){
  if(bootHomeOnce.done)return;
  bootHomeOnce.done=true;
  create();
  show();
  syncAccessButtons();
  setTimeout(syncAccessButtons,120);
  setTimeout(syncAccessButtons,500);
}

function bootAfterStartupOverlay(){
  // TEST5 lifecycle: Home is not created until the polished startup overlay has
  // actually been removed. MutationObserver runs before the next paint, so the
  // user transitions directly from loader -> Home without exposing old renders.
  const start=function(){
    const overlay=document.getElementById('mpBootScreen');
    if(!overlay){bootHomeOnce();return;}
    const observer=new MutationObserver(function(){
      if(!document.getElementById('mpBootScreen')){
        observer.disconnect();
        bootHomeOnce();
      }
    });
    observer.observe(document.body,{childList:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}

bootAfterStartupOverlay();
window.MolPathHomeScreen=Object.freeze({version:VERSION,show,hide,refresh,openTutorial:()=>{show();openTutorial(0);}});
})();
