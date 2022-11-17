import React from 'react';
import {
  Heading,
  ImageFull,
  Paragraph,
  SectionProps,
} from '~/components2/Article';
import ImageZesmobil from './images/zesmobil.jpg';
import ImageBeteiligung from './images/beteiligung.jpg';
import ImageDiagramm from './images/diagramm-nudafa.jpg';
import { Link } from '~/components2/Link';

export const SectionRadverkehrskonzept = (props: SectionProps) => (
  <>
    <Heading as="h3" {...props}>
      Datengestützte Entwicklung eines interkommunalen Radverkehrskonzepts
    </Heading>
    <ImageFull
      source={ImageZesmobil}
      alt="Schematische Abbildung eines modifizierten Lastenrades, welches in der aufsuchenden Bürgerbeteiligung eingesetzt wird."
      role="presentation"
    />
    <Paragraph>
      In ihrem Alltag bewegen sich die Bewohner:innen häufig von Zeuthen,
      Eichwalde und Schulzendorf zwischen den Gemeinden. Dafür benötigen sie
      über die Grenzen der eigenen Kommune hinaus eine durchgehende, sichere und
      komfortable Wegeverbindung. Um die Radverkehrsinfrastruktur auch
      kommunenübergreifend auszubauen, wird im NUDAFA-Reallabor derzeit mit
      Hilfe von datengestützten Planungsmethoden ein interkommunales
      Radverkehrskonzept erstellt.
    </Paragraph>
    <Paragraph>
      Seit März 2020 arbeiten die Gemeinden, mit Unterstützung von FixMyCity, an
      datengestützten Analyse- und Planungsmethoden, welche im Rahmen der
      Erstellung eines interkommunalen Radverkehrskonzepts erprobt und
      weiterentwickelt werden.
    </Paragraph>
    <ImageFull
      source={ImageBeteiligung}
      alt="Auf einer Plane mit dem Satellitenbild der Region tragen Mitglieder des Reallabors zusammen mit Bürgern Radwege und gefährliche Abschnitte ein."
      role="presentation"
    />
    <Paragraph>
      Im Fokus steht dabei die von FixMyCity federführend umgesetzte,
      automatisierte Auswertung von OSM-Daten sowie deren grafische Aufbereitung
      in sogenannten Themenkarten (s. nachfolgende Abbildung). Diese
      verdeutlichen die Handlungsbedarfe im gemeinsamen Siedlungsraum und
      unterstützen als niederschwellig verfügbare, gemeinsame Datengrundlage
      interkommunale Abstimmungsprozesse sowie die Erarbeitung und Kommunikation
      konkreter Maßnahmen.
    </Paragraph>
    <ImageFull
      source={ImageDiagramm}
      alt="Diagram zum Aufbau des Reallabors und des digitalen Planungstools."
      role="presentation"
    />
    <Paragraph>
      Der Entwurf des Netzes wird aktuell gemeinsam mit kommunalen
      Vertreter:innen und Bürger:innen erarbeitet und Anfang 2023 als Zielnetz
      veröffentlicht. Aus wissenschaftlicher Sicht werden dabei die Vorteile,
      aber auch die Grenzen der{' '}
      <Link internal href="/radnetzplanung">
        Verwendung von OSM-Daten in Planungsprozessen
      </Link>{' '}
      ausgelotet.
    </Paragraph>
  </>
);
