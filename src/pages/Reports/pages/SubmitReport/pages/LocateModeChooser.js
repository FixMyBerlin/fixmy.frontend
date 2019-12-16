/**
 User can pick between a) using the current device location and b) geocoding the location.
 Receives URLS for re-routing when an options has been chosen.
 * */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '~/images/close.svg';

import config from '~/pages/Reports/config';
import LocateIcon from '~/images/reports/location-button.svg';
import MapIcon from '~/images/reports/noun-map-1909219.svg';
import ErrorMessage from '~/components/ErrorMessage';

const Wrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${config.colors.interaction};
  border: 1px solid #979797;
  padding: 12px;
  z-index: 999999;
`;

const Heading = styled.h2`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  line-height: 1.33;
  margin-top: 76px;
  margin-bottom: 58px;
`;

const Button = styled.div`
  border: none;
  display: flex;
  cursor: pointer;
  width: 100%;
  max-width: 360px;
  height: 74.5px;
  margin-bottom: 22px;
  font-size: 18px;
  line-height: 1.33;
  background-color: white;
  border-radius: 6px;
  color: ${config.colors.black};
  text-decoration: none;
  padding: 14px;
  -webkit-box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.6);
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
  removeError
}) => (
  <Wrapper>
    <Heading>{heading}</Heading>

    <Button onClick={onUseDevicePosition} notranslate>
      {' '}
      {/* TODO: eventually disable page-translate site-wide */}
      <ButtonIcon>
        <LocateIcon />
      </ButtonIcon>
      An meiner aktuellen Position
    </Button>

    <Button onClick={onUseGeocoding} notranslate>
      <ButtonIcon>
        <MapIcon />
      </ButtonIcon>
      Ich möchte eine Adresse auf der Karte eingeben
    </Button>
    <CloseButton onClick={onClose}>
      <CloseIcon />
    </CloseButton>
    {error.message && (
      <ErrorMessage
        message={error.message}
        onDismiss={() => {
          removeError();
          onUseGeocoding();
        }}
      />
    )}
  </Wrapper>
);

LocateModeChooser.propTypes = {
  heading: PropTypes.string,
  onUseDevicePosition: PropTypes.func.isRequired,
  onUseGeocoding: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.shape({ message: PropTypes.string }),
  removeError: PropTypes.func.isRequired
};

LocateModeChooser.defaultProps = {
  heading: 'Wo benötigst du neue Fahrradbügel?',
  error: {}
};

export default LocateModeChooser;
