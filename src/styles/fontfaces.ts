// Download from https://google-webfonts-helper.herokuapp.com/fonts/open-sans?subsets=latin
import openSans300woff from '../fonts/open-sans-v27-latin-300.woff';
import openSans300woff2 from '../fonts/open-sans-v27-latin-300.woff2';
import openSans600woff from '../fonts/open-sans-v27-latin-600.woff';
import openSans600woff2 from '../fonts/open-sans-v27-latin-600.woff2';
import openSans600woffItalic from '../fonts/open-sans-v27-latin-600italic.woff';
import openSans600woff2Italic from '../fonts/open-sans-v27-latin-600italic.woff2';
import openSans700woff from '../fonts/open-sans-v27-latin-700.woff';
import openSans700woff2 from '../fonts/open-sans-v27-latin-700.woff2';
import openSans400woffItalic from '../fonts/open-sans-v27-latin-italic.woff';
import openSans400woff2Italic from '../fonts/open-sans-v27-latin-italic.woff2';
import openSans400woff from '../fonts/open-sans-v27-latin-regular.woff';
import openSans400woff2 from '../fonts/open-sans-v27-latin-regular.woff2';
import robotoSlab100woff from '../fonts/roboto-slab-v12-latin-100.woff';
import robotoSlab100woff2 from '../fonts/roboto-slab-v12-latin-100.woff2';
import robotoSlab700woff from '../fonts/roboto-slab-v12-latin-700.woff';
import robotoSlab700woff2 from '../fonts/roboto-slab-v12-latin-700.woff2';
import robotoSlabwoff from '../fonts/roboto-slab-v12-latin-regular.woff';
import robotoSlabwoff2 from '../fonts/roboto-slab-v12-latin-regular.woff2';
import roboto700woff from '../fonts/roboto-v20-latin-700.woff';
import roboto700woff2 from '../fonts/roboto-v20-latin-700.woff2';
import robotoItalicwoff from '../fonts/roboto-v20-latin-italic.woff';
import robotoItalicwoff2 from '../fonts/roboto-v20-latin-italic.woff2';
import robotowoff from '../fonts/roboto-v20-latin-regular.woff';
import robotowoff2 from '../fonts/roboto-v20-latin-regular.woff2';
import theMixBlackwoff from '../fonts/TheMixC5-9_Black.woff';
import theMixBlackwoff2 from '../fonts/TheMixC5-9_Black.woff2';

export default `
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Open Sans Light'), local('OpenSans-Light'),
        url(${openSans300woff2}) format('woff2'),
        url(${openSans300woff}) format('woff');
  }
  /* open-sans-regular - latin */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
        url(${openSans400woff2}) format('woff2'),
        url(${openSans400woff}) format('woff');
  }
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'),
        url(${openSans600woff2}) format('woff2'),
        url(${openSans600woff}) format('woff');
  }
    @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Open Sans Bold'), local('OpenSans-Bold'),
        url(${openSans700woff2}) format('woff2'),
        url(${openSans700woff}) format('woff');
  }
  @font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: local('Open Sans SemiBold Italic'), local('OpenSans-SemiBoldItalic'),
        url(${openSans400woff2Italic}) format('woff2'),
        url(${openSans400woffItalic}) format('woff');
  }
  @font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: local('Open Sans SemiBold Italic'), local('OpenSans-SemiBoldItalic'),
        url(${openSans600woff2Italic}) format('woff2'),
        url(${openSans600woffItalic}) format('woff');
  }
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Open Sans Bold'), local('OpenSans-Bold'),
        url(${openSans700woff2}) format('woff2'),
        url(${openSans700woff}) format('woff');
  }

  /* roboto-slab-regular - latin */
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto Slab Regular'), local('RobotoSlab-Regular'),
        url(${robotoSlabwoff2}) format('woff2'),
        url(${robotoSlabwoff}) format('woff');
  }
  /* roboto-slab-100 - latin */
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: local('Roboto Slab Thin'), local('RobotoSlab-Thin'),
        url(${robotoSlab100woff2}) format('woff2'),
        url(${robotoSlab100woff}) format('woff');
  }
  /* roboto-slab-700 - latin */
  @font-face {
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Slab Bold'), local('RobotoSlab-Bold'),
        url(${robotoSlab700woff2}) format('woff2'),
        url(${robotoSlab700woff}) format('woff');
  }


  /* roboto-regular - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto Regular'), local('Roboto-Regular'),
        url(${robotowoff2}) format('woff2'),
        url(${robotowoff}) format('woff');
  }
  /* roboto-italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto Italic'), local('Roboto-Italic'),
        url(${robotoItalicwoff2}) format('woff2'),
        url(${robotoItalicwoff}) format('woff');
  }
  /* roboto-slab-700 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'),
        url(${roboto700woff2}) format('woff2'),
        url(${roboto700woff}) format('woff');
  }

  /* The Mix - black */
  @font-face {
    font-family: 'The Mix';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('TheMixBlack'), local('TheMixC5-9_Black'),
        url(${theMixBlackwoff2}) format('woff2'),
        url(${theMixBlackwoff}) format('woff');
  }
`;
