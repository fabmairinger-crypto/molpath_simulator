# MolPath rc2-clean A6.3

Stand: 2026-10-02. Basis: funktionierender vollständiger rc2-A6.2-Build. Status: **Integration Candidate; Browser-Smoke offen**.

Die sichtbare Top-Version, der Tabtitel und `window.MOLPATH_APP_VERSION` werden ausschließlich aus `MolPathVersion.app` gesetzt. Der vorhandene App-Wert bleibt `v2.6.0-rc1`; A6.3 bezeichnet den internen Integrationsschritt. Alte Versionsstamps und direkte Versionszuweisungen sind an ihren Quellen stillgelegt. CSS, das den Versionswert versteckt oder per Pseudoelement vortäuscht, ist entfernt. Die übrigen Styles bleiben erhalten. Die bestehende Fallkategorie im Hero bleibt erhalten.

Die sechs Hybridmodule z13/CRC2, z14/CRC1, z15/NSCLC2, z16/MET_NGS3, z18/OVAR2 und z20/IO1 schreiben ihre Sprach- und Anzeigeinhalte in getrennte Anzeigekopien. Tests, Gruppen, Antwortschlüssel, Score-Werte und Taxonomie stammen weiter aus A4b/A5. Die vorhandenen lokalisierten COPY-Blöcke, Assetregistries, Berichtshelfer und Renderketten bleiben erhalten. Zwei bestehende Legacy-Sprachhelfer lesen ebenfalls diese Anzeigekopien.

Die Präsentationsfunktionen liegen im bestehenden A5-Adapter. Dessen Definitionen laden einmal direkt nach der Versionsquelle; der Canonical-Build wird weiterhin erst im bestehenden A6-Integrationspunkt aufgerufen. Die kanonischen Daten werden dort einmal abgeglichen. Signature Freeze bleibt der letzte externe Loader. Es gibt keinen neuen Observer und keinen zusätzlichen abschließenden Render-Wrapper; der vorhandene Basisrenderer liest die Anzeigekopie und aktualisiert die zentrale Versionsanzeige.

Die dokumentierte 12-Fälle-Kuration ist bereits vollständig in A4b enthalten. Wiederholte Datenänderungen aus dem Curation-Modul entfallen nach der Canonical-Integration. Wörterbuch und Report-/Methodenlogik bleiben erhalten. Ein rekursiver Pfad `AfterApply -> applyAll -> mergeI18n -> applyNow -> AfterApply` ist durch Entfernen des Apply-Aufrufs aus der Wörterbuchregistrierung beseitigt. Der bestehende Apply-Aufruf beim Start bleibt erhalten.

Unverändert bleiben A4b, Kurs- und Methods-Focus-Registry, Methods-Filter, Signature Freeze, Home-Screen, Asset-Modal und Sprachdateien. Die vier verifizierten Metadatenkorrekturen und historischen V15-Duplikate bleiben exakt kanonisch erhalten.

Validierung: 265/265 Quellprüfungen, 99 JavaScript-Syntaxprüfungen, 254/254 Runtime-Prüfungen; keine Runtime-Exceptions oder Timeouts. Gezählt: 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods-Focus-Fälle, 5 Kurse mit 23 eindeutigen Fällen. Elf Sprachen plus Rückkehr zu Deutsch; sechs Berichtswege in DE/EN/RO/UK. Details und Grenzen stehen im QA-Bericht.

24 Laufzeitdateien ändern sich; insgesamt 9.331 Bytes weniger Quelltext. Das ZIP enthält zusätzlich Manifest, Prüfsummen, Apply-/Rollback-Anleitung und reproduzierbare QA-Runner.
