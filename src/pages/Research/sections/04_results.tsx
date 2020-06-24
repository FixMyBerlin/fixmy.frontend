import React from 'react';

import {
  Paragraph,
  Heading,
  Link,
  ImageFull,
  ImageMulti,
  List,
  BarChart,
  BarChartWrapper
} from '~/components2/Article';

import MS_C_17 from '../images/01_MS_C_17_@x2.jpg';
import MS_C_2 from '../images/01_MS_C_2.jpg';
import MS_C_305 from '../images/01_MS_C_305_@x2.jpg';
import MS_C_587 from '../images/01_MS_C_587_@x2.jpg';
import MS_C_619 from '../images/01_MS_C_619_@x2.jpg';
import MS_C_620 from '../images/01_MS_C_620_@x2.jpg';
import MS_C_980 from '../images/01_MS_C_980_@x2.jpg';

const SectionResults = ({ toc }) => (
  <>
    <div id="statistische-auswertung" />
    <Heading as="h2" toc={toc}>
      Statistische Auswertung
    </Heading>
    <Paragraph>
      Mit den generierten Daten ist die Überprüfung von verschiedensten
      Hypothesen möglich. Ein besonderes Interesse der Forschung liegt
      beispielsweise auf der Nutzergruppe der potentiell Radfahrenden. Ab
      welcher Verkehrsinfrastruktur fühlt sich diese Nutzergruppe im Straßenraum
      sicher? Ist die Verkehrsstärke auch bei einer Trennung zwischen Rad- und
      Kfz-Verkehr eine ausschlaggebende Einflussgröße? Welche
      Verkehrsinfrastruktur empfinden die meisten Befragten als sicher? Welche
      Poller werden als am sichersten empfunden?
    </Paragraph>
    <Paragraph>
      Mittels den zur Verfügung gestellten Daten können interessierte Personen
      diese, sowie ihre eigenen Hypothesen, überprüfen. Mehr dazu im folgenden
      Abschnitt.
    </Paragraph>
    <ImageMulti
      sources={[MS_C_2, MS_C_587]}
      feelsafes={[28, 11]}
      subtitles={[
        '*27,62 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“',
        '*11,05 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“'
      ]}
    />
    <BarChartWrapper
      title="Führung auf der Fahrbahn(HVS-F) mit und ohne Radverkehrsanlage(RVA)"
      source="Anm: Durchschnitt der Bewertungen aller Situationen auf HVS. Busspuren wurden hier in der Gruppe 'mit RVA' aufgenommen."
    >
      <BarChart title="mit RVA" data={[9, 16, 53, 22]} feelsafe={75} />
      <BarChart title="ohne RVA" data={[56, 30, 12, 2]} feelsafe={14} />
      <BarChart
        title="ohne RVA (Vielfahrer)"
        data={[55, 30, 12, 3]}
        feelsafe={15}
      />
      <BarChart
        title="ohne RVA (Seltenfahrer)"
        data={[56, 29, 12, 1]}
        feelsafe={13}
      />
      <BarChart
        title="ohne RVA (weiblich)"
        data={[56, 33, 10, 1]}
        feelsafe={11}
      />
      <BarChart
        title="ohne RVA (männlich)"
        data={[56, 28, 14, 2]}
        feelsafe={16}
      />
    </BarChartWrapper>
    <Paragraph>
      Weitere Auswertungen nach Nutzermerkmalen finden Sie hier:{' '}
      <Link href="https://fixmyberlin.de">Jupyter notebook</Link>
    </Paragraph>

    <Heading as="h3">Ruhender Verkehr erzeugt zusätzliche Konfliktzone</Heading>
    <Paragraph>
      Wird die RVA linksseitig von ruhendem Verkehr geführt, so sinkt das
      Sicherheitsempfinden. Die Anforderungen und Gestaltungsmöglichkeiten an
      die RVA sind grundlegend zu unterscheiden. Bei Führung mit ruhendem
      Verkehr rechts der RVA (Parken-rechts) beeinträchtigt die potentielle
      Gefahr durch Türöffnung der parkenden Autos das Sicherheitsempfinden
      negativ. Weiter zu beachten ist, dass bauliche Trennungen zum fließenden
      KFZ-Verkehr in diesen Situationen nicht möglich sind, was den
      Gestaltungsspielraum bei der Planung verringert. In der Umfrage nicht
      bildlich dargestellt wurde die Gefahr durch ein- sowie ausparkende Autos.
      Das tatsächliche Sicherheitsempfinden in diesen Situationen könnte also
      noch geringer ausfallen.
    </Paragraph>
    <ImageMulti
      sources={[MS_C_17, MS_C_619]}
      feelsafes={[69, 33]}
      subtitles={[
        '*69,09% der Nutzer:innen bewerteten diese Situation ohne Parkstreifen als „sicher“ oder „eher sicher“',
        '*32,76% der Nutzer:innen bewerteten diese Situation mit Parkstreifen als „sicher“ oder „eher sicher“'
      ]}
    />
    <BarChartWrapper
      title="HVS-F: RVA mit und ohne rechtsseitiges Parken"
      source="Anm: Durchschnitt der Bewertungen aller Situationen mit RVA - ohne Tram, Busspur, oder RVA rechts des Parkens"
    >
      <BarChart
        title="mit Parken rechts"
        data={[25, 25, 25, 25]}
        feelsafe={60}
      />
      <BarChart
        title="ohne Parken (inkl. bauliche Trennung) "
        data={[25, 25, 25, 25]}
        feelsafe={85}
      />
      <BarChart
        title="ohne Parken (exkl. bauliche Trennung) "
        data={[25, 25, 25, 25]}
        feelsafe={77}
      />
    </BarChartWrapper>

    <Heading as="h3">Drei zentrale Einflussfaktoren</Heading>
    <Paragraph>
      Für das subjektive Sicherheitsempfinden sind neben der Lage der RVA
      vornehmlich drei Faktoren relevant:
      <List
        items={[
          'Die Breite der RVA',
          'Ihre farbliche Unterscheidung',
          'Vorhandensein einer baulichen Trennung zum fließenden KFZ-Verkehr'
        ]}
      />
    </Paragraph>
    <Paragraph>
      Die Breite der Trennung Links spielt vornehmlich bei Situationen mit
      Parken rechts eine Rolle. Die weiteren in der Umfrage abgefragten
      Faktoren, Tempolimit und Verkehrsstärke, spielen eine vergleichsweise
      unbedeutende Rolle. Hier ist zu berücksichtigen, das die Empfindungen der
      Faktoren Tempolimit und Verkehrsstärke über die Visualisierungen nur
      abstrahiert vermittelt werden kann.
    </Paragraph>
    <BarChartWrapper
      title="RVA an HVS-F: Gewicht der Einflussfaktoren im Mittel"
      source="Anm.: Unterschied der Mittelwerte der Bewertungen aller für das Merkmal relevanter Situationen. Bei Baulicher Trennung, Markierung Links, Tempolimit und Verkehrsaufkommen, werden Nur solche Situationen ohne Tram, Bus und RVA rechts des Parkens einbezogen. Bei der Baulichen Trennung nur solche ohne Parken rechts."
    >
      <BarChart
        title="Gesamtbreite RVA (Breit - schmal)"
        data={[21, 0, 0, 79]}
        feelsafe={0}
      />
      <BarChart
        title="Bauliche Trennung zu fließendem KFZ-Verkehr (ja - nein)"
        data={[22, 0, 0, 78]}
        feelsafe={0}
      />
      <BarChart
        title="Oberflächenfärbung (grün - asphalt)"
        data={[11, 0, 0, 89]}
        feelsafe={0}
      />
      <BarChart
        title="Markierung Links (gestrichelt - Sperrfläche)"
        data={[8, 0, 0, 92]}
        feelsafe={0}
      />
      <BarChart
        title="Tempolimit (30 - 50)"
        data={[3, 0, 0, 97]}
        feelsafe={0}
      />
      <BarChart
        title="Verkehrsstärke (normal - hoch)"
        data={[3, 0, 0, 97]}
        feelsafe={0}
      />
    </BarChartWrapper>

    <Paragraph>
      Die Breite der Trennung Links spielt vornehmlich bei Situationen mit
      Parken rechts eine Rolle. Die weiteren in der Umfrage abgefragten
      Faktoren, Tempolimit und Verkehrsstärke, spielen eine vergleichsweise
      unbedeutende Rolle. Hier ist zu berücksichtigen, das die Empfindungen der
      Faktoren Tempolimit und Verkehrsstärke über die Visualisierungen nur
      abstrahiert vermittelt werden kann.
    </Paragraph>
    <BarChartWrapper
      title="RVA an HVS-F: Gewicht der Einflussfaktoren im Mittel"
      source="Anm: Durchschnitt der Bewertungen aller Situationen"
    >
      <BarChart
        title="Gesamtbreite RVA (Breit - schmal)"
        data={[21, 0, 0, 79]}
        feelsafe={0}
      />
      <BarChart
        title="Bauliche Trennung zu fließendem KFZ-Verkehr (ja - nein)"
        data={[22, 0, 0, 78]}
        feelsafe={0}
      />
      <BarChart
        title="Oberflächenfärbung (grün - asphalt)"
        data={[11, 0, 0, 89]}
        feelsafe={0}
      />
      <BarChart
        title="Markierung Links (gestrichelt - Sperrfläche)"
        data={[8, 0, 0, 92]}
        feelsafe={0}
      />
      <BarChart
        title="Tempolimit (30 - 50)"
        data={[3, 0, 0, 97]}
        feelsafe={0}
      />
      <BarChart
        title="Verkehrsstärke (normal - hoch)"
        data={[3, 0, 0, 97]}
        feelsafe={0}
      />
    </BarChartWrapper>

    <Heading as="h3">
      Breite der RVA zentral, besonders bei Parken rechts
    </Heading>
    <Paragraph>
      In der Umfrage wurde unterschieden zwischen 3,5 Metern (breit) und 2,0
      Metern (schmal) Breite für die RVA inkl. aller links und rechtsseitigen
      Markierungen (s.a. Umfragedesign). Im Ergebnis aller Situationen zeigt
      sich, dass breite RVA in den allermeisten Situationen als sicher empfunden
      werden. Im Durchschnitt bewerten 84% der Teilnehmer:innen “diese als
      sicher” oder “eher sicher”.
      <br />
      Vergleichen wir beispielhaft einen Radstreifen an einer HVS ohne ruhenden
      Verkehr zeigt sich folgender Unterschied:
    </Paragraph>
    <ImageMulti
      sources={[MS_C_305, MS_C_17]}
      feelsafes={[74, 69]}
      subtitles={[
        '*69,09 % der Nutzer:innen bewerteten diese Situation ohne Parkstreifen als „sicher“ oder „eher sicher“',
        '*32,76 % der Nutzer:innen bewerteten diese Situation mit Parkstreifen als „sicher“ oder „eher sicher“'
      ]}
    />
    <Paragraph>
      Bei einem Radstreifen an einer HVS mit Parken-rechts ist der Unterschied
      größer:
    </Paragraph>
    <ImageMulti
      sources={[MS_C_980, MS_C_620]}
      feelsafes={[71, 32]}
      subtitles={[
        '*70,71 % der Nutzer:innen bewerteten diese Situation ohne Parkstreifen als „sicher“ oder „eher sicher“',
        '*32,23 % der Nutzer:innen bewerteten diese Situation mit Parkstreifen als „sicher“ oder „eher sicher“'
      ]}
    />

    <Heading as="h3">Grüne Oberfläche hilft</Heading>
    <Paragraph>
      Wird die RVA durch eine grüne Oberfläche von der KFZ-Fahrbahn
      unterschieden hat dies einen positiven Effekt auf das subjektive
      Sicherheitsempfinden.
    </Paragraph>

    <Heading as="h3">
      Poller stärken Sicherheitsempfinden, Blumenkästen auch
    </Heading>

    <Heading as="h3">Trennung durch ruhenden Verkehr</Heading>

    <ImageFull
      source={MS_C_587}
      feelsafe={63}
      subtitle="*63 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“ aus Fahrradperspektive."
    />
  </>
);

export default SectionResults;
