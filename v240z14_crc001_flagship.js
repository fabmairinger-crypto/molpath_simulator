/* MolPath Simulator v2.4.0z14a — MTB_CRC_001 NGS evidence hotfix
   Base: v2.4.0z13a
   Scope: MTB_CRC_001 only. New approved synthetic assets, progressive evidence, coherent case identity.
   Important: CRC NGS panels that cover RAS + BRAF remain equivalent to dedicated RAS/BRAF assays for completeness/scoring.
*/
(function(){
'use strict';
const CRC1_VERSION='v2.4.0z14a';
const CRC1_CASE='MTB_CRC_001_v0_6';
const CRC1_ASSETS=Object.freeze({
  referral:'assets/mtb_crc_001/referral_pink_001.png',
  ct:'assets/mtb_crc_001/ct_staging_001.png',
  heOverview:'assets/mtb_crc_001/he_overview_001.png',
  heZoom:'assets/mtb_crc_001/he_zoom_001.png',
  mmr:'assets/mtb_crc_001/mmr_ihc_panel_001.png',
  ras:'assets/mtb_crc_001/extended_ras_report_001.png',
  braf:'assets/mtb_crc_001/braf_v600e_qpcr_001.png',
  ngsRasBraf:'assets/mtb_crc_001/colon_ngs_ras_braf_001.png',
  msi:'assets/mtb_crc_001/msi_ngs_9loci_001.png',
  mlh1:'assets/mtb_crc_001/mlh1_methylation_qmsp_001.png'
});
window.MolPathCRC001FlagshipAssets=CRC1_ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CRC1_CASE}catch(_){return false}}
function caseObj(){try{return cases.find(c=>c.id===CRC1_CASE)||null}catch(_){return null}}
function deepObj(){try{return (typeof DEEP_DIVE_MAP_V17!=='undefined'&&DEEP_DIVE_MAP_V17[CRC1_CASE])||null}catch(_){return null}}
function selected(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function reportReady(){try{return !!state?.report}catch(_){return false}}
function complete(){try{return !!caseIsComplete()}catch(_){return !!state?.finalized}}
function esc1(v){try{return esc(v==null?'':String(v))}catch(_){return String(v==null?'':v)}}
function lang(){
  try{
    const x=(document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||localStorage.getItem('molpath_language')||'de';
    return ['de','en','ro','el','es','fr'].includes(x)?x:'de';
  }catch(_){return 'de'}
}
function hasRas(){return selected('ras_panel_crc')||selected('colon_ngs_panel')||selected('broad_pan_panel')}
function hasBraf(){return selected('braf_v600e_crc')||selected('colon_ngs_panel')||selected('broad_pan_panel')}
function viaNgs(){return selected('colon_ngs_panel')||selected('broad_pan_panel')}
function allCoreDone(){return hasRas()&&hasBraf()&&selected('mmr_ihc')&&selected('msi_pcr_ngs')&&(selected('mlh1_methylation')||selected('methylation_mlh1'))}

const COPY={
 de:{
  opening:'Fallakte / Primärmaterial',docs:'Klinische Anforderung',referral:'Ü-/Anforderungsschein',brief:'58-jährige Patientin mit linksseitigem Sigma-Adenokarzinom und multiplen Lebermetastasen. Vor der Systemtherapie müssen anti-EGFR-, BRAF-, Immuntherapie- und möglicher hereditärer Kontext sauber getrennt und anschließend integriert werden.',
  context:'Klinischer Kontext / Staging',context1:'Linksseitiger Primärtumor im Sigma; metastasierte Situation mit multiplen Lebermetastasen.',context2:'ECOG 1; Erstlinientherapie soll zeitnah im MTB festgelegt werden.',context3:'Molekulare Ausgangslage offen. RAS-Wildtyp allein wäre noch keine vollständige Therapieantwort.',ct:'CT Abdomen / Staging',ctNote:'Synthetische kontrastverstärkte CT-Ansicht mit multiplen Lebermetastasen und Sigma-Tumorkontext.',
  histo:'Digitale Histologie',heOverview:'HE Übersicht · Primärtumor',heZoom:'HE Zoom · repräsentatives Tumorareal',histoNote:'Mäßig differenziertes kolorektales Adenokarzinom mit infiltrativen Drüsen, Desmoplasie und luminalem „dirty necrosis“-Muster. Molekulare Ergebnisse werden hier nicht vorweggenommen.',
  material:'Material / Präanalytik',materialText:'Für die Molekulardiagnostik steht repräsentatives FFPE-Gewebe einer Lebermetastase mit etwa 45–50 % Tumorzellgehalt zur Verfügung. Das Primärtumor-HE dient der morphologischen Einordnung; die prädiktiven Analysen können am Metastasenmaterial erfolgen.',
  task:'Decision Task',taskText:'Welche Primärdiagnostik beantwortet vor Systemtherapie vollständig die RAS-/BRAF-, MMR/MSI- und bei MLH1/PMS2-Verlust die sporadisch-versus-Lynch-Frage?',
  evidence:'Assay Evidence / Originalansichten',mmr:'MMR-IHC · 4er-Panel',ras:'Extended RAS · KRAS/NRAS',braf:'BRAF p.V600E · qPCR',brafNgs:'BRAF p.V600E · Colon-NGS',ngsRasBraf:'Colon-/GI-NGS · Extended RAS + BRAF',msi:'MSI-NGS · 9-Locus-Report',mlh1:'MLH1-Promotor-Methylierung · qMSP / Schmelzkurve',
  noSpecific:'Für die gewählten Tests liegt kein spezifischer Premium-Snapshot vor.',synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
  integration:'Flagship Integration',fullOutcome:'Extended RAS ist Wildtyp, gleichzeitig liegen BRAF p.V600E und dMMR/MSI-H vor. RAS-Wildtyp beseitigt damit nur eine RAS-basierte anti-EGFR-Ausschlusskonstellation, ist aber keine alleinige Therapieentscheidung. BRAF- und MSI/MMR-Kontext müssen integriert werden. MLH1/PMS2-Verlust mit positiver MLH1-Promotor-Methylierung stützt zusätzlich einen sporadischen MLH1-silencierten Entstehungsweg.',
  partialOutcome:'Der mCRC-Biomarkerpfad ist noch unvollständig. Für eine belastbare Therapie- und Lynch/sporadisch-Einordnung fehlen noch RAS/BRAF-, MMR/MSI- oder Reflexbausteine.',
  key:'Kernaussage',keyText:'Beim mCRC ist „RAS-Wildtyp“ nicht das Ende der Interpretation: BRAF und MMR/MSI gehören in dieselbe frühe Therapieentscheidung; MLH1/PMS2-Verlust benötigt Reflexdiagnostik.',
  ngsEq:'Ein geeignetes Colon-NGS, das KRAS/NRAS und BRAF abdeckt, erfüllt RAS und BRAF vollständig; separate Einzelassays sind dafür nicht zusätzlich erforderlich.',
  deepOpening:'Im Tumorboard soll bei einem linksseitigen metastasierten kolorektalen Karzinom die Erstlinientherapie festgelegt werden. Die Frage lautet nicht nur „RAS-Wildtyp – ja oder nein?“, sondern welche Marker gemeinsam die Therapie- und mögliche hereditäre Einordnung bestimmen.',
  deepBrief:'58-jährige Patientin mit Sigma-Adenokarzinom und multiplen Lebermetastasen. ECOG 1, systemische Erstlinientherapie zeitnah geplant. Morphologie des Primärtumors ist gesichert; für die Molekulardiagnostik steht repräsentatives FFPE-Gewebe einer Lebermetastase zur Verfügung. RAS/BRAF sowie MMR/MSI und bei entsprechendem Verlust die MLH1-Reflexdiagnostik müssen integriert bewertet werden.'
 },
 en:{
  opening:'Case file / primary material',docs:'Clinical request',referral:'Referral / request form',brief:'58-year-old woman with a left-sided sigmoid adenocarcinoma and multiple liver metastases. Before systemic therapy, anti-EGFR, BRAF, immunotherapy and possible hereditary contexts must be separated first and then integrated.',
  context:'Clinical context / staging',context1:'Left-sided primary tumour in the sigmoid colon; metastatic disease with multiple liver metastases.',context2:'ECOG 1; first-line treatment is to be defined promptly in the MTB.',context3:'Molecular baseline is open. RAS wild type alone would not be a complete treatment answer.',ct:'Abdominal CT / staging',ctNote:'Synthetic contrast-enhanced CT view showing multiple liver metastases and the sigmoid tumour context.',
  histo:'Digital histology',heOverview:'H&E overview · primary tumour',heZoom:'H&E zoom · representative tumour area',histoNote:'Moderately differentiated colorectal adenocarcinoma with infiltrative glands, desmoplasia and luminal dirty necrosis. Molecular results are not pre-revealed here.',
  material:'Material / preanalytics',materialText:'Representative FFPE tissue from a liver metastasis with approximately 45–50% tumour cells is available for molecular diagnostics. The primary-tumour H&E establishes morphology; predictive analyses can be performed on metastatic tissue.',
  task:'Decision task',taskText:'Which primary diagnostic strategy completely addresses RAS/BRAF, MMR/MSI and—if MLH1/PMS2 loss is found—the sporadic-versus-Lynch question before systemic therapy?',
  evidence:'Assay evidence / original views',mmr:'MMR IHC · four-marker panel',ras:'Extended RAS · KRAS/NRAS',braf:'BRAF p.V600E · qPCR',brafNgs:'BRAF p.V600E · colon NGS',ngsRasBraf:'Colon/GI NGS · Extended RAS + BRAF',msi:'MSI NGS · 9-locus report',mlh1:'MLH1 promoter methylation · qMSP / melt curve',
  noSpecific:'No specific premium snapshot is available for the selected tests.',synthetic:'Synthetic training asset · educational only · no real patient data',
  integration:'Flagship integration',fullOutcome:'Extended RAS is wild type, while BRAF p.V600E and dMMR/MSI-H are present. RAS wild type therefore removes only a RAS-based anti-EGFR exclusion; it is not a stand-alone treatment decision. BRAF and MSI/MMR context must be integrated. MLH1/PMS2 loss with positive MLH1 promoter methylation additionally supports a sporadic MLH1-silenced pathway.',
  partialOutcome:'The mCRC biomarker pathway is still incomplete. RAS/BRAF, MMR/MSI or reflex components are missing for a robust treatment and Lynch-versus-sporadic interpretation.',
  key:'Key message',keyText:'In mCRC, “RAS wild type” is not the end of interpretation: BRAF and MMR/MSI belong in the same early treatment decision, and MLH1/PMS2 loss requires reflex testing.',
  ngsEq:'A suitable colon NGS panel covering KRAS/NRAS and BRAF fully satisfies both RAS and BRAF; separate single-gene assays are not additionally required.',
  deepOpening:'The MTB must define first-line treatment for a left-sided metastatic colorectal carcinoma. The question is not simply “RAS wild type—yes or no?”, but which markers together determine treatment and possible hereditary interpretation.',
  deepBrief:'58-year-old woman with sigmoid adenocarcinoma and multiple liver metastases. ECOG 1; first-line systemic therapy is planned promptly. Primary-tumour morphology is established; representative FFPE tissue from a liver metastasis is available for molecular diagnostics. RAS/BRAF, MMR/MSI and, when indicated, MLH1 reflex testing must be interpreted together.'
 },
 ro:{
  opening:'Dosarul cazului / material primar',docs:'Cerere clinică',referral:'Bilet de trimitere / cerere',brief:'Pacientă de 58 de ani cu adenocarcinom sigmoid stâng și metastaze hepatice multiple. Înaintea terapiei sistemice trebuie integrate corect contextul anti-EGFR, BRAF, imunoterapia și posibilul context ereditar.',
  context:'Context clinic / stadializare',context1:'Tumoră primară stângă la nivelul sigmoidului; boală metastatică cu metastaze hepatice multiple.',context2:'ECOG 1; tratamentul de primă linie trebuie stabilit rapid în MTB.',context3:'Statusul molecular este inițial necunoscut. RAS wild type singur nu reprezintă un răspuns terapeutic complet.',ct:'CT abdominal / stadializare',ctNote:'Imagine CT sintetică cu contrast, cu metastaze hepatice multiple și context tumoral sigmoid.',
  histo:'Histologie digitală',heOverview:'HE – vedere de ansamblu · tumoră primară',heZoom:'HE – zoom · zonă tumorală reprezentativă',histoNote:'Adenocarcinom colorectal moderat diferențiat cu glande infiltrative, desmoplazie și necroză luminală de tip dirty necrosis. Rezultatele moleculare nu sunt dezvăluite anticipat.',
  material:'Material / preanalitic',materialText:'Pentru diagnosticul molecular este disponibil țesut FFPE reprezentativ dintr-o metastază hepatică, cu aproximativ 45–50% celule tumorale. HE-ul tumorii primare oferă încadrarea morfologică.',
  task:'Sarcina decizională',taskText:'Ce strategie diagnostică primară acoperă complet RAS/BRAF, MMR/MSI și, la pierderea MLH1/PMS2, diferențierea sporadic versus Lynch?',
  evidence:'Dovezi de assay / vizualizări originale',mmr:'MMR-IHC · panel cu 4 markeri',ras:'Extended RAS · KRAS/NRAS',braf:'BRAF p.V600E · qPCR',brafNgs:'BRAF p.V600E · Colon-NGS',ngsRasBraf:'Colon-/GI-NGS · Extended RAS + BRAF',msi:'MSI-NGS · raport 9 loci',mlh1:'Metilarea promotorului MLH1 · qMSP / curbă de topire',
  noSpecific:'Nu există un snapshot premium specific pentru testele selectate.',synthetic:'Asset sintetic de instruire · doar educațional · fără date reale de pacient',
  integration:'Integrare flagship',fullOutcome:'Extended RAS este wild type, dar sunt prezente BRAF p.V600E și dMMR/MSI-H. RAS wild type elimină doar o excludere anti-EGFR bazată pe RAS și nu reprezintă singur decizia terapeutică. Contextul BRAF și MSI/MMR trebuie integrat. Pierderea MLH1/PMS2 împreună cu metilarea pozitivă a promotorului MLH1 susține suplimentar o cale sporadică de silențiere MLH1.',
  partialOutcome:'Calea biomarkerilor mCRC este încă incompletă. Lipsesc componente RAS/BRAF, MMR/MSI sau reflex pentru o interpretare robustă.',key:'Mesaj cheie',keyText:'În mCRC, „RAS wild type” nu încheie interpretarea: BRAF și MMR/MSI fac parte din aceeași decizie precoce, iar pierderea MLH1/PMS2 necesită testare reflex.',ngsEq:'Un panel Colon-NGS adecvat care acoperă KRAS/NRAS și BRAF îndeplinește complet ambele cerințe; testele individuale separate nu sunt necesare suplimentar.',deepOpening:'În MTB trebuie stabilită terapia de primă linie pentru un carcinom colorectal metastatic stâng. Întrebarea este ce markeri trebuie integrați pentru tratament și contextul ereditar.',deepBrief:'Pacientă de 58 de ani cu adenocarcinom sigmoid și metastaze hepatice multiple. ECOG 1. Morfologia tumorii primare este stabilită; pentru diagnosticul molecular este disponibil țesut FFPE reprezentativ dintr-o metastază hepatică.'
 },
 el:{
  opening:'Φάκελος περίπτωσης / πρωτογενές υλικό',docs:'Κλινικό αίτημα',referral:'Παραπεμπτικό / αίτημα',brief:'Γυναίκα 58 ετών με αριστερό αδενοκαρκίνωμα σιγμοειδούς και πολλαπλές ηπατικές μεταστάσεις. Πριν από τη συστηματική θεραπεία πρέπει να ενσωματωθούν σωστά RAS/BRAF, MMR/MSI και ο πιθανός κληρονομικός χαρακτήρας.',
  context:'Κλινικό πλαίσιο / σταδιοποίηση',context1:'Αριστερός πρωτοπαθής όγκος στο σιγμοειδές· μεταστατική νόσος με πολλαπλές ηπατικές μεταστάσεις.',context2:'ECOG 1· η θεραπεία πρώτης γραμμής πρέπει να καθοριστεί άμεσα στο MTB.',context3:'Η μοριακή κατάσταση είναι αρχικά άγνωστη. Το RAS wild type μόνο του δεν αποτελεί πλήρη θεραπευτική απάντηση.',ct:'CT κοιλίας / σταδιοποίηση',ctNote:'Συνθετική CT με σκιαγραφικό, πολλαπλές ηπατικές μεταστάσεις και πλαίσιο όγκου σιγμοειδούς.',
  histo:'Ψηφιακή ιστολογία',heOverview:'HE επισκόπηση · πρωτοπαθής όγκος',heZoom:'HE zoom · αντιπροσωπευτική περιοχή όγκου',histoNote:'Μέτρια διαφοροποιημένο αδενοκαρκίνωμα παχέος εντέρου με διηθητικούς αδένες, δεσμοπλασία και αυλική νέκρωση. Τα μοριακά αποτελέσματα δεν προαποκαλύπτονται.',
  material:'Υλικό / προαναλυτική φάση',materialText:'Διατίθεται αντιπροσωπευτικό FFPE υλικό ηπατικής μετάστασης με περίπου 45–50% νεοπλασματικά κύτταρα. Η HE του πρωτοπαθούς όγκου τεκμηριώνει τη μορφολογία.',
  task:'Στόχος απόφασης',taskText:'Ποια πρωτογενής διαγνωστική στρατηγική καλύπτει πλήρως RAS/BRAF, MMR/MSI και, σε απώλεια MLH1/PMS2, τη διάκριση σποραδικού έναντι Lynch;',
  evidence:'Στοιχεία assay / πρωτότυπες προβολές',mmr:'MMR-IHC · panel 4 δεικτών',ras:'Extended RAS · KRAS/NRAS',braf:'BRAF p.V600E · qPCR',brafNgs:'BRAF p.V600E · Colon-NGS',ngsRasBraf:'Colon-/GI-NGS · Extended RAS + BRAF',msi:'MSI-NGS · αναφορά 9 loci',mlh1:'Μεθυλίωση υποκινητή MLH1 · qMSP / καμπύλη τήξης',
  noSpecific:'Δεν υπάρχει ειδικό premium snapshot για τα επιλεγμένα τεστ.',synthetic:'Συνθετικό εκπαιδευτικό asset · μόνο για εκπαίδευση · χωρίς πραγματικά δεδομένα ασθενών',
  integration:'Flagship integration',fullOutcome:'Το Extended RAS είναι wild type, ενώ υπάρχουν BRAF p.V600E και dMMR/MSI-H. Το RAS wild type αφαιρεί μόνο έναν RAS-βασισμένο αποκλεισμό anti-EGFR και δεν αποτελεί μόνο του θεραπευτική απόφαση. Το πλαίσιο BRAF και MSI/MMR πρέπει να ενσωματωθεί. Η απώλεια MLH1/PMS2 με θετική μεθυλίωση του υποκινητή MLH1 υποστηρίζει επιπλέον σποραδική σίγαση MLH1.',partialOutcome:'Η διαδρομή βιοδεικτών mCRC παραμένει ατελής. Λείπουν στοιχεία RAS/BRAF, MMR/MSI ή reflex.',key:'Κεντρικό μήνυμα',keyText:'Στο mCRC, το «RAS wild type» δεν είναι το τέλος της ερμηνείας: BRAF και MMR/MSI ανήκουν στην ίδια πρώιμη απόφαση και η απώλεια MLH1/PMS2 απαιτεί reflex έλεγχο.',ngsEq:'Κατάλληλο Colon-NGS που καλύπτει KRAS/NRAS και BRAF ικανοποιεί πλήρως και τις δύο απαιτήσεις χωρίς ανάγκη πρόσθετων μεμονωμένων assays.',deepOpening:'Στο MTB πρέπει να καθοριστεί θεραπεία πρώτης γραμμής για αριστερό μεταστατικό καρκίνο παχέος εντέρου. Η ερώτηση είναι ποιοι δείκτες πρέπει να συνεκτιμηθούν για θεραπεία και κληρονομικότητα.',deepBrief:'Γυναίκα 58 ετών με αδενοκαρκίνωμα σιγμοειδούς και πολλαπλές ηπατικές μεταστάσεις. ECOG 1. Η μορφολογία του πρωτοπαθούς είναι τεκμηριωμένη και διατίθεται FFPE υλικό ηπατικής μετάστασης για μοριακή διάγνωση.'
 },
 es:{
  opening:'Expediente del caso / material primario',docs:'Solicitud clínica',referral:'Hoja de derivación / solicitud',brief:'Mujer de 58 años con adenocarcinoma sigmoide izquierdo y múltiples metástasis hepáticas. Antes de la terapia sistémica deben integrarse correctamente RAS/BRAF, MMR/MSI y el posible contexto hereditario.',
  context:'Contexto clínico / estadificación',context1:'Tumor primario izquierdo en sigma; enfermedad metastásica con múltiples metástasis hepáticas.',context2:'ECOG 1; la primera línea debe definirse pronto en el MTB.',context3:'Situación molecular inicialmente abierta. RAS wild type por sí solo no es una respuesta terapéutica completa.',ct:'TC abdominal / estadificación',ctNote:'TC sintética con contraste que muestra múltiples metástasis hepáticas y el contexto tumoral sigmoideo.',
  histo:'Histología digital',heOverview:'HE panorámica · tumor primario',heZoom:'HE zoom · área tumoral representativa',histoNote:'Adenocarcinoma colorrectal moderadamente diferenciado con glándulas infiltrativas, desmoplasia y necrosis luminal tipo dirty necrosis. No se anticipan resultados moleculares.',
  material:'Material / preanalítica',materialText:'Para el diagnóstico molecular hay tejido FFPE representativo de una metástasis hepática con aproximadamente 45–50% de células tumorales. La HE del primario establece la morfología.',
  task:'Tarea de decisión',taskText:'¿Qué estrategia diagnóstica primaria cubre por completo RAS/BRAF, MMR/MSI y, ante pérdida de MLH1/PMS2, la distinción esporádico frente a Lynch?',
  evidence:'Evidencia de ensayos / vistas originales',mmr:'MMR-IHC · panel de 4 marcadores',ras:'Extended RAS · KRAS/NRAS',braf:'BRAF p.V600E · qPCR',brafNgs:'BRAF p.V600E · Colon-NGS',ngsRasBraf:'Colon-/GI-NGS · Extended RAS + BRAF',msi:'MSI-NGS · informe de 9 loci',mlh1:'Metilación del promotor MLH1 · qMSP / curva de fusión',
  noSpecific:'No hay un snapshot premium específico para las pruebas seleccionadas.',synthetic:'Asset sintético de entrenamiento · solo uso educativo · sin datos reales de pacientes',
  integration:'Integración flagship',fullOutcome:'Extended RAS es wild type, mientras que están presentes BRAF p.V600E y dMMR/MSI-H. RAS wild type solo elimina una exclusión anti-EGFR basada en RAS y no constituye por sí mismo una decisión terapéutica. Deben integrarse BRAF y MSI/MMR. La pérdida de MLH1/PMS2 con metilación positiva del promotor MLH1 apoya además una vía esporádica de silenciamiento de MLH1.',partialOutcome:'La vía de biomarcadores del mCRC sigue incompleta. Faltan componentes RAS/BRAF, MMR/MSI o reflex.',key:'Mensaje clave',keyText:'En mCRC, “RAS wild type” no termina la interpretación: BRAF y MMR/MSI forman parte de la misma decisión temprana y la pérdida de MLH1/PMS2 requiere estudio reflex.',ngsEq:'Un panel Colon-NGS adecuado que cubra KRAS/NRAS y BRAF satisface por completo ambos requisitos; no son necesarios ensayos individuales adicionales.',deepOpening:'El MTB debe definir la primera línea para un carcinoma colorrectal metastásico izquierdo. La cuestión es qué marcadores, en conjunto, determinan tratamiento y posible contexto hereditario.',deepBrief:'Mujer de 58 años con adenocarcinoma sigmoide y múltiples metástasis hepáticas. ECOG 1. La morfología del primario está establecida y se dispone de tejido FFPE representativo de una metástasis hepática para diagnóstico molecular.'
 },
 fr:{
  opening:'Dossier du cas / matériel primaire',docs:'Demande clinique',referral:'Formulaire de demande',brief:'Patiente de 58 ans avec adénocarcinome sigmoïdien gauche et multiples métastases hépatiques. Avant le traitement systémique, RAS/BRAF, MMR/MSI et le contexte héréditaire éventuel doivent être distingués puis intégrés.',
  context:'Contexte clinique / stadification',context1:'Tumeur primitive gauche du sigmoïde ; maladie métastatique avec multiples métastases hépatiques.',context2:'ECOG 1 ; la première ligne doit être définie rapidement en RCP moléculaire.',context3:'Statut moléculaire initialement ouvert. RAS sauvage seul ne constitue pas une réponse thérapeutique complète.',ct:'TDM abdominale / stadification',ctNote:'TDM synthétique injectée montrant de multiples métastases hépatiques et le contexte tumoral sigmoïdien.',
  histo:'Histologie numérique',heOverview:'HE vue d’ensemble · tumeur primitive',heZoom:'HE zoom · zone tumorale représentative',histoNote:'Adénocarcinome colorectal modérément différencié avec glandes infiltrantes, desmoplasie et nécrose luminale de type dirty necrosis. Les résultats moléculaires ne sont pas révélés à l’avance.',
  material:'Matériel / pré-analytique',materialText:'Un tissu FFPE représentatif d’une métastase hépatique, avec environ 45–50 % de cellules tumorales, est disponible pour le diagnostic moléculaire. L’HE de la tumeur primitive documente la morphologie.',
  task:'Tâche décisionnelle',taskText:'Quelle stratégie diagnostique initiale couvre complètement RAS/BRAF, MMR/MSI et, en cas de perte MLH1/PMS2, la distinction sporadique versus Lynch ?',
  evidence:'Preuves d’essai / vues originales',mmr:'MMR-IHC · panel 4 marqueurs',ras:'Extended RAS · KRAS/NRAS',braf:'BRAF p.V600E · qPCR',brafNgs:'BRAF p.V600E · Colon-NGS',ngsRasBraf:'Colon-/GI-NGS · Extended RAS + BRAF',msi:'MSI-NGS · rapport 9 loci',mlh1:'Méthylation du promoteur MLH1 · qMSP / courbe de fusion',
  noSpecific:'Aucun snapshot premium spécifique n’est disponible pour les tests sélectionnés.',synthetic:'Asset synthétique d’entraînement · usage éducatif uniquement · aucune donnée réelle de patient',
  integration:'Intégration flagship',fullOutcome:'Extended RAS est sauvage, alors que BRAF p.V600E et dMMR/MSI-H sont présents. RAS sauvage ne fait donc que lever une exclusion anti-EGFR fondée sur RAS et ne constitue pas à lui seul une décision thérapeutique. Le contexte BRAF et MSI/MMR doit être intégré. La perte MLH1/PMS2 avec méthylation positive du promoteur MLH1 soutient en outre une voie sporadique de silençage de MLH1.',partialOutcome:'Le parcours biomarqueur du mCRC reste incomplet. Des éléments RAS/BRAF, MMR/MSI ou reflex manquent encore.',key:'Message clé',keyText:'Dans le mCRC, « RAS sauvage » ne termine pas l’interprétation : BRAF et MMR/MSI appartiennent à la même décision précoce, et la perte MLH1/PMS2 nécessite un bilan reflex.',ngsEq:'Un panel Colon-NGS adapté couvrant KRAS/NRAS et BRAF satisfait complètement les deux exigences ; des tests individuels séparés ne sont pas nécessaires.',deepOpening:'La RCP moléculaire doit définir la première ligne d’un cancer colorectal métastatique gauche. La question est de savoir quels marqueurs doivent être intégrés pour le traitement et le contexte héréditaire.',deepBrief:'Patiente de 58 ans avec adénocarcinome sigmoïdien et multiples métastases hépatiques. ECOG 1. La morphologie du primitif est établie et un tissu FFPE représentatif d’une métastase hépatique est disponible pour le diagnostic moléculaire.'
 }
};
function T(){return COPY[lang()]||COPY.de}

function asset(title,src,cls=''){
  return `<figure class="crc1-asset ${cls}"><figcaption>${esc1(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc1(title)}"></a><div class="crc1-provenance">${esc1(T().synthetic)}</div></figure>`;
}
function two(a,b){return `<div class="crc1-grid crc1-grid-2">${a}${b}</div>`}
function docs(){return `<div class="crc1-block"><div class="crc1-head"><h4>${esc1(T().docs)}</h4><span class="crc1-pill">CASE FILE</span></div><div class="crc1-grid crc1-grid-single">${asset(T().referral,CRC1_ASSETS.referral,'doc')}</div></div>`}
function radiology(){return `<div class="crc1-block"><div class="crc1-head"><h4>${esc1(T().ct)}</h4><span class="crc1-pill">CT</span></div>${asset(T().ct,CRC1_ASSETS.ct,'wide')}<div class="crc1-note">${esc1(T().ctNote)}</div></div>`}
function histology(){return `<div class="crc1-block"><div class="crc1-head"><h4>${esc1(T().histo)}</h4><span class="crc1-pill">H&E</span></div>${two(asset(T().heOverview,CRC1_ASSETS.heOverview),asset(T().heZoom,CRC1_ASSETS.heZoom))}<div class="crc1-note">${esc1(T().histoNote)}</div></div>`}
function contextCards(){return `<div class="crc1-grid crc1-grid-3"><div class="crc1-card"><b>01</b><p>${esc1(T().context1)}</p></div><div class="crc1-card"><b>02</b><p>${esc1(T().context2)}</p></div><div class="crc1-card"><b>03</b><p>${esc1(T().context3)}</p></div></div>`}
function materialBox(){return `<div class="crc1-block"><div class="crc1-head"><h4>${esc1(T().material)}</h4><span class="crc1-pill ok">FFPE</span></div><p>${esc1(T().materialText)}</p><div class="crc1-facts"><div><b>Tumor</b><span>45–50 %</span></div><div><b>Primary</b><span>Sigma</span></div><div><b>Molecular</b><span>Liver metastasis</span></div><div><b>Strategy</b><span>RAS/BRAF + MMR/MSI</span></div></div></div>`}
function decisionBox(){return `<div class="crc1-task"><h4>${esc1(T().task)}</h4><p>${esc1(T().taskText)}</p><div class="crc1-method-note">${esc1(T().ngsEq)}</div></div>`}
function assayEvidence(){
  if(!reportReady())return '';
  const out=[];
  if(selected('mmr_ihc'))out.push(asset(T().mmr,CRC1_ASSETS.mmr,'wide'));
  /* A CRC NGS panel is one assay: show one integrated RAS+BRAF report, not the dedicated RAS report plus a synthetic BRAF text card. */
  if(selected('colon_ngs_panel'))out.push(asset(T().ngsRasBraf||'Colon-/GI-NGS · Extended RAS + BRAF',CRC1_ASSETS.ngsRasBraf,'wide'));
  /* broad_pan_panel remains diagnostically equivalent, but this Colon-/GI-specific screenshot is not shown for that different assay. */
  if(selected('ras_panel_crc'))out.push(asset(T().ras,CRC1_ASSETS.ras,'doc result-doc'));
  if(selected('braf_v600e_crc'))out.push(asset(T().braf,CRC1_ASSETS.braf,'wide'));
  if(selected('msi_pcr_ngs'))out.push(asset(T().msi,CRC1_ASSETS.msi,'wide'));
  if(selected('mlh1_methylation')||selected('methylation_mlh1'))out.push(asset(T().mlh1,CRC1_ASSETS.mlh1,'wide'));
  if(!out.length)return `<div class="crc1-block"><div class="crc1-head"><h4>${esc1(T().evidence)}</h4></div><div class="crc1-note">${esc1(T().noSpecific)}</div></div>`;
  return `<div class="crc1-block"><div class="crc1-head"><h4>${esc1(T().evidence)}</h4><span class="crc1-pill ok">TEST-GATED</span></div><div class="crc1-grid crc1-grid-results">${out.join('')}</div></div>`;
}
function integrationBox(){const full=allCoreDone();return `<div class="crc1-integration ${full?'full':'partial'}"><h4>${esc1(T().integration)}</h4><p>${esc1(full?T().fullOutcome:T().partialOutcome)}</p><div class="crc1-key"><b>${esc1(T().key)}:</b> ${esc1(T().keyText)}</div></div>`}

function applyCaseLogic(){
  const c=caseObj(); if(!c)return;
  /* Diagnostic equivalence: a suitable CRC NGS panel covers both Extended RAS and BRAF. */
  c.required_groups=[
    {id:'ras',label:'Extended RAS',tests:['ras_panel_crc','colon_ngs_panel','broad_pan_panel'],suggest:'ras_panel_crc'},
    {id:'braf',label:'BRAF p.V600E',tests:['braf_v600e_crc','colon_ngs_panel','broad_pan_panel'],suggest:'braf_v600e_crc'},
    {id:'mmr',label:'MMR-IHC',tests:['mmr_ihc'],suggest:'mmr_ihc'},
    {id:'msi',label:'MSI-Testung',tests:['msi_pcr_ngs'],suggest:'msi_pcr_ngs'},
    {id:'mlh1',label:'MLH1-Promotor-Methylierung',tests:['mlh1_methylation','methylation_mlh1'],suggest:'mlh1_methylation'}
  ];
  c.story=[
    {id:'intake',title:'Initialer Auftrag',items:[['Einsender','Viszeralonkologie / Tumorboard'],['Klinische Information','58-jährige Patientin mit Adenokarzinom im Sigma und multiplen Lebermetastasen.'],['Fragestellung','Therapieplanung vor Systemtherapie: RAS/BRAF, MMR/MSI und hereditärer Kontext.'],['Was ist noch unklar?','Welche Marker gemeinsam eine vollständige Therapieentscheidung erlauben.']]},
    {id:'history',title:'Anamnese und klinischer Kontext',items:[['Tumorlokalisation','linksseitiger Kolontumor / Sigma.'],['Stadium / Situation','Metastasiert mit multiplen Lebermetastasen; ECOG 1.'],['Familienanamnese','Mutter mit Endometriumkarzinom im höheren Lebensalter; keine gesicherte Lynch-Diagnose bekannt.'],['MTB-Zeitdruck','Therapiefestlegung innerhalb der nächsten Woche gewünscht.']]},
    {id:'histo',title:'Histologie',items:[['HE','Invasives kolorektales Adenokarzinom, mäßig differenziert.'],['Arbeitsdiagnose','Metastasiertes kolorektales Adenokarzinom, linksseitig.'],['Noch offen','RAS/BRAF-Status, MMR/MSI und ggf. MLH1-Reflexdiagnostik.']]},
    {id:'material',title:'Materialprüfung',items:[['Morphologie','Primärtumor Sigma, HE repräsentativ.'],['Molekularmaterial','FFPE-Gewebe einer Lebermetastase.'],['Tumoranteil','ca. 45–50 %, gut geeignet für DNA-basierte Analysen.'],['Materialfalle','KRAS Exon 2 allein ist zu eng; RAS/BRAF und MMR/MSI müssen vollständig abgedeckt werden.']]}
  ];
  c.result_truth={ras:'KRAS/NRAS Wildtyp',braf:'BRAF p.V600E nachweisbar',mmr:'Verlust MLH1/PMS2; MSH2/MSH6 erhalten',msi:'MSI-high (7/9 Loci instabil)',mlh1:'MLH1-Promotor-Methylierung positiv',qc:'Material und durchgeführte Assays technisch auswertbar; interne Kontrollen gültig.'};
  c.complete_interpretation=T().fullOutcome;c.partial_interpretation=T().partialOutcome;c.optimal_summary=T().fullOutcome;
  c.mtb_checks=[
    ['ras','Extended RAS (KRAS/NRAS) korrekt als Wildtyp einordnen'],
    ['braf','BRAF p.V600E als eigenständigen therapeutischen Kontext berücksichtigen'],
    ['mmr','MLH1/PMS2-Verlust mit erhaltenem MSH2/MSH6 korrekt nennen'],
    ['msi','MSI-H/dMMR als immuntherapeutisch relevanten Kontext benennen'],
    ['mlh1','MLH1-Promotor-Methylierung für sporadisch-versus-Lynch einordnen'],
    ['integrate','RAS-WT nicht isoliert als automatische anti-EGFR-Therapieentscheidung darstellen'],
    ['bad','Falschaussage: RAS-WT allein entscheidet die Systemtherapie']
  ];
  const d=deepObj();if(d){
    d.title='mCRC: RAS/BRAF/MMR/MSI vor Systemtherapie';
    d.opening_scene=T().deepOpening;d.case_briefing=T().deepBrief;
    d.context_cards=[{title:T().context,content:T().context1},{title:T().material,content:T().materialText},{title:'MTB',content:T().context2}];
    d.pre_results=[{title:T().histo,content:T().histoNote},{title:T().ct,content:T().ctNote}];
  }
}

/* Pre-test reasoning: do not disclose the actual molecular result before assays are ordered. */
const PREV_GATES=v15GateQuestions;
v15GateQuestions=function(){
  if(!active())return PREV_GATES.apply(this,arguments);
  const de=lang()==='de';
  return de?[
    {id:'crc1_gate_1',multi:false,prompt:'Welche Biomarkerstrategie ist vor der Systemtherapie beim mCRC vollständig?',options:[{id:'full',label:'Extended RAS + BRAF + MMR/MSI; Reflexdiagnostik bei MLH1/PMS2-Verlust',correct:true},{id:'kras2',label:'KRAS Exon 2 allein',correct:false},{id:'pdl1',label:'PD-L1 allein',correct:false},{id:'hrd',label:'HRD/PARP als Primärpfad',correct:false}]},
    {id:'crc1_gate_2',multi:false,prompt:'Wie ist ein Colon-NGS zu bewerten, das KRAS/NRAS und BRAF vollständig abdeckt?',options:[{id:'equal',label:'Es erfüllt RAS und BRAF diagnostisch ebenso wie geeignete separate Assays.',correct:true},{id:'inferior',label:'Es zählt grundsätzlich weniger als separate Einzeltests.',correct:false},{id:'ras_only',label:'Es darf nur als RAS-Test gewertet werden.',correct:false},{id:'none',label:'NGS ist für CRC-Prädiktionsmarker ungeeignet.',correct:false}]},
    {id:'crc1_gate_3',multi:false,prompt:'Falls später ein MLH1/PMS2-Verlust vorliegt: welcher Reflex ist für die sporadisch-versus-Lynch-Einordnung sinnvoll?',options:[{id:'reflex',label:'MLH1-Promotor-Methylierung ± BRAF-Kontext und klinisch/familiäre Einordnung',correct:true},{id:'lynch',label:'Direkt Lynch-Syndrom diagnostizieren',correct:false},{id:'alk',label:'ALK-FISH',correct:false},{id:'stop',label:'Keine weitere Einordnung erforderlich',correct:false}]}
  ]:[
    {id:'crc1_gate_1',multi:false,prompt:'Which biomarker strategy is complete before systemic therapy in mCRC?',options:[{id:'full',label:'Extended RAS + BRAF + MMR/MSI; reflex testing if MLH1/PMS2 loss is found',correct:true},{id:'kras2',label:'KRAS exon 2 alone',correct:false},{id:'pdl1',label:'PD-L1 alone',correct:false},{id:'hrd',label:'HRD/PARP as the primary pathway',correct:false}]},
    {id:'crc1_gate_2',multi:false,prompt:'How should a colon NGS panel that fully covers KRAS/NRAS and BRAF be rated?',options:[{id:'equal',label:'It fully satisfies RAS and BRAF just like appropriate separate assays.',correct:true},{id:'inferior',label:'It always counts less than separate single-gene assays.',correct:false},{id:'ras_only',label:'It can only count as a RAS test.',correct:false},{id:'none',label:'NGS is unsuitable for CRC predictive biomarkers.',correct:false}]},
    {id:'crc1_gate_3',multi:false,prompt:'If MLH1/PMS2 loss is later found, which reflex is appropriate for sporadic-versus-Lynch classification?',options:[{id:'reflex',label:'MLH1 promoter methylation ± BRAF context plus clinical/family assessment',correct:true},{id:'lynch',label:'Diagnose Lynch syndrome directly',correct:false},{id:'alk',label:'ALK FISH',correct:false},{id:'stop',label:'No further classification is needed',correct:false}]}
  ];
};

/* Premium story pages aligned with the approved NSCLC and CRC_002 flagships. */
const PREV_DEEP_STORY=v17DeepStoryStep;
v17DeepStoryStep=function(id){
  if(!active())return PREV_DEEP_STORY.apply(this,arguments);
  const d=typeof v17Deep==='function'?v17Deep():null;
  const next=typeof v17StepNext==='function'?v17StepNext(id):'';
  const badge=typeof v17DeepBadge==='function'?v17DeepBadge():'';
  const nextBtn=typeof v17NextButton==='function'?v17NextButton(next):'';
  const banner=typeof modeBanner==='function'?modeBanner():'';
  if(id==='intake')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc1(T().opening)}</h3></div>${nextBtn}</div>${banner}<div class="crc1-opening"><p>${esc1(T().brief)}</p></div>${typeof v17LearningObjectives==='function'&&d?v17LearningObjectives(d):''}${docs()}</section>`;
  if(id==='history')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc1(T().context)}</h3></div>${nextBtn}</div>${banner}${contextCards()}${radiology()}</section>`;
  if(id==='histo')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc1(T().histo)}</h3></div>${nextBtn}</div>${banner}${histology()}</section>`;
  if(id==='material')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc1(T().material)}</h3></div>${nextBtn}</div>${banner}${materialBox()}${decisionBox()}${(typeof v17ExpectedPathBlock==='function'&&d)?v17ExpectedPathBlock(d):''}</section>`;
  return PREV_DEEP_STORY.apply(this,arguments);
};

