import React, { useCallback, useRef, useState } from 'react';
import MapboxGL from 'mapbox-gl';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import config from '~/pages/Reports/config';
import BigLoader from '~/components/BigLoader';

const MB_STYLE_URL = `${config.reports.overviewMap.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.mapbox.accessToken;

type BaseMapProps = {
  // If defined, this flag controls if a loading animation is rendered.
  // Useful if a large geodata set is applied to the map over a notable time.
  didOverlayLoad?: boolean;
  // Callback invoked after the map has initialized
  onLoad: (map: MapboxGL.Map, deck: DeckGL['DeckGL']) => void;
  // callback invoked after every map mov
  onMove?: () => void;
  // class name applied to the map wrapper
  mapWrapperClassName?: string;
  // map elements like layers and markers which
  children?: React.ReactNode | React.ReactNode[];
  // maximum map extent expressed in coordinate pairs (SouthWest and NorthEast cornder),
  // see https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike
  maxBounds?: MapboxGL.LngLatBoundsLike;
};

// The Static Map component does not take bounds as prop, instead it takes longitude
// and latitude. We calculate those from the given bounds.
const { bounds } = config.reports.overviewMap;
const [sw, ne] = bounds;
const [minLng, minLat] = sw;
const [maxLng, maxLat] = ne;
const centerLng = minLng + (maxLng - minLng) / 2;
const centerLat = minLat + (maxLat - minLat) / 2;
const center: MapboxGL.LngLatLike = [centerLng, centerLat];

// eslint-disable-next-line import/prefer-default-export
export const BaseMap = ({
  children,
  didOverlayLoad,
  mapWrapperClassName,
  maxBounds,
  onLoad,
  onMove
}: BaseMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  // DeckGL and mapbox will both draw into this WebGL context,
  // see https://deck.gl/docs/api-reference/mapbox/overview
  const [glContext, setGLContext] = useState();
  const deckRef = useRef(null);
  const mapRef = useRef(null);

  // TODO: factor out
  const isOverlayLoaded = didOverlayLoad;
  const isOverlayLoadTogglePropUsed = isOverlayLoaded !== undefined;
  const isMapInitializing = isLoading;
  const isMapInitializingOrOverlayLoading =
    isMapInitializing || !isOverlayLoaded;
  const isLoaderShown = isOverlayLoadTogglePropUsed
    ? isMapInitializingOrOverlayLoading
    : isMapInitializing;

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();
    const { deck } = deckRef.current;

    // we need to set the (maximum) Map Extent dynamically since react-map-gl´s StaticMap
    // does not offer respective props
    map.fitBounds(config.reports.overviewMap.bounds, {
      animate: false
    });
    map.setMaxBounds(maxBounds);
    // same goes for onMove callback
    map.on('move', onMove);

    setIsLoading(false);
    // @ts-ignore
    window.map = map; // TODO: findout if we actually need this
    onLoad(map, deck);
  }, []);

  // TODO: factor out loader logic to HOC

  return (
    <>
      {isLoaderShown && <BigLoader useAbsolutePositioning />}
      <DeckGL
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
          <StaticMap
            ref={mapRef}
            gl={glContext}
            mapStyle={MB_STYLE_URL}
            mapboxApiAccessToken={config.mapbox.accessToken}
            onLoad={onMapLoad}
            data-cy="reports-basemap"
            className={mapWrapperClassName}
          >
            {children}
          </StaticMap>
        )}
      </DeckGL>
    </>
  );
};
