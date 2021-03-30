import React from 'react';
import styled from 'styled-components';

import { dateReceived, getCategoryDescription, permitEnd } from '../../utils';

const Container = styled.section`
  padding: 1em;

  h1 > span {
    font-size: 0.7em;
  }

  @media print {
    font-size: 0.9em;
    line-height: 1.2;
  }
`;

const Author = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

const Headline = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;

  & span {
    width: 50%;
  }
`;

const TwoUp = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;

  & span {
    width: 50%;
  }
`;

const Nebenbestimmungen = styled.section`
  font-size: 0.7em;
  line-height: 1.2;

  p {
    margin: 0;
  }
`;

// eslint-disable-next-line camelcase
const getSetupTimerangeEnd = ({ permit_start }) => {
  const date = new Date(permit_start);
  date.setDate(date.getDate() + 4);
  return date.toLocaleDateString('de-DE');
};

const TrafficOrder = ({ application }) => {
  if (application.status !== 'application_accepted')
    return (
      <Container>
        <h1>Verkehrsrechtliche Anordnung</h1>
        <p>Dieser Antrag ist derzeit nicht bewilligt.</p>
      </Container>
    );

  const categoryDescription = getCategoryDescription(application);
  const setupTimerangeEnd = getSetupTimerangeEnd(application);

  return (
    <Container>
      <Author>Bezirksamt Friedrichshain-Kreuzberg von Berlin</Author>
      {/* <h2>Abt. Familie, Personal, Diversity, Straßen- und Grünflächenamt</h2> */}
      <Author>Straßenverkehrsbehörde</Author>

      <h1>
        Verkehrsrechtliche Anordnung
        <br />
        <span>Zur Sicherung einer Arbeitsstelle an Straßen</span>
      </h1>

      <p>
        {application.shop_name} <br />
        {application.address}
      </p>

      <Headline>
        <span>Antrag vom: {dateReceived(application)}</span>
        <span>
          Antrag gestellt von {application.first_name} {application.last_name}
        </span>
      </Headline>

      <p>Anlagen:</p>
      <ul>
        <li>Regelplan</li>
      </ul>

      <p>
        Zur Sicherung und Kennzeichnung der Arbeitsstelle (Arbeitsbereich) sowie
        zur Sicherung und Ordnung des Verkehrs (Verkehrsbereich) werden gemäß §
        45 Abs. 6 Straßenverkehrs-Ordnung (StVO) unter dem Vorbehalt des
        Widerrufs folgende Verkehrsmaßnahmen angeordnet:
      </p>

      <h2>Unternehmer</h2>
      <p>
        {application.first_name} {application.last_name}
      </p>
      <p>
        <strong>Verantworlicher: </strong>
        {application.first_name} {application.last_name} (Tel:{' '}
        {application.phone})
      </p>

      <h2>Arbeitsstelle</h2>

      <TwoUp>
        <span>
          <h3>Art der Arbeitsstelle</h3>
          <p>{categoryDescription}</p>
        </span>

        <span>
          <h3>Lage der Arbeitsstelle</h3>
          <p>{application.address}</p>
        </span>
      </TwoUp>

      <h3>Dauer der Arbeitsstelle</h3>
      <TwoUp>
        <span>
          <strong>Beginn der Arbeitsstelle</strong>
          <br />
          {setupTimerangeEnd}
        </span>
        <span>
          <strong>Aufhebung der Arbeitsstelle</strong>
          <br />
          {permitEnd(application)}
        </span>
      </TwoUp>
      <p>
        <strong>Weitere Detailangaben zu den Nutzungszeiten</strong>
        <br />
        Die Vorschriften des Landes-Immissionsschutzgesetzes Berlin (LimSchG
        Bln) in der jeweils geltenden aktuellen Fassung sind zu beachten.
      </p>

      <h2>Kennzeichnung, Verkehrsregelung, Verkehrsführung</h2>
      <h3>Sicherung und Kennzeichnung der Arbeitsstellen</h3>
      <p>Sicherung nach Regelplan</p>
      <ul>
        <li>vorhandene Parkanordnung L&auml;ngsaufstellung</li>
        <li>vorhandene Parkanordnung Schr&auml;gaufstellung</li>
        <li>vorhandene Parkanordnung Senkrechtaufstellung</li>
      </ul>
      <p>
        Haltverbote: Z 283 nach VLB-Regelplan 630 mit Zusatzzeichen 1042-33 StVO
        (zeitliche Beschränkung) {setupTimerangeEnd} - {permitEnd(application)},
        Ausdehnung gemäß Lageplan
      </p>
      <p>
        <strong>Abweichend / ergänzend wird festgelegt:</strong>
      </p>
      <p>
        {application.note.split('\n').map((content: string) => (
          <span>
            {content}
            <br />
          </span>
        ))}
      </p>

      <h2>Nebenbestimmungen</h2>

      <Nebenbestimmungen>
        <h3>Allgemein</h3>
        <p>
          Entgegenstehende Regelungen aus den vorstehend angeordneten Regel-/
          Verkehrszeichen-/ Umleitungs-/ Signalanlage- mit Signalzeitenplänen
          gehen diesen Nebenbestimmungen vor.
        </p>
        <p>
          Abweichungen von dieser Anordnung sind nur im Wege einer Änderung
          (weiteren Anordnung) durch die Straßenverkehrsbehörde zulässig.
        </p>
        <h3>Gesetze und Richtlinien</h3>
        <p>
          Die Sicherung der Arbeitsstelle und der Einsatz von Absperrgeräten hat
          nach den aktuellen &quot;Richtlinien für die Sicherung von
          Arbeitsstellen an Straßen (RSA)&quot; zu erfolgen.
        </p>
        <p>Zusätzlich sind zu berücksichtigen:</p>
        <p>
          bei Umleitungen die Richtlinien für Umleitungsbeschilderungen (RUB)
        </p>
        <p>
          zur Regelung von Lichtzeichenanlagen die Richtlinien für
          Lichtsignalanlagen (RiLSA)
        </p>
        <p>die Richtlinien für die Markierung von Straßen (RMS)</p>
        <p>
          die Richtlinien für passiven Schutz an Straßen durch
          Fahrzeug-Rückhaltesysteme (RPS)
        </p>
        <p>
          für Art und Aufstellung der Verkehrszeichen und -einrichtungen die
          Technischen Lieferbedingungen (ZTV-SA){' '}
        </p>
        <p>Die Regelwerke sind in der jeweils gültigen Fassung anzuwenden.</p>
        <h3>Vorbehalte Dritter/ Widerrufsvorbehalt</h3>
        <p>
          Die angeordneten Maßnahmen gelten vorbehaltlich der Rechte Dritter und
          des jederzeitigen Widerrufs.{' '}
        </p>
        <h3>Bereithalten der verkehrsrechtlichen Anordnung</h3>
        <p>
          Diese verkehrsrechtliche Anordnung ist einschließlich der Anlagen
          stets auf der Arbeitsstelle bereitzuhalten und den Dienstkräften der
          Straßenverkehrsbehörde, Polizei, des Ordnungsamtes auf Verlangen
          vorzuzeigen.
        </p>
        <p>Im Übrigen sind Weisungen Zuständiger zu befolgen.</p>

        <h3>Abgleich mit der vorhandenen Beschilderung</h3>
        <p>
          Die Außerkraftsetzung (anderer) dauerhafter Streckenbeschilderungen,
          die das Parken erlauben, ist nur erforderlich, wenn sich andernfalls
          keine zweifelsfreie Erkennbarkeit der Verkehrsmaßnahmen bzw. örtlich
          geltenden Verkehrsregelungen ergibt. Dies ist insbesondere bei
          längeren Geltungszeiten der vorübergehenden Maßnahmen anzunehmen.
        </p>
        <p>
          Die der vorübergehenden Verkehrsmaßnahme entgegenstehenden
          Verkehrszeichen und -einrichtungen sind in diesen Fällen mit Beginn
          der Wirksamkeit abzudecken bzw. fachgerecht außer Kraft zu setzen; in
          Bereichen mit gekennzeichneten Flächen (Parkstandsmarkierungen auf der
          Fahrbahn oder auf Parkplätzen) ist das Zz „auch in gekennzeichneten
          Flächen“ zusätzlich aufzustellen.
        </p>
        <p>
          Zweifel oder Missverständnisse bei den Verkehrsteilnehmenden sind
          auszuschließen.
        </p>

        <h3>
          Sichtbarkeit, Standsicherheit und ggf. Beleuchtung der Verkehrszeichen
        </h3>
        <p>
          Verkehrszeichen sind standsicher und von der Fahrbahn aus gut sichtbar
          aufzustellen. Sie dürfen nicht an Bäumen angebracht werden und sind
          bei Verschmutzung zu säubern.
        </p>
        <p>
          Die Erkennbarkeit der Verkehrszeichen ist jederzeit zu gewährleisten.
        </p>
        <p>
          Die angeordneten Verkehrszeichen bzw. -einrichtungen sind gemäß RSA zu
          beleuchten.
        </p>

        <h3>Lichtraumprofil / Baumschnitt</h3>
        <p>
          Der Baumschnitt ist zur Freihaltung des erforderlichen
          Lichtraumprofils bei Bedarf mit dem zuständigen Straßenbaulastträger
          zu prüfen.
        </p>

        <h3>Beginn der Arbeiten</h3>
        <p>
          Aus Gründen der Sicherheit darf mit den Arbeiten erst begonnen werden,
          wenn die für die Arbeitsstelle – sowie ggf. Umleitungsstrecke –
          angeordneten Verkehrszeichen und -einrichtungen ordnungsgemäß
          aufgestellt und die erforderlichen Lichtraumprofile hergestellt sind.
        </p>

        <h3>Zuwegungen zu Grundstücken</h3>
        <p>
          Die Nutzung von Grundstückszugängen und -zufahrten ist jederzeit zu
          gewährleisten. Sofern dies nicht möglich ist, sind die Betroffenen
          rechtzeitig in geeigneter Weise über die Einschränkungen zu
          informieren. Fahrzeugen mit Sondersignalen (Bundeswehr, Polizei,
          Feuerwehr usw.) ist das Durchfahren der Arbeitsstelle grundsätzlich
          jederzeit zu ermöglichen. Kann dies wegen des Baufortschritts
          vorübergehend nicht gewährleistet werden, sind die zuständigen
          Leitstellen rechtzeitig in geeigneter Weise über die Einschränkungen
          zu informieren.
        </p>
        <p>
          Die von den Verkehrseinschränkungen unmittelbar betroffenen Anlieger
          sind rechtzeitig vor Beginn der Maßnahme in geeigneter Weise über Art
          und Dauer der Beeinträchtigungen zu informieren.
        </p>

        <h3>Arbeitsstellen an Kreuzungen und Einmündungen</h3>
        <p>
          Befinden sich Arbeitsstellen an Einmündungen oder Kreuzungen, ist der
          zur Arbeitsstelle hin einbiegende Verkehr zusätzlich durch Zeichen 123
          StVO mit Zusatzzeichen 1000-11/-21 StVO zu warnen.
        </p>

        <h3>
          Wiederherstellung des ursprünglichen Verkehrszustandes nach Beendigung
          der Arbeiten
        </h3>
        <p>
          Nach Beendigung der Arbeiten sind sämtliche aus Anlass der Maßnahme
          angeordneten und aufgestellten Verkehrszeichen und{' '}
        </p>
        <p>
          -einrichtungen unverzüglich vom öffentlichen Straßenland zu entfernen.
        </p>
        <p>
          Der vor Beginn der Arbeiten vorhandene Verkehrszeichen- und
          Markierungszustand einschließlich der Verkehrseinrichtungen
        </p>
        <p>
          - ursprünglicher Verkehrszustand - ist wieder herzustellen und die
          anordnende Straßenverkehrsbehörde zu benachrichtigen.
        </p>
        <p>
          Abweichend davon gilt: Wenn durch die Arbeiten der Verkehrsraum oder
          die Verkehrsführung verändert wurde, darf dieser erst freigegeben
          werden, wenn die erforderlichen Verkehrszeichen, Verkehrseinrichtungen
          und Markierungen gemäß der straßenverkehrsbehördlichen Anordnung
          installiert sind.
        </p>
        <h3>Haltverbote (A.), ggf. im Vorfeld einer Arbeitsstelle (B.)</h3>
        <p>A.</p>
        <p>
          Die Zeichen 283 StVO (absolutes Haltverbot) und die Zeichen 286 StVO
          (eingeschränktes Haltverbot) sind mit Pfeilen – Anfang – Mitte – Ende
          – zu versehen.
        </p>
        <p>
          In Bereichen mit Parkraumbewirtschaftung sind anstelle der Zeichen 286
          StVO die Zeichen 283 StVO mit Zusatzzeichen „Be- und Entladen frei“
          aufzustellen.
        </p>
        <p>B.</p>
        <p>
          Der für die Arbeitsstelle benötigte Raum und ggf. gegenüber ist durch
          Aufstellen von Zeichen 283 StVO freizuhalten.
        </p>
        <p>
          Die Verkehrszeichen im Bereich der Arbeitsstelle sind vom Straßenland
          zu entfernen, sobald der Arbeitsbereich eingerichtet ist.
        </p>
        <p>Allgemein:</p>
        <p>
          Die angeordneten Haltverbotszeichen und Zusatzzeichen sind mindestens
          3 volle Tage (= Standzeit der Verkehrszeichen beträgt 3 volle
          Datumstage, die vorherige 72-Stundenfrist ist nach einem Urteil vom
          Bundesverwaltungsgericht (BVerwG 3 C 25.16) hinfällig) vor Beginn der
          Wirksamkeit aufzustellen. Der Zeitraum der Gültigkeit ist durch den
          Zusatz „Datum und Uhrzeit“ gemäß Anordnung anzugeben.
        </p>
        <p>
          Fahrzeuge, die bereits in der noch nicht wirksamen Haltverbotsstrecke
          stehen, sind listenmäßig, gut leserlich, mit Angabe von Kennzeichen,
          Fahrzeugtyp, Farbe, Feststellzeit und -ort (Straße, Hausnummer) zu
          notieren. Ort und Zeit der Haltverbotsstrecke sowie Datum und Nr. der
          Anordnung sind zusätzlich auf der Liste zu dokumentieren.{' '}
        </p>
        <p>
          Diese Kennzeichenliste ist dem anordnenden Bezirksamt von Berlin –
          Straßenverkehrsbehörde – nach Ablauf der Verkehrsmaßnahme unverzüglich
          zu übersenden. Aus datenschutzrechtlichen Gründen ist eine
          Aufbewahrung beim Anordnungsinhaber bzw. der Anordnungsinhaberin oder
          Beauftragten nicht zulässig.
        </p>
        <p>Hinweis:</p>
        <p>
          <strong>
            Umsetzungen bedürfen der Anordnung durch die zuständigen
            Dienstkräfte (beispielsweise Polizei oder Ordnungsamt). Die
            vorgenannte Kennzeichenliste ist vorzulegen.
          </strong>
        </p>
        <p>
          Wer die Kosten einer Umsetzung zu tragen hat, wird durch das Referat
          Verkehrsordnungswidrigkeiten und Bußgeldeinziehung beim
          Polizeipräsidenten in Berlin entschieden.
        </p>
        <p>
          Auch Nutznießer einer Umsetzung können zur Zahlung der Umsetzkosten
          herangezogen werden. Bei einer Aufstellung der angeordneten
          Verkehrsmaßnahmen mit einem Vorlauf von weniger als 3 vollen Tagen*
          oder bei nicht ordnungsgemäßer Führung der Kennzeichenlisten ist dies
          der Regelfall.
        </p>
        <p>
          *Die Übertragung von Kosten für die Umsetzung von Fahrzeugen an
          Verkehrsteilnehmende widerspricht nach dem Urteil des
          Bundesverwaltungsgerichts zum Aktenzeichen BVerwG 3 C 25.16 dann den
          Anforderungen des Verhältnismäßigkeitsgrundsatzes, wenn
          Umsetzungsmaßnahmen vor dem vierten Tage nach Aufstellung der
          Haltverbote erfolgen.
        </p>

        <h3>Haltestellen- oder Taxenhalteplatzverlegungen</h3>
        <p>
          Maßnahmen, die sich auf den Linienverkehr des öffentlichen
          Personennahverkehrs auswirken, oder Verlegungen von Haltestellen oder
          Taxenständen sind vor Beginn der Maßnahmen mit dem Betreiber
          (beispielsweise betroffenes Verkehrsunternehmen oder Taxi-Innung)
          abzustimmen. Dazu ist ein Nachweis vorzulegen.
        </p>
        <p>
          Das/ die Zeichen 224 StVO (Haltestellen) und ggf. Zusatzzeichen ist/
          sind mindestens 72 Stunden vor Beginn der Wirksamkeit aufzustellen. Es
          ist eine Kennzeichenliste gemäß Nebenbestimmung 11 zu fertigen.
        </p>
        <p>
          Anmerkung: Sollte die BVG Betreiber der Haltestelle sein, ist sie nach
          Möglichkeit mindestens zehn Tage vorher zu informieren.
        </p>

        <h3>Parkraumbewirtschaftung</h3>
        <p>
          In Parkraumbewirtschaftungszonen wird die Aufhebung der
          Parkraumbewirtschaftung entsprechend der in der Anordnung verfügten
          Einschränkung für die Dauer der Arbeiten angeordnet. Vor Beginn ist
          die Sicherung der entsprechenden Verkehrszeichen und
          Parkscheinautomaten mit dem beauftragten Bewirtschaftungsunternehmen
          abzustimmen und dem zuständigen Bezirksamt von Berlin – Straßen- und
          Grünflächenamt - anzuzeigen.
        </p>

        <h3>Wendebereich bei Vollsperrung von Fahrbahnen</h3>
        <p>
          Vor einer Vollsperrung innerhalb einer Straße ist (beidseitig) auf 10
          Meter ein Wendebereich mit Zeichen 283-10/-20/-30 StVO auszuschildern.
        </p>

        <h3>Unterbrechung der Arbeiten</h3>
        <p>
          Bei Unterbrechung der Arbeiten sind die Verkehrsbeschränkungen im
          Einvernehmen mit dem/ der Sachbearbeiter/ Sachbearbeiterin der
          Straßenverkehrsbehörde des zuständigen Bezirksamtes von Berlin auf das
          erforderliche Mindestmaß zu begrenzen.
        </p>
        <p>
          Wird die Tätigkeit länger als zwei Wochen unterbrochen, sind die
          Verkehrsflächen für den Verkehr wieder frei zu geben. Hiervon kann nur
          abgesehen werden, wenn dies nachweislich bautechnisch nicht anders
          möglich ist.
        </p>

        <h3>Vorfahrt regelnde Verkehrszeichen</h3>
        <p>
          Vorfahrt regelnde Verkehrszeichen (Zeichen 205, Zeichen 206, Zeichen
          301, Zeichen 306, Zeichen 307 StVO) sind immer fest zu installieren
          und dürfen nicht transportabel aufgestellt werden.
        </p>
        <p>
          Bei einer Vorfahrtänderung ist für den nunmehr wartepflichtigen
          Fahrzeugverkehr Zeichen 101 StVO mit Zusatzzeichen 1008-30 StVO für
          die Dauer der Arbeitsstelle, nicht jedoch länger als 3 Monate,
          aufzustellen. Dies gilt auch im Anschluss der Arbeitsstelle bei
          Wiederherstellung der ursprünglichen Vorfahrtregelung.
        </p>
        <p>
          Die feste Installation von Verkehrszeichen ist im Vorfeld mit dem
          zuständigen Bezirksamt von Berlin - Straßen- und Grünflächenamt -
          abzustimmen.
        </p>

        <h3>Ladezonen und Schwerbehindertenparkplätze</h3>
        <p>
          Sind von der Arbeitsstelle Ladezonen oder/ und
          Schwerbehindertenparkplätze betroffen, so sind diese in Abstimmung mit
          der Straßenverkehrsbehörde des örtlich zuständigen Bezirksamtes von
          Berlin auf Grundlage ihrer Anordnung für die Dauer der Einschränkung
          zu verlegen.
        </p>

        <h3>Baustellenbedingte Fahrbahnunebenheiten</h3>
        <p>
          Vor baustellenbedingten Fahrbahnunebenheiten und -kanten ist durch
          Zeichen 112 StVO ggf. in Verbindung mit Zeichen 274-30 StVO zu warnen.{' '}
        </p>

        <h3>Gemeinsamer Geh- und Radweg</h3>
        <p>
          Wird eine gemeinsame Führung von Radfahrern und Fußgängern angeordnet,
          ist bei zuvor nicht benutzungspflichtigen Radwegen das Zeichen 239
          StVO mit Zusatzzeichen 1022-10 StVO aufzustellen. Die Zeichen 240 StVO
          oder Zeichen 241 StVO begründen dagegen eine Radwegebenutzungspflicht
          und sind daher nicht zu verwenden.
        </p>
        <p />

        <h3>Schlauchbrücken und Tastleisten</h3>
        <p>
          Zum Schutz für Sehbehinderte sind die Gehwegführungen im Bereich der
          Arbeitsstelle zusätzlich zur vorhandenen Absperrung mit 10 cm hohen
          Tastleisten abzusichern (Aufstellhöhe der Oberkante: 25 cm über dem
          Boden).
        </p>
        <p>
          Bei ebenerdiger Verlegung von Schläuchen und/oder Kabeln sind diese in
          geeigneter Weise abzudecken und/oder mit Anrampungen für
          Rollstuhlfahrer, Kinderwagen bzw. Radfahrer zu versehen und
          erforderlichenfalls zusätzlich zu kennzeichnen/zu beleuchten.
        </p>

        <h3>Warnposten</h3>
        <p>
          Beim Verbringen von Lasten über den Geh-/Radweg, insbesondere auch bei
          Arbeiten mit Hebezeugen/ Schrägaufzügen, ist sicherzustellen, dass
          sich keine Personen im Gefahrenbereich aufhalten. Der Fußgänger-/
          Radfahrverkehr ist kurzzeitig durch beidseitiges Aufstellen von
          Zeichen 600 StVO und Warnposten außerhalb des Gefahrenbereiches
          anzuhalten. Warnposten dürfen keine Verkehrsregelung vornehmen. Werden
          sie eingesetzt, müssen sie Warnkleidung und eine Warnfahne so tragen,
          so dass sie für Verkehrsteilnehmende hinreichend sichtbar sind.
        </p>

        <h3>Vollsperrung des Gehweges</h3>
        <p>
          Fußgänger sind bei einer angeordneten Vollsperrung des Gehweges ohne
          gleichzeitig angeordneten Notweg durch entsprechende Zusatzzeichen
          1000-12 oder 1000-22 StVO oder Hinweisschilder auf den
          gegenüberliegenden Gehweg zu verweisen.
        </p>
        <p>
          Als Querungshilfe ist der für die Querung benutze Bereich für die
          Dauer der Sperrung arbeitsstellenseitig und gegenüber auf 5 Meter
          Länge freizuhalten. Ggf. ist eine entsprechend lange
          Haltverbotsstrecke mit Zeichen 283 StVO einzurichten.
        </p>
        <p>Die Nebenbestimmung Nr. 11 ist zu beachten.</p>
        <p>
          Eine Barrierefreiheit in diesen Bereich ist sicherzustellen (sind
          keine Bordsteinabsenkungen vorhanden, wären beispielsweise Borde
          anzurampen).
        </p>

        <h3>Lichtzeichenanlagen</h3>
        <p>
          Vor Inbetriebnahme einer angeordneten Lichtzeichenanlage (LZA) sowie
          bei angeordneten Änderungen oder Anpassungen an bestehenden
          Lichtzeichenanlagen ist mit der anordnenden Straßenverkehrsbehörde ein
          Inbetriebnahmetermin zu vereinbaren.
        </p>
        <p>
          Die Beendigung der Arbeitsstelle ist durch den verantwortlichen
          Bauleiter spätestens 3 Werktage vorher bei der Signalbaufirma
          anzuzeigen.
        </p>
        <p>
          Die &quot;Richtlinien für Lichtsignalanlagen (RiLSA) –
          Lichtzeichenanlagen für den Straßenverkehr&quot; sind zu beachten.
          Dies gilt insbesondere für Nr. 5.2
          &quot;Engstellensignalisierung&quot; und Nr. 7.4 &quot;Ersatzmaßnahmen
          bei Betriebsunterbrechungen&quot;.
        </p>
        <p>
          Die Signalgeber sind neben dem rechten Fahrstreifen aufzustellen. Im
          Bereich des rechten Fahrstreifenrandes dürfen sie in Ausnahmefällen
          nur aufgestellt werden, wenn dadurch der vorbeifließende Verkehr nicht
          behindert bzw. keine zusätzliche Engstelle geschaffen wird. Der
          Signalgeber kann jedoch auf dem Fahrstreifen aufgestellt werden, wenn
          dieser nachfolgend durch die Arbeitsstelle eingeengt wird.
        </p>
        <p>
          Der Einsatz von Polizei für planbare, längere Betriebsunterbrechungen
          an einer vorhandenen Lichtzeichenanlage ist auszuschließen. Im Übrigen
          ist er auf das unbedingt notwendige Maß zu begrenzen. Eine Information
          über den jeweils zuständigen Stördienst und dessen Telefonnummer ist
          am Steuergerät der Lichtzeichenanlage anzubringen.
        </p>
        <p>
          Die Verkehrsregelungszentrale (VKRZ) Tel.: 902594 - 605 ist bei
          bestehenden LZA rechtzeitig (2 Wochen vorher) durch den Veranlasser
          über Abschalttermin und Abschaltdauer zu informieren. Nach
          Inbetriebnahme ist die VKRZ durch die Signalbaufirma über
          Einschalttermin und Einschaltzeit unverzüglich in Kenntnis zu setzen.
        </p>

        <h3>Umleitungen</h3>
        <p>
          Die &quot;Richtlinien für Umleitungsbeschilderung (RUB)&quot; und die
          &quot;Richtlinien für verkehrslenkende Maßnahmen der
          Straßenverkehrsbehörden, der Straßenbaubehörden und der Polizei
          (Verkehrslenkungsrichtlinien)” sind zu beachten.
        </p>
        <p>
          Die Umleitung ist so rechtzeitig anzukündigen, dass sich der
          Verkehrsteilnehmer auf die neue, unvorhersehbare Situation einstellen
          kann.
        </p>
        <p>
          Die Umleitungsbeschilderung ist an jeder Stelle mit der örtlich
          vorhandenen Beschilderung abzustimmen.
        </p>
        <p>
          Weiterhin geltende Verkehrszeichen einschl. der Wegweisung und der
          Verkehrseinrichtungen dürfen durch die Umleitungsbeschilderung nicht
          in ihrer Wirkung beeinträchtigt werden.
        </p>
        <p>
          Bei Vollsperrung ist die entgegenstehende wegweisende Beschilderung
          bzw. sind die Zielangaben rot auszukreuzen. Die dazu verwendeten
          Materialien müssen auch bei Nacht deutlich erkennbar sein. Bei
          größeren Umleitungen über längere Streckenabschnitte ist die
          Umleitungsbeschilderung mit Zusatzzeichen, welche den Namen des
          Zielortes enthalten, zu ergänzen.
        </p>

        <h3>Mitwirkungspflicht des (Bau-)Unternehmers</h3>
        <p>
          Der (Bau-)Unternehmer hat im Hinblick auf seine
          Verkehrssicherungspflicht ständig eigenverantwortlich zu prüfen, ob
          zur Sicherung des Straßenverkehrs Maßnahmen geboten sind, die über
          diese verkehrsrechtliche Anordnung hinausgehen. Erscheinen hiernach
          zusätzliche (verkehrsrechtliche) Maßnahmen geboten, ist unverzüglich
          bei der zuständigen Behörde, bei Gefahr im Verzug bei der Polizei,
          ggf. unter Vorlage eines geänderten Verkehrszeichenplanes/ -skizze,
          eine ergänzende verkehrsrechtliche Anordnung einzuholen.
        </p>
        <p>
          Dies gilt auch für eventuell notwendige Änderungen/ Ergänzungen
          infolge des Baugeschehens etc.
        </p>

        <h3>Bekanntgabe von Baubeginn und -ende</h3>
        <p>
          Der Beginn der Arbeiten ist der Straßenverkehrsbehörde des örtlich
          zuständigen Bezirksamtes von Berlin mindestens 3 Tage vorher und die
          Beendigung unverzüglich mitzuteilen (unter Angabe der Maßnahmen-Nummer
          der Anordnung).
        </p>

        <h3>Verantwortliche</h3>
        <p>
          Die benannten Personen müssen über die notwendigen Kenntnisse nach der
          RSA verfügen.
        </p>
        <p>
          Die Eignung und Qualifikationen des/r Verantwortlichen für die
          Sicherung von Arbeitsstellen ist im „Merkblatt über Rahmenbedingungen
          für erforderliche Fachkenntnisse zur Verkehrssicherung an
          Arbeitsstellen an Straße (MVAS 99)“, VkBl. 1999 (Seite 694)
          beschrieben.
        </p>
        <p>
          Auf Verlangen der Straßenverkehrsbehörde sind dazu Nachweise (über
          entsprechende Schulungen/ Qualifikationen) vorzulegen.
        </p>

        <h2>Hinweise</h2>

        <h3>Zuwiderhandlungen gegen diese verkehrsrechtliche Anordnung</h3>
        <p>
          Stellt die Straßenverkehrsbehörde, die Polizei oder eine andere
          zuständige Behörde Zuwiderhandlungen gegen diese verkehrsrechtliche
          Anordnung fest und werden sie vom (Bau-)Unternehmer nicht sofort
          behoben, kann auf Kosten des (Bau-) Unternehmers ein Dritter mit der
          Ausführung betraut werden. Das Gleiche gilt, wenn der
          (Bau-)Unternehmer nur deswegen nicht sofort beheben kann, weil er
          durch mangelnde Erreichbarkeit des Verantwortlichen nicht die
          Gelegenheit dazu erhält.
        </p>
        <p>
          Sofern aus straßenverkehrlicher Sicht erforderlich, kann die
          zuständige Behörde auch eine Beseitigung der Arbeitsstelle auf Kosten
          des (Bau-)Unternehmers veranlassen.
        </p>

        <h3>Gefahr im Verzug</h3>
        <p>
          Bei Gefahr im Verzug ist die Polizei, vertreten durch jeden einzelnen
          Polizeivollzugsbeamten, befugt, anstelle der zuständigen Behörde
          selbst vorläufige Maßnahmen anzuordnen. Dies wird in der
          verkehrsrechtlichen Anordnung vermerkt.{' '}
        </p>

        <h3>Ordnungswidrigkeiten</h3>
        <p>
          Ordnungswidrig im Sinne von § 24 Straßenverkehrsgesetz (StVG) handelt,
          wer vorsätzlich oder fahrlässig entgegen § 45 Abs. 6 StVO mit Arbeiten
          beginnt, ohne zuvor Anordnungen eingeholt zu haben, die Anordnungen
          nicht befolgt oder Lichtzeichenanlagen nicht bedient (§ 49 Abs. 4 Nr.
          3 StVO). Eine zivilrechtliche Haftung oder/ und strafrechtliche
          Konsequenzen sind unbenommen davon möglich.
        </p>

        <h3>Kennzeichnung der Arbeitsstelle</h3>
        <p>
          Dient die Arbeitsstelle zur Durchführung eines Bauvorhabens gemäß § 11
          Absatz 11 Berliner Straßengesetzes (BerlStrG) ist sie nach dieser
          Vorschrift durch ein nach außen hin deutlich lesbares Schild mit den
          Angaben über Beginn, Umfang und Ende der Sondernutzung sowie des
          Namens und der Telefonnummer der Straßenbaubehörde zu kennzeichnen.
        </p>

        <h3>Sondernutzungserlaubnis</h3>
        <p>
          Diese Anordnung regelt nicht die straßenrechtliche Sondernutzung. Die
          Erlaubnis zur Sondernutzung der Straße ist gesondert bei der örtlich
          zuständigen Straßenbaubehörde (Straßen- und Grünflächenamt) zu
          beantragen/ erlangen.
        </p>

        <h2>Rechtshelfsbelehrung</h2>
        <p>
          Gegen diesen Bescheid ist der Widerspruch zulässig. Er ist innerhalb
          eines Monats nach Zugang dieses Bescheides schriftlich oder zur
          Niederschrift bei Bezirksamt Friedrichshain-Kreuzberg,
          Straßenverkehrsbehörde, Petersburger Straße 86-90, 10247 Berlin oder
          in elektronischer Form mit einer qualifizierten elektronischen
          Signatur im Sinne des Vertrauensdienstegesetzes i. V. m. der
          Verordnung (EU) Nr. 910/2014 versehen an die E-Mail-Adresse
          post@ba-fk.berlin.de zu erheben. Bei schriftlicher oder elektronischer
          Einlegung des Widerspruchs ist die Widerspruchsfrist nur dann gewahrt,
          wenn der Widerspruch innerhalb dieser Frist eingegangen ist.
        </p>
        <p>
          Nach § 80 Abs. 2 Nr. 1 der Verwaltungsgerichtsordnung (VwGO) hat ein
          Widerspruch bei der Anforderung von öffentlichen Abgaben und Kosten
          keine aufschiebende Wirkung. Die Erhebung des Widerspruchs befreit
          daher nicht von der fristgemäßen Zahlung der festgesetzten
          Verwaltungsgebühren.
        </p>
        <p>
          Ein erfolgloses Widerspruchsverfahren ist gebührenpflichtig
          (mindestens 25,60 Euro).
        </p>

        <h2>Information</h2>
        <p>
          Der Verkehrszeichenplan ist vor Ort öffentlich einsehbar durch den
          Bauherrn oder den beauftragten Unternehmer auszuhängen (§ 39 Abs. 2
          Satz 1 des Berliner Mobilitätsgesetz -MobG-). Der Verkehrszeichenplan
          soll gut lesbar (nach Möglichkeit nicht größer als im DIN A 2 Format)
          geschützt vor Witterung (vorzugsweise laminiert) sichtbar ausgehangen
          werden; sofern eine Baustelleneinrichtung vorhanden ist, soll der
          Verkehrszeichenplan an dieser im Fußgängerbereich zugänglich
          angebracht werden. Der Verkehrszeichenplan soll um die Angabe der für
          die verkehrsrechtliche Anordnung zuständigen Straßenverkehrsbehörde
          ergänzt werden; personenbezogene Daten sind indes zu schwärzen bzw.
          ist der Verkehrszeichenplan um diese Angaben zu bereinigen.
        </p>
      </Nebenbestimmungen>
      <p>
        Im Auftrag
        <br />
        Ihr Bezirksamt Friedrichshain-Kreuzberg von Berlin
        <br />
        Straßenverkehrsbehörde
      </p>
    </Container>
  );
};

export default TrafficOrder;
