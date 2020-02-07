import globalConfig from '~/config';
import berlin from './berlin';
import bonn from './bonn';

const defaultConfig = {
  apiRoute: '/reports',
  title: 'Meldedialog für Fahrradbügel',
  dialog: {
    imageResizeOptions: {
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.9
    }
  }
};

let instanceConfig = {};
if (globalConfig.region === 'bonn') {
  instanceConfig = bonn;
} else {
  instanceConfig = berlin;
}

export default {
  ...globalConfig,
  reports: {
    ...defaultConfig,
    ...instanceConfig
  }
};
