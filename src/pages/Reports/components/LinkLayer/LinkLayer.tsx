import { FeatureCollection, LineString } from 'geojson';
import MapboxGL, { GeoJSONSource } from 'mapbox-gl';
import React, { useState, useEffect } from 'react';

import config from '~/pages/Reports/config';
import { selectors as mapStateSelectors } from '~/pages/Reports/state/OverviewMapState';
import { useTypedSelector } from '~/store';

import BaseMap from '../BaseMap';

const LINK_LAYER = '_reports_link_layer';
const LINK_SOURCE = '_reports_link_source';

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
  const [map, setMap] = useState<MapboxGL.Map | null>(null);

  // Fallback to rendering children if no linklayer config is found
  if (config.reports?.overviewMap.linkLayer == null) return children;

  // reselect's type definitions seem not to work so this type is set explicitly
  // here to the expected value
  type selectLinkLayerGeometriesType = (
    state: any
  ) => FeatureCollection<
    LineString,
    {
      [name: string]: any;
    }
  >
  const linkGeometries = useTypedSelector((state) =>
    (mapStateSelectors.selectLinkLayerGeometries as selectLinkLayerGeometriesType)(state.ReportsState.OverviewMapState)
  );

  useEffect(() => {
    if (map == null) return;
    (map.getSource(LINK_SOURCE) as GeoJSONSource).setData(linkGeometries);
  }, [linkGeometries, map]);

  const onMapLoad = (mapLoaded: MapboxGL.Map) => {
    if (children.props.onLoad) children.props.onLoad(mapLoaded);

    mapLoaded.addSource(LINK_SOURCE, {
      type: 'geojson',
      data: linkGeometries,
    });

    mapLoaded.addLayer({
      id: LINK_LAYER,
      type: 'line',
      source: LINK_SOURCE,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': config.reports.overviewMap.linkLayer.color,
        'line-opacity': 0.9,
        'line-width': 3,
      },
    });
    setMap(mapLoaded);
  };

  return React.cloneElement(children, { onLoad: onMapLoad });
};

export default LinkLayer;
