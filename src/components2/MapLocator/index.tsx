import React, { useState, useRef, useEffect } from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import config from '~/pages/Gastro/config';

const MapContainer = styled.div`
  width: 100%;
  height: 30em;
  margin: 2em 0;
`;

const initMap = ({ setMap, mapContainer }) => {
  const map = new MapboxGL.Map({
    container: mapContainer.current,
    style: config.map.style,
    center: [10.296, 51.183],
    zoom: 4.75,
    maxBounds: config.map.bounds
  });

  map.on('load', () => {
    setMap(map);
    map.resize();
  });
};

const Map = ({ location }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    MapboxGL.accessToken = config.map.accessToken;
    if (map == null) initMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (location == null) return;
    new MapboxGL.Marker().setLngLat(location).addTo(map);
    map.flyTo({ center: location });
  }, [location, map]);

  return (
    <MapContainer
      ref={(el) => {
        if (mapContainer != null) mapContainer.current = el;
      }}
    />
  );
};

export default Map;
