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
      sich, wo viele Schüler*innen entlang gehen, es jedoch keine gesicherte
      Querungsmöglichkeit (z.B. Zebrastreifen oder Fußampel) gibt. Auf der Karte
      zeigen orange Punkte zudem, wo relativ häufig Unfälle mit Fußgänger*innen
      stattfinden.
      <br />
      Wo eine Querungsmöglichkeit fehlt, ist in der Karte ein Ausrufezeichen zu
      sehen. Die großen Ausrufezeichen zeigen, dass hier über 300 tägliche
      Schulwege entlang gehen. Die kleinen Icons beschreiben 150-300 Schulwege
      täglich.
      <br />
      Um auch hier die Verkehrssicherheit zu erhöhen, prüft das Bezirksamt
      mögliche Maßnahmen. Das kann die Einrichtung von Zebrastreifen,
      Gehwegvorstreckungen oder Lichtsignalanlagen (Ampeln) sein, um ein
      sicheres Queren von Kindern zu ermöglichen.
    </Paragraph>

    <Heading as="h3">
      Karte 2: Querungs&shy;möglichkeiten und Unfälle mit
      Fußgänger*&shy;Innenbeteiligung
    </Heading>
    <Paragraph>
      <i>
        Hinweis: Um in der Karte Details anzusehen, klicken Sie auf “Karte
        aktivieren”. Dann können Sie die Karte bewegen sowie rein- und
        rauszoomen.
      </i>
    </Paragraph>
    <Map03Crossing />
  </>
);
