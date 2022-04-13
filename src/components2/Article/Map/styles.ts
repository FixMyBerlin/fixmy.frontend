import styled, { css } from 'styled-components';
import { Button } from '~/components2/Button';
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

export const ActivateButton = styled(Button)<{ mapActive: boolean }>`
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

export const ButtonArea = styled.div`
  bottom: 1em;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;

  ${media.m`
    bottom: 2em;
  `}

  ${media.xl`
    bottom: 2em;
  `}
`;
