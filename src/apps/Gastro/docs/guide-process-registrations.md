# Prüfung und Bewilligung von Anträgen

Nachdem Betreiber:innen Anträge eingereicht haben erhalten die entsprechenden Einträge im Django-Admin-Interface den Status "Antrag liegt vor". Nun können diese Anträge geprüft und bewilligt werden.

Über das Filtermenü am rechten Rand der Antragsliste lassen sich über die Filteroptionen im Abschnitt "Status" nur diejenigen Einträge anzeigen lassen für die ein Antrag bereits vorliegt.

In der Detailansicht jedes Antrags, welche durch Klick auf den Eintrag in der Antragsliste geöffnet werden kann sind grundsätzlich die Eingaben der Antragsteller:innen einsehbar. Im folgenden werden einige Komponenten der Detailansicht gesondert beschrieben.

## Korrektur der Aufstellfläche

In der Detailanischt findet sich zunächst eine Karte mit dem Standpunkt des Ladenlokals, sowie darunter eine Karte mit der von den Betreiber:innen gewünschten Aufstellfläche.

Diese Karte wurde von den Betreiber:innen im Antragsformular eingezeichnet und ist ggf. zu korrigieren. Sie erscheint später in der Sondergenehmigung, sowie in der Verkehrsrechtlichen Anordnung. Für die Bearbeitung stehen verschiedene Werkzeuge zur Verfügung:

- Der Maßstab der Karte kann durch scrollen, Doppelklick und durch Bedienen der Zoom-Buttons am Rand vergrößert und verkleinert werden und die Karte kann verschoben werden.
- Die Aufstellfläche ist als orangene Linie eingezeichnet, welche verändert oder auch gelöscht und neu eingezeichnet werden kann.
- Um einzelne Knoten der Flächenbegrenzung zu verschieben wird die Begrenzung zunächst einmal angeklickt. Nun sind die Knotenpunkte als Kreise hervorgehoben. Sie können jetzt mit der Maus verschoben werden.
- Über den Schriftzug "Alles löschen" kann die Fläche entfernt werden. Nun kann das Stift-Icon am oberen rechten Rand der Karte gewählt werden und eine neue Fläche eingezeichnet werden. Hierzu werden nacheinander die gewünschten Eckpunkte geklickt und die Fläche schließlich durch Klick auf den Ursprung geschlossen.
- Über die blaue Schaltfläche mit einem weißen Plus-Symbol in der oberen rechten Ecke der Karte kann ein Menü geöffnet werden, in dem zwischen einer Auswahl verschiedener konfigurierter Kartenlayer gewechselt werden kann. Hierdurch lassen sich z.B. Satellitenbilder einblenden um die korrekte Aufstellfläche zu bestimmen.

## Interne Bearbeitungsvermerke

Zur Koordinierung zwischen Mitarbeiter:innen, die an der Sondergenehmigung bzw. verkehrsrechtlichen Anordnung arbeiten sind Bearbeitungsvermerke möglich:

- Im Feld "Interne Anmerkung" kann Freitext eingetragen und gespeichert werden
- Über die Häkchen-Felder "Sondernutzung geprüft" und "Verkehrsrechtliche Anordnung" geprüft kann eine Teilbearbeitung vermerkt werden
- Anträge können in der Listenansicht nach diesen Attributen über das Filtermenü auf der rechten Seite selektiv angezeigt werden
- Für diese beiden Attribute ist außerdem die Angabe eines Vermerks möglich, welcher nur intern sichtbar ist
