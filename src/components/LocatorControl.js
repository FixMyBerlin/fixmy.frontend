import React from 'react';
import styled from 'styled-components';

import { getGeoLocation } from '~/utils';
import MapControl from './MapControl';

async function locate() {
  // ask for geolocation here
  const position = await getGeoLocation();
  console.log('got position:', position);
}

const LocatorControl = styled(MapControl)`
  background-color: ${config.colors.interaction};
`;

export default () => (
  <LocatorControl onClick={locate} position="top-right">L</LocatorControl>
);
