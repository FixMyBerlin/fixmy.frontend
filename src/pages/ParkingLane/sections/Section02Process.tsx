import React from 'react';
import styled from 'styled-components';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';

const ListItem = styled.li`
  padding-left: 1rem;
  margin-bottom: 1rem;
`;

export const Section02Process: React.FC<SectionProps> = ({ toc }) => (
  <>
    <Heading as="h2" toc={toc}>
      Wie ist das Vorgehen?
    </Heading>
    <Paragraph as="ol">
      <ListItem>
        Nach einer kurzen Einführung in die Vorgehensweise und den Editor können
        alle interessierten Bürger:innen am PC oder unterwegs mit dem Smartphone
        Parkstände in OpenStreetMap (OSM) eintragen.
      </ListItem>
      <ListItem>
        In einer zweiten Phase werden, ebenfalls in OSM Bereiche eingetragen, wo
        Parken nicht erlaubt ist, z.B. Kreuzungen, Fußgängerübergänge oder
        Einfahrten. So werden die Daten immer genauer.
      </ListItem>
      <ListItem>
        Die aktuellen Daten in OSM werden fortlaufend durch die OSM Community
        und Mitarbeitende im Bezirksamt geprüft und ggf. korrigiert. Wenn die
        Daten eine bestimmte Qualität erreicht haben, werden Sie aus OSM
        exportiert und als dann fixierter Datensatz durch die Verwaltung für
        ihre Aufgaben weiter genutzt.
      </ListItem>
      <ListItem>
        In regelmäßigen Abständen werden die Daten erneut exportiert und, die
        Änderungen überprüft.
      </ListItem>
    </Paragraph>
  </>
);
