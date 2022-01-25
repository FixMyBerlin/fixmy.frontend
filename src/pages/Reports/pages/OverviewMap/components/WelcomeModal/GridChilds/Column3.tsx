import React from 'react';
import { GridChild, Img } from '../styles';
import ImgHbiWip from './assets/illu-hbi-wip.jpg';

type Props = {};

export const Column3: React.FC<Props> = () => {
  return (
    <GridChild>
      <Img src={ImgHbiWip} alt="" />
      <div>
        <h2>Upcoming: Besserer Happy-Bike-Index für Strecken</h2>
        <p>
          Wir arbeiten an einem Tool, mit dem du dabei mithelfen kannst die
          fehlenden für den Happy-Bike-Index einzutragen.
        </p>
      </div>
    </GridChild>
  );
};
