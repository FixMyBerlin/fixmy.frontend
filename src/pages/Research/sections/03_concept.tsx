import React from 'react';

import { Paragraph, Heading, Quote, Image, List } from '~/components2/Article';

import image1 from '../images/image-1.jpg';

const SectionAbout = ({ toc }) => (
  <>
    <Heading toc={toc} as="h2">
      Umfragekonzept
    </Heading>
    <Paragraph>
      Zur Online-Befragung der Teilnehmenden wurde ein Interface zur Bewertung
      von fotorealistischen Darstellungen von Straßensituationen geschaffen.
      Anhand einer vierstufigen Skala könnten die Straßenszenen auf das
      subjektiven Empfinden von Sicherheit in der Situation bewertet werden.
    </Paragraph>
    <Quote sourceText="Herausforderung">
      Um subjektive Sicherheit messbar zu machen war es notwendig eine komplexe
      Systematik von Straßenszenen zu entwickeln und eine hohe Anzahl
      Teilnehmender zu erreichen.
    </Quote>
    <Paragraph>
      Während die objektive Sicherheit von Radfahrenden bereits in vielen
      Studien untersucht wurde, gibt es zum subjektiven Sicherheitsempfinden
      bisher kaum Forschungsergebnisse. Die besondere Herausforderung bei der
      Untersuchung subjektiver Sicherheit ist es, ausreichend Bewertungen einer
      Situation zu erhalten und gleichzeitig die vielen möglichen
      Einflussfaktoren für das Sicherheitsempfinden ausreichend detailliert
      abzubilden. So war es notwendig, für die Umfrage eine hohe Zahl an
      Varianten von Straßenszenen darzustellen und gleichzeitig mit einer guten
      Kommunikationsstrategie eine hohe Zahl an Teilnehmenden zu erreichen.
    </Paragraph>
    <Paragraph>
      Mittels einer qualitativen Befragung von Radfahrenden lässt sich schwierig
      ermitteln, welche Breite von Radverkehrsanlagen als “zu schmal” empfunden
      wird. Ähnliches gilt für das subjektive Empfinden von Straßensituationen
      sowie die Kombination von gewissen baulichen Merkmalen (z.B. schmaler
      Radweg und Parkplätze). Darüber hinaus werden häufig in erster Linie
      Personen befragt, welche ohnehin regelmäßig Fahrrad fahren. Als Konsequenz
      sind die Daten häufig nur für die Nutzergruppe “Radfahrende”
      repräsentativ.
    </Paragraph>
    <Paragraph>
      Durch das Arbeiten mit Bildern von spezifischen Straßen-Szenarien konnte
      im Rahmen der Umfrage eine Zuordnung vom subjektiven Sicherheitsempfinden
      in Bezug zu verschiedenen Infrastrukturen und deren Merkmalsausprägungen
      gemacht werden. Mittels Abfrage von Daten zum Verkehrsverhalten, sowie
      demografischen Daten konnten diese subjektiven Empfindungen verschiedenen
      Bevölkerungs- und Verkehrsnutzergruppen (z.B. Autofahrende, Radfahrende
      etc. ) zugeordnet werden. Durch die große Teilnehmendenzahl und die
      gemeinsam mit dem Tagesspiegel Berlin entwickelte Kommunikationsstrategie
      konnte eine weit gestreute hohe Anzahl von Personen befragt werden
      (demografisch und vom Verkehrsverhalten).
    </Paragraph>
    <Paragraph>
      Bei der Auswahl der Szenarien sollten Planungen von aktuellen
      RVA-Varianten berücksichtigt werden. Auf Grundlage einer engen Abstimmung
      mit der Berliner Senatsverwaltung, der Durchführung von Fach-Workshops und
      dem Einarbeiten von neuen Infrastrukturkonzepten und dem intensiven
      Auseinandersetzen mit dem aktuellen Forschungsstand in der Literatur,
      konnte die Aktualität der Umfrage sichergestellt werden. Beispielsweise
      hat die Berliner Senatsverwaltung aufgrund von aktuellen Planungen ein
      besonderes Interesse an der Nutzerwahrnehmung von verschiedenen
      Sperrpfostenvarianten (Pollern).
    </Paragraph>
    <Heading as="h3">Kommunikationskonzept</Heading>
    <Paragraph>
      Die Umfrage wurde als Onlinebefragung konzipiert und in Kooperation mit
      der Berliner Tageszeitung &ldquo;Der Tagesspiegel&rdquo; veröffentlicht.
      Auf der Internetpräsenz des Tagsspiegels wurde über einen Artikel und
      Werbebanner auf die Umfrage verwiesen. Zum Auftakt wurde zusätzlich in der
      Printausgabe ein Artikel als Titelthema mit Verweis auf die Umfrage
      abgedruckt. Obwohl das Hauptziel die Bewertung von Fahrradinfrastruktur
      auf subjektive Sicherheit war, wurde die Umfrage neutral als
      &ldquo;Berliner Straßencheck&rdquo; kommuniziert. So konnten für die
      Umfrage unter anderem mehr als 3.500 Personen gewonnen werden, die
      angaben, nie Fahrrad zu fahren.
    </Paragraph>
    <Paragraph>
      Die Umfrage bestand aus drei Abschnitten:
      <List>
        <List.Item>Allgemeine Fragen zum Verkehr</List.Item>
        <List.Item>Profil- bzw. personenbezogene Fragen</List.Item>
        <List.Item>Bewertungen der unterschiedlichen Straßenszenen</List.Item>
      </List>
    </Paragraph>
    <Heading as="h3">Allgemeine Fragen zum Verkehr (Eingangsfragen)</Heading>
    <Paragraph>
      In diesem Abschnitt wurden allgemeine Fragen über den Berliner Verkehr für
      die redaktionelle Auswertung des Tagesspiegels gestellt. Hier soll nicht
      näher auf diese Fragen eingegangen werden, da diese nicht Teil der
      Konzeption sind. Die Fragen und die Antwortmöglichkeiten sind aber hier zu
      finden.
    </Paragraph>
    <Heading as="h3">Profilfragen</Heading>
    <Paragraph>
      Diese Fragen sollen die Zuordnung der Teilnehmer:innen der Umfrage in
      verschiedene Radfahrtypen ermöglichen. Dies ermöglicht uns,
      unterschiedliches Antwortverhalten bei der Einschätzung des subjektiven
      Sicherheitsgefühls besser zu verstehen. Dafür nehmen wir vor allem Bezug
      auf die Arbeit von Francke, Anke, Lißner (2019). In ihrer Arbeit stellen
      sie eine Radfahrtypologie vor, mit welcher sie Vorlieben für die
      Radverkehrsinfrastruktur beschreiben. Da der entsprechende Fragebogen sehr
      umfangreich ist und das Hauptinteresse der Datenerhebung in dieser Arbeit
      auf der Bewertung der Szenen lag, wurde der Fragebogen auf das Nötigste
      reduziert. Änderungen an Fragebögen sorgen zwar dafür, dass die Ergebnisse
      nicht mehr vergleichbar sind (u. a. Schwarz, 1999 und Catania et al.,
      1996), dennoch schien diese Entscheidung aus Sicht des Hauptziels der
      Umfrage richtig. Neben soziodemografischen Merkmalen (Alter, Geschlecht,
      Wohnort, Kinder) wurden Fragen zum Mobilitäts- dabei insbesondere zum
      Radfahrverhalten gestellt.
    </Paragraph>
    <Paragraph>
      Darunter fallen:
      <List>
        <List.Item>Verkehrsmittelnutzung (Modal Split)</List.Item>
        <List.Item>zur Verfügung stehende Verkehrsmittel</List.Item>
        <List.Item>
          Länge des häufigsten Weges mit dem Fahrrad in Minuten
        </List.Item>
        <List.Item>Motivation für das Fahrradfahren bzw.</List.Item>
        <List.Item>Gründe gegen das Fahrradfahren</List.Item>
      </List>
    </Paragraph>
    <Paragraph>
      Nach Vervollständigung dieses Teiles der Umfrage wird ein Datensatz für
      den Teilnehmenden angelegt.
    </Paragraph>
    <Heading as="h3">Szenenbewertungen</Heading>
    <Paragraph>
      Basierend auf den Angaben der Teilnehmenden zur Häufigkeit ihrer
      Verkehrsmittelnutzung, wurden Sie (für die Nutzer:innen nicht sichtbar)
      als Radfahrende,Fußgänger:innen oder Autofahrende eingestuft (hier
      entschied, ob der Teilnehmer öfter zu Fuß oder mit dem ÖPNV unterwegs ist
      gegenüber dem Auto). Den Teilnehmenden wurden im Anschluss fünf bzw. zehn
      Straßenszenen aus der ihrer Nutzergruppe entsprechenden Perspektive
      gezeigt. Die Straßenszenen konnten auf einer vierstufigen Skala mit
      “unsicher”, “eher unsicher”, “eher sicher”, oder “sicher” bewertet werden.
      Im Anschluss konnte der Teilnehmende wählen, ob er in dieser Perspektive
      weitere Szenen bewerten möchte oder auf eine Perspektive aus Sicht der
      anderen Verkehrsteilnehmenden wechseln möchte. Nach weiteren zehn Szenen
      wurde der Teilnehmende erneut gefragt. So könnte die Umfrage beliebig
      lange fortgesetzt werden. Im Durchschnitt bewertete jeder Teilnehmende 22
      Szenen.
    </Paragraph>
    <Heading as="h3">Auswahl der Straßenszenen</Heading>
    <Paragraph>
      Für die Umfrage entschieden wir uns, Straßenszenen als 3D-Renderings
      fotorealistisch darzustellen. Die verschiedenen Straßenszenen wurden in
      drei Experimente unterteilt.
    </Paragraph>
    <List as="ol">
      <List.Item>Hauptverkehrsstraßen - Radführung auf der Fahrbahn</List.Item>
      <List.Item>Nebenstraßen - Radführung auf der Fahrbahn</List.Item>
      <List.Item>Radführung im Seitenraum ( an Hauptverkehrsstraßen)</List.Item>
    </List>
    <Paragraph>
      Aufgrund der Vielzahl von möglichen Einflussfaktoren und den daraus
      resultierenden Szenarien musste die Anzahl der Szenarien eingegrenzt
      werden. Nach Recherche des aktuellen Stands der Forschung wurden die
      wichtigsten Einflussfaktoren herausgearbeitet. Jedes Experiment besteht
      aus einer Grundansicht, zu welcher unterschiedliche Infrastrukturmerkmale
      hinzugefügt oder verändert werden können. Beispielsweise Experiment 1:
      Hauptverkehrsstraße - Radführung auf der Fahrbahn: Hier besteht das
      Grundbild aus einem Fahrstreifen, einer Radverkehrsanlage mit Trennung
      (links / rechts), einem Parkstreifen und dem Seitenraum:
    </Paragraph>
    <Image source={image1} />
    <Paragraph>
      Während in diesem Experiment der Seitenraum immer gleich dargestellt wird,
      werden im Bereich des Fahrstreifens folgende Einflussfaktoren variiert:
    </Paragraph>
    <List>
      <List.Item>Geschwindigkeit</List.Item>
      <List.Item>Verkehrsaufkommen</List.Item>
      <List.Item>Tram-Schiene ja / nein</List.Item>
    </List>
    <Paragraph>
      Im Bereich der Radverkehrsanlage (RVA) werden folgende Faktoren variiert:
    </Paragraph>
    <List>
      <List.Item>
        Art und Breite der Trennung links (hier gibt es unterschiedliche
        Markierungen und bauliche Trennungen)
      </List.Item>
      <List.Item>Einfärbung und Breite der RVA</List.Item>
      <List.Item>Art und Breite der Trennung rechts</List.Item>
    </List>
    <Paragraph>
      Weiter wird eine Reihe parkender Fahrzeuge dargestellt oder nicht.
      variiert:
    </Paragraph>
    <Paragraph>
      Je nach Führungsform wurden die Szenarien zusätzlich zur
      Radfahrperspektive aus Auto- und/oder Fußperspektive dargestellt. So
      wurden insgesamt 1900 Szenarien und 3.000 Bilddateien (inkl. Auto und
      Fußperspektive) erstellt. Ein genauere Dokumentation zur Systematik der
      Straßenszenarien ist hier zu finden.
    </Paragraph>
    <Paragraph>
      Ein genauere Dokumentation zur Systematik der Straßenszenarien ist <a
        href="/uploads/kataster-ki/Umfragekonzept_KatasterKI_Feb2020.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        hier [.pdf Download]
      </a> zu finden.
    </Paragraph>
    <Paragraph>
      Ein Übersicht der Szenen und ihrer Merkmale sind in <a
        href="/uploads/kataster-ki/Szenarienuebersicht_fuer_Abgabe_KatasterKi_Feb20.ods"
        target="_blank"
        rel="noopener noreferrer"
      >
      dieser Tabelle [.ods Download]</a> zu finden
    </Paragraph>
    </>
);

export default SectionAbout;