/* Assay-specific report wording. Base CRC logic already gives Colon-NGS/broad NGS equal RAS+BRAF completeness. */
const PREV_BUILD=buildReport;
buildReport=function(){
  const out=PREV_BUILD.apply(this,arguments);if(!active())return out;
  const keep=[];
  if(selected('colon_ngs_panel'))keep.push(['Colon-/GI-NGS · RAS/BRAF','Extended RAS (KRAS/NRAS) Wildtyp; BRAF p.V600E nachweisbar.']);
  else if(selected('broad_pan_panel'))keep.push(['Breites NGS · RAS/BRAF','Extended RAS (KRAS/NRAS) Wildtyp; BRAF p.V600E nachweisbar.']);
  if(selected('ras_panel_crc'))keep.push(['Extended RAS','KRAS/NRAS Wildtyp']);
  else if(!viaNgs()&&selected('kras_exon2_only'))keep.push(['KRAS Exon 2','Wildtyp, aber kein vollständiger Extended-RAS-Status.']);
  if(selected('braf_v600e_crc'))keep.push(['BRAF p.V600E · qPCR','BRAF p.V600E nachweisbar']);
  if(selected('mmr_ihc'))keep.push(['MMR-IHC','MLH1/PMS2-Verlust; MSH2/MSH6 erhalten; interne Positivkontrollen intakt.']);
  if(selected('msi_pcr_ngs'))keep.push(['MSI-NGS (9 Loci)','MSI-H; 7/9 Loci instabil.']);
  if(selected('mlh1_methylation')||selected('methylation_mlh1'))keep.push(['MLH1-Promotor-Methylierung','Nachgewiesen / positiv.']);
  keep.push(['QC','Durchgeführte Assays technisch valide; assay-spezifische Kontrollen bestanden.']);
  out.findings=keep;out.kind=missingTests().length?'partial':'complete';out.interpretation=[out.kind==='complete'?T().fullOutcome:T().partialOutcome];return out;
};

