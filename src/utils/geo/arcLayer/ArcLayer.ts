import { Map } from 'mapbox-gl';
import { ArcLayer as DeckArcLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { useEffect } from 'react';

type FixedSizeArray<N extends number, T, M extends string = '0'> = {
  readonly [k in M]: any;
} & { length: N } & ReadonlyArray<T>;
type LonLatList = FixedSizeArray<2, number>;
type Arc = {
  source: LonLatList;
  target: LonLatList;
};
export type ArcList = Arc[];
type ArcLayerProps = {
  map: Map;
  arcData: ArcList;
  color: FixedSizeArray<3, number>;
};

const ArcLayer = ({ map, arcData, color }: ArcLayerProps): void => {
  // basically we always create a new layer when new input data arrives, which might sound ineffective,
  // but it is fine with Deck.GL, see https://deck.gl/docs/developer-guide/performance

  useEffect(() => {
    if (!map) return;

    const arcLayerId = 'arcs';

    const arcLayer = new MapboxLayer({
      id: arcLayerId,
      type: DeckArcLayer,
      data: arcData,
      getSourcePosition: (d) => d.source,
      getTargetPosition: (d) => d.target,
      getSourceColor: color,
      getTargetColor: [51, 223, 255],
      getWidth: 3
      // TODO: add random (configurable) tilt in order to handle two arcs having the combination of start and end
    });
    map.addLayer(arcLayer);

    // cleanup-logic
    // FIXME: take care of eslint complaints
    // eslint-disable-next-line consistent-return
    return () => {
      map.removeLayer(arcLayerId);
    };
  }, [arcData, map]);
  return null;
};

export default ArcLayer;
