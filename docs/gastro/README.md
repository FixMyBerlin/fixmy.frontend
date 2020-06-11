# Gastro-App

Die Gastro-App implementiert einen Prozess zur Vereinbarung der Nutzung von
öffentlichem Raum als Alternative zu geschlossenen Ladengeschäften und anderen
Örtlichkeiten, an denen die Ansteckungsgefahr durch Viren erhöht ist.

## Nutzergruppen

**Betreiber:innen** führen ein Ladengeschäft oder haben aus anderen Gründen ein Interesse an der Mitnutzung von öffentlichem Raum im Rahmen der Aktion

**Verwaltungsmitarbeiter:innen** arbeiten Regelpläne aus und prüfen Interessensbekundungen und Anträge um Anordnugen zu erstellen

**Administrator:innen** konfigurieren und betreuen die laufende Anwendung und ihre Datenflüsse

**Anwohner:innen** besuchen die Ladengeschäfte im öffentlichen Raum als Kunden der Betreiber:innen

## User Stories

### Anmeldung von Interesse

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>User-Story</th>
      <th>Kriterien</th>
      <th>Umsetzung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A01</td>
      <td>
        Als Betreiber:in kann ich mich auf der Webseite über die
        Rahmenbedingungen der Aktion erkundigen.
      </td>
      <td></td>
      <td>Abgeschlossen</td>
    </tr>
    <tr>
      <td>A02</td>
      <td>
        Als Betreiber:in kann ich mich für eine Interessensbekundung anmelden
      </td>
      <td></td>
      <td>Abgeschlossen</td>
    </tr>
  </tbody>
</table>

### Prüfung von Interessensbekundung

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>User-Story</th>
      <th>Kriterien</th>
      <th>Umsetzung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>B01</td>
      <td>
        Als Verwaltungsmitarbeiter:in kann ich die eingegangenen
        Interessensbekundungen in einer Tabellenkalkulations- oder GIS-Anwendung
        betrachten, um angemessene Regelpläne zu entwickeln.
      </td>
      <td></td>
      <td>Abgeschlossen</td>
    </tr>
    <tr>
      <td>B02</td>
      <td>
        Als Verwaltungsmitarbeiter:in möchte ich Interessensbekundungen einem
        von mehreren Regelplänen zuordnen um die benötigten Informationen zur
        weiteren Bearbeitung zu definieren
      </td>
      <td></td>
      <td>Abgeschlossen</td>
    </tr>
  </tbody>
</table>

### Beantragung

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>User-Story</th>
      <th>Kriterien</th>
      <th>Umsetzung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>C01</td>
      <td>
        Als Betreiber:in möchte ich nach Zuordnung zu einem Regelplan eine
        Benachrichtigung erhalten, die Anweisungen enthält, wie ich meine Daten
        vervollständigen kann
      </td>
      <td></td>
      <td>Abgeschlossen</td>
    </tr>
    <tr>
      <td>C02</td>
      <td>
        Als Betreiber:in möchte ich meine Daten für eine ordentliche Beantragung
        vervollständigen können
      </td>
      <td></td>
      <td>Teilweise abgeschlossen</td>
    </tr>
  </tbody>
</table>

### Prüfung von Anträgen

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>User-Story</th>
      <th>Kriterien</th>
      <th>Umsetzung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>D01</td>
      <td>
        Als Verwaltungsmitarbeiter:in möchte ich eingegangene Anträge einsehen
        können, so dass ich sie auf Vollständigkeit und Korrektheit prüfen kann
      </td>
      <td>
        <ul>
            <li>
                Alle Datenfelder der Anträge werden im Django-Admin akkurat 
                dargestellt
            </li>
        </ul>
      </td>
      <td>Abgeschlossen</td>
    </tr>
    <tr>
      <td>D02</td>
      <td>
        Als Verwaltungsmitarbeiter:in möchte ich Korrekturen an Anträgen
        vornehmen können, so dass diese allen Anforderungen entsprechen
      </td>
      <td>
        <ul>
            <li>
                Alle Datenfelder der Anträge können im Django-Admin bearbeitet 
                werden
            </li>
        </ul>
      </td>
      <td>Abgeschlossen</td>
    </tr>
    <tr>
      <td>D03</td>
      <td>
        Als Verwaltungsmitarbeiter:in möchte ich vollständige Anträge bewilligen
        können
      </td>
      <td>
        <ul>
            <li>
                Anträge können im Django-Admin mit einem Status "bewillig" 
                versehen werden
            </li>
        </ul>
      </td>
      <td>Abgeschlossen</td>
    </tr>
    <tr>
      <td>D04</td>
      <td>
        Als Verwaltungsmitarbeiter:in möchte ich ungültige Anträge ablehnen
        können
      </td>
      <td>
        <ul>
            <li>
                Anträge können im Django-Admin mit einem Status "abgelehnt" 
                versehen werden
            </li>
        </ul>
      </td>
      <td>Abgeschlossen</td>
    </tr>
    <tr>
      <td>D05</td>
      <td>
        Als Verwaltungsmitarbeiter:in möchte ich unvollständige Anträge als
        solche markieren können, so dass die Antragsteller:innen diese
        vervollständigen können
      </td>
      <td></td>
      <td>Optional</td>
    </tr>
    <tr>
      <td>D06</td>
      <td>
        Als Verwaltungsmitarbeiter:in möchte ich ungewöhnliche Anträge als
        solche markieren können, so dass die Antragsteller:innen über eine
        außergewöhnliche Bearbeitungszeit informiert werden können
      </td>
      <td></td>
      <td>Optional</td>
    </tr>
  </tbody>
</table>

### Kommunikation von bewilligten Anträgen

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>User-Story</th>
      <th>Kriterien</th>
      <th>Umsetzung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>E01</td>
      <td>
        Als Verwaltungsmitarbeiter:in möchte ich den Versand einer
        E-Mail-Benachrichtigung an Antragsteller auslösen können, so dass diese
        über die Bewilligung eines Antrags informiert werden
      </td>
      <td>
        <ul>
            <li>
                Es gibt ein Django-Kommando um Antragsteller:innen über die 
                Bewilligung Ihres Antrags zu informieren
            </li>
            <li>
                Der Inhalt der E-Mail wird abhängig von Regulation und 
                Bewilligungsstatus zusammengestellt
            </li>
            <li>
                Die E-Mail-Benachrichtigung enthält einen Link zu einer 
                öffentlich einsehbaren Karte der bewilligten Nutzungsfläche
            </li>
        </ul>
      </td>
      <td>In Umsetzung</td>
    </tr>
    <tr>
      <td>E02</td>
      <td>
        Als Anwohner:in möchte ich mich über eine öffentlich einsehbare
        Internetseite über die eingerichteten Verkaufsflachen informieren können
      </td>
      <td>
      </td>
      <td>Screendesign</td>
    </tr>
  </tbody>
</table>

### Zurückziehen von Anträgen

### Reichweitenmessung

### Abwicklung

## Datenmodelle

### Anmeldung

### Regelfall

## API
