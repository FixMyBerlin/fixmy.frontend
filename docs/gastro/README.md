# Gastro-App

Die Gastro-App implementiert einen Prozess zur Vereinbarung der Nutzung von
öffentlichem Raum als Alternative zu geschlossenen Ladengeschäften und anderen
Örtlichkeiten, an denen die Ansteckungsgefahr durch Viren erhöht ist.

## Nutzergruppen

**Betreiber:innen** führen ein Ladengeschäft oder haben aus anderen Gründen ein Interesse an der Mitnutzung von öffentlichem Raum im Rahmen der Aktion

**Verwaltungsmitarbeiter:innen** arbeiten Regelpläne aus und prüfen Interessensbekundungen und Anträge um Anordnugen zu erstellen

**Administrator:innen** konfigurieren und betreuen die laufende Anwendung und ihre Datenflüsse

## User Stories

### A: Anmeldung von Interesse

| ID  | User-Story                                                                                        | Tickets |
| --- | ------------------------------------------------------------------------------------------------- | ------- |
| A01 | Als Betreiber:in kann ich mich auf der Webseite über die Rahmenbedingungen der Aktion erkundigen. |
| A02 | Als Betreiber:in kann ich mich für eine Interessensbekundung anmelden                             |

### B: Prüfung von Interessensbekundung

| ID  | User-Story                                                                                                                                                                             | Tickets                                                         |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| B01 | Als Verwaltungsmitarbeiter:in kann ich die eingegangenen Interessensbekundungen in einer Tabellenkalkulations- oder GIS-Anwendung betrachten, um angemessene Regelpläne zu entwickeln. |
| B02 | Als Verwaltungsmitarbeiter:in möchte ich Interessensbekundungen einem von mehreren Regelplänen zuordnen um die benötigten Informationen zur weiteren Bearbeitung zu definieren         | [361](https://github.com/FixMyBerlin/fixmy.platform/issues/361) |

### C: Beantragung

| ID  | User-Story                                                                                                                                                       | Tickets                                                         |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| C01 | Als Betreiber:in möchte ich nach Zuordnung zu einem Regelplan eine Benachrichtigung erhalten, die Anweisungen enthält, wie ich meine Daten vervollständigen kann | [361](https://github.com/FixMyBerlin/fixmy.platform/issues/361) |
| C02 | Als Betreiber:in möchte ich meine Daten für eine ordentliche Beantragung vervollständigen können                                                                 | [361](https://github.com/FixMyBerlin/fixmy.platform/issues/361) |

### D: Prüfung von Anträgen

| ID  | User-Story                                                                                                                                                                                       | Tickets                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| D01 | Als Verwaltungsmitarbeiter:in möchte ich eingegangene Anträge einsehen können, so dass ich sie auf Vollständigkeit und Korrektheit prüfen kann                                                   | [361](https://github.com/FixMyBerlin/fixmy.platform/issues/361) |
| D02 | Als Verwaltungsmitarbeiter:in möchte ich Korrekturen an Anträgen vornehmen können, so dass diese allen Anforderungen entsprechen                                                                 | [361](https://github.com/FixMyBerlin/fixmy.platform/issues/361) |
| D03 | Als Verwaltungsmitarbeiter:in möchte ich vollständige Anträge bewilligen können                                                                                                                  | [361](https://github.com/FixMyBerlin/fixmy.platform/issues/361) |
| D04 | Als Verwaltungsmitarbeiter:in möchte ich ungültige Anträge ablehnen können                                                                                                                       | [361](https://github.com/FixMyBerlin/fixmy.platform/issues/361) |
| D05 | Als Verwaltungsmitarbeiter:in möchte ich unvollständige Anträge als solche markieren können, so dass die Antragsteller:innen diese vervollständigen können                                       |
| D06 | Als Verwaltungsmitarbeiter:in möchte ich ungewöhnliche Anträge als solche markieren können, so dass die Antragsteller:innen über eine außergewöhnliche Bearbeitungszeit informiert werden können |

### E: Kommunikation von bewilligten Anträgen

| ID  | User-Story                                                                                                                                                                              | Tickets |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| E01 | Als Verwaltungsmitarbeiter:in möchte ich den Versand einer E-Mail-Benachrichtigung an Antragsteller auslösen können, so dass diese über die Bewilligung eines Antrags informiert werden |

### F: Zurückziehen von Anträgen

### G: Reichweitenmessung

### H: Abwicklung

## Datenmodelle

### Anmeldung

### Regelfall

## API
