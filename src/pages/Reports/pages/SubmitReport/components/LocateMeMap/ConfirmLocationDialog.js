import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '~/components/Button';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';
import logger from '~/utils/logger';

const Wrapper = styled.div`
  z-index: 9999999999;
  background-color: white;
  padding: 14px;
  position: absolute;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${config.colors.black};
`;

const AddressIndicator = styled.p`
  margin-top: 3px;
  margin-bottom: 24px;
  text-align: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.m`
     justify-content: space-around;
  `}
`;

const StyledButton = styled(Button)`
  min-width: 100px;
  max-width: 48%;
  flex-grow: 1;
  border-radius: ${config.flatButtons ? '0' : '6px'};
  font-size: 18px;

  ${media.m`
     max-width: 25%;
  `}
`;

const BackButton = styled(StyledButton)`
  border: 1.5px solid ${config.colors.interaction};
  background-color: white;
  color: ${config.colors.darkgrey};
`;

const ConfirmButton = styled(StyledButton)`
  color: white;
  font-weight: bold;
  background-color: ${config.colors.interaction};
  box-shadow: ${config.flatButtons
    ? 'initial'
    : '0 0 12px 0 rgba(0, 0, 0, 0.24)'};
`;

const ConfirmLocationDialog = ({ heading, address, onConfirm, onDecline }) => (
  <Wrapper data-cy="reports-locateme-confirm">
    <Heading>{heading}</Heading>
    <AddressIndicator>{address}</AddressIndicator>
    <ButtonsWrapper>
      <BackButton onClick={onDecline} data-cy="reports-locateme-confirm-reset">
        Ort ändern
      </BackButton>
      <ConfirmButton
        onClick={onConfirm}
        data-cy="reports-locateme-confirm-continue"
      >
        Weiter
      </ConfirmButton>
    </ButtonsWrapper>
  </Wrapper>
);

ConfirmLocationDialog.propTypes = {
  heading: PropTypes.string,
  address: PropTypes.string,
  onConfirm: PropTypes.func,
  onDecline: PropTypes.func,
};

ConfirmLocationDialog.defaultProps = {
  heading: 'Der Ort wurde markiert!',
  address: 'Fehler beim Setzen der Adresse',
  onConfirm: () => logger('implement me'),
  onDecline: () => logger('implement me'),
};

export default ConfirmLocationDialog;
