const config = {
  devUrl: 'http://localhost:8080',
  prodUrl: 'https://fixmyberlin.de',
  newsletterWidgetUrl: 'https://app.mailjet.com/widget/iframe/2YIa/6kW',
  api: {
    dev: 'http://localhost:8000/api',
    staging: 'https://fixmyplatform-develop.herokuapp.com/api',
    production: 'https://api.fixmyberlin.de/api'
  },
  feedbackMail: 'feedback@fixmyberlin.de',
  colors: {
    lightbg: '#f5f5f5',
    lightgrey: '#e8e8e8',
    inactivegrey: '#cccccc',
    midgrey: '#9b9b9b',
    darkgrey: '#545454',
    darkbg: '#353535',
    black: '#0f0f0f',
    white: '#FFF',
    interaction: '#fabe28',
    change_4: '#910055',
    index: '#ff650c',
    error: '#FF5050',
    likebg: '#FFF9EC',
    katasterHighlight: '#fabe28'
  },
  menu: {
    size: 325,
    profileLabel: 'Zum Profil',
    loginLabel: 'Login',
    items: [
      {
        type: 'link',
        label: 'Planungen für den Radverkehr',
        link: '/planungen',
        icon: 'map',
        border: true
      },
      {
        type: 'link',
        label: 'Happy-Bike-Index (beta)',
        link: '/zustand',
        icon: 'hbi-icon',
        border: true
      },
      {
        type: 'link',
        label: 'Radbügel in X-Hain (Meldungen nicht mehr möglich)',
        icon: 'fixhere',
        link: '/meldungen/radbuegel/friedrichshain-kreuzberg/karte',
        border: true
      },
      {
        type: 'link',
        label: 'Analyse Planungen',
        link: '/analyse/planungen',
        icon: 'analysis',
        border: false
      },
      {
        type: 'separator',
        label: 'Weiteres'
      },
      {
        type: 'link',
        label: 'Über FixMyBerlin',
        link: '/info',
        icon: 'info',
        border: true
      },
      {
        type: 'link',
        label: 'FAQ',
        link: '/faq',
        icon: 'question',
        border: true
      },
      {
        type: 'link',
        label: 'API',
        link: '/api',
        icon: 'api',
        border: false
      }
    ],
    footeritems: [
      {
        label: 'Presse',
        link: '/presse'
      },
      {
        label: 'Impressum',
        link: '/impressum'
      },
      {
        label: 'Datenschutz',
        link: '/datenschutz'
      }
    ]
  },
  staticpages: [
    {
      key: 'about',
      route: '/info'
    },
    {
      key: 'contact',
      route: '/kontakt'
    },
    {
      key: 'privacy',
      route: '/datenschutz'
    },
    {
      key: 'imprint',
      route: '/impressum'
    },
    {
      key: 'press',
      route: '/presse'
    },
    {
      key: 'faq',
      route: '/faq'
    },
    {
      key: 'api',
      route: '/api'
    },
    {
      key: 'jobs',
      route: '/jobs'
    },
    {
      key: 'newsletter-thank-you',
      route: '/newsletter-danke'
    }
  ],
  routes: {
    projects: '/planungen',
    status: '/zustand',
    analyse: '/analyse',
    reports: {
      temporarily_forward_from_this_to_index: '/meldungen',
      index: '/meldungen/radbuegel/friedrichshain-kreuzberg',
      landing: '/meldungen/radbuegel/friedrichshain-kreuzberg/landing',
      map: '/meldungen/radbuegel/friedrichshain-kreuzberg/karte',
      new: '/meldungen/radbuegel/friedrichshain-kreuzberg/neu'
    },
    katasterKI: {
      landing: process.env.KATASTER_PATH || '/',
      landingNational: '/de',
      profileBase: `${process.env.KATASTER_PATH}/profil`,
      profile: `${process.env.KATASTER_PATH}/profil/:page`,
      scenesBase: `${process.env.KATASTER_PATH}/szenen`,
      scenes: `${process.env.KATASTER_PATH}/szenen/:page`,
      share: `${process.env.KATASTER_PATH}/teilen`,
      feedback: `${process.env.KATASTER_PATH}/auswertung`,
      iframe: `${process.env.KATASTER_PATH}/iFrame-test`,
      email: `${process.env.KATASTER_PATH}/email`
    },
    signup: '/registrieren',
    login: '/anmelden',
    forgotPassword: '/passwort-vergessen',
    resetPassword: '/reset',
    emailVerification: '/email-verification',
    profile: '/profil',
    userVerify: '/bestaetigen'
  },
  piwik: {
    siteId: {
      main: 1,
      kataster: 2,
      katasterTesting: 3
    }
  },
  hbi: [
    { label: 'Geschwindgkeit', type: 'speed', value: 5, min: 0, max: 10 },
    { label: 'Sicherheit', type: 'security', value: 5, min: 0, max: 10 }
  ],
  hbiStops: [
    {
      min: 0,
      max: 2.5,
      color: 'hsl(22, 100%, 52%)',
      label: 'sehr schlecht',
      image: 'sehrgefaehrlich@2x.png'
    },
    {
      min: 2.5,
      max: 5,
      color: 'hsl(14, 83%, 74%)',
      label: 'schlecht',
      image: 'gefaehrlich@2x.png'
    },
    {
      min: 5,
      max: 7.5,
      color: '#a0ebe3',
      label: 'ok',
      image: 'ok@2x.png'
    },
    {
      min: 7.5,
      max: 100,
      color: 'hsl(174, 87%, 43%)',
      label: 'super',
      image: 'sehrgut@2x.png'
    }
  ],
  planningPhases: [
    {
      id: 'draft',
      color: '#fa96d0',
      icon: 'konzept.svg',
      name: 'Konzept'
    },
    {
      id: 'planning',
      color: '#cf0a7d',
      icon: 'planung.svg',
      name: 'Planung'
    },
    {
      id: 'execution',
      color: '#910055',
      icon: 'bau.svg',
      name: 'im Bau'
    },
    {
      id: 'ready',
      color: '#0f0f0f',
      icon: 'fertig.svg',
      name: 'Fertig'
    }
  ],
  map: {
    accessToken:
      'pk.eyJ1IjoiaGVqY28iLCJhIjoiY2piZjd2bzk2MnVsMjJybGxwOWhkbWxpNCJ9.L1UNUPutVJHWjSmqoN4h7Q',
    style: 'mapbox://styles/hejco/ck0nzclbk0ey01ct9ilwefpzc',
    view: {
      zoom: 12,
      bearing: 0,
      pitch: 0,
      center: [13.415669, 52.513219],
      show3dBuildings: false,
      animate: false,
      dim: false
    },
    layers: {
      projects: {
        center: 'fmb-projects-center',
        side0: 'fmb-projects-side-0',
        side1: 'fmb-projects-side-1',
        overlayLine: 'fmb-projects-overlay-line '
      },
      hbi: {
        center: 'fmb-HBI-center',
        side0: 'fmb-HBI-side-0',
        side1: 'fmb-HBI-side-1',
        overlayLine: 'fmb-HBI-overlay-line',
        intersections: 'fmb-HBI-intersections',
        intersectionsSide0: 'fmb-HBI-intersections-side-0',
        intersectionsSide1: 'fmb-HBI-intersections-side-1',
        intersectionsOverlay: 'fmb-HBI-intersections-overlay-line'
      },
      buildings3d: '3d-buildings',
      dimmingLayer: 'fmb-dimming'
    },
    zoomAfterGeocode: 15,
    geocoderUrl: 'https://geocoder.cit.api.here.com/6.2/geocode.json',
    geocoderAppId: 'WOhEXnd20kbhT8Lxx4n4',
    geocoderAppCode: 'uFkDYK0WKXBPZgG8mRb9Rg',
    geocoderBounds: '13.3651,52.4658,13.4945,52.5479',
    dimmingOpacity: 0.3,
    bounds: [[13.2826, 52.4615], [13.46391, 52.5544374]]
  },
  katasterKI: {
    zipcodeDistricts: {
      '10247': ['Friedrichshain-Kreuzberg', 'Pankow'],
      '10249': ['Friedrichshain-Kreuzberg', 'Pankow'],
      '10435': ['Mitte', 'Pankow'],
      '10777': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf'],
      '10779': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf'],
      '10785': ['Friedrichshain-Kreuzberg', 'Tempelhof-Schöneberg', 'Mitte'],
      '10787': ['Charlottenburg-Wilmersdorf', 'Tempelhof-Schöneberg', 'Mitte'],
      '10789': ['Charlottenburg-Wilmersdorf', 'Tempelhof-Schöneberg'],
      '10825': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf'],
      '10827': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf'],
      '10963': ['Friedrichshain-Kreuzberg', 'Mitte'],
      '10965': ['Friedrichshain-Kreuzberg', 'Neukölln', 'Tempelhof-Schöneberg'],
      '10967': ['Friedrichshain-Kreuzberg', 'Neukölln'],
      '12099': ['Neukölln', 'Tempelhof-Schöneberg', 'Neukölln'],
      '12107': ['Neukölln', 'Tempelhof-Schöneberg'],
      '12157': ['Tempelhof-Schöneberg', 'Steglitz-Zehlendorf'],
      '12161': ['Tempelhof-Schöneberg', 'Steglitz-Zehlendorf'],
      '12163': ['Tempelhof-Schöneberg', 'Steglitz-Zehlendorf'],
      '12279': ['Steglitz-Zehlendorf', 'Tempelhof-Schöneberg'],
      '12305': ['Neukölln', 'Tempelhof-Schöneberg'],
      '12435': ['Treptow-Köpenick', 'Neukölln'],
      '13088': ['Lichtenberg', 'Pankow'],
      '13353': ['Charlottenburg-Wilmersdorf', 'Mitte'],
      '13405': ['Reinickendorf', 'Mitte'],
      '13407': ['Reinickendorf', 'Mitte'],
      '13409': ['Reinickendorf', 'Mitte'],
      '13597': ['Charlottenburg-Wilmersdorf', 'Spandau'],
      '13599': ['Spandau', 'Reinickendorf'],
      '13627': ['Charlottenburg-Wilmersdorf', 'Spandau'],
      '13629': ['Charlottenburg-Wilmersdorf', 'Spandau', 'Reinickendorf'],
      '14193': ['Steglitz-Zehlendorf', 'Charlottenburg-Wilmersdorf'],
      '14195': ['Steglitz-Zehlendorf', 'Charlottenburg-Wilmersdorf'],
      '14197': ['Tempelhof-Schöneberg', 'Charlottenburg-Wilmersdorf']
    },
    buttonTimeout: 300,
    projectId: '01',
    // this is the article link for the landing page and feedback page
    tspArticleLink: 'https://interaktiv.tagesspiegel.de/lab/strassencheck/',
    tspNewsletterLink: 'https://www.tagesspiegel.de/newsletter/',
    shareUrl: 'https://interaktiv.tagesspiegel.de/strassencheck/',
    shareTitle: 'Umfrage Share Title',
    shareText:
      'Wie können die Straßen sicher für alle werden? Tolle Umfrage von @FixMyBerlin und @tagesspiegel, bitte teilnehmen!'
  },
  reports: {
    apiRoute: '/reports',
    dialog: {
      imageResizeOptions: {
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.9
      }
    },
    overviewMap: {
      style: 'mapbox://styles/hejco/cjpnt0cc41ipy2rlpu19jgt7a',
      bounds: [[13.3651, 52.4658], [13.4945, 52.5479]],
      maxBounds: [[13.2, 52.4158], [13.6, 52.5979]]
    },
    locateMeMap: {
      zoomOnGeocodedLocation: 15.5,
      boundaryGeodataUrl: '/data/Fhain-Xberg-trimmed.json',
      outofBoundaryText:
        'Diese Adresse liegt außerhalb Friedrichshain-Kreuzbergs',
      reverseGeocoderUrl:
        'https://api.mapbox.com/geocoding/v5/mapbox.places/{long},{lat}.json',
      paddingInDegree: 0.1,
      geocoder: {
        debounceTime: 1000,
        searchStringMinLength: 3
      }
    }
  },
  sectionIsBeta: true,
  planningIsBeta: true,
  offlineMode: false,
  isSwitchEnabled: true,
  debug: process.env.NODE_ENV !== 'production',
  showLikeButton: true,
  showFeedBackForm: false
};

config.apiUrl = config.api[process.env.CONFIG_ENV] || config.api.production;

if (!process.env.CONFIG_ENV) {
  console.warn('No CONFIG_ENV defined. Using production API by default.');
}

module.exports = config;
