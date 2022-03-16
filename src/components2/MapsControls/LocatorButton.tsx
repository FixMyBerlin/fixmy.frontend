import debug from 'debug';
import { ErrorMessage } from '~/components2/ErrorMessage';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getGeoLocation } from '~/apps/Map/map-utils';
import Loader from '~/components/Loader';
import LocatorIcon from './assets/location-icon.svg';
import { isNumeric } from '~/utils/utils';
import { StyledMapButton } from './StyledMapButton';

const logger = debug('fmc:map:locatorButton');

const LoaderWrapper = styled.div`
  background-color: #fff;
  border-radius: 100%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLocatorButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  overflow: visible;
  position: relative;

  &[disabled] {
    pointer-events: none;
  }
`;

const locateErrors = {
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

export type LocatorButtonProps = {
  onChange: (userLocation: mapboxgl.LngLatLike) => void;
  // showError: () => void;
};

export const LocatorButton: React.VFC<LocatorButtonProps> = ({ onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onLocateSuccess = (geoPosition) => {
    const lat = geoPosition?.coords?.latitude;
    const lng = geoPosition?.coords?.longitude;
    const isValidCoords = [lat, lng].every(isNumeric);
    if (!isValidCoords) {
      logger('invalid coords');
    } else {
      onChange([lng, lat]);
    }
  };

  const onLocateError = ({ code, message }) => {
    logger(message);
    if (code === locateErrors.PERMISSION_DENIED) {
      setIsError(true);
    }
  };

  const locate = () => {
    setIsLoading(true);
    getGeoLocation().then(onLocateSuccess).catch(onLocateError);
    setIsLoading(false);
  };

  return (
    <>
      {isError && (
        <ErrorMessage
          title="Keine Berechtigung zum Orten"
          dismissMessage="Verstanden"
          onDismiss={() => setIsError(false)}
        >
          <p>
            Wenn Sie sich orten lassen wollen, müssen Sie einer Ortung
            zustimmen. Sie können die Entscheidung, Ihren Standort zu teilen, in
            den Einstellungen des Browsers rückgängig machen.
          </p>
        </ErrorMessage>
      )}

      <StyledLocatorButton disabled={isLoading} onClick={locate}>
        {isLoading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
        <StyledMapButton as={LocatorIcon} />
      </StyledLocatorButton>
    </>
  );
};
