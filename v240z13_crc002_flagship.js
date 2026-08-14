/* MolPath Simulator v2.4.0z14a — MTB_CRC_002 NGS/BRAF equivalence hotfix
   Base: v2.4.0z12
   Scope: MTB_CRC_002 only. Progressive, test-dependent evidence; no global workflow changes.
*/
(function(){
'use strict';
const CRC2_VERSION='v2.4.0z14a';
const CRC2_CASE='MTB_CRC_002_v1_3';
const CRC2_ASSETS=Object.freeze({
  referral:'assets/mtb_crc_002/referral_pink_001.png',
  letter:'assets/mtb_crc_002/oncology_letter_001.png',
  heOverview:'assets/mtb_crc_002/he_overview_001.png',
  heZoom:'assets/mtb_crc_002/he_zoom_001.png',
  mmr:'assets/mtb_crc_002/mmr_ihc_panel_001.png',
  msi:'assets/mtb_crc_002/msi_ngs_9loci_001.png',
  mlh1:'assets/mtb_crc_002/mlh1_methylation_qmsp_001.png',
  braf:'assets/mtb_crc_002/braf_v600e_qpcr_001.png',
  ngsBraf:'assets/mtb_crc_002/colon_ngs_braf_001.png'
});
window.MolPathCRC002FlagshipAssets=CRC2_ASSETS;

function active(){try{return !!activeCase&&activeCase.id===CRC2_CASE}catch(_){return false}}
function caseObj(){try{return cases.find(c=>c.id===CRC2_CASE)||null}catch(_){return null}}
function selected(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function viaNgs(){return selected('colon_ngs_panel')||selected('broad_pan_panel')}
function hasBraf(){return selected('braf_v600e_crc')||viaNgs()}
function reportReady(){try{return !!state?.report}catch(_){return false}}
function complete(){try{return !!caseIsComplete()}catch(_){return !!state?.finalized}}
function esc2(v){try{return esc(v==null?'':String(v))}catch(_){return String(v==null?'':v)}}
function lang(){
  try{
    const x=(document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||localStorage.getItem('molpath_language')||'de';
    return ['de','en','ro','el','es','fr'].includes(x)?x:'de';
  }catch(_){return 'de'}
}

const COPY={
 de:{
  opening:'Fallakte / Primärmaterial',docs:'Klinische Dokumente',referral:'Ü-/Anforderungsschein',letter:'Arztbrief / molekulare Anforderung',
  brief:'Rechtsseitiges Kolonkarzinom. Die Klinik bittet um therapieorientierte Molekulardiagnostik und stellt zusätzlich die Frage nach einem möglichen Lynch-Syndrom. Die hereditäre Einordnung darf erst aus der vollständigen MMR/MSI- und Reflexdiagnostik abgeleitet werden.',
  context:'Klinischer Kontext',context1:'Colon ascendens; Resektat nach rechtsseitiger Hemikolektomie.',context2:'Adenokarzinom, mäßig differenziert (G2); repräsentatives FFPE-Tumorgewebe vorhanden.',context3:'Molekularstatus zu Beginn offen. Therapie- und Familienrelevanz sollen getrennt, aber integriert beurteilt werden.',
  histo:'Digitale Histologie',heOverview:'HE Übersicht',heZoom:'HE Zoom / repräsentatives Tumorareal',histoNote:'Der Zoom stammt aus dem markierten Tumorareal der Übersicht. MMR-IHC ist an dieser Stelle noch kein vorweggenommenes Ergebnis.',
  material:'Material / Präanalytik',materialText:'FFPE-Resektat mit repräsentativem Tumorareal und ausreichendem Tumoranteil. Material reicht für MMR-IHC sowie gezielte molekulare Reflexdiagnostik; unnötige Zusatztests sollen vermieden werden.',
  task:'Decision Task',taskText:'Welche Diagnostik benötigen Sie, um MMR/MSI-Status, die mögliche sporadische MLH1-Inaktivierung und die Lynch-Frage fachlich sauber zu trennen?',
  evidence:'Assay Evidence / Originalansichten',mmr:'MMR-IHC 4er-Panel',msi:'MSI-NGS · 9-Locus-Report',mlh1:'MLH1-Promotor-Methylierung · qMSP / Schmelzkurve',braf:'BRAF p.V600E · qPCR',brafNgs:'Colon-/GI-NGS · BRAF/RAS',
  noSpecific:'Für die gewählten Tests liegt kein spezifischer Premium-Snapshot vor.',synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
  integration:'Flagship Integration',fullOutcome:'MLH1/PMS2-Verlust + MSI-H (7/9 instabile Loci) + nachweisbare MLH1-Promotor-Methylierung + BRAF p.V600E stützen in dieser Fallkonstellation stark eine sporadische MLH1-Inaktivierung. Ein Lynch-Syndrom wird durch die IHC nicht bewiesen; eine humangenetische Abklärung richtet sich nach verbleibendem klinischem/Familienverdacht.',
  partialOutcome:'Die ätiologische Einordnung ist noch unvollständig. Fehlende MMR/MSI- bzw. Reflexbausteine müssen vor einer Aussage „sporadisch“ oder „Lynch“ ergänzt werden.',
  key:'Kernaussage',keyText:'MMR-IHC ist der Einstieg; MSI und die MLH1/BRAF-Reflexdiagnostik bestimmen, wie weit die hereditäre Interpretation gehen darf.'
 },
 en:{
  opening:'Case file / primary material',docs:'Clinical documents',referral:'Referral / request form',letter:'Clinical letter / molecular request',
  brief:'Right-sided colon carcinoma. The clinical team requests therapy-oriented molecular diagnostics and additionally raises the possibility of Lynch syndrome. Hereditary interpretation must follow the complete MMR/MSI and reflex work-up rather than precede it.',
  context:'Clinical context',context1:'Ascending colon; resection after right hemicolectomy.',context2:'Moderately differentiated adenocarcinoma (G2); representative FFPE tumour tissue available.',context3:'Molecular status is initially open. Therapeutic and hereditary relevance should be assessed separately and then integrated.',
  histo:'Digital histology',heOverview:'H&E overview',heZoom:'H&E zoom / representative tumour area',histoNote:'The zoom is derived from the marked tumour area in the overview. MMR IHC is not pre-revealed at this stage.',
  material:'Material / preanalytics',materialText:'FFPE resection with a representative tumour area and adequate tumour fraction. Material is sufficient for MMR IHC and targeted molecular reflex testing; unnecessary add-on tests should be avoided.',
  task:'Decision task',taskText:'Which diagnostics are required to separate MMR/MSI status, possible sporadic MLH1 inactivation and the Lynch question correctly?',
  evidence:'Assay evidence / original views',mmr:'MMR IHC four-marker panel',msi:'MSI NGS · 9-locus report',mlh1:'MLH1 promoter methylation · qMSP / melt curve',braf:'BRAF p.V600E · qPCR',brafNgs:'Colon-/GI-NGS · BRAF/RAS',
  noSpecific:'No specific premium snapshot is available for the selected tests.',synthetic:'Synthetic training asset · educational only · no real patient data',
  integration:'Flagship integration',fullOutcome:'MLH1/PMS2 loss + MSI-H (7/9 unstable loci) + detectable MLH1 promoter methylation + BRAF p.V600E strongly support sporadic MLH1 inactivation in this case. Lynch syndrome is not proven by IHC; germline evaluation depends on any remaining clinical or family-history suspicion.',
  partialOutcome:'The aetiologic classification remains incomplete. Missing MMR/MSI or reflex components must be added before calling the case “sporadic” or “Lynch”.',
  key:'Key message',keyText:'MMR IHC is the entry point; MSI and MLH1/BRAF reflex testing determine how far hereditary interpretation can go.'
 },
 ro:{
  opening:'Dosarul cazului / material primar',docs:'Documente clinice',referral:'Bilet de trimitere / cerere',letter:'Scrisoare clinică / cerere moleculară',
  brief:'Carcinom de colon drept. Echipa clinică solicită diagnostic molecular orientat terapeutic și ridică suplimentar posibilitatea unui sindrom Lynch. Interpretarea ereditară trebuie să urmeze evaluării complete MMR/MSI și testelor reflex.',
  context:'Context clinic',context1:'Colon ascendent; rezecție după hemicolectomie dreaptă.',context2:'Adenocarcinom moderat diferențiat (G2); țesut tumoral FFPE reprezentativ disponibil.',context3:'Statusul molecular este inițial necunoscut. Relevanța terapeutică și ereditară trebuie evaluate separat și apoi integrate.',
  histo:'Histologie digitală',heOverview:'HE – vedere de ansamblu',heZoom:'HE – zoom / zonă tumorală reprezentativă',histoNote:'Zoom-ul provine din zona tumorală marcată în imaginea de ansamblu. Rezultatul MMR-IHC nu este dezvăluit anticipat.',
  material:'Material / preanalitic',materialText:'Rezecție FFPE cu zonă tumorală reprezentativă și fracție tumorală adecvată. Material suficient pentru MMR-IHC și testare moleculară reflex țintită.',
  task:'Sarcina decizională',taskText:'Ce teste sunt necesare pentru a separa corect statusul MMR/MSI, o posibilă inactivare sporadică MLH1 și întrebarea Lynch?',
  evidence:'Dovezi de assay / vizualizări originale',mmr:'Panel MMR-IHC cu 4 markeri',msi:'MSI-NGS · raport 9 loci',mlh1:'Metilarea promotorului MLH1 · qMSP / curbă de topire',braf:'BRAF p.V600E · qPCR',brafNgs:'Colon-/GI-NGS · BRAF/RAS',
  noSpecific:'Nu există un snapshot premium specific pentru testele selectate.',synthetic:'Asset sintetic de instruire · doar educațional · fără date reale de pacient',
  integration:'Integrare flagship',fullOutcome:'Pierderea MLH1/PMS2 + MSI-H (7/9 loci instabile) + metilarea promotorului MLH1 detectabilă + BRAF p.V600E susțin puternic o inactivare sporadică MLH1 în acest caz. Sindromul Lynch nu este demonstrat doar prin IHC.',
  partialOutcome:'Clasificarea etiologică este încă incompletă. Componentele MMR/MSI sau reflex lipsă trebuie completate înainte de o concluzie „sporadic” sau „Lynch”.',
  key:'Mesaj cheie',keyText:'MMR-IHC este punctul de pornire; MSI și testele reflex MLH1/BRAF stabilesc cât de departe poate merge interpretarea ereditară.'
 },
 el:{
  opening:'Φάκελος περίπτωσης / πρωτογενές υλικό',docs:'Κλινικά έγγραφα',referral:'Παραπεμπτικό / αίτημα',letter:'Κλινική επιστολή / μοριακό αίτημα',
  brief:'Δεξιό καρκίνωμα παχέος εντέρου. Η κλινική ομάδα ζητά θεραπευτικά προσανατολισμένη μοριακή διάγνωση και θέτει επιπλέον το ενδεχόμενο συνδρόμου Lynch. Η κληρονομική ερμηνεία πρέπει να ακολουθεί τον πλήρη έλεγχο MMR/MSI και τα reflex tests.',
  context:'Κλινικό πλαίσιο',context1:'Ανιόν κόλον· εκτομή μετά από δεξιά ημικολεκτομή.',context2:'Μέτρια διαφοροποιημένο αδενοκαρκίνωμα (G2)· διαθέσιμο αντιπροσωπευτικό FFPE υλικό.',context3:'Η μοριακή κατάσταση είναι αρχικά άγνωστη. Η θεραπευτική και κληρονομική σημασία αξιολογούνται χωριστά και στη συνέχεια ενσωματώνονται.',
  histo:'Ψηφιακή ιστολογία',heOverview:'HE επισκόπηση',heZoom:'HE zoom / αντιπροσωπευτική περιοχή όγκου',histoNote:'Το zoom προέρχεται από τη σημειωμένη περιοχή όγκου της επισκόπησης. Το αποτέλεσμα MMR-IHC δεν αποκαλύπτεται προκαταβολικά.',
  material:'Υλικό / προαναλυτική φάση',materialText:'FFPE εκτομή με αντιπροσωπευτική περιοχή όγκου και επαρκές ποσοστό όγκου. Το υλικό επαρκεί για MMR-IHC και στοχευμένο reflex μοριακό έλεγχο.',
  task:'Decision task',taskText:'Ποια διαγνωστικά βήματα απαιτούνται για σωστό διαχωρισμό MMR/MSI, πιθανής σποραδικής αδρανοποίησης MLH1 και του ερωτήματος Lynch;',
  evidence:'Assay evidence / πρωτογενείς προβολές',mmr:'MMR-IHC panel 4 δεικτών',msi:'MSI-NGS · αναφορά 9 loci',mlh1:'Μεθυλίωση προαγωγέα MLH1 · qMSP / καμπύλη τήξης',braf:'BRAF p.V600E · qPCR',brafNgs:'Colon-/GI-NGS · BRAF/RAS',
  noSpecific:'Δεν υπάρχει ειδικό premium snapshot για τις επιλεγμένες εξετάσεις.',synthetic:'Συνθετικό εκπαιδευτικό asset · μόνο για εκπαίδευση · χωρίς πραγματικά δεδομένα ασθενών',
  integration:'Flagship integration',fullOutcome:'Απώλεια MLH1/PMS2 + MSI-H (7/9 ασταθή loci) + ανιχνεύσιμη μεθυλίωση του προαγωγέα MLH1 + BRAF p.V600E υποστηρίζουν ισχυρά σποραδική αδρανοποίηση MLH1 σε αυτή την περίπτωση. Το σύνδρομο Lynch δεν αποδεικνύεται μόνο από την IHC.',
  partialOutcome:'Η αιτιολογική ταξινόμηση παραμένει ελλιπής. Τα ελλείποντα MMR/MSI ή reflex στοιχεία πρέπει να συμπληρωθούν πριν χαρακτηριστεί η περίπτωση «σποραδική» ή «Lynch».',
  key:'Κεντρικό μήνυμα',keyText:'Η MMR-IHC είναι η αφετηρία· τα MSI και MLH1/BRAF reflex tests καθορίζουν το εύρος της κληρονομικής ερμηνείας.'
 },
 es:{
  opening:'Historia del caso / material primario',docs:'Documentos clínicos',referral:'Hoja de derivación / solicitud',letter:'Carta clínica / solicitud molecular',
  brief:'Carcinoma de colon derecho. El equipo clínico solicita diagnóstico molecular orientado al tratamiento y plantea además la posibilidad de síndrome de Lynch. La interpretación hereditaria debe seguir al estudio completo de MMR/MSI y a la diagnostica refleja.',
  context:'Contexto clínico',context1:'Colon ascendente; resección tras hemicolectomía derecha.',context2:'Adenocarcinoma moderadamente diferenciado (G2); tejido tumoral FFPE representativo disponible.',context3:'El estado molecular está inicialmente abierto. La relevancia terapéutica y hereditaria deben valorarse por separado y después integrarse.',
  histo:'Histología digital',heOverview:'HE – visión general',heZoom:'HE – zoom / área tumoral representativa',histoNote:'El zoom procede del área tumoral marcada en la imagen general. El resultado de MMR-IHC no se adelanta en este momento.',
  material:'Material / preanalítica',materialText:'Resección FFPE con área tumoral representativa y fracción tumoral adecuada. Material suficiente para MMR-IHC y pruebas moleculares reflejas dirigidas.',
  task:'Tarea de decisión',taskText:'¿Qué pruebas se necesitan para separar correctamente el estado MMR/MSI, una posible inactivación esporádica de MLH1 y la cuestión de Lynch?',
  evidence:'Evidencia del ensayo / vistas originales',mmr:'Panel MMR-IHC de 4 marcadores',msi:'MSI-NGS · informe de 9 loci',mlh1:'Metilación del promotor MLH1 · qMSP / curva de fusión',braf:'BRAF p.V600E · qPCR',brafNgs:'Colon-/GI-NGS · BRAF/RAS',
  noSpecific:'No existe un snapshot premium específico para las pruebas seleccionadas.',synthetic:'Asset sintético de entrenamiento · solo educativo · sin datos reales de pacientes',
  integration:'Integración flagship',fullOutcome:'La pérdida de MLH1/PMS2 + MSI-H (7/9 loci inestables) + metilación detectable del promotor MLH1 + BRAF p.V600E apoyan fuertemente una inactivación esporádica de MLH1 en este caso. El síndrome de Lynch no queda demostrado por la IHC.',
  partialOutcome:'La clasificación etiológica sigue incompleta. Deben completarse los componentes MMR/MSI o reflejos que falten antes de concluir «esporádico» o «Lynch».',
  key:'Mensaje clave',keyText:'MMR-IHC es el punto de partida; MSI y las pruebas reflejas MLH1/BRAF determinan hasta dónde puede llegar la interpretación hereditaria.'
 },
 fr:{
  opening:'Dossier du cas / matériel primaire',docs:'Documents cliniques',referral:'Bon de demande / prescription',letter:'Courrier clinique / demande moléculaire',
  brief:'Cancer du côlon droit. L’équipe clinique demande une analyse moléculaire orientée vers le traitement et évoque en outre un possible syndrome de Lynch. L’interprétation héréditaire doit venir après le bilan complet MMR/MSI et les tests réflexes.',
  context:'Contexte clinique',context1:'Côlon ascendant ; résection après hémicolectomie droite.',context2:'Adénocarcinome moyennement différencié (G2) ; tissu tumoral FFPE représentatif disponible.',context3:'Le statut moléculaire est initialement ouvert. Les dimensions thérapeutique et héréditaire doivent être évaluées séparément puis intégrées.',
  histo:'Histologie numérique',heOverview:'HE – vue d’ensemble',heZoom:'HE – zoom / zone tumorale représentative',histoNote:'Le zoom provient de la zone tumorale marquée sur la vue d’ensemble. Le résultat MMR-IHC n’est pas dévoilé à ce stade.',
  material:'Matériel / pré-analytique',materialText:'Résection FFPE avec zone tumorale représentative et fraction tumorale suffisante. Le matériel permet MMR-IHC et des tests moléculaires réflexes ciblés.',
  task:'Tâche décisionnelle',taskText:'Quels examens sont nécessaires pour distinguer correctement le statut MMR/MSI, une éventuelle inactivation sporadique de MLH1 et la question Lynch ?',
  evidence:'Données d’assay / vues originales',mmr:'Panel MMR-IHC 4 marqueurs',msi:'MSI-NGS · rapport 9 loci',mlh1:'Méthylation du promoteur MLH1 · qMSP / courbe de fusion',braf:'BRAF p.V600E · qPCR',brafNgs:'Colon-/GI-NGS · BRAF/RAS',
  noSpecific:'Aucun snapshot premium spécifique n’est disponible pour les tests sélectionnés.',synthetic:'Asset synthétique d’entraînement · usage éducatif uniquement · aucune donnée réelle de patient',
  integration:'Intégration flagship',fullOutcome:'Perte MLH1/PMS2 + MSI-H (7/9 loci instables) + méthylation détectable du promoteur MLH1 + BRAF p.V600E soutiennent fortement une inactivation sporadique de MLH1 dans ce cas. Le syndrome de Lynch n’est pas prouvé par l’IHC seule.',
  partialOutcome:'La classification étiologique reste incomplète. Les éléments MMR/MSI ou réflexes manquants doivent être complétés avant de conclure « sporadique » ou « Lynch ».',
  key:'Message clé',keyText:'MMR-IHC est le point de départ ; MSI et les tests réflexes MLH1/BRAF déterminent jusqu’où peut aller l’interprétation héréditaire.'
 }
};
function T(){return COPY[lang()]||COPY.de}

function asset(title,src,cls=''){
  return `<figure class="crc2-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="crc2-provenance">${esc2(T().synthetic)}</div></figure>`;
}
function two(a,b){return `<div class="crc2-grid crc2-grid-2">${a}${b}</div>`}
function docs(){return `<div class="crc2-block"><div class="crc2-head"><h4>${esc2(T().docs)}</h4><span class="crc2-pill">CASE FILE</span></div>${two(asset(T().referral,CRC2_ASSETS.referral,'doc'),asset(T().letter,CRC2_ASSETS.letter,'doc'))}</div>`}
function histology(){return `<div class="crc2-block"><div class="crc2-head"><h4>${esc2(T().histo)}</h4><span class="crc2-pill">H&E</span></div>${two(asset(T().heOverview,CRC2_ASSETS.heOverview),asset(T().heZoom,CRC2_ASSETS.heZoom))}<div class="crc2-note">${esc2(T().histoNote)}</div></div>`}
function materialBox(){return `<div class="crc2-block"><div class="crc2-head"><h4>${esc2(T().material)}</h4><span class="crc2-pill ok">FFPE</span></div><p>${esc2(T().materialText)}</p><div class="crc2-facts"><div><b>Tumor</b><span>&gt;20 %</span></div><div><b>Material</b><span>FFPE resection</span></div><div><b>QC</b><span>diagnostic</span></div><div><b>Strategy</b><span>MMR → MSI / reflex</span></div></div></div>`}
function contextCards(){return `<div class="crc2-grid crc2-grid-3"><div class="crc2-card"><b>01</b><p>${esc2(T().context1)}</p></div><div class="crc2-card"><b>02</b><p>${esc2(T().context2)}</p></div><div class="crc2-card"><b>03</b><p>${esc2(T().context3)}</p></div></div>`}
function decisionBox(){return `<div class="crc2-task"><h4>${esc2(T().task)}</h4><p>${esc2(T().taskText)}</p></div>`}

function assayEvidence(){
  if(!reportReady())return '';
  const out=[];
  if(selected('mmr_ihc'))out.push(asset(T().mmr,CRC2_ASSETS.mmr,'wide'));
  if(selected('msi_pcr_ngs'))out.push(asset(T().msi,CRC2_ASSETS.msi,'wide'));
  if(selected('mlh1_methylation')||selected('methylation_mlh1'))out.push(asset(T().mlh1,CRC2_ASSETS.mlh1,'wide'));
  if(selected('colon_ngs_panel'))out.push(asset(T().brafNgs||'Colon-/GI-NGS · BRAF/RAS',CRC2_ASSETS.ngsBraf,'wide'));
  /* broad_pan_panel also satisfies BRAF, but does not reuse a Colon-/GI-specific screenshot. */
  if(selected('braf_v600e_crc'))out.push(asset(T().braf,CRC2_ASSETS.braf,'wide'));
  if(!out.length)return `<div class="crc2-block"><div class="crc2-head"><h4>${esc2(T().evidence)}</h4></div><div class="crc2-note">${esc2(T().noSpecific)}</div></div>`;
  return `<div class="crc2-block"><div class="crc2-head"><h4>${esc2(T().evidence)}</h4><span class="crc2-pill ok">TEST-GATED</span></div><div class="crc2-grid crc2-grid-results">${out.join('')}</div></div>`;
}
function allCoreDone(){return selected('mmr_ihc')&&selected('msi_pcr_ngs')&&(selected('mlh1_methylation')||selected('methylation_mlh1'))&&hasBraf()}
function integrationBox(){const full=allCoreDone();return `<div class="crc2-integration ${full?'full':'partial'}"><h4>${esc2(T().integration)}</h4><p>${esc2(full?T().fullOutcome:T().partialOutcome)}</p><div class="crc2-key"><b>${esc2(T().key)}:</b> ${esc2(T().keyText)}</div></div>`}

function applyCaseLogic(){
  const c=caseObj(); if(!c)return;
  c.required_groups=[
    {id:'mmr',label:'MMR-IHC',tests:['mmr_ihc'],suggest:'mmr_ihc'},
    {id:'msi',label:'MSI-NGS',tests:['msi_pcr_ngs'],suggest:'msi_pcr_ngs'},
    {id:'mlh1',label:'MLH1 promoter methylation',tests:['mlh1_methylation','methylation_mlh1'],suggest:'mlh1_methylation'},
    {id:'braf',label:'BRAF p.V600E',tests:['braf_v600e_crc','colon_ngs_panel','broad_pan_panel'],suggest:'braf_v600e_crc'}
  ];
  c.result_sections=[
    {label:'MMR-IHC',test_any:['mmr_ihc'],result:'MLH1/PMS2 loss; MSH2/MSH6 retained; internal positive controls intact.'},
    {label:'MSI-NGS (9 loci)',test_any:['msi_pcr_ngs'],result:'MSI-H; 7/9 loci unstable.'},
    {label:'MLH1 promoter methylation',test_any:['mlh1_methylation','methylation_mlh1'],result:'MLH1 promoter methylation detected / positive.'},
    {label:'BRAF p.V600E',test_any:['braf_v600e_crc','colon_ngs_panel','broad_pan_panel'],result:'BRAF p.V600E detected / positive.'}
  ];
  c.always_findings=[['QC','All performed assays meet the case-specific quality criteria; internal controls are valid.']];
  c.complete_interpretation=T().fullOutcome;
  c.partial_interpretation=T().partialOutcome;
  c.optimal_summary=T().fullOutcome;
  c.mtb_checks=[
    ['mmr','MLH1/PMS2 loss with retained MSH2/MSH6 correctly state'],
    ['msi','MSI-H as therapeutically relevant context correctly state'],
    ['mlh1','MLH1 promoter methylation as evidence for a sporadic MLH1 pathway correctly state'],
    ['braf','BRAF p.V600E in the sporadic/reflex context correctly state'],
    ['limits','Do not diagnose Lynch syndrome from IHC alone; keep clinical/family context explicit'],
    ['bad','Incorrect: MLH1/PMS2 loss alone proves Lynch syndrome']
  ];
}

/* Explicit premium completion logic: each displayed flagship result belongs to an actually performed test. */
const PREV_MISSING=missingTests;
missingTests=function(){
  if(!active())return PREV_MISSING.apply(this,arguments);
  const miss=[];
  if(!selected('mmr_ihc'))miss.push('mmr_ihc');
  if(!selected('msi_pcr_ngs'))miss.push('msi_pcr_ngs');
  if(!(selected('mlh1_methylation')||selected('methylation_mlh1')))miss.push('mlh1_methylation');
  if(!hasBraf())miss.push('braf_v600e_crc|colon_ngs_panel|broad_pan_panel');
  return miss;
};

/* Pre-test clinical reasoning: no result is leaked before the corresponding assay is ordered/run. */
const PREV_GATES=v15GateQuestions;
v15GateQuestions=function(){
  if(!active())return PREV_GATES.apply(this,arguments);
  const l=lang();
  const de=l==='de';
  const q1=de?
    {id:'crc2_gate_1',multi:true,prompt:'Welche Basisdiagnostik adressiert die MMR/MSI- und Lynch-Frage zunächst?',options:[
      {id:'mmr',label:'MMR-IHC (MLH1, PMS2, MSH2, MSH6)',correct:true},{id:'msi',label:'MSI-Testung',correct:true},{id:'egfr',label:'EGFR-Mutationsanalyse als Lynch-Screening',correct:false},{id:'none',label:'Keine zusätzliche Tumordiagnostik nötig',correct:false}
    ]}:
    {id:'crc2_gate_1',multi:true,prompt:'Which baseline tests initially address the MMR/MSI and Lynch question?',options:[
      {id:'mmr',label:'MMR IHC (MLH1, PMS2, MSH2, MSH6)',correct:true},{id:'msi',label:'MSI testing',correct:true},{id:'egfr',label:'EGFR mutation testing as Lynch screening',correct:false},{id:'none',label:'No additional tumour testing is required',correct:false}
    ]};
  const q2=de?
    {id:'crc2_gate_2',multi:true,prompt:'Falls die MMR-IHC später einen MLH1/PMS2-Verlust zeigt: Welche Reflexschritte sind sinnvoll?',options:[
      {id:'mlh1',label:'MLH1-Promotor-Methylierung',correct:true},{id:'braf',label:'BRAF p.V600E',correct:true},{id:'genetics',label:'Humangenetik bei fehlender sporadischer Erklärung',correct:true},{id:'alk',label:'ALK-FISH',correct:false}
    ]}:
    {id:'crc2_gate_2',multi:true,prompt:'If MMR IHC later shows MLH1/PMS2 loss, which reflex steps are appropriate?',options:[
      {id:'mlh1',label:'MLH1 promoter methylation',correct:true},{id:'braf',label:'BRAF p.V600E',correct:true},{id:'genetics',label:'Genetic counselling if no sporadic explanation is found',correct:true},{id:'alk',label:'ALK FISH',correct:false}
    ]};
  const q3=de?
    {id:'crc2_gate_3',multi:false,prompt:'Welche Bedeutung hat ein bestätigter dMMR/MSI-H-Status im fortgeschrittenen/rezidivierten Setting?',options:[
      {id:'io',label:'Prädiktive Relevanz für Immuncheckpoint-Inhibition',correct:true},{id:'egfr',label:'Alleiniger Marker für anti-EGFR',correct:false},{id:'parp',label:'Primär PARP-Indikation',correct:false},{id:'none',label:'Keine therapeutische Relevanz',correct:false}
    ]}:
    {id:'crc2_gate_3',multi:false,prompt:'What is the relevance of confirmed dMMR/MSI-H in an advanced/recurrent setting?',options:[
      {id:'io',label:'Predictive relevance for immune-checkpoint inhibition',correct:true},{id:'egfr',label:'Sole marker for anti-EGFR therapy',correct:false},{id:'parp',label:'Primarily a PARP indication',correct:false},{id:'none',label:'No therapeutic relevance',correct:false}
    ]};
  return [q1,q2,q3];
};

/* Premium story pages modelled on the finished NSCLC flagship. */
const PREV_DEEP_STORY=v17DeepStoryStep;
v17DeepStoryStep=function(id){
  if(!active())return PREV_DEEP_STORY.apply(this,arguments);
  const d=typeof v17Deep==='function'?v17Deep():null;
  const next=typeof v17StepNext==='function'?v17StepNext(id):'';
  const badge=typeof v17DeepBadge==='function'?v17DeepBadge():'';
  const nextBtn=typeof v17NextButton==='function'?v17NextButton(next):'';
  const banner=typeof modeBanner==='function'?modeBanner():'';
  if(id==='intake')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().opening)}</h3></div>${nextBtn}</div>${banner}<div class="crc2-opening"><p>${esc2(T().brief)}</p></div>${typeof v17LearningObjectives==='function'&&d?v17LearningObjectives(d):''}${docs()}</section>`;
  if(id==='history')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().context)}</h3></div>${nextBtn}</div>${banner}${contextCards()}</section>`;
  if(id==='histo')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().histo)}</h3></div>${nextBtn}</div>${banner}${histology()}</section>`;
  if(id==='material')return `<section class="panel section v17-section"><div class="section-title"><div>${badge}<h3>${esc2(T().material)}</h3></div>${nextBtn}</div>${banner}${materialBox()}${decisionBox()}${(typeof v17ExpectedPathBlock==='function'&&d)?v17ExpectedPathBlock(d):''}</section>`;
  return PREV_DEEP_STORY.apply(this,arguments);
};

/* Keep the report findings assay-specific and consistent with the approved snapshots. */
const PREV_BUILD=buildReport;
buildReport=function(){
  const out=PREV_BUILD.apply(this,arguments);
  if(!active())return out;
  const keep=(out.findings||[]).filter(x=>!['MMR-IHC','MSI-Testung','MLH1-Methylierung / BRAF-Kontext','QC'].includes(String(x?.[0]||'')));
  if(selected('mmr_ihc'))keep.push(['MMR-IHC','MLH1/PMS2 loss; MSH2/MSH6 retained; internal controls positive.']);
  if(selected('msi_pcr_ngs'))keep.push(['MSI-NGS (9 loci)','MSI-H; 7/9 loci unstable.']);
  if(selected('mlh1_methylation')||selected('methylation_mlh1'))keep.push(['MLH1 promoter methylation','Detected / positive.']);
  if(selected('colon_ngs_panel'))keep.push(['Colon-/GI-NGS · RAS/BRAF','BRAF p.V600E detected / positive; KRAS/NRAS wild type.']);
  else if(selected('broad_pan_panel'))keep.push(['Breites NGS · BRAF/RAS','BRAF p.V600E detected / positive; KRAS/NRAS wild type.']);
  if(selected('braf_v600e_crc'))keep.push(['BRAF p.V600E · qPCR','Detected / positive.']);
  keep.push(['QC','Performed assays technically valid; assay-specific controls passed.']);
  out.findings=keep;
  out.kind=missingTests().length?'partial':'complete';
  out.interpretation=[out.kind==='complete'?T().fullOutcome:T().partialOutcome];
  return out;
};

/* Curated debrief: outcome matches the approved positive MLH1-methylation/BRAF assets.
   It remains hidden until completion (except instructor mode). */
const PREV_DEBRIEF=v17DebriefBlock;
v17DebriefBlock=function(d){
  if(!active())return PREV_DEBRIEF.apply(this,arguments);
  if(!(complete()||isInstructor()))return '';
  const full=allCoreDone();
  /* Assay snapshots are rendered exactly once by renderReport/renderMtb below.
     The debrief intentionally contains interpretation only, preventing duplicate evidence blocks. */
  return `<div class="v17-debrief crc2-debrief"><h3>${esc2(T().integration)}</h3><p>${esc2(full?T().fullOutcome:T().partialOutcome)}</p><h4>${esc2(T().key)}</h4><p>${esc2(T().keyText)}</p></div>`;
};

const PREV_DEEP_ADDON=v17DeepReportAddon;
v17DeepReportAddon=function(kind){
  if(!active())return PREV_DEEP_ADDON.apply(this,arguments);
  const d=typeof v17Deep==='function'?v17Deep():null;
  return `<h2>${esc2(T().integration)}</h2><p>${esc2(allCoreDone()?T().fullOutcome:T().partialOutcome)}</p>${d&&d.learning_objectives?`<h2>Learning objectives</h2>${v17List(d.learning_objectives)}`:''}<h2>${esc2(T().key)}</h2><p>${esc2(T().keyText)}</p>`;
};

/* Evidence is shown in the report / MTB only after the corresponding test has actually been run. */
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
  if(document.getElementById('crc2FlagshipStyles'))return;
  const st=document.createElement('style');st.id='crc2FlagshipStyles';st.textContent=`
  #v20bVersion{font-size:0!important}#v20bVersion::after{content:'v2.4.0z14a'!important;font-size:.72rem!important;line-height:1.1}
  .crc2-opening{border:1px solid #9bc8d7;border-radius:18px;background:linear-gradient(135deg,#eef9ff,#fff);padding:15px 17px;margin:10px 0 14px;box-shadow:0 8px 22px rgba(15,76,117,.07)}
  .crc2-block{border:1px solid var(--line);border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .crc2-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.crc2-head h4{margin:0;color:var(--primary)}
  .crc2-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.69rem;font-weight:900;letter-spacing:.04em}.crc2-pill.ok{background:#ecfdf3;color:#067647;border-color:#abefc6}
  .crc2-grid{display:grid;gap:12px}.crc2-grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}.crc2-grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}.crc2-grid-results{grid-template-columns:1fr}
  .crc2-card{border:1px solid var(--line);border-radius:15px;padding:13px;background:#fbfdff}.crc2-card>b{color:#1b7aa2;font-size:.75rem}.crc2-card p{margin:6px 0 0}
  .crc2-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc}.crc2-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.crc2-asset a{display:block;background:#f2f6f9}.crc2-asset img{width:100%;height:auto;display:block;object-fit:contain}.crc2-asset.doc img{max-height:760px;object-fit:contain}.crc2-provenance{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}.crc2-note{font-size:.79rem;color:#52677d;margin-top:10px;padding:9px 11px;border-radius:11px;background:#f7fafc;border-left:4px solid #9bc8d7}
  .crc2-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:10px}.crc2-facts>div{border:1px solid #d8e4ef;border-radius:12px;padding:9px;background:#f8fbfc}.crc2-facts b{display:block;color:#0f4c75}.crc2-facts span{font-size:.82rem;color:#52677d}
  .crc2-task{border-left:5px solid #1b7aa2;border-radius:15px;background:#f0f9ff;padding:14px;margin:14px 0}.crc2-task h4{margin:0 0 6px;color:#0f4c75}.crc2-task p{margin:0}
  .crc2-integration{border-radius:16px;padding:14px;margin:14px 0;border:1px solid #f6c36e;background:#fff8ed}.crc2-integration.full{border-color:#abefc6;background:#ecfdf3}.crc2-integration h4{margin:0 0 7px;color:#0f4c75}.crc2-integration p{margin:0 0 8px}.crc2-key{border-top:1px solid rgba(15,76,117,.13);padding-top:8px}.crc2-debrief .crc2-block{box-shadow:none}
  @media(max-width:1000px){.crc2-grid-2,.crc2-grid-3,.crc2-facts{grid-template-columns:1fr}.crc2-asset.doc img{max-height:none}}
  `;document.head.appendChild(st);
}

/* Reapply case-local logic after language changes / render wrappers. */
const PREV_RENDER=render;
render=function(){applyCaseLogic();return PREV_RENDER.apply(this,arguments)};
try{window.render=render}catch(_){ }

function stamp(){
  try{window.MOLPATH_APP_VERSION=CRC2_VERSION;document.title='MolPath Simulator '+CRC2_VERSION;const x=document.getElementById('v20bVersion');if(x){x.setAttribute('data-i18n-skip','1')}}catch(_){ }
}
const PREV_I18N_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_I18N_AFTER==='function')PREV_I18N_AFTER(l)}catch(_){ }applyCaseLogic();stamp();};

function boot(){styles();applyCaseLogic();stamp();try{if(typeof render==='function')render()}catch(err){console.error(CRC2_VERSION+' CRC002 flagship boot failed',err)}setTimeout(stamp,100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);

window.MolPathCRC002Flagship=Object.freeze({version:CRC2_VERSION,base:'v2.4.0z14',caseId:CRC2_CASE,assetCount:9,testGated:['mmr_ihc','msi_pcr_ngs','mlh1_methylation','braf_v600e_crc|colon_ngs_panel|broad_pan_panel']});
})();
