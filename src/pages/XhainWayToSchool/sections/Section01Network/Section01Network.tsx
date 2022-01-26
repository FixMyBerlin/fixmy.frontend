import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { Map01Network } from './Map01Network';

export const Section01Network: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Das Schulwegenetz Friedrichshain-Kreuzberg
    </Heading>
    <Paragraph>
      Das Schulwegenetz zeigt, welche Straßen im Bezirk potentiell von vielen
      Schüler*innen genutzt werden. Das Netz wurde durch eine Überlagerung aller
      Routen von Wohnstandorten der Schüler*innen und den Standorten der jeweils
      nächstgelegenen Schule errechnet. In der Karten ist zusätzlich zu sehen,
      wo sich im Bezirk Spielplätze befinden.
    </Paragraph>
    <Paragraph>
      Die Analyse umfasst sowohl öffentliche als auch private Schulen, in denen
      Kinder im Grundschulalter beschult werden. Dazu wurden Grundschulen,
      Schulen mit Förderschwerpunkt, Gemeinschaftsschulen und eine integrierte
      Sekundarschule einbezogen. Da die Lenauschule seit 2020 außer Betrieb ist,
      wurde diese in der Analyse nicht berücksichtigt. Als Wohnstandorte wurden
      ca. 18.000 anonymisierte Adressen von Kindern im Altern von 6-12 Jahren
      aus dem Einwohnerregister für die Analyse genutzt.
    </Paragraph>
    <Paragraph>
      Die Routen zwischen Wohnstandorten und Schulstandorten wurden übereinander
      gelegt, um Streckenabschnitte zu erkennen, die potentiell von sehr vielen
      Schüler*innen täglich genutzt werden. Ergebnis dieser Datenanalyse ist
      eine sehr gute Übersicht, welche Wege täglich von wie vielen Schüler*innen
      im Grundschulalter zurückgelegt werden. Auf der Karte sind jene Straßen
      markiert, auf denen täglich besonders viele Schulwege zurückgelegt werden.
      Je dicker die rote Linie, desto mehr Kinder sind hier unterwegs. Hier kann
      mit wenigen Maßnahmen die Verkehrssicherheit für sehr viele Kinder
      gleichzeitig erhöht werden.
    </Paragraph>

    <Heading as="h3">
      Karte 1: Schulstandorte, häufig genutzte Schulwege, Spielplätze
    </Heading>
    <Paragraph>
      Hinweis: Um in der Karte Details anzusehen, klicken Sie auf “Karte
      aktivieren”. Dann können Sie die Karte bewegen sowie rein- und rauszoomen.
    </Paragraph>
    <Map01Network />

    <Heading as="h3">Was bedeutet das für die Arbeit des Bezirksamts?</Heading>
    <Paragraph>
      Wie sich in der Analyse zeigt, werden sehr viele der Straßen im Bezirk von
      hunderten Schüler*innen täglich genutzt. Diese Verkehrsteilnehmenden
      benötigen besonderen Schutz es sind an allen betroffenen Abschnitten
      Maßnahmen abzuwägen, die mehr Sicherheit für Kinder schaffen.
    </Paragraph>
  </>
);
