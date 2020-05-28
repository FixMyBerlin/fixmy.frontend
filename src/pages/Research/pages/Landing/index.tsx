import React from 'react';

import {
  ArticleWrapper,
  ArticleHeader,
  Text,
  Intro,
  Heading,
  Quote,
  Image,
  MultiImage
} from '~/components2/Article';

import ExampleImageSource from '~/images/gastro/landing-bg.jpg';

export default function ResearchLanding() {
  return (
    <ArticleWrapper hasToc>
      <ArticleHeader
        toc="Einleitung"
        kicker="Forschungsergebnis - Strassencheck"
        title="Studie zur subjektiven Sicherheit im Radverkehr. - Ergebnisse und
            Datensatz einer Umfrage mit 20.000 Teilnehmer:innen"
        publishDate={new Date(2020, 6, 28, 11, 0)}
        author="Heiko Rintelen"
      />
      <Intro>
        Die Mobilitätswende in Berlin und vielen anderen Städten hat begonnen.
        Der Radverkehr soll gute Infrastruktur erhalten auf der sich alle
        Menschen sicher fühlen. Was aber heißt “sicher für alle” konkret für die
        Planung von Radinfrastruktur? Wir haben eine Umfrage zur Untersuchung
        des subjektiven Sicherheitsempfindens durchgeführt, deren Ergebnisse wir
        hier vorstellen.
      </Intro>
      <Text>
        Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
        Kreuzungen die Verkehrsteilnehmer:innen subjektiv als sicher empfinden.
        Insbesondere zur differenzierten Betrachtung verknüpfter Merkmale, wie
        Führungsform der Radinfrastruktur (RVA), Ausführung, Breite sowie der
        Situation links und rechts der RVA gibt es bisher kaum Untersuchungen.
        Sind Radfahrstreifen mit Pollern die beste Lösung, um Konflikte zwischen
        Auto und Fahrrad zu vermeiden oder sind ausreichend breite Radstreifen
        entscheidend? Welchen Effekt hat die Einfärbung von Radstreifen? Unter
        welchen Bedingungen wird die Führung im Seitenraum oder auf der Fahrbahn
        als sicherer empfunden?
      </Text>
      <Heading toc="Die Umfrage" as="h2">
        Die Umfrage und ihr Ausgangspunkt
      </Heading>
      <Text>
        Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
        Kreuzungen die Verkehrsteilnehmer:innen subjektiv als sicher empfinden.
        Insbesondere zur differenzierten Betrachtung verknüpfter Merkmale, wie
        Führungsform der Radinfrastruktur (RVA), Ausführung, Breite sowie der
        Situation links und rechts der RVA gibt es bisher kaum Untersuchungen.
        Sind Radfahrstreifen mit Pollern die beste Lösung, um Konflikte zwischen
        Auto und Fahrrad zu vermeiden oder sind ausreichend breite Radstreifen
        entscheidend? Welchen Effekt hat die Einfärbung von Radstreifen? Unter
        welchen Bedingungen wird die Führung im Seitenraum oder auf der Fahrbahn
        als sicherer empfunden?
      </Text>
      <Quote sourceText="Überwältigende Zahl an Teilnehmer:innen">
        1.900 unterschiedliche Straßensituationen wurden anhand von 3D-Bildern
        durch über 20.000 Teilnehmer:innen insgesamt 300.000 mal bewertet.
      </Quote>
      <Text>
        Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
        Kreuzungen die Verkehrsteilnehmer:innen subjektiv als sicher empfinden.
        Insbesondere zur differenzierten Betrachtung verknüpfter Merkmale, wie
        Führungsform der Radinfrastruktur (RVA), Ausführung, Breite sowie der
        Situation links und rechts der RVA gibt es bisher kaum Untersuchungen.
        Sind Radfahrstreifen mit Pollern die beste Lösung, um Konflikte zwischen
        Auto und Fahrrad zu vermeiden oder sind ausreichend breite Radstreifen
        entscheidend? Welchen Effekt hat die Einfärbung von Radstreifen? Unter
        welchen Bedingungen wird die Führung im Seitenraum oder auf der Fahrbahn
        als sicherer empfunden?
      </Text>
      <Heading toc="Multi Image Test" as="h2">
        Multi Image Test
      </Heading>
      <MultiImage sources={[ExampleImageSource, ExampleImageSource]} />
      <Text>
        Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
        Kreuzungen die Verkehrsteilnehmer:innen subjektiv als sicher empfinden.
        Insbesondere zur differenzierten Betrachtung verknüpfter Merkmale, wie
        Führungsform der Radinfrastruktur (RVA), Ausführung, Breite sowie der
        Situation links und rechts der RVA gibt es bisher kaum Untersuchungen.
        Sind Radfahrstreifen mit Pollern die beste Lösung, um Konflikte zwischen
        Auto und Fahrrad zu vermeiden oder sind ausreichend breite Radstreifen
        entscheidend? Welchen Effekt hat die Einfärbung von Radstreifen? Unter
        welchen Bedingungen wird die Führung im Seitenraum oder auf der Fahrbahn
        als sicherer empfunden?
      </Text>
      <Heading toc="Multi Image Test 2" as="h2">
        Multi Image Test 2
      </Heading>
      <MultiImage
        sources={[ExampleImageSource, ExampleImageSource, ExampleImageSource]}
      />
      <Text>
        Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
        Kreuzungen die Verkehrsteilnehmer:innen subjektiv als sicher empfinden.
        Insbesondere zur differenzierten Betrachtung verknüpfter Merkmale, wie
        Führungsform der Radinfrastruktur (RVA), Ausführung, Breite sowie der
        Situation links und rechts der RVA gibt es bisher kaum Untersuchungen.
        Sind Radfahrstreifen mit Pollern die beste Lösung, um Konflikte zwischen
        Auto und Fahrrad zu vermeiden oder sind ausreichend breite Radstreifen
        entscheidend? Welchen Effekt hat die Einfärbung von Radstreifen? Unter
        welchen Bedingungen wird die Führung im Seitenraum oder auf der Fahrbahn
        als sicherer empfunden?
      </Text>
      <Heading toc="Single Image Test" as="h2">
        Single Image Test
      </Heading>
      <Image source={ExampleImageSource} />
    </ArticleWrapper>
  );
}
