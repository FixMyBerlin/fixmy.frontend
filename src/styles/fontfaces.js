import openSans300woff from '../fonts/open-sans-v17-latin-300.woff';
import openSans300woff2 from '../fonts/open-sans-v17-latin-300.woff2';
import openSansRegularwoff from '../fonts/open-sans-v17-latin-regular.woff';
import openSansRegularwoff2 from '../fonts/open-sans-v17-latin-regular.woff2';
import openSans600woff from '../fonts/open-sans-v17-latin-600.woff';
import openSans600woff2 from '../fonts/open-sans-v17-latin-600.woff2';
import openSans700woff from '../fonts/open-sans-v17-latin-700.woff';
import openSans700woff2 from '../fonts/open-sans-v17-latin-700.woff2';

import robotoRegularwoff from '../fonts/roboto-slab-v9-latin-regular.woff';
import robotoRegularwoff2 from '../fonts/roboto-slab-v9-latin-regular.woff2';
import roboto700woff from '../fonts/roboto-slab-v9-latin-700.woff';
import roboto700woff2 from '../fonts/roboto-slab-v9-latin-700.woff2';

import theMixBlackwoff from '../fonts/TheMixC5-9_Black.woff';
import theMixBlackwoff2 from '../fonts/TheMixC5-9_Black.woff2';

export default `
  /* open-sans-300 - latin */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 300;
    src: local('Open Sans Light'), local('OpenSans-Light'),
        url(${openSans300woff2}) format('woff2'),
        url(${openSans300woff}) format('woff');
  }
  /* open-sans-regular - latin */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
        url(${openSansRegularwoff2}) format('woff2'),
        url(${openSansRegularwoff}) format('woff');
  }
  /* open-sans-600 - latin */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'),
        url(${openSans600woff2}) format('woff2'),
        url(${openSans600woff}) format('woff');
  }
  /* open-sans-700 - latin */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    src: local('Open Sans Bold'), local('OpenSans-Bold'),
        url(${openSans700woff2}) format('woff2'),
        url(${openSans700woff}) format('woff');
  }

  /* roboto-slab-regular - latin */
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Slab Regular'), local('RobotoSlab-Regular'),
        url(${robotoRegularwoff2}) format('woff2'),
        url(${robotoRegularwoff}) format('woff');
  }
  /* roboto-slab-700 - latin */
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto Slab Bold'), local('RobotoSlab-Bold'),
        url(${roboto700woff2}) format('woff2'),
        url(${roboto700woff}) format('woff');
  }
  /* The Mix - black */
  @font-face {
    font-family: 'The Mix';
    font-style: normal;
    font-weight: 700;
    src: local('TheMixBlack'), local('TheMixC5-9_Black'),
        url(${theMixBlackwoff2}) format('woff2'),
        url(${theMixBlackwoff}) format('woff');
  }
`;
