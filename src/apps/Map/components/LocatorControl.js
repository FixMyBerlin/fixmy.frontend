import debug from 'debug';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import MapControl from '~/apps/Map/components/MapControl';
import { getGeoLocation } from '~/apps/Map/map-utils';
import ErrorMessage from '~/components/ErrorMessage';
import Loader from '~/components/Loader';
import config from '~/config';
import LocatorIcon from '~/images/location.svg';
import { isNumeric } from '~/utils/utils';

const logger = debug('fmc:map:locator');

const LocatorButton = styled.button`
  background-color: ${config.colors.white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &[disabled] {
    pointer-events: none;
    background-color: ${config.colors.lightgrey};
  }
`;

const locateErrors = {
  // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

const userFeedback =
  'Wenn Sie sich orten lassen wollen, müssen Sie einer Ortung zustimmen.' +
  'Sie können die Entscheidung, Ihren Standort zu teilen, in den Einstellungen' +
  'des Browsers rückgängig machen.';

const LocatorControl = ({
  position,
  customPosition,
  onChange,
  onStart,
  className,
}) => {
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
    onStart();
    getGeoLocation().then(onLocateSuccess).catch(onLocateError);
    setIsLoading(false);
  };

  const Icon = isLoading ? <Loader size={24} /> : <LocatorIcon />;

  return (
    <>
      {isError && (
        <ErrorMessage
          title="Keine Berechtigung zum Orten"
          message={userFeedback}
          dismissMessage="Verstanden"
          onDismiss={() => setIsError(false)}
        />
      )}

      <MapControl
        position={position}
        customPosition={customPosition}
        className={className}
      >
        <LocatorButton disabled={isLoading} onClick={locate}>
          {Icon}
        </LocatorButton>
      </MapControl>
    </>
  );
};

LocatorControl.propTypes = {
  position: PropTypes.string,
  customPosition: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onStart: PropTypes.func,
  className: PropTypes.string,
};

LocatorControl.defaultProps = {
  position: 'top-left',
  onChange: () => {},
  onStart: () => {},
  customPosition: undefined,
  className: null,
};

export default LocatorControl;
