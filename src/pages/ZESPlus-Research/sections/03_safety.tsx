import React from 'react';
import { Heading, SectionProps } from '~/components2/Article';

import MapSafety from '../components/MapSafety';
import MapQuality from '../components/MapQuality';
import MapNetworks from '../components/MapNetworks';

// const MAP_STYLE_TARGET = 'mapbox://styles/hejco/ckhufbloj0gmz19pk0m6bd4d2';

const SectionSafety = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Auswertung der Sicherheit
    </Heading>
    <MapQuality />
    <MapSafety />
    <MapNetworks />
  </>
);

export default SectionSafety;
