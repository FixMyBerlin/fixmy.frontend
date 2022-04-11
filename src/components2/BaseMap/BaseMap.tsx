import MapboxGL from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import config from '~/apps/Gastro/config';
import logger from '~/utils/logger';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

type BaseMapProps = Partial<mapboxgl.MapboxOptions> & {
  onInit?: (arg0: mapboxgl.Map) => void;
  className?: string;
  maxBounds?: mapboxgl.MapboxOptions['maxBounds'];
  mapboxStyle?: mapboxgl.MapboxOptions['style'];
};

/**
 * Map component based on MapboxGL.js
 *
 * Can be styled with `styled-components`.
 *
 * @param onInit - callback to handle the map instance once loaded
 * @param className - css classes for the wrapper DIV
 * @param center - Mapbox center, update to move the map
 * @param zoom - Mapbox zoom, update to move the map
 * @param mapboxStyle - Mapbox style URL
 * @param maxBounds - Use Mapbox `maxBounds` or `center` + `zoom` to intialize the map position
 */
export const BaseMap: React.FC<BaseMapProps> = ({
  onInit,
  className,
  center,
  zoom,
  mapboxStyle,
  maxBounds,
  ...mapboxProps
}) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  // Init map
  useEffect(() => {
    MapboxGL.accessToken = config.mapbox.accessToken;

    // The following 'null' declaration should not be needed.
    // But there is a bug which breaks if bbox is given and zoom / center is undefined.
    const zoomFixed = zoom || null;
    const centerFixed = center || [null, null];

    const baseMapConfig = {
      container: mapContainer.current,
      zoom: zoomFixed,
      center: centerFixed,
      style: mapboxStyle,
      maxBounds,
      ...mapboxProps,
    };

    const baseMap = new MapboxGL.Map(baseMapConfig);

    logger('Init map with', baseMapConfig);

    baseMap.on('load', () => {
      setMap(baseMap);
      baseMap.resize();
      if (onInit) onInit(baseMap);
    });
  }, []);

  // Update map center + zoom
  useEffect(() => {
    if (!map) return;

    if (center) map.setCenter(center);
    if (zoom) map.setZoom(zoom);
  }, [map, center, zoom]);

  return (
    <Wrapper
      aria-label="Interaktive Karte"
      className={className}
      ref={(el) => {
        if (mapContainer != null) mapContainer.current = el;
      }}
    />
  );
};
