import React, { useEffect } from 'react';
import { Button } from '~/components2/Button';
import { AnchorLink } from '~/components2/Link';
import { ModalCloseIcon } from '../ModalCloseIcon/ModalCloseIcon';
import ImgHbiWip from './assets/illu-hbi-wip.jpg';
import ImgKataster from './assets/kataster.jpg';
import ImgVisionZero from './assets/vision-zero.jpg';
import {
  Background,
  ButtonWrapper,
  GridChild,
  GridWrapper,
  Headline,
  Img,
  Modal,
  Wrapper,
  WrapperCenter,
} from './styles';

export const WelcomeModal = ({ visible }) => {
  const [open, setOpen] = React.useState(visible);
  const [closed, setClosed] = React.useState(false);

  // Allow esc-Key to close Modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // When parent changes the visilbity-prop, update our prop
  // but not if we closed the modal manually before.
  useEffect(() => {
    if (closed) return;
    setOpen(visible);
  }, [closed, visible]);

  const closeModal = () => {
    setOpen(false);
    setClosed(true);
  };

  if (!open) return null;

  return (
    <Wrapper id="WelcomeModal">
      <WrapperCenter>
        <Background onClick={closeModal} />
        <Modal
          role="dialog"
          aria-labelledby="WelcomeModalTitle"
          aria-modal="true"
        >
          <ModalCloseIcon onClick={closeModal} controlsId="WelcomeModal" />
          <Headline id="WelcomeModalTitle">
            Neuigkeiten zum Happy-Bike-Index
          </Headline>
          <GridWrapper>
            <GridChild>
              <Img src={ImgVisionZero} alt="" />
              <div>
                <h2>Vision-Zero-Check an Knotenpunkten:</h2>
                <p>
                  Wir haben die Unfalldaten an den Knotenpunkten ausgewertet.
                  Diese erhalten jetzt eine Bewertung nach dem
                  Vision-Zero-Check.
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
            <GridChild>
              <Img src={ImgKataster} alt="" />
              <div>
                <h2>Katasterdaten veröffentlicht:</h2>
                <p>
                  Wir haben genaue Daten zu allen Straßengrundrissen aus der
                  offiziellen Befahrung von 2014 aufbereitet und veröffentlicht.
                  <br />
                  <AnchorLink
                    internal
                    href="/zustand?lat=52.48638&lng=13.42428&zoom=18"
                    onClick={closeModal}
                  >
                    Katasterdaten ansehen
                  </AnchorLink>
                </p>
              </div>
            </GridChild>
            <GridChild>
              <Img src={ImgHbiWip} alt="" />
              <div>
                <h2>Upcoming: Besserer Happy-Bike-Index für Strecken</h2>
                <p>
                  Wir arbeiten an einem Tool, mit dem du dabei mithelfen kannst
                  die fehlenden für den Happy-Bike-Index einzutragen.
                </p>
              </div>
            </GridChild>
          </GridWrapper>
          <ButtonWrapper>
            <Button
              flat
              onClick={closeModal}
              style={{ display: 'inline-block' }}
            >
              Schließen
            </Button>
          </ButtonWrapper>
        </Modal>
      </WrapperCenter>
    </Wrapper>
  );
};

export default WelcomeModal;
