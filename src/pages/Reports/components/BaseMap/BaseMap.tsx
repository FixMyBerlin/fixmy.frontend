import React, { useEffect, useRef, useState } from 'react';
import MapboxGL from 'mapbox-gl';
import DeckGL from '@deck.gl/react';

import config from '~/pages/Reports/config';
import BigLoader from '~/components/BigLoader';
import { MapContainer } from '~/pages/Reports/components/BaseMap/MapContainer';

const MB_STYLE_URL = `${config.reports.overviewMap.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.mapbox.accessToken;
const configuredBounds = config.reports.overviewMap
  .bounds as MapboxGL.LngLatBoundsLike;
// The DeckGL component does not take bounds as prop, instead it takes longitude
// and latitude. We calculate those from the given bounds.
const { bounds } = config.reports.overviewMap;
const [sw, ne] = bounds;
const [minLng, minLat] = sw;
const [maxLng, maxLat] = ne;
const centerLng = minLng + (maxLng - minLng) / 2;
const centerLat = minLat + (maxLat - minLat) / 2;
// Viewport settings
const INITIAL_DECK_VIEW_STATE = {
  longitude: centerLng,
  latitude: centerLat,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

type BaseMapProps = {
  // If defined, this flag controls if a loading animation is rendered.
  // Useful if a large geodata set is applied to the map over a notable time.
  didOverlayLoad?: boolean;
  // Callback invoked after the map has initialized
  onLoad: (map: MapboxGL.Map, deck: DeckGL['DeckGL']) => void;
  // callback invoked after every map mov
  onMove?: () => void;
  // map elements like layers and markers which
  children?: React.ReactNode | React.ReactNode[];
  // maximum map extent expressed in coordinate pairs (SouthWest and NorthEast corner),
  // see https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike
  maxBounds?: MapboxGL.LngLatBoundsLike;
  // class name applied to the map wrapper
  mapWrapperClassName?: string;
};

// eslint-disable-next-line import/prefer-default-export
export const BaseMap = ({
  children,
  didOverlayLoad,
  maxBounds,
  onLoad,
  onMove,
  mapWrapperClassName
}: BaseMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [glContext, setGLContext] = useState();
  const deckRef = useRef(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxGL.Map>(null);

  const isOverlayLoadTogglePropUsed = didOverlayLoad !== undefined;
  const isMapInitializingOrOverlayLoading = isLoading || !didOverlayLoad;
  const isLoaderShown = isOverlayLoadTogglePropUsed
    ? isMapInitializingOrOverlayLoading
    : isLoading;

  // map initialization logic
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new MapboxGL.Map({
      container: mapContainerRef.current,
      style: MB_STYLE_URL,
      bounds: configuredBounds,
      maxBounds
    });
    mapRef.current = map;
    map.on('move', onMove);
    map.on('load', () => {
      debugger;
      setIsLoading(false);
      // @ts-ignore
      window.map = map; // TODO: find out if we actually need this
      onLoad(map, deckRef.current.deck);
    });
    // cleanup
    return () => {
      map.remove();
      deckRef.current.deck.finalize();
    };
  }, [mapContainerRef.current]);

  return (
    <>
      {isLoaderShown && <BigLoader useAbsolutePositioning />}
      <DeckGL
        initialViewState={INITIAL_DECK_VIEW_STATE}
        ref={deckRef}
        controller
        onWebGLInitialized={setGLContext}
        glOptions={{
          /* To render vector tile polygons correctly */
          stencil: true
        }}
      >
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
