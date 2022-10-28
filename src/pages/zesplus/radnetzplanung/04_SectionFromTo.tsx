import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { StyledList } from '../components';
import { MapFromTo } from './components/Maps';

export const SectionFromTo = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Quellen und Ziele
    </Heading>
    <Paragraph>
      <strong>Funktion:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>Identifizierung von Handlungsbedarfen (Analyse)</List.Item>
      <List.Item>
        Analyse wichtiger Quellen und Ziele, sowie Umfeldfaktoren, wie Barrieren
        als Ausgangspunkt für die Zielnetzerstellung und späteren
        Routenentwicklung.
      </List.Item>
    </StyledList>
    <Paragraph>
      <strong>Datenquellen:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>OSM-Daten</List.Item>
      <List.Item>teilweise manuell eingetragene Quell- und Zielorte</List.Item>
    </StyledList>
    <Paragraph>
      <strong>Beschreibung:</strong>
    </Paragraph>
    <Paragraph>
      Die <strong>“Themenkarte Analyse, Quellen und Ziele”</strong> stellt
      wichtige Ziel- und Quellorte sowie physische Barrieren dar, weil der
      Radverkehr dadurch maßgeblich beeinflusst wird: Die Ziel- und Quellorte
      (bspw. dicht besiedelte Wohnstandorte / Ortszentren, Schulen usw.) sollten
      gut erreichbar sein, weil sie Verkehr generieren. Physische Barrieren
      können oft nur an bestimmten Stellen gequert werden, weshalb sie
      Verkehrsströme lenken und bei der Netzplanung besonders berücksichtigt
      werden müssen.
    </Paragraph>
    <Paragraph>
      Diese Themenkarte dient bei der Entwicklung des Radverkehrsnetzes als
      Grundlage für das <strong>Luft- und Wunschliniennetzes</strong>. Später
      kann mit ihr der Netzentwurf geprüft werden und Maßnahmen hinsichtlich
      ihrer Bedeutung im Gesamtnetz beurteilt werden.
    </Paragraph>

    <MapFromTo />
  </>
);
