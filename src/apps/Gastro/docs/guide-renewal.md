# Angebot zur Verlängerung versenden

Betreiber:innen kann ein Angebot zur Einreichung eines Antrags auf Verlängerung zugesandt werden, welches bei Annahme automatisch bewilligt wird.

Zum Hintergrund: Die Gültigkeit der Sondergenehmigungen wird stets durch die Laufzeit der Kampagne
definiert, der ein Antrag zugeordnet ist. Diese Laufzeit wird im Vorfeld von
Administrator:innen bei der Konfiguration der Anwendung festgelegt.

Ist gewünscht, dass Betreiber:innen auch über den ursprünglichen Anmeldungszeitraum hinaus das Angebot nutzen können, so ist es möglich eine weitere Kampagne zu definieren, die als Nachfolgekampagne mit der ursprünglichen verknüpft ist.

Beispiel:

- Kampagne A: 1.3.2020 - 31.8.2020
- Kampagne B: 4.9.2020 - 31.12.2020

In diesem Beispiel würde also im Lauf der Kampagne A geprüft werden, welchen Betreiber:innen ein Angebot zu machen ist, mit welchem sie auch im Zeitraum der Kampagne B eine Sondernutzung bewilligt bekommen könnten.

## Prüfung und Versand des Antrags

Voraussetzung ist ein autorisierter Zugang zur Django-Webanwendung, welcher von Administrator:innen ausgestellt werden kann.

1. Öffnen Sie durch Klick auf "Anträge auf Ausnahmegenehmigung" und Auswahl eines Eintrags einen bereits bewilligten Antrag. Hier kann nun geprüft werden, ob den Betreiber:innen ein Folgeantrag bewilligt werden kann, wenn dieser gestellt wird.
2. Nach erfolgter Prüfung navigieren Sie über ihren Browser auf den vorigen Bildschirm, wo Sie eine Auflistung aller Anträge sehen. Wählen sie am linken Bildschirmrand durch Klick auf die Auswahlboxen diejenigen Anträge aus für die ein Angebot zur Verlängerung versandt werden soll.
3. Klicken Sie über der Liste auf das Dropdown-Menü "Aktion", wählen Sie "Angebot für Folgeantrag senden" und klicken schließlich auf "Ausführen". Die Betreiber:innen erhalten nun per E-Mail einen Link über welchen sie den Folgeantrag stellen können.

## Prüfung des Status der Folgeanträge

Navigieren Sie zur Auflistung der Anträge. Im Filtermenü am rechten Bildschirmrand können Sie durch Aktivierung des Filters "Nach Angebot für Folgeantrag" mit der Option "Versandt" eine Liste der Anträge betrachten, für die bereits ein Angebot zum Folgeantrag versandt wurde.

Klicken Sie auf einen einzelnen Antrag und scrollen Sie zum unteren Ende der Seite um die Metadaten des Antrags einzusehen. Hier finden Sie folgende Informationen:

- "Angebot für Folgeantrag versandt am": Zu diesem Zeitpunkt wurde das Angebot per E-Mail an die Betreiber:innen geschickt.
- "Formular für Folgeantrag": Über diesen Link können Sie das Formular zum Folgeantrag betrachten. Vorsicht, dieses Formular ist aktiv, d.h. als Verwaltungsmitarbeiter:in haben Sie hier die Möglichkeit im Namen der Betreiber:innen den Antrag anzunehmen
- "Folgeantrag" Dieser Link führt zum Folgeantrag, wenn dieser bereits gestellt wurde
- "Vorgängerantrag": Dieser Link führt zum zuvorgehenden Antrag, wenn es sich beim aktuellen Antrag um einen Folgeantrag handelt.
