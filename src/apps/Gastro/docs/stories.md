# User Stories

## Konfiguration der App

### Als Administrator:in kann ich unterschiedliche Startseiten für Bezirke anlegen

- Implementiert über Weiche in Landing-Page

### Als Administrator:in kann ich einen Start- und Endzeitpunkt für die Anmeldung definieren

- Frontend: Konfiguriert über District-Config
- Backend: Konfiguriert über Umgebungsvariablen `GASTRO_SIGNUPS_OPEN` und `GASTRO_SIGNUPS_CLOSE`

### Als Adminstrator:in können je Backend-Deployment eigene Textvorlagen für die E-Mail-Benachrichtigungen konfiguriert werden

- Umgebungsvariable `TEMPLATE_SET`

## Anmeldung von Interesse

### Als Betreiber:in kann ich mich auf der Webseite über die Rahmenbedingungen der Aktion erkundigen.

- Landing-Page

### Als Betreiber:in kann ich mich für eine Interessensbekundung anmelden

- Komponente `SignupForm`

## Prüfung von Interessensbekundung

### Als Verwaltungsmitarbeiter:in kann ich die eingegangenen Interessensbekundungen in einer Tabellenkalkulations- oder GIS-Anwendung betrachten, um angemessene Regelpläne zu entwickeln.

- Django-Command `exportgastrosignups`

### Als Verwaltungsmitarbeiter:in kann ich Interessensbekundungen einem von mehreren Regelplänen zuordnen um die benötigten Informationen zur weiteren Bearbeitung zu definieren

- Django-Admin für `GastroSignup` model

## Beantragung

### Als Betreiber:in möchte ich nach Zuordnung zu einem Regelplan eine Benachrichtigung erhalten, die Anweisungen enthält, wie ich meine Daten vervollständigen kann

- Django-Admin-Action "Antragsformular versenden"

### Als Betreiber:in möchte ich meine Daten für eine ordentliche Beantragung vervollständigen können

- Registration-Page
- GastroSignup-View

### Wenn direkte Beantragung aktiviert ist, möchte ich als Betreiber:in einen Antrag ohne vorherige Interessensbekundung einreichen können.

- GastroSignup-View
- Gesteuert über Feature-Flag `TOGGLE_GASTRO_DIRECT_SIGNUP`

### Als Betreiber:in möchte ich anzeigen können, dass ich mit einer Kontaktaufnahme bei zukünftigen Folgeaktionen einverstanden bin

- Es gibt eine Checkbox auf der Antragsseite um diesem zuzustimmen
- Der Zustand der Checkbox wird im Backend zusammen mit dem Antrag gesichert

## Prüfung von Anträgen

### Als Verwaltungsmitarbeiter:in möchte ich eingegangene Anträge einsehen können, so dass ich sie auf Vollständigkeit und Korrektheit prüfen kann

Kriterien

- Alle Datenfelder der Anträge werden im Django-Admin akkurat dargestellt
- Interne Anmerkungen können gespeichert werden

### Als Verwaltungsmitarbeiter:in möchte ich Korrekturen an Anträgen vornehmen können, so dass diese allen Anforderungen entsprechen

Kriterien

- Alle Datenfelder der Anträge können im Django-Admin bearbeitet werden

### Als Verwaltungsmitarbeiter:in möchte ich vollständige Anträge bewilligen können

Kriterien

- Anträge können im Django-Admin mit einem Status "bewilligt" versehen werden

### Als Verwaltungsmitarbeiter:in möchte ich ungültige Anträge ablehnen können

Kriterien

- Anträge können im Django-Admin mit einem Status "abgelehnt" versehen werden

## Kommunikation von bewilligten Anträgen

### Als Verwaltungsmitarbeiter:in möchte ich den Versand einer E-Mail-Benachrichtigung an Antragsteller auslösen können, so dass diese über die Bewilligung eines Antrags informiert werden

Kriterien

- Es gibt ein Django-Kommando um Antragsteller:innen über die Bewilligung ihres Antrags zu informieren
- Der Inhalt der E-Mail wird abhängig von Regulation und Bewilligungsstatus zusammengestellt
- Die E-Mail-Benachrichtigung enthält einen Link zu einer öffentlich einsehbaren Karte der bewilligten Nutzungsfläche

## Verlängerung über Folgeanträge

Jeder Antrag ist für einen begrenzten Zeitraum gültig. Um Betreiber:innen die Nutzung auch nach Ablauf des Zeitraums zu ermöglichen können Folgeanträge gestellt werden.

### Als Verwaltungsmitarbeiter:in kann ich Betreiber:innen per E-Mail die Möglichkeit zur Beantragung einer Folgegenehmigung zusenden

Kriterien

- Es gibt eine Action im Django-Admin um Angebote zur Stellung eines Folgeantrags zu stellen
- Anträge sind danach filterbar, ob bereits ein Angebot zum Folgeantrag verschickt wurde

### Als Betreiber:in kann ich einen Folgeantrag stellen, wenn ich ein Angebot hierfür per E-Mail erhalten habe

Kriterien

- Es gibt eine Bestätigungs-Seite für das Stellen von Folgeanträgen
- Auf der Bestätigungsseite wird die vorige Genehmigung verlinkt
- Durch Bestätigung des Angebots wird ein neuer Antrag mit den gleichen Daten wie der vorige gestellt
- Folgeanträge haben den Beginn der Folgekampagne als frühesten Geltungstag
