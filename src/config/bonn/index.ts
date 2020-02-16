import map from './map';
import menu from './menu';
import routes from './routes';

const apiEndpoints = {
  dev: 'http://localhost:8000/api',
  staging: 'https://elegant-hugle-53926c.netlify.com/api/bonn/next'
};

export default {
  map,
  menu,
  routes,
  siteTitle: 'FixMyBonn',
  apiUrl:
    process.env.API_URL ||
    apiEndpoints[process.env.CONFIG_ENV] ||
    apiEndpoints.staging
};
