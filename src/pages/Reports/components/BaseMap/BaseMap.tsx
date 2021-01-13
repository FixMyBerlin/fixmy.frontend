import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapboxGL from 'mapbox-gl';
import DeckGL from '@deck.gl/react';
import { ArcLayer, ArcLayerProps } from '@deck.gl/layers';
import config from '~/pages/Reports/config';
import BigLoader from '~/components/BigLoader';
import { MapContainer } from '~/pages/Reports/components/BaseMap/MapContainer';
import {
  Arc,
  compileTooltip,
} from '~/pages/Reports/pages/OverviewMap/service/arcService';

const MB_STYLE_URL = `${config.reports.overviewMap.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.mapbox.accessToken;
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

type Props = {
  // If defined, this flag controls if a loading animation is rendered.
  // Useful if a large Geodata set is applied to the map over a notable time.
  didOverlayLoad?: boolean;
  // Callback invoked after the map has initialized
  onLoad: (map: MapboxGL.Map) => void;
  // callback invoked after every map mov
  onMove?: () => void;
  // map elements like layers and markers which
  children?: React.ReactNode | React.ReactNode[];
  // Child elements of the DeckGL component,
  // see https://deck.gl/docs/get-started/using-with-react
  arcLayerProps?: ArcLayerProps<Arc[]>;
  // maximum map extent expressed in coordinate pairs (SouthWest and NorthEast corner),
  // see https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike
  maxBounds?: MapboxGL.LngLatBoundsLike;
  // class name applied to the map wrapper
  mapWrapperClassName?: string;
};

export const BaseMap = ({
  children,
  didOverlayLoad,
  maxBounds,
  onLoad,
  onMove,
  mapWrapperClassName,
  arcLayerProps,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [glContext, setGLContext] = useState<WebGLRenderingContext>();
  // couple deck gl and mapbox gl views
  const [mapViewState, setMapViewState] = useState(INITIAL_DECK_VIEW_STATE);

  const deckRef = useRef(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxGL.Map>(null);

  const isOverlayLoadTogglePropUsed = didOverlayLoad !== undefined;
  const isMapInitializingOrOverlayLoading = isLoading || !didOverlayLoad;
  const isLoaderShown = isOverlayLoadTogglePropUsed
    ? isMapInitializingOrOverlayLoading
    : isLoading;

  // In order to couple couple the map view state of the deck.gl and the mapbox-gl-js map,
  // we need to manually listen for map movements in the mapbox-gl-js map and apply
  // the updated view state to the deck.gl map.

  const innerOnMove = useCallback(
    ({ target }) => {
      synchronizeViewStates(target);
      onMove();
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

  // map initialization logic
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new MapboxGL.Map({
      container: mapContainerRef.current,
      style: MB_STYLE_URL,
      bounds: configuredBounds,
      maxBounds,
    });
    mapRef.current = map;

    map.on('move', innerOnMove);
    map.on('load', () => {
      setIsLoading(false);
      // @ts-ignore
      window.map = map; // TODO: find out if we actually need this
      onLoad(map);
    });
    map.on('resize', synchronizeViewStates);
    // TODO: do we need any cleanup logic?
  }, [mapContainerRef.current]);

  return (
    <>
      {isLoaderShown && <BigLoader useAbsolutePositioning />}
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
        {glContext && (
          /* This is important: Mapbox must be instantiated after the WebGLContext is available */
          <MapContainer
            ref={mapContainerRef}
            data-cy="reports-basemap"
            className={mapWrapperClassName}
          >
            {children}
          </MapContainer>
        )}
      </DeckGL>
    </>
  );
};
