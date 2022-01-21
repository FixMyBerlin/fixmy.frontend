import MapboxGL from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import { MAPBOX_INTERACTION_HANDLERS } from './MapInteractionHandler.const';
import IconActivate from './smartphone-finger.svg';
import { ActivateButton, ButtonArea, StyledMap, Wrapper } from './styles';

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
export const Map: React.FC<Props> = ({
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
      <StyledMap {...mapProps} interactive={isActive} onInit={setMap} />
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
