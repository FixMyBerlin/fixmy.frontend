import { DefaultConfig } from '~/types';
import { map } from './apps';
import baseConfig from './base';
import colors from './colors';
import menu from './menu';
import staticpages from './staticpages';
import routes from './routes';

const defaultConfig: DefaultConfig = {
  apps: {
    map,
  },
  colors,
  menu,
  routes,
  staticpages,
  ...baseConfig,
};

export default defaultConfig;
