/* MolPath Simulator v2.5.0b — Methods Focus cross-domain filter
   Curated strict pass: 44/91 cases. Registry authority: rc2 canonical A5; this file now contains UI/runtime only. */
(function(){
'use strict';
const VERSION='v2.5.0b-method-focus-01';
const MF_CANON=window.MolPathCanonicalMethodFocusA5;
if(!MF_CANON||!MF_CANON.registry)throw new Error('rc2 A6.2 canonical Methods Focus registry missing');
const REGISTRY=MF_CANON.registry;
const L={"de":{"field":"Methodenfokus","allCases":"Alle Fälle","allMethods":"Alle methodischen Stolpersteine","molecular_diagnostics":"Molekulare Diagnostik","laboratory_analytics_qc":"Präanalytik · Analytik · QC","research_methodology":"Forschungs- & Versuchsdesign","computational_statistics":"Bioinformatik & Statistik","digital_ai":"Digitalpathologie & KI","hint":"Nur Fälle, bei denen die Methodik die Entscheidung tatsächlich trägt."},"en":{"field":"Methods focus","allCases":"All cases","allMethods":"All methodological pitfalls","molecular_diagnostics":"Molecular diagnostics","laboratory_analytics_qc":"Preanalytics · analytics · QC","research_methodology":"Research & experimental design","computational_statistics":"Bioinformatics & statistics","digital_ai":"Digital pathology & AI","hint":"Only cases in which methodology materially drives the decision."},"ro":{"field":"Focalizare metodologică","allCases":"Toate cazurile","allMethods":"Toate capcanele metodologice","molecular_diagnostics":"Diagnostic molecular","laboratory_analytics_qc":"Preanalitică · analitică · QC","research_methodology":"Metodologia cercetării","computational_statistics":"Bioinformatică și statistică","digital_ai":"Patologie digitală și IA","hint":"Doar cazurile în care metodologia determină în mod real decizia."},"el":{"field":"Μεθοδολογική εστίαση","allCases":"Όλα τα περιστατικά","allMethods":"Όλες οι μεθοδολογικές παγίδες","molecular_diagnostics":"Μοριακή διαγνωστική","laboratory_analytics_qc":"Προαναλυτική · αναλυτική · QC","research_methodology":"Μεθοδολογία έρευνας","computational_statistics":"Βιοπληροφορική & στατιστική","digital_ai":"Ψηφιακή παθολογία & ΤΝ","hint":"Μόνο περιστατικά όπου η μεθοδολογία καθορίζει ουσιαστικά την απόφαση."},"es":{"field":"Enfoque metodológico","allCases":"Todos los casos","allMethods":"Todas las trampas metodológicas","molecular_diagnostics":"Diagnóstico molecular","laboratory_analytics_qc":"Preanalítica · analítica · QC","research_methodology":"Metodología de investigación","computational_statistics":"Bioinformática y estadística","digital_ai":"Patología digital e IA","hint":"Solo casos en los que la metodología determina de forma material la decisión."},"fr":{"field":"Focus méthodologique","allCases":"Tous les cas","allMethods":"Tous les pièges méthodologiques","molecular_diagnostics":"Diagnostic moléculaire","laboratory_analytics_qc":"Pré-analytique · analytique · CQ","research_methodology":"Méthodologie de recherche","computational_statistics":"Bioinformatique & statistiques","digital_ai":"Pathologie numérique & IA","hint":"Uniquement les cas où la méthodologie détermine réellement la décision."},"ru":{"field":"Методический фокус","allCases":"Все случаи","allMethods":"Все методические ловушки","molecular_diagnostics":"Молекулярная диагностика","laboratory_analytics_qc":"Преаналитика · аналитика · QC","research_methodology":"Методология исследования","computational_statistics":"Биоинформатика и статистика","digital_ai":"Цифровая патология и ИИ","hint":"Только случаи, где методика действительно определяет решение."},"tr":{"field":"Yöntem odağı","allCases":"Tüm olgular","allMethods":"Tüm yöntemsel tuzaklar","molecular_diagnostics":"Moleküler tanı","laboratory_analytics_qc":"Preanalitik · analitik · QC","research_methodology":"Araştırma metodolojisi","computational_statistics":"Biyoinformatik ve istatistik","digital_ai":"Dijital patoloji ve yapay zekâ","hint":"Yalnızca yöntemin kararı gerçekten belirlediği olgular."},"ar":{"field":"التركيز المنهجي","allCases":"جميع الحالات","allMethods":"جميع المزالق المنهجية","molecular_diagnostics":"التشخيص الجزيئي","laboratory_analytics_qc":"ما قبل التحليل · التحليل · ضبط الجودة","research_methodology":"منهجية البحث","computational_statistics":"المعلوماتية الحيوية والإحصاء","digital_ai":"علم الأمراض الرقمي والذكاء الاصطناعي","hint":"فقط الحالات التي تؤثر فيها المنهجية فعليًا في القرار."},"fa":{"field":"تمرکز روش‌شناختی","allCases":"همه موارد","allMethods":"همه چالش‌های روش‌شناختی","molecular_diagnostics":"تشخیص مولکولی","laboratory_analytics_qc":"پیش‌تحلیلی · تحلیلی · کنترل کیفیت","research_methodology":"روش‌شناسی پژوهش","computational_statistics":"بیوانفورماتیک و آمار","digital_ai":"آسیب‌شناسی دیجیتال و هوش مصنوعی","hint":"فقط مواردی که روش‌شناسی واقعاً در تصمیم تعیین‌کننده است."},"uk":{"field":"Методичний фокус","allCases":"Усі випадки","allMethods":"Усі методичні пастки","molecular_diagnostics":"Молекулярна діагностика","laboratory_analytics_qc":"Преаналітика · аналітика · QC","research_methodology":"Методологія досліджень","computational_statistics":"Біоінформатика і статистика","digital_ai":"Цифрова патологія та ШІ","hint":"Лише випадки, де методика справді визначає рішення."}};
const DOMAIN_ORDER=[...(MF_CANON.domains||[])];
function lang(){try{const raw=(document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||'de';return window.MolPathLanguageRegistry?window.MolPathLanguageRegistry.normalize(raw):raw}catch(_){return 'de'}}
function t(k){const x=L[lang()]||L.en;return x[k]||L.en[k]||k}
function meta(c){if(!c)return null;return REGISTRY[c.id]||null}
function isDriver(c){return !!meta(c)}
function domainLabels(m){return (m?.domains||[]).map(x=>t(x))}
function ensureCaseMetadata(){try{if(typeof cases==='undefined')return;cases.forEach(c=>{const m=meta(c);c.method_filter_eligible=!!m;c.method_focus_domains=m?[...m.domains]:[];c.method_issue_types=m?[...m.issues]:[];})}catch(err){console.warn('[MolPath '+VERSION+'] metadata attach failed',err)}}
function currentValue(){return document.getElementById('methodFocusFilter')?.value||'all_cases'}
function ensureFilter(){
 const grid=document.querySelector('.filter-grid');if(!grid)return;
 let wrap=document.getElementById('methodFocusField');
 if(!wrap){
   wrap=document.createElement('div');wrap.className='field mp-method-focus-field';wrap.id='methodFocusField';
   const difficulty=document.getElementById('difficultyFilter')?.closest('.field');
   if(difficulty&&difficulty.parentElement===grid)grid.insertBefore(wrap,difficulty);else grid.appendChild(wrap);
   wrap.innerHTML='<label id="methodFocusLabel" for="methodFocusFilter"></label><select class="case-select" id="methodFocusFilter"></select><div id="methodFocusHint" class="mp-method-focus-hint"></div>';
   wrap.querySelector('#methodFocusFilter').addEventListener('change',()=>{try{onFilterChange()}catch(_){try{renderCasePicker()}catch(__){}}});
 }
 localizeFilter();
}
function localizeFilter(){
 const label=document.getElementById('methodFocusLabel'),sel=document.getElementById('methodFocusFilter'),hint=document.getElementById('methodFocusHint');if(!sel)return;
 const keep=sel.value||'all_cases';
 if(label)label.textContent=t('field');
 sel.innerHTML=[['all_cases',t('allCases')],['all_methods',t('allMethods')],...DOMAIN_ORDER.map(k=>[k,t(k)])].map(([v,l])=>`<option value="${v}">${l}</option>`).join('');
 sel.value=[...sel.options].some(o=>o.value===keep)?keep:'all_cases';
 if(hint)hint.textContent=t('hint');
 decorateCaseCards();
}
function decorateCaseCards(){
 try{const root=document.getElementById('caseMini');if(!root)return;root.querySelectorAll('.mini-case').forEach(card=>{
   const old=card.querySelector('.mp-method-focus-tags');if(old)old.remove();
   let id=card.getAttribute('data-case-id')||'';if(!id){const m=(card.getAttribute('onclick')||'').match(/switchCase\('([^']+)'\)/);if(m)id=m[1]}
   const m=REGISTRY[id];if(!m)return;
   const box=document.createElement('div');box.className='mp-method-focus-tags';box.innerHTML=m.domains.slice(0,2).map(d=>`<span class="tag mp-method-tag">${escapeHtml(t(d))}</span>`).join('');card.appendChild(box);
 })}catch(err){console.warn('[MolPath '+VERSION+'] card decoration failed',err)}
}
function escapeHtml(s){return String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
function styles(){if(document.getElementById('mpMethodFocusStyles'))return;const s=document.createElement('style');s.id='mpMethodFocusStyles';s.textContent=`.mp-method-focus-field{border-top:1px solid var(--line);padding-top:9px;margin-top:1px}.mp-method-focus-hint{font-size:.7rem;line-height:1.3;color:var(--muted);margin-top:5px}.mp-method-focus-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:7px}.mp-method-tag{font-size:.65rem!important;background:#f3f8fb!important;border-color:#bfd5e2!important;color:#34566b!important}`;document.head.appendChild(s)}

/* Intersect with existing search/mode/difficulty/Signature filtering. */
try{const PREV_FILTERED=filteredCases;filteredCases=function(){const list=PREV_FILTERED.apply(this,arguments);const v=currentValue();if(v==='all_cases')return list;if(v==='all_methods')return list.filter(isDriver);return list.filter(c=>{const m=meta(c);return !!m&&m.domains.includes(v)})};window.filteredCases=filteredCases}catch(err){console.error('[MolPath '+VERSION+'] filteredCases wrap failed',err)}

/* Retire the legacy binary MET badge; curated focus badges replace it. */
try{v15IsMET=function(){return false};window.v15IsMET=v15IsMET}catch(_){}
try{const PREV_TAG_LINE=v15TagLine;v15TagLine=function(c){const base=PREV_TAG_LINE.apply(this,arguments);const m=meta(c);if(!m)return base;return base+' '+m.domains.slice(0,2).map(d=>`<span class="tag mp-method-tag">${escapeHtml(t(d))}</span>`).join(' ')};window.v15TagLine=v15TagLine}catch(_){}
try{const PREV_PICKER=renderCasePicker;renderCasePicker=function(){const out=PREV_PICKER.apply(this,arguments);decorateCaseCards();return out};window.renderCasePicker=renderCasePicker}catch(_){}

const PREV_AFTER=window.MolPathI18nAfterApply;window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_AFTER==='function')PREV_AFTER(l)}catch(_){}try{localizeFilter()}catch(_){}};
function boot(){ensureCaseMetadata();styles();ensureFilter();try{if(typeof renderCasePicker==='function')renderCasePicker()}catch(_){}try{if(typeof render==='function')render()}catch(_){}decorateCaseCards();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);
window.MolPathMethodFocusRegistry=Object.freeze({version:VERSION,driverCount:Object.keys(REGISTRY).length,domains:[...DOMAIN_ORDER],registry:REGISTRY,rule:'Method filter eligibility requires methodology to materially determine the correct resolution; method occurrence alone is insufficient.'});
try{console.log('[MolPath '+VERSION+'] Methods Focus filter loaded:',Object.keys(REGISTRY).length,'cases')}catch(_){}
})();