import MapboxGL from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import { BaseMap } from '~/components2/BaseMap';
import { MAPBOX_INTERACTION_HANDLERS } from './MapInteractionHandler.const';
import { ActivateButton, ButtonArea, MapWrapper, Wrapper } from './styles';

/* eslint-disable-next-line import/no-unresolved */
import IconActivate from './smartphone-finger.svg?component';

type Props = {
  defaultActive?: boolean;
  mapboxStyle: mapboxgl.MapboxOptions['style'];
  allLayers?: string[];
  visibleLayers?: string[];
} & Partial<mapboxgl.MapboxOptions>;

/**
 * Map component for use in an article.
 *
 * Let's users enable interactivity with an animated button overlay.
 *
 * Extends mapboxgl.Map component props
 *
 * @param defaultActive set true to hide `activate` button
 * @param allLayers an array of all map custom map layers; use together with `visibleLayers`
 * @param visibleLayers an array of map layers to show; only those are visible for this map
 */
export const Map: React.VFC<Props> = ({
  defaultActive = false,
  allLayers = [],
  visibleLayers = [],
  ...mapProps
}) => {
  const [map, setMap] = useState<MapboxGL.Map | null>(null);
  const [isActive, setActive] = useState(defaultActive);

  // Activate interaction handlers when activate button is clicked
  useEffect(() => {
    if (map === null) return;

    MAPBOX_INTERACTION_HANDLERS.forEach((handler) =>
      isActive ? map[handler].enable() : map[handler].disable()
    );
  }, [map, isActive]);

  // Layer visibility
  useEffect(() => {
    if (map === null) return;

    // Hide all custom layers so we can show those we want
    allLayers.forEach((layer) => {
      map.setLayoutProperty(layer, 'visibility', 'none');
    });
    visibleLayers.forEach((layer) => {
      map.setLayoutProperty(layer, 'visibility', 'visible');
    });
  }, [map, allLayers, visibleLayers]);

  return (
    <Wrapper>
      <MapWrapper>
        <BaseMap {...mapProps} interactive={isActive} onInit={setMap} />
      </MapWrapper>
      <ButtonArea>
        <ActivateButton
          ghost
          onClick={() => setActive(true)}
          mapActive={isActive}
        >
          <IconActivate />
          Karte aktivieren
        </ActivateButton>
      </ButtonArea>
    </Wrapper>
  );
};
