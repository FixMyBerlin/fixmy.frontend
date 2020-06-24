import React from 'react';

import { Paragraph, Heading, Image, Button } from '~/components2/Article';

import CP_C_688 from '../images/01_CP_C_688.jpg';

const SectionIntroduction = ({ toc }) => (
  <>
    <Heading toc={toc} as="h2">
      Über das Projekt
    </Heading>
    <Paragraph>
      Bisher gibt es kaum Erhebungen, welche Arten von Straßen, Wegen und
      Kreuzungen die Verkehrsteilnehmenden subjektiv als sicher empfinden.
      Insbesondere zur differenzierten Betrachtung verknüpfter Merkmale, wie
      Führungsform der Radverkehrsanlage (RVA), Ausführung, Breite sowie der
      Situation links und rechts der RVA gibt es bisher kaum Untersuchungen.
      Sind Radfahrstreifen mit Sperrpfosten (Pollern) die beste Lösung, um den
      gefühlten Konflikt zwischen Auto und Fahrrad zu mindern oder sind
      ausreichend breite Radstreifen entscheidend? Welchen Effekt hat die
      Einfärbung von Radstreifen? Unter welchen Bedingungen wird die Führung im
      Seitenraum oder auf der Fahrbahn als sicherer empfunden?
    </Paragraph>
    <Paragraph>
      Um diese Forschungslücke zu schließen haben wir die Umfrage “Straßencheck”
      entwickelt und gemeinsam mit dem Tagesspiegel Berlin durchgeführt. Anhand
      von 3D-Bildern wurden 1.900 unterschiedliche Straßensituationen durch
      20.000 Teilnehmende bewertet. Die zugrunde liegende Systematik (s. Umfrage
      Konzept) zur Klassifizierung der Straßenquerschnitte und ihrer
      Merkmalsausprägungen erlaubt nun in der Auswertung die Einflussgrößen
      einzelner Merkmale, wie RVA-Breite, Oberfläche, baulicher Trennung,
      rechtsseitiges Parken, usw., zu analysieren. Ebenso konnten Erkenntnisse
      über Unterschiede im Sicherheitsempfinden verschiedener Nutzergruppen und
      zur Perspektive von Autofahrenden und Fußgänger:innen gewonnen werden.
    </Paragraph>
    <Image source={CP_C_688} />
    <Paragraph>
      Bei einer Führung auf der Fahrbahn fühlen sich die Radfahrenden rechts vom
      parkenden Verkehr am sichersten. Unter allen Situationen aus
      Fahrradperspektive erhielt die oben gezeigte auf einem 3,5 Meter breiten
      Radstreifen mit grüner Einfärbung und klarer Trennung zum ruhenden Verkehr
      die meisten Bewertungen “sicher” (75,86%) außerdem 22,07% “eher sicher”.
      Im Durchschnitt wurden Führungen im Seitenraum als sicherer, als solche im
      Fließenden Verkehr empfunden. Führungen in Nebenstraßen schnitten
      erstaunlich unsicher ab, wenn sie nicht “autofrei” dargestellt wurden. In
      der statistischen Auswertung finden Sie detaillierte Analysen zu den
      unterschiedlichen Führungsformen und ihrer Einflussfaktoren, sowie
      Auswertungen der Auto- und Fußperspektive.
    </Paragraph>
    <Button as="a" href="#statistische-auswertung" target="_blank">
      Direkt zur Auswertung
    </Button>
  </>
);

export default SectionIntroduction;
