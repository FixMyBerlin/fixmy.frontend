import React from 'react';
import { Heading, Paragraph, SectionProps } from '~/components2/Article';

import MapNetworks from '../components/MapNetworks';

const SectionNetwork = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Vorbereitung der Netzplanung
    </Heading>
    <Paragraph>
      In dieser Karte sehen Sie die zusammengeführten bestehenden Netzkonzepte.
      Außerdem finden Sie hier eine grobe Analyse von Start-Zielpunkten, die den
      Bedarf für wichtige Radverbindungen zeigen. Auf dieser Grundlage wird ein
      Routennetz konzipiert, dass ganz Eichwalde erlaubt sicher und entspannt
      Rad zu fahren.
    </Paragraph>
    <MapNetworks />
  </>
);

export default SectionNetwork;
