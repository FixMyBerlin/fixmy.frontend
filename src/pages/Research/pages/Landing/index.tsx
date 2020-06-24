import React from 'react';

import {
  ArticleWrapper,
  ArticleHeader,
  Text,
  Intro,
  Heading,
  Link,
  Quote,
  ImageFull,
  Image,
  ImageMulti,
  List,
  Button,
  BarChart,
  BarChartWrapper
} from '~/components2/Article';

import CP_C_688 from './images/01_CP_C_688.jpg';
import image1 from './images/image-1.jpg';
import MS_C_2 from './images/01_MS_C_2.jpg';
import CP_C_58 from './images/01_CP_C_58_@x2.jpg';
import CP_C_49 from './images/01_CP_C_49_@x2.jpg';
import CP_C_194 from './images/01_CP_C_194_@x2.jpg';
import CP_C_463 from './images/01_CP_C_463_@x2.jpg';
import CP_C_509 from './images/01_CP_C_509_@x2.jpg';
import CP_C_516 from './images/01_CP_C_516_@x2.jpg';
import CP_C_553 from './images/01_CP_C_553_@x2.jpg';
import CP_C_725 from './images/01_CP_C_725_@x2.jpg';
import CP_C_823 from './images/01_CP_C_823_@x2.jpg';
import CP_C_1093 from './images/01_CP_C_1093_@x2.jpg';
import CP_C_1100 from './images/01_CP_C_1100_@x2.jpg';
import CP_P_149 from './images/01_CP_P_149_@x2.jpg';
import CP_P_185 from './images/01_CP_P_185_@x2.jpg';
import CP_P_194 from './images/01_CP_P_194_@x2.jpg';
import CP_P_203 from './images/01_CP_P_203_@x2.jpg';
import CP_P_778 from './images/01_CP_P_778_@x2.jpg';
import MS_C_21 from './images/01_MS_C_21_@x2.jpg';
import MS_C_51 from './images/01_MS_C_51_@x2.jpg';
import MS_C_17 from './images/01_MS_C_17_@x2.jpg';
import MS_C_305 from './images/01_MS_C_305_@x2.jpg';
import MS_C_325 from './images/01_MS_C_325_@x2.jpg';
import MS_C_377 from './images/01_MS_C_377_@x2.jpg';
import MS_C_587 from './images/01_MS_C_587_@x2.jpg';
import MS_C_596 from './images/01_MS_C_596_@x2.jpg';
import MS_C_597 from './images/01_MS_C_597_@x2.jpg';
import MS_C_606 from './images/01_MS_C_606_@x2.jpg';
import MS_C_611 from './images/01_MS_C_611_@x2.jpg';
import MS_C_619 from './images/01_MS_C_619_@x2.jpg';
import MS_C_620 from './images/01_MS_C_620_@x2.jpg';
import MS_C_860 from './images/01_MS_C_860_@x2.jpg';
import MS_C_980 from './images/01_MS_C_980_@x2.jpg';
import MS_C_1220 from './images/01_MS_C_1220_@x2.jpg';
import SE_C_2 from './images/01_SE_C_2_@x2.jpg';
import SE_C_10 from './images/01_SE_C_10_@x2.jpg';
import SE_C_11 from './images/01_SE_C_11_@x2.jpg';
import SE_C_12 from './images/01_SE_C_12_@x2.jpg';
import SE_C_42 from './images/01_SE_C_42_@x2.jpg';
import SE_C_44 from './images/01_SE_C_44_@x2.jpg';
import SE_C_47 from './images/01_SE_C_47_@x2.jpg';
import SE_C_49 from './images/01_SE_C_49_@x2.jpg';
import SE_C_50 from './images/01_SE_C_50_@x2.jpg';
import SE_C_71 from './images/01_SE_C_71_@x2.jpg';


