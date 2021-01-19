import { ArcLayer } from '@deck.gl/layers';
// ESlint complains because deck.gl doesn't provide this export but it's
// available as a type export from @danmarshall/deckgl-typings
// eslint-disable import/no-unresolved
// @ts-ignore
import type { ArcLayerProps } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import MapboxGL from 'mapbox-gl';
import React, { useCallback, useRef, useState } from 'react';

import config from '~/pages/Reports/config';
import { selectors as mapStateSelectors } from '~/pages/Reports/state/OverviewMapState';

import {
  Arc,
  compileTooltip,
} from '~/pages/Reports/pages/OverviewMap/service/arcService';
import { useTypedSelector } from '~/store';

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

const LinkLayer = ({ children }) => {
  const [glContext, setGLContext] = useState<WebGLRenderingContext>();
  // couple deck gl and mapbox gl views
  const [mapViewState, setMapViewState] = useState(INITIAL_DECK_VIEW_STATE);
  const arcLayerProps: ArcLayerProps<Arc[]> = useTypedSelector((state) =>
    mapStateSelectors.selectArcLayerProps(state.ReportsState.OverviewMapState)
  );

  const deckRef = useRef(null);
  const mapRef = useRef<MapboxGL.Map>(null);

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

  const handleInit = (map: MapboxGL.Map) => {
    mapRef.current = map;
    map.on('move', ({ target }) => synchronizeViewStates(target));
    map.on('resize', synchronizeViewStates);
    children.props.onLoad(map);
  };

  const wrappedMap =
    glContext == null
      ? null
      : React.cloneElement(children, { onLoad: handleInit });

  return (
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
      {wrappedMap}
    </DeckGL>
  );
};

export default LinkLayer;
