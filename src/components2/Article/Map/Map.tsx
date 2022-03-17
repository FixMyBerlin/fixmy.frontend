import MapboxGL from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import { BaseMap } from '~/components2/BaseMap';
import IconActivate from './assets/smartphone-finger-icon.svg';
import { MapActivationButton } from './MapActivationButton';
import { MAPBOX_INTERACTION_HANDLERS } from './MapInteractionHandler.const';
import { MapWrapper, Wrapper } from './styles';

type Props = {
  defaultActive?: boolean;
  mapboxStyle: mapboxgl.MapboxOptions['style'];
} & Partial<mapboxgl.MapboxOptions>;

/**
 * Map component for use in an article.
 *
 * Let's users enable interactivity with an animated button overlay.
 *
 * Extends mapboxgl.Map component props
 *
 * @param defaultActive set true to hide `activate` button
 */
export const Map: React.VFC<Props> = ({
  defaultActive = false,
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

  return (
    <Wrapper>
      <MapWrapper>
        <BaseMap {...mapProps} interactive={isActive} onInit={setMap} />
      </MapWrapper>
      <MapActivationButton isActive={isActive} setActive={setActive}>
        <IconActivate /> Karte aktivieren
      </MapActivationButton>
    </Wrapper>
  );
};
