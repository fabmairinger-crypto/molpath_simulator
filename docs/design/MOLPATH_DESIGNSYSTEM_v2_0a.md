# MolPath Simulator v2.0a – Designsystem

**Version:** v2.0a  
**Status:** Designbrief / Spezifikation, noch kein App-Patch  
**Basis:** v1.8e QA-Freeze  
**Ziel:** UI-/UX-Refresh auf stabiler Engine-Basis ohne Änderung an Falllogik, Scoring, Kurslogik oder Datenmodell.

---

## 1. Leitidee

Der MolPath Simulator soll wirken wie eine moderne medizinische Lern- und Entscheidungssimulation für:

- molekularpathologische Patientenversorgung / Tumorboard-Entscheidungen
- Laborleitung, QM, LIMS, CAPA und Audit-Situationen
- translationale Forschung, Hypothesenbildung, Studiendesign und Omics-Interpretation

Der Look soll seriös, medizinisch, hochwertig und didaktisch klar sein.

**Designrichtung:** Premium Medical Learning Cockpit

Nicht verspielt, nicht übermäßig „Game“, sondern eine Mischung aus:

- klinischem Dashboard
- Fortbildungsplattform
- molekularpathologischem Entscheidungs-Cockpit
- Dozenten-/Assessment-Tool

---

## 2. Nicht-Ziele für v2.0

v2.0 ist ein UX-/Design-Refresh. Die stabile Engine aus v1.8e bleibt unangetastet.

Nicht ändern:

- keine neue Engine-Architektur
- keine neuen Fälle
- keine Änderung an Scoring, Score-Caps oder Method Rules
- keine Änderung an Clinical-Reasoning-Gates
- keine Änderung an Kurslogik
- keine Server-/Login-/Datenbankfunktion
- keine React-/Next.js-Migration
- keine echte PDF-Engine
- keine SCORM-/LMS-Anbindung

---

## 3. Farbwelt

### 3.1 Grundpalette

| Token | Wert | Einsatz |
|---|---:|---|
| `--mp-bg` | `#F6F8FA` | App-Hintergrund |
| `--mp-surface` | `#FFFFFF` | Cards / Panels |
| `--mp-surface-soft` | `#F9FBFC` | leicht abgesetzte Flächen |
| `--mp-border` | `#DCE3E8` | feine Linien |
| `--mp-text` | `#1F2933` | Haupttext |
| `--mp-text-soft` | `#52616B` | Sekundärtext |
| `--mp-muted` | `#8A98A5` | Metadaten |
| `--mp-primary` | `#0E4F5C` | Primärfarbe Petrol |
| `--mp-primary-2` | `#0B6B78` | Hover / sekundäre Primärfarbe |
| `--mp-primary-soft` | `#E4F2F4` | helle Akzentfläche |
| `--mp-success` | `#2E7D5B` | richtige Entscheidungen |
| `--mp-success-soft` | `#E8F4EE` | Erfolgsboxen |
| `--mp-warning` | `#B7791F` | Warnungen / low value |
| `--mp-warning-soft` | `#FFF4D8` | Warnboxen |
| `--mp-danger` | `#B23A48` | critical / misleading |
| `--mp-danger-soft` | `#FCE8EB` | Fehlerboxen |

### 3.2 Domänenfarben

| Domäne | Token | Wert | Wirkung |
|---|---|---:|---|
| MTB | `--mp-domain-mtb` | `#2563EB` | klinische Versorgung |
| QM/Labor | `--mp-domain-lab` | `#D97706` | Prozess, Risiko, CAPA |
| RES | `--mp-domain-res` | `#7C3AED` | Forschung, Projektplanung |
| MET | `--mp-domain-met` | `#0891B2` | Methodik / Bioanalytik |

### 3.3 Modusfarben

| Modus | Token | Wert | Wirkung |
|---|---|---:|---|
| Lernmodus | `--mp-mode-learning` | `#0E4F5C` | erklärend |
| Training | `--mp-mode-training` | `#2563EB` | fokussiert |
| Assessment | `--mp-mode-assessment` | `#374151` | nüchtern / prüfungsartig |
| Dozentenmodus | `--mp-mode-instructor` | `#7C3AED` | Instructor-Cockpit |

---

## 4. Typografie

