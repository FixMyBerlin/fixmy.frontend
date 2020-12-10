import React from 'react';
import { Heading, SectionProps } from '~/components2/Article';

import MapSafety from '../components/MapSafety';

const SectionSafety = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Auswertung der Sicherheit
    </Heading>
    <MapSafety />
  </>
);

export default SectionSafety;
