import MapboxGL from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BaseMap } from '~/components2/BaseMap';
import { ClosePanelButton } from '~/components2/ClosePanelButton';
import {
  FloatingLegend,
  FloatingLegendIcon,
} from '~/components2/FloatingLegend';
import { MapControl } from '~/components2/MapsControls';
import { breakpoints, matchMediaSize, media } from '~/styles/utils';
import { MAPBOX_INTERACTION_HANDLERS } from '../Map/MapInteractionHandler.const';
import { ActivateButton, ButtonArea, MapWrapper, Wrapper } from '../Map/styles';
import { LayerToggleTester } from './LayerToggleTester';

const FullscreenWrapper = styled.div`
  position: fixed;
  z-index: 10;
  inset: 78px 0 0 0; // To respect the sticky header on mobile

  ${media.m`
    inset: 0;
  `}
`;

export type FullscreenMapProps = {
  mapboxStyle: mapboxgl.MapboxOptions['style'];
  toggleLayers?: string[];
  setToggleLayers?: (toggleLayers: string[]) => void;
} & Partial<mapboxgl.MapboxOptions>;

/**
 * Map component with fullscreen capabilities for use in an article.
 *
 * Shows a preview of the map (non interactive).
 * The button to activate the map shows the map full screen with a floating legend panel.
 *
 * Extends mapboxgl.Map component props
 *
 * @param toggleLayers an array of map layers to show / hide
 */
export const FullscreenMap: React.FC<FullscreenMapProps> = ({
  toggleLayers,
  setToggleLayers,
  children,
  ...mapProps
}) => {
  const isDesktopView = matchMediaSize(breakpoints.m);
  const [map, setMap] = useState<MapboxGL.Map | null>(null);
  const [isFullscreen, setFullscreen] = useState(false);
  const [showLegend, setShowLegend] = useState(isDesktopView);

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
        <MapControl position="top-right" visible={!showLegend}>
          <ClosePanelButton
            onClick={() => setFullscreen(false)}
            controlsId="FullscreenMap"
            style={{
              position: 'relative',
              right: 'auto',
              top: 'auto',
            }}
          />
        </MapControl>
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
          closeLegend={() => setShowLegend(false)}
          closeLegendStyle={{ left: '16px', right: 'auto' }}
          style={isDesktopView ? { right: '70px' } : { top: '36px' }}
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