Empfohlen: Systemfont-Stack für robuste Offline-/HTML-Nutzung.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Größen

| Zweck | Größe | Gewicht |
|---|---:|---:|
| App-Titel | 24–28 px | 700 |
| Seitentitel | 22–24 px | 700 |
| Section Header | 16–18 px | 700 |
| Card Title | 15–16 px | 700 |
| Body | 14 px | 400 |
| Small / Meta | 12–13 px | 400–500 |
| Badge | 11–12 px | 600 |

---

## 5. Layout-Grundstruktur

### 5.1 Desktop-first Layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Header: Logo · MolPath Simulator · Version · Session Status  │
├──────────────────────┬───────────────────────────────────────┤
│ Sidebar              │ Main Panel                            │
│                      │                                       │
│ Nutzungsmodus        │ Dashboard / Fallansicht / Berichte    │
│ Arbeitsmodus         │                                       │
│ Kurs / Fallauswahl   │                                       │
│ Suche / Filter       │                                       │
│ Aktionen / Export    │                                       │
│ Kontakt              │                                       │
└──────────────────────┴───────────────────────────────────────┘
```

### 5.2 Sidebar

Breite: ca. 320–360 px.

Reihenfolge:

1. Logo / App-Name
2. Nutzungsmodus: Lernen / Training / Assessment / Dozent
3. Arbeitsmodus: Freies Spielen / Kursmodus
4. Kursauswahl oder Fallbibliothek
5. Suche / Filter
6. Aktionen / Berichte / Export
7. Kontakt / Herausgeber

Prinzipien:

- Modus und Arbeitsmodus immer oben sichtbar
- Fallliste scrollbar
- Aktionen klar gruppiert
- Kontakt/Herausgeber unten als ruhiger Block

---

## 6. Start-/Dashboard-Screen

Eine echte Startseite soll den Einstieg emotional und didaktisch klarer machen.

### Struktur

```text
MolPath Simulator
Molekularpathologische Entscheidungs- und Fallsimulation

[Freies Spielen starten] [Kurs auswählen] [Dozentenmodus]

MTB Simulator     QM/Labor Simulator     RES Simulator
```

### Einstiegskarten

| Karte | Inhalt |
|---|---|
| MTB Simulator | Patientenversorgung, Anforderung, Befund, Tumorboard |
| QM / Labor Simulator | Run, QC, CAPA, Audit, Freigabe |
| RES Simulator | Hypothese, Studiendesign, Omics, Ethik |

Statuszeile:

```text
91 Fälle · 8 Signature Cases · 5 Kurse · v2.0 Designsystem
```

---

## 7. Fallkarten

### 7.1 Ziel

Fallkarten sollen schneller scannbar, hochwertiger und informativer sein.

### 7.2 Struktur

```text
[Signature] [MTB] [Standard] [Intermediate]

Metastasiertes NSCLC, kleine Biopsie
Treiberdiagnostik · RNA-Fusion · PD-L1 · Materialschutz

