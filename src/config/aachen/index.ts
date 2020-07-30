import map from './map';
import menu from './menu';
import routes from './routes';
import staticpages from './staticpages';

import defaultColors from '~/config/default/colors';
import { RegionConfig } from '~/types';

const apiEndpoints = {
  local: 'http://localhost:8000/api',
  staging: 'https://fixmyaachen-staging.netlify.app/api/aachen/next',
  production: 'https://radbuegel-aachen.de/api/aachen/v1'
};

const aachenConfig: RegionConfig = {
  map,
  menu,
  routes,
  staticpages,
  siteTitle: 'Radbügel für Aachen',
  apiUrl:
    process.env.API_URL ||
    apiEndpoints[process.env.BACKEND] ||
    apiEndpoints.staging,
  colors: {
    ...defaultColors,
    likebg: 'initial',
    interaction: '#6E9BD2'
  },
  titleFont: 'The Mix',
  baseFont: 'Arial'
};

export default aachenConfig;
