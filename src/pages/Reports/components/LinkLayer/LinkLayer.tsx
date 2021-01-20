import { ArcLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import MapboxGL from 'mapbox-gl';
import React, { useCallback, useState } from 'react';

import config from '~/pages/Reports/config';
import { selectors as mapStateSelectors } from '~/pages/Reports/state/OverviewMapState';
import { compileTooltip } from '~/pages/Reports/components/LinkLayer/arcService';
import { useTypedSelector } from '~/store';
import BaseMap from '../BaseMap';

/**
 * Augment a BaseMap with a Deck.gl layer visualizing links between reports
 * and plannings.
 *
 * @param param0.children <BaseMap /> component
 */
const LinkLayer = ({
  children,
}: {
  children: React.ReactElement<
    React.ComponentProps<typeof BaseMap>,
    typeof BaseMap
  >;
}) => {
  // Fallback to rendering children if no linklayer config is found
  if (config.reports?.overviewMap.linkLayer == null) return children;

  const [glContext, setGLContext] = useState<WebGLRenderingContext>();
  // couple deck gl and mapbox gl views
  const [mapViewState, setMapViewState] = useState<{}>();

  // Construct arc layer from redux state
  const arcLayerProps = useTypedSelector((state) =>
    mapStateSelectors.selectArcLayerProps(state.ReportsState.OverviewMapState)
  );
  const layers = [new ArcLayer(arcLayerProps)];

  /**
   * Transfer MapboxGL viewstate to Deck.gl to keep both views in sync
   */
  const applyMapboxViewState = useCallback((mapboxMap: MapboxGL.Map) => {
    const center = mapboxMap.getCenter();
    setMapViewState((prevState) => ({
      ...prevState,
      zoom: mapboxMap.getZoom(),
      pitch: mapboxMap.getPitch(),
      bearing: mapboxMap.getBearing(),
      latitude: center.lat,
      longitude: center.lng,
    }));
  }, []);

  /**
   * Attach event listeners to Mapbox react that allow synching Deck.gl viewstate
   *
   * Children event listeners are also called.
   *
   * @param map MapboxGL instance
   */
  const onMapLoad = (map: MapboxGL.Map) => {
    applyMapboxViewState(map);
    map.on('move', (ev) => {
      applyMapboxViewState(ev.target);
      if (children.props.onMove) children.props.onMove(ev);
    });
    map.on('resize', ({ target }) => applyMapboxViewState(target));
    children.props.onLoad(map);
  };

  // The child <BaseMap /> is displayed once Deck.gl's gl context is available
  const wrappedMap =
    glContext == null
      ? null
      : React.cloneElement(children, { onLoad: onMapLoad });

  return (
    <DeckGL
      controller
      getTooltip={compileTooltip}
      id="reports-deckgl-canvas"
      layers={layers}
      onWebGLInitialized={setGLContext}
      pickingRadius={8}
      viewState={mapViewState}
    >
      {wrappedMap}
    </DeckGL>
  );
};

export default LinkLayer;
