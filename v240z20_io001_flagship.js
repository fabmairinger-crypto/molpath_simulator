/* MolPath Simulator v2.4.0z20 — MTB_IO_001 Premium / Flagship
   Base: v2.4.0z19
   Scope: MTB_IO_001_v1_0 only.
   Core rule: MMR/MSI are the principal predictive axis; TMB supports the phenotype, while PD-L1 and CD3/CD8 remain optional context markers.
   This module preserves the existing case completion/scoring structure, removes pre-result leakage from the Deep-Dive presentation,
   and adds only the nine user-approved IO_001 assets with strict assay-local gating.
*/
(function(){
'use strict';
const IO20_VERSION='v2.4.0z20';
const IO20_CASE='MTB_IO_001_v1_0';
const IO20_ASSETS=Object.freeze({
  referral:'assets/mtb_io_001/referral_gyn_oncology_001.png',
  heOverview:'assets/mtb_io_001/he_overview_omentum_001.png',
  heDetail:'assets/mtb_io_001/he_detail_til_rich_001.png',
  mmr:'assets/mtb_io_001/mmr_ihc_4plex_001.png',
  immune:'assets/mtb_io_001/cd3_cd8_ihc_001.png',
  msi:'assets/mtb_io_001/msi_ngs_001.png',
  tmb:'assets/mtb_io_001/tmb_ngs_001.png',
  pdl1:'assets/mtb_io_001/pdl1_22c3_001.png',
  final:'assets/mtb_io_001/integrated_mtb_final_001.png'
});
window.MolPathIO001FlagshipAssets=IO20_ASSETS;

function active(){try{return !!activeCase&&activeCase.id===IO20_CASE}catch(_){return false}}
function caseObj(){try{return cases.find(c=>c&&c.id===IO20_CASE)||null}catch(_){return null}}
function selected(id){try{return !!state?.selected?.has(id)}catch(_){return false}}
function currentStep(){try{return state?.step||''}catch(_){return ''}}
function hasMMR(){return selected('mmr_ihc')}
function hasMSI(){return selected('msi_pcr_ngs')||selected('broad_pan_panel')}
function hasTMB(){return selected('tmb_ngs')||selected('broad_pan_panel')}
function hasPDL1(){return selected('pdl1')}
function hasImmune(){return selected('immune_context_ihc')}
/* The approved final report visibly contains all five evidence layers. Requiring all five for the IMAGE prevents result leakage,
   but does not alter the simulator's existing completion requirement (MMR + MSI + TMB). */
function finalImageReady(){try{return !!state?.finalized&&hasMMR()&&hasMSI()&&hasTMB()&&hasPDL1()&&hasImmune()}catch(_){return false}}
function esc2(v){try{return esc(v==null?'':String(v))}catch(_){return String(v==null?'':v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}}
function lang(){
  try{
    const x=((document.body&&document.body.getAttribute('data-molpath-lang'))||localStorage.getItem('molpath_lang')||localStorage.getItem('molpath_language')||document.documentElement.lang||'de').toLowerCase();
    return ['de','en','ro','el','es','fr'].includes(x)?x:'de';
  }catch(_){return 'de'}
}
const COPY={
 de:{
  intake:'Klinisches Eingangsdokument',referral:'Gyn-onkologische Einsendung / molekularpathologische Anforderung',histo:'Digitale Histopathologie',heOverview:'HE Übersicht · Omentumrezidiv / -metastase',heDetail:'HE Detail · ausgeprägt TIL-reiches Tumormikromilieu',evidence:'Testabhängige immunonkologische Evidenz',mmr:'MMR-IHC · MLH1/PMS2 erhalten · MSH2/MSH6 verloren',immune:'CD3/CD8-IHC · TIL-/CD8-reiches Muster',msi:'MSI-Analyse · MSI-H · 8/9 Marker instabil',tmb:'TMB-NGS · 23,4 Mut/Mb · erhöht',pdl1:'PD-L1 (22C3) · fokal positiv · CPS 5',finalTitle:'Integrierter Abschluss',final:'Integrierter Molekularpathologie-/MTB-Abschlussbericht',synthetic:'Synthetisches Trainingsasset · educational only · keine realen Patientendaten',
  story:[
   ['intake','Initialer Auftrag',[['Einsender','Gynäkologische Onkologie'],['Klinische Information','66-jährige Patientin mit rezidiviertem endometrioidem Endometriumkarzinom und omentaler Rezidiv-/Metastasenmanifestation.'],['Fragestellung','Ist eine Immuncheckpoint-Inhibition biologisch plausibel und welche Biomarkerdiagnostik ist dafür erforderlich?'],['Was ist noch unklar?','MMR-Muster, MSI-Status und TMB sind noch nicht bekannt; PD-L1 und TILs sind lediglich ergänzende Kontextmarker.']]],
   ['history','Anamnese und klinischer Kontext',[['Situation','Rezidivierte/metastasierte Erkrankung, systemische Therapieplanung.'],['Material','FFPE-Rezidiv-/Metastasenmaterial aus dem Omentum.'],['Morphologischer Hinweis','Ausgeprägt lymphozytenreiches Tumormikromilieu.'],['MTB-Zeitdruck','Therapieentscheidung zeitnah erwünscht.']]],
   ['histo','Histologie + Vor-IHC',[['HE','Endometrioides Adenokarzinom mit deutlich lymphozytenreichem Tumorstroma.'],['TILs','Stark vermehrt, teils intraepithelial und peritumoral.'],['Arbeitskontext','Morphologisch immunogenes Muster möglich, aber noch keine molekulare Prädiktion.'],['Noch offen','MMR-IHC, MSI und TMB; PD-L1/CD3/CD8 optional als Kontext.']]],
   ['material','Materialprüfung',[['Material','FFPE-Rezidiv-/Metastasenmaterial, Omentum.'],['Tumoranteil','ca. 45 %, ausreichend.'],['DNA-Prognose','ausreichend für MSI-/TMB-Analyse.'],['Materialfalle','TILs oder PD-L1 ersetzen weder MMR-IHC noch MSI-Diagnostik.']]]
  ],
  briefing:'66-jährige Patientin mit rezidiviertem endometrioidem Endometriumkarzinom. Im Omentum liegt verwertbares FFPE-Rezidiv-/Metastasenmaterial mit ca. 45 % Tumoranteil und ausgeprägt TIL-reicher Morphologie vor. MMR-Muster, MSI-Status und TMB sind zu Beginn noch nicht bekannt.',
  cards:[{title:'Tumorbiologie',content:'TIL-reiches entzündliches Mikromilieu; dies spricht für mögliche Immunogenität, ist aber noch kein prädiktiver Molekularbefund.'},{title:'Material',content:'FFPE-Rezidiv-/Metastasenmaterial aus dem Omentum, Tumoranteil ca. 45 %, für IHC und DNA-basierte Analysen geeignet.'},{title:'Klinische Frage',content:'IO-Sensitivität und ein möglicher hereditärer Kontext sollen diagnostisch sauber eingeordnet werden.'}],
  pre:[{title:'Histologie / Datenlage vor Testung',content:'Rezidiviertes endometrioides Endometriumkarzinom mit ausgeprägt TIL-reichem Muster. MMR-IHC, MSI und TMB stehen noch aus; PD-L1 sowie CD3/CD8 können ergänzend erhoben werden.'}],
  constraints:['Therapieprädiktion und hereditäre Konsequenzen müssen getrennt gedacht werden; die konkrete Keimbahn-/Lynch-Konsequenz hängt vom tatsächlich nachgewiesenen MMR-Verlustmuster ab.','PD-L1 und TILs sind Kontextmarker und dürfen MMR/MSI nicht ersetzen.'],
  decision:'Plane die Biomarkerdiagnostik zur IO-Frage, integriere anschließend MMR/MSI/TMB und trenne therapeutische Aussage von einer gegebenenfalls erforderlichen Lynch-/Humangenetik-Abklärung.',
  twist:{title:'Der Biomarker kann zwei klinische Dimensionen haben',content:'Ein dMMR/MSI-H-Befund kann Immuncheckpoint-Inhibition biologisch stützen. Je nach MMR-IHC-Verlustmuster kann zusätzlich eine hereditäre Tumorprädisposition abklärungsbedürftig werden.',why_critical:'Wer nur die Therapieoption kommuniziert, kann eine relevante familiäre und präventive Dimension übersehen.'},
  gatePrompt:'Falls die MMR-IHC einen MSH2/MSH6-Verlust zeigt: Welche zusätzliche Konsequenz ergibt sich daraus?',
  results:{mmr:'Verlust von MSH2 und MSH6; MLH1 und PMS2 erhalten.',msi:'MSI-high (MSI-H); 8/9 Marker instabil, MSI-Score 0,70.',tmb:'Tumormutationslast 23,4 Mut/Mb, erhöht.',pdl1:'PD-L1 fokal positiv, CPS 5; ergänzender Kontextmarker.',immune:'Ausgeprägt CD3-/CD8- und TIL-reiches intraepitheliales/peritumorales Muster.'}
 },
 en:{
  intake:'Clinical intake document',referral:'Gyn-oncology referral / molecular pathology request',histo:'Digital histopathology',heOverview:'H&E overview · omental recurrence / metastasis',heDetail:'H&E detail · markedly TIL-rich tumour microenvironment',evidence:'Test-gated immuno-oncology evidence',mmr:'MMR IHC · MLH1/PMS2 retained · MSH2/MSH6 lost',immune:'CD3/CD8 IHC · TIL-/CD8-rich pattern',msi:'MSI analysis · MSI-H · 8/9 markers unstable',tmb:'TMB NGS · 23.4 Mut/Mb · elevated',pdl1:'PD-L1 (22C3) · focally positive · CPS 5',finalTitle:'Integrated finalization',final:'Integrated molecular pathology / MTB final report',synthetic:'Synthetic training asset · educational only · no real patient data',
  briefing:'66-year-old woman with recurrent endometrioid endometrial carcinoma. Evaluable FFPE recurrence/metastasis tissue from the omentum shows about 45% tumour content and a markedly TIL-rich morphology. The MMR pattern, MSI status and TMB are not yet known at the start.',
  cards:[{title:'Tumour biology',content:'TIL-rich inflammatory microenvironment; this suggests possible immunogenicity but is not yet a predictive molecular result.'},{title:'Material',content:'FFPE recurrence/metastasis tissue from the omentum, about 45% tumour content, suitable for IHC and DNA-based testing.'},{title:'Clinical question',content:'IO sensitivity and a possible hereditary context must be assessed diagnostically.'}],
  pre:[{title:'Histology / data before testing',content:'Recurrent endometrioid endometrial carcinoma with a markedly TIL-rich pattern. MMR IHC, MSI and TMB are still pending; PD-L1 and CD3/CD8 may be added as context.'}],
  constraints:['Therapy prediction and hereditary implications must be considered separately; the specific Lynch/germline consequence depends on the MMR loss pattern actually demonstrated.','PD-L1 and TILs are context markers and must not replace MMR/MSI testing.'],
  decision:'Plan biomarker testing for the IO question, then integrate MMR/MSI/TMB and separate the therapeutic conclusion from any indicated Lynch/genetics work-up.',
  twist:{title:'The biomarker can have two clinical dimensions',content:'A dMMR/MSI-H result can biologically support immune-checkpoint inhibition. Depending on the MMR IHC loss pattern, hereditary tumour predisposition may also require evaluation.',why_critical:'Communicating only the treatment option can miss an important familial and preventive dimension.'},
  gatePrompt:'If MMR IHC demonstrates loss of MSH2/MSH6, what additional consequence follows?',
  results:{mmr:'Loss of MSH2 and MSH6; MLH1 and PMS2 retained.',msi:'MSI-high (MSI-H); 8/9 markers unstable, MSI score 0.70.',tmb:'Tumour mutational burden 23.4 Mut/Mb, elevated.',pdl1:'PD-L1 focally positive, CPS 5; supportive context marker.',immune:'Marked CD3/CD8- and TIL-rich intraepithelial/peritumoral pattern.'}
 },
 ro:{
  intake:'Document clinic inițial',referral:'Trimitere gineco-oncologică / cerere de patologie moleculară',histo:'Histopatologie digitală',heOverview:'HE ansamblu · recidivă/metastază omentală',heDetail:'HE detaliu · micromediu tumoral bogat în TIL',evidence:'Dovezi imunooncologice dependente de teste',mmr:'IHC MMR · MLH1/PMS2 păstrate · MSH2/MSH6 pierdute',immune:'IHC CD3/CD8 · model bogat în TIL/CD8',msi:'Analiză MSI · MSI-H · 8/9 markeri instabili',tmb:'NGS TMB · 23,4 Mut/Mb · crescut',pdl1:'PD-L1 (22C3) · pozitiv focal · CPS 5',finalTitle:'Integrare finală',final:'Raport final integrat de patologie moleculară / MTB',synthetic:'Asset sintetic de instruire · numai educațional · fără date reale de pacient',
  briefing:'Pacientă de 66 de ani cu carcinom endometrioid endometrial recidivat. Materialul FFPE de recidivă/metastază omentală are aproximativ 45% tumoră și morfologie bogată în TIL. La început, modelul MMR, statusul MSI și TMB nu sunt cunoscute.',
  cards:[{title:'Biologie tumorală',content:'Micromediu inflamator bogat în TIL; sugerează imunogenitate posibilă, dar nu este încă un rezultat molecular predictiv.'},{title:'Material',content:'Material FFPE de recidivă/metastază omentală, aproximativ 45% tumoră, adecvat pentru IHC și teste pe ADN.'},{title:'Întrebare clinică',content:'Sensibilitatea la IO și un posibil context ereditar trebuie evaluate corect.'}],
  pre:[{title:'Histologie / date înainte de testare',content:'Carcinom endometrioid endometrial recidivat cu model bogat în TIL. IHC MMR, MSI și TMB sunt încă în așteptare; PD-L1 și CD3/CD8 pot fi adăugate ca context.'}],
  constraints:['Predicția terapeutică și implicațiile ereditare trebuie separate; consecința Lynch/germinală concretă depinde de modelul de pierdere MMR demonstrat.','PD-L1 și TIL sunt markeri de context și nu înlocuiesc MMR/MSI.'],
  decision:'Planificați testarea biomarkerilor pentru întrebarea IO, apoi integrați MMR/MSI/TMB și separați concluzia terapeutică de o eventuală evaluare Lynch/genetică.',
  twist:{title:'Biomarkerul poate avea două dimensiuni clinice',content:'Un rezultat dMMR/MSI-H poate susține biologic inhibiția checkpoint. În funcție de modelul de pierdere MMR, poate fi necesară și evaluarea unei predispoziții ereditare.',why_critical:'Comunicarea exclusivă a opțiunii terapeutice poate omite o dimensiune familială și preventivă importantă.'},
  gatePrompt:'Dacă IHC MMR arată pierderea MSH2/MSH6, ce consecință suplimentară rezultă?',
  results:{mmr:'Pierdere MSH2 și MSH6; MLH1 și PMS2 păstrate.',msi:'MSI-high (MSI-H); 8/9 markeri instabili, scor MSI 0,70.',tmb:'TMB 23,4 Mut/Mb, crescut.',pdl1:'PD-L1 pozitiv focal, CPS 5; marker contextual suplimentar.',immune:'Model intraepitelial/peritumoral bogat în CD3/CD8 și TIL.'}
 },
 el:{
  intake:'Κλινικό αρχικό έγγραφο',referral:'Γυναικο-ογκολογική παραπομπή / αίτημα μοριακής παθολογίας',histo:'Ψηφιακή ιστοπαθολογία',heOverview:'HE επισκόπηση · υποτροπή/μετάσταση επιπλόου',heDetail:'HE λεπτομέρεια · έντονα TIL-rich μικροπεριβάλλον',evidence:'Ανοσο-ογκολογικά ευρήματα ανά εξέταση',mmr:'MMR IHC · MLH1/PMS2 διατηρούνται · MSH2/MSH6 απώλεια',immune:'CD3/CD8 IHC · TIL/CD8-rich πρότυπο',msi:'Ανάλυση MSI · MSI-H · 8/9 ασταθείς δείκτες',tmb:'TMB NGS · 23,4 Mut/Mb · αυξημένο',pdl1:'PD-L1 (22C3) · εστιακά θετικό · CPS 5',finalTitle:'Τελική ολοκλήρωση',final:'Ολοκληρωμένη τελική αναφορά μοριακής παθολογίας / MTB',synthetic:'Συνθετικό εκπαιδευτικό asset · μόνο για εκπαίδευση · χωρίς πραγματικά δεδομένα ασθενών',
  briefing:'66χρονη ασθενής με υποτροπιάζον ενδομητριοειδές καρκίνωμα ενδομητρίου. FFPE υλικό υποτροπής/μετάστασης από το επίπλουν έχει περίπου 45% όγκο και έντονα TIL-rich μορφολογία. Στην αρχή δεν είναι γνωστά το MMR πρότυπο, το MSI και το TMB.',
  cards:[{title:'Βιολογία όγκου',content:'TIL-rich φλεγμονώδες μικροπεριβάλλον· υποδηλώνει πιθανή ανοσογονικότητα αλλά δεν αποτελεί ακόμη προγνωστικό μοριακό αποτέλεσμα.'},{title:'Υλικό',content:'FFPE υλικό υποτροπής/μετάστασης από επίπλουν, περίπου 45% όγκος, κατάλληλο για IHC και DNA αναλύσεις.'},{title:'Κλινικό ερώτημα',content:'Η ευαισθησία σε IO και πιθανό κληρονομικό υπόβαθρο πρέπει να αξιολογηθούν διαγνωστικά.'}],
  pre:[{title:'Ιστολογία / δεδομένα πριν από τις εξετάσεις',content:'Υποτροπιάζον ενδομητριοειδές καρκίνωμα με έντονα TIL-rich πρότυπο. MMR IHC, MSI και TMB εκκρεμούν· PD-L1 και CD3/CD8 μπορούν να προστεθούν ως πλαίσιο.'}],
  constraints:['Η θεραπευτική πρόβλεψη και οι κληρονομικές συνέπειες πρέπει να διαχωρίζονται· η συγκεκριμένη συνέπεια Lynch/βλαστικής σειράς εξαρτάται από το πραγματικό πρότυπο απώλειας MMR.','PD-L1 και TILs είναι δείκτες πλαισίου και δεν αντικαθιστούν MMR/MSI.'],
  decision:'Σχεδιάστε τον έλεγχο βιοδεικτών για το ερώτημα IO, κατόπιν ενσωματώστε MMR/MSI/TMB και διαχωρίστε τη θεραπευτική από τυχόν ένδειξη για Lynch/γενετική διερεύνηση.',
  twist:{title:'Ο βιοδείκτης μπορεί να έχει δύο κλινικές διαστάσεις',content:'Ένα αποτέλεσμα dMMR/MSI-H μπορεί να στηρίζει βιολογικά την αναστολή checkpoint. Ανάλογα με το πρότυπο απώλειας MMR μπορεί να απαιτείται και έλεγχος κληρονομικής προδιάθεσης.',why_critical:'Η επικοινωνία μόνο της θεραπευτικής επιλογής μπορεί να χάσει σημαντική οικογενειακή και προληπτική διάσταση.'},
  gatePrompt:'Εάν η MMR IHC δείξει απώλεια MSH2/MSH6, ποια πρόσθετη συνέπεια προκύπτει;',
  results:{mmr:'Απώλεια MSH2 και MSH6· MLH1 και PMS2 διατηρούνται.',msi:'MSI-high (MSI-H)· 8/9 δείκτες ασταθείς, MSI score 0,70.',tmb:'TMB 23,4 Mut/Mb, αυξημένο.',pdl1:'PD-L1 εστιακά θετικό, CPS 5· συμπληρωματικός δείκτης πλαισίου.',immune:'Έντονα CD3/CD8- και TIL-rich ενδοεπιθηλιακό/περινεοπλασματικό πρότυπο.'}
 },
 es:{
  intake:'Documento clínico de entrada',referral:'Derivación gineco-oncológica / solicitud de patología molecular',histo:'Histopatología digital',heOverview:'HE panorámica · recidiva/metástasis omental',heDetail:'HE detalle · microambiente marcadamente rico en TIL',evidence:'Evidencia inmuno-oncológica dependiente de pruebas',mmr:'IHC MMR · MLH1/PMS2 conservados · MSH2/MSH6 perdidos',immune:'IHC CD3/CD8 · patrón rico en TIL/CD8',msi:'Análisis MSI · MSI-H · 8/9 marcadores inestables',tmb:'NGS TMB · 23,4 Mut/Mb · elevada',pdl1:'PD-L1 (22C3) · focalmente positivo · CPS 5',finalTitle:'Integración final',final:'Informe final integrado de patología molecular / MTB',synthetic:'Asset sintético de entrenamiento · solo educativo · sin datos reales de pacientes',
  briefing:'Paciente de 66 años con carcinoma endometrioide endometrial recurrente. El material FFPE de recidiva/metástasis omental contiene aproximadamente 45% de tumor y una morfología marcadamente rica en TIL. Al inicio aún no se conocen el patrón MMR, el estado MSI ni la TMB.',
  cards:[{title:'Biología tumoral',content:'Microambiente inflamatorio rico en TIL; sugiere posible inmunogenicidad, pero todavía no es un resultado molecular predictivo.'},{title:'Material',content:'Material FFPE de recidiva/metástasis omental, ~45% de tumor, adecuado para IHC y pruebas basadas en ADN.'},{title:'Pregunta clínica',content:'La sensibilidad a IO y un posible contexto hereditario deben evaluarse de forma diagnóstica.'}],
  pre:[{title:'Histología / datos antes de las pruebas',content:'Carcinoma endometrioide endometrial recurrente con patrón marcadamente rico en TIL. MMR-IHC, MSI y TMB están pendientes; PD-L1 y CD3/CD8 pueden añadirse como contexto.'}],
  constraints:['La predicción terapéutica y las implicaciones hereditarias deben separarse; la consecuencia Lynch/germinal concreta depende del patrón de pérdida MMR realmente demostrado.','PD-L1 y TIL son marcadores de contexto y no sustituyen MMR/MSI.'],
  decision:'Planifique las pruebas de biomarcadores para la cuestión IO; después integre MMR/MSI/TMB y separe la conclusión terapéutica de una eventual evaluación Lynch/genética.',
  twist:{title:'El biomarcador puede tener dos dimensiones clínicas',content:'Un resultado dMMR/MSI-H puede apoyar biológicamente la inhibición de checkpoint. Según el patrón de pérdida MMR, también puede ser necesaria la evaluación de predisposición hereditaria.',why_critical:'Comunicar solo la opción terapéutica puede omitir una dimensión familiar y preventiva importante.'},
  gatePrompt:'Si la IHC MMR demuestra pérdida de MSH2/MSH6, ¿qué consecuencia adicional se deriva?',
  results:{mmr:'Pérdida de MSH2 y MSH6; MLH1 y PMS2 conservados.',msi:'MSI-high (MSI-H); 8/9 marcadores inestables, puntuación MSI 0,70.',tmb:'TMB 23,4 Mut/Mb, elevada.',pdl1:'PD-L1 focalmente positivo, CPS 5; marcador contextual adicional.',immune:'Patrón intraepitelial/peritumoral marcadamente rico en CD3/CD8 y TIL.'}
 },
 fr:{
  intake:'Document clinique initial',referral:'Demande gynéco-oncologique / pathologie moléculaire',histo:'Histopathologie numérique',heOverview:'HE vue d’ensemble · récidive/métastase omentale',heDetail:'HE détail · microenvironnement fortement riche en TIL',evidence:'Données immuno-oncologiques conditionnées par les tests',mmr:'IHC MMR · MLH1/PMS2 conservés · MSH2/MSH6 perdus',immune:'IHC CD3/CD8 · profil riche en TIL/CD8',msi:'Analyse MSI · MSI-H · 8/9 marqueurs instables',tmb:'NGS TMB · 23,4 Mut/Mb · élevée',pdl1:'PD-L1 (22C3) · focalement positif · CPS 5',finalTitle:'Intégration finale',final:'Compte rendu final intégré de pathologie moléculaire / RCP',synthetic:'Asset synthétique de formation · usage éducatif uniquement · aucune donnée réelle de patient',
  briefing:'Patiente de 66 ans avec carcinome endométrioïde de l’endomètre récidivant. Le matériel FFPE de récidive/métastase omentale contient environ 45 % de tumeur et une morphologie très riche en TIL. Au départ, le profil MMR, le statut MSI et la TMB ne sont pas encore connus.',
  cards:[{title:'Biologie tumorale',content:'Microenvironnement inflammatoire riche en TIL ; cela suggère une immunogénicité possible mais ne constitue pas encore un résultat moléculaire prédictif.'},{title:'Matériel',content:'Matériel FFPE de récidive/métastase omentale, environ 45 % de tumeur, adapté à l’IHC et aux analyses ADN.'},{title:'Question clinique',content:'La sensibilité à l’IO et un éventuel contexte héréditaire doivent être évalués correctement.'}],
  pre:[{title:'Histologie / données avant tests',content:'Carcinome endométrioïde récidivant avec profil fortement riche en TIL. IHC MMR, MSI et TMB restent à réaliser ; PD-L1 et CD3/CD8 peuvent être ajoutés comme contexte.'}],
  constraints:['La prédiction thérapeutique et les implications héréditaires doivent être distinguées ; la conséquence Lynch/constitutionnelle précise dépend du profil de perte MMR réellement démontré.','PD-L1 et TIL sont des marqueurs de contexte et ne remplacent pas MMR/MSI.'],
  decision:'Planifier les biomarqueurs pour la question IO, puis intégrer MMR/MSI/TMB et séparer la conclusion thérapeutique d’une éventuelle indication d’évaluation Lynch/génétique.',
  twist:{title:'Le biomarqueur peut avoir deux dimensions cliniques',content:'Un résultat dMMR/MSI-H peut soutenir biologiquement l’inhibition des checkpoints. Selon le profil de perte MMR, une prédisposition héréditaire peut également nécessiter une évaluation.',why_critical:'Communiquer uniquement l’option thérapeutique peut faire manquer une dimension familiale et préventive importante.'},
  gatePrompt:'Si l’IHC MMR montre une perte de MSH2/MSH6, quelle conséquence supplémentaire en découle ?',
  results:{mmr:'Perte de MSH2 et MSH6 ; MLH1 et PMS2 conservés.',msi:'MSI-high (MSI-H) ; 8/9 marqueurs instables, score MSI 0,70.',tmb:'TMB 23,4 Mut/Mb, élevée.',pdl1:'PD-L1 focalement positif, CPS 5 ; marqueur contextuel complémentaire.',immune:'Profil intraépithélial/péritumoral fortement riche en CD3/CD8 et TIL.'}
 }
};
function T(){return COPY[lang()]||COPY.de}
function caseStory(t){
  if(t.story)return t.story.map(x=>({id:x[0],title:x[1],items:x[2]}));
  /* Non-DE languages use the translated Deep-Dive UI for the visible pre-test narrative; keep the hidden base story consistent in English rather than reverting to legacy CUP. */
  const e=COPY.en;
  return [
   {id:'intake',title:'Initial request',items:[['Referrer','Gynaecologic oncology'],['Clinical information','66-year-old woman with recurrent endometrioid endometrial carcinoma and omental recurrence/metastasis.'],['Clinical question','Is immune-checkpoint inhibition biologically plausible and which biomarker testing is required?'],['What remains unclear?','MMR pattern, MSI status and TMB are not yet known; PD-L1 and TILs are supportive context only.']]},
   {id:'history',title:'History and clinical context',items:[['Situation','Recurrent/metastatic disease; systemic treatment planning.'],['Material','FFPE omental recurrence/metastasis tissue.'],['Morphological clue','Markedly lymphocyte-rich tumour microenvironment.'],['MTB timing','A treatment decision is required promptly.']]},
   {id:'histo',title:'Histology and pre-IHC',items:[['H&E','Endometrioid adenocarcinoma with a markedly lymphocyte-rich tumour stroma.'],['TILs','Markedly increased, partly intraepithelial and peritumoral.'],['Working context','Potentially immunogenic morphology, but no molecular prediction yet.'],['Still pending','MMR IHC, MSI and TMB; PD-L1/CD3/CD8 optional context.']]},
   {id:'material',title:'Material assessment',items:[['Material','FFPE recurrence/metastasis tissue, omentum.'],['Tumour content','about 45%, sufficient.'],['DNA outlook','sufficient for MSI/TMB analysis.'],['Pitfall','TILs or PD-L1 do not replace MMR IHC or MSI testing.']]}
  ];
}
const RESULT_COPY={
 de:{mmr:'MMR-IHC',msi:'MSI',tmb:'TMB',pdl1:'PD-L1',immune:'Immun-Kontext',qc:'IHC sowie DNA-basierte MSI-/TMB-Auswertung technisch verwertbar.'},
 en:{mmr:'MMR IHC',msi:'MSI',tmb:'TMB',pdl1:'PD-L1',immune:'Immune context',qc:'IHC and DNA-based MSI/TMB assessment technically evaluable.'},
 ro:{mmr:'IHC MMR',msi:'MSI',tmb:'TMB',pdl1:'PD-L1',immune:'Context imun',qc:'IHC și evaluarea MSI/TMB bazată pe ADN sunt tehnic evaluabile.'},
 el:{mmr:'MMR IHC',msi:'MSI',tmb:'TMB',pdl1:'PD-L1',immune:'Ανοσολογικό πλαίσιο',qc:'Η IHC και η DNA-based αξιολόγηση MSI/TMB είναι τεχνικά αξιολογήσιμες.'},
 es:{mmr:'IHC MMR',msi:'MSI',tmb:'TMB',pdl1:'PD-L1',immune:'Contexto inmune',qc:'La IHC y la evaluación MSI/TMB basada en ADN son técnicamente evaluables.'},
 fr:{mmr:'IHC MMR',msi:'MSI',tmb:'TMB',pdl1:'PD-L1',immune:'Contexte immunitaire',qc:'L’IHC et l’évaluation MSI/TMB basée sur l’ADN sont techniquement interprétables.'}
};
function applyCasePresentation(){
  const c=caseObj(); if(!c)return;
  const t=T(),r=RESULT_COPY[lang()]||RESULT_COPY.de;
  c.story=caseStory(t);
  c.result_sections=[
    {label:r.mmr,test_any:['mmr_ihc'],result:t.results.mmr},
    {label:r.msi,test_any:['msi_pcr_ngs','broad_pan_panel'],result:t.results.msi},
    {label:r.tmb,test_any:['tmb_ngs','broad_pan_panel'],result:t.results.tmb},
    {label:r.pdl1,test_any:['pdl1'],result:t.results.pdl1},
    {label:r.immune,test_any:['immune_context_ihc'],result:t.results.immune}
  ];
  c.always_findings=[['QC',r.qc]];
  try{
    const d=(typeof DEEP_DIVE_MAP_V17!=='undefined')?DEEP_DIVE_MAP_V17[IO20_CASE]:null;
    if(d){
      d.case_briefing=t.briefing;
      d.context_cards=t.cards;
      d.pre_results=t.pre;
      d.material_or_resource_constraints=t.constraints;
      d.decision_task=t.decision;
      d.twist=t.twist;
      const q=Array.isArray(d.reasoning_gate_upgrade)?d.reasoning_gate_upgrade.find(x=>x&&x.id==='msh2_msh6_linch'):null;
      if(q)q.prompt=t.gatePrompt;
    }
  }catch(_){ }
}
function asset(title,src,cls=''){
  return `<figure class="io20-asset ${cls}"><figcaption>${esc2(title)}</figcaption><a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc2(title)}"></a><div class="io20-prov">${esc2(T().synthetic)}</div></figure>`;
}
function block(title,body,badge='FLAGSHIP'){
  return `<div class="io20-block"><div class="io20-head"><h4>${esc2(title)}</h4><span class="io20-pill">${esc2(badge)}</span></div>${body}</div>`;
}
function grid(items,wide=false){return `<div class="io20-grid ${wide?'single':''}">${items.join('')}</div>`}
function baselineAddon(step){
  const t=T();
  if(step==='intake')return block(t.intake,grid([asset(t.referral,IO20_ASSETS.referral,'doc')],true),'CASE FILE');
  if(step==='histo')return block(t.histo,grid([asset(t.heOverview,IO20_ASSETS.heOverview),asset(t.heDetail,IO20_ASSETS.heDetail)]),'HISTOLOGY');
  return '';
}
function reportAddon(){
  const t=T(),items=[];
  if(hasMMR())items.push(asset(t.mmr,IO20_ASSETS.mmr,'wide'));
  if(hasImmune())items.push(asset(t.immune,IO20_ASSETS.immune,'wide'));
  if(hasMSI())items.push(asset(t.msi,IO20_ASSETS.msi,'wide'));
  if(hasTMB())items.push(asset(t.tmb,IO20_ASSETS.tmb,'wide'));
  if(hasPDL1())items.push(asset(t.pdl1,IO20_ASSETS.pdl1,'wide'));
  return items.length?block(t.evidence,grid(items,true),'TEST-GATED'):'';
}
function finalAddon(){return finalImageReady()?block(T().finalTitle,grid([asset(T().final,IO20_ASSETS.final,'wide')],true),'FINAL MTB'):''}
function injectBeforeSectionEnd(html,addon){
  if(!addon||typeof html!=='string')return html;
  const pos=html.lastIndexOf('</section>');
  return pos>=0?html.slice(0,pos)+addon+html.slice(pos):html+addon;
}

/* Keep the curated endometrial identity and no-leak Deep-Dive presentation in force immediately before each active rendering/build step. */
const PREV_BUILD=buildReport;
buildReport=function(){applyCasePresentation();return PREV_BUILD.apply(this,arguments)};
try{window.buildReport=buildReport}catch(_){ }

const PREV_CONTENT=renderContent;
renderContent=function(){
  applyCasePresentation();
  let html=PREV_CONTENT.apply(this,arguments);
  if(!active())return html;
  return injectBeforeSectionEnd(html,baselineAddon(currentStep()));
};
try{window.renderContent=renderContent}catch(_){ }

const PREV_REPORT=renderReport;
renderReport=function(){
  applyCasePresentation();
  let html=PREV_REPORT.apply(this,arguments);
  if(!active())return html;
  return injectBeforeSectionEnd(html,reportAddon());
};
try{window.renderReport=renderReport}catch(_){ }

const PREV_MTB=renderMtb;
renderMtb=function(){
  applyCasePresentation();
  let html=PREV_MTB.apply(this,arguments);
  if(!active())return html;
  return injectBeforeSectionEnd(html,finalAddon());
};
try{window.renderMtb=renderMtb}catch(_){ }

function styles(){
  if(document.getElementById('io20FlagshipStyles'))return;
  const s=document.createElement('style');s.id='io20FlagshipStyles';s.textContent=`
  #v20bVersion{font-size:0!important}#v20bVersion::after{content:'v2.4.0z20'!important;font-size:.72rem!important;line-height:1.1}
  .io20-block{border:1px solid var(--line,#d7e2ea);border-radius:18px;background:#fff;padding:14px;margin:14px 0;box-shadow:0 8px 22px rgba(15,35,55,.045)}
  .io20-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.io20-head h4{margin:0;color:var(--primary,#0f4c75)}
  .io20-pill{display:inline-flex;align-items:center;border-radius:999px;padding:4px 8px;background:#eef6fb;color:#0f4c75;border:1px solid #cfe0ec;font-size:.69rem;font-weight:900;letter-spacing:.04em}
  .io20-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.io20-grid.single{grid-template-columns:1fr}.io20-grid .wide{grid-column:1/-1}
  .io20-asset{margin:0;border:1px solid #d8e4ef;border-radius:14px;overflow:hidden;background:#f8fbfc}.io20-asset figcaption{font-weight:900;color:#102a43;padding:10px 12px;background:#fff;border-bottom:1px solid #d8e4ef}.io20-asset a{display:block;background:#f2f6f9}.io20-asset img{width:100%;height:auto;display:block;object-fit:contain}.io20-asset.doc img{max-height:900px;object-fit:contain}.io20-prov{font-size:.68rem;color:#69798d;padding:7px 10px;background:#fff;border-top:1px solid #e6edf3}
  @media(max-width:1000px){.io20-grid{grid-template-columns:1fr}.io20-grid .wide{grid-column:auto}.io20-asset.doc img{max-height:none}}
  `;document.head.appendChild(s);
}
function stamp(){
  try{
    window.MOLPATH_APP_VERSION=IO20_VERSION;document.title='MolPath Simulator '+IO20_VERSION;
    const els=[document.getElementById('v20bVersion'),document.getElementById('versionBadge'),...document.querySelectorAll('.v20b-topstatus .v20b-pill.primary')].filter(Boolean);
    els.forEach(el=>{el.setAttribute('data-i18n-skip','1');if(el.id!=='v20bVersion')el.textContent=IO20_VERSION});
  }catch(_){ }
}
const PREV_RENDER=render;
render=function(){applyCasePresentation();const out=PREV_RENDER.apply(this,arguments);applyCasePresentation();stamp();return out};
try{window.render=render}catch(_){ }
const PREV_I18N_AFTER=window.MolPathI18nAfterApply;
window.MolPathI18nAfterApply=function(l){try{if(typeof PREV_I18N_AFTER==='function')PREV_I18N_AFTER(l)}catch(_){ }applyCasePresentation();stamp();};
function boot(){styles();applyCasePresentation();stamp();try{if(typeof render==='function')render()}catch(err){console.error(IO20_VERSION+' IO_001 flagship boot failed',err)}setTimeout(stamp,100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);

window.MolPathIO001Flagship=Object.freeze({
  version:IO20_VERSION,base:'v2.4.0z19',caseId:IO20_CASE,assetCount:9,
  baseline:{intake:['gyn-oncology referral'],histo:['H&E overview','H&E TIL-rich detail']},
  testGated:{mmr_ihc:['MMR 4-plex IHC'],immune_context_ihc:['CD3/CD8 IHC'],msi_pcr_ngs_or_broad:['MSI-H report'],tmb_ngs_or_broad:['TMB report'],pdl1:['PD-L1 IHC'],finalized_all_visible_evidence:['integrated MTB final report']},
  coreCompletionPreserved:['mmr_ihc','msi_pcr_ngs|broad_pan_panel','tmb_ngs|broad_pan_panel'],
  finalImageEvidence:['mmr_ihc','msi_pcr_ngs|broad_pan_panel','tmb_ngs|broad_pan_panel','pdl1','immune_context_ihc','state.finalized'],
  guardrail:'broad_pan_panel unlocks MSI and TMB only; it never unlocks MMR IHC, PD-L1 or CD3/CD8. The integrated image is stricter than core completion because the approved image visibly contains all five result layers.'
});
})();
