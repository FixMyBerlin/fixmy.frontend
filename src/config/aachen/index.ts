import map from './map';
import menu from './menu';
import routes from './routes';

import defaultColors from '~/config/default/colors';

const apiEndpoints = {
  local: 'http://localhost:8000/api',
  staging: 'https://fixmyaachen-staging.netlify.com/api/aachen/next',
  production: 'https://fixmyaachen.netlify.com/api/aachen/v1'
};

export default {
  map,
  menu,
  routes,
  siteTitle: 'Radbügel für Aachen',
  feedbackMail: 'radbuegel@aachen.de',
  apiUrl:
    process.env.API_URL ||
    apiEndpoints[process.env.BACKEND] ||
    apiEndpoints.staging,
  colors: {
    ...defaultColors,
    interaction: '#6E9BD2'
  }
};
