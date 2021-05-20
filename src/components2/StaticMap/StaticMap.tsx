import MapboxGL from 'mapbox-gl';
import React from 'react';
import styled from 'styled-components';

import config from '~/apps/Gastro/config';
import { BaseMap } from '~/components2/BaseMap';

const StyledMap = styled(BaseMap)`
  width: 100%;
  height: 30em;
  margin: 2em 0;
`;

interface Props extends React.ComponentProps<typeof BaseMap> {
  bounds?: MapboxGL.LngLatBoundsLike;
  location: MapboxGL.LngLatLike;
  mapboxStyle: string;
  zoom?: number;
  className?: string;
}

/**
 * Non-interactive MapboxGL-based map with location marker pin
 *
 * @param props - extends MapboxGL.Map props
 * @param props.mapboxStyle - Mapbox style URL
 * @param props.location - coordinates for marker pin
 * @param props.bounds - map bounds
 * @param props.zoom - map zoom level
 * @param.props.className - allows styling with styled-components
 */
const StaticMap = ({
  bounds = null,
  className,
  location,
  mapboxStyle,
  zoom = 17,
  ...mapboxProps
}: Props) => {
  if (!location) return null;

  const handleInit = (map: MapboxGL.Map) => {
    new MapboxGL.Marker({ color: config.colors.interaction })
      .setLngLat(location)
      .addTo(map);
    map.setCenter(location);
    map.setZoom(zoom);
  };

  return (
    <StyledMap
      bounds={bounds}
      onInit={handleInit}
      style={mapboxStyle}
      className={className}
      interactive={false}
      {...mapboxProps}
    />
  );
};

export default StaticMap;
