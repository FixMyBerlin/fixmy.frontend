import styled from 'styled-components';
import { media } from '~/styles/utils';

export const MapWrapper = styled.div`
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Wrapper = styled.div`
  // no bottom margin to dock to legend in zesplus page
  margin: 1em -16px 0;

  // Hack to force the aspect ratio of the contained map:
  // padding-top 100% => 1:1 aspect
  // padding-top  66% => 3:2 aspect
  position: relative;
  padding-top: 100%;
  overflow: hidden;

  ${media.m`
    padding-top: 66%;
    width: 100%;
    margin: 2em auto 0;
  `}

  ${media.l`
    margin: 2em -5em 0 auto;
    width: calc(100% - 24px + 5em);
  `}

  ${media.xl`
    margin: 2em -5em 0 auto;
    width: calc(100% - 151px + 5em);
  `}
`;
