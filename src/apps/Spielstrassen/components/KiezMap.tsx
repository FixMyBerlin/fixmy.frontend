import React from 'react';
import MapboxGL from 'mapbox-gl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '~/styles/utils';
import Map from '~/components2/Map';

import lors from '~/apps/spielstrassen/data/lor-features.json';

const MapWrapper = styled(Map)`
  width: 100vw;
  height: 20em;
  margin-left: -1rem;
  margin-bottom: 2em;

  ${media.m`
    margin-left: 0;
    width: 100%;
    height: 30em;
  `}
`;

const handleLoad = (map: MapboxGL.Map) => {
  // TODO: fit map to kiez bounds
  console.log(lors);
};

const KiezMap = ({ street, district }) => (
  <MapWrapper
    style={district.apps.spielstrassen.mapboxStyle}
    onInit={handleLoad}
  />
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(KiezMap);
