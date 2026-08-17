/* MolPath Simulator v2.4.0z18 — MTB_OVAR_002 Premium / Flagship
   Base: v2.4.0z17
   Scope: MTB_OVAR_002_v1_3 only.
   Core rule: a technically real BRCA2 VUS remains a VUS; tumour VAF, germline detection and BRCA gene context do not establish pathogenicity/actionability.
   Removes the legacy fusion-template residue from this case and adds only the approved OVAR_002 assets.
*/
(function(){
'use strict';
const O18_VERSION='v2.4.0z18';
const O18_CASE='MTB_OVAR_002_v1_3';
const O18_VARIANT='BRCA2 NM_000059.4:c.7007G>A, p.(Arg2336His)';
const O18_TP53='TP53 NM_000546.6:c.743G>A, p.(Arg248Gln)';
const O18_BAD=['fusion_rna_ngs','rna_fusion_panel','fusion_fish'];
const O18_ASSETS=Object.freeze({
  referral:'assets/mtb_ovar_002/referral_pink_001.png',
  heOverview:'assets/mtb_ovar_002/he_overview_001.png',
  heZoom:'assets/mtb_ovar_002/he_zoom_001.png',
  ihc:'assets/mtb_ovar_002/ihc_pax8_wt1_p53_p16_001.png',
  tumorNgs:'assets/mtb_ovar_002/tumor_ngs_initial_001.png',
  viewer:'assets/mtb_ovar_002/brca2_variant_viewer_001.png',
  curation:'assets/mtb_ovar_002/vus_curation_workspace_001.png',
  hrd:'assets/mtb_ovar_002/hrd_genomic_scar_negative_001.png',
  germline:'assets/mtb_ovar_002/germline_brca2_vus_001.png',
  final:'assets/mtb_ovar_002/integrated_mtb_final_001.png'
});
window.MolPathOVAR002FlagshipAssets=O18_ASSETS;

function active(){try{return !!activeCase&&activeCase.id===O18_CASE}catch(_){return false}}
function caseObj(){try{return cases.find(c=>c.id===O18_CASE)||null}catch(_){return null}}
function selected(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function currentStep(){try{return state?.step||''}catch(_){return ''}}
function hasTumor(){return selected('tumor_brca_hrr')||selected('broad_pan_panel')}
function hasCuration(){return selected('vusic')}
function hasHrd(){return selected('hrd_score')}
function hasGermline(){return selected('germline_referral')}
function hasLegacyBad(){return O18_BAD.some(selected)}
function allCore(){return hasTumor()&&hasCuration()&&hasHrd()&&hasGermline()}
function finalReady(){try{return !!state?.finalized&&allCore()&&!hasLegacyBad()}catch(_){return false}}
function esc2(v){try{return esc(v==null?'':String(v))}catch(_){return String(v==null?'':v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}}
function lang(){
  try{
    const x=((document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||localStorage.getItem('molpath_language')||document.documentElement.lang||'de').toLowerCase();
    return window.MolPathLanguageRegistry?window.MolPathLanguageRegistry.normalize(x):'de';
  }catch(_){return 'de'}
}
const COPY={
 de:{
  clinical:'Klinisches Eingangsdokument',referral:'Rosa Überweisungsschein · Gyn-Onkologie / Molekularpathologie',histo:'Digitale Histologie / IHC',heOverview:'HE Übersicht · HGSOC',heZoom:'HE Detail · hochgradige Atypie / Mitosen',ihc:'IHC · PAX8 / WT1 / p53 / p16',evidence:'Testabhängige molekulare Evidenz',tumorNgs:'Initialer Tumor-NGS-Befund',viewer:'BRCA2 Variant Viewer · VAF 48,1 % · technisch valide',curation:'VUS-Curation Workspace · Klasse 3',hrd:'HRD / Genomic Scar · Score 30 · negativ',germline:'Keimbahnbefund · dieselbe BRCA2-VUS · heterozygot',finalTitle:'Finale Integration',final:'Integrierter Molekularpathologie-/MTB-Abschlussbericht',synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
  groupTumor:'Tumor-BRCA/HRR',groupVus:'VUS-Evidenzbewertung',groupHrd:'HRD-/PARP-Kontext',groupGermline:'Humangenetik / Keimbahnkontext',
  tumorResult:O18_TP53+', pathogen / Klasse 5; '+O18_VARIANT+', VAF 48,1 %, Coverage 1618x, VUS / Klasse 3; keine gesicherte biallelische BRCA2-Inaktivierung.',
  vusResult:O18_VARIANT+' bleibt nach kuratierter Evidenzbewertung VUS / Klasse 3. Technisch überzeugender Nachweis ist kein Beleg für Pathogenität oder therapeutische Actionability.',
  hrdResult:'Genomic-Scar-/HRD-Score 30 (Cut-off ≥42): HRD-negativ; kein genomischer HRD-Nachweis.',
  germlineResult:O18_VARIANT+' heterozygot in der Keimbahn nachgewiesen; Klassifikation unverändert VUS / Klasse 3. Keimbahnnachweis macht die Variante nicht pathogen.',
  qc:'Tumor-NGS technisch valide; BRCA2-Call mit hoher Coverage und ausgewogener Read-Unterstützung. HRD- und Keimbahnanalysen auswertbar.',
  complete:'Integrierte Bewertung: Kein pathogener oder wahrscheinlich pathogener BRCA1/2-Befund und kein HRD-Nachweis. Die BRCA2-VUS darf trotz Tumor-VAF von 48,1 % und Nachweis in der Keimbahn nicht mit „BRCA-positiv“ oder einer gesicherten therapeutischen BRCA-Indikation gleichgesetzt werden.',
  partial:'Teilbefund: Die BRCA2-Variante bleibt eine VUS. Für eine belastbare Gesamtbewertung müssen Variantenkuratierung, HRD-Kontext und Keimbahnkommunikation getrennt ergänzt und anschließend integriert werden.',
  bad:'Falschaussage: BRCA2-VUS bzw. Keimbahnnachweis automatisch als pathogene, therapeutisch gesicherte BRCA-Alteration werten.'
 },
 en:{
  clinical:'Clinical intake document',referral:'Pink referral form · gyn-oncology / molecular pathology',histo:'Digital histology / IHC',heOverview:'H&E overview · HGSOC',heZoom:'H&E detail · high-grade atypia / mitoses',ihc:'IHC · PAX8 / WT1 / p53 / p16',evidence:'Test-gated molecular evidence',tumorNgs:'Initial tumour NGS report',viewer:'BRCA2 variant viewer · VAF 48.1% · technically valid',curation:'VUS curation workspace · class 3',hrd:'HRD / genomic scar · score 30 · negative',germline:'Germline report · same BRCA2 VUS · heterozygous',finalTitle:'Final integration',final:'Integrated molecular pathology / MTB final report',synthetic:'Synthetic training asset · educational only · no real patient data',
  groupTumor:'Tumour BRCA/HRR',groupVus:'VUS evidence assessment',groupHrd:'HRD / PARP context',groupGermline:'Genetics / germline context',
  tumorResult:O18_TP53+', pathogenic / class 5; '+O18_VARIANT+', VAF 48.1%, coverage 1618x, VUS / class 3; no established biallelic BRCA2 inactivation.',
  vusResult:O18_VARIANT+' remains a VUS / class 3 after curated evidence review. A technically convincing call does not establish pathogenicity or therapeutic actionability.',
  hrdResult:'Genomic-scar / HRD score 30 (cut-off ≥42): HRD-negative; no genomic evidence of HRD.',
  germlineResult:O18_VARIANT+' detected heterozygously in the germline; classification remains VUS / class 3. Germline detection does not make the variant pathogenic.',
  qc:'Tumour NGS technically valid; BRCA2 call has high coverage and balanced read support. HRD and germline analyses are evaluable.',
  complete:'Integrated assessment: no pathogenic or likely pathogenic BRCA1/2 finding and no evidence of HRD. Despite a tumour VAF of 48.1% and germline detection, the BRCA2 VUS must not be equated with “BRCA-positive” disease or an established BRCA-directed therapeutic indication.',
  partial:'Partial assessment: the BRCA2 variant remains a VUS. Variant curation, HRD context and germline communication must be assessed separately and then integrated.',bad:'Incorrect: automatically interpreting a BRCA2 VUS or its germline detection as a pathogenic, therapeutically established BRCA alteration.'
 },
 ro:{
  clinical:'Document clinic de trimitere',referral:'Formular roz de trimitere · gineco-oncologie / patologie moleculară',histo:'Histologie digitală / IHC',heOverview:'HE imagine de ansamblu · HGSOC',heZoom:'HE detaliu · atipii de grad înalt / mitoze',ihc:'IHC · PAX8 / WT1 / p53 / p16',evidence:'Dovezi moleculare dependente de test',tumorNgs:'Raport NGS tumoral inițial',viewer:'Vizualizator BRCA2 · VAF 48,1% · valid tehnic',curation:'Spațiu de curare VUS · clasa 3',hrd:'HRD / genomic scar · scor 30 · negativ',germline:'Raport germinal · aceeași VUS BRCA2 · heterozigotă',finalTitle:'Integrare finală',final:'Raport molecular integrat / raport final MTB',synthetic:'Asset sintetic de instruire · numai educațional · fără date reale de pacient',
  groupTumor:'BRCA/HRR tumoral',groupVus:'Evaluarea dovezilor VUS',groupHrd:'Context HRD / PARP',groupGermline:'Genetică / context germinal',
  tumorResult:O18_TP53+', patogenă / clasa 5; '+O18_VARIANT+', VAF 48,1%, acoperire 1618x, VUS / clasa 3; fără inactivare bialelică BRCA2 demonstrată.',vusResult:O18_VARIANT+' rămâne VUS / clasa 3 după evaluarea dovezilor. Un apel tehnic convingător nu demonstrează patogenitatea sau acționabilitatea terapeutică.',hrdResult:'Scor genomic-scar / HRD 30 (prag ≥42): HRD-negativ; fără dovadă genomică de HRD.',germlineResult:O18_VARIANT+' detectată heterozigot în linia germinală; clasificarea rămâne VUS / clasa 3. Detectarea germinală nu o face patogenă.',qc:'NGS tumoral valid tehnic; apel BRCA2 cu acoperire mare și suport echilibrat. Analizele HRD și germinale sunt evaluabile.',complete:'Evaluare integrată: fără variantă BRCA1/2 patogenă/probabil patogenă și fără dovadă de HRD. VUS BRCA2 nu trebuie echivalată cu „BRCA-pozitiv” sau cu o indicație terapeutică BRCA demonstrată.',partial:'Evaluare parțială: varianta BRCA2 rămâne VUS. Curarea variantei, contextul HRD și comunicarea germinală trebuie evaluate separat și apoi integrate.',bad:'Incorect: VUS BRCA2 sau detectarea germinală nu înseamnă automat o alterare BRCA patogenă și terapeutic stabilită.'
 },
 el:{
  clinical:'Κλινικό έγγραφο παραπομπής',referral:'Ροζ παραπεμπτικό · γυναικολογική ογκολογία / μοριακή παθολογία',histo:'Ψηφιακή ιστολογία / IHC',heOverview:'HE επισκόπηση · HGSOC',heZoom:'HE λεπτομέρεια · υψηλόβαθμη ατυπία / μιτώσεις',ihc:'IHC · PAX8 / WT1 / p53 / p16',evidence:'Μοριακά ευρήματα ανά εξέταση',tumorNgs:'Αρχική αναφορά NGS όγκου',viewer:'BRCA2 variant viewer · VAF 48,1% · τεχνικά έγκυρο',curation:'Χώρος επιμέλειας VUS · κλάση 3',hrd:'HRD / genomic scar · score 30 · αρνητικό',germline:'Αναφορά βλαστικής σειράς · ίδια BRCA2 VUS · ετερόζυγη',finalTitle:'Τελική ολοκλήρωση',final:'Ολοκληρωμένη μοριακή αναφορά / τελικό MTB',synthetic:'Συνθετικό εκπαιδευτικό asset · μόνο για εκπαίδευση · χωρίς πραγματικά δεδομένα ασθενών',
  groupTumor:'BRCA/HRR όγκου',groupVus:'Αξιολόγηση τεκμηρίων VUS',groupHrd:'Πλαίσιο HRD / PARP',groupGermline:'Γενετική / βλαστική σειρά',tumorResult:O18_TP53+', παθογόνος / κλάση 5· '+O18_VARIANT+', VAF 48,1%, κάλυψη 1618x, VUS / κλάση 3· χωρίς τεκμηριωμένη διαλληλική αδρανοποίηση BRCA2.',vusResult:O18_VARIANT+' παραμένει VUS / κλάση 3 μετά από επιμέλεια τεκμηρίων. Η τεχνικά πειστική ανίχνευση δεν αποδεικνύει παθογένεια ή θεραπευτική αξιοποιησιμότητα.',hrdResult:'Genomic-scar / HRD score 30 (όριο ≥42): HRD-αρνητικό· χωρίς γονιδιωματική ένδειξη HRD.',germlineResult:O18_VARIANT+' ανιχνεύεται ετερόζυγα στη βλαστική σειρά· παραμένει VUS / κλάση 3. Η ανίχνευση στη βλαστική σειρά δεν την καθιστά παθογόνο.',qc:'Το NGS όγκου είναι τεχνικά έγκυρο· υψηλή κάλυψη και ισορροπημένη υποστήριξη της BRCA2. Οι αναλύσεις HRD και βλαστικής σειράς είναι αξιολογήσιμες.',complete:'Ολοκληρωμένη αξιολόγηση: δεν ανιχνεύεται παθογόνος/πιθανώς παθογόνος BRCA1/2 ούτε HRD. Η BRCA2 VUS δεν πρέπει να εξισώνεται με «BRCA-positive» ή τεκμηριωμένη θεραπευτική ένδειξη BRCA.',partial:'Μερική αξιολόγηση: η BRCA2 παραμένει VUS. Απαιτούνται ξεχωριστή επιμέλεια παραλλαγής, πλαίσιο HRD και επικοινωνία βλαστικής σειράς πριν την ολοκλήρωση.',bad:'Λάθος: BRCA2 VUS ή ανίχνευση στη βλαστική σειρά δεν σημαίνει αυτόματα παθογόνο, θεραπευτικά τεκμηριωμένη αλλοίωση BRCA.'
 },
 es:{
  clinical:'Documento clínico de entrada',referral:'Volante rosa · ginecología oncológica / patología molecular',histo:'Histología digital / IHQ',heOverview:'HE panorámica · HGSOC',heZoom:'HE detalle · atipia de alto grado / mitosis',ihc:'IHQ · PAX8 / WT1 / p53 / p16',evidence:'Evidencia molecular dependiente de las pruebas',tumorNgs:'Informe inicial de NGS tumoral',viewer:'Visor BRCA2 · VAF 48,1% · técnicamente válido',curation:'Espacio de curación VUS · clase 3',hrd:'HRD / genomic scar · puntuación 30 · negativo',germline:'Informe germinal · misma VUS BRCA2 · heterocigota',finalTitle:'Integración final',final:'Informe molecular integrado / informe final MTB',synthetic:'Asset sintético de entrenamiento · solo educativo · sin datos reales de pacientes',
  groupTumor:'BRCA/HRR tumoral',groupVus:'Evaluación de evidencia VUS',groupHrd:'Contexto HRD / PARP',groupGermline:'Genética / contexto germinal',tumorResult:O18_TP53+', patogénica / clase 5; '+O18_VARIANT+', VAF 48,1%, cobertura 1618x, VUS / clase 3; sin inactivación bialélica BRCA2 demostrada.',vusResult:O18_VARIANT+' permanece VUS / clase 3 tras la curación de evidencia. Una llamada técnicamente convincente no demuestra patogenicidad ni accionabilidad terapéutica.',hrdResult:'Puntuación genomic-scar / HRD 30 (corte ≥42): HRD-negativo; sin evidencia genómica de HRD.',germlineResult:O18_VARIANT+' detectada heterocigota en línea germinal; clasificación sin cambios, VUS / clase 3. La detección germinal no la convierte en patogénica.',qc:'NGS tumoral técnicamente válido; llamada BRCA2 con alta cobertura y soporte equilibrado. HRD y estudio germinal evaluables.',complete:'Evaluación integrada: no hay hallazgo BRCA1/2 patogénico/probablemente patogénico ni evidencia de HRD. La VUS BRCA2 no debe equipararse a «BRCA-positivo» ni a una indicación terapéutica BRCA establecida.',partial:'Evaluación parcial: la variante BRCA2 sigue siendo VUS. La curación, el contexto HRD y la comunicación germinal deben evaluarse por separado y después integrarse.',bad:'Incorrecto: una VUS BRCA2 o su detección germinal no equivale automáticamente a una alteración BRCA patogénica y terapéuticamente establecida.'
 },
 fr:{
  clinical:'Document clinique initial',referral:'Bon rose de demande · oncologie gynécologique / pathologie moléculaire',histo:'Histologie numérique / IHC',heOverview:'HE vue d’ensemble · HGSOC',heZoom:'HE détail · atypies de haut grade / mitoses',ihc:'IHC · PAX8 / WT1 / p53 / p16',evidence:'Données moléculaires dépendantes des tests',tumorNgs:'Rapport NGS tumoral initial',viewer:'Variant viewer BRCA2 · VAF 48,1 % · techniquement valide',curation:'Espace de curation VUS · classe 3',hrd:'HRD / genomic scar · score 30 · négatif',germline:'Rapport constitutionnel · même VUS BRCA2 · hétérozygote',finalTitle:'Intégration finale',final:'Rapport moléculaire intégré / rapport final RCP',synthetic:'Asset synthétique de formation · usage éducatif uniquement · aucune donnée réelle de patient',
  groupTumor:'BRCA/HRR tumoral',groupVus:'Évaluation des preuves VUS',groupHrd:'Contexte HRD / PARP',groupGermline:'Génétique / contexte constitutionnel',tumorResult:O18_TP53+', pathogène / classe 5 ; '+O18_VARIANT+', VAF 48,1 %, couverture 1618x, VUS / classe 3 ; aucune inactivation biallélique BRCA2 démontrée.',vusResult:O18_VARIANT+' reste une VUS / classe 3 après curation des preuves. Une détection techniquement convaincante ne démontre ni la pathogénicité ni l’actionnabilité thérapeutique.',hrdResult:'Score genomic-scar / HRD 30 (seuil ≥42) : HRD négatif ; aucune preuve génomique de HRD.',germlineResult:O18_VARIANT+' détectée à l’état hétérozygote dans la lignée germinale ; classification inchangée, VUS / classe 3. La détection constitutionnelle ne la rend pas pathogène.',qc:'NGS tumoral techniquement valide ; appel BRCA2 à forte couverture et support équilibré. Analyses HRD et constitutionnelle interprétables.',complete:'Évaluation intégrée : aucun variant BRCA1/2 pathogène/probablement pathogène et aucune preuve de HRD. La VUS BRCA2 ne doit pas être assimilée à un statut « BRCA positif » ni à une indication thérapeutique BRCA établie.',partial:'Évaluation partielle : le variant BRCA2 reste une VUS. Curation, contexte HRD et communication constitutionnelle doivent être évalués séparément puis intégrés.',bad:'Incorrect : une VUS BRCA2 ou sa détection constitutionnelle ne constitue pas automatiquement une altération BRCA pathogène et thérapeutiquement établie.'
 }
};
function T(){return COPY[lang()]||COPY.de}

function asset(title,src,cls=''){
  return `<figure class="o18-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="o18-prov">${esc2(T().synthetic)}</div></figure>`;
}
function block(title,body,badge='FLAGSHIP'){
  return `<div class="o18-block"><div class="o18-head"><h4>${esc2(title)}</h4><span class="o18-pill">${esc2(badge)}</span></div>${body}</div>`;
}
function grid(items,wide=false){return `<div class="o18-grid ${wide?'single':''}">${items.join('')}</div>`}
function baselineAddon(step){
  if(step==='intake')return block(T().clinical,grid([asset(T().referral,O18_ASSETS.referral,'doc')],true),'CASE FILE');
  if(step==='histo')return block(T().histo,grid([asset(T().heOverview,O18_ASSETS.heOverview),asset(T().heZoom,O18_ASSETS.heZoom),asset(T().ihc,O18_ASSETS.ihc,'wide')]),'HISTOLOGY');
  return '';
}
function reportAddon(){
  const items=[];
  if(hasTumor()){items.push(asset(T().tumorNgs,O18_ASSETS.tumorNgs,'wide'));items.push(asset(T().viewer,O18_ASSETS.viewer,'wide'));}
  if(hasCuration())items.push(asset(T().curation,O18_ASSETS.curation,'wide'));
  if(hasHrd())items.push(asset(T().hrd,O18_ASSETS.hrd,'wide'));
  if(hasGermline())items.push(asset(T().germline,O18_ASSETS.germline,'wide'));
  return items.length?block(T().evidence,grid(items,true),'TEST-GATED'):'';
}
function finalAddon(){return finalReady()?block(T().finalTitle,grid([asset(T().final,O18_ASSETS.final,'wide')],true),'FINAL MTB'):''}
function injectBeforeSectionEnd(html,addon){
  if(!addon||typeof html!=='string')return html;
  const pos=html.lastIndexOf('</section>');
  return pos>=0?html.slice(0,pos)+addon+html.slice(pos):html+addon;
}
function normalizeVariant(html){
  if(typeof html!=='string')return html;
  return html.split('BRCA2 c.X p.Y').join(O18_VARIANT);
}
function deepReplace(v){
  if(typeof v==='string')return v.split('BRCA2 c.X p.Y').join(O18_VARIANT);
  if(Array.isArray(v)){for(let i=0;i<v.length;i++)v[i]=deepReplace(v[i]);return v}
  if(v&&typeof v==='object'){Object.keys(v).forEach(k=>{v[k]=deepReplace(v[k])});return v}
  return v;
}

function applyCaseLogic(){
  const c=caseObj();if(!c)return;
  const t=T();
  c.allowed_tests=['he_review','tumor_brca_hrr','broad_pan_panel','hrd_score','germline_referral','vusic'];
  c.bad_tests=O18_BAD.slice();
  c.required_groups=[
    {id:'brca_hrr',label:t.groupTumor,tests:['tumor_brca_hrr','broad_pan_panel'],suggest:'tumor_brca_hrr'},
    {id:'vus',label:t.groupVus,tests:['vusic'],suggest:'vusic'},
    {id:'hrd',label:t.groupHrd,tests:['hrd_score'],suggest:'hrd_score'},
    {id:'germline',label:t.groupGermline,tests:['germline_referral'],suggest:'germline_referral'}
  ];
  c.result_sections=[
    {label:t.groupTumor,test_any:['tumor_brca_hrr','broad_pan_panel'],result:t.tumorResult},
    {label:t.groupVus,test_any:['vusic'],result:t.vusResult},
    {label:t.groupHrd,test_any:['hrd_score'],result:t.hrdResult},
    {label:t.groupGermline,test_any:['germline_referral'],result:t.germlineResult}
  ];
  c.always_findings=[['QC',t.qc]];
  c.complete_interpretation=t.complete;
  c.partial_interpretation=t.partial;
  c.optimal_summary=t.complete;
  c.mtb_checks=[
    ['brca_hrr',t.groupTumor+' korrekt integriert'],
    ['vus',t.groupVus+' ohne Overcalling'],
    ['hrd',t.groupHrd+' separat bewertet'],
    ['germline',t.groupGermline+' separat kommuniziert'],
    ['limits','VUS- und HRD-Aussagegrenzen klar benannt'],
    ['bad',t.bad]
  ];
  try{if(c.deep_dive)deepReplace(c.deep_dive)}catch(_){ }
  try{if(typeof DEEP_DIVE_CASES_V17!=='undefined'&&DEEP_DIVE_CASES_V17&&DEEP_DIVE_CASES_V17[O18_CASE])deepReplace(DEEP_DIVE_CASES_V17[O18_CASE])}catch(_){ }
}

/* Case-local completion: four independent evidence layers. The old fusion template can never complete this case. */
const PREV_MISSING=missingTests;
missingTests=function(){
  if(!active())return PREV_MISSING.apply(this,arguments);
  const miss=[];
  if(!hasTumor())miss.push('tumor_brca_hrr');
  if(!hasCuration())miss.push('vusic');
  if(!hasHrd())miss.push('hrd_score');
  if(!hasGermline())miss.push('germline_referral');
  return miss;
};

/* Baseline assets: intake + histology only. */
const PREV_CONTENT=renderContent;
renderContent=function(){
  applyCaseLogic();
  let html=PREV_CONTENT.apply(this,arguments);
  if(!active())return html;
  html=normalizeVariant(html);
  return injectBeforeSectionEnd(html,baselineAddon(currentStep()));
};
try{window.renderContent=renderContent}catch(_){ }

/* Exact case findings and interpretation. */
const PREV_BUILD=buildReport;
buildReport=function(){
  applyCaseLogic();
  const out=PREV_BUILD.apply(this,arguments);
  if(!active())return out;
  const t=T(),f=[];
  if(hasTumor())f.push([t.groupTumor,t.tumorResult]);
  if(hasCuration())f.push([t.groupVus,t.vusResult]);
  if(hasHrd())f.push([t.groupHrd,t.hrdResult]);
  if(hasGermline())f.push([t.groupGermline,t.germlineResult]);
  f.push(['QC',t.qc]);
  if(hasLegacyBad())f.push(['Guardrail','Legacy fusion tests are not part of MTB_OVAR_002 and do not generate case evidence.']);
  out.findings=f;
  out.kind=missingTests().length?'partial':'complete';
  out.interpretation=[out.kind==='complete'?t.complete:t.partial];
  return out;
};

/* Molecular assets appear only after their respective tests have been selected and reported. */
const PREV_REPORT=renderReport;
renderReport=function(){
  applyCaseLogic();
  let html=PREV_REPORT.apply(this,arguments);
  if(!active())return html;
  html=normalizeVariant(html);
  return injectBeforeSectionEnd(html,reportAddon());
};
try{window.renderReport=renderReport}catch(_){ }

/* Integrated report appears only after true finalization of the complete, non-legacy path. */
const PREV_MTB=renderMtb;
renderMtb=function(){
  applyCaseLogic();
  let html=PREV_MTB.apply(this,arguments);
  if(!active())return html;
  html=normalizeVariant(html);
  return injectBeforeSectionEnd(html,finalAddon());
};
try{window.renderMtb=renderMtb}catch(_){ }

function styles(){
  if(document.getElementById('o18FlagshipStyles'))return;
  const s=document.createElement('style');s.id='o18FlagshipStyles';s.textContent=`
  #v20bVersion{font-size:0!important}#v20bVersion::after{content:'v2.4.0z18'!important;font-size:.72rem!important;line-height:1.1}
  .o18-block{border:1px solid var(--line,#d7e2ea);border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .o18-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.o18-head h4{margin:0;color:var(--primary,#0f4c75)}
  .o18-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.69rem;font-weight:900;letter-spacing:.04em}
  .o18-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.o18-grid.single{grid-template-columns:1fr}.o18-grid .wide{grid-column:1/-1}
  .o18-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc}.o18-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.o18-asset a{display:block;background:#f2f6f9}.o18-asset img{width:100%;height:auto;display:block;object-fit:contain}.o18-asset.doc img{max-height:900px;object-fit:contain}.o18-prov{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  @media(max-width:1000px){.o18-grid{grid-template-columns:1fr}.o18-grid .wide{grid-column:auto}.o18-asset.doc img{max-height:none}}
  `;document.head.appendChild(s);
}
function stamp(){
  try{
    window.MOLPATH_APP_VERSION=O18_VERSION;document.title='MolPath Simulator '+O18_VERSION;
    const els=[document.getElementById('v20bVersion'),document.getElementById('versionBadge'),...document.querySelectorAll('.v20b-topstatus .v20b-pill.primary')].filter(Boolean);
    els.forEach(el=>{el.setAttribute('data-i18n-skip','1');if(el.id!=='v20bVersion')el.textContent=O18_VERSION});
  }catch(_){ }
}
const PREV_RENDER=render;
render=function(){applyCaseLogic();const out=PREV_RENDER.apply(this,arguments);stamp();return out};
try{window.render=render}catch(_){ }
const PREV_I18N_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_I18N_AFTER==='function')PREV_I18N_AFTER(l)}catch(_){ }applyCaseLogic();stamp();};
function boot(){styles();applyCaseLogic();stamp();try{if(typeof render==='function')render()}catch(err){console.error(O18_VERSION+' OVAR_002 flagship boot failed',err)}setTimeout(stamp,100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);

window.MolPathOVAR002Flagship=Object.freeze({
  version:O18_VERSION,base:'v2.4.0z17',caseId:O18_CASE,variant:O18_VARIANT,assetCount:10,
  baseline:{intake:['pink referral form'],histo:['H&E overview','H&E zoom','PAX8/WT1/p53/p16 IHC']},
  testGated:{tumor_brca_hrr_or_broad:['initial tumour NGS report','BRCA2 variant viewer'],vusic:['VUS curation workspace'],hrd_score:['HRD negative report'],germline_referral:['germline VUS report'],finalized_complete:['integrated MTB final report']},
  completion:['tumor_brca_hrr|broad_pan_panel','vusic','hrd_score','germline_referral'],
  rejectedAssets:['CRC/BRAF qPCR misgeneration','MMR/PMS2 misgeneration','wrong BRCA2 c.7007A>G p.Asn2336Ser germline report','non-integrated final attempts'],
  guardrail:'legacy fusion tests are removed from allowed/required logic and can never reveal later or final OVAR_002 evidence'
});
})();
