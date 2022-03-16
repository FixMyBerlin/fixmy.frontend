import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { MapPlaceholder } from '../components/MapPlaceholder/MapPlaceholder';
import { MapNetworks } from './components';

export const SectionBasics = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Grundlagen (Raumanalyse)
    </Heading>
    <Paragraph>
      Zur Ermittlung von Quell- und Zielpunkten wurden folgende Daten aus OSM
      extrahiert:
    </Paragraph>
    <Paragraph>
      <strong>Quellorte:</strong>
    </Paragraph>
    <List>
      <List.Item>Wohngebiete (als Flächen)</List.Item>
      <List.Item>
        Siedlungszentren als Mittelpunkte mit Anzahl Einwohner:innen (als
        Punkte)
      </List.Item>
    </List>
    <Paragraph>
      <strong>Zielorte: (als Punkte, bzw. Heatmap)</strong>
    </Paragraph>
    <List>
      <List.Item>Bildungseinrichtungen</List.Item>
      <List.Item>Einkaufszentren / -möglichkeiten</List.Item>
      <List.Item>Besorgungen</List.Item>
      <List.Item>Arbeitsplatz konzentrationen</List.Item>
      <List.Item>Freizeit</List.Item>
    </List>
    <MapNetworks />

    <Heading as="h3">Hindernisse & natürliche Grenzen</Heading>
    <Paragraph>
      Neben den natürlichen Barrieren, wie Gewässern, stellen infrastrukturelle
      Barrieren der gebauten Umwelt (Eisenbahntrassen und Autobahnen) eine
      Unterbrechung des Wege- und Wahrnehmungsfluss dar. Zur Identifizierung
      dieser Barrieren wurden Eisenbahnstrecken, Autobahnen und Gewässer aus OSM
      extrahiert und auf der Karte dargestellt.
    </Paragraph>
    <MapPlaceholder alt="Platzhalter Karte" />

    <Heading as="h3">Anschlusspunkte übergeordnete Radnetze und ÖPNV</Heading>
    <Paragraph>
      Als wichtige Anschlusspunkte für ein zu planendes Radnetz wurden
      vorhandene Radnetze und Radnetzplanungen (Datenquellen sind unter der
      Themankarte 4 aufgeführt) mit den Gemeindegrenzen verschnitten und als
      Punkte dargestellt. Ebenso wurden S-Bahn und Regionalbahnstationen aus OSM
      extrahiert und dargestellt.
    </Paragraph>
    <MapPlaceholder alt="Platzhalter Karte" />

    <Heading as="h3">
      Themenkarte 1: Ziele + Barrieren + Anschlusspunkte
    </Heading>
    <Paragraph>
      In der Zusammenführung der oben genannten Daten wurde die Themenkarte 1 –
      Grundlagen mit Quell- und Zielpunkten, wichtigen Anschlusspunkten und
      räumlichen Barrieren erstellt.
    </Paragraph>
    <MapPlaceholder alt="Platzhalter Karte" />
  </>
);