/* Debrief contains interpretation only; evidence is rendered once in report/MTB. */
const PREV_DEBRIEF=v17DebriefBlock;
v17DebriefBlock=function(d){
  if(!active())return PREV_DEBRIEF.apply(this,arguments);
  if(!(complete()||isInstructor()))return '';
  return `<div class="v17-debrief crc1-debrief"><h3>${esc1(T().integration)}</h3><p>${esc1(allCoreDone()?T().fullOutcome:T().partialOutcome)}</p><h4>${esc1(T().key)}</h4><p>${esc1(T().keyText)}</p></div>`;
};
const PREV_DEEP_ADDON=v17DeepReportAddon;
v17DeepReportAddon=function(kind){
  if(!active())return PREV_DEEP_ADDON.apply(this,arguments);
  const d=typeof v17Deep==='function'?v17Deep():null;
  return `<h2>${esc1(T().integration)}</h2><p>${esc1(allCoreDone()?T().fullOutcome:T().partialOutcome)}</p>${d&&d.learning_objectives?`<h2>Learning objectives</h2>${v17List(d.learning_objectives)}`:''}<h2>${esc1(T().key)}</h2><p>${esc1(T().keyText)}</p>`;
};

const PREV_REPORT=renderReport;
renderReport=function(){const html=PREV_REPORT.apply(this,arguments);if(!active()||!reportReady())return html;return html.replace('</section>',`${assayEvidence()}${integrationBox()}</section>`)};
const PREV_MTB=renderMtb;
renderMtb=function(){const html=PREV_MTB.apply(this,arguments);if(!active()||!reportReady())return html;return html.replace('</section>',`${assayEvidence()}${integrationBox()}</section>`)};

