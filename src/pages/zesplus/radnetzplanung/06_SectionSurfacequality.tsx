import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { StyledList } from '../components';
import { MapSurfacequality } from './components/Maps';

export const SectionSurfacequality = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Komfort &amp; Qualität
    </Heading>
    <Paragraph>
      <strong>Funktion:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>
        Darstellung der Oberflächenqualität der vorhandenen Fahrbahnen, bzw.
        separater Radinfrastruktur
      </List.Item>
    </StyledList>
    <Paragraph>
      <strong>Datenquellen:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>OSM-Daten</List.Item>
    </StyledList>
    <Paragraph>
      <strong>Beschreibung:</strong>
    </Paragraph>
    <Paragraph>
      Für die Entwicklung des Netzes und und die spätere Erstellung einer
      Maßnahmenliste, werden in dieser Karte die Oberflächen aller Fahrbahnen
      (inkl. separate Radinfrastruktur) dargestellt. Die Bewertung ergibt sich
      dabei aus einer Kombination der Bewertung der Oberflächenqualität und aus
      der Beschreibung des Oberflächentyps (Deckschicht).
    </Paragraph>

    <MapSurfacequality />
  </>
);
