import { ArcLayer } from '@deck.gl/layers';
// ESlint complains because deck.gl doesn't provide this export but it's
// available as a type export from @danmarshall/deckgl-typings
// eslint-disable import/no-unresolved
// @ts-ignore
import type { ArcLayerProps } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import MapboxGL from 'mapbox-gl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import BigLoader from '~/components/BigLoader';
import Map from '~/components2/Map';
import {
  Arc,
  compileTooltip,
} from '~/pages/Reports/pages/OverviewMap/service/arcService';

const MB_STYLE_URL = `${config.reports.overviewMap.style}${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

const configuredBounds = config.reports.overviewMap
  .bounds as MapboxGL.LngLatBoundsLike;

// The DeckGL component does not take bounds as prop, instead it takes longitude
// and latitude. We calculate those from the given bounds.
// TODO: factor out and test
const [[minLng, minLat], [maxLng, maxLat]] = configuredBounds as number[][];
const centerLng = minLng + (maxLng - minLng) / 2;
const centerLat = minLat + (maxLat - minLat) / 2;

// Viewport settings
const INITIAL_DECK_VIEW_STATE = {
  longitude: centerLng,
  latitude: centerLat,
  zoom: 17,
  pitch: 0,
  bearing: 0,
};

const StyledMap = styled(Map)`
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

interface Props {
  arcLayerProps?: ArcLayerProps<Arc[]>;
  children?: React.ReactNode;
  className?: string;
  didOverlayLoad?: boolean;
  maxBounds?: MapboxGL.LngLatBoundsLike;
  onLoad?: (map: MapboxGL.Map) => any;
  onMove?: () => any;
}

const BaseMap = ({
  arcLayerProps,
  children,
  className,
  maxBounds,
  onLoad,
  onMove,
  didOverlayLoad = true,
}: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [glContext, setGLContext] = useState<WebGLRenderingContext>();
  // couple deck gl and mapbox gl views
  const [mapViewState, setMapViewState] = useState(INITIAL_DECK_VIEW_STATE);

  const deckRef = useRef(null);
  const mapRef = useRef<MapboxGL.Map>(null);

  const handleMove = useCallback(
    ({ target }) => {
      synchronizeViewStates(target);
      if (onMove) onMove();
    },
    [onMove]
  );

  const synchronizeViewStates = useCallback((mapboxMap) => {
    const center = mapboxMap.getCenter();
    setMapViewState({
      ...mapViewState,
      zoom: mapboxMap.getZoom(),
      pitch: mapboxMap.getPitch(),
      bearing: mapboxMap.getBearing(),
      latitude: center.lat,
      longitude: center.lng,
    });
  }, []);

  const handleLoad = (map: MapboxGL.Map) => {
    mapRef.current = map;
    map.on('move', handleMove);
    map.on('resize', synchronizeViewStates);
    if (onLoad) onLoad(map);
    if (didOverlayLoad) setLoading(false);
  };
  useEffect(() => setLoading(!didOverlayLoad), [didOverlayLoad]);
  return (
    <>
      {isLoading && <BigLoader useAbsolutePositioning />}
      <DeckGL
        initialViewState={INITIAL_DECK_VIEW_STATE}
        viewState={mapViewState}
        ref={deckRef}
        controller
        onWebGLInitialized={setGLContext}
        getTooltip={compileTooltip}
        pickingRadius={8}
        id="reports-deckgl-canvas"
      >
        {/* ArcLayer can be used as a React component even though it actually
        is none. May want to refactor this eventually because it's too much
        magic for my taste https://deck.gl/docs/api-reference/react/deckgl#jsx-layers
        // @ts-ignore */}
        {arcLayerProps && <ArcLayer {...arcLayerProps} />}
        {children}
        {glContext && (
          /* This is important: Mapbox must be instantiated after the WebGLContext is available */
          <StyledMap
            bounds={
              config.reports.overviewMap.bounds as MapboxGL.LngLatBoundsLike
            }
            className={className}
            data-cy="reports-basemap"
            maxBounds={maxBounds}
            onInit={handleLoad}
            style={MB_STYLE_URL}
          />
        )}
      </DeckGL>
    </>
  );
};

export default BaseMap;