export default function ResearchLanding() {
  return (
    <ArticleWrapper hasToc>
      <ArticleHeader
        toc="Einleitung"
        kicker="Forschungsergebnis - Strassencheck"
        title="Studie zur subjektiven Sicherheit im Radverkehr. - Ergebnisse und Datensatz einer Umfrage mit 20.000 Teilnehmenden"
        publishDate={new Date(2020, 6, 28, 11, 0)}
        author="FixMyCity"
      />
      {/* <Quote sourceText="Überwältigende Zahl an Teilnehmer:innen">
        1.900 unterschiedliche Straßensituationen wurden anhand von 3D-Bildern
        durch über 20.000 Teilnehmer:innen insgesamt 300.000 mal bewertet.
      </Quote> */}
      {/* <ImageMulti sources={[ExampleImageSource, ExampleImageSource]} /> */}
      <Intro>
        Die Mobilitätswende in Berlin und vielen anderen Städten hat begonnen.
        Der Radverkehr soll gute Infrastruktur erhalten, auf der sich alle
        Menschen sicher fühlen. Was aber heißt “sicher für alle” konkret für die
        Planung von Radinfrastruktur? Wir haben eine Umfrage zur Untersuchung
        des subjektiven Sicherheitsempfindens durchgeführt, deren Ergebnisse wir
        hier vorstellen.
      </Intro>
      <Heading toc="Über das Projekt" as="h2">
        Über das Projekt
      </Heading>
      <Text>
        Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
        Kreuzungen die Verkehrsteilnehmenden subjektiv als sicher empfinden.
        Insbesondere zur differenzierten Betrachtung verknüpfter Merkmale, wie
        Führungsform der Radverkehrsanlage (RVA), Ausführung, Breite sowie der
        Situation links und rechts der RVA gibt es bisher kaum Untersuchungen.
        Sind Radfahrstreifen mit Sperrpfosten (Pollern) die beste Lösung, um den
        gefühlten Konflikt zwischen Auto und Fahrrad zu mindern oder sind
        ausreichend breite Radstreifen entscheidend? Welchen Effekt hat die
        Einfärbung von Radstreifen? Unter welchen Bedingungen wird die Führung
        im Seitenraum oder auf der Fahrbahn als sicherer empfunden?
      </Text>
      <Text>
        Um diese Forschungslücke zu schließen haben wir die Umfrage
        “Straßencheck” entwickelt und gemeinsam mit dem Tagesspiegel Berlin
        durchgeführt. Anhand von 3D-Bildern wurden 1.900 unterschiedliche
        Straßensituationen durch 20.000 Teilnehmende bewertet. Die zugrunde
        liegende Systematik (s. Umfrage Konzept) zur Klassifizierung der
        Straßenquerschnitte und ihrer Merkmalsausprägungen erlaubt nun in der
        Auswertung die Einflussgrößen einzelner Merkmale, wie RVA-Breite,
        Oberfläche, baulicher Trennung, rechtsseitiges Parken, usw., zu
        analysieren. Ebenso konnten Erkenntnisse über Unterschiede im
        Sicherheitsempfinden verschiedener Nutzergruppen und zur Perspektive von
        Autofahrenden und Fußgänger:innen gewonnen werden.
      </Text>
     {/* <ImageFull
        source={CP_C_688}
        feelsafe={98}
        subtitle="*97,93% der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“ aus Fahrradperspektive."
      /> */}
      <Image source={CP_C_688} />
      <Text>
        Bei einer Führung auf der Fahrbahn fühlen sich die Radfahrenden rechts vom parkenden Verkehr am sichersten. Unter allen Situationen aus Fahrradperspektive erhielt die oben gezeigte auf einem 3,5 Meter breiten Radstreifen mit grüner Einfärbung und klarer Trennung zum ruhenden Verkehr die meisten Bewertungen “sicher” (75,86%) außerdem 22,07% “eher sicher”. Im Durchschnitt wurden Führungen im Seitenraum als sicherer, als solche im Fließenden Verkehr empfunden. Führungen in Nebenstraßen schnitten erstaunlich unsicher ab, wenn sie nicht “autofrei” dargestellt wurden. In der statistischen Auswertung finden Sie detaillierte Analysen zu den unterschiedlichen Führungsformen und ihrer Einflussfaktoren, sowie Auswertungen der Auto- und Fußperspektive.    
      </Text>
      <Button as="a" href="#statistische-auswertung" target="_blank">
        Direkt zur Auswertung
      </Button>
      <Heading toc="Umfragekonzept" as="h2">
        Umfragekonzept
      </Heading>
      <Text>
        Zur Online-Befragung der Teilnehmenden wurde ein Interface zur Bewertung
        von fotorealistischen Darstellungen von Straßensituationen geschaffen.
        Anhand einer vierstufigen Skala könnten die Straßenszenen auf das
        subjektiven Empfinden von Sicherheit in der Situation bewertet werden.
      </Text>
      <Quote sourceText="Herausforderung">
        Um subjektive Sicherheit messbar zu machen war es notwendig eine
        komplexe Systematik von Straßenszenen zu entwickeln und eine hohe Anzahl
        Teilnehmender zu erreichen.
      </Quote>
      <Text>
        Während die objektive Sicherheit von Radfahrenden bereits in vielen
        Studien untersucht wurde, gibt es zum subjektiven Sicherheitsempfinden
        bisher kaum Forschungsergebnisse. Die besondere Herausforderung bei der
        Untersuchung subjektiver Sicherheit ist es, ausreichend Bewertungen
        einer Situation zu erhalten und gleichzeitig die vielen möglichen
        Einflussfaktoren für das Sicherheitsempfinden ausreichend detailliert
        abzubilden. So war es notwendig, für die Umfrage eine hohe Zahl an
        Varianten von Straßenszenen darzustellen und gleichzeitig mit einer
        guten Kommunikationsstrategie eine hohe Zahl an Teilnehmenden zu
        erreichen.
      </Text>
      <Text>
        Mittels einer qualitativen Befragung von Radfahrenden lässt sich
        schwierig ermitteln, welche Breite von Radverkehrsanlagen als “zu
        schmal” empfunden wird. Ähnliches gilt für das subjektive Empfinden von
        Straßensituationen sowie die Kombination von gewissen baulichen
        Merkmalen (z.B. schmaler Radweg und Parkplätze). Darüber hinaus werden
        häufig in erster Linie Personen befragt, welche ohnehin regelmäßig
        Fahrrad fahren. Als Konsequenz sind die Daten häufig nur für die
        Nutzergruppe “Radfahrende” repräsentativ.
      </Text>
      <Text>
        Durch das Arbeiten mit Bildern von spezifischen Straßen-Szenarien konnte
        im Rahmen der Umfrage eine Zuordnung vom subjektiven
        Sicherheitsempfinden in Bezug zu verschiedenen Infrastrukturen und deren
        Merkmalsausprägungen gemacht werden. Mittels Abfrage von Daten zum
        Verkehrsverhalten, sowie demografischen Daten konnten diese subjektiven
        Empfindungen verschiedenen Bevölkerungs- und Verkehrsnutzergruppen (z.B.
        Autofahrende, Radfahrende etc. ) zugeordnet werden. Durch die große
        Teilnehmendenzahl und die gemeinsam mit dem Tagesspiegel Berlin
        entwickelte Kommunikationsstrategie konnte eine weit gestreute hohe
        Anzahl von Personen befragt werden (demografisch und vom
        Verkehrsverhalten).
      </Text>
      <Text>
        Bei der Auswahl der Szenarien sollten Planungen von aktuellen
        RVA-Varianten berücksichtigt werden. Auf Grundlage einer engen
        Abstimmung mit der Berliner Senatsverwaltung, der Durchführung von
        Fach-Workshops und dem Einarbeiten von neuen Infrastrukturkonzepten und
        dem intensiven Auseinandersetzen mit dem aktuellen Forschungsstand in
        der Literatur, konnte die Aktualität der Umfrage sichergestellt werden.
        Beispielsweise hat die Berliner Senatsverwaltung aufgrund von aktuellen
        Planungen ein besonderes Interesse an der Nutzerwahrnehmung von
        verschiedenen Sperrpfostenvarianten (Pollern).
      </Text>
      <Heading as="h3">Kommunikationskonzept</Heading>
      <Text>
        Die Umfrage wurde als Onlinebefragung konzipiert und in Kooperation mit
        der Berliner Tageszeitung &ldquo;Der Tagesspiegel&rdquo; veröffentlicht.
        Auf der Internetpräsenz des Tagsspiegels wurde über einen Artikel und
        Werbebanner auf die Umfrage verwiesen. Zum Auftakt wurde zusätzlich in
        der Printausgabe ein Artikel als Titelthema mit Verweis auf die Umfrage
        abgedruckt. Obwohl das Hauptziel die Bewertung von Fahrradinfrastruktur
        auf subjektive Sicherheit war, wurde die Umfrage neutral als
        &ldquo;Berliner Straßencheck&rdquo; kommuniziert. So konnten für die
        Umfrage unter anderem mehr als 3.500 Personen gewonnen werden, die
        angaben, nie Fahrrad zu fahren.
      </Text>
      <Heading as="h3">Die Umfrage bestand aus drei Abschnitten:</Heading>
      <List
        items={[
          'Allgemeine Fragen zum Verkehr',
          'Profil- bzw. personenbezogenen Fragen',
          'Bewertungen der unterschiedlichen Straßenszenen'
        ]}
      />
      <Heading as="h3">Allgemeine Fragen zum Verkehr (Eingangsfragen)</Heading>
      <Text>
        In diesem Abschnitt wurden allgemeine Fragen über den Berliner Verkehr
        für die redaktionelle Auswertung des Tagesspiegels gestellt. Hier soll
        nicht näher auf diese Fragen eingegangen werden, da diese nicht Teil der
        Konzeption sind. Die Fragen und die Antwortmöglichkeiten sind aber hier
        zu finden.
      </Text>
      <Heading as="h3">Profilfragen</Heading>
      <Text>
        Diese Fragen sollen die Zuordnung der Teilnehmer:innen der Umfrage in
        verschiedene Radfahrtypen ermöglichen. Dies ermöglicht uns,
        unterschiedliches Antwortverhalten bei der Einschätzung des subjektiven
        Sicherheitsgefühls besser zu verstehen. Dafür nehmen wir vor allem Bezug
        auf die Arbeit von Francke, Anke, Lißner (2019). In ihrer Arbeit stellen
        sie eine Radfahrtypologie vor, mit welcher sie Vorlieben für die
        Radverkehrsinfrastruktur beschreiben. Da der entsprechende Fragebogen
        sehr umfangreich ist und das Hauptinteresse der Datenerhebung in dieser
        Arbeit auf der Bewertung der Szenen lag, wurde der Fragebogen auf das
        Nötigste reduziert. Änderungen an Fragebögen sorgen zwar dafür, dass die
        Ergebnisse nicht mehr vergleichbar sind (u. a. Schwarz, 1999 und Catania
        et al., 1996), dennoch schien diese Entscheidung aus Sicht des
        Hauptziels der Umfrage richtig. Neben soziodemografischen Merkmalen
        (Alter, Geschlecht, Wohnort, Kinder) wurden Fragen zum Mobilitäts- dabei
        insbesondere zum Radfahrverhalten gestellt.
      </Text>
      <Heading as="h3">Darunter fallen:</Heading>
      <List
        items={[
          'Verkehrsmittelnutzung (Modal Split)',
          'zur Verfügung stehende Verkehrsmittel',
          'Länge des häufigsten Weges mit dem Fahrrad in Minuten',
          'Motivation für das Fahrradfahren bzw.',
          'Gründe gegen das Fahrradfahren'
        ]}
      />
      <Text>
        Nach Vervollständigung dieses Teiles der Umfrage wird ein Datensatz für
        den Teilnehmenden angelegt.
      </Text>
      <Heading as="h3">Szenenbewertungen</Heading>
      <Text>
        Basierend auf den Angaben der Teilnehmenden zur Häufigkeit ihrer
        Verkehrsmittelnutzung, wurden Sie (für die Nutzer:innen nicht sichtbar)
        als Radfahrende,Fußgänger:innen oder Autofahrende eingestuft (hier
        entschied, ob der Teilnehmer öfter zu Fuß oder mit dem ÖPNV unterwegs
        ist gegenüber dem Auto). Den Teilnehmenden wurden im Anschluss fünf bzw.
        zehn Straßenszenen aus der ihrer Nutzergruppe entsprechenden Perspektive
        gezeigt. Die Straßenszenen konnten auf einer vierstufigen Skala mit
        “unsicher”, “eher unsicher”, “eher sicher”, oder “sicher” bewertet
        werden. Im Anschluss konnte der Teilnehmende wählen, ob er in dieser
        Perspektive weitere Szenen bewerten möchte oder auf eine Perspektive aus
        Sicht der anderen Verkehrsteilnehmenden wechseln möchte. Nach weiteren
        zehn Szenen wurde der Teilnehmende erneut gefragt. So könnte die Umfrage
        beliebig lange fortgesetzt werden. Im Durchschnitt bewertete jeder
        Teilnehmende 22 Szenen.
      </Text>
      <Heading as="h3">Auswahl der Straßenszenen</Heading>
      <Text>
        Für die Umfrage entschieden wir uns, Straßenszenen als 3D-Renderings
        fotorealistisch darzustellen. Die verschiedenen Straßenszenen wurden in
        drei Experimente unterteilt.
      </Text>
      <List
        as="ol"
        items={[
          'Hauptverkehrsstraßen - Radführung auf der Fahrbahn',
          'Nebenstraßen -  Radführung auf der Fahrbahn',
          'Radführung im Seitenraum ( an Hauptverkehrsstraßen)'
        ]}
      />
      <Text>
        Aufgrund der Vielzahl von möglichen Einflussfaktoren und den daraus
        resultierenden Szenarien musste die Anzahl der Szenarien eingegrenzt
        werden. Nach Recherche des aktuellen Stands der Forschung wurden die
        wichtigsten Einflussfaktoren herausgearbeitet. Jedes Experiment besteht
        aus einer Grundansicht, zu welcher unterschiedliche
        Infrastrukturmerkmale hinzugefügt oder verändert werden können.
        Beispielsweise Experiment 1: Hauptverkehrsstraße - Radführung auf der
        Fahrbahn: Hier besteht das Grundbild aus einem Fahrstreifen, einer
        Radverkehrsanlage mit Trennung (links / rechts), einem Parkstreifen und
        dem Seitenraum:
      </Text>
      <Image source={image1} />
      <Text>
        Während in diesem Experiment der Seitenraum immer gleich dargestellt
        wird, werden im Bereich des Fahrstreifens folgende Einflussfaktoren
        variiert:
      </Text>
      <List
        items={[
          'Geschwindigkeit',
          'Verkehrsaufkommen',
          'Tram-Schiene ja / nein'
        ]}
      />
      <Text>
        Im Bereich der Radverkehrsanlage (RVA) werden folgende Faktoren
        variiert:
      </Text>
      <List
        items={[
          'Art und Breite der Trennung links (hier gibt es unterschiedliche Markierungen und bauliche Trennungen)',
          'Einfärbung und Breite der RVA',
          'Art und Breite der Trennung rechts'
        ]}
      />
      <Text>
        Weiter wird eine Reihe parkender Fahrzeuge dargestellt oder nicht.
        variiert:
      </Text>
      <Text>
        Je nach Führungsform wurden die Szenarien zusätzlich zur
        Radfahrperspektive aus Auto- und/oder Fußperspektive dargestellt. So
        wurden insgesamt 1900 Szenarien und 3.000 Bilddateien (inkl. Auto und
        Fußperspektive) erstellt. Ein genauere Dokumentation zur Systematik der
        Straßenszenarien ist hier zu finden.
      </Text>
      <Heading as="h2" toc="Datensatz der Ergebnisse">
        Datensatz der Ergebnisse zum Download
      </Heading>
      <Text>
        FixMyCity stellt die Daten offen zur Verfügung (&ldquo;open
        data&rdquo;), unter der Bedingung, dass abgeleitete Werke auch
        veröffentlicht werden (&ldquo;share-alike&rdquo;). Details zur Lizenz
        können Sie auf den Seiten der Open Knowledge Foundation nachlesen. Die
        Erklärung zu den Spalten in dem CSV-Datensatz finden Sie in diesem PDF
        zu den Spezifikationen. Laden Sie sich die Ergebnisse der Umfrage über
        den folgenden Button als CSV-Datensatz herunter.
      </Text>
      <Button as="a" href="https://example.com" target="_blank">
        Datensatz herunterladen
      </Button>

      <div id="statistische-auswertung" />
      <Heading as="h2" toc="Statistische Auswertung">
        Statistische Auswertung
      </Heading>
      <Text>
        Mit den generierten Daten ist die Überprüfung von verschiedensten
        Hypothesen möglich. Ein besonderes Interesse der Forschung liegt
        beispielsweise auf der Nutzergruppe der potentiell Radfahrenden. Ab
        welcher Verkehrsinfrastruktur fühlt sich diese Nutzergruppe im
        Straßenraum sicher? Ist die Verkehrsstärke auch bei einer Trennung
        zwischen Rad- und Kfz-Verkehr eine ausschlaggebende Einflussgröße?
        Welche Verkehrsinfrastruktur empfinden die meisten Befragten als sicher?
        Welche Poller werden als am sichersten empfunden?
      </Text>
      <Text>
        Mittels den zur Verfügung gestellten Daten können interessierte Personen
        diese, sowie ihre eigenen Hypothesen, überprüfen. Mehr dazu im folgenden
        Abschnitt.
      </Text>
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
        <BarChart title="ohne RVA (Vielfahrer)" data={[55, 30, 12, 3]} feelsafe={15} />
        <BarChart title="ohne RVA (Seltenfahrer)" data={[56, 29, 12, 1]} feelsafe={13} />
        <BarChart title="ohne RVA (weiblich)" data={[56, 33, 10, 1]} feelsafe={11} />
        <BarChart title="ohne RVA (männlich)" data={[56, 28, 14, 2]} feelsafe={16} />
      </BarChartWrapper>
      <Text>
        Weitere Auswertungen nach Nutzermerkmalen finden Sie hier:{' '}
        <Link href="https://fixmyberlin.de">Jupyter notebook</Link>
      </Text>
      
      <Heading as="h3">
        Ruhender Verkehr erzeugt zusätzliche Konfliktzone
       </Heading>
      <Text>
     Wird die RVA linksseitig von ruhendem Verkehr geführt, so sinkt das Sicherheitsempfinden. Die Anforderungen und Gestaltungsmöglichkeiten an die RVA sind grundlegend zu unterscheiden. Bei Führung mit ruhendem Verkehr rechts der RVA (Parken-rechts) beeinträchtigt die potentielle Gefahr durch Türöffnung der parkenden Autos das Sicherheitsempfinden negativ. 
Weiter zu beachten ist, dass bauliche Trennungen zum fließenden KFZ-Verkehr in diesen Situationen nicht möglich sind, was den Gestaltungsspielraum bei der Planung verringert. In der Umfrage nicht bildlich dargestellt wurde die Gefahr durch ein- sowie ausparkende Autos. Das tatsächliche Sicherheitsempfinden in diesen Situationen könnte also noch geringer ausfallen.
      </Text>
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
        <BarChart title="mit Parken rechts" data={[25, 25, 25, 25]} feelsafe={60} />
        <BarChart title="ohne Parken (inkl. bauliche Trennung) " data={[25, 25, 25, 25]} feelsafe={85} />
        <BarChart title="ohne Parken (exkl. bauliche Trennung) " data={[25, 25, 25, 25]} feelsafe={77} />
       </BarChartWrapper>
      
      <Heading as="h3">
         Drei zentrale Einflussfaktoren
       </Heading>
      <Text>
        Für das subjektive Sicherheitsempfinden sind neben der Lage der RVA vornehmlich drei Faktoren relevant:
        <List
        items={[
          'Die Breite der RVA',
          'Ihre farbliche Unterscheidung',
          'Vorhandensein einer baulichen Trennung zum fließenden KFZ-Verkehr'
        ]}
      />
        </Text>
         <Text>
            Die Breite der Trennung Links spielt vornehmlich bei Situationen mit Parken rechts eine Rolle. Die weiteren in der Umfrage abgefragten Faktoren, Tempolimit und Verkehrsstärke, spielen eine vergleichsweise unbedeutende Rolle. Hier ist zu berücksichtigen, das die Empfindungen der Faktoren Tempolimit und Verkehrsstärke über die Visualisierungen nur abstrahiert vermittelt werden kann.
         </Text>
        <BarChartWrapper
        title="RVA an HVS-F: Gewicht der Einflussfaktoren im Mittel"
        source="Anm.: Unterschied der Mittelwerte der Bewertungen aller für das Merkmal relevanter Situationen. Bei Baulicher Trennung, Markierung Links, Tempolimit und Verkehrsaufkommen, werden Nur solche Situationen ohne Tram, Bus und RVA rechts des Parkens einbezogen. Bei der Baulichen Trennung nur solche ohne Parken rechts."
       >
        <BarChart title="Gesamtbreite RVA (Breit - schmal)" data={[21, 0, 0, 79]} feelsafe={0} />
        <BarChart title="Bauliche Trennung zu fließendem KFZ-Verkehr (ja - nein)" data={[22, 0, 0, 78]} feelsafe={0} />
        <BarChart title="Oberflächenfärbung (grün - asphalt)" data={[11, 0, 0, 89]} feelsafe={0} />
        <BarChart title="Markierung Links (gestrichelt - Sperrfläche)" data={[8, 0, 0, 92]} feelsafe={0} />
        <BarChart title="Tempolimit (30 - 50)" data={[3, 0, 0, 97]} feelsafe={0} />
        <BarChart title="Verkehrsstärke (normal - hoch)" data={[3, 0, 0, 97]} feelsafe={0} />
       </BarChartWrapper>
      
      <Text>
      </Text>
      <Heading as="h3">
         Breite der RVA zentral, besonders bei Parken rechts
       </Heading>
      <Text>
          In der Umfrage wurde unterschieden zwischen 3,5 Metern (breit) und 2,0 Metern (schmal) Breite für die RVA inkl. aller links und rechtsseitigen Markierungen (s.a. Umfragedesign). Im Ergebnis aller Situationen zeigt sich, dass breite RVA in den allermeisten Situationen als sicher empfunden werden. Im Durchschnitt bewerten 84% der Teilnehmer:innen “diese als sicher” oder “eher sicher”.
      <br />
          Vergleichen wir beispielhaft einen Radstreifen an einer HVS ohne ruhenden Verkehr zeigt sich folgender Unterschied:
      </Text>
      <ImageMulti
        sources={[MS_C_305, MS_C_17]}
        feelsafes={[74, 69]}
        subtitles={[
          '*69,09 % der Nutzer:innen bewerteten diese Situation ohne Parkstreifen als „sicher“ oder „eher sicher“',
          '*32,76 % der Nutzer:innen bewerteten diese Situation mit Parkstreifen als „sicher“ oder „eher sicher“'
        ]}
      />
      <Text>
          Bei einem Radstreifen an einer HVS mit Parken-rechts ist der Unterschied größer:
      </Text>
      <ImageMulti
        sources={[MS_C_980, MS_C_620]}
        feelsafes={[71, 32]}
        subtitles={[
          '*70,71 % der Nutzer:innen bewerteten diese Situation ohne Parkstreifen als „sicher“ oder „eher sicher“',
          '*32,23 % der Nutzer:innen bewerteten diese Situation mit Parkstreifen als „sicher“ oder „eher sicher“'
        ]}
      />
      
      <Heading as="h3">Grüne Oberfläche hilft</Heading>
      <Text>
        Wird die RVA durch eine grüne Oberfläche von der KFZ-Fahrbahn unterschieden hat dies einen positiven Effekt  auf das subjektive Sicherheitsempfinden. 
      </Text>
      
      <Heading as="h3">Poller stärken Sicherheitsempfinden, Blumenkästen auch</Heading>
     
      <Heading as="h3">Trennung durch ruhenden Verkehr</Heading>
      
      <ImageFull
        source={MS_C_587}
        feelsafe={63}
        subtitle="*63 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“ aus Fahrradperspektive."
      />

      <Heading as="h2" toc="Wer steht hinter der Umfrage">
        Wer steht hinter der Umfrage
      </Heading>
      <Text>
        FixMyCity unterstützt Städte bei der Umsetzung der Verkehrswende. Das
        Team setzt sich aus Entwickler:innen, Designer:innen,
        Verkehrsplaner:innen sowie Datenspezialist:innen zusammen und entwickelt
        digitale Tools, die eine offene und agile Verwaltungsarbeit ermöglichen.
        Um Städte und Kommunen auf diesem Weg zu begleiten, entwickeln wir Open
        Government Werkzeuge, die es Verwaltungen ermöglichen, die Verkehrswende
        gemeinsam mit den Bürger:innen umzusetzen. Unsere digitalen Tools zur
        einfachen Bedarfsermittlung, effizienten Projektsteuerung, aktiven
        Bürgerkommunikation, und intelligenten Datenanalyse beschleunigen die
        Radverkehrsplanung und erhöhen ihre Akzeptanz.
      </Text>
      <Text>
        Das Team von FixMyCity arbeitet im CityLAB Berlin, wo auch die auf
        dieser Seite beschriebene Umfrage entstanden ist. Wenn Sie mehr über uns
        erfahren wollen, besuchen Sie uns unter{' '}
        <a href="https://fixmycity.de">fixmycity.de</a> oder nehmen Sie direkt
        Kontakt mit uns auf.
      </Text>
      <Text>
        Kontakt:
        <br />
        Tel: 030 - 54 90 86 65
        <br />
        hello@fixmycity.de
        <br />
        Büroadresse:
        <br />
        FixMyCity GmbH c|o CityLAB Berlin
        <br />
        Platz der Luftbrücke 4<br />
        12101 Berlin
        <br />
        <br />
        FixMyCity wird gefördert durch das BMVI und die Senatskanzlei Berlin.
      </Text>
    </ArticleWrapper>
  );
}
