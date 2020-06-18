import React from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import Map from '~/components2/Map';
import config from '~/apps/Gastro/config';

const StyledMap = styled(Map)`
  width: 40em;
  height: 30em;
  margin: 1em 0;
`;

const addAreaToMap = (map, area) => {
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

  // Fit map to area bounds by iteratively expanding a boundary using each of
  // the area's points
  const bounds = area.coordinates[0].reduce(
    (b: MapboxGL.LngLatBounds, coords: [number, number]) => b.extend(coords),
    new MapboxGL.LngLatBounds(area.coordinates[0][0], area.coordinates[0][0])
  );

  map.fitBounds(bounds, { padding: 20, maxZoom: 17.5, linear: true });
};

const handleMapInit = (map, geometry, area) => {
  if (geometry != null) {
    map.setCenter(geometry.coordinates);
    new MapboxGL.Marker({ color: config.colors.interaction })
      .setLngLat(geometry.coordinates)
      .addTo(map);
  }
  if (area != null) addAreaToMap(map, area);
};

const AreaMap = ({ application, printable = false }) => {
  const { geometry, area } = application;

  return (
    <StyledMap
      onInit={(map) => handleMapInit(map, geometry, area)}
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
