import MapboxGL from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import config from '~/apps/Gastro/config';
import logger from '~/utils/logger';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

type BaseMapProps = Partial<MapboxGL.MapboxOptions> & {
  onInit?: (arg0: MapboxGL.Map) => void;
  className?: string;
  mapboxStyle?: mapboxgl.MapboxOptions['style'];
};

/**
 * Map component based on MapboxGL.js
 *
 * Can be styled with `styled-components`.
 *
 * @param props.onInit - callback to handle the map instance once loaded
 * @param props.className - css classes for the wrapper DIV
 * @param props.center - update to move map center
 * @param props.zoom - update to zoom map view
 * @param props.mapboxStyle - Mapbox style URL (takes precedence over `style` prop)
 * @param props.style - Mapbox style URL (alternative to `mapboxStyle`)
 * @param props.maxBounds - use `maxBounds` or `center` + `zoom` to intialize the map position
 * @param props - extends the props of MapboxGL.Map
 */
export const BaseMap: React.VFC<BaseMapProps> = ({
  onInit,
  className,
  center,
  zoom,
  mapboxStyle,
  ...mapboxProps
}) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  // Init map
  useEffect(() => {
    MapboxGL.accessToken = config.mapbox.accessToken;

    const container = mapContainer.current;
    const style = mapboxStyle || mapboxProps.style;
    // This should not be needed. But there is a bug which breaks if bbox is given and zoom/center is undefined.
    const zoomFixed = zoom || null;
    const centerFixed = center || [null, null];

    const baseMapConfig = {
      container,
      style,
      zoom: zoomFixed,
      center: centerFixed,
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
