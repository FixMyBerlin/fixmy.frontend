import XHainSmall from '~/images/gastro/wappen.png';
import XHainLarge from '~/images/gastro/wappen@2x.png';
import { DistrictConfig } from '~/types';

const XHAIN_TERRASSEN_CONFIRMED_AREAS = `mapbox://styles/hejco/cka5ko81y16yk1iqllts8uieg${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

const XHAIN_TERRASSEN_AVAILABLE_AREAS = `mapbox://styles/hejco/ckm3lgekg9jky17rznm5kn8bd${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

const xhain: DistrictConfig = {
  title: 'Friedrichshain-Kreuzberg',
  path: 'friedrichshain-kreuzberg',
  name: 'xhain',
  content: {
    footerLine:
      'Ein Angebot des Bezirksamts Friedrichshain-Kreuzberg von Berlin',
  },
  emblem: {
    small: XHainSmall,
    large: XHainLarge,
  },
  bounds: [
    [13.3651, 52.4658],
    [13.4945, 52.5479],
  ],
  apps: {
    spielstrassen: {
      path: 'spielstrassen',
      supporterGoal: 10,
      shareTitle: 'Melde dich an für temporäre Spielstraßen',
      shareText:
        'Friedrichshain-Kreuzberg richtet temporäre Spielstraßen ein, hier kann man sich melden um eine Spielstraße zu unterstützen. Bitte unterstütze diese Spielstraße, damit das möglich wird:',
      mapboxStyle: 'mapbox://styles/hejco/ck98kjwqi5edx1ip74oyrmxmd',
      streets: [
        {
          street: 'Bänschstraße',
          kiez: 'Samariterviertel',
          region: 'Friedrichshain',
          schedule: 'Sonntags 13-19 Uhr',
          status: 'paused',
        },
        {
          street: 'Richard-Sorge-Straße',
          kiez: 'Richard-Sorge-Viertel',
          region: 'Friedrichshain',
          schedule: 'Sonntags 13-19 Uhr',
          status: 'paused',
        },
        {
          street: 'Gärtnerstraße',
          kiez: 'Boxhagener Platz',
          region: 'Friedrichshain',
          status: 'closed',
        },
        {
          street: 'Krossener Straße / Gabriel-Max-Straße',
          kiez: 'Boxhagener Platz',
          region: 'Friedrichshain',
          status: 'paused',
          schedule: 'Freitags 16-20 Uhr',
        },
        {
          street: 'Lausitzer Platz',
          kiez: 'Lausitzer Platz',
          region: 'Kreuzberg',
          status: 'paused',
          schedule: 'Sonntags 13-19 Uhr',
        },
        {
          street: 'Waldemarstraße',
          kiez: 'Oranienplatz',
          region: 'Kreuzberg',
          status: 'paused',
          schedule: 'Sonntags 15 – 19 (Ferienzeit)',
        },
        {
          street: 'Wassertorstraße',
          kiez: 'Moritzplatz',
          region: 'Kreuzberg',
          status: 'paused',
          schedule: 'Sonntags 13 – 19',
        },
        {
          street: 'Friedrichstraße',
          kiez: 'Mehringplatz',
          region: 'Kreuzberg',
          status: 'closed',
          schedule: 'Sonntags 14 – 17 Uhr (Ferienzeit)',
        },
        {
          street: 'Chamissoplatz',
          kiez: 'Chamissokiez',
          region: 'Kreuzberg',
          schedule:
            'In der Ferienzeit: Sonntags 15–18 Uhr, ab 01.08.: Samstags 11–15 Uhr',
          status: 'closed',
        },
        {
          street: 'Böckstraße',
          kiez: 'Graefekiez',
          region: 'Kreuzberg',
          status: 'paused',
          schedule: 'Mittwochs 14-18 Uhr',
        },
        {
          street: 'Lachmannstraße',
          kiez: 'Graefekiez',
          region: 'Kreuzberg',
          status: 'closed',
        },
        {
          street: 'Lübbener Straße',
          kiez: 'Wrangelkiez',
          region: 'Kreuzberg',
          status: 'paused',
          schedule: 'Ab 9.August Sonntags 13-19 Uhr',
        },
        {
          street: 'Cuvrystraße',
          kiez: 'Wrangelkiez',
          region: 'Kreuzberg',
          status: 'closed',
        },
        {
          street: 'Helmerdingstraße',
          kiez: 'Boxhagener Platz',
          region: 'Friedrichshain',
          status: 'closed',
        },
        {
          street: 'Simplonstraße',
          kiez: 'Boxhagener Platz',
          region: 'Friedrichshain',
          status: 'paused',
          schedule: 'Sonntags 15-19 Uhr (Ferienzeit)',
        },
        {
          street: 'Paul-Lincke-Ufer / Forsterstraße',
          kiez: 'Reichenberger Straße',
          region: 'Kreuzberg',
          status: 'paused',
          schedule: 'Sonntags 15 – 19 Uhr (Ferienzeit)',
        },
        {
          street: 'Lilienthalstraße',
          kiez: 'Chamissokiez',
          region: 'Kreuzberg',
          status: 'closed',
        },
        {
          street: 'Dresdener Straße',
          kiez: 'Oranienplatz',
          region: 'Kreuzberg',
          status: 'paused',
          schedule: 'Sonntags 15-18 Uhr (Ferienzeit)',
        },
        {
          street: 'Rudolfstraße',
          kiez: 'Stralauer Kiez',
          region: 'Friedrichshain',
          status: 'closed',
          schedule: 'Sonntags 15 – 19 Uhr (Ferienzeit)',
        },
        {
          street: 'Liebigstraße',
          kiez: 'Samariterviertel',
          region: 'Friedrichshain',
          status: 'closed',
        },
        {
          street: 'Dieffenbachstraße',
          kiez: 'Graefekiez',
          region: 'Kreuzberg',
          status: 'paused',
          schedule: 'Ab 2.August Sonntags 13-19 Uhr',
        },
      ],
    },
    gastro: {
      currentCampaign: 'xhain2021',
      path: 'terrassen',
      directSignup: true,
      timeline: {
        // date constructor uses 0-based month number, i.e. january is 0
        openSignup: new Date(Date.UTC(2021, 3 - 1, 1)),
        closeSignup: new Date(Date.UTC(2021, 10 - 1, 1)),
      },
      model: {
        category: true,
        opening_hours: false,
      },
      landing: {
        mapboxStyle: XHAIN_TERRASSEN_CONFIRMED_AREAS,
      },
      signup: {
        mapboxStyle: XHAIN_TERRASSEN_AVAILABLE_AREAS,
      },
      registration: {
        mapboxStyle: XHAIN_TERRASSEN_AVAILABLE_AREAS,
      },
    },
  },
};

export default xhain;
