import { css, keyframes } from 'styled-components';

type MediaType = Parameters<typeof css>;

// https://github.com/styled-components/styled-components/blob/master/packages/styled-components/docs/tips-and-tricks.md#more-powerful-example
const getMediaQuery = (size: number) => {
  return (...styleDefinition: MediaType) => css`
    @media (min-width: ${size}px) {
      ${css(...styleDefinition)}
    }
  `;
};

// MediaQueries are min-width
export const breakpoints = {
  // Mobile 0-459px
  s: 460, // 460px-up
  m: 768, // 768px-up
  l: 1024, // 1024px-up
  xl: 1280, // 1280px-up
};

export const media = {
  s: getMediaQuery(breakpoints.s),
  m: getMediaQuery(breakpoints.m),
  l: getMediaQuery(breakpoints.l),
  xl: getMediaQuery(breakpoints.xl),
};

function getOrientationQuery(orientation) {
  return (...args: Parameters<typeof css>) => css`
    @media (orientation: ${orientation}) {
      ${typeof window.orientation !== 'undefined' ? css(...args) : ''}
    }
  `;
}

export const orientation = {
  landscape: getOrientationQuery('landscape'),
  portrait: getOrientationQuery('portrait'),
};

export function matchMediaSize(size: number) {
  return window.matchMedia(`(min-width: ${size}px)`).matches;
}

export function isSmallScreen() {
  return window.matchMedia(`screen and (max-width: ${breakpoints.m}px)`)
    .matches;
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
  bounce,
};
