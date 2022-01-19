import React from 'react';
import { AnchorLink } from '~/components2/Link';
import { GridChild, Img } from '../styles';
import ImgVisionZero from './assets/vision-zero.jpg';

type Props = { closeModal: () => void };

export const Column1: React.FC<Props> = ({ closeModal }) => {
  return (
    <GridChild>
      <Img src={ImgVisionZero} alt="" />
      <div>
        <h2>Vision-Zero-Check an Knotenpunkten:</h2>
        <p>
          Wir haben die Unfalldaten an den Knotenpunkten ausgewertet. Diese
          erhalten jetzt eine Bewertung nach dem Vision-Zero-Check.
          <br />
          <AnchorLink
            internal
            href="/zustand/45520022/hallesches-ufer-mehringbrucke-wilhelmstrasse"
            onClick={closeModal}
          >
            Beispiel ansehen
          </AnchorLink>
        </p>
      </div>
    </GridChild>
  );
};
