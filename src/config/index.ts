import colors from './colors';
import map from './map';
import menu from './menu';
import staticpages from './staticpages';
import routes from './routes';

const apiEndpoints = {
  dev: 'http://localhost:8000/api',
  staging: 'https://fixmyberlin.de/api/next/',
  production: 'https://fixmyberlin.de/api/v1/'
};

const baseConfig = {
  devUrl: 'http://localhost:8080',
  prodUrl: 'https://fixmyberlin.de',
  newsletterWidgetUrl: 'https://app.mailjet.com/widget/iframe/2YIa/6kW',
  tspKatasterURL: 'https://interaktiv.tagesspiegel.de/lab/strassencheck/',
  apiUrl: apiEndpoints[process.env.CONFIG_ENV] || apiEndpoints.production,
  feedbackMail: 'feedback@fixmyberlin.de',
  logger: 'fmc*', // selects logging namespaces to display when not in production
  sectionIsBeta: true,
  planningIsBeta: true,
  offlineMode: false,
  isSwitchEnabled: true,
  debug: process.env.NODE_ENV !== 'production',
  showLikeButton: true,
  showFeedBackForm: false,
  piwik: {
    siteId: {
      main: 1,
      kataster: 2,
      katasterTesting: 3
    }
  }
};

if (!process.env.CONFIG_ENV) {
  // need to use console here to avoid circular import when
  // logging helper imports this file
  // eslint-disable-next-line no-console
  console.warn('No CONFIG_ENV defined. Using production API by default.');
}

export default {
  colors,
  map,
  menu,
  routes,
  staticpages,
  ...baseConfig
};
