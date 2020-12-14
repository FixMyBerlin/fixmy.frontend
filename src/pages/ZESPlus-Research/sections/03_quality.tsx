import React from 'react';
import { Heading, ImageMulti, SectionProps } from '~/components2/Article';

import MapQuality from '../components/MapQuality';

import ImageSpeed from './images/speed@2x.jpg';
import ImageWaitingTimes from './images/wating-times@2x.jpg';

const SectionQuality = (props: SectionProps) => (
  <>
    <Heading as="h2" {...props}>
      Auswertung der Oberflächen und Radinfrastruktur
    </Heading>
    <MapQuality />
    <ImageMulti>
      <ImageMulti.Inner
        source={ImageSpeed}
        subtitle="Auswertung der durchschnittlichen Geschwindigkeiten an Streckenabschnitten (Quelle: SimRa TU-Berlin)"
      />

      <ImageMulti.Inner
        source={ImageWaitingTimes}
        subtitle="Auswertung der durchschnittlichen Wartezeiten an Knotenpunkten
          (Quelle: SimRa TU-Berlin)"
      />
    </ImageMulti>
  </>
);

export default SectionQuality;
