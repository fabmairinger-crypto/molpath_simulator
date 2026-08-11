# MolPath v2.4.0b – NSCLC Premium Hotfix

## Fehlerursache v2.4.0a
Die Premium-Schicht prüfte `window.activeCase` / `window.state`. Die Runtime deklariert `activeCase` und `state` jedoch als globale `let`-Bindings; sie liegen deshalb nicht auf `window`. Dadurch war die Premium-Bedingung immer false und keine der neuen Komponenten wurde gerendert.

## Fix
- direkter Zugriff auf die bestehenden Runtime-Bindings `activeCase` und `state`
- Overrides der bestehenden Deep-Dive-/Report-Renderer als direkte globale Bindings
- NSCLC-Ergebnislogik nutzt die etablierten Helper `hasNsclcDNA()`, `hasNsclcRNA()` und `has()`
- statische Bildassets auf WebP optimiert, um Lade-/Renderkosten deutlich zu reduzieren
- Initial-Render wird nur ausgelöst, wenn beim Laden bereits `MTB_NSCLC_001_v0_6` aktiv ist

## Inhalt unverändert
Keine Änderung an Deep-Dive-Texten, Gates, Methodenauswahl, Scores oder Follow-up-Mechanik.