function styles(){
  if(document.getElementById('crc1FlagshipStyles'))return;
  const st=document.createElement('style');st.id='crc1FlagshipStyles';st.textContent=`
  #v20bVersion{font-size:0!important}#v20bVersion::after{content:'v2.4.0z14a'!important;font-size:.72rem!important;line-height:1.1}
  .crc1-opening{border:1px solid #9bc8d7;border-radius:18px;background:linear-gradient(135deg,#eef9ff,#fff);padding:15px 17px;margin:10px 0 14px;box-shadow:0 8px 22px rgba(15,76,117,.07)}
  .crc1-block{border:1px solid var(--line);border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .crc1-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.crc1-head h4{margin:0;color:var(--primary)}
  .crc1-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.69rem;font-weight:900;letter-spacing:.04em}.crc1-pill.ok{background:#ecfdf3;color:#067647;border-color:#abefc6}
  .crc1-grid{display:grid;gap:12px}.crc1-grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}.crc1-grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}.crc1-grid-single,.crc1-grid-results{grid-template-columns:1fr}
  .crc1-card{border:1px solid var(--line);border-radius:15px;padding:13px;background:#fbfdff}.crc1-card>b{color:#1b7aa2;font-size:.75rem}.crc1-card p{margin:6px 0 0}
  .crc1-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc}.crc1-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.crc1-asset a{display:block;background:#f2f6f9}.crc1-asset img{width:100%;height:auto;display:block;object-fit:contain}.crc1-asset.doc img{max-height:900px;object-fit:contain}.crc1-asset.result-doc img{max-height:1050px}.crc1-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  .crc1-note{font-size:.79rem;color:#52677d;margin-top:10px;padding:9px 11px;border-radius:11px;background:#f7fafc;border-left:4px solid #9bc8d7}
  .crc1-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:10px}.crc1-facts>div{border:1px solid #d8e4ef;border-radius:12px;padding:9px;background:#f8fbfc}.crc1-facts b{display:block;color:#0f4c75}.crc1-facts span{font-size:.82rem;color:#52677d}
  .crc1-task{border-left:5px solid #1b7aa2;border-radius:15px;background:#f0f9ff;padding:14px;margin:14px 0}.crc1-task h4{margin:0 0 6px;color:#0f4c75}.crc1-task p{margin:0}.crc1-method-note{margin-top:10px;padding:9px 11px;background:#fff;border:1px solid #b9dcea;border-radius:11px;font-size:.8rem;color:#31566f}
  .crc1-ngs-result{display:flex;gap:12px;align-items:flex-start;border:1px solid #abefc6;border-radius:14px;background:#ecfdf3;padding:15px}.crc1-ngs-result>div{display:grid;gap:5px}.crc1-ngs-result strong{font-size:1.25rem;color:#067647}.crc1-ngs-result small{color:#52677d}
  .crc1-integration{border-radius:16px;padding:14px;margin:14px 0;border:1px solid #f6c36e;background:#fff8ed}.crc1-integration.full{border-color:#abefc6;background:#ecfdf3}.crc1-integration h4{margin:0 0 7px;color:#0f4c75}.crc1-integration p{margin:0 0 8px}.crc1-key{border-top:1px solid rgba(15,76,117,.13);padding-top:8px}
  @media(max-width:1000px){.crc1-grid-2,.crc1-grid-3,.crc1-facts{grid-template-columns:1fr}.crc1-asset.doc img{max-height:none}}
  `;document.head.appendChild(st);
}

