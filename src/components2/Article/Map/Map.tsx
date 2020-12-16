import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '~/components2/Button';
import BaseMap from '~/components2/Map';
import { media } from '~/styles/utils';

import IconActivate from './smartphone-finger.svg';

const StyledMap = styled(BaseMap)`
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Wrapper = styled.div`
  margin: 0 -16px;
  position: relative;
  padding-top: 66%;
  overflow: hidden;

  ${media.m`
    width: 100%;
    margin: 3em auto 0; // no bottom margin to dock to legend in zesplus page
  `}
`;

const ActivateButton = styled(Button)<{ mapActive: boolean }>`
  & {
    align-items: center;
    background-color: white;
    display: flex;
    flex-direction: row;
    height: 48px;
    justify-content: center;
    padding: 0 24px;
    width: initial;
    z-index: 100;

    &:focus {
      box-shadow: none;
      border-color: transparent;
      outline-style: none;
    }

    & > svg {
      margin-right: 0.5em;
    }

    // Move button outside of map wrapper when activated
    transition: transform 0.3s;
    ${({ mapActive }) =>
      mapActive
        ? css`
            transform: translateY(200%);
          `
        : null}
  }
`;

const ButtonArea = styled.div`
  bottom: 1em;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;

  ${media.l`
    bottom: 1.5em;
  `}

  ${media.xl`
    bottom: 2em;
  `}
`;

const MAPBOX_INTERACTION_HANDLERS = [
  'boxZoom',
  'doubleClickZoom',
  'dragPan',
  'dragRotate',
  'keyboard',
  'scrollZoom',
  'touchZoomRotate',
];

/**
 * Map component for use in an article.
 *
 * Let's users enable interactivity with an animated button overlay.
 *
 * Extends mapboxgl.Map component props
 *
 * @param props.defaultActive set true to hide `activate` button
 */
const Map = ({ defaultActive = false, ...mapProps }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isActive, setActive] = useState(defaultActive);

  /**
   * Activate interaction handlers when activate button is clicked
   */
  useEffect(() => {
    if (map == null) return;
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

export default Map;
