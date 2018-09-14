import { css, injectGlobal, keyframes } from 'styled-components';

import 'normalize.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export function init() {
  injectGlobal([`
    @import url("https://fonts.googleapis.com/css?family=Roboto+Slab:400,700|Open+Sans:300,500,600,700");

    * {
      box-sizing: border-box;
    }

    html {
      height: 100%;
      width: 100%;
    }

    body {
      padding: 0;
      margin: 0;
      position: relative;
      height: 100%;
      width: 100%;
      font-family: 'Open Sans', sans-serif;
    }

    input, button, select, textarea {
      font-family: 'Open Sans', sans-serif;
    }

    ::placeholder {
      color: #bbb;
    }

    #root {
      height: 100%;
      position: relative;
    }

    .switch {
      border: 1px solid #ccc;
      width: 50px;
      height: 26px;
      border-radius: 13px;
      cursor: pointer;
      display: inline-block;
    }

    .switch-toggle {
      border: 1px solid #999;
      box-shadow: 1px 1px 1px #ccc;
      width: 25px;
      height: 24px;
      left: 0;
      border-radius: 12px;
      background: white;
      position: relative;
      transition: left .2s ease-in-out;
    }

    .switch.on {
      background: green;
    }

    .switch.on .switch-toggle {
      left: 23px;
    }

    .switch.disabled {
      cursor: not-allowed;
    }
  `]);
}

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
  init,
  media,
  breakpoints,
  getMediaQuery,
  matchMediaSize,
  isSmallScreen,
  bounce
};
