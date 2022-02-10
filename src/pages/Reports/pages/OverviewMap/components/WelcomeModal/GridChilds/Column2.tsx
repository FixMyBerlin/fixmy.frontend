import React from 'react';
import { AnchorLink } from '~/components2/Link';
import { GridChild, Img } from '../styles';
import ImgKataster from './assets/kataster.jpg';

type Props = { closeModal: () => void; setView: (object) => void };

export const Column2: React.FC<Props> = ({ closeModal, setView }) => {
  const handleClick = () => {
    closeModal();
    setView({
      center: { lat: 52.48638, lng: 13.42428 },
      zoom: 18,
    });
  };
  return (
    <GridChild>
      <Img src={ImgKataster} alt="" />
      <div>
        <h2>Katasterdaten veröffentlicht:</h2>
        <p>
          Wir haben genaue Daten zu allen Straßengrundrissen aus der offiziellen
          Befahrung von 2014 aufbereitet und veröffentlicht.
          <br />
          <AnchorLink internal href="#Hermannplatz" onClick={handleClick}>
            Katasterdaten ansehen
          </AnchorLink>
        </p>
      </div>
    </GridChild>
  );
};
