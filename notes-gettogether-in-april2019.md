# Zusammenkunft im April: Offene Punkte

## Drängende offene Punkte, teilw. mit Diskussionsbedarg

- Anbindung API
  - Ende-zu-Ende-Tests
  - Fehlerbehandlung (auch Feedback der Fehler im UI und Benutzerführung)
- Features Ergänzen
  - Like 
  - Emailadresse zu Meldung hinterlegen
  - Share (implementiert aber ungetestet)
- Zwei verschiedene Karteninstanzen (Übersichtskarte + sowie Karte zum Verorten) doppeln Logik, verlangen und
verhindern die Zusammenschau von aktueller Position und bestehenden Meldungen
- generelle Architektur. Ist die Kernlogik in [`SubmitReport`](src/pages/Reports/components/SubmitReport/SubmitReport.js)
und [`ReportsState`](src/pages/Reports/ReportsState.js) okay? 
- Passt das entwickelte Routing?
```
/meldungen/karte
/meldungen/karte/1
/meldungen/karte/1/details
/meldungen/meldung-machen
```
- Begrenzen der Größe aufgenommener Bilder auf ein Maß wie 800*600 nötig. Arbeit dazu angefangen im Branch 
[/reports-resize-images](https://github.com/FixMyBerlin/fixmy.frontend/tree/reports-resize-images). Problem hier: Orientierung geht
beim Vergrößern verloren.
- Geocode-Input in der [`LocateMeMap`](src/pages/Reports/components/SubmitReport/LocateMeMap/LocateMeMap.js) sollte per Autocomplete
passende Vorschläge zeigen
- Wie gut funktioniert das Geofencing in der `LocateMeMap`


- Tests auf verschiedenen Telefonen
- Optimierung Ladeverhalten im Hinblick auf Performance (Lazy Loading, Fetch der Meldungen bereits auf der Landing Page etc.)
- Ausbau Fehlerbehandlung



## Längfristigere Themen
- UX Optimierung (bspw. vertikales Scrollen in Dialogen, wenn Angaben gemacht wurden)
- Intensives Refactoring / Code Clean-Up
  - Muss an manchen Stellen evtl. mehr React State und weniger Redux verwendet werden?. 
  Bspw.: Sollte `reportsState.templocation` nicht besser eine State-Eigenschaft in [`LocateMeMap`](src/pages/Reports/components/SubmitReport/LocateMeMap/LocateMeMap.js) sein?
  - Reducer / Services
  - Components kleiner machen
  - De-Duplication bei Components (bspw. Überschriften, die mehrmals Deklariert werden)
  - PropTypes, DefaultTypes
  - Dokumentation
- e2e und Unit-Tests
- ErrorBoundaries

## Weiteres Vorgehen
- Wie Code Reviews organisieren? PR in kleinere PRs zerteilen?
- Wie Offene Features und Bugs strukturiert sammeln? Issues?
