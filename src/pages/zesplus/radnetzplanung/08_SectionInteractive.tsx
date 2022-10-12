import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';
import { Link } from '~/components2/Link';
import { MapInteractive } from './components';

export const SectionInteractive = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Interaktive Version des Radverkehrsatlases:
    </Heading>
    <Paragraph>
      <strong>Beschreibung:</strong>
    </Paragraph>
    <Paragraph>
      Beschreibung: Für die weitere Planung des Radnetzes und die spätere
      Übertragbarkeit auf andere Kommunen wurde diese, interaktive Anwendung
      entwickelt, die die oben beschreibenen Themenkarten zusammenführt und ein
      flexibles Kombinieren der Karten ermöglicht.
    </Paragraph>
    <Paragraph>
      <Link href="#todo-radverkehrsatlas">Zur Interaktiven Karte…</Link>
    </Paragraph>

    <MapInteractive />
  </>
);
