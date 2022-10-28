import React from 'react';
import { Heading, List, Paragraph, SectionProps } from '~/components2/Article';
import { StyledList } from '../components';
import { MapRoadClassification } from './components/Maps';

export const SectionRoadClassification = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Straßentypen
    </Heading>
    <Paragraph>
      <strong>Funktion:</strong>
    </Paragraph>
    <StyledList>
      <List.Item>
        Identifizierung und Zuordnung von für Radnetzplanung relevanter
        Straßenquerschnittstypen. Enthält Hinweise zur Straßenklasse und
        Nutzungsbedürfnissen.
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
      Beschreibung: Für die Themenkarte “Straßentypen” wurde eine Systematik
      entwickelt, mit der die in den Gemeinden typischerweise vorhandenen
      Straßentypen bzw. Straßenquerschnitte anhand der OSM-Daten verortet werden
      können. Auf Basis der Straßentypen können im Folgeschritt die jeweils
      geeigneten Führungsformen für den Radverkehr identifiziert und zugeordnet
      werden. In einer Übersichtstabelle werden dann für die einzelnen
      Führungsformen Empfehlungen für Mindestbreiten und Rahmenbedingungen
      festgelegt, die den örtlichen Gegebenheiten entsprechen.
    </Paragraph>
    <Paragraph>
      So kann z.B. in einer reinen Wohnstraße eine Führung auf der Fahrbahn
      geeignet sein, auf einer Haupt- oder Sammelstraße innerorts kann eine
      Führung im Seitenraum geeignet sein, auf einer Hauptstreße außerorts wird
      in der regel eine separate Radinfrastruktur notwendig sein.
      Geschäftsstraßen mit besonderen Anforderungen des Fußverkehrs und
      Lieferverkehrs können über die Einblendung der POIs identifiziert werden.
    </Paragraph>

    <MapRoadClassification />
  </>
);
