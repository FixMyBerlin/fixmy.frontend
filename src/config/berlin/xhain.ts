import { DistrictConfig } from '~/types';

import XHainSmall from '~/images/gastro/wappen.png';
import XHainLarge from '~/images/gastro/wappen@2x.png';

const XHAIN_TERRASSEN = `mapbox://styles/hejco/cka5ko81y16yk1iqllts8uieg${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

// const XHAIN_TERRASSEN_INTERN = `mapbox://styles/hejco/ckb92ue8b0m3h1iphwk9flh6e${
//   process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
// }`;

const xhain: DistrictConfig = {
  title: 'Friedrichshain-Kreuzberg',
  path: 'friedrichshain-kreuzberg',
  name: 'xhain',
  content: {
    footerLine:
      'Ein Angebot des Bezirksamts Friedrichshain-Kreuzberg von Berlin'
  },
  emblem: {
    small: XHainSmall,
    large: XHainLarge
  },
  bounds: [
    [13.3651, 52.4658],
    [13.4945, 52.5479]
  ],
  apps: {
    spielstrassen: {
      path: 'spielstrassen'
    },
    gastro: {
      path: 'terrassen',
      directSignup: true,
      timeline: {
        openSignup: new Date(Date.UTC(2020, 6, 14)),
        closeSignup: new Date(Date.UTC(2020, 7, 31))
      },
      model: {
        category: true,
        opening_hours: false
      },
      signup: {
        mapboxStyle: XHAIN_TERRASSEN
      },
      registration: {
        mapboxStyle: XHAIN_TERRASSEN
      }
    }
  }
};

export default xhain;
