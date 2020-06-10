import React, { useState, useEffect } from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import config from '~/pages/Gastro/config';
import Map from '~/components2/Map';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const DEFAULT_ZOOM_LEVEL = 19;

const StyledMap = styled(Map)`
  width: 100%;
  height: 30em;
  margin: 2em 0;
`;

const GoodJob = styled.p`
  color: ${config.colors.change_4};
  font-weight: bold;
`;

const AreaPicker = ({ center, onSelect, initialGeometry }) => {
  // Mapbox-GL.js map instance
  const [map, setMap] = useState(null);
  const [hasGeometry, setHasGeometry] = useState(false);
  const [initialValue] = useState(initialGeometry);

  useEffect(() => {
    if (map == null) return;
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      default_mode: 'draw_polygon',
      controls: {
        polygon: true,
        trash: true
      }
    });
    map.addControl(draw);
    map.addControl(new MapboxGL.NavigationControl(), 'bottom-right');
    map.addControl(new MapboxGL.AttributionControl(), 'top-left');

    const handleUpdate = ({ features }) => {
      onSelect(features[0]?.geometry);
      setHasGeometry(true);
    };

    map.on('draw.create', handleUpdate);
    map.on('draw.update', handleUpdate);
    map.on('draw.delete', () => onSelect(null));

    if (initialValue) {
      draw.add(initialValue);
    }
  }, [map]);

  return (
    <>
      <StyledMap
        onInit={setMap}
        style={config.gastro.map.style}
        bounds={config.gastro.map.bounds}
        center={center}
        zoom={DEFAULT_ZOOM_LEVEL}
        attributionControl={false}
      />
      {hasGeometry && <GoodJob>Sie haben einen Bereich eingezeichnet!</GoodJob>}
    </>
  );
};

export default AreaPicker;
