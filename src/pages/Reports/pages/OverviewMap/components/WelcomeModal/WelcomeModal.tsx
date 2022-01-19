import React, { useEffect } from 'react';
import { Button } from '~/components2/Button';
import { ModalCloseIcon } from '../ModalCloseIcon/ModalCloseIcon';
import { Column1, Column2, Column3 } from './GridChilds';
import {
  Background,
  ButtonWrapper,
  GridWrapper,
  Headline,
  Modal,
  Wrapper,
  WrapperCenter,
} from './styles';

type Props = { visible: boolean; setView: (object) => void };

export const WelcomeModal: React.FC<Props> = ({ visible, setView }) => {
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
            <Column1 closeModal={closeModal} />
            <Column2 closeModal={closeModal} setView={setView} />
            <Column3 />
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
