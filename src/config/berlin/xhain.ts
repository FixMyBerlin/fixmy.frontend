import XHainSmall from '~/images/gastro/wappen.png';
import XHainLarge from '~/images/gastro/wappen@2x.png';
import { DistrictConfig } from '~/types';

const XHAIN_TERRASSEN_MAPBOX_STYLE = `mapbox://styles/hejco/ckm3lgekg9jky17rznm5kn8bd${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

// Ensure, that only on Live system it's true
// On staging it should be false
const isNetlifyProduction = process.env.CONTEXT === 'production';

const xhain: DistrictConfig = {
  title: 'Friedrichshain-Kreuzberg',
  path: 'friedrichshain-kreuzberg',
  name: 'xhain',
  content: {
    footerLink:
      'https://www.berlin.de/ba-friedrichshain-kreuzberg/politik-und-verwaltung/aemter/strassen-und-gruenflaechenamt/',
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
      supporterGoal: 0,
      shareTitle: 'Melde dich an für temporäre Spielstraßen',
      shareText:
        'Friedrichshain-Kreuzberg richtet temporäre Spielstraßen ein, hier kann man sich melden um eine Spielstraße zu unterstützen. Bitte unterstütze diese Spielstraße, damit das möglich wird:',
      mapboxStyle: 'mapbox://styles/hejco/ck98kjwqi5edx1ip74oyrmxmd',
      streets: [
        {
          street: 'Bänschstraße',
          kiez: 'Samariterviertel',
          region: 'Friedrichshain',
          schedule:
            'Sonntags 15 - 18h, Juni - August (Pause in den Sommerferien)',
          status: 'open',
        },
        {
          street: 'Richard-Sorge-Straße',
          kiez: 'Richard-Sorge-Viertel',
          region: 'Friedrichshain',
          schedule:
            'Sonntags 14 – 18 Uhr, Mai - September (Pause in den Sommerferien)',
          status: 'open',
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
          status: 'closed',
          schedule: 'Freitags 16-20 Uhr',
        },
        {
          street: 'Lausitzer Platz',
          kiez: 'Lausitzer Platz',
          region: 'Kreuzberg',
          status: 'closed',
          schedule: 'Sonntags 13-19 Uhr',
        },
        {
          street: 'Waldemarstraße',
          kiez: 'Oranienplatz',
          region: 'Kreuzberg',
          status: 'closed',
          schedule: 'Sonntags 15 – 19 Uhr',
        },
        {
          street: 'Wassertorstraße',
          kiez: 'Moritzplatz',
          region: 'Kreuzberg',
          status: 'closed',
          schedule: 'Sonntags 13 – 19 Uhr',
        },
        {
          street: 'Friedrichstraße',
          kiez: 'Mehringplatz',
          region: 'Kreuzberg',
          status: 'open',
          schedule: 'einmalig am Samstag, 22.4.2023, 9-19 Uhr',
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
          street: 'Böckhstraße',
          kiez: 'Graefekiez',
          region: 'Kreuzberg',
          status: 'open',
          schedule: 'Mittwochs 14 - 18 Uhr, April - September',
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
          status: 'closed',
          schedule: 'Ab 9.August Sonntags 13-19 Uhr',
        },
        {
          street: 'Cuvrystraße',
          kiez: 'Wrangelkiez',
          region: 'Kreuzberg',
          status: 'closed',
        },
        {
          street: 'Wrangelstraße',
          kiez: 'Wrangelkiez',
          region: 'Kreuzberg',
          status: 'open',
          schedule: '26.5. – 14.7.2023 und 1.9. – 22.9.2023',
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
          status: 'open',
          schedule:
            'Mittwochs 15.30 – 18.30 Uhr, Mai – September (Pause in den Sommerferien)',
        },
        {
          street: 'Forsterstraße',
          kiez: 'Reichenberger Straße',
          region: 'Kreuzberg',
          status: 'open',
          schedule: 'Sonntags 14 – 18 Uhr, Juni-September (außer Sommerferien)',
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
          status: 'open',
          schedule:
            'Freitags 15 – 18 Uhr, Mai - September (Pause in den Sommerferien)',
        },
        {
          street: 'Rudolfstraße',
          kiez: 'Stralauer Kiez',
          region: 'Friedrichshain',
          status: 'closed',
          schedule: 'Sonntags 15 – 19 Uhr',
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
          status: 'closed',
          schedule: 'Ab 2.August Sonntags 13-19 Uhr',
        },
        {
          street: 'Jessnerstraße',
          kiez: 'Traveplatz',
          region: 'Friedrichshain',
          status: 'open',
          schedule: 'Dienstags, 15.30-18.30 Uhr, 6. - 27. Juni 2023',
        },
        {
          street: 'Niederbarnimstraße',
          kiez: 'Traveplatz',
          region: 'Friedrichshain',
          status: 'open',
          schedule:
            'Freitags, 15-19 Uhr, 16.6. - 28.7.2023 und 1.9. - 22.9.2023',
        },
      ],
    },
    gastro: {
      currentCampaign: 'xhain2022',
      path: 'terrassen',
      // Allow making applications without having signed up for
      // 'expression of interest'
      directSignup: true,
      timeline: {
        // date constructor uses 0-based month number, i.e. january is 0
        openSignup: isNetlifyProduction
          ? new Date(Date.UTC(2022, 3 - 1, 14))
          : new Date(Date.UTC(2022, 2 - 1, 1)),
        closeSignup: isNetlifyProduction
          ? new Date(Date.UTC(2022, 5 - 1, 15))
          : new Date(Date.UTC(2022, 12 - 1, 31)),
        permitEnd: new Date(Date.UTC(2022, 10 - 1, 31)),
      },
      model: {
        category: true,
        opening_hours: false,
      },
      layerSets: {
        parks: [
          'TER-Eventareas-Xhain',
          'TER-Eventareas-Xhain-name',
          'TER-Eventareas-Xhain-line',
        ],
        parking: ['TER-Parking-Xhain', 'TER-Parking-Xhain-line'],
        acceptedApplications: [
          'TER-Event-Terrassen-Xhain-name',
          'TER-Event-Terrassen-Xhain-area',
          'TER-Gastro-Terrassen-Xhain-name',
        ],
        cadastre: [
          'kat-bollards',
          'kat-tactile_indicator',
          'kat-lines',
          'kat-curb-sidewalk-hatch',
          'kat-curb-sidewalk',
          'kat-curb-mainpolygons',
          'kat-curb-extra-polygons',
          'kat-roadway-hatch',
          'kat-roadway',
        ],
      },
      maps: {
        landing: {
          mapboxStyle: XHAIN_TERRASSEN_MAPBOX_STYLE,
          layerSets: ['acceptedApplications'],
        },
        gastroSignup: {
          mapboxStyle: XHAIN_TERRASSEN_MAPBOX_STYLE,
          layerSets: [],
        },
        gastroRegistration: {
          mapboxStyle: XHAIN_TERRASSEN_MAPBOX_STYLE,
          layerSets: [],
        },
        eventForm: {
          mapboxStyle: XHAIN_TERRASSEN_MAPBOX_STYLE,
          layerSets: ['parks'],
        },
      },
    },
  },
};

export default xhain;
