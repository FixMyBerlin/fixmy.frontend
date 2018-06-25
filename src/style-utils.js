import { css, injectGlobal } from 'styled-components';

export function init() {
  injectGlobal([`
    @import url("https://fonts.googleapis.com/css?family=Roboto+Slab:500,700|Open+Sans:300,500,600,700");

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

    #root {
      height: 100%;
      position: relative;
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

export function matchMediaSize(size) {
  return window.matchMedia(`(min-width: ${size}px)`).matches;
}

export default {
  init,
  media,
  breakpoints,
  getMediaQuery,
  matchMediaSize
};
