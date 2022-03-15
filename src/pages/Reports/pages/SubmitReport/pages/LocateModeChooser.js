/**
 User can pick between a) using the current device location and b) geocoding the location.
 Receives URLS for re-routing when an options has been chosen.
 * */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { ErrorMessage } from '~/components2/ErrorMessage';
import CloseIcon from '~/images/close.svg';
import LocateIcon from '~/images/reports/location-button.svg';
import MapIcon from '~/images/reports/noun-map-1909219.svg';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  z-index: 999999;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${config.colors.interaction};
  border: 1px solid #979797;
  padding: 12px;
`;

const Heading = styled.h2`
  font-family: '${config.titleFont}', sans-serif;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  line-height: 1.33;
  margin-top: 76px;
  margin-bottom: 58px;

  ${media.m`
    font-size: 2.5em;
  `}
`;

const Button = styled.div`
  border: none;
  display: flex;
  cursor: pointer;
  width: 100%;
  max-width: 360px;
  height: 74.5px;
  margin-bottom: 22px;
  font-size: 1.2em;
  line-height: 1.33;
  background-color: white;
  border-radius: ${config.flatButtons ? '0' : '6px'};
  color: ${config.colors.black};
  text-decoration: none;
  padding: 14px;
  box-shadow: ${config.flatButtons
    ? 'initial'
    : '0px 0px 12px -2px rgba(0, 0, 0, 0.6)'};
  align-items: center;
`;

const ButtonIcon = styled.div`
  display: block;
  padding-right: 18px;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  right: 17px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LocateModeChooser = ({
  heading,
  onUseDevicePosition,
  onUseGeocoding,
  onClose,
  error,
  removeError,
}) => (
  <Wrapper>
    <Heading data-cy="reports-locatemode-title">{heading}</Heading>

    <Button
      onClick={onUseDevicePosition}
      notranslate
      data-cy="reports-locatemode-currentPosition"
    >
      {' '}
      {/* TODO: eventually disable page-translate site-wide */}
      <ButtonIcon>
        <LocateIcon />
      </ButtonIcon>
      An meiner aktuellen Position
    </Button>

    <Button
      onClick={onUseGeocoding}
      notranslate
      data-cy="reports-locatemode-enterPosition"
    >
      <ButtonIcon>
        <MapIcon />
      </ButtonIcon>
      Ich möchte eine Adresse auf der Karte eingeben
    </Button>
    <CloseButton onClick={onClose} data-cy="reports-locatemode-close-button">
      <CloseIcon />
    </CloseButton>
    {error.message && (
      <ErrorMessage
        onDismiss={() => {
          removeError();
          onUseGeocoding();
        }}
      >
        {error.message}
      </ErrorMessage>
    )}
  </Wrapper>
);

LocateModeChooser.propTypes = {
  heading: PropTypes.string,
  onUseDevicePosition: PropTypes.func.isRequired,
  onUseGeocoding: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.shape({ message: PropTypes.string }),
  removeError: PropTypes.func.isRequired,
};

LocateModeChooser.defaultProps = {
  heading: 'Wo benötigen Sie neue Fahrradbügel?',
  error: {},
};

export default LocateModeChooser;
