import React from 'react';
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';

import {
  Paragraph,
  Heading,
  Quote,
  Image,
  List,
  SectionProps,
} from '~/components2/Article';
import Link from '~/components2/Link';

import diagramLabelledDe from '../images/diagram_labelled_de.jpg';
import diagramLabelledEn from '../images/diagram_labelled_en.jpg';
import diagramLabelledEs from '../images/diagram_labelled_es.jpg';

type Props = WrappedComponentProps & SectionProps;

const SectionAbout = ({ toc, tocAnchor, intl }: Props) => {
  let diagramLabelled: string;
  switch (intl.locale) {
    case 'en':
      diagramLabelled = diagramLabelledEn;
      break;
    case 'es':
      diagramLabelled = diagramLabelledEs;
      break;
    default:
      diagramLabelled = diagramLabelledDe;
  }
  return (
    <>
      <Heading toc={toc} tocAnchor={tocAnchor} as="h2">
        <FormattedMessage
          id="research.03_concept.heading"
          defaultMessage="Umfragekonzept"
        />
      </Heading>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p1"
          defaultMessage="Zur Online-Befragung der Teilnehmenden wurde ein Interface zur Bewertung von fotorealistischen Darstellungen von Straßensituationen geschaffen. Anhand einer vierstufigen Skala konnten die Straßenszenen auf das subjektiven Empfinden von Sicherheit in der Situation bewertet werden."
        />
      </Paragraph>
      <Quote
        sourceText={intl.formatMessage({
          id: 'research.03_concept.p1.quoteSource',
          defaultMessage: 'Herausforderung',
        })}
      >
        <FormattedMessage
          id="research.03_concept.p1.quote"
          defaultMessage="Um subjektive Sicherheit messbar zu machen war es notwendig eine komplexe Systematik von Straßenszenen zu entwickeln und eine hohe Anzahl Teilnehmender zu erreichen."
        />
      </Quote>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p2"
          defaultMessage="Während die objektive Sicherheit von Radfahrenden bereits in vielen Studien untersucht wurde, gibt es zum subjektiven Sicherheitsempfinden bisher kaum Forschungsergebnisse. Die besondere Herausforderung bei der Untersuchung subjektiver Sicherheit ist es, ausreichend Bewertungen einer Situation zu erhalten und gleichzeitig die vielen möglichen Einflussfaktoren für das Sicherheitsempfinden ausreichend detailliert abzubilden. So war es notwendig, für die Umfrage eine hohe Zahl an Varianten von Straßenszenen darzustellen und gleichzeitig mit einer guten Kommunikationsstrategie eine hohe Zahl an Teilnehmenden zu erreichen."
        />
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p3"
          defaultMessage="Mittels einer qualitativen Befragung von Radfahrenden lässt sich normalerweise schwierig ermitteln, welche Breite von Radverkehrsanlagen als “zu schmal” empfunden wird. Ähnliches gilt für das subjektive Empfinden von Straßensituationen sowie die Kombination von gewissen baulichen Merkmalen (z.B. schmaler Radweg und Parkplätze). Darüber hinaus werden häufig in erster Linie Personen befragt, welche ohnehin regelmäßig Fahrrad fahren. Als Konsequenz sind die Daten häufig nur für die Nutzergruppe “Radfahrende” repräsentativ."
        />
      </Paragraph>
      <Paragraph>
        {' '}
        <FormattedMessage
          id="research.03_concept.p4"
          defaultMessage="Durch das Arbeiten mit Bildern von spezifischen Straßen-Szenarien konnte im Rahmen der Umfrage eine direkte Zuordnung vom subjektiven Sicherheitsempfinden in Bezug zu verschiedenen Infrastrukturen und deren Merkmalsausprägungen gemacht werden. Mittels Abfrage von Daten zum Verkehrsverhalten, sowie demografischen Daten konnten diese subjektiven Empfindungen verschiedenen Bevölkerungs- und Verkehrsnutzergruppen (z.B. Autofahrende, Radfahrende etc.) zugeordnet werden. Durch die große Teilnehmendenzahl und die gemeinsam mit dem Tagesspiegel Berlin entwickelte Kommunikationsstrategie konnte eine weit gestreute hohe Anzahl von Personen befragt werden (demografisch und vom Verkehrsverhalten)."
        />
      </Paragraph>
      <Paragraph>
        {' '}
        <FormattedMessage
          id="research.03_concept.p5"
          defaultMessage="Bei der Auswahl der Szenarien sollten Planungen von aktuellen RVA-Varianten berücksichtigt werden. Auf Grundlage einer engen Abstimmung mit der Berliner Senatsverwaltung, der Durchführung von Fach-Workshops, dem Einarbeiten von neuen Infrastrukturkonzepten und dem intensiven Auseinandersetzen mit dem aktuellen Forschungsstand in der Literatur, konnte die Aktualität der Umfrage sichergestellt werden. Beispielsweise hat die Berliner Senatsverwaltung aufgrund von aktuellen Planungen ein besonderes Interesse an der Nutzerwahrnehmung von verschiedenen Sperrpfostenvarianten (Pollern)."
        />
      </Paragraph>
      <Heading as="h3">
        <FormattedMessage
          id="research.03_concept.p6.heading"
          defaultMessage="Kommunikationskonzept"
        />
      </Heading>
      <Paragraph>
        {' '}
        <FormattedMessage
          id="research.03_concept.p6"
          defaultMessage='Die Umfrage wurde als Onlinebefragung konzipiert und in Kooperation mit der Berliner Tageszeitung "Der Tagesspiegel" veröffentlicht. Auf der Internetpräsenz des Tagsspiegels wurde über einen Artikel und Werbebanner auf die Umfrage verwiesen. Zum Auftakt wurde zusätzlich in der Printausgabe ein Artikel als Titelthema mit Verweis auf die Umfrage abgedruckt. Obwohl das Hauptziel die Bewertung von Fahrradinfrastruktur auf subjektive Sicherheit war, wurde die Umfrage neutral als "Berliner Straßencheck" kommuniziert. So konnten für die Umfrage unter anderem mehr als 3.500 Personen gewonnen werden, die angaben, nie Fahrrad zu fahren.'
        />
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p7"
          defaultMessage="Die Umfrage bestand aus drei Abschnitten:"
        />
        <List>
          <List.Item>
            <FormattedMessage
              id="research.03_concept.p7.list1"
              defaultMessage="Allgemeine Fragen zum Verkehr"
            />
          </List.Item>
          <List.Item>
            <FormattedMessage
              id="research.03_concept.p7.list2"
              defaultMessage="Profil- bzw. personenbezogene Fragen"
            />
          </List.Item>
          <List.Item>
            <FormattedMessage
              id="research.03_concept.p7.list3"
              defaultMessage="Bewertungen der unterschiedlichen Straßenszenen"
            />
          </List.Item>
        </List>
      </Paragraph>
      <Heading as="h3">
        <FormattedMessage
          id="research.03_concept.p8.heading"
          defaultMessage="Allgemeine Fragen zum Verkehr (Eingangsfragen)"
        />
      </Heading>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p8"
          defaultMessage="In diesem Abschnitt wurden allgemeine Fragen über den Berliner Verkehr für die redaktionelle Auswertung des Tagesspiegels gestellt. Hier soll nicht näher auf diese Fragen eingegangen werden, da diese nicht Teil der Konzeption sind. Eine {link} dazu hat der Tagesspiegel Berlin gemacht."
          values={{
            link: (
              <a
                href="https://interaktiv.tagesspiegel.de/lab/strassencheck-das-stoert-im-berliner-verkehr-am-meisten/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FormattedMessage
                  id="research.03_concept.p8.link"
                  defaultMessage="Auswertung"
                />
              </a>
            ),
          }}
        />
      </Paragraph>
      <Heading as="h3">
        <FormattedMessage
          id="research.03_concept.p9.heading"
          defaultMessage="Profilfragen"
        />
      </Heading>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p9"
          defaultMessage="Diese Fragen sollen die Zuordnung der Teilnehmer:innen der Umfrage in verschiedene Radfahrtypen ermöglichen. Dies ermöglicht uns, unterschiedliches Antwortverhalten bei der Einschätzung des subjektiven Sicherheitsgefühls besser zu verstehen. Dafür nehmen wir vor allem Bezug auf die Arbeit von Francke, Anke, Lißner (2018). In ihrer Arbeit stellen sie eine Radfahrtypologie vor, mit welcher sie Vorlieben für die Radverkehrsinfrastruktur beschreiben. Da der entsprechende Fragebogen sehr umfangreich ist und das Hauptinteresse der Datenerhebung in dieser Arbeit auf der Bewertung der Szenen lag, wurde der Fragebogen auf das Nötigste reduziert. Änderungen an Fragebögen sorgen zwar dafür, dass die Ergebnisse nicht mehr vergleichbar sind (vgl. Schwarz, 1999 und Catania et al., 1996), dennoch schien diese Entscheidung aus Sicht des Hauptziels der Umfrage richtig. Neben soziodemografischen Merkmalen (Alter, Geschlecht, Wohnort, Kinder) wurden Fragen zum Mobilitäts- dabei insbesondere zum Radfahrverhalten gestellt."
        />
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p10"
          defaultMessage="Darunter fallen:"
        />
        <List>
          <List.Item>
            <FormattedMessage
              id="research.03_concept.p10.list1"
              defaultMessage="Verkehrsmittelnutzung (Modal Split)"
            />
          </List.Item>
          <List.Item>
            <FormattedMessage
              id="research.03_concept.p10.list2"
              defaultMessage="zur Verfügung stehende Verkehrsmittel"
            />
          </List.Item>
          <List.Item>
            <FormattedMessage
              id="research.03_concept.p10.list3"
              defaultMessage="Länge des häufigsten Weges mit dem Fahrrad in Minuten"
            />
          </List.Item>
          <List.Item>
            <FormattedMessage
              id="research.03_concept.p10.list4"
              defaultMessage="Motivation für das Fahrradfahren"
            />
          </List.Item>
          <List.Item>
            <FormattedMessage
              id="research.03_concept.p10.list5"
              defaultMessage="bzw. Gründe gegen das Fahrradfahren"
            />
          </List.Item>
        </List>
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p11"
          defaultMessage="Nach Vervollständigung dieses Teiles der Umfrage wird ein Datensatz für den/die Teilnehmenden angelegt."
        />
      </Paragraph>
      <Heading as="h3">
        <FormattedMessage
          id="research.03_concept.p12.heading"
          defaultMessage="Szenenbewertungen"
        />
      </Heading>
      <Paragraph>
        {' '}
        <FormattedMessage
          id="research.03_concept.p12"
          defaultMessage="Basierend auf den Angaben der Teilnehmenden zur Häufigkeit ihrer Verkehrsmittelnutzung, wurden sie anhand der angegebenen Nutzungshäufigkeit (für die Nutzer:innen nicht sichtbar) als Radfahrende, Fußgänger:innen oder Autofahrende eingestuft. Den Teilnehmenden wurden im Anschluss fünf bzw. zehn Straßenszenen aus der ihrer Nutzergruppe entsprechenden Perspektive gezeigt. Die Straßenszenen konnten auf einer vierstufigen Skala mit “unsicher”, “eher unsicher”, “eher sicher”, oder “sicher” bewertet werden. Im Anschluss konnte der/die Teilnehmende wählen, ob er in dieser Perspektive weitere Szenen bewerten möchte oder auf eine Perspektive aus Sicht der anderen Verkehrsteilnehmenden wechseln möchte. Nach weiteren zehn Szenen wurde der/die Teilnehmende erneut gefragt. So könnte die Umfrage beliebig lange fortgesetzt werden. Im Durchschnitt bewertete jede/r Teilnehmende 22 Szenen."
        />
      </Paragraph>
      <Heading as="h3">
        <FormattedMessage
          id="research.03_concept.p13.heading"
          defaultMessage="Auswahl der Straßenszenen"
        />
      </Heading>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p13"
          defaultMessage="Für die Umfrage entschieden wir uns, Straßenszenen als 3D-Renderings fotorealistisch darzustellen. Die verschiedenen Straßenszenen wurden in drei Experimente unterteilt."
        />
      </Paragraph>
      <List as="ol">
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p14.list1"
            defaultMessage="Hauptverkehrsstraßen - Radführung auf der Fahrbahn"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p14.list2"
            defaultMessage="Nebenstraßen - Radführung auf der Fahrbahn"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p14.list3"
            defaultMessage="Radführung im Seitenraum ( an Hauptverkehrsstraßen)"
          />
        </List.Item>
      </List>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p15"
          defaultMessage="Aufgrund der Vielzahl von möglichen Einflussfaktoren und den daraus resultierenden Szenarien musste die Anzahl der Szenarien eingegrenzt werden. Nach Recherche des aktuellen Stands der Forschung wurden die wichtigsten Einflussfaktoren herausgearbeitet. Jedes Experiment besteht aus einer Grundansicht, zu welcher unterschiedliche Infrastrukturmerkmale hinzugefügt oder verändert werden können. Beispielsweise Experiment 1: Hauptverkehrsstraße - Radführung auf der Fahrbahn: Hier besteht das Grundbild aus einem Fahrstreifen, einer Radverkehrsanlage mit Trennung (links / rechts), einem Parkstreifen und dem Seitenraum:"
        />
      </Paragraph>
      <Image
        source={diagramLabelled}
        alt={intl.formatMessage({
          id: 'research.03_concept.p15.imageLabel',
          defaultMessage: 'Zuvor beschriebene Basis-Straßenszene',
        })}
      />
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p16"
          defaultMessage="Während in diesem Experiment der Seitenraum immer gleich dargestellt wird, werden im Bereich des Fahrstreifens folgende Einflussfaktoren variiert:"
        />
      </Paragraph>
      <List>
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p16.list1"
            defaultMessage="Geschwindigkeit"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p16.list2"
            defaultMessage="Verkehrsaufkommen"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p16.list3"
            defaultMessage="Tram-Schiene ja / nein"
          />
        </List.Item>
      </List>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p17"
          defaultMessage="Im Bereich der Radverkehrsanlage (RVA) werden folgende Faktoren variiert:"
        />
      </Paragraph>
      <List>
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p17.list1"
            defaultMessage="Art und Breite der Trennung links (hier gibt es unterschiedliche Markierungen und bauliche Trennungen)"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p17.list2"
            defaultMessage="Einfärbung und Breite der RVA"
          />
        </List.Item>
        <List.Item>
          <FormattedMessage
            id="research.03_concept.p17.list3"
            defaultMessage="Art und Breite der Trennung rechts"
          />
        </List.Item>
      </List>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p18"
          defaultMessage="Weiter wird eine Reihe parkender Fahrzeuge dargestellt oder nicht."
        />
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p19"
          defaultMessage="Je nach Führungsform wurden die Szenarien zusätzlich zur Radfahrperspektive aus Auto- und/oder Fußperspektive dargestellt. So wurden insgesamt 1900 Szenarien und 3.000 Bilddateien (inkl. Auto und Fußperspektive) erstellt. Ein genauere Dokumentation zur Systematik der Straßenszenarien ist {link} zu finden."
          values={{
            link: (
              <Link
                internal
                href="/uploads/kataster-ki/Umfragekonzept_KatasterKI_Feb2020.pdf"
              >
                <FormattedMessage
                  id="research.03_concept.p19.link"
                  defaultMessage="hier (PDF-Download)"
                />
              </Link>
            ),
          }}
        />
      </Paragraph>
      <Paragraph>
        <FormattedMessage
          id="research.03_concept.p20"
          defaultMessage="Ein Übersicht der Szenen und ihrer Merkmale sind in {link} zu finden"
          values={{
            link: (
              <Link
                internal
                href="/uploads/kataster-ki/Szenarienuebersicht_fuer_Abgabe_KatasterKi_Feb20.ods"
              >
                <FormattedMessage
                  id="research.03_concept.p20.link"
                  defaultMessage="dieser Tabelle (ODS-Download)"
                />
              </Link>
            ),
          }}
        />
      </Paragraph>
    </>
  );
};

export default injectIntl(SectionAbout);
