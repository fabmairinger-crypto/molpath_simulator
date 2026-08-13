# MolPath Simulator v2.4.0w — LAB Block 3 / C3 Postanalytik, Bioinformatik & Befundfreigabe

## Basis
- Exakte Ausgangsbasis: **v2.4.0v APPROVED**.
- Patch-only: geändert wird ausschließlich `index.html`; Metadateien dieses Pakets sind neu.
- C1 und C2 aus v2.4.0u/v bleiben unverändert.
- Patientenversorgung / MTB + MET bleibt unverändert bei **42/42 Deep Dive, vollständig übersetzt**.

## LAB Block 3 — C3 Postanalytik / Bioinformatik / Befundfreigabe
`LAB_POST_001` ist bereits kuratierter Signature-Deep-Dive und bleibt unverändert. Neu ausgebaut:
1. `LAB_POST_002_v1_3` — ClinVar/COSMIC-Provenienz / reproduzierbarer Wissensstand / Impact-Analyse
2. `LAB_POST_003_v1_3` — Auto-Report overcallt VUS als actionable / variantenspezifische Evidenz / Human Oversight / Software-Scope
3. `LAB_POST_004_v1_3` — „alles negativ“ / Scope eines Negativbefunds / nicht getestet ≠ negativ / klinische Restwahrscheinlichkeit
4. `LAB_POST_005_v1_3` — klinisch kritische Coverage-Lücke / regionsspezifische QC / differenzierte Freigabe / gezielte Nachtestung

## Didaktische Schärfung
- C3 trennt konsequent technische Analytik, postanalytische Interpretation und klinische Aussage.
- `LAB_POST_002`: historische Reproduzierbarkeit wird von heutiger Reannotation getrennt.
- `LAB_POST_003`: orthogonale Bestätigung macht eine VUS nicht automatisch actionable; der Twist deckt eine systematische codonbasierte Fehlregel auf.
- `LAB_POST_004`: Negativaussage wird an validierten Scope, Material und Sensitivität gebunden; bei klinisch hoher Restwahrscheinlichkeit folgt gezielte Zusatzdiagnostik.
- `LAB_POST_005`: Global-PASS darf eine kritische lokale Coverage-Lücke nicht verdecken; der Twist macht aus dem Einzelfall ein wiederkehrendes Target-/Assayproblem.

## Status nach Patch
- LAB: **17/27 Deep Dive**
- neu in diesem Patch: **4**
- LAB verbleibend: **10**
- Gesamtbestand Deep Dive: **63/91**
- Signature Cases: **15/15 unverändert**

## Internationalisierung
- Deutscher LAB-Master, Block 3.
- Bestehende Übersetzungen bleiben unberührt.
- LAB EN/RO/EL/ES/FR weiterhin gebündelt nach 27/27 Content-Freeze.

## Nicht geändert
- `LAB_POST_001` Signature-Deep-Dive
- MTB/MET-Logik oder -Übersetzungen
- UI-Architektur
- Assets
- bestehende Übersetzungsregistries
