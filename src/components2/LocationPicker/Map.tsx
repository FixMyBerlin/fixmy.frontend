import React, { useState, useRef, useEffect } from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import config from '~/pages/Gastro/config';

const MapContainer = styled.div`
  width: 100%;
  height: 30em;
  margin: 2em 0;
`;

const initMap = ({ setMap, mapContainer, onInit }) => {
  const map = new MapboxGL.Map({
    container: mapContainer.current,
    style: config.gastro.map.style,
    bounds: config.gastro.map.bounds
  });

  map.on('load', () => {
    setMap(map);
    map.resize();

    // Disable scrolling on this map
    map.scrollZoom.disable();

    onInit(map);
  });
};

const Map = ({ onInit }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    MapboxGL.accessToken = config.map.accessToken;
    if (map == null) initMap({ setMap, mapContainer, onInit });
  }, [map]);

  return (
    <MapContainer
      ref={(el) => {
        if (mapContainer != null) mapContainer.current = el;
      }}
    />
  );
};

export default Map;
