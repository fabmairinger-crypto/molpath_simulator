/* MolPath Simulator v2.6.0-rc1 — Case Consistency Curation + i18n
   Scope: 12 jointly curated MTB/MET cases only.
   Load after all content/asset upgrade scripts and immediately BEFORE v250b_signature_taxonomy_freeze.js.
   Non-destructive policy: no case IDs removed; legacy MLH1 methylation ID remains accepted as alias.
*/
(function(){
'use strict';
const VERSION='v2.6.0-rc1-case-curation-2026-09-25';
const IDS=Object.freeze({
 CHOL:'MTB_CHOL_001_v1_3', IO3:'MTB_IO_003_v1_3', OVAR2:'MTB_OVAR_002_v1_3', METH:'MET_METH_001_v1_3',
 ANGIO:'MTB_ANGIO_001_v1_3', GBM:'MTB_GBM_ANGIO_001_v1_3', CRC3:'MTB_CRC_003_v1_3', IO4:'MTB_IO_004_v1_3',
 INV:'MTB_INV_001_v1_3', IO5:'MTB_IO_005_v1_3', PROST:'MTB_PROST_001_v1_3', CRC4:'MTB_CRC_004_v1_3'
});
const ALL_IDS=Object.values(IDS);

function caze(id){try{return cases.find(c=>c.id===id)||null}catch(_){return null}}
function deep(id){
 try{
  if(typeof DEEP_DIVE_MAP_V17!=='undefined'&&DEEP_DIVE_MAP_V17&&DEEP_DIVE_MAP_V17[id])return DEEP_DIVE_MAP_V17[id];
  if(typeof DEEP_DIVE_CASES_V17!=='undefined'&&DEEP_DIVE_CASES_V17){
   if(DEEP_DIVE_CASES_V17[id])return DEEP_DIVE_CASES_V17[id];
   if(Array.isArray(DEEP_DIVE_CASES_V17))return DEEP_DIVE_CASES_V17.find(x=>x&&x.case_id===id)||null;
  }
 }catch(_){}
 return null;
}
function opt(d){try{return d?.result_packages?.find(x=>x.id==='optimal')?.result||d?.twist?.content||''}catch(_){return ''}}
function partial(d){try{return d?.result_packages?.find(x=>x.id==='partial')?.result||d?.twist?.content||''}catch(_){return ''}}
function addUnique(a,vals){const out=Array.isArray(a)?a.slice():[]; vals.forEach(v=>{if(!out.includes(v))out.push(v)});return out}
function setStoryValue(c,stepId,key,value){try{const s=(c.story||[]).find(x=>x.id===stepId);if(!s)return;const row=(s.items||[]).find(x=>x[0]===key);if(row)row[1]=value;else(s.items||(s.items=[])).push([key,value])}catch(_){}}
function replaceDeep(v,from,to){
 if(typeof v==='string')return v.split(from).join(to);
 if(Array.isArray(v)){for(let i=0;i<v.length;i++)v[i]=replaceDeep(v[i],from,to);return v}
 if(v&&typeof v==='object'){Object.keys(v).forEach(k=>{v[k]=replaceDeep(v[k],from,to)});return v}
 return v;
}

/* ---------- i18n: exact translations for NEW strings introduced by this delta ---------- */
const TX={
 en:{
  'CCA-spezifische Tumorprofilierung':'CCA-specific tumour profiling','FGFR2-Fusionsdiagnostik':'FGFR2 fusion testing','Response-/VEGF-Kontext':'Response / VEGF context','RAS-Status':'RAS status','MLH1-Promotormethylierung':'MLH1 promoter methylation','Histopathologische Risikobewertung':'Histopathological risk assessment','HRR/BRCA-Tumorprofil':'Tumour HRR/BRCA profile','Hereditäre Abklärung':'Hereditary assessment','Materialrepräsentativität / Kontroll-HE':'Material representativeness / control H&E','bereits bekannt / nicht erneut nötig':'already known / no repeat needed','nur bei Zusatzfrage':'only for an additional question','nach Materialwechsel':'after change to representative material','zu früh / falsches Material':'premature / wrong material','Interpretation, kein Zusatztest':'interpretation, no additional test','mechanistisch optional':'mechanistically optional','kein Zusatztest erforderlich':'no additional test required','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'KRAS p.G12D excludes cetuximab/panitumumab in the conventional mCRC setting; this does not imply a contraindication to bevacizumab.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'Complete RAS status if not already available.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'The literature association is plausible and should not be dismissed. At the same time, the pneumonia was microbiologically confirmed and required treatment. The central twist is therefore epistemic: a potentially adverse exposure or contextual factor does not make necessary treatment wrong and does not constitute a validated individual contraindication to ICI.'
 },
 ro:{
  'CCA-spezifische Tumorprofilierung':'Profilare tumorală specifică CCA','FGFR2-Fusionsdiagnostik':'Testarea fuziunilor FGFR2','Response-/VEGF-Kontext':'Context răspuns / VEGF','RAS-Status':'Status RAS','MLH1-Promotormethylierung':'Metilarea promotorului MLH1','Histopathologische Risikobewertung':'Evaluare histopatologică a riscului','HRR/BRCA-Tumorprofil':'Profil tumoral HRR/BRCA','Hereditäre Abklärung':'Evaluare ereditară','Materialrepräsentativität / Kontroll-HE':'Reprezentativitatea materialului / HE de control','bereits bekannt / nicht erneut nötig':'deja cunoscut / nu necesită repetare','nur bei Zusatzfrage':'doar pentru o întrebare suplimentară','nach Materialwechsel':'după schimbarea cu material reprezentativ','zu früh / falsches Material':'prematur / material greșit','Interpretation, kein Zusatztest':'interpretare, fără test suplimentar','mechanistisch optional':'opțional mecanistic','kein Zusatztest erforderlich':'nu este necesar un test suplimentar','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'KRAS p.G12D exclude cetuximab/panitumumab în contextul clasic mCRC; de aici nu rezultă o contraindicație pentru bevacizumab.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'Completați statusul RAS dacă nu este deja disponibil.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'Asocierea din literatură este plauzibilă și nu trebuie ignorată. În același timp, pneumonia a fost confirmată microbiologic și a necesitat tratament. Ideea centrală este epistemică: un posibil factor nefavorabil de expunere sau context nu face greșit un tratament necesar și nu constituie o contraindicație individuală validată pentru ICI.'
 },
 el:{
  'CCA-spezifische Tumorprofilierung':'Ειδικό για CCA μοριακό προφίλ όγκου','FGFR2-Fusionsdiagnostik':'Έλεγχος σύντηξης FGFR2','Response-/VEGF-Kontext':'Πλαίσιο ανταπόκρισης / VEGF','RAS-Status':'Κατάσταση RAS','MLH1-Promotormethylierung':'Μεθυλίωση υποκινητή MLH1','Histopathologische Risikobewertung':'Ιστοπαθολογική εκτίμηση κινδύνου','HRR/BRCA-Tumorprofil':'Ογκολογικό προφίλ HRR/BRCA','Hereditäre Abklärung':'Διερεύνηση κληρονομικότητας','Materialrepräsentativität / Kontroll-HE':'Αντιπροσωπευτικότητα υλικού / HE ελέγχου','bereits bekannt / nicht erneut nötig':'ήδη γνωστό / δεν χρειάζεται επανάληψη','nur bei Zusatzfrage':'μόνο για πρόσθετο ερώτημα','nach Materialwechsel':'μετά από αλλαγή σε αντιπροσωπευτικό υλικό','zu früh / falsches Material':'πρόωρο / λανθασμένο υλικό','Interpretation, kein Zusatztest':'ερμηνεία, χωρίς πρόσθετη εξέταση','mechanistisch optional':'προαιρετικό για μηχανιστική ερμηνεία','kein Zusatztest erforderlich':'δεν απαιτείται πρόσθετη εξέταση','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'Η KRAS p.G12D αποκλείει cetuximab/panitumumab στο κλασικό πλαίσιο mCRC· αυτό δεν συνεπάγεται αντένδειξη για bevacizumab.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'Ολοκληρώστε την κατάσταση RAS εφόσον δεν είναι ήδη διαθέσιμη.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'Η συσχέτιση της βιβλιογραφίας είναι εύλογη και δεν πρέπει να αγνοείται. Ταυτόχρονα, η πνευμονία ήταν μικροβιολογικά τεκμηριωμένη και απαιτούσε θεραπεία. Το κεντρικό σημείο είναι επιστημολογικό: ένας πιθανώς δυσμενής παράγοντας έκθεσης ή πλαισίου δεν καθιστά λανθασμένη μια αναγκαία θεραπεία και δεν αποτελεί επικυρωμένη ατομική αντένδειξη για ICI.'
 },
 es:{
  'CCA-spezifische Tumorprofilierung':'Perfil tumoral específico de CCA','FGFR2-Fusionsdiagnostik':'Estudio de fusiones FGFR2','Response-/VEGF-Kontext':'Contexto de respuesta / VEGF','RAS-Status':'Estado RAS','MLH1-Promotormethylierung':'Metilación del promotor de MLH1','Histopathologische Risikobewertung':'Evaluación histopatológica del riesgo','HRR/BRCA-Tumorprofil':'Perfil tumoral HRR/BRCA','Hereditäre Abklärung':'Evaluación hereditaria','Materialrepräsentativität / Kontroll-HE':'Representatividad del material / HE de control','bereits bekannt / nicht erneut nötig':'ya conocido / no es necesario repetir','nur bei Zusatzfrage':'solo ante una pregunta adicional','nach Materialwechsel':'tras cambiar a material representativo','zu früh / falsches Material':'prematuro / material incorrecto','Interpretation, kein Zusatztest':'interpretación, sin prueba adicional','mechanistisch optional':'opcional con finalidad mecanística','kein Zusatztest erforderlich':'no se requiere una prueba adicional','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'KRAS p.G12D excluye cetuximab/panitumumab en el contexto clásico de mCRC; de ello no se deriva una contraindicación para bevacizumab.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'Completar el estado RAS si todavía no está disponible.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'La asociación descrita en la literatura es plausible y no debe descartarse. Al mismo tiempo, la neumonía estaba confirmada microbiológicamente y requería tratamiento. El punto central es epistemológico: un posible factor desfavorable de exposición o contexto no convierte en erróneo un tratamiento necesario ni constituye una contraindicación individual validada para ICI.'
 },
 fr:{
  'CCA-spezifische Tumorprofilierung':'Profilage tumoral spécifique du CCA','FGFR2-Fusionsdiagnostik':'Recherche de fusion FGFR2','Response-/VEGF-Kontext':'Contexte réponse / VEGF','RAS-Status':'Statut RAS','MLH1-Promotormethylierung':'Méthylation du promoteur MLH1','Histopathologische Risikobewertung':'Évaluation histopathologique du risque','HRR/BRCA-Tumorprofil':'Profil tumoral HRR/BRCA','Hereditäre Abklärung':'Évaluation héréditaire','Materialrepräsentativität / Kontroll-HE':'Représentativité du matériel / HE de contrôle','bereits bekannt / nicht erneut nötig':'déjà connu / ne pas répéter','nur bei Zusatzfrage':'uniquement pour une question supplémentaire','nach Materialwechsel':'après changement vers un matériel représentatif','zu früh / falsches Material':'prématuré / mauvais matériel','Interpretation, kein Zusatztest':'interprétation, pas de test supplémentaire','mechanistisch optional':'optionnel à visée mécanistique','kein Zusatztest erforderlich':'aucun test supplémentaire requis','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'KRAS p.G12D exclut le cetuximab/panitumumab dans le cadre classique du mCRC ; cela n’implique pas de contre-indication au bevacizumab.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'Compléter le statut RAS s’il n’est pas déjà disponible.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'L’association rapportée dans la littérature est plausible et ne doit pas être écartée. Dans le même temps, la pneumonie était microbiologiquement documentée et nécessitait un traitement. Le point central est donc épistémique : un facteur d’exposition ou de contexte potentiellement défavorable ne rend pas erroné un traitement nécessaire et ne constitue pas une contre-indication individuelle validée aux ICI.'
 },
 ru:{
  'CCA-spezifische Tumorprofilierung':'Опухолевое профилирование, специфичное для CCA','FGFR2-Fusionsdiagnostik':'Исследование слияний FGFR2','Response-/VEGF-Kontext':'Контекст ответа / VEGF','RAS-Status':'Статус RAS','MLH1-Promotormethylierung':'Метилирование промотора MLH1','Histopathologische Risikobewertung':'Гистопатологическая оценка риска','HRR/BRCA-Tumorprofil':'Опухолевый профиль HRR/BRCA','Hereditäre Abklärung':'Оценка наследственного риска','Materialrepräsentativität / Kontroll-HE':'Репрезентативность материала / контрольная H&E','bereits bekannt / nicht erneut nötig':'уже известно / повтор не требуется','nur bei Zusatzfrage':'только при дополнительном вопросе','nach Materialwechsel':'после замены на репрезентативный материал','zu früh / falsches Material':'преждевременно / неверный материал','Interpretation, kein Zusatztest':'интерпретация, без дополнительного теста','mechanistisch optional':'опционально для механистической оценки','kein Zusatztest erforderlich':'дополнительный тест не требуется','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'KRAS p.G12D исключает цетуксимаб/панитумумаб в классическом контексте мКРР; из этого не следует противопоказание к бевацизумабу.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'Дополнить статус RAS, если он еще не определен.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'Связь, описанная в литературе, правдоподобна и не должна игнорироваться. В то же время пневмония была микробиологически подтверждена и требовала лечения. Ключевой момент носит эпистемический характер: потенциально неблагоприятный фактор экспозиции или контекста не делает необходимое лечение ошибочным и не является валидированным индивидуальным противопоказанием к ИКИ.'
 },
 tr:{
  'CCA-spezifische Tumorprofilierung':'CCA’ya özgü tümör profillemesi','FGFR2-Fusionsdiagnostik':'FGFR2 füzyon testi','Response-/VEGF-Kontext':'Yanıt / VEGF bağlamı','RAS-Status':'RAS durumu','MLH1-Promotormethylierung':'MLH1 promotör metilasyonu','Histopathologische Risikobewertung':'Histopatolojik risk değerlendirmesi','HRR/BRCA-Tumorprofil':'Tümör HRR/BRCA profili','Hereditäre Abklärung':'Kalıtsal değerlendirme','Materialrepräsentativität / Kontroll-HE':'Materyal temsil edilebilirliği / kontrol H&E','bereits bekannt / nicht erneut nötig':'zaten biliniyor / tekrar gerekmez','nur bei Zusatzfrage':'yalnızca ek bir soru varsa','nach Materialwechsel':'temsili materyale geçildikten sonra','zu früh / falsches Material':'erken / yanlış materyal','Interpretation, kein Zusatztest':'yorumlama, ek test yok','mechanistisch optional':'mekanistik olarak opsiyonel','kein Zusatztest erforderlich':'ek test gerekli değil','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'KRAS p.G12D klasik mCRC bağlamında setuksimab/panitumumab kullanımını dışlar; bu durum bevacizumab için bir kontrendikasyon anlamına gelmez.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'Henüz mevcut değilse RAS durumunu tamamlayın.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'Literatürdeki ilişki makuldür ve göz ardı edilmemelidir. Aynı zamanda pnömoni mikrobiyolojik olarak doğrulanmış ve tedavi gerektirmiştir. Temel nokta epistemiktir: olası olumsuz bir maruziyet veya bağlam faktörü gerekli bir tedaviyi yanlış yapmaz ve ICI için doğrulanmış bireysel bir kontrendikasyon oluşturmaz.'
 },
 ar:{
  'CCA-spezifische Tumorprofilierung':'التوصيف الورمي الخاص بسرطان القنوات الصفراوية داخل الكبد','FGFR2-Fusionsdiagnostik':'اختبار اندماج FGFR2','Response-/VEGF-Kontext':'سياق الاستجابة / VEGF','RAS-Status':'حالة RAS','MLH1-Promotormethylierung':'مثيلة محفّز MLH1','Histopathologische Risikobewertung':'تقييم الخطورة النسيجية المرضية','HRR/BRCA-Tumorprofil':'الملف الورمي HRR/BRCA','Hereditäre Abklärung':'التقييم الوراثي','Materialrepräsentativität / Kontroll-HE':'تمثيل العينة / صبغة H&E ضابطة','bereits bekannt / nicht erneut nötig':'معلوم مسبقًا / لا حاجة للإعادة','nur bei Zusatzfrage':'فقط عند وجود سؤال إضافي','nach Materialwechsel':'بعد الانتقال إلى عينة ممثلة','zu früh / falsches Material':'مبكر جدًا / عينة غير مناسبة','Interpretation, kein Zusatztest':'تفسير دون اختبار إضافي','mechanistisch optional':'اختياري لأغراض ميكانيكية','kein Zusatztest erforderlich':'لا يلزم اختبار إضافي','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'تستبعد KRAS p.G12D استخدام سيتوكسيماب/بانيتوموماب في السياق التقليدي لسرطان القولون والمستقيم النقيلي؛ ولا يعني ذلك وجود مضاد استطباب لبيفاسيزوماب.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'استكمال حالة RAS إذا لم تكن متاحة بالفعل.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'الارتباط الموصوف في الأدبيات معقول ولا ينبغي تجاهله. وفي الوقت نفسه كان الالتهاب الرئوي مثبتًا ميكروبيولوجيًا ويحتاج إلى علاج. لذلك فالنقطة المحورية معرفية: عامل تعرض أو سياق محتمل غير مواتٍ لا يجعل العلاج الضروري خاطئًا ولا يشكل مضاد استطباب فرديًا مُثبتًا لمثبطات نقاط التفتيش المناعية.'
 },
 fa:{
  'CCA-spezifische Tumorprofilierung':'پروفایل تومور اختصاصی CCA','FGFR2-Fusionsdiagnostik':'بررسی فیوژن FGFR2','Response-/VEGF-Kontext':'زمینه پاسخ / VEGF','RAS-Status':'وضعیت RAS','MLH1-Promotormethylierung':'متیلاسیون پروموتر MLH1','Histopathologische Risikobewertung':'ارزیابی خطر هیستوپاتولوژیک','HRR/BRCA-Tumorprofil':'پروفایل توموری HRR/BRCA','Hereditäre Abklärung':'بررسی ارثی','Materialrepräsentativität / Kontroll-HE':'نمایندگی نمونه / H&E کنترلی','bereits bekannt / nicht erneut nötig':'از قبل معلوم / نیازی به تکرار نیست','nur bei Zusatzfrage':'فقط در صورت وجود سؤال اضافی','nach Materialwechsel':'پس از جایگزینی با نمونه نماینده','zu früh / falsches Material':'زودهنگام / نمونه نامناسب','Interpretation, kein Zusatztest':'تفسیر، بدون آزمایش اضافی','mechanistisch optional':'از نظر مکانیسمی اختیاری','kein Zusatztest erforderlich':'آزمایش اضافی لازم نیست','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'KRAS p.G12D در زمینه کلاسیک mCRC استفاده از ستوکسیماب/پانیتوموماب را منتفی می‌کند؛ از این موضوع منع مصرف بواسیزوماب نتیجه نمی‌شود.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'در صورت موجود نبودن، وضعیت RAS را تکمیل کنید.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'ارتباط گزارش‌شده در متون علمی قابل قبول است و نباید نادیده گرفته شود. هم‌زمان پنومونی از نظر میکروبیولوژیک تأیید شده و نیازمند درمان بود. نکته اصلی معرفت‌شناختی است: یک عامل مواجهه یا زمینه‌ای بالقوه نامطلوب، درمان ضروری را نادرست نمی‌کند و منع مصرف فردی تأییدشده‌ای برای ICI ایجاد نمی‌کند.'
 },
 uk:{
  'CCA-spezifische Tumorprofilierung':'Пухлинне профілювання, специфічне для CCA','FGFR2-Fusionsdiagnostik':'Дослідження злиття FGFR2','Response-/VEGF-Kontext':'Контекст відповіді / VEGF','RAS-Status':'Статус RAS','MLH1-Promotormethylierung':'Метилювання промотора MLH1','Histopathologische Risikobewertung':'Гістопатологічна оцінка ризику','HRR/BRCA-Tumorprofil':'Пухлинний профіль HRR/BRCA','Hereditäre Abklärung':'Оцінка спадкового ризику','Materialrepräsentativität / Kontroll-HE':'Репрезентативність матеріалу / контрольна H&E','bereits bekannt / nicht erneut nötig':'вже відомо / повтор не потрібен','nur bei Zusatzfrage':'лише за наявності додаткового питання','nach Materialwechsel':'після заміни на репрезентативний матеріал','zu früh / falsches Material':'передчасно / неправильний матеріал','Interpretation, kein Zusatztest':'інтерпретація, без додаткового тесту','mechanistisch optional':'опційно для механістичної оцінки','kein Zusatztest erforderlich':'додатковий тест не потрібен','KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.':'KRAS p.G12D виключає цетуксимаб/панітумумаб у класичному контексті мКРР; це не означає протипоказання до бевацизумабу.','RAS-Status vervollständigen, sofern nicht bereits vorhanden.':'Доповнити статус RAS, якщо він ще не визначений.','Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.':'Асоціація, описана в літературі, є правдоподібною і не повинна ігноруватися. Водночас пневмонія була мікробіологічно підтверджена та потребувала лікування. Ключовий момент є епістемічним: потенційно несприятливий фактор експозиції або контексту не робить необхідне лікування неправильним і не є валідованим індивідуальним протипоказанням до ІКІ.'
 }
};
function mergeI18n(){
 try{
  const core=window.MolPathI18n;if(!core||!core.dict)return false;
  Object.entries(TX).forEach(([lang,map])=>{const target=core.dict[lang]=core.dict[lang]||{};Object.entries(map).forEach(([src,dst])=>{target[src]=dst})});
  try{if(typeof core.applyNow==='function')core.applyNow();else if(typeof core.apply==='function')core.apply();}catch(_){}
  return true;
 }catch(_){return false}
}

function patchRule(id,{recommended=[],reflex=[],low=[],mis=[]}){
 try{
  const r=(typeof V15_METHOD_RULE_MAP!=='undefined'&&V15_METHOD_RULE_MAP)?V15_METHOD_RULE_MAP[id]:null;
  if(!r)return;
  r.recommended=recommended.slice();r.reflex_or_conditional=reflex.slice();r.low_value_examples=low.slice();r.misleading_examples=mis.slice();r.method_review_flag='curated 2026-09-25';
 }catch(_){}
}

function patchCases(){
 let c,d;
 /* 1 CHOL */
 c=caze(IDS.CHOL);d=deep(IDS.CHOL);if(c){
  c.allowed_tests=addUnique(c.allowed_tests,['chol_panel','fgfr2_fusion','idh1_chol']);
  c.required_groups=[
   {id:'cca_profile',label:'CCA-spezifische Tumorprofilierung',tests:['chol_panel'],suggest:'chol_panel'},
   {id:'fgfr2_fusion',label:'FGFR2-Fusionsdiagnostik',tests:['fgfr2_fusion'],suggest:'fgfr2_fusion'}
  ];
  c.result_sections=[
   {label:'CCA-spezifische Tumorprofilierung',test_any:['chol_panel','idh1_chol','broad_pan_panel'],result:d?.pre_results?.[1]?.content||''},
   {label:'FGFR2-Fusionsdiagnostik',test_any:['fgfr2_fusion'],result:d?.twist?.content||''}
  ];
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
  c.mtb_checks=[['cca_profile','CCA-spezifische Tumorprofilierung'],['fgfr2_fusion','FGFR2-Fusionsdiagnostik'],['limits','Aussagegrenzen und ggf. Nachforderung klar kommunizieren']];
 }
 patchRule(IDS.CHOL,{recommended:['chol_panel','fgfr2_fusion'],reflex:['idh1_chol'],low:['broad_pan_panel'],mis:['idh1_ihc_seq','cns_methylation_classifier','mgmt_methylation','glioma_ngs_panel']});

 /* 2 IO3 */
 c=caze(IDS.IO3);d=deep(IDS.IO3);if(c){
  c.allowed_tests=addUnique(c.allowed_tests,['mmr_ihc','msi_pcr_ngs']);
  c.required_groups=[
   {id:'mmr',label:'MMR-IHC',tests:['mmr_ihc'],suggest:'mmr_ihc'},
   {id:'msi',label:'MSI-Testung',tests:['msi_pcr_ngs','colon_ngs_panel'],suggest:'msi_pcr_ngs'}
  ];
  c.result_sections=[
   {label:'MMR-IHC',test_any:['mmr_ihc'],result:'pMMR'},
   {label:'MSI-Testung',test_any:['msi_pcr_ngs','colon_ngs_panel'],result:'MSS'}
  ];
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
 }
 patchRule(IDS.IO3,{recommended:['mmr_ihc','msi_pcr_ngs'],reflex:['pdl1'],low:['tmb_ngs','immune_context_ihc','broad_pan_panel'],mis:['fusion_rna_ngs','rna_fusion_panel','fusion_fish']});

 /* 3 OVAR2: completion/content is patched in replacement v240z18 wrapper; here only method taxonomy + placeholder safety */
 d=deep(IDS.OVAR2);if(d)replaceDeep(d,'BRCA2 c.X p.Y','BRCA2 NM_000059.4:c.7007G>A, p.(Arg2336His)');
 patchRule(IDS.OVAR2,{recommended:['hrd_score','germline_referral','vusic'],reflex:['tumor_brca_hrr','orthogonal_confirmation'],low:['broad_pan_panel','vus_literature_review'],mis:['fusion_rna_ngs','rna_fusion_panel','fusion_fish']});

 /* 4 MET_METH */
 c=caze(IDS.METH);d=deep(IDS.METH);if(c){
  c.required_groups=[{id:'mgmt',label:'Zielgerichtete validierte MGMT-Methylierungsanalyse',tests:['bisulfite_pcr'],suggest:'bisulfite_pcr'}];
  c.result_sections=[{label:'Zielgerichtete validierte MGMT-Methylierungsanalyse',test_any:['bisulfite_pcr'],result:d?.twist?.content||''}];
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
 }
 patchRule(IDS.METH,{recommended:['bisulfite_pcr'],reflex:[],low:['cns_methylation_classifier','broad_pan_panel'],mis:[]});

 /* 5 ANGIO */
 c=caze(IDS.ANGIO);d=deep(IDS.ANGIO);if(c){
  c.allowed_tests=addUnique(c.allowed_tests,['ras_panel_crc','braf_v600e_crc']);
  c.required_groups=[];c.result_sections=[];
  c.always_findings=[[d?.pre_results?.[0]?.title||'CRC-Profil',d?.pre_results?.[0]?.content||''],[d?.twist?.title||'Einordnung',d?.twist?.content||'']];
  c.complete_interpretation=d?.twist?.content||opt(d);c.partial_interpretation=c.complete_interpretation;c.optimal_summary=c.complete_interpretation;
 }
 if(d?.expected_path?.length)d.expected_path[0]='KRAS p.G12D schließt Cetuximab/Panitumumab im klassischen mCRC-Setting aus; daraus folgt keine Kontraindikation gegen Bevacizumab.';
 patchRule(IDS.ANGIO,{recommended:[],reflex:['colon_ngs_panel','vegf_context'],low:['mmr_ihc','msi_pcr_ngs','ras_panel_crc','braf_v600e_crc','broad_pan_panel'],mis:['vhl_hif_panel']});

 /* 6 GBM ANGIO */
 c=caze(IDS.GBM);d=deep(IDS.GBM);if(c){
  c.required_groups=[{id:'vegf_response',label:'Response-/VEGF-Kontext',tests:['vegf_context'],suggest:'vegf_context'}];
  c.result_sections=[{label:'Response-/VEGF-Kontext',test_any:['vegf_context'],result:d?.result_packages?.find(x=>x.id==='optimal')?.result||d?.twist?.content||''}];
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
 }
 patchRule(IDS.GBM,{recommended:['vegf_context'],reflex:[],low:['idh1_ihc_seq','mgmt_methylation','cns_methylation_classifier','glioma_ngs_panel','broad_pan_panel','he_review'],mis:['vhl_hif_panel']});

 /* 7 CRC3 */
 c=caze(IDS.CRC3);d=deep(IDS.CRC3);if(c){
  c.allowed_tests=addUnique(c.allowed_tests,['ras_panel_crc','braf_v600e_crc']);
  c.required_groups=[
   {id:'ras',label:'RAS-Status',tests:['ras_panel_crc','colon_ngs_panel','broad_pan_panel'],suggest:'ras_panel_crc'},
   {id:'mmr',label:'MMR-IHC',tests:['mmr_ihc'],suggest:'mmr_ihc'},
   {id:'msi',label:'MSI-Testung',tests:['msi_pcr_ngs','colon_ngs_panel','broad_pan_panel'],suggest:'msi_pcr_ngs'}
  ];
  c.result_sections=[
   {label:'RAS-Status',test_any:['ras_panel_crc','colon_ngs_panel','broad_pan_panel'],result:'KRAS/NRAS WT'},
   {label:'MMR-IHC',test_any:['mmr_ihc'],result:'pMMR'},
   {label:'MSI-Testung',test_any:['msi_pcr_ngs','colon_ngs_panel','broad_pan_panel'],result:'MSS'}
  ];
  c.always_findings=[[d?.pre_results?.[0]?.title||'BRAF',d?.pre_results?.[0]?.content||'']];
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
 }
 if(d&&Array.isArray(d.expected_path)&&!d.expected_path.includes('RAS-Status vervollständigen, sofern nicht bereits vorhanden.'))d.expected_path.splice(1,0,'RAS-Status vervollständigen, sofern nicht bereits vorhanden.');
 patchRule(IDS.CRC3,{recommended:['ras_panel_crc','mmr_ihc','msi_pcr_ngs'],reflex:['colon_ngs_panel'],low:['braf_pcr','braf_v600e_crc','broad_pan_panel'],mis:['braf_melanoma','melanoma_io_context']});

 /* 8 IO4 */
 c=caze(IDS.IO4);d=deep(IDS.IO4);if(c){
  c.required_groups=[
   {id:'mmr',label:'MMR-IHC',tests:['mmr_ihc'],suggest:'mmr_ihc'},
   {id:'msi',label:'MSI-Testung',tests:['msi_pcr_ngs','colon_ngs_panel'],suggest:'msi_pcr_ngs'},
   {id:'mlh1',label:'MLH1-Promotormethylierung',tests:['mlh1_methylation','methylation_mlh1'],suggest:'mlh1_methylation'}
  ];
  c.result_sections=[
   {label:'MMR-IHC',test_any:['mmr_ihc'],result:d?.expected_path?.[0]||''},
   {label:'MSI-Testung',test_any:['msi_pcr_ngs','colon_ngs_panel'],result:d?.expected_path?.[1]||''},
   {label:'MLH1-Promotormethylierung',test_any:['mlh1_methylation','methylation_mlh1'],result:d?.twist?.content||''}
  ];
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
 }
 patchRule(IDS.IO4,{recommended:['mmr_ihc','msi_pcr_ngs','mlh1_methylation'],reflex:['methylation_mlh1','colon_ngs_panel'],low:['pdl1','tmb_ngs','immune_context_ihc','broad_pan_panel'],mis:['braf_v600e_crc']});

 /* 9 INV */
 c=caze(IDS.INV);d=deep(IDS.INV);if(c){
  c.required_groups=[{id:'histo_risk',label:'Histopathologische Risikobewertung',tests:['he_review'],suggest:'he_review'}];
  c.result_sections=[
   {label:'Histopathologische Risikobewertung',test_any:['he_review'],result:d?.pre_results?.[1]?.content||''},
   {label:'EMT',test_any:['emt_invasion_panel'],result:d?.twist?.content||''}
  ];
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
 }
 patchRule(IDS.INV,{recommended:['he_review'],reflex:['emt_invasion_panel'],low:['broad_pan_panel'],mis:[]});

 /* 10 IO5 */
 c=caze(IDS.IO5);d=deep(IDS.IO5);if(c){
  c.required_groups=[];c.result_sections=[];
  c.always_findings=[[d?.pre_results?.[0]?.title||'PD-L1',d?.pre_results?.[0]?.content||''],[d?.pre_results?.[2]?.title||'Antibiotika',d?.pre_results?.[2]?.content||'']];
  c.complete_interpretation=d?.twist?.content||opt(d);c.partial_interpretation=c.complete_interpretation;c.optimal_summary=c.complete_interpretation;
 }
 if(d?.twist)d.twist.content='Die Literaturassoziation ist plausibel und soll nicht weggewischt werden. Gleichzeitig war die Pneumonie mikrobiologisch gesichert und behandlungsbedürftig. Der zentrale Twist ist daher epistemisch: Ein möglicher ungünstiger Expositions- bzw. Kontextfaktor macht eine notwendige Behandlung nicht falsch und stellt keine validierte individuelle ICI-Kontraindikation dar.';
 patchRule(IDS.IO5,{recommended:[],reflex:[],low:['pdl1','tmb_ngs','immune_context_ihc','broad_pan_panel','he_review'],mis:[]});

 /* 11 PROST */
 c=caze(IDS.PROST);d=deep(IDS.PROST);if(c){
  c.allowed_tests=addUnique(c.allowed_tests,['mmr_ihc','msi_pcr_ngs']);
  c.required_groups=[
   {id:'hrr',label:'HRR/BRCA-Tumorprofil',tests:['prostate_hrr','tumor_brca_hrr','broad_pan_panel'],suggest:'prostate_hrr'},
   {id:'mmr',label:'MMR-IHC',tests:['mmr_ihc'],suggest:'mmr_ihc'},
   {id:'msi',label:'MSI-Testung',tests:['msi_pcr_ngs','broad_pan_panel'],suggest:'msi_pcr_ngs'},
   {id:'germline',label:'Hereditäre Abklärung',tests:['germline_referral'],suggest:'germline_referral'}
  ];
  c.result_sections=[
   {label:'HRR/BRCA-Tumorprofil',test_any:['prostate_hrr','tumor_brca_hrr','broad_pan_panel'],result:d?.twist?.content||''},
   {label:'MMR-IHC',test_any:['mmr_ihc'],result:'pMMR'},
   {label:'MSI-Testung',test_any:['msi_pcr_ngs','broad_pan_panel'],result:'MSS'},
   {label:'Hereditäre Abklärung',test_any:['germline_referral'],result:d?.expected_path?.[4]||''}
  ];
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
 }
 patchRule(IDS.PROST,{recommended:['prostate_hrr','mmr_ihc','msi_pcr_ngs','germline_referral'],reflex:['tumor_brca_hrr','broad_pan_panel'],low:['hrd_score'],mis:[]});

 /* 12 CRC4 */
 c=caze(IDS.CRC4);d=deep(IDS.CRC4);if(c){
  c.allowed_tests=addUnique(c.allowed_tests,['ras_panel_crc','braf_v600e_crc']);
  c.required_groups=[{id:'material_gate',label:'Materialrepräsentativität / Kontroll-HE',tests:['he_review'],suggest:'he_review'}];
  c.result_sections=[{label:'Materialrepräsentativität / Kontroll-HE',test_any:['he_review'],result:d?.pre_results?.[0]?.content||''}];
  setStoryValue(c,'histo','Morphologie',d?.pre_results?.[0]?.content||'Kein sicher invasives Karzinom im eingesandten Block.');
  setStoryValue(c,'material','Material',d?.pre_results?.[2]?.content||'Block A1 gehört zur Polypektomie; Resektionsblock B7 trägt den invasiven Tumor.');
  setStoryValue(c,'material','Tumoranteil',d?.pre_results?.[0]?.content||'');
  setStoryValue(c,'material','Präanalytik',d?.pre_results?.[1]?.content||'Sehr gute DNA-Qualität – technisch wären PCR/NGS problemlos möglich.');
  c.complete_interpretation=opt(d);c.partial_interpretation=partial(d);c.optimal_summary=opt(d);
 }
 patchRule(IDS.CRC4,{recommended:['he_review'],reflex:['ras_panel_crc','braf_v600e_crc','mmr_ihc','msi_pcr_ngs','colon_ngs_panel'],low:['broad_pan_panel'],mis:[]});
}

/* ---------- Runtime method-status refinement ---------- */
const PREV_METHOD_STATUS=(typeof methodStatus==='function')?methodStatus:null;
methodStatus=function(id){
 const cid=(typeof activeCase!=='undefined'&&activeCase)?activeCase.id:'';
 const known=(ids)=>ids.includes(id)?{kind:'low_value',label:'bereits bekannt / nicht erneut nötig'}:null;
 let x=null;
 if(cid===IDS.ANGIO){
  if((x=known(['mmr_ihc','msi_pcr_ngs','ras_panel_crc','braf_v600e_crc'])))return x;
  if(id==='vegf_context')return {kind:'optional',label:'Interpretation, kein Zusatztest'};
  if(id==='colon_ngs_panel')return {kind:'reflex',label:'nur bei Zusatzfrage'};
 }
 if(cid===IDS.GBM){
  if(id==='idh1_ihc_seq')return {kind:'low_value',label:'bereits bekannt / nicht erneut nötig'};
  if(id==='vegf_context')return {kind:'recommended',label:'Interpretation, kein Zusatztest'};
 }
 if(cid===IDS.CRC3){
  if((x=known(['braf_pcr','braf_v600e_crc'])))return x;
  if(id==='colon_ngs_panel')return {kind:'reflex',label:'nur bei Zusatzfrage'};
 }
 if(cid===IDS.INV&&id==='emt_invasion_panel')return {kind:'optional',label:'mechanistisch optional'};
 if(cid===IDS.IO5&&id==='pdl1')return {kind:'low_value',label:'bereits bekannt / nicht erneut nötig'};
 if(cid===IDS.OVAR2){
  if(id==='tumor_brca_hrr'||id==='orthogonal_confirmation')return {kind:'reflex',label:'nur bei Zusatzfrage'};
 }
 if(cid===IDS.IO4&&id==='methylation_mlh1')return {kind:'reflex',label:'Alternative'};
 if(cid===IDS.CRC4){
  const molecular=['ras_panel_crc','braf_v600e_crc','mmr_ihc','msi_pcr_ngs','colon_ngs_panel','broad_pan_panel'];
  if(molecular.includes(id)){
   const reviewed=!!(state?.selected?.has&&state.selected.has('he_review'));
   return reviewed?{kind:'reflex',label:'nach Materialwechsel'}:{kind:'invalid',label:'zu früh / falsches Material'};
  }
 }
 return PREV_METHOD_STATUS?PREV_METHOD_STATUS(id):{kind:'optional',label:'optional'};
};
try{window.methodStatus=methodStatus}catch(_){}

/* IO4 alias compatibility: one visible canonical method, both historic IDs remain completion-compatible. */
const PREV_ALLOWED_CATALOG=(typeof allowedCatalog==='function')?allowedCatalog:null;
if(PREV_ALLOWED_CATALOG){
 allowedCatalog=function(){
  const rows=PREV_ALLOWED_CATALOG.apply(this,arguments)||[];
  try{if(activeCase?.id===IDS.IO4)return rows.filter(t=>t.id!=='methylation_mlh1')}catch(_){}
  return rows;
 };
 try{window.allowedCatalog=allowedCatalog}catch(_){}
}

function applyAll(){patchCases();mergeI18n();try{window.MolPathCaseConsistencyCuration={version:VERSION,caseIds:ALL_IDS.slice(),mlh1Alias:['mlh1_methylation','methylation_mlh1'],signatureFreezeMustRemainLast:true}}catch(_){} }
applyAll();

/* Re-apply only idempotent data changes after language application; do not replace render(). */
const PREV_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(lang){try{if(typeof PREV_AFTER==='function')PREV_AFTER(lang)}catch(_){};try{applyAll()}catch(_){}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{try{applyAll();window.MolPathI18n?.applyNow?.()}catch(_){}},{once:true});
else setTimeout(()=>{try{applyAll();window.MolPathI18n?.applyNow?.()}catch(_){}},0);
try{console.log('[MolPath '+VERSION+'] curated 12 cases; MLH1 alias preserved; i18n delta registered for EN/RO/EL/ES/FR/RU/TR/AR/FA/UK.')}catch(_){}
})();
