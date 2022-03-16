import MapboxGL from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BaseMap } from '~/components2/BaseMap';
import {
  FloatingLegend,
  FloatingLegendIcon,
} from '~/components2/FloatingLegend';
import { MapControl } from '~/components2/MapsControls';
import { MAPBOX_INTERACTION_HANDLERS } from '../Map/MapInteractionHandler.const';
import { ActivateButton, ButtonArea, MapWrapper, Wrapper } from '../Map/styles';
import { CloseMapIcon } from './CloseMapIcon';
import { LayerToggleTester } from './LayerToggleTester';

const FullscreenWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
`;

export type FullscreenMapProps = {
  defaultActive?: boolean;
  mapboxStyle: mapboxgl.MapboxOptions['style'];
  toggleLayers?: string[];
  setToggleLayers?: (toggleLayers: string[]) => void;
} & Partial<mapboxgl.MapboxOptions>;

/**
 * Map component for use in an article.
 *
 * Let's users enable interactivity with an animated button overlay.
 *
 * Extends mapboxgl.Map component props
 *
 * @param defaultActive set true to hide `activate` button
 * @param toggleLayers an array of map layers to show / hide
 */
export const FullscreenMap: React.FC<FullscreenMapProps> = ({
  defaultActive = false,
  toggleLayers,
  setToggleLayers,
  children,
  ...mapProps
}) => {
  const [map, setMap] = useState<MapboxGL.Map | null>(null);
  const [isFullscreen, setFullscreen] = useState(defaultActive);
  const [showLegend, setShowLegend] = useState(true);

  // Activate interaction handlers when activate button is clicked
  useEffect(() => {
    if (map === null) return;

    MAPBOX_INTERACTION_HANDLERS.forEach((handler) =>
      isFullscreen ? map[handler].enable() : map[handler].disable()
    );
  }, [map, isFullscreen]);

  // Toggle layer visibility
  useEffect(() => {
    if (map === null) return;

    toggleLayers.forEach((layer) => {
      const visibility =
        map.getLayoutProperty(layer, 'visibility') === 'visible'
          ? 'none'
          : 'visible';
      map.setLayoutProperty(layer, 'visibility', visibility);
    });
  }, [map, toggleLayers]);

  if (isFullscreen) {
    return (
      <FullscreenWrapper id="FullscreenMap">
        <CloseMapIcon
          onClick={() => setFullscreen(false)}
          controlsId="FullscreenMap"
        />
        <MapWrapper>
          <BaseMap {...mapProps} onInit={setMap} />
        </MapWrapper>
        <MapControl position="top-left">
          <FloatingLegendIcon
            showLegend={showLegend}
            setShowLegend={setShowLegend}
          />
        </MapControl>
        <FloatingLegend
          visible={showLegend}
          closeLegend={() => setFullscreen(false)}
          positionTop="70px"
        >
          <>
            {children}
            <LayerToggleTester
              setToggleLayers={setToggleLayers}
              mapLayer={map.getStyle().layers}
            />
          </>
        </FloatingLegend>
      </FullscreenWrapper>
    );
  }

  return (
    <Wrapper>
      <MapWrapper>
        <BaseMap {...mapProps} interactive={false} onInit={setMap} />
      </MapWrapper>
      <ButtonArea>
        <ActivateButton
          ghost
          onClick={() => setFullscreen(true)}
          mapActive={isFullscreen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
          </svg>
          Karte aktivieren
        </ActivateButton>
      </ButtonArea>
    </Wrapper>
  );
};
