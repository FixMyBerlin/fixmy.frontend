import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '~/components2/Button';
import { AnchorLink } from '~/components2/Link';
import { media } from '~/styles/utils';
import { ModalCloseIcon } from '../ModalCloseIcon/ModalCloseIcon';
import ImgHbiWip from './assets/illu-hbi-wip.jpg';
import ImgKataster from './assets/kataster.jpg';
import ImgVisionZero from './assets/vision-zero.jpg';

// Styles based on https://tailwindui.com/components/application-ui/overlays/modals
const Wrapper = styled.div`
  overflow-y: auto;
  z-index: 1000;
  inset: 0;
  position: fixed;
`;

const WrapperCenter = styled.div`
  justify-content: center;
  align-items: flex-end;
  min-height: 100vh;
  text-align: center;
`;

const Background = styled.div`
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  background-color: rgb(107 114 128 / 0.75);
  inset: 0;
  position: fixed;
`;

const Modal = styled.section`
  vertical-align: middle;
  background-color: white;
  max-width: 900px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: visible;
  display: inline-block;
  position: relative;
  margin: 3rem 1rem;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
`;

const GridWrapper = styled.div`
  margin-bottom: 2.5rem;
  ${media.s`
    padding: 0 1.75rem;
  `}
  ${media.m`
    display: grid;
    gap: 1.75rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0 1.75rem;
    margin-bottom: 1.75rem;
  `}
  ${media.l`
    gap: 3rem;
    padding: 0 3rem;
  `}
`;

const GridChild = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #353535;
  h2 {
    font-size: 1rem;
  }
  p {
    margin-top: 0;
  }
  ${media.s`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    text-align: left;
    h2 {
      margin-top: 0;
    }
    `}
  ${media.m`
    display: block;
    margin-bottom: 0;
    h2 {
      margin-top: 1rem;
    }
  `}
`;

const Headline = styled.h1`
  padding-bottom: 1rem;
  margin-bottom: 2.25rem;
  font-size: 2rem;
  line-height: 1.25em;
  font-family: 'Roboto Slab';
  border-bottom: 1px solid #fabe28;
`;

const Img = styled.img`
  max-width: 200px;
  ${media.s`
    max-width: 100%;
  `}
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  ${media.m`
    display: none;
  `}
`;

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
                    href="/zustand?lat=52.486&lng=13.424&zoom=19"
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
