import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';

export const Section03Participate: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Was muss ich tun, um mitzumachen?
    </Heading>
    <Paragraph>
      Wenn du mithelfen willst, dann melde dich für unseren Emailverteiler an;
      wir informieren dich dann über den nächsten Einführungstermin. Du brauchst
      keine Vorkenntnisse mit der Nutzung von OpenStreetMap, alles Notwendige
      kann man in 30 Minuten lernen.
    </Paragraph>
  </>
);
