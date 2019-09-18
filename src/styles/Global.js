
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

import fontFaces from './fontfaces';

import 'mapbox-gl/dist/mapbox-gl.css';

export default createGlobalStyle`
  ${styledNormalize}
  ${fontFaces}

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

  .marker {
    width: 32px;

    .marker-image {
      width: 100%;
    }
  }

  .reports-marker {
    width: 47px;

    .marker-image {
      width: 100%;
    }
  }

  .reports-cluster {
    width: 40px;
    height: 40px;
    border: 3px solid rgb(38, 204, 186);
    background: white;
    border-radius: 50%;
  }

  .reports-cluster__inner {
    border: 3px solid rgba(38, 204, 186, 0.3);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
  }

  .wiggle {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) 0.4s both;
    backface-visibility: hidden;
    perspective: 1000px;

    @keyframes shake {
      10%, 90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%, 80% {
        transform: translate3d(2px, 0, 0);
      }

      30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%, 60% {
        transform: translate3d(4px, 0, 0);
      }
    }
  }
`;
