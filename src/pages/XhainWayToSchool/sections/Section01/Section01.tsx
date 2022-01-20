import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';

export const Section01 = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Schulwegenetz Xhain
    </Heading>
    <Paragraph>
      Das Schulwegenetz zeigt, welche Straßen im Bezirk potentiell von vielen
      Schüler*innen genutzt werden. Das Netz wurde durch eine Überlagerung aller
      Routen von Wohnstandorten der Schüler*innen und den Standorten der jeweils
      nächstgelegenen Schule errechnet. In der Karten sind zusätzlich Daten zu
      Spielplätzen zu sehen.
    </Paragraph>
    {/* <Map01 /> */}
    <div
      style={{
        height: '300px',
        width: '100%',
        backgroundColor: 'lightpink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Karte Schulwegenetz + Schulstandorte + Spielplätze
    </div>
    <Paragraph>
      Es wurden in der Analyse private und öffentliche Schulen betrachtet, in
      denen Kinder im Grundschulalter beschult werden. (Verwendete Schularten
      sind Grundschulen, Schulen mit Förderschwerpunkt, Gemeinschaftsschulen und
      eine integrierte Sekundarschule. Da die Lenauschule seit 2020 außer
      Betrieb ist, wurde diese in der Analyse nicht berücksichtigt.)
    </Paragraph>
    <Paragraph>
      Als Wohnstandorte wurden ca. 18.000 anonymisierte Adressen von Kindern im
      Altern von 6-12 Jahren aus dem Einwohnerregister in der Analyse genutzt.
    </Paragraph>
    <Heading as="h3">Was bedeutet das für die Arbeit des Bezirksamts?</Heading>
    <Paragraph>
      Wie sich in der Analyse zeigt, werden sehr viele der Straßen im Bezirk von
      hunderten Schüler*innen täglich genutzt. Diese Verkehrsteilnehmenden
      benötigen besonderen Schutz es sind an allen betroffenen Abschnitten
      Maßnahmen abzuwägen, die mehr Sicherheit für Kinder schaffen.
    </Paragraph>
  </>
);
