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
import { MapActivationButton } from '../Map/MapActivationButton';
import { MAPBOX_INTERACTION_HANDLERS } from '../Map/MapInteractionHandler.const';
import { MapWrapper, Wrapper } from '../Map/styles';
import FullscreenIcon from './icons/fullscreen-icon.svg';

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
  allLayers?: string[];
  visibleLayers?: string[];
} & Partial<mapboxgl.MapboxOptions>;

/**
 * Map component with fullscreen capabilities for use in an article.
 *
 * Shows a preview of the map (non interactive).
 * The button to activate the map shows the map full screen with a floating legend panel.
 *
 * Extends mapboxgl.Map component props
 *
 * @param allLayers an array of all map custom map layers; use together with `visibleLayers`
 * @param visibleLayers an array of map layers to show; only those are visible for this map
 */
export const FullscreenMap: React.FC<FullscreenMapProps> = ({
  allLayers = [],
  visibleLayers = [],
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

  if (isFullscreen) {
    return (
      <FullscreenWrapper id="FullscreenMap">
        <MapControl top right visible={isDesktopView || !showLegend}>
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
        <MapControl top left>
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
          {children}
        </FloatingLegend>
      </FullscreenWrapper>
    );
  }

  return (
    <Wrapper>
      <MapWrapper>
        <BaseMap {...mapProps} interactive={false} onInit={setMap} />
      </MapWrapper>
      <MapActivationButton isActive={isFullscreen} setActive={setFullscreen}>
        <FullscreenIcon /> Vollbild
      </MapActivationButton>
    </Wrapper>
  );
};