⏱ 10–15 min
Kurs: MTB Basics
Status: offen / abgeschlossen / zuletzt 84 %
```

### 7.3 Badges

| Badge | Bedeutung |
|---|---|
| Signature Case | kuratierter Deep Dive |
| Mini / Standard / Complex / Planspiel | Dauer |
| Beginner / Intermediate / Advanced / Expert | Schwierigkeit |
| MTB / QM / RES / MET | Domäne |
| Kursfall | Teil eines Lernpfads |
| abgeschlossen | lokaler Fortschritt |

---

## 8. Fallführung / Stepper

Oben im Hauptbereich soll ein domänenspezifischer Stepper stehen.

### MTB

```text
Fallakte → Kontext → Reasoning → Anforderung → Befund → Debrief
```

### QM / Labor

```text
Run → QC → Entscheidung → CAPA → Audit → Debrief
```

### RES

```text
Idee → Kontext → Hypothese → Design → Analyse → Debrief
```

Stepper-Regeln:

- aktueller Schritt prominent
- erledigte Schritte dezent markiert
- Assessment-Modus ohne Lösungshinweise
- Dozentenmodus darf Musterpfad sichtbar machen

---

## 9. Komponenten

### 9.1 Cards

- weißer Hintergrund
- Radius 18–20 px
- dezenter Schatten
- feine Border
- großzügige Innenabstände

```css
.mp-card {
  background: var(--mp-surface);
  border: 1px solid var(--mp-border);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  padding: 18px;
}
```

### 9.2 Buttons

Primärbutton:

- Petrol
- weiße Schrift
- klarer Hover
- nicht zu hohe Sättigung

Sekundärbutton:

- weiße Fläche
- Border
- Petrol-Text

Danger/Warning Buttons sparsam.

### 9.3 Badges

Klein, farbcodiert, konsistent.

```css
.mp-badge {
  border-radius: 999px;
  padding: 4px 9px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .01em;
}
```

### 9.4 Alert-Boxen

| Typ | Einsatz |
|---|---|
| Info | neutrale Hinweise |
| Learning | Lernmodus-Hinweise |
| Warning | Pitfalls / low value |
| Critical | Score-Caps / fatal decisions |
| Success | richtige Lösung / bestandene Gates |

---

## 10. Modusabhängiges Design

| Modus | Optische Wirkung |
|---|---|
| Lernmodus | freundlich, erklärend, Hinweise sichtbar |
| Trainingsmodus | reduzierter, fokussierter |
| Assessment | nüchterner, prüfungsartiger, keine Hilfen |
| Dozentenmodus | Cockpit-artig, Musterlösung/Bewertung sichtbar |

Umsetzung:

- Header-Badge für Modus
- leichte Akzentleiste in Modusfarbe
- keine komplette Layoutänderung je Modus

---

## 11. Berichte und Teaching Sheets

Logik aus v1.8 bleibt. v2.0 poliert nur Optik.

### Fallbericht

- professioneller Ergebnisbericht
- Score prominent
- Domänenprofil sauber
- Score-Caps verständlich
- Browser-PDF-tauglich

### Dozentenbericht

- Instructor-Cockpit-Look
- Musterpfad, Gates, Method Rules, Score-Caps
- typische Fehlentscheidungen
- Diskussionsfragen

### Teaching Sheet

- einseitiges Handout
- klare Blöcke
- druckfreundlich
- Signature Cases besonders reichhaltig

### Kursbericht

- Lernprofil
- Fortschritt
- Domänenprofil
- Lernempfehlungen

---

## 12. Responsive Verhalten

Desktop first.

Minimalanforderungen:

- Layout ab ca. 1100 px optimal
- unter 900 px Sidebar oben oder einklappbar
- Berichte druckfreundlich
- keine Mobile-App-Optimierung in v2.0 notwendig

---

## 13. v2.0 Implementierungsreihenfolge

### v2.0b – Layout-Patch

- neue Startseite
- Header / Branding
- Sidebar neu sortiert
- Fallkarten neu
- Kursdashboard optisch verbessert

### v2.0c – Fallansicht-Patch

- Stepper
- Kontextkarten schöner
- Reasoning-Gates optisch verbessert
- Methodenwahl ruhiger
- Ergebnis/Debrief klarer

### v2.0d – Report-Polish

- Fallbericht
- Dozentenbericht
- Teaching Sheet
- Kursbericht

### v2.0e – QA-Freeze

- Changelog
- QA-Report
- Manifest
- stabiler v2.0-Endstand

---

## 14. Akzeptanzkriterien

v2.0 gilt als erfolgreich, wenn:

- die App weiterhin alle v1.8e-Funktionen vollständig enthält
- keine Fall-, Kurs- oder Scoring-Logik entfernt wurde
- Moduswahl und Arbeitsmodus sofort sichtbar sind
- Fallkarten schneller erfassbar sind
- Signature Cases klar erkennbar sind
- Fallführung durch Stepper klarer wird
- Berichte weiterhin druckbar sind
- Assessment-Modus keine Lösungshinweise leakt
- Dozentenmodus Musterlösung und Bewertung klar sichtbar macht

---

## 15. Entscheidung

Festgelegt für v2.0:

```text
Designrichtung:
Premium Medical Learning Cockpit

Grundfarben:
Petrol / Blaugrün + helle Cards

Domänenfarben:
MTB Blau
QM Amber/Orange
RES Violett
MET Türkis

Layout:
Header + linke Sidebar + großer Main-Bereich

Neue Startseite:
ja

Stepper:
ja, abhängig von MTB/QM/RES

Reports:
optisch polieren, Logik aus v1.8 behalten
```