const PREV_RENDER=render;
render=function(){applyCaseLogic();const out=PREV_RENDER.apply(this,arguments);stamp();return out};try{window.render=render}catch(_){}
function stamp(){try{window.MOLPATH_APP_VERSION=CRC1_VERSION;document.title='MolPath Simulator '+CRC1_VERSION;const els=[document.getElementById('v20bVersion'),document.getElementById('versionBadge'),...document.querySelectorAll('.v20b-topstatus .v20b-pill.primary')].filter(Boolean);els.forEach(el=>{el.setAttribute('data-i18n-skip','1');el.textContent=CRC1_VERSION})}catch(_){}}
const PREV_I18N_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_I18N_AFTER==='function')PREV_I18N_AFTER(l)}catch(_){}applyCaseLogic();stamp()};
function boot(){styles();applyCaseLogic();stamp();try{if(typeof render==='function')render()}catch(err){console.error(CRC1_VERSION+' CRC001 flagship boot failed',err)}setTimeout(stamp,100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);
window.MolPathCRC001Flagship=Object.freeze({version:CRC1_VERSION,base:'v2.4.0z14',caseId:CRC1_CASE,assetCount:10,patient:'58F, sigmoid/left-sided, multiple liver metastases',molecularMaterial:'liver metastasis FFPE',rasBrafEquivalence:['ras_panel_crc + braf_v600e_crc','colon_ngs_panel','broad_pan_panel'],testGated:['mmr_ihc','ras_panel_crc|colon_ngs_panel|broad_pan_panel','braf_v600e_crc|colon_ngs_panel|broad_pan_panel','msi_pcr_ngs','mlh1_methylation']});
})();
