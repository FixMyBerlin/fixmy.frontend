import globalConfig from '~/config';
import berlin from './berlin';
import aachen from './aachen';

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

const instanceConfig = globalConfig.region === 'aachen' ? aachen : berlin;

const reportsConfig = {
  ...globalConfig,
  reports: {
    ...defaultConfig,
    ...instanceConfig
  }
};

export default reportsConfig;
