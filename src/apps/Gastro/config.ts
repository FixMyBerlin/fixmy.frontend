import globalConfig from '~/config';

const FMB_XHAIN_TERASSEN = `mapbox://styles/hejco/cka5ko81y16yk1iqllts8uieg?fresh=true`;

const config = {
  ...globalConfig,
  gastro: {
    campaign: 'xhain',
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
  }
};

export default config;
