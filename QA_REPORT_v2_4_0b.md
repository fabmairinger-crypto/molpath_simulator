# QA v2.4.0b – NSCLC Premium Hotfix

## Gefundene Ursache
`activeCase` und `state` werden in der bestehenden Runtime mit `let` deklariert. v2.4.0a prüfte fälschlich `window.activeCase` / `window.state`. Dadurch war die Premium-Aktivierungsbedingung immer false.

## Korrekturen
- direkter Zugriff auf `activeCase` / `state`
- direkte Overrides der bestehenden globalen Renderer-Bindings
- bestehende Helper `hasNsclcDNA()`, `hasNsclcRNA()` und `has()` für dynamische Result-Visibility verwendet
- 8 Bildassets von ~18 MB PNG auf ~3.0 MB WebP optimiert
- zusätzlicher Initial-Render nur, wenn NSCLC 001 beim Laden aktiv ist

## Static QA
- 33/33 ausführbare Inline-Scriptblöcke: `node --check` PASS
- Premium-Patchscript genau 1x vorhanden
- 8/8 erwartete WebP-Assets im Patchpaket
- keine Änderung an Deep-Dive-Payload, Gates, Scoring oder Methodenauswahl

## Manueller Smoke-Test
1. NSCLC 001 öffnen
2. Intake: rosa Ü-Schein + CT
3. History: dynamische Timeline
4. Histo: HE/TTF-1/Napsin A/p40; kein PD-L1-Spoiler
5. Material: native QC-Card
6. Methodenauswahl unverändert
7. Report: Result Cards abhängig von tatsächlicher Auswahl
8. RNA-Nachforderung: RNA-Card erst nach Ergänzung
