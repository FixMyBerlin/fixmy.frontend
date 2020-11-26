# Bearbeitung von Interessensbekundungen und Versand von Antragsformularen

Die von Betreiber:innen gestellten Interessensbekundungen sind als CSV, GeoJSON und über das Django-Admin-Interface einsehbar (siehe auch [Anleitung zum Einsehen der Interessensbekundungen](./guide-view-signups.md)). Das Ziel ihrer Bearbeitung ist, die Interessensbekundungen Regelfällen zuzuordnen, so dass die Betreiber:innen in Bezug hierauf einen Antrag stellen können.

## Zuordnung eines Regelfalls und Versandt des Zugangs zum Antragsformular

Voraussetzung ist ein Zugang zum Django-Admin-Interface, welcher von Administrator:innen eingerichtet werden kann.

1. Im Admin-Interface wird durch Klick auf "Anträge auf Ausnahmegenehmigung" die Liste der Anträge und Interessensbekundungen geöffnet.
2. Über die Filterauswahl am rechten Bildschrirmrand wird die Auswahl auf Interessensbekundungen in Prüfung beschränkt, indem im Abschnitt "nach Status" auf "in Prüfung" geklickt wird.
3. Die Schritte 3-5 werden für jeden Antrag aus der Liste wiederholt. Jeweils wird der Antrag geöffnet und zunächst der Wert im Auswahlmenü "Status" auf "in Prüfung" gesetzt.
4. Nun wird im Auswahlmenü "Regulation" der passende Regelfall ausgewählt. Wenn die Bewilligung eines Antrags im Vorhinein ausgeschlossen werden kann wird der Status "Antrag abgelehnt" gewählt.
5. Die Anmeldung wird durch Klick auf "Speichern" gesichert und es kann mit dem Browser-Zurück-Button zur Listenansicht zurückgekehrt werden.
6. Sind alle Interessensbekundungen durch die Schritte 3-5 bearbeitet worden, so können diese über die Auswahlkästchen am linken Bildschirmrand der Listenansicht ausgewählt werden und über das Auswahlmenü "Aktion" am oberen Bildschirmrand die Aktion "Antragsformular versenden" ausgelöst werden. Hierdurch wird der Status dieser Einträge auf "wartet auf Antrag" gesetzt.

In der Detailansicht jedes Eintrags lässt sich nun am unteren Ende der Zeitpunkt
des Versandts einsehen und über den Link "Anmeldeformular" das Antragsformular öffnen.
