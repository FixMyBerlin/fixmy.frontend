import globalConfig from '~/config';

import xhain from './xhain';

const DEFAULT_MAP_STYLE_XHAIN = `mapbox://styles/hejco/cka5ko81y16yk1iqllts8uieg?fresh=true`;

const defaultConfig = {
  email: 'info@fixmyberlin.de',
  map: {
    style: DEFAULT_MAP_STYLE_XHAIN,
    bounds: [
      [13.3651, 52.4658],
      [13.4945, 52.5479],
    ],
  },
  routes: {
    landing: '/',
    signup: '/anmeldung',
    signupEvents: '/anmeldung-veranstaltungen',
    thanks: '/danke',
    registration: '/registrierung/:id/:accessKey',
    registrationThanks: '/registrierung/danke',
    renewal: '/folgeantrag/:id/:accessKey',
    directory: '/verzeichnis/',
    directoryEntry: '/verzeichnis/:id',
    permit: '/verzeichnis/:id/genehmigung',
    trafficOrder: '/verzeichnis/:id/anordnung',
    permitEvents: '/veranstaltungen/:id/genehmigung',
    trafficOrderEvents: '/veranstaltungen/:id/anordnung',
  },
};

const gastro = {
  xhain: {
    ...defaultConfig,
    ...xhain,
  },
};

export default {
  ...globalConfig,
  gastro,
};
