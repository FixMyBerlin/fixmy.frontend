import TempelbergSmall from '~/images/gastro/wappen-tempelberg.png';
import TempelbergLarge from '~/images/gastro/wappen-tempelberg@2x.png';
import XHainSmall from '~/images/gastro/wappen.png';
import XHainLarge from '~/images/gastro/wappen@2x.png';

export default {
  districts: {
    xhain: {
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
          timeline: {
            openSignup: new Date(2020, 4, 14),
            closeSignup: new Date(2020, 4, 19)
          }
        }
      }
    },
    tempelberg: {
      title: 'Tempelhof-Schöneberg',
      path: 'tempelhof-schöneberg',
      name: 'tempelberg',
      content: {
        footerLine:
          'Ein Angebot des Bezirksamts Tempelhof-Schöneberg von Berlin'
      },
      emblem: {
        small: TempelbergSmall,
        large: TempelbergLarge
      },
      backend: {
        local: 'http://localhost:8000/api',
        staging: 'https://fixmyberlin-staging.netlify.app/api/tempelberg/next',
        production: 'https://fixmyberlin.de/api/tempelberg/v1'
      },
      bounds: [
        [13.319982942, 52.376139915],
        [13.427456693, 52.504941181]
      ],
      apps: {
        gastro: {
          path: 'terrassen',
          timeline: {
            openSignup: new Date(Date.UTC(2020, 5, 19, 16, 0)),
            closeSignup: new Date(Date.UTC(2020, 5, 22, 8, 0))
          }
        }
      }
    }
  }
};
