/* MolPath Simulator v2.4.0z15 — MTB_NSCLC_002 Premium / Flagship
   Base: v2.4.0z14a
   Scope: MTB_NSCLC_002 only. Progressive evidence for EGFR-TKI resistance after a non-informative negative liquid biopsy.
   Core rule: negative plasma NGS with ctDNA <0.2% is not a secure exclusion; tissue evidence is revealed only after rebiopsy and the corresponding assay.
*/
(function(){
'use strict';
const NS2_VERSION='v2.4.0z15';
const NS2_CASE='MTB_NSCLC_002_v1_3';
const NS2_ASSETS=Object.freeze({
  letter:'assets/mtb_nsclc_002/oncology_letter_001.png',
  ct:'assets/mtb_nsclc_002/ct_progression_001.png',
  liquid:'assets/mtb_nsclc_002/liquid_biopsy_external_001.png',
  heOverview:'assets/mtb_nsclc_002/rebiopsy_he_overview_001.png',
  heZoom:'assets/mtb_nsclc_002/rebiopsy_he_zoom_001.png',
  tissueNgs:'assets/mtb_nsclc_002/tissue_resistance_ngs_report_001.png',
  metCnv:'assets/mtb_nsclc_002/met_cnv_viewer_001.png',
  egfrTargeted:'assets/mtb_nsclc_002/egfr_targeted_resistance_001.png',
  integratedNgs:'assets/mtb_nsclc_002/tissue_ngs_integrated_001.png'
});
window.MolPathNSCLC002FlagshipAssets=NS2_ASSETS;

function active(){try{return !!activeCase&&activeCase.id===NS2_CASE}catch(_){return false}}
function caseObj(){try{return cases.find(c=>c.id===NS2_CASE)||null}catch(_){return null}}
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
function hasTissue(){return selected('rebiopsy_tissue')}
function hasBroadResistance(){return hasTissue()&&selected('resistance_panel')}
function hasTargetedEgfr(){return hasTissue()&&selected('egfr_t790m_c797s')}
function allCoreDone(){return hasBroadResistance()}

const COPY={
 de:{
  opening:'Progress unter Osimertinib',openingText:'64-jähriger Patient mit metastasiertem EGFR-mutiertem Lungenadenokarzinom. Nach initial gutem Ansprechen auf Osimertinib zeigt sich nach 14 Monaten ein deutlicher radiologischer Progress mit Wachstum der Primärläsion und neuen Lebermetastasen.',
  docs:'Klinische Fallakte',letter:'Onkologischer Arztbrief / MTB-Anforderung',context:'Progressionskontext / vorhandene Evidenz',ct:'CT Thorax/Abdomen · Progression',liquid:'Externe Liquid Biopsy · Plasma-NGS',liquidNote:'Der Plasma-Befund ist negativ, weist aber eine sehr niedrige ctDNA-Fraktion von <0,2 % aus. Damit ist das Ergebnis potenziell nicht-informativ und kein sicherer Ausschluss eines Resistenzmechanismus.',
  material:'Material / Rebiopsie-Option',materialText:'Eine neue Lebermetastase ist interventionell gut erreichbar. Die Rebiopsie ist invasiv, aber technisch realistisch und kann sowohl eine histologische Transformation prüfen als auch verwertbares Gewebe für eine breite Resistenzdiagnostik liefern.',task:'Decision Task',taskText:'Reicht die negative Liquid Biopsy aus – oder sollte die progrediente Lebermetastase rebiopsiert und mit einer biologisch breiten Resistenzdiagnostik untersucht werden?',
  evidence:'Progressive Evidenz / Originalansichten',heOverview:'HE Rebiopsie · Lebermetastase · Übersicht',heZoom:'HE Rebiopsie · Adenokarzinom · Zoom',targeted:'Gezielte EGFR-Resistenzanalyse · T790M/C797S',tissueNgs:'Gewebe-Resistenzpanel · NGS/CNV',metCnv:'MET-Copy-Number-Viewer · 7q31.2',integrated:'Integrierter Gewebe-NGS-Befund',noSpecific:'Für die bislang gewählten Schritte liegt noch kein postanalytischer Premium-Snapshot vor.',synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
  integration:'Flagship Integration',fullOutcome:'Die Rebiopsie bestätigt weiterhin ein Adenokarzinom ohne kleinzellige Transformation. Im Gewebe bleibt die EGFR-Exon-19-Deletion nachweisbar; zusätzlich zeigt die breite NGS/CNV-Analyse eine hochgradige MET-Amplifikation (geschätzte Kopienzahl ~10). Die vorherige negative Liquid Biopsy war bei ctDNA <0,2 % nicht ausreichend aussagekräftig.',targetedOutcome:'Die Gewebe-Rebiopsie ist diagnostisch verwertbar. Die gezielte EGFR-Analyse bestätigt die bekannte Exon-19-Deletion, findet jedoch weder T790M noch C797S. Da MET/CNV und andere Bypass-Mechanismen mit diesem engen Ansatz nicht ausreichend untersucht werden, bleibt die Resistenzursache unvollständig geklärt.',rebiopsyOutcome:'Die Rebiopsie liefert vitales metastatisches Adenokarzinom und keinen Hinweis auf kleinzellige Transformation. Für die molekulare Resistenzursache fehlt jedoch noch eine breite Gewebeanalyse.',partialOutcome:'Die negative Liquid Biopsy darf wegen der extrem niedrigen ctDNA-Fraktion nicht als sicherer molekularer Ausschluss gewertet werden. Ohne verwertbare Rebiopsie plus breite Resistenzdiagnostik bleibt die Kernfrage offen.',
  key:'Kernaussage',keyText:'Ein negatives Plasma-NGS ist nur so belastbar wie sein biologischer und analytischer Kontext. Bei Progress unter EGFR-TKI, sehr niedriger ctDNA und erreichbarer Läsion ist Gewebe entscheidend – und die Resistenzdiagnostik muss sekundäre EGFR-Veränderungen, Bypass/CNV-Mechanismen und histologische Transformation abdecken.'
 },
 en:{
  opening:'Progression on osimertinib',openingText:'64-year-old man with metastatic EGFR-mutant lung adenocarcinoma. After an initially good response to osimertinib, marked radiologic progression develops after 14 months, with growth of the primary lesion and new liver metastases.',
  docs:'Clinical case file',letter:'Oncology letter / MTB request',context:'Progression context / available evidence',ct:'CT chest/abdomen · progression',liquid:'External liquid biopsy · plasma NGS',liquidNote:'The plasma report is negative but shows an extremely low ctDNA fraction of <0.2%. The result is therefore potentially non-informative and does not securely exclude a resistance mechanism.',
  material:'Material / rebiopsy option',materialText:'A new liver metastasis is readily accessible for image-guided biopsy. Rebiopsy is invasive but technically feasible and can assess histologic transformation while providing tissue for broad resistance profiling.',task:'Decision task',taskText:'Is the negative liquid biopsy sufficient, or should the progressing liver metastasis be rebiopsied and assessed with biologically broad resistance diagnostics?',
  evidence:'Progressive evidence / original views',heOverview:'H&E rebiopsy · liver metastasis · overview',heZoom:'H&E rebiopsy · adenocarcinoma · zoom',targeted:'Targeted EGFR resistance analysis · T790M/C797S',tissueNgs:'Tissue resistance panel · NGS/CNV',metCnv:'MET copy-number viewer · 7q31.2',integrated:'Integrated tissue NGS report',noSpecific:'No post-analytical premium snapshot is available yet for the selected steps.',synthetic:'Synthetic training asset · educational only · no real patient data',
  integration:'Flagship integration',fullOutcome:'Rebiopsy confirms persistent adenocarcinoma without small-cell transformation. The EGFR exon 19 deletion remains detectable in tissue, and broad NGS/CNV identifies a high-level MET amplification (estimated copy number ~10). The preceding negative liquid biopsy was not sufficiently informative at ctDNA <0.2%.',targetedOutcome:'The tissue rebiopsy is diagnostically adequate. Targeted EGFR testing confirms the known exon 19 deletion but detects neither T790M nor C797S. Because MET/CNV and other bypass mechanisms are not adequately assessed by this narrow strategy, the resistance cause remains incompletely resolved.',rebiopsyOutcome:'Rebiopsy provides viable metastatic adenocarcinoma and shows no small-cell transformation, but broad molecular resistance testing is still missing.',partialOutcome:'The negative liquid biopsy must not be treated as a secure molecular exclusion because the ctDNA fraction is extremely low. Without an informative rebiopsy plus broad resistance diagnostics, the core question remains unresolved.',
  key:'Key message',keyText:'A negative plasma NGS result is only as reliable as its biological and analytical context. With EGFR-TKI progression, very low ctDNA and an accessible lesion, tissue is decisive—and resistance testing must cover secondary EGFR changes, bypass/CNV mechanisms and histologic transformation.'
 },
 ro:{
  opening:'Progresie sub osimertinib',openingText:'Bărbat de 64 de ani cu adenocarcinom pulmonar metastatic cu mutație EGFR. După un răspuns inițial bun la osimertinib, după 14 luni apare progresie radiologică clară, cu creșterea leziunii primare și metastaze hepatice noi.',
  docs:'Dosar clinic',letter:'Scrisoare oncologică / solicitare MTB',context:'Contextul progresiei / dovezi disponibile',ct:'CT torace/abdomen · progresie',liquid:'Biopsie lichidă externă · NGS plasmatic',liquidNote:'Raportul plasmatic este negativ, dar fracția ctDNA este extrem de mică, <0,2%. Rezultatul poate fi neinformativ și nu exclude sigur un mecanism de rezistență.',
  material:'Material / opțiune de rebiopsie',materialText:'O metastază hepatică nouă este ușor accesibilă intervențional. Rebiopsia poate verifica transformarea histologică și poate furniza țesut pentru o analiză largă a rezistenței.',task:'Sarcina de decizie',taskText:'Este suficientă biopsia lichidă negativă sau trebuie rebiopsiată metastaza hepatică progresivă și investigată printr-o analiză largă a rezistenței?',
  evidence:'Dovezi progresive / vizualizări originale',heOverview:'HE rebiopsie · metastază hepatică · ansamblu',heZoom:'HE rebiopsie · adenocarcinom · mărire',targeted:'Analiză țintită a rezistenței EGFR · T790M/C797S',tissueNgs:'Panel de rezistență pe țesut · NGS/CNV',metCnv:'Vizualizare număr de copii MET · 7q31.2',integrated:'Raport NGS integrat pe țesut',noSpecific:'Nu există încă un snapshot premium post-analitic pentru pașii selectați.',synthetic:'Asset sintetic de instruire · doar educațional · fără date reale ale pacienților',
  integration:'Integrare flagship',fullOutcome:'Rebiopsia confirmă adenocarcinom persistent fără transformare microcelulară. Deleția EGFR exon 19 rămâne detectabilă, iar NGS/CNV larg identifică o amplificare MET de grad înalt (număr estimat de copii ~10). Biopsia lichidă negativă anterioară nu a fost suficient de informativă la ctDNA <0,2%.',targetedOutcome:'Rebiopsia este adecvată, iar analiza EGFR țintită confirmă deleția exonului 19, fără T790M sau C797S. MET/CNV și alte mecanisme bypass nu sunt evaluate suficient, astfel cauza rezistenței rămâne incomplet clarificată.',rebiopsyOutcome:'Rebiopsia furnizează adenocarcinom metastatic viabil și nu arată transformare microcelulară, dar lipsește încă analiza moleculară largă a rezistenței.',partialOutcome:'Biopsia lichidă negativă nu poate fi interpretată ca excludere sigură din cauza fracției ctDNA extrem de mici. Fără rebiopsie informativă și diagnostic larg al rezistenței, întrebarea centrală rămâne deschisă.',key:'Mesaj-cheie',keyText:'Un NGS plasmatic negativ depinde de contextul biologic și analitic. La progresie sub EGFR-TKI, ctDNA foarte mic și leziune accesibilă, țesutul este decisiv, iar analiza trebuie să acopere modificări EGFR secundare, mecanisme bypass/CNV și transformarea histologică.'
 },
 el:{
  opening:'Πρόοδος υπό osimertinib',openingText:'Άνδρας 64 ετών με μεταστατικό αδενοκαρκίνωμα πνεύμονα με μετάλλαξη EGFR. Μετά από αρχικά καλή ανταπόκριση στο osimertinib, στους 14 μήνες εμφανίζεται σαφής ακτινολογική πρόοδος με αύξηση της πρωτοπαθούς βλάβης και νέες ηπατικές μεταστάσεις.',
  docs:'Κλινικός φάκελος',letter:'Ογκολογική επιστολή / αίτημα MTB',context:'Πλαίσιο προόδου / διαθέσιμα δεδομένα',ct:'CT θώρακος/κοιλίας · πρόοδος',liquid:'Εξωτερική υγρή βιοψία · plasma NGS',liquidNote:'Το plasma report είναι αρνητικό, αλλά το ctDNA fraction είναι εξαιρετικά χαμηλό (<0,2%). Το αποτέλεσμα μπορεί να είναι μη πληροφοριακό και δεν αποκλείει με ασφάλεια μηχανισμό αντοχής.',
  material:'Υλικό / επιλογή επαναβιοψίας',materialText:'Μια νέα ηπατική μετάσταση είναι τεχνικά προσβάσιμη για βιοψία. Η επαναβιοψία μπορεί να ελέγξει ιστολογική μετατροπή και να παρέχει ιστό για ευρεία διερεύνηση αντοχής.',task:'Decision task',taskText:'Αρκεί η αρνητική υγρή βιοψία ή πρέπει να γίνει επαναβιοψία της προοδευτικής ηπατικής μετάστασης και ευρεία διερεύνηση αντοχής;',
  evidence:'Προοδευτικά ευρήματα / πρωτογενείς προβολές',heOverview:'HE επαναβιοψία · ηπατική μετάσταση · επισκόπηση',heZoom:'HE επαναβιοψία · αδενοκαρκίνωμα · μεγέθυνση',targeted:'Στοχευμένη ανάλυση αντοχής EGFR · T790M/C797S',tissueNgs:'Panel αντοχής ιστού · NGS/CNV',metCnv:'MET copy-number viewer · 7q31.2',integrated:'Ενοποιημένο report NGS ιστού',noSpecific:'Δεν υπάρχει ακόμη post-analytical premium snapshot για τα επιλεγμένα βήματα.',synthetic:'Συνθετικό εκπαιδευτικό asset · μόνο για εκπαίδευση · χωρίς πραγματικά δεδομένα ασθενών',
  integration:'Flagship integration',fullOutcome:'Η επαναβιοψία επιβεβαιώνει επίμονο αδενοκαρκίνωμα χωρίς μικροκυτταρική μετατροπή. Η EGFR exon 19 deletion παραμένει ανιχνεύσιμη και το ευρύ NGS/CNV αναδεικνύει υψηλού βαθμού ενίσχυση MET (εκτιμώμενος αριθμός αντιγράφων ~10). Η προηγούμενη αρνητική υγρή βιοψία δεν ήταν επαρκώς πληροφοριακή με ctDNA <0,2%.',targetedOutcome:'Η επαναβιοψία είναι διαγνωστικά επαρκής. Η στοχευμένη EGFR ανάλυση επιβεβαιώνει την exon 19 deletion χωρίς T790M ή C797S. Επειδή MET/CNV και άλλοι bypass μηχανισμοί δεν αξιολογούνται επαρκώς, η αιτία αντοχής παραμένει ατελώς διευκρινισμένη.',rebiopsyOutcome:'Η επαναβιοψία παρέχει βιώσιμο μεταστατικό αδενοκαρκίνωμα χωρίς μικροκυτταρική μετατροπή, αλλά λείπει ακόμη η ευρεία μοριακή διερεύνηση αντοχής.',partialOutcome:'Η αρνητική υγρή βιοψία δεν αποτελεί ασφαλή μοριακό αποκλεισμό λόγω της εξαιρετικά χαμηλής ctDNA. Χωρίς ενημερωτική επαναβιοψία και ευρεία διερεύνηση αντοχής, το βασικό ερώτημα παραμένει ανοικτό.',key:'Κεντρικό μήνυμα',keyText:'Ένα αρνητικό plasma NGS είναι αξιόπιστο μόνο στο κατάλληλο βιολογικό και αναλυτικό πλαίσιο. Σε πρόοδο υπό EGFR-TKI με πολύ χαμηλή ctDNA και προσβάσιμη βλάβη, ο ιστός είναι καθοριστικός και η διερεύνηση πρέπει να καλύπτει δευτερογενείς EGFR αλλοιώσεις, bypass/CNV μηχανισμούς και ιστολογική μετατροπή.'
 },
 es:{
  opening:'Progresión bajo osimertinib',openingText:'Varón de 64 años con adenocarcinoma pulmonar metastásico con mutación EGFR. Tras una buena respuesta inicial a osimertinib, a los 14 meses aparece una progresión radiológica clara con crecimiento de la lesión primaria y nuevas metástasis hepáticas.',
  docs:'Historia clínica',letter:'Carta oncológica / solicitud al MTB',context:'Contexto de progresión / evidencia disponible',ct:'TC tórax/abdomen · progresión',liquid:'Biopsia líquida externa · NGS plasmático',liquidNote:'El informe plasmático es negativo, pero muestra una fracción de ctDNA extremadamente baja (<0,2%). Por tanto, el resultado puede ser no informativo y no excluye con seguridad un mecanismo de resistencia.',
  material:'Material / opción de rebiopsia',materialText:'Una nueva metástasis hepática es fácilmente accesible para biopsia guiada. La rebiopsia puede evaluar transformación histológica y aportar tejido para un estudio amplio de resistencia.',task:'Tarea de decisión',taskText:'¿Es suficiente la biopsia líquida negativa o debe rebiopsiarse la metástasis hepática progresiva y estudiarse con un diagnóstico amplio de resistencia?',
  evidence:'Evidencia progresiva / vistas originales',heOverview:'HE rebiopsia · metástasis hepática · visión general',heZoom:'HE rebiopsia · adenocarcinoma · ampliación',targeted:'Análisis dirigido de resistencia EGFR · T790M/C797S',tissueNgs:'Panel de resistencia en tejido · NGS/CNV',metCnv:'Visor de número de copias MET · 7q31.2',integrated:'Informe NGS integrado de tejido',noSpecific:'Todavía no hay un snapshot premium postanalítico para los pasos seleccionados.',synthetic:'Asset sintético de entrenamiento · solo educativo · sin datos reales de pacientes',
  integration:'Integración flagship',fullOutcome:'La rebiopsia confirma adenocarcinoma persistente sin transformación microcítica. La deleción EGFR del exón 19 sigue siendo detectable y el NGS/CNV amplio identifica una amplificación MET de alto nivel (número de copias estimado ~10). La biopsia líquida negativa previa no fue suficientemente informativa con ctDNA <0,2%.',targetedOutcome:'La rebiopsia es diagnósticamente adecuada. El análisis EGFR dirigido confirma la deleción del exón 19, sin T790M ni C797S. Como MET/CNV y otros mecanismos bypass no se evalúan adecuadamente con este enfoque estrecho, la causa de resistencia queda incompletamente resuelta.',rebiopsyOutcome:'La rebiopsia aporta adenocarcinoma metastásico viable y no muestra transformación microcítica, pero falta todavía el análisis molecular amplio de resistencia.',partialOutcome:'La biopsia líquida negativa no debe considerarse una exclusión molecular segura debido a la fracción de ctDNA extremadamente baja. Sin rebiopsia informativa y diagnóstico amplio de resistencia, la cuestión central permanece abierta.',key:'Mensaje clave',keyText:'Un NGS plasmático negativo solo es fiable dentro de su contexto biológico y analítico. Con progresión bajo EGFR-TKI, ctDNA muy bajo y una lesión accesible, el tejido es decisivo y el estudio debe cubrir alteraciones EGFR secundarias, mecanismos bypass/CNV y transformación histológica.'
 },
 fr:{
  opening:'Progression sous osimertinib',openingText:'Homme de 64 ans avec adénocarcinome pulmonaire métastatique EGFR-muté. Après une bonne réponse initiale à l’osimertinib, une progression radiologique nette apparaît après 14 mois, avec croissance de la lésion primitive et nouvelles métastases hépatiques.',
  docs:'Dossier clinique',letter:'Courrier oncologique / demande RCP',context:'Contexte de progression / données disponibles',ct:'TDM thorax/abdomen · progression',liquid:'Biopsie liquide externe · NGS plasmatique',liquidNote:'Le rapport plasmatique est négatif mais montre une fraction de ctDNA extrêmement faible (<0,2 %). Le résultat peut donc être non informatif et n’exclut pas de façon fiable un mécanisme de résistance.',
  material:'Matériel / option de rebiopsie',materialText:'Une nouvelle métastase hépatique est facilement accessible à une biopsie guidée. La rebiopsie peut rechercher une transformation histologique et fournir du tissu pour une analyse large des mécanismes de résistance.',task:'Decision task',taskText:'La biopsie liquide négative suffit-elle ou faut-il rebiopsier la métastase hépatique progressive et réaliser une analyse large de résistance ?',
  evidence:'Données progressives / vues originales',heOverview:'HE rebiopsie · métastase hépatique · vue d’ensemble',heZoom:'HE rebiopsie · adénocarcinome · zoom',targeted:'Analyse ciblée de résistance EGFR · T790M/C797S',tissueNgs:'Panel de résistance tissulaire · NGS/CNV',metCnv:'Vue copy-number MET · 7q31.2',integrated:'Rapport NGS tissulaire intégré',noSpecific:'Aucun snapshot premium post-analytique n’est encore disponible pour les étapes sélectionnées.',synthetic:'Asset synthétique de formation · usage éducatif uniquement · aucune donnée réelle de patient',
  integration:'Intégration flagship',fullOutcome:'La rebiopsie confirme un adénocarcinome persistant sans transformation à petites cellules. La délétion EGFR exon 19 reste détectable et le NGS/CNV large identifie une amplification MET de haut niveau (nombre de copies estimé ~10). La biopsie liquide négative précédente n’était pas suffisamment informative avec un ctDNA <0,2 %.',targetedOutcome:'La rebiopsie est diagnostiquement adéquate. L’analyse EGFR ciblée confirme la délétion exon 19, sans T790M ni C797S. MET/CNV et les autres mécanismes de bypass n’étant pas suffisamment évalués, la cause de résistance reste incomplètement caractérisée.',rebiopsyOutcome:'La rebiopsie fournit un adénocarcinome métastatique viable sans transformation à petites cellules, mais l’analyse moléculaire large de résistance manque encore.',partialOutcome:'La biopsie liquide négative ne doit pas être considérée comme une exclusion moléculaire sûre en raison de la fraction de ctDNA extrêmement faible. Sans rebiopsie informative et analyse large de résistance, la question centrale reste ouverte.',key:'Message clé',keyText:'Un NGS plasmatique négatif n’est fiable que dans son contexte biologique et analytique. En cas de progression sous EGFR-TKI, de ctDNA très faible et de lésion accessible, le tissu est déterminant ; l’analyse doit couvrir les altérations EGFR secondaires, les mécanismes bypass/CNV et la transformation histologique.'
 }
};
function T(){return COPY[lang()]||COPY.de}

function asset(title,src,cls=''){
  return `<figure class="ns2-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="ns2-provenance">${esc2(T().synthetic)}</div></figure>`;
}
function two(a,b){return `<div class="ns2-grid ns2-grid-2">${a}${b}</div>`}
function docs(){return `<div class="ns2-block"><div class="ns2-head"><h4>${esc2(T().docs)}</h4><span class="ns2-pill">CASE FILE</span></div>${asset(T().letter,NS2_ASSETS.letter,'doc')}</div>`}
function baselineEvidence(){return `<div class="ns2-block"><div class="ns2-head"><h4>${esc2(T().context)}</h4><span class="ns2-pill warn">LOW ctDNA</span></div>${two(asset(T().ct,NS2_ASSETS.ct),asset(T().liquid,NS2_ASSETS.liquid))}<div class="ns2-note warn">${esc2(T().liquidNote)}</div></div>`}
function materialBox(){return `<div class="ns2-block"><div class="ns2-head"><h4>${esc2(T().material)}</h4><span class="ns2-pill ok">ACCESSIBLE</span></div><p>${esc2(T().materialText)}</p><div class="ns2-facts"><div><b>Plasma ctDNA</b><span>&lt;0.2%</span></div><div><b>Progression</b><span>lung + liver</span></div><div><b>Rebiopsy</b><span>liver feasible</span></div><div><b>Scope</b><span>histology + NGS/CNV</span></div></div></div>`}
function decisionBox(){return `<div class="ns2-task"><h4>${esc2(T().task)}</h4><p>${esc2(T().taskText)}</p></div>`}

function assayEvidence(){
  const out=[];
  if(hasTissue()){
    out.push(asset(T().heOverview,NS2_ASSETS.heOverview));
    out.push(asset(T().heZoom,NS2_ASSETS.heZoom));
  }
  if(hasTargetedEgfr())out.push(asset(T().targeted,NS2_ASSETS.egfrTargeted,'wide'));
  if(hasBroadResistance()){
    out.push(asset(T().tissueNgs,NS2_ASSETS.tissueNgs,'wide'));
    out.push(asset(T().metCnv,NS2_ASSETS.metCnv,'wide'));
    out.push(asset(T().integrated,NS2_ASSETS.integratedNgs,'wide'));
  }
  if(!out.length)return `<div class="ns2-block"><div class="ns2-head"><h4>${esc2(T().evidence)}</h4></div><div class="ns2-note">${esc2(T().noSpecific)}</div></div>`;
  return `<div class="ns2-block"><div class="ns2-head"><h4>${esc2(T().evidence)}</h4><span class="ns2-pill ok">TEST-GATED</span></div><div class="ns2-grid ns2-grid-results">${out.join('')}</div></div>`;
}
function outcomeText(){if(hasBroadResistance())return T().fullOutcome;if(hasTargetedEgfr())return T().targetedOutcome;if(hasTissue())return T().rebiopsyOutcome;return T().partialOutcome}
function integrationBox(){const full=allCoreDone();return `<div class="ns2-integration ${full?'full':'partial'}"><h4>${esc2(T().integration)}</h4><p>${esc2(outcomeText())}</p><div class="ns2-key"><b>${esc2(T().key)}:</b> ${esc2(T().keyText)}</div></div>`}

function applyCaseLogic(){
  const c=caseObj();if(!c)return;
  c.required_groups=[
    {id:'rebiopsy',label:'Tissue rebiopsy after non-informative plasma result',tests:['rebiopsy_tissue'],suggest:'rebiopsy_tissue'},
    {id:'resistance',label:'Broad tissue resistance diagnostics including CNV',tests:['resistance_panel'],suggest:'resistance_panel'}
  ];
  c.result_sections=[];
  c.always_findings=[['External plasma NGS','No pathogenic alteration detected; known EGFR exon 19 deletion not detected; estimated ctDNA fraction <0.2% — negative result is potentially non-informative.']];
  c.complete_interpretation=T().fullOutcome;
  c.partial_interpretation=T().partialOutcome;
  c.optimal_summary=T().fullOutcome;
  c.mtb_checks=[
    ['liquid','Negative plasma NGS with ctDNA <0.2% explicitly described as limited / non-exclusionary'],
    ['rebiopsy','Tissue rebiopsy of an accessible progressing lesion recommended'],
    ['resistance','Broad resistance profiling including copy-number/bypass mechanisms performed'],
    ['histology','Histologic transformation considered and excluded in the rebiopsy'],
    ['limits','Method limitations and residual uncertainty clearly communicated'],
    ['bad','Incorrect: negative low-ctDNA liquid biopsy securely excludes a resistance mechanism']
  ];
}

/* Flagship completion: the narrow EGFR-only assay is intentionally not sufficient for the full resistance question. */
const PREV_MISSING=missingTests;
missingTests=function(){
  if(!active())return PREV_MISSING.apply(this,arguments);
  const miss=[];
  if(!hasTissue())miss.push('rebiopsy_tissue');
  if(!selected('resistance_panel'))miss.push('resistance_panel');
  return miss;
};

/* Premium pre-result pages. Post-rebiopsy histology remains hidden until the biopsy has actually been selected and a report exists. */
const PREV_DEEP_STORY=v17DeepStoryStep;
v17DeepStoryStep=function(id){
  if(!active())return PREV_DEEP_STORY.apply(this,arguments);
  const d=typeof v17Deep==='function'?v17Deep():null;
  const next=typeof v17StepNext==='function'?v17StepNext(id):'';
  const badge=typeof v17DeepBadge==='function'?v17DeepBadge():'';
  const nextBtn=typeof v17NextButton==='function'?v17NextButton(next):'';
  const banner=typeof modeBanner==='function'?modeBanner():'';
  if(id==='intake')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().opening)}</h3></div>${nextBtn}</div>${banner}<div class="ns2-opening"><p>${esc2(T().openingText)}</p></div>${typeof v17LearningObjectives==='function'&&d?v17LearningObjectives(d):''}${docs()}</section>`;
  if(id==='history')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().context)}</h3></div>${nextBtn}</div>${banner}${baselineEvidence()}</section>`;
  if(id==='material')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().material)}</h3></div>${nextBtn}</div>${banner}${materialBox()}${decisionBox()}${(typeof v17ExpectedPathBlock==='function'&&d)?v17ExpectedPathBlock(d):''}</section>`;
  return PREV_DEEP_STORY.apply(this,arguments);
};

/* Report findings are strictly method-specific; MET is never leaked by an EGFR-only test. */
const PREV_BUILD=buildReport;
buildReport=function(){
  const out=PREV_BUILD.apply(this,arguments);
  if(!active())return out;
  const f=[];
  f.push(['External plasma NGS','No pathogenic alteration detected; ctDNA fraction <0.2%. Negative plasma result is potentially non-informative.']);
  if(hasTissue())f.push(['Rebiopsy histology','Metastatic adenocarcinoma compatible with lung primary; viable tumour tissue; no evidence of small-cell transformation.']);
  if(hasTargetedEgfr())f.push(['Targeted EGFR resistance assay','EGFR exon 19 deletion detected; T790M not detected; C797S not detected. MET/CNV and non-EGFR bypass mechanisms are not covered adequately by this narrow assay.']);
  if(hasBroadResistance()){
    f.push(['Tissue resistance NGS/CNV','EGFR exon 19 deletion persists; high-level MET amplification detected (estimated copy number ~10.4).']);
    f.push(['Resistance mechanism','MET amplification is a plausible acquired bypass resistance mechanism under osimertinib in this training case.']);
  }else if(selected('resistance_panel')&&!hasTissue()){
    f.push(['Resistance panel','Broad tissue resistance testing requested, but no informative current tumour tissue is available because rebiopsy was not performed.']);
  }
  f.push(['QC',hasTissue()?'Rebiopsy material is diagnostically adequate; performed assays meet case-specific quality criteria.':'The external plasma assay is technically valid, but biological sensitivity is severely limited by the very low ctDNA fraction.']);
  out.findings=f;
  out.kind=missingTests().length?'partial':'complete';
  out.interpretation=[out.kind==='complete'?T().fullOutcome:outcomeText()];
  return out;
};

/* Debrief stays interpretation-only to avoid duplicate rendering of the evidence assets. */
const PREV_DEBRIEF=v17DebriefBlock;
v17DebriefBlock=function(d){
  if(!active())return PREV_DEBRIEF.apply(this,arguments);
  if(!(complete()||isInstructor()))return '';
  return `<div class="v17-debrief ns2-debrief"><h3>${esc2(T().integration)}</h3><p>${esc2(outcomeText())}</p><h4>${esc2(T().key)}</h4><p>${esc2(T().keyText)}</p></div>`;
};

const PREV_DEEP_ADDON=v17DeepReportAddon;
v17DeepReportAddon=function(kind){
  if(!active())return PREV_DEEP_ADDON.apply(this,arguments);
  const d=typeof v17Deep==='function'?v17Deep():null;
  return `<h2>${esc2(T().integration)}</h2><p>${esc2(outcomeText())}</p>${d&&d.learning_objectives?`<h2>Learning objectives</h2>${v17List(d.learning_objectives)}`:''}<h2>${esc2(T().key)}</h2><p>${esc2(T().keyText)}</p>`;
};

/* Evidence appears only in report / MTB after the corresponding workflow step has run. */
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
  if(document.getElementById('ns2FlagshipStyles'))return;
  const st=document.createElement('style');st.id='ns2FlagshipStyles';st.textContent=`
  #v20bVersion{font-size:0!important}#v20bVersion::after{content:'v2.4.0z15'!important;font-size:.72rem!important;line-height:1.1}
  .ns2-opening{border:1px solid #8db8d5;border-radius:18px;background:linear-gradient(135deg,#edf7ff,#fff);padding:15px 17px;margin:10px 0 14px;box-shadow:0 8px 22px rgba(15,76,117,.07)}
  .ns2-block{border:1px solid var(--line);border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .ns2-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.ns2-head h4{margin:0;color:var(--primary)}
  .ns2-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.69rem;font-weight:900;letter-spacing:.04em}.ns2-pill.ok{background:#ecfdf3;color:#067647;border-color:#abefc6}.ns2-pill.warn{background:#fff4e5;color:#9a4d00;border-color:#ffd7a3}
  .ns2-grid{display:grid;gap:12px}.ns2-grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}.ns2-grid-results{grid-template-columns:repeat(2,minmax(0,1fr))}.ns2-grid-results .wide{grid-column:1/-1}
  .ns2-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc}.ns2-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.ns2-asset a{display:block;background:#f2f6f9}.ns2-asset img{width:100%;height:auto;display:block;object-fit:contain}.ns2-asset.doc img{max-height:820px;object-fit:contain}.ns2-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  .ns2-note{font-size:.79rem;color:#52677d;margin-top:10px;padding:9px 11px;border-radius:11px;background:#f7fafc;border-left:4px solid #9bc8d7}.ns2-note.warn{background:#fff8ed;border-left-color:#f5a623;color:#6b4b22}
  .ns2-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:10px}.ns2-facts>div{border:1px solid #d8e4ef;border-radius:12px;padding:9px;background:#f8fbfc}.ns2-facts b{display:block;color:#0f4c75}.ns2-facts span{font-size:.82rem;color:#52677d}
  .ns2-task{border-left:5px solid #1b7aa2;border-radius:15px;background:#f0f9ff;padding:14px;margin:14px 0}.ns2-task h4{margin:0 0 6px;color:#0f4c75}.ns2-task p{margin:0}
  .ns2-integration{border-radius:16px;padding:14px;margin:14px 0;border:1px solid #f6c36e;background:#fff8ed}.ns2-integration.full{border-color:#abefc6;background:#ecfdf3}.ns2-integration h4{margin:0 0 7px;color:#0f4c75}.ns2-integration p{margin:0 0 8px}.ns2-key{border-top:1px solid rgba(15,76,117,.13);padding-top:8px}.ns2-debrief .ns2-block{box-shadow:none}
  @media(max-width:1000px){.ns2-grid-2,.ns2-grid-results,.ns2-facts{grid-template-columns:1fr}.ns2-grid-results .wide{grid-column:auto}.ns2-asset.doc img{max-height:none}}
  `;document.head.appendChild(st);
}

/* Reapply case-local logic after general renders and language changes. */
const PREV_RENDER=render;
render=function(){applyCaseLogic();return PREV_RENDER.apply(this,arguments)};
try{window.render=render}catch(_){ }

function stamp(){
  try{
    window.MOLPATH_APP_VERSION=NS2_VERSION;document.title='MolPath Simulator '+NS2_VERSION;
    const els=[document.getElementById('v20bVersion'),document.getElementById('versionBadge'),...document.querySelectorAll('.v20b-topstatus .v20b-pill.primary')].filter(Boolean);
    els.forEach(el=>{el.setAttribute('data-i18n-skip','1');if(el.id!=='v20bVersion')el.textContent=NS2_VERSION});
  }catch(_){ }
}
const PREV_I18N_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_I18N_AFTER==='function')PREV_I18N_AFTER(l)}catch(_){ }applyCaseLogic();stamp();};

function boot(){styles();applyCaseLogic();stamp();try{if(typeof render==='function')render()}catch(err){console.error(NS2_VERSION+' NSCLC002 flagship boot failed',err)}setTimeout(stamp,100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);

window.MolPathNSCLC002Flagship=Object.freeze({version:NS2_VERSION,base:'v2.4.0z14a',caseId:NS2_CASE,assetCount:9,preExisting:['oncology letter','CT progression','external negative low-ctDNA liquid biopsy'],testGated:{rebiopsy:['H&E overview','H&E zoom'],egfr_t790m_c797s:['targeted EGFR report'],resistance_panel:['tissue resistance NGS','MET CNV viewer','integrated tissue NGS']},completion:['rebiopsy_tissue','resistance_panel']});
})();
