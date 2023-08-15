import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { Link } from '~/components2/Link';
import { notionUrl } from './links.const';

export const SectionModellprojekt = (props: SectionProps) => (
  <>
    <Heading as="h3" {...props}>
      Unsere Teilprojekte: Modellprojekte und Interventionen
    </Heading>
    <Paragraph>
      Im Rahmen des Reallabors werden diverse Teilprojekte umgesetzt. Mit
      verschiedenen Modellprojekten und Interventionen entwickeln wir an
      konkreten Problemstellungen gezielt Lösungen für unterschiedliche
      Herausforderungen innerhalb der Kommunen. Die Projekte reichen dabei von
      der Umsetzung eines Pilotprojekts für ein modulare Fahrradparkhaus bis hin
      zum Abschleifen von Kopfsteinpflaster oder auch der Erprobung
      unterschiedlicher Methoden der Verkehrszählung.
    </Paragraph>
    <Paragraph>
      Hier geht’s zur Übersicht und Beschreibung der Teilprojekte:
    </Paragraph>
    <Paragraph>
      <Link href={notionUrl}>Zu den Teilprojekten</Link>
    </Paragraph>
  </>
);
