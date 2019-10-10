import { css, keyframes } from 'styled-components';

// https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md
export function getMediaQuery(size) {
  return (...args) => css`
    @media (min-width: ${size}px) {
      ${css(...args)}
    }
  `;
}

export const breakpoints = {
  s: 460,
  m: 768,
  l: 1024
};

export const media = {
  s: getMediaQuery(breakpoints.s),
  m: getMediaQuery(breakpoints.m),
  l: getMediaQuery(breakpoints.l)
};

function getOrientationQuery(orientation) {
  return (...args) => css`
    @media (orientation: ${orientation}) {
      ${typeof window.orientation !== 'undefined' ? css(...args) : ''}
    }
  `;
}

export const orientation = {
  landscape: getOrientationQuery('landscape'),
  portrait: getOrientationQuery('portrait')
};

export function matchMediaSize(size) {
  return window.matchMedia(`(min-width: ${size}px)`).matches;
}

export function isSmallScreen() {
  return window.matchMedia(`screen and (max-width: ${breakpoints.m}px)`).matches;
}

export const bounce = keyframes`
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    transform: scale3d(0.5, 0.5, 0.5);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
`;

export default {
  media,
  breakpoints,
  getMediaQuery,
  matchMediaSize,
  isSmallScreen,
  bounce
};
