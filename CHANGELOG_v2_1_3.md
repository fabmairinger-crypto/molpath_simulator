# CHANGELOG v2.1.3 – Complex Phase + CRC Bundle Logic Patch

Date: 2026-05-21T14:14:47

Basis: `v2.1.1 Batch1 Content Fix` plus the stable v2.0b.5 layout/branding layer already included there. The earlier v2.1.2 Ovar phase prototype is superseded by this cleaner multi-phase implementation.

## Änderungen

### Ovar / HGSOC BRCA-HRD-Fall
- Implementiert als echter zweirundiger Complex-Fall.
- Runde 1: Primärdiagnostik am alten FFPE-Material mit Tumor-BRCA/HRR + HRD/genomic scar.
- Der Artefaktverdacht erscheint erst als Laborbefund nach Runde 1, nicht bereits als Voraussetzung im Fallstart.
- Zwischenentscheidung ergänzt: Befund als ausreichend akzeptieren oder als nicht zuverlässig einstufen.
- Runde 2 bleibt bis zur Entscheidung „nicht reliable / Bestätigung nötig“ verborgen.
- Runde 2: Liquid Biopsy / ctDNA-BRCA als empfohlene Bestätigungsstrategie.
- Liquid Biopsy wird in Runde 2 phasenspezifisch bewertet: korrekte Eskalation, kein primärer Budget-Killer.
- TAT wird in Runde 2 als diagnostische Erweiterung sichtbar gemacht.
- Finaler MTB-Bericht enthält Mehrphasen-Timeline.

### CRC / mCRC RAS-BRAF-MMR-MSI-Fall
- Alternative Bundle-Logik ergänzt.
- Fokussierter Routinepfad und breites validiertes NGS-Panel werden als valide Alternativpfade behandelt.
- Breites Panel inkl. RAS/BRAF/MSI/TMB + MMR-IHC + MLH1-Einordnung wird nicht mehr als Budgetfalle bestraft.
- TMB-only wird weiterhin als unvollständig / low-value behandelt.
- Befundlogik und Dozentenlösung entsprechend angepasst.

### Engine
- Allgemeiner erster Multi-Phase-Complex-Mechanismus für spätere Complex-/Planspiel-Fälle vorbereitet.
- Phasenspezifische Method Rules, Budgets und TAT-Bewertung für den Ovar-Fall eingeführt.
- Versteckte Folgephasen / bedingtes Unlocking umgesetzt.

## Nicht geändert
- Keine Fälle entfernt.
- Keine Kurse entfernt.
- Berichte, Teaching Sheets, Kursbericht, Methodenkatalog, Moduslogik und Layout bleiben erhalten.
