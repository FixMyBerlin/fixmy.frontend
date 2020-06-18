import globalConfig from '~/config';
import xhain from './xhain';
import tempelberg from './tempelberg';

const FMB_XHAIN_TERASSEN = `mapbox://styles/hejco/cka5ko81y16yk1iqllts8uieg?fresh=true`;

const defaultConfig = {
  campaign: '<unnamed_campaign>',
  email: 'info@fixmyberlin.de',
  map: {
    style: FMB_XHAIN_TERASSEN,
    bounds: [
      [13.3651, 52.4658],
      [13.4945, 52.5479]
    ]
  },
  routes: {
    landing: '/',
    signup: '/anmeldung',
    thanks: '/danke',
    registration: '/registrierung/:id/:accessKey',
    registrationThanks: '/registrierung/danke',
    directory: '/verzeichnis/',
    directoryEntry: '/verzeichnis/:id',
    permit: '/verzeichnis/:id/genehmigung',
    trafficOrder: '/verzeichnis/:id/anordnung'
  }
};

const gastro = {
  xhain: {
    ...defaultConfig,
    ...xhain
  },
  tempelberg: {
    ...defaultConfig,
    ...tempelberg
  }
};

export default {
  ...globalConfig,
  gastro
};
