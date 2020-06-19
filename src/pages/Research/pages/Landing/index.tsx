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
import image3 from './images/image-3.png';
import image4 from './images/image-4.png';

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
      <ImageFull
        source={CP_C_688}
        feelsafe={95}
        subtitle="*95 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“ aus Fahrradperspektive."
      />
      <Image source={image0} />
      <Text>
        Bei Führung auf der Fahrbahn fühlen sich die Teilnehmenden unter allen Situationen aus Fahrradperspektive auf einem   3,5 Meter breiten Radstreifen mit grüner Einfärbung, geführt rechts vom parkenden Verkehr am sichersten. Insgesamt wurden Führungen im Seitenraum am sichersten empfunden. In der statistischen Auswertung finden Sie eine dazu viele Analysen der unterschiedlichen Führungsformen und ihrer Einflussfaktoren, sowie der unterschiedlichen Perspektiven.

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
        der Berliner Tageszeitung "Der Tagesspiegel" veröffentlicht. Auf der
        Internetpräsenz des Tagsspiegels wurde über einen Artikel und
        Werbebanner auf die Umfrage verwiesen. Zum Auftakt wurde zusätzlich in
        der Printausgabe ein Artikel als Titelthema mit Verweis auf die Umfrage
        abgedruckt. Obwohl das Hauptziel die Bewertung von Fahrradinfrastruktur
        auf subjektive Sicherheit war, wurde die Umfrage neutral als "Berliner
        Straßencheck" kommuniziert. So konnten für die Umfrage unter anderem
        mehr als 3.500 Personen gewonnen werden, die angaben, nie Fahrrad zu
        fahren.
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
        FixMyCity stellt die Daten offen zur Verfügung ("open data"), unter der
        Bedingung, dass abgeleitete Werke auch veröffentlicht werden
        ("share-alike"). Details zur Lizenz können Sie auf den Seiten der Open
        Knowledge Foundation nachlesen. Die Erklärung zu den Spalten in dem
        CSV-Datensatz finden Sie in diesem PDF zu den Spezifikationen. Laden Sie
        sich die Ergebnisse der Umfrage über den folgenden Button als
        CSV-Datensatz herunter.
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
        sources={[image3, image4]}
        feelsafes={[38, 16]}
        subtitles={[
          '*38 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“ aus Fahrradperspektive.',
          '*16 % der Nutzer:innen bewerteten diese Situation als „sicher“ oder „eher sicher“ aus Fahrradperspektive.'
        ]}
      />
      <BarChartWrapper
        title="Führung auf der Fahrbahn ohne (RVA)"
        source="Anm: Durchschnitt der Bewertungen von Situationen auf HVS, ausgenommen wurden Situationen mit Tramschienen, Busfahrspuren…"
      >
        <BarChart title="HVS mit RVA" data={[9, 6, 53, 32]} feelsafe={15} />
        <BarChart title="HVS ohne RVA" data={[33, 40, 22, 5]} feelsafe={30} />
        <BarChart
          title="HVS ohne RVA (Vielfahrer)"
          data={[33, 40, 22, 5]}
          feelsafe={45}
        />
        <BarChart
          title="HVS ohne RVA (Wenigfahrer)"
          data={[33, 40, 22, 5]}
          feelsafe={60}
        />
        <BarChart
          title="HVS ohne RVA (Wenigfahrer)"
          data={[33, 40, 22, 5]}
          feelsafe={75}
        />
        <BarChart
          title="HVS ohne RVA (Wenigfahrer)"
          data={[33, 40, 22, 5]}
          feelsafe={99}
        />
      </BarChartWrapper>
      <Text>
        Weitere Auswertungen nach Nutzermerkmalen finden Sie hier:{' '}
        <Link href="https://fixmyberlin.de">Jupyter notebook</Link>
      </Text>
      <ImageFull
        source={image3}
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
