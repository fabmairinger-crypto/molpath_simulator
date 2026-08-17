/* MolPath Simulator v2.4.0z16 — MET_NGS_003 Premium / Flagship
   Base: v2.4.0z15
   Scope: MET_NGS_003 only. ERBB2/HER2 VUS with therapy request.
   Core rule: analytically real variant != clinically actionable target; integrated recommendation requires variant assessment + IHC + ISH/FISH + evidence curation.
*/
(function(){
'use strict';
const M3_VERSION='v2.4.0z16';
const M3_CASE='MET_NGS_003_v1_0';
const M3_VARIANT='ERBB2 c.2314G>T (p.L772P)';
const M3_ASSETS=Object.freeze({
  referral:'assets/met_ngs_003/referral_request_001.png',
  letter:'assets/met_ngs_003/oncology_letter_001.png',
  he:'assets/met_ngs_003/he_metastasis_001.png',
  variantViewer:'assets/met_ngs_003/erbb2_variant_viewer_001.png',
  ngsReport:'assets/met_ngs_003/ngs_vus_report_001.png',
  ihc:'assets/met_ngs_003/her2_ihc_1plus_001.png',
  fish:'assets/met_ngs_003/her2_fish_nonamplified_001.png',
  curation:'assets/met_ngs_003/vus_curation_workspace_001.png',
  integrated:'assets/met_ngs_003/integrated_mtb_report_001.png'
});
window.MolPathMETNGS003FlagshipAssets=M3_ASSETS;

function active(){try{return !!activeCase&&activeCase.id===M3_CASE}catch(_){return false}}
function caseObj(){try{return cases.find(c=>c.id===M3_CASE)||null}catch(_){return null}}
function selected(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function reportReady(){try{return !!state?.report}catch(_){return false}}
function complete(){try{return !!caseIsComplete()}catch(_){return !!state?.finalized}}
function esc2(v){try{return esc(v==null?'':String(v))}catch(_){return String(v==null?'':v)}}
function lang(){
  try{
    const x=(document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||localStorage.getItem('molpath_language')||'de';
    return ['de','en','ro','el','es','fr'].includes(x)?x:'de';
  }catch(_){return 'de'}
}
function hasVariant(){return selected('erbb2_variant_ngs')||selected('broad_pan_panel')}
function hasIhc(){return selected('her2_ihc')}
function hasFish(){return selected('her2_fish')}
function hasCuration(){return selected('vus_literature_review')}
function hasDirectTherapy(){return selected('direct_her2_therapy')}
function allCoreDone(){return hasVariant()&&hasIhc()&&hasFish()&&hasCuration()}

const COPY={
 de:{
  opening:'ERBB2-VUS mit Therapieanfrage',openingText:'Bei einem metastasierten Adenokarzinom mit Progress nach Standardtherapie wurde im Tumor-NGS eine seltene ERBB2-Missense-Variante nachgewiesen. Das onkologische Team fragt, ob daraus eine HER2-gerichtete Therapie abgeleitet werden kann.',
  casefile:'Klinische Fallakte',referral:'Molekularpathologischer Anforderungsschein',letter:'Onkologischer Arztbrief / MTB-Anfrage',
  histo:'Histologie / Ausgangsmaterial',histoText:'FFPE-Metastase, Block L2, mit etwa 40 % Tumoranteil. Das Material ist für die ergänzende molekulare und HER2-bezogene Diagnostik ausreichend.',he:'HE · Lebermetastase · Block L2',
  task:'Decision Task',taskText:'Ist die technisch nachgewiesene ERBB2-Variante bereits ein belastbares therapeutisches Target – oder muss ihre Bedeutung durch Proteinexpression, Amplifikationsstatus und kuratierte Evidenz eingegrenzt werden?',
  evidence:'Testabhängige Evidenz / Originalansichten',variant:'NGS Variant Viewer · ERBB2 p.L772P · VAF 18,4 %',ngs:'Molekularpathologischer NGS-Befund · VUS',ihc:'HER2-IHC · 1+',fish:'HER2/ERBB2-FISH · nicht amplifiziert',curation:'Variant Curation & Evidence Workspace',integrated:'Integrierter molekularpathologischer MTB-Befund',none:'Für die gewählten Analysen liegt noch kein fallbezogener Premium-Snapshot vor.',synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
  partial:'Teilbefund',full:'Integrierte Bewertung',
  variantOutcome:'Die ERBB2-Missense-Variante c.2314G>T (p.L772P) ist mit VAF 18,4 % technisch sicher nachweisbar, bleibt jedoch als VUS klassifiziert. Analytische Echtheit ist nicht gleich klinische Actionability.',
  ihcOutcome:'Die HER2-IHC zeigt 1+ mit schwacher, inkompletter membranöser Färbung und keine starke Überexpression.',
  fishOutcome:'Die HER2/ERBB2-FISH zeigt keine Amplifikation (HER2/CEP17-Verhältnis etwa 1,0; mittlere HER2-Kopienzahl etwa 2,1).',
  curationOutcome:'Die kuratierte Evidenz bleibt begrenzt bzw. widersprüchlich; eine etablierte prädiktive Sensitivität gegenüber HER2-gerichteten Therapien ist für diese Variante nicht gesichert.',
  fullOutcome:'In der integrierten Bewertung liegt eine technisch echte ERBB2-VUS vor, jedoch weder eine starke HER2-Proteinüberexpression noch eine ERBB2-Amplifikation und keine gesicherte prädiktive Evidenz. Aus dieser Konstellation darf keine HER2-gerichtete Standardtherapie abgeleitet werden; Re-Evaluation bei neuer Evidenz bzw. Studienkontext ist vertretbar.',
  directWarn:'Eine direkte HER2-Therapieempfehlung allein aus der VUS wäre ein Overcalling und ist in diesem Fall nicht evidenzbasiert.',
  key:'Kernaussage',keyText:'Ein onkogenes Gen macht nicht jede darin gefundene Variante actionable. Technische Validität, funktionelle Bedeutung, Protein-/Copy-Number-Kontext und klinische Evidenz müssen getrennt geprüft und erst anschließend integriert werden.'
 },
 en:{
  opening:'ERBB2 VUS with a treatment request',openingText:'In a metastatic adenocarcinoma progressing after standard therapy, tumour NGS detected a rare ERBB2 missense variant. The oncology team asks whether this finding justifies HER2-directed treatment.',
  casefile:'Clinical case file',referral:'Molecular pathology request form',letter:'Oncology letter / MTB request',
  histo:'Histology / source material',histoText:'FFPE metastasis, block L2, with approximately 40% tumour content. The material is adequate for complementary molecular and HER2-related testing.',he:'H&E · liver metastasis · block L2',
  task:'Decision task',taskText:'Is the technically detected ERBB2 variant already a defensible therapeutic target, or must its significance be constrained by protein expression, amplification status and curated evidence?',
  evidence:'Test-gated evidence / original views',variant:'NGS variant viewer · ERBB2 p.L772P · VAF 18.4%',ngs:'Molecular pathology NGS report · VUS',ihc:'HER2 IHC · 1+',fish:'HER2/ERBB2 FISH · non-amplified',curation:'Variant curation & evidence workspace',integrated:'Integrated molecular pathology MTB report',none:'No case-specific premium snapshot is available yet for the selected analyses.',synthetic:'Synthetic training asset · educational only · no real patient data',
  partial:'Partial assessment',full:'Integrated assessment',variantOutcome:'The ERBB2 missense variant c.2314G>T (p.L772P) is technically well supported at VAF 18.4%, but remains classified as a VUS. Analytical reality is not equivalent to clinical actionability.',ihcOutcome:'HER2 IHC is 1+ with weak incomplete membranous staining and no strong overexpression.',fishOutcome:'HER2/ERBB2 FISH shows no amplification (HER2/CEP17 ratio approximately 1.0; mean HER2 copy number approximately 2.1).',curationOutcome:'Curated evidence remains limited or conflicting; there is no established predictive sensitivity to HER2-directed therapy for this variant.',fullOutcome:'Integrated assessment shows a technically real ERBB2 VUS but no strong HER2 protein overexpression, no ERBB2 amplification and no established predictive evidence. Standard HER2-directed treatment must not be derived from this constellation; re-evaluation with new evidence or a clinical-trial context may be reasonable.',directWarn:'Recommending HER2-directed therapy directly from the VUS would be an overcall and is not evidence based in this case.',key:'Key message',keyText:'An oncogene does not make every variant found within it actionable. Technical validity, functional significance, protein/copy-number context and clinical evidence must be assessed separately and only then integrated.'
 },
 ro:{
  opening:'VUS ERBB2 cu solicitare terapeutică',openingText:'Într-un adenocarcinom metastatic în progresie după terapia standard, NGS tumoral a identificat o variantă missense rară ERBB2. Echipa oncologică întreabă dacă rezultatul justifică o terapie anti-HER2.',casefile:'Dosar clinic',referral:'Formular de solicitare pentru patologie moleculară',letter:'Scrisoare oncologică / solicitare MTB',histo:'Histologie / material inițial',histoText:'Metastază FFPE, bloc L2, cu aproximativ 40% conținut tumoral. Materialul este adecvat pentru investigații moleculare și HER2 suplimentare.',he:'HE · metastază hepatică · bloc L2',task:'Sarcina de decizie',taskText:'Este varianta ERBB2 detectată tehnic deja o țintă terapeutică justificată sau trebuie evaluată prin expresia proteică, statusul amplificării și dovezi curate?',evidence:'Dovezi dependente de teste / imagini originale',variant:'Vizualizator NGS · ERBB2 p.L772P · VAF 18,4%',ngs:'Raport NGS molecular · VUS',ihc:'IHC HER2 · 1+',fish:'FISH HER2/ERBB2 · neamplificat',curation:'Spațiu de lucru pentru curarea variantei și dovezi',integrated:'Raport MTB molecular integrat',none:'Pentru analizele selectate nu există încă un snapshot premium specific cazului.',synthetic:'Asset sintetic de instruire · numai educațional · fără date reale de pacient',partial:'Evaluare parțială',full:'Evaluare integrată',variantOutcome:'Varianta missense ERBB2 c.2314G>T (p.L772P) este susținută tehnic, cu VAF 18,4%, dar rămâne clasificată VUS. Realitatea analitică nu înseamnă acționabilitate clinică.',ihcOutcome:'IHC HER2 este 1+, cu colorare membranară slabă și incompletă, fără supraexpresie puternică.',fishOutcome:'FISH HER2/ERBB2 nu arată amplificare.',curationOutcome:'Dovezile curate rămân limitate sau contradictorii; nu există sensibilitate predictivă stabilită la terapii anti-HER2 pentru această variantă.',fullOutcome:'Evaluarea integrată arată o VUS ERBB2 tehnic reală, dar fără supraexpresie HER2 puternică, fără amplificare ERBB2 și fără dovezi predictive validate. Nu trebuie dedusă o terapie anti-HER2 standard; reevaluarea sau un studiu clinic pot fi considerate.',directWarn:'O recomandare directă de terapie anti-HER2 numai pe baza VUS ar reprezenta overcalling.',key:'Mesaj cheie',keyText:'Prezența unei variante într-o oncogenă nu o face automat acționabilă. Validitatea tehnică, funcția, expresia/copy-number și dovezile clinice trebuie evaluate separat și apoi integrate.'
 },
 el:{
  opening:'ERBB2 VUS με θεραπευτικό ερώτημα',openingText:'Σε μεταστατικό αδενοκαρκίνωμα με εξέλιξη μετά από καθιερωμένη θεραπεία, το NGS όγκου ανέδειξε σπάνια missense παραλλαγή του ERBB2. Η ογκολογική ομάδα ρωτά αν δικαιολογείται HER2-στοχευμένη θεραπεία.',casefile:'Κλινικός φάκελος',referral:'Αίτημα μοριακής παθολογίας',letter:'Ογκολογική επιστολή / αίτημα MTB',histo:'Ιστολογία / αρχικό υλικό',histoText:'FFPE μετάσταση, block L2, με περίπου 40% νεοπλασματικό περιεχόμενο. Το υλικό είναι επαρκές για συμπληρωματικό μοριακό και HER2 έλεγχο.',he:'HE · ηπατική μετάσταση · block L2',task:'Εργασία απόφασης',taskText:'Είναι η τεχνικά ανιχνευμένη παραλλαγή ERBB2 ήδη θεραπευτικός στόχος ή απαιτείται συσχέτιση με πρωτεϊνική έκφραση, ενίσχυση και επιμελημένα δεδομένα;',evidence:'Ευρήματα ανά εξέταση / πρωτότυπες προβολές',variant:'NGS variant viewer · ERBB2 p.L772P · VAF 18,4%',ngs:'Μοριακός NGS έλεγχος · VUS',ihc:'HER2 IHC · 1+',fish:'HER2/ERBB2 FISH · χωρίς ενίσχυση',curation:'Variant curation & evidence workspace',integrated:'Ολοκληρωμένη μοριακή γνωμάτευση MTB',none:'Δεν υπάρχει ακόμη ειδικό premium snapshot για τις επιλεγμένες αναλύσεις.',synthetic:'Συνθετικό εκπαιδευτικό asset · χωρίς πραγματικά δεδομένα ασθενούς',partial:'Μερική αξιολόγηση',full:'Ολοκληρωμένη αξιολόγηση',variantOutcome:'Η ERBB2 c.2314G>T (p.L772P) ανιχνεύεται τεχνικά με VAF 18,4%, αλλά παραμένει VUS. Η αναλυτική εγκυρότητα δεν ισοδυναμεί με κλινική actionability.',ihcOutcome:'HER2 IHC 1+ με ασθενή, ατελή μεμβρανική χρώση και χωρίς ισχυρή υπερέκφραση.',fishOutcome:'Η FISH HER2/ERBB2 δεν δείχνει ενίσχυση.',curationOutcome:'Τα επιμελημένα δεδομένα είναι περιορισμένα ή αντιφατικά και δεν τεκμηριώνουν προβλεπτική ευαισθησία σε HER2-στοχευμένη θεραπεία.',fullOutcome:'Η ολοκληρωμένη αξιολόγηση δείχνει τεχνικά πραγματική ERBB2 VUS χωρίς ισχυρή υπερέκφραση HER2, χωρίς ενίσχυση ERBB2 και χωρίς καθιερωμένη προβλεπτική τεκμηρίωση. Δεν πρέπει να προκύψει καθιερωμένη HER2-στοχευμένη θεραπεία· επανεκτίμηση ή κλινική μελέτη είναι δυνατόν να συζητηθούν.',directWarn:'Άμεση σύσταση HER2-στοχευμένης θεραπείας μόνο από τη VUS αποτελεί overcalling.',key:'Κεντρικό μήνυμα',keyText:'Το ότι ένα γονίδιο είναι ογκογονίδιο δεν καθιστά κάθε παραλλαγή actionable. Τεχνική εγκυρότητα, λειτουργική σημασία, πρωτεϊνική έκφραση/copy number και κλινική τεκμηρίωση πρέπει να αξιολογούνται χωριστά και να ολοκληρώνονται στο τέλος.'
 },
 es:{
  opening:'VUS de ERBB2 con consulta terapéutica',openingText:'En un adenocarcinoma metastásico en progresión tras el tratamiento estándar, el NGS tumoral detectó una variante missense rara de ERBB2. El equipo de oncología pregunta si este hallazgo permite indicar tratamiento dirigido a HER2.',casefile:'Historia clínica',referral:'Solicitud de patología molecular',letter:'Carta de oncología / solicitud al comité molecular',histo:'Histología / material de partida',histoText:'Metástasis FFPE, bloque L2, con aproximadamente 40 % de tumor. El material es adecuado para estudios moleculares y HER2 complementarios.',he:'HE · metástasis hepática · bloque L2',task:'Tarea de decisión',taskText:'¿La variante ERBB2 detectada técnicamente constituye ya una diana terapéutica defendible o debe limitarse su significado mediante expresión proteica, amplificación y evidencia curada?',evidence:'Evidencia según pruebas / vistas originales',variant:'Visor NGS · ERBB2 p.L772P · VAF 18,4 %',ngs:'Informe NGS molecular · VUS',ihc:'IHC HER2 · 1+',fish:'FISH HER2/ERBB2 · no amplificado',curation:'Espacio de curación de variante y evidencia',integrated:'Informe molecular integrado del comité',none:'Todavía no hay un snapshot premium específico para las pruebas seleccionadas.',synthetic:'Asset sintético de entrenamiento · solo educativo · sin datos reales de pacientes',partial:'Evaluación parcial',full:'Evaluación integrada',variantOutcome:'La variante ERBB2 c.2314G>T (p.L772P) está técnicamente bien sustentada con VAF 18,4 %, pero sigue clasificada como VUS. Una detección analíticamente real no equivale a actionability clínica.',ihcOutcome:'La IHC de HER2 es 1+, con tinción membranosa débil e incompleta y sin sobreexpresión intensa.',fishOutcome:'La FISH de HER2/ERBB2 no muestra amplificación.',curationOutcome:'La evidencia curada es limitada o contradictoria; no existe sensibilidad predictiva establecida a terapias anti-HER2 para esta variante.',fullOutcome:'La evaluación integrada muestra una VUS de ERBB2 técnicamente real, pero sin sobreexpresión fuerte de HER2, sin amplificación de ERBB2 y sin evidencia predictiva validada. No debe derivarse una terapia estándar anti-HER2; puede considerarse reevaluación futura o un contexto de ensayo clínico.',directWarn:'Recomendar terapia anti-HER2 directamente a partir de la VUS sería una sobreinterpretación.',key:'Mensaje clave',keyText:'Que un gen sea oncogénico no convierte cada variante en actionable. La validez técnica, significado funcional, contexto de proteína/copy-number y evidencia clínica deben evaluarse por separado antes de integrarse.'
 },
 fr:{
  opening:'VUS ERBB2 avec demande thérapeutique',openingText:'Dans un adénocarcinome métastatique en progression après traitement standard, le NGS tumoral a détecté une variante missense rare d’ERBB2. L’équipe d’oncologie demande si ce résultat justifie un traitement ciblant HER2.',casefile:'Dossier clinique',referral:'Demande de pathologie moléculaire',letter:'Courrier oncologique / demande RCP moléculaire',histo:'Histologie / matériel initial',histoText:'Métastase FFPE, bloc L2, avec environ 40 % de cellules tumorales. Le matériel est adéquat pour les analyses moléculaires et HER2 complémentaires.',he:'HE · métastase hépatique · bloc L2',task:'Tâche décisionnelle',taskText:'La variante ERBB2 techniquement détectée constitue-t-elle déjà une cible thérapeutique défendable ou faut-il en limiter la portée par l’expression protéique, le statut d’amplification et une curation des preuves ?',evidence:'Données selon les tests / vues originales',variant:'Variant viewer NGS · ERBB2 p.L772P · VAF 18,4 %',ngs:'Rapport NGS de pathologie moléculaire · VUS',ihc:'IHC HER2 · 1+',fish:'FISH HER2/ERBB2 · non amplifié',curation:'Espace de curation de variant et des preuves',integrated:'Rapport moléculaire intégré de RCP',none:'Aucun snapshot premium spécifique n’est encore disponible pour les analyses sélectionnées.',synthetic:'Asset synthétique de formation · usage éducatif uniquement · aucune donnée réelle de patient',partial:'Évaluation partielle',full:'Évaluation intégrée',variantOutcome:'La variante ERBB2 c.2314G>T (p.L772P) est techniquement bien étayée avec une VAF de 18,4 %, mais reste classée VUS. Une détection analytique réelle n’équivaut pas à une actionnabilité clinique.',ihcOutcome:'L’IHC HER2 est 1+, avec marquage membranaire faible et incomplet, sans forte surexpression.',fishOutcome:'La FISH HER2/ERBB2 ne montre pas d’amplification.',curationOutcome:'Les preuves curées restent limitées ou contradictoires ; aucune sensibilité prédictive établie aux traitements anti-HER2 n’est démontrée pour cette variante.',fullOutcome:'L’évaluation intégrée montre une VUS ERBB2 techniquement réelle, mais sans forte surexpression de HER2, sans amplification d’ERBB2 et sans preuve prédictive établie. Aucun traitement standard ciblant HER2 ne doit être déduit de cette constellation ; une réévaluation ou un essai clinique peuvent être envisagés.',directWarn:'Recommander directement un traitement anti-HER2 à partir de la VUS constituerait une surinterprétation.',key:'Message clé',keyText:'Le fait qu’un gène soit oncogène ne rend pas chaque variant actionable. Validité technique, signification fonctionnelle, contexte protéique/copy-number et preuves cliniques doivent être évalués séparément puis intégrés.'
 }
};
function T(){return COPY[lang()]||COPY.de}

function asset(title,src,cls=''){
  return `<figure class="m3-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="m3-provenance">${esc2(T().synthetic)}</div></figure>`;
}
function two(a,b){return `<div class="m3-grid m3-grid-2">${a}${b}</div>`}
function caseFile(){return `<div class="m3-block"><div class="m3-head"><h4>${esc2(T().casefile)}</h4><span class="m3-pill">CASE FILE</span></div>${two(asset(T().referral,M3_ASSETS.referral,'doc'),asset(T().letter,M3_ASSETS.letter,'doc'))}</div>`}
function histoBlock(){return `<div class="m3-block"><div class="m3-head"><h4>${esc2(T().histo)}</h4><span class="m3-pill ok">FFPE · 40%</span></div><p>${esc2(T().histoText)}</p>${asset(T().he,M3_ASSETS.he)}</div>`}
function decisionBox(){return `<div class="m3-task"><h4>${esc2(T().task)}</h4><p>${esc2(T().taskText)}</p></div>`}

function assayEvidence(){
  const out=[];
  if(hasVariant()){
    out.push(asset(T().variant,M3_ASSETS.variantViewer,'wide'));
    out.push(asset(T().ngs,M3_ASSETS.ngsReport,'wide'));
  }
  if(hasIhc())out.push(asset(T().ihc,M3_ASSETS.ihc));
  if(hasFish())out.push(asset(T().fish,M3_ASSETS.fish));
  if(hasCuration())out.push(asset(T().curation,M3_ASSETS.curation,'wide'));
  if(allCoreDone())out.push(asset(T().integrated,M3_ASSETS.integrated,'wide'));
  if(!out.length)return `<div class="m3-block"><div class="m3-head"><h4>${esc2(T().evidence)}</h4></div><div class="m3-note">${esc2(T().none)}</div></div>`;
  return `<div class="m3-block"><div class="m3-head"><h4>${esc2(T().evidence)}</h4><span class="m3-pill ok">TEST-GATED</span></div><div class="m3-grid m3-grid-results">${out.join('')}</div></div>`;
}
function outcomeText(){
  if(allCoreDone())return T().fullOutcome;
  const parts=[];
  if(hasVariant())parts.push(T().variantOutcome);
  if(hasIhc())parts.push(T().ihcOutcome);
  if(hasFish())parts.push(T().fishOutcome);
  if(hasCuration())parts.push(T().curationOutcome);
  if(hasDirectTherapy())parts.push(T().directWarn);
  return parts.length?parts.join(' '):T().variantOutcome;
}
function integrationBox(){const full=allCoreDone();return `<div class="m3-integration ${full?'full':'partial'}"><h4>${esc2(full?T().full:T().partial)}</h4><p>${esc2(outcomeText())}</p>${hasDirectTherapy()?`<div class="m3-note warn"><b>⚠</b> ${esc2(T().directWarn)}</div>`:''}<div class="m3-key"><b>${esc2(T().key)}:</b> ${esc2(T().keyText)}</div></div>`}

function applyCaseLogic(){
  const c=caseObj();if(!c)return;
  c.required_groups=[
    {id:'variant',label:'ERBB2 variant assessment',tests:['erbb2_variant_ngs','broad_pan_panel'],suggest:'erbb2_variant_ngs'},
    {id:'ihc',label:'HER2 IHC',tests:['her2_ihc'],suggest:'her2_ihc'},
    {id:'fish',label:'HER2/ERBB2 ISH/FISH',tests:['her2_fish'],suggest:'her2_fish'},
    {id:'curation',label:'VUS / evidence curation',tests:['vus_literature_review'],suggest:'vus_literature_review'}
  ];
  c.result_sections=[
    {label:'ERBB2 NGS',test_any:['erbb2_variant_ngs','broad_pan_panel'],result:'ERBB2 c.2314G>T (p.L772P), VAF 18.4%, technically supported; classification: VUS.'},
    {label:'HER2 IHC',test_any:['her2_ihc'],result:'HER2 1+; weak incomplete membranous staining; no strong overexpression.'},
    {label:'HER2/ERBB2 FISH',test_any:['her2_fish'],result:'Not amplified; HER2/CEP17 ratio ~1.0; mean HER2 copy number ~2.1.'},
    {label:'VUS curation',test_any:['vus_literature_review'],result:'Limited/conflicting evidence; no established predictive sensitivity to HER2-directed therapy.'},
    {label:'Potential overcall',test_any:['direct_her2_therapy'],result:'Direct HER2-directed treatment recommendation from this VUS alone is not evidence based.'}
  ];
  c.always_findings=[['QC','FFPE metastasis block L2; tumour content ~40%; NGS variant call technically plausible and material adequate for orthogonal HER2 testing.']];
  c.complete_interpretation=T().fullOutcome;
  c.partial_interpretation=T().keyText;
  c.optimal_summary=T().fullOutcome;
  c.mtb_checks=[
    ['vus','ERBB2 c.2314G>T (p.L772P) explicitly called a VUS despite technically convincing detection'],
    ['ihc','HER2 IHC 1+ correctly integrated; no strong protein overexpression'],
    ['fish','HER2/ERBB2 non-amplification correctly integrated'],
    ['evidence','Curated evidence / predictive significance explicitly assessed'],
    ['noaction','No standard HER2-directed therapy recommended from the VUS alone'],
    ['reassess','Re-evaluation or clinical-trial context mentioned when appropriate'],
    ['bad','Incorrect: ERBB2 oncogene + detected missense variant automatically equals actionable HER2 target']
  ];
  try{
    const h=(c.story||[]).find(x=>x.id==='history');
    if(h&&Array.isArray(h.items)&&h.items[2])h.items[2][1]=M3_VARIANT+', VAF 18.4%, classified as VUS.';
  }catch(_){ }
}

/* Keep completion explicit and stable even if generic case logic changes elsewhere. */
const PREV_MISSING=missingTests;
missingTests=function(){
  if(!active())return PREV_MISSING.apply(this,arguments);
  const miss=[];
  if(!hasVariant())miss.push('erbb2_variant_ngs');
  if(!hasIhc())miss.push('her2_ihc');
  if(!hasFish())miss.push('her2_fish');
  if(!hasCuration())miss.push('vus_literature_review');
  return miss;
};

/* Flagship pre-result pages. Baseline documents and H&E are visible before test selection; assay results remain test-gated. */
const PREV_DEEP_STORY=v17DeepStoryStep;
v17DeepStoryStep=function(id){
  if(!active())return PREV_DEEP_STORY.apply(this,arguments);
  const d=typeof v17Deep==='function'?v17Deep():null;
  const next=typeof v17StepNext==='function'?v17StepNext(id):'';
  const badge=typeof v17DeepBadge==='function'?v17DeepBadge():'';
  const nextBtn=typeof v17NextButton==='function'?v17NextButton(next):'';
  const banner=typeof modeBanner==='function'?modeBanner():'';
  if(id==='intake')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().opening)}</h3></div>${nextBtn}</div>${banner}<div class="m3-opening"><p>${esc2(T().openingText)}</p></div>${typeof v17LearningObjectives==='function'&&d?v17LearningObjectives(d):''}${caseFile()}</section>`;
  if(id==='histo')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().histo)}</h3></div>${nextBtn}</div>${banner}${histoBlock()}</section>`;
  if(id==='material')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().task)}</h3></div>${nextBtn}</div>${banner}${decisionBox()}${(typeof v17ExpectedPathBlock==='function'&&d)?v17ExpectedPathBlock(d):''}</section>`;
  return PREV_DEEP_STORY.apply(this,arguments);
};

/* Method-specific findings: the VUS never becomes actionable merely because it is technically real. */
const PREV_BUILD=buildReport;
buildReport=function(){
  const out=PREV_BUILD.apply(this,arguments);
  if(!active())return out;
  const f=[];
  if(hasVariant())f.push(['ERBB2 NGS','ERBB2 c.2314G>T (p.L772P), VAF 18.4%, technically supported; classification remains VUS.']);
  if(hasIhc())f.push(['HER2 IHC','1+; weak incomplete membranous staining; no strong overexpression.']);
  if(hasFish())f.push(['HER2/ERBB2 FISH','Not amplified; HER2/CEP17 ratio ~1.0; mean HER2 copy number ~2.1.']);
  if(hasCuration())f.push(['Curated evidence','Limited/conflicting evidence; no established predictive sensitivity to HER2-directed therapy for this variant.']);
  if(hasDirectTherapy())f.push(['Interpretive warning','Direct HER2-directed treatment recommendation from this VUS alone would be an overcall.']);
  f.push(['QC','FFPE metastasis block L2; tumour content ~40%; available material and performed assays meet case-specific quality criteria.']);
  out.findings=f;
  out.kind=missingTests().length?'partial':'complete';
  out.interpretation=[out.kind==='complete'?T().fullOutcome:outcomeText()];
  return out;
};

/* Debrief remains interpretation-only to avoid duplicated images. */
const PREV_DEBRIEF=v17DebriefBlock;
v17DebriefBlock=function(d){
  if(!active())return PREV_DEBRIEF.apply(this,arguments);
  if(!(complete()||isInstructor()))return '';
  return `<div class="v17-debrief m3-debrief"><h3>${esc2(T().full)}</h3><p>${esc2(outcomeText())}</p><h4>${esc2(T().key)}</h4><p>${esc2(T().keyText)}</p></div>`;
};

const PREV_DEEP_ADDON=v17DeepReportAddon;
v17DeepReportAddon=function(kind){
  if(!active())return PREV_DEEP_ADDON.apply(this,arguments);
  const d=typeof v17Deep==='function'?v17Deep():null;
  return `<h2>${esc2(T().full)}</h2><p>${esc2(outcomeText())}</p>${d&&d.learning_objectives?`<h2>Learning objectives</h2>${v17List(d.learning_objectives)}`:''}<h2>${esc2(T().key)}</h2><p>${esc2(T().keyText)}</p>`;
};

/* Evidence appears after the simulated laboratory run and only for selected assays. */
const PREV_REPORT=renderReport;
renderReport=function(){
  const html=PREV_REPORT.apply(this,arguments);
  if(!active()||!reportReady())return html;
  return html.replace('</section>',`${assayEvidence()}${integrationBox()}</section>`);
};
const PREV_MTB=renderMtb;
renderMtb=function(){
  const html=PREV_MTB.apply(this,arguments);
  if(!active()||!reportReady())return html;
  return html.replace('</section>',`${assayEvidence()}${integrationBox()}</section>`);
};

function styles(){
  if(document.getElementById('m3FlagshipStyles'))return;
  const st=document.createElement('style');st.id='m3FlagshipStyles';st.textContent=`
  #v20bVersion{font-size:0!important}#v20bVersion::after{content:'v2.4.0z16'!important;font-size:.72rem!important;line-height:1.1}
  .m3-opening{border:1px solid #9dbdd5;border-radius:18px;background:linear-gradient(135deg,#edf7ff,#fff);padding:15px 17px;margin:10px 0 14px;box-shadow:0 8px 22px rgba(15,76,117,.07)}
  .m3-block{border:1px solid var(--line);border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .m3-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.m3-head h4{margin:0;color:var(--primary)}
  .m3-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.69rem;font-weight:900;letter-spacing:.04em}.m3-pill.ok{background:#ecfdf3;color:#067647;border-color:#abefc6}
  .m3-grid{display:grid;gap:12px}.m3-grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}.m3-grid-results{grid-template-columns:repeat(2,minmax(0,1fr))}.m3-grid-results .wide{grid-column:1/-1}
  .m3-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc}.m3-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.m3-asset a{display:block;background:#f2f6f9}.m3-asset img{width:100%;height:auto;display:block;object-fit:contain}.m3-asset.doc img{max-height:820px;object-fit:contain}.m3-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  .m3-note{font-size:.79rem;color:#52677d;margin-top:10px;padding:9px 11px;border-radius:11px;background:#f7fafc;border-left:4px solid #9bc8d7}.m3-note.warn{background:#fff4e5;border-left-color:#f5a623;color:#6b4b22}
  .m3-task{border-left:5px solid #5b5bd6;border-radius:15px;background:#f6f5ff;padding:14px;margin:14px 0}.m3-task h4{margin:0 0 6px;color:#3f3fa8}.m3-task p{margin:0}
  .m3-integration{border-radius:16px;padding:14px;margin:14px 0;border:1px solid #f6c36e;background:#fff8ed}.m3-integration.full{border-color:#abefc6;background:#ecfdf3}.m3-integration h4{margin:0 0 7px;color:#0f4c75}.m3-integration p{margin:0 0 8px}.m3-key{border-top:1px solid rgba(15,76,117,.13);padding-top:8px}.m3-debrief .m3-block{box-shadow:none}
  @media(max-width:1000px){.m3-grid-2,.m3-grid-results{grid-template-columns:1fr}.m3-grid-results .wide{grid-column:auto}.m3-asset.doc img{max-height:none}}
  `;document.head.appendChild(st);
}

const PREV_RENDER=render;
render=function(){applyCaseLogic();const out=PREV_RENDER.apply(this,arguments);stamp();return out};
try{window.render=render}catch(_){ }

function stamp(){
  try{
    window.MOLPATH_APP_VERSION=M3_VERSION;document.title='MolPath Simulator '+M3_VERSION;
    const els=[document.getElementById('v20bVersion'),document.getElementById('versionBadge'),...document.querySelectorAll('.v20b-topstatus .v20b-pill.primary')].filter(Boolean);
    els.forEach(el=>{el.setAttribute('data-i18n-skip','1');if(el.id!=='v20bVersion')el.textContent=M3_VERSION});
  }catch(_){ }
}
const PREV_I18N_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_I18N_AFTER==='function')PREV_I18N_AFTER(l)}catch(_){ }applyCaseLogic();stamp();};

function boot(){styles();applyCaseLogic();stamp();try{if(typeof render==='function')render()}catch(err){console.error(M3_VERSION+' MET_NGS_003 flagship boot failed',err)}setTimeout(stamp,100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);

window.MolPathMETNGS003Flagship=Object.freeze({version:M3_VERSION,base:'v2.4.0z15',caseId:M3_CASE,variant:M3_VARIANT,assetCount:9,baseline:['request form','oncology letter','H&E metastasis'],testGated:{variant:['variant viewer','NGS VUS report'],her2_ihc:['HER2 IHC 1+'],her2_fish:['HER2/ERBB2 FISH non-amplified'],vus_literature_review:['curation workspace'],complete:['integrated MTB report']},completion:['erbb2_variant_ngs|broad_pan_panel','her2_ihc','her2_fish','vus_literature_review'],guardrail:'direct_her2_therapy never creates positive/actionable evidence'});
})();
