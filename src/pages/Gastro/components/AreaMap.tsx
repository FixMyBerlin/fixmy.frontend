import React from 'react';
import MapboxGL from 'mapbox-gl';
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
  const handleMapInit = (map) => {
    map.setCenter(geometry?.coordinates);

    if (area != null) {
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

      const bounds = area.coordinates[0].reduce(
        (b: MapboxGL.LngLatBounds, coords: [number, number]) =>
          b.extend(coords),
        new MapboxGL.LngLatBounds(
          area.coordinates[0][0],
          area.coordinates[0][0]
        )
      );

      map.fitBounds(bounds, { padding: 20, maxZoom: 17.5, linear: true });
    }
  };

  return (
    <StyledMap
      onInit={handleMapInit}
      style={config.gastro.map.style}
      bounds={config.gastro.map.bounds}
      interactive={false}
      preserveDrawingBuffer={printable === true}
      center={geometry?.coordinates}
      zoom={17}
    />
  );
};

export default AreaMap;
