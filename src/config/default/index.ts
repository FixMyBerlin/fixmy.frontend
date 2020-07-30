import { DefaultConfig } from '~/types';
import baseConfig from './base';
import colors from './colors';
import map from './map';
import menu from './menu';
import staticpages from './staticpages';
import routes from './routes';

const defaultConfig: DefaultConfig = {
  colors,
  map,
  menu,
  routes,
  staticpages,
  ...baseConfig
};

export default defaultConfig;
