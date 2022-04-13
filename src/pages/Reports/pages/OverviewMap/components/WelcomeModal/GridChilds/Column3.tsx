import React from 'react';
import { AnchorLink } from '~/components2/Link';
import { GridChild, Img } from '../styles';
import ImgHbiWip from './assets/illu-hbi-wip.jpg';

type Props = {};

export const Column3: React.FC<Props> = () => {
  return (
    <GridChild>
      <Img src={ImgHbiWip} alt="" />
      <div>
        <h2>Happy-Bike-Index wird überarbeitet</h2>
        <p>
          Wir arbeiten an der nächsten Version mit besseren Daten, wenn du bei
          der Datenerhebung in OpenStreetMap helfen möchtest schreib uns eine{' '}
          <AnchorLink href="mailto:info@fixmycity.de">Email</AnchorLink>
        </p>
      </div>
    </GridChild>
  );
};
