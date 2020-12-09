import React from 'react';
import { Heading, SectionProps } from '~/components2/Article';

import MapSafety from '../components/MapSafety';

// const MAP_STYLE_QUALITY = 'mapbox://styles/hejco/ckhurerfv3wgv1aog7t7ek3gs';
// const MAP_STYLE_TARGET = 'mapbox://styles/hejco/ckhufbloj0gmz19pk0m6bd4d2';

const SectionSafety = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Auswertung der Sicherheit
    </Heading>
    <MapSafety />
  </>
);

export default SectionSafety;
