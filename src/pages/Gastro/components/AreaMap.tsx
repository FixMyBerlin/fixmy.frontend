import React from 'react';
import styled from 'styled-components';
import Map from '~/components2/Map';
import config from '~/pages/Gastro/config';

const StyledMap = styled(Map)`
  width: 100%;
  height: 30em;
  margin: 1em 0;
`;

const AreaMap = ({ application, printable = false }) => {
  const { geometry, area } = application;
  const addAreaLayer = (map) => {
    map.addSource('usageArea', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: area
      }
    });
    map.addLayer({
      id: 'usageArea',
      type: 'fill',
      source: 'usageArea',
      layout: {},
      paint: {
        'fill-color': config.colors.change_4,
        'fill-opacity': 0.8
      }
    });
    map.setCenter(geometry?.coordinates);
    map.setZoom(18);
  };

  return (
    <StyledMap
      onInit={addAreaLayer}
      style={config.gastro.map.style}
      bounds={config.gastro.map.bounds}
      dragPan={false}
      scrollZoom={false}
      doubleClickZoom={false}
      touchZoomRotate={false}
      preserveDrawingBuffer={printable === true}
    />
  );
};

export default AreaMap;
