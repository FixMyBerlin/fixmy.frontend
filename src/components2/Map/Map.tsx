import React, { useState, useRef, useEffect } from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import config from '~/pages/Gastro/config';
import logger from '~/utils/logger';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props extends Partial<MapboxGL.MapboxOptions> {
  onInit?: (arg0: MapboxGL.Map) => void;
  className?: string;
}

const initMap = ({
  setMap,
  mapContainer,
  onInit,
  center,
  zoom,
  mapboxProps
}) => {
  const map = new MapboxGL.Map({
    container: mapContainer.current,
    ...mapboxProps
  });

  logger('Init map with', mapboxProps);

  map.on('load', () => {
    setMap(map);
    map.resize();
    if (center) map.setCenter(center);
    if (zoom) map.setZoom(zoom);
    if (onInit) onInit(map);
  });
};

const Map = (props: Props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const { onInit, className, center, zoom, ...mapboxProps } = props;

  useEffect(() => {
    MapboxGL.accessToken = config.map.accessToken;
    if (map == null)
      initMap({ setMap, mapContainer, onInit, center, zoom, mapboxProps });
  }, [map]);

  return (
    <Wrapper
      className={className}
      ref={(el) => {
        if (mapContainer != null) mapContainer.current = el;
      }}
    />
  );
};

export default Map;
