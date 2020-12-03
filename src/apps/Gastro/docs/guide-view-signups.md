# Interessensbekundungen als Tabelle betrachten

Eingegangene Interessensbekundungen können in einem Tabellenformat exportiert
werden um diese außerhalb der Plattform zu bearbeiten und etwa zur Planung
der benötigten Anordnungen zu verwenden.

**Hinweise**

- Das verwendete Datenformat ist CSV. Dieses Format ist besonders kompatibel mit einer Vielzahl an Programmen. Beim Import in Microsoft Excel oder Google Docs ist
  zu beachten, dass Datenfelder nicht automatisch umgewandelt werden sollten (siehe [Anleitung für Microsoft Excel](https://support.microsoft.com/de-de/office/text-import-assistent-c5b02af6-fda1-4440-899f-f78bafe41857))
- Als Trennzeichen wird das Komma verwendet

## Export als CSV-Datei

Für den Export als CSV-Datei wird ein autorisierter Zugang zum Backend-System benötigt.

Der Export kann über das Django-Kommando `exportgastrosignups` ausgeführt werden.

```bash
python manage.py exportgastrosignups --format csv export.csv
```

### Beschreibung der ausgegebenen Felder

Die ausgegebenen Werte sind hier unterteilt in Nutzer:innen-Eingaben, Eingaben von Verwaltungsmitarbeiter:innen und Systemwerte.

Details, insbesondere zu den Eingaben aus der Verwaltung, werden in den Nutzungsanleitungen beschrieben.

System

- Kennziffer
- Eingereicht (Datum der Interessensbekundung)

Nutzer

- Name des Betriebs
- Adresse
- Geometrie
- Länge der Ladenfront (in Zentimetern)
- Vorname
- Nachname
- E-Mail
- Telefonnummer
- Nutzung
- Kategorie
- Bedingungen akzeptiert
- Vereinbarung angenommen

Verwaltung

- Regulation (dieser Anmeldung zugewiesener Regelfall)
- Öffnungszeiten (bei Ausgabe von unterschiedlicher Nutzungszeit der Sondernutzungsfläche)
- Anmerkung (wird auf der Anordnung ausgegeben)
- Interne Anmerkung (nur der Verwaltung zugänglich)
- Status
- Sondernutzung geprüft
- Bearbeitungsvermerk zur Sondernutzung
- Verkehrsrechtliche Anordnung geprüft
- Bearbeitungsvermerk zur verkehrsrechtlichen Anordnung

## Ausgabe als GeoJSON-Datei

Der Datensatz kann auch als GeoJSON-Datei ausgegeben werden. Hierbei werden allerdings nicht alle Datenfelder mit ausgegeben wie bei der CSV-Ausgabe.

```bash
python manage.py exportgastrosignups --format geojson export.geojson
```
