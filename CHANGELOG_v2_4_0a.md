# MolPath v2.4.0a – NSCLC Premium Pilot Patch

## Ziel
Integration des ersten Premium-Piloten für `MTB_NSCLC_001_v0_6` auf Basis der bestehenden Deep-Dive-Logik, ohne Änderung der Fallmechanik.

## Geänderte Runtime-Dateien
- `index.html`
- neue statische Assets unter `assets/mtb_nsclc_001/`

## Inhalt
- Premium-Integration nur für `MTB_NSCLC_001_v0_6`
- Intake: rosa Ü-/Anforderungsschein + CT-Thorax-Kontextbild
- History: dynamische diagnostische Timeline
- Histo: HE Übersicht, HE Detail, TTF-1, Napsin A, p40
- Material: native Material/QC-Card
- Report/MTB: dynamische Result Cards (Material/QC, PD-L1, DNA-NGS, RNA-Fusionspanel) + Timeline

## Bewusst nicht geändert
- keine redaktionelle Neuschreibung des Deep Dive
- keine neue Auswahlmechanik
- keine vorwegnehmende Molekularanforderung
- keine Änderung der bestehenden Scoring-/Reasoning-Logik

## Bekannte Grenzen
- CT aktuell als Crop aus dem bereits freigegebenen Kompositbild integriert; kann später bei Bedarf als eigenständiges Einzelasset ersetzt werden.
- Result Cards sind native HTML/CSS-Komponenten; die früher erzeugten Card-Bilder dienen nur noch als Designreferenz.
