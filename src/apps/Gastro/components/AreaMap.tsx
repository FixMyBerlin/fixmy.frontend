import turfCenter from '@turf/center';
import MapboxGL, { LngLatLike } from 'mapbox-gl';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from '~/apps/Gastro/config';
import { BaseMap } from '~/components2/BaseMap';
import { DistrictConfig } from '~/types';

const StyledMap = styled(BaseMap)`
  width: 40em;
  height: 30em;
  margin: 1em 0;
`;

const addAreaToMap = (map, area, showAreaPin) => {
  map.addSource('usageArea', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: area,
    },
  });
  map.addLayer({
    id: 'usageArea',
    type: 'fill',
    source: 'usageArea',
    layout: {},
    paint: {
      'fill-color': config.colors.change_4,
      'fill-opacity': 0.8,
    },
  });

  // Fit map to area bounds by iteratively expanding a boundary using each of
  // the area's points
  const bounds = area.coordinates[0].reduce(
    (b: MapboxGL.LngLatBounds, coords: [number, number]) => b.extend(coords),
    new MapboxGL.LngLatBounds(area.coordinates[0][0], area.coordinates[0][0])
  );

  if (showAreaPin) {
    const center = turfCenter(area);
    new MapboxGL.Marker({ color: config.colors.interaction })
      .setLngLat(center.geometry.coordinates as LngLatLike)
      .addTo(map);
  }

  map.fitBounds(bounds, { padding: 20, maxZoom: 17.5, linear: true });
};

const handleMapInit = (
  map: MapboxGL.Map,
  geometry,
  area,
  district: DistrictConfig,
  showAreaPin: boolean
) => {
  if (geometry != null) {
    map.setCenter(geometry.coordinates);
    new MapboxGL.Marker({ color: config.colors.interaction })
      .setLngLat(geometry.coordinates)
      .addTo(map);
  }
  if (area != null) addAreaToMap(map, area, showAreaPin);
};

const AreaMap = ({
  application,
  district,
  printable = false,
  className = null,
  showAreaPin = false,
}) => {
  const { geometry, area } = application;

  return (
    <StyledMap
      className={className}
      onInit={(map) =>
        handleMapInit(map, geometry, area, district, showAreaPin)
      }
      mapboxStyle={config.gastro[district?.name]?.map.style}
      bounds={district?.bounds}
      interactive={false}
      preserveDrawingBuffer={printable === true}
      center={geometry?.coordinates}
      zoom={17}
    />
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(AreaMap);
