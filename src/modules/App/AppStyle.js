import { injectGlobal } from 'styled-components';

export function init() {
  injectGlobal([`
    @import url("https://fonts.googleapis.com/css?family=Roboto+Slab|Open+Sans");

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

export default {
  init
};
