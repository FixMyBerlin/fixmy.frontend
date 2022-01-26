import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { Map03Crossing } from './Map03Crossing';

export const Section03Crossing: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Fehlende Querungsmöglichkeiten
    </Heading>
    <Paragraph>
      Die dritte Karte analysiert die Kreuzungen des Schulwegenetzes. Hier zeigt
      sich, wo viele Schüler*innen entlang gehen, es jedoch keine
      Querungsmöglichkeit (z.B. Zebrastreifen oder Fußampel) gibt. Auf der Karte
      zeigen orange Punkte zudem, wo häufig Unfälle mit Fußgänger*innen
      stattfinden.
      <br />
      Wo eine Querungsmöglichkeit fehlt, ist in der Karte ein Ausrufezeichen zu
      sehen. Die großen Ausrufezeichen zeigen, dass hier über 300 tägliche
      Schulwege entlang gehen, kleine Icons beschreiben 150-300 Schulwege
      täglich.
      <br />
      Um auch hier die Verkehrssicherheit zu erhöhen, prüft das Bezirksamt
      mögliche Maßnahmen. Das kann die Einrichtung von Zebrastreifen oder
      Lichtsignalanlagen (Ampeln) sein, um ein sicheres Queren von Kindern zu
      ermöglichen.
    </Paragraph>

    <Heading as="h3">
      Karte 2: Schulstandorte an Haupt- und Nebenstraßen, Tempolimits,
      Hauptstraßenklassen und Schulwege
    </Heading>
    <Paragraph>
      Hinweis: Um in der Karte Details anzusehen, klicken Sie auf “Karte
      aktivieren”. Dann können Sie die Karte bewegen sowie rein- und rauszoomen.
    </Paragraph>
    <Map03Crossing />
  </>
);
