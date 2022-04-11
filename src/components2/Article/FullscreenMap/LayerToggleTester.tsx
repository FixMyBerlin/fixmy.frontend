import React, { useEffect, useState } from 'react';
import { Details } from '../Typography';
import { FullscreenMapProps } from './FullscreenMap';

type Props = {
  mapLayer: any | undefined; // TS: mapboxgl.AnyLayer would be better but no idea how to fix the layer.layout below.
  setToggleLayers: FullscreenMapProps['setToggleLayers'];
};

export const LayerToggleTester: React.FC<Props> = ({
  mapLayer,
  setToggleLayers,
}) => {
  type LayerProp = [string, string];
  const [layerList, setLayerlist] = useState<LayerProp[] | null>(null);

  useEffect(() => {
    const layers = mapLayer.map((layer) => {
      return [layer.id, layer?.layout?.visibility || 'unknown'] as LayerProp;
    });
    setLayerlist(layers);
  }, [mapLayer]);

  // Env.CONTEXT ist a Netlify variable. More: https://docs.netlify.com/site-deploys/overview/#deploy-contexts
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.CONTEXT === 'production'
  ) {
    return null;
  }

  return (
    <Details
      summary="DEBUG: Each layer to toggle…"
      style={{ border: '5px solid pink' }}
    >
      <table>
        <thead>
          <tr>
            <th>Layer ID</th>
            <th>Visibility (TODO: Hängt eins hinterher)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {layerList &&
            layerList.map(([layerId, visibility]) => (
              <tr key={layerId}>
                <td>
                  <code>{layerId}</code>
                </td>
                <td>{visibility === 'none' ? 'hidden' : visibility}</td>
                <td>
                  <button
                    onClick={() => setToggleLayers([layerId])}
                    type="button"
                  >
                    toggle
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Details>
  );
};
