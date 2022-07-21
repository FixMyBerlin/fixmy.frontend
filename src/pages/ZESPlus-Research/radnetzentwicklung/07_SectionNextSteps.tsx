import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';

export const SectionNextSteps = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Wie geht es weiter
    </Heading>
    <Paragraph>- Workshop - Netzplanung - Maßnahmen</Paragraph>
  </>
);
