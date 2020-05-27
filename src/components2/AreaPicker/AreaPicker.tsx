import React, { useState, useEffect } from 'react';
import {
  TextField,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOn';
import ErrorIcon from '@material-ui/icons/Error';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import { fetchSuggestions } from '~/components/AutocompleteGeocoder/apiService';
import config from '~/pages/Gastro/config';
import Map from '~/components2/Map';
import logger from '~/utils/logger';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const StyledMap = styled(Map)`
  width: 100%;
  height: 30em;
  margin: 2em 0;
`;

const AreaPicker = ({ center, onSelect }) => {
  // Mapbox-GL.js map instance
  const [map, setMap] = useState(null);
  const [hasGeometry, setHasGeometry] = useState(false);

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
  }, [map]);

  return (
    <>
      <StyledMap
        onInit={setMap}
        style={config.gastro.map.style}
        bounds={config.gastro.map.bounds}
        center={center}
        zoom={19}
        attributionControl={false}
      />
      {!hasGeometry && <p>Bitte zeichnen Sie einen Bereich ein.</p>}
      {hasGeometry && <p>Sie haben einen Bereich eingezeichnet!</p>}
    </>
  );
};

export default AreaPicker;
