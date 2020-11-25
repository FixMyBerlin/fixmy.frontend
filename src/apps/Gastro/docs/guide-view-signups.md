# Interessensbekundungen als Tabelle betrachten

Eingegangene Interessensbekundungen können in einem Tabellenformat exportiert
werden um diese außerhalb der Plattform zu bearbeiten und etwa zur Planung
der benötigten Anordnungen zu verwenden.

**Hinweise**

- Das verwendete Datenformat ist CSV. Dieses Format ist besonders kompatibel mit einer Vielzahl an Programmen. Beim Import in Microsoft Excel oder Google Docs ist
  zu beachten dass Datenfelder nicht automatisch umgewandelt werden sollten (siehe [Anleitung für Microsoft Excel](https://support.microsoft.com/de-de/office/text-import-assistent-c5b02af6-fda1-4440-899f-f78bafe41857))
- Als Trennzeichen wird das Komma verwendet

## Export als CSV-Datei

Für den Export als CSV-Datei wird ein authorisierter Zugang zum Backend-System benötigt.

Der Export kann über das Django-Kommando `exportgastrosignups` ausgeführt werden.

```bash
python manage.py exportgastrosignups --format csv >> export.csv
```

## Beschreibung des Ausgabeformats

Die ausgegebenen Werte sind hier unterteilt in Nutzer:innen-Eingaben, Eingaben von Verwaltungsmitarbeiter:innen und Systemwerte

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

- Regulation (dieser Anmeldung zugewiesene)
- Öffnungszeiten
- Anmerkung (wird auf der Anordnung ausgegeben)
- Interne Anmerkung (nur der Verwaltung zugänglich)
- Status
- Sondernutzung geprüft
- Bearbeitungsvermerk zur Sondernutzung
- Verkehrsrechtliche Anordnung geprüft
- Bearbeitungsvermerk zur verkehrsrechtlichen Anordnung
