import React from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';

import config from '~/pages/Gastro/config';
import Map from '~/components2/Map';

const StyledMap = styled(Map)`
  width: 100%;
  height: 30em;
  margin: 2em 0;
`;

const StaticMap = ({ location, zoom = 17 }) => {
  if (!location) return null;

  const handleInit = (map) => {
    if (location) {
      new MapboxGL.Marker({ color: config.colors.interaction })
        .setLngLat(location)
        .addTo(map);
      map.setCenter(location);
    }
    map.setZoom(zoom);
  };

  return (
    <StyledMap
      onInit={handleInit}
      style={config.gastro.map.style}
      bounds={config.gastro.map.bounds}
      dragPan={false}
      scrollZoom={false}
      doubleClickZoom={false}
      touchZoomRotate={false}
    />
  );
};

export default StaticMap;
