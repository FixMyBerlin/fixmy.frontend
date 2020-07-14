import TempelbergSmall from '~/images/gastro/wappen-tempelberg.png';
import TempelbergLarge from '~/images/gastro/wappen-tempelberg@2x.png';
import XHainSmall from '~/images/gastro/wappen.png';
import XHainLarge from '~/images/gastro/wappen@2x.png';

const XHAIN_TERRASSEN = `mapbox://styles/hejco/cka5ko81y16yk1iqllts8uieg${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

// const XHAIN_TERRASSEN_INTERN = `mapbox://styles/hejco/ckb92ue8b0m3h1iphwk9flh6e${
//   process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
// }`;

const TS_TERRASSEN = `mapbox://styles/hejco/ckbkt650p0wve1ip71tdibx8u${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

// const TS_TERRASSEN_INTERN = `mapbox://styles/hejco/ckb92ue8b0m3h1iphwk9flh6e${
//   process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
// }`;

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
            openSignup: new Date(2020, 6, 14),
            closeSignup: new Date(2020, 7, 31)
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
    },
    tempelberg: {
      title: 'Tempelhof-Schöneberg',
      path: 'tempelhof-schoeneberg',
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
            closeSignup: new Date(Date.UTC(2020, 5, 23, 8, 0))
          },
          model: {
            category: false,
            opening_hours: true
          },
          signup: {
            mapboxStyle: TS_TERRASSEN,
            intro: `Ihre Angaben sind unverbindlich, das Bezirksamt wird Sie 
            nach der Bedarfsprüfung zum weiteren Vorgehen kontaktieren.`,
            shopfrontLabel: `Auf Grundlage der Straßenfront-Breite kann das 
            Bezirksamt entscheiden welcher Raum genutzt werden kann und wie 
            viele Sitzplätze unter Berücksichtigung der Abstandsgebote dort 
            eingerichtet werden können.`,
            thanksMessage: `Das Bezirksamt prüft alle Bedarfsmeldungen nach 
            Ablauf der Frist und entscheidet dann über das weitere Vorgehen.`
          }
        }
      }
    }
  }
};
