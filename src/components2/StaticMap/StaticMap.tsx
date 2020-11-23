import React from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';

import config from '~/apps/Gastro/config';
import Map from '~/components2/Map';

const StyledMap = styled(Map)`
  width: 100%;
  height: 30em;
  margin: 2em 0;
`;

type Props = {
  location: MapboxGL.LngLatLike;
  mapboxStyle: string;
  bounds?: MapboxGL.LngLatBoundsLike;
  zoom?: number;
};

const StaticMap: React.FC<Props> = ({
  location,
  mapboxStyle,
  bounds = null,
  zoom = 17,
}) => {
  if (!location) return null;

  const handleInit = (map: MapboxGL.Map) => {
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
      style={mapboxStyle}
      bounds={bounds}
      dragPan={false}
      scrollZoom={false}
      doubleClickZoom={false}
      touchZoomRotate={false}
    />
  );
};

export default StaticMap;
