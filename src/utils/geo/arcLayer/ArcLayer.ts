import { ArcLayer as DeckArcLayer } from '@deck.gl/layers';
import { useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { getRandomTilt } from '~/utils/geo/arcLayer/ArcLayerUtils';

type Arc = {
  source: [number, number];
  sourceName: string;
  target: [number, number];
  targetName: string;
};
export type ArcList = Arc[];
type ArcLayerProps = {
  deck: DeckGL.DeckGL;
  arcData: ArcList;
  color: [number, number, number];
};

// TODO: use a meaningful toolTip message
const getToolTip = (arc: Arc): string | undefined =>
  arc && `From ${arc.sourceName} to ${arc.targetName}`;

const ArcLayer = ({ deck, arcData, color }: ArcLayerProps): void => {
  // basically we always create a new layer when new input data arrives, which might sound ineffective,
  // but it is fine with Deck.GL, see https://deck.gl/docs/developer-guide/performance

  useEffect(() => {
    if (!deck) return;

    const arcLayerId = 'arcs';

    const arcLayer = new DeckArcLayer({
      id: arcLayerId,
      data: arcData,
      getSourcePosition: (d) => d.source,
      getTargetPosition: (d) => d.target,
      getSourceColor: color,
      getTargetColor: [51, 223, 255],
      getWidth: 4,
      opacity: 0.8,
      // add a little bit of random tilt to differentiate arcs with the same combination of source and destination
      getTilt: getRandomTilt()
    });
    deck.setProps({
      layers: [...deck.layers, arcLayer]
    });

    // cleanup-logic
    // FIXME: take care of eslint complaints
    // eslint-disable-next-line consistent-return
    return () => {
      deck.setProps({
        layers: [deck.layers.filter((layer) => layer !== arcLayer)],
        getTooltip: getToolTip
      });
    };
  }, [arcData, deck]);
  return null;
};

export default ArcLayer;
