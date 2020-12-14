import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '~/components2/Button';
import BaseMap from '~/components2/Map';
import { media } from '~/styles/utils';

// import IconActivate1 from './icon-activate.png';
// import IconActivate2 from './icon-activate@2x.png';
// import IconActivate3 from './icon-activate@3x.png';

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
    margin: 3em auto;
  `}
`;

const ActivateButton = styled(Button)<{ mapActive: boolean }>`
  & {
    background-color: white;
    bottom: 1em;
    font-size: 16px;
    left: calc(50% - 7.5625em);
    position: absolute;
    width: 15.125em;
    height: 3em;

    // Move button outside of map wrapper when activated
    transition: transform 0.3s;
    ${({ mapActive }) =>
      mapActive
        ? css`
            transform: translateY(150%);
          `
        : null}
  }
`;

// const IconActivate = styled.img`
//   height: 32px;
//   margin-right: 7px;
//   object-fit: contain;
//   width: 32px;
// `;

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
      <ActivateButton
        ghost
        onClick={() => setActive(true)}
        mapActive={isActive}
      >
        {/* <IconActivate
          src={IconActivate1}
          srcSet={`${IconActivate2} 2x, ${IconActivate3} 3x`}
        />{' '} */}
        Karte aktivieren
      </ActivateButton>
    </Wrapper>
  );
};

export default Map;
