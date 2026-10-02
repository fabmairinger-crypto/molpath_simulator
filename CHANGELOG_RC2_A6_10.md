# MolPath rc2 A6.10 — OVAR1 Clinical Reasoning

Der OVAR-Sonderablauf enthielt bislang keinen Reasoning-Schritt, während die Bewertung die Gate-Abgabe weiterhin verlangte. Dadurch wurde selbst der vollständige bestätigte Pfad durch ein unerreichbares Gate auf 80 % begrenzt.

Die vier vom Nutzer freigegebenen Fragen stehen jetzt an zwei Zeitpunkten: klinische Frage (SC) und altes FFPE-Material (MS) nach Materialprüfung vor Runde 1; BRCA1-Nachweisbewertung (SC) und Bestätigungsstrategie (SC) nach dem vollständigen Zwischenbefund vor Akzeptieren/Nachfordern. Fragen, Optionen und Lösungsschlüssel sind im Canonical-Record hinterlegt. Die Fragen aus dem späteren Befund werden vor dem tatsächlich ausgeführten Laborlauf und der Befundansicht nicht angezeigt.

Eine eigenständige OVAR-Komponente verwaltet die beiden Abgaben, die Navigation und die Anzeige. Die vorhandenen Funktionen delegieren ausschließlich für OVAR1 an sie. Keine neuen Wrapper, Timer oder Observer. Alle elf Sprachen enthalten die neuen Fragen, Optionen, Begründungen und Gate-Bedienelemente. Antwortpositionen werden pro Versuch gemischt; IDs, Antworten und Reihenfolge bleiben beim Sprachwechsel stabil. Assessment zeigt Lösungen nach Abschluss, der Dozentenmodus behält seinen bisherigen Navigations-Bypass.

Direkte Entscheidungsklicks und Navigation können offene Gates nicht überspringen. Ein neuer Runde-1-Lauf setzt nur das spätere Gate zurück. Eine Antwortänderung hebt nur die Abgabe des betroffenen Gates auf. Falsche Antworten erlauben weiterhin Fortschritt; die bestehenden Bewertungsregeln greifen. Das vollständige bestätigte Ergebnis erreicht bei korrekten Gates wieder 100 %. Frühes Akzeptieren bleibt bei 62 %, ein unbestätigter Abschluss bei 78 % Rohscore/70 % Gesamtscore; vollständig falsche Gate-Antworten begrenzen den bestätigten Pfad weiterhin auf 80 %.

Die anderen 90 Fälle, OVAR-Auftrag/Geschichte/Befunde/Assets, Methodenregeln, Score-Gewichte, Caps und TAT-Logik bleiben erhalten. Das Delta ersetzt index.html und Canonical und fügt eine Gate-Datei hinzu. App-Version bleibt v2.6.0-rc1.

Status: geprüfter Integration Candidate; echter Browsercheck offen.
