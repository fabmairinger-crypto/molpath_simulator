/* MolPath Simulator v2.5.0b — lightweight i18n QA */
(function(){
'use strict';
function run(){
  const core=window.MolPathI18n, langs=window.MolPathLanguageRegistry;
  if(!core||!langs)return {ok:false,error:'i18n core not loaded'};
  const codes=langs.list().map(x=>x.code);
  const sourceKeys=Object.keys(core.dict[langs.source]||{});
  const union=new Set(sourceKeys);
  codes.filter(c=>c!==langs.source).forEach(c=>Object.keys(core.dict[c]||{}).forEach(k=>union.add(k)));
  const missing={}; const missingSource={};
  codes.filter(c=>c!==langs.source).forEach(c=>{
    missing[c]=Array.from(union).filter(k=>!Object.prototype.hasOwnProperty.call(core.dict[c]||{},k));
    missingSource[c]=sourceKeys.filter(k=>!Object.prototype.hasOwnProperty.call(core.dict[c]||{},k));
  });
  const descriptors=Object.fromEntries(codes.map(c=>{const d=langs.get(c);return [c,{label:d.label,dir:d.dir}];}));
  const fallbackProbe='__MOLPATH_I18N_FALLBACK_PROBE__';
  const fallbackOk=codes.every(c=>core.translate(fallbackProbe,c)===fallbackProbe);
  const duplicateFree=(new Set(codes)).size===codes.length;
  const localeLoaded=Object.fromEntries(codes.map(c=>[c,!!(core.localeRegistry&&core.localeRegistry.has&&core.localeRegistry.has(c))]));
  const registeredRoundTrip=Object.fromEntries(codes.map(c=>[c,langs.normalize(c)===c&&langs.isRegistered(c)]));
  const registryOk=Object.values(registeredRoundTrip).every(Boolean);
  const localesOk=Object.values(localeLoaded).every(Boolean);
  return {
    ok:fallbackOk&&duplicateFree&&registryOk&&localesOk,
    sourceLanguage:langs.source,
    languages:descriptors,
    dictionaryKeys:Object.fromEntries(codes.map(c=>[c,Object.keys(core.dict[c]||{}).length])),
    sourceKeyCount:sourceKeys.length,
    unionKeyCount:union.size,
    missingSourceKeyCount:Object.fromEntries(Object.entries(missingSource).map(([c,v])=>[c,v.length])),
    missingSourceKeys:missingSource,
    missingRuntimeUnionKeyCount:Object.fromEntries(Object.entries(missing).map(([c,v])=>[c,v.length])),
    missingRuntimeUnionKeys:missing,
    fallbackOk,
    registryOk,
    localesOk,
    registeredRoundTrip,
    localeLoaded,
    document:{lang:document.documentElement.lang,dir:document.documentElement.dir},
    note:'Missing keys fall back to the German source string by design.'
  };
}
window.MolPathI18nQA=Object.freeze({run});
})();
