import map from './map';
import menu from './menu';
import routes from './routes';

const apiEndpoints = {
  local: 'http://localhost:8000/api',
  staging: 'https://fixmyaachen-staging.netlify.com/api/aachen/next',
  production: 'https://fixmyaachen.netlify.com/api/aachen/v1'
};

export default {
  map,
  menu,
  routes,
  siteTitle: 'FixMyAachen',
  apiUrl:
    process.env.API_URL ||
    apiEndpoints[process.env.CONFIG_ENV] ||
    apiEndpoints.staging
};
