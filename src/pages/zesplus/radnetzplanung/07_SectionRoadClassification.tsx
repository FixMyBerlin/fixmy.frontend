import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { MapRoadClassification } from './components/Maps';

export const SectionRoadClassification = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Themenkarte Straßentypen
    </Heading>
    <Paragraph>
      Für die “Themenkarte <strong>Straßentypen”</strong> wurde eine Systematik
      entwickelt, mit der die in den Gemeinden typischerweise vorhandenen
      Straßentypen bzw. Straßenquerschnitte anhand der OSM-Daten verortet werden
      können. Im Folgeschritt helfen die Straßentypen, den Straßenabschnitten
      die jeweils in Frage kommende Führungsformen zuzuordnen.
    </Paragraph>
    <Paragraph>
      So kann z.B. in einer reinen Wohnstraße eine Führung auf der Fahrbahn
      geeignet sein, auf einer Haupt- oder Sammelstraße innerorts kann eine
      Führung im Seitenraum geeignet sein, auf einer Hauptstraße außerorts wird
      in der Regel eine separate Radinfrastruktur notwendig sein.
      Geschäftsstraßen mit besonderen Anforderungen des Fußverkehrs und
      Lieferverkehrs können über die Einblendung der POIs identifiziert werden.
    </Paragraph>
    <Paragraph>
      In einer Übersichtstabelle werden dann für die einzelnen Führungsformen
      Empfehlungen für Mindestbreiten und Rahmenbedingungen festgelegt, die den
      örtlichen Gegebenheiten entsprechen. Gleichzeitig lassen sich anhand der
      Straßentypen auch weitere Maßnahmen zur Förderung des Radverkehrs
      identifizieren, die über die Schaffung klassischer Infrastruktur
      hinausgehen (bspw. Maßnahmen zur Verkehrsberuhigung usw.).
    </Paragraph>

    <MapRoadClassification />
  </>
);
