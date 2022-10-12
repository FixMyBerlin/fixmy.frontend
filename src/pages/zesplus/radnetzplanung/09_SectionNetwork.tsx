import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { StyledList } from '../components';
import { MapPlaceholder } from '../components/MapPlaceholder/MapPlaceholder';

export const SectionNetwork = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Erstellung Zielnetz, Radnetz und Maßnahmenliste
    </Heading>
    <Paragraph>
      Auf Basis der Themenkarten wird zunächst in einem interkommunalen Workshop
      ein Zielnetz erstellt und dann gemeinsam mit der Zivilgesellschaft und
      Fachplanenden ein Entwurf für das Radnetz für die drei Kommunen.
    </Paragraph>
    <Heading as="h3">Themenkarte Zielnetz / Netzkonzept</Heading>
    <Paragraph>
      <strong>Funktion:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>
        Darstellung eines Zielnnetzes (Luftlinien) zur Festlegung der
        Verbindungsfunktionen.
      </List.Item>
      <List.Item>Darstellung bestehender Netzentwürfe.</List.Item>
    </StyledList>
    <Paragraph>
      <strong>Datenquellen:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>Manuell importierte Daten</List.Item>
    </StyledList>
    <Paragraph>
      <strong>Beschreibung:</strong>
    </Paragraph>
    <MapPlaceholder alt="TODO Platzhalter Karte Prüfkonzept" />
  </>
);
