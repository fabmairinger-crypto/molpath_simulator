# MolPath — verifizierter Übergabestand 2026-10-05

Basis: vollständiger A6.10-Build, vom Nutzer bestätigt („sieht gut aus alles“). Neuer Stand: A6.11 Integration Candidate; Browsercheck beim Nutzer offen.

A6.10 ergänzt den OVAR1-Fall MTB_OVAR_001_v0_7 um die vier vorher ausdrücklich freigegebenen Fragen: zwei nach Material vor Runde 1, zwei nach vollständigem Zwischenbefund vor Akzeptieren/Nachfordern. Alle elf Sprachen, pro Versuch gemischte Antwortpositionen, getrennte Abgaben. Bestätigter Optimalpfad mit korrekten Gates erreicht 100 %. Fachliche Gate-Definitionen sind abgeschlossen.

A6.11 ersetzt ausschließlich index.html. Es entfernt belegte leere Versions-Hooks sowie den deaktivierten z12-Wrapper/Bootstrap. Die A6.10-Canonical-Datei und rc2_A6_10_ovar_reasoning_gates.js bleiben erforderlich und unverändert. index.html SHA256: `257c5aea926df79a7b5f101ed201f6cfbc1cb69f9c4b130ad068727ff4191b89`. Basis-Hash: `171093b0c187644e039714ae3a4b6db57f8f164a36c5edde03f5d8111c54e663`.

Bestände: 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, 5 Kurse, 23 eindeutige Kursfälle. App-Version bleibt v2.6.0-rc1. Canonical ist die fachliche Datenautorität. Die späte Integration und Signature-Freeze bleiben aktiv. Historische Runtime-Teile sind im aktuellen index eingebettet; eine früher extrahierte legacy_v223_v224_runtime.js ist keine separat geladene Datei dieser Fixture.

Arbeitsregeln: immer tatsächliche aktuelle Dateien und Aufrufpfade prüfen; keine Änderungen aus Erinnerung oder auf Verdacht. Fachliche Gate-Änderungen vorab mit Fabian abstimmen. Bei Fachtext-/Label-Änderungen alle elf Sprachen berücksichtigen. Minimale Delta-Payload, Apply-Anleitung, QA, Changelog, Manifest und Prüfsummen liefern.

Verifikation A6.11: 434 Source-, 54 Vergleichs-, 100 Syntax-, 254 Runtime-, 720 Gate- und 77 CRC/LAB-/Stabilitätschecks bestanden. Kontrollierte Aufrufzahlen, keine echten Browserzeiten. Binäre Assets/FOM nicht im Delta und nicht visuell geprüft. Die ausführbare Fixture nutzt verifizierte Einzeluploads und vorangegangene Deltas; die große Original-Archivmaterialisierung war früher durch HTTP 502 blockiert.

Nächster Schritt: A6.11-Browsercheck bestätigen. Danach die weiterhin aktiven Render-/UI-Ketten separat inventarisieren und nur belegte Redundanzen bearbeiten. Aktive Render-, i18n-, Premium-DOM- oder Asset-Hooks wurden noch nicht zusammengelegt; jede weitere Vereinfachung benötigt eine gesonderte Quellen- und Verhaltensprüfung. Neue fachliche Gates vorab mit Fabian abstimmen. Konkrete Quellen: Manifest, QA, operations.json, edit_specs.json, runtime_inventory.json und Ergebnisdateien in diesem Paket.
