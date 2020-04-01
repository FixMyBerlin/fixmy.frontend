const apiEndpoints = {
  local: 'http://localhost:8000/api',
  staging: 'https://fixmyberlin-staging.netlify.com/api/next',
  production: 'https://fixmyberlin.de/api/v1'
};

const baseConfig = {
  devUrl: 'http://localhost:8080',
  prodUrl: 'https://fixmyberlin.de',
  newsletterWidgetUrl: 'https://app.mailjet.com/widget/iframe/2YIa/6kW',
  tspKatasterURL: 'https://interaktiv.tagesspiegel.de/lab/strassencheck/',
  apiUrl:
    process.env.API_URL ||
    apiEndpoints[process.env.BACKEND] ||
    apiEndpoints.production,
  feedbackMail: 'feedback@fixmyberlin.de',
  siteTitle: 'FixMyBerlin',
  titleFont: 'Roboto Slab',
  logger: 'fmc*', // selects logging namespaces to display when not in production
  sectionIsBeta: true,
  planningIsBeta: true,
  offlineMode: false,
  isSwitchEnabled: true,
  debug: process.env.NODE_ENV !== 'production',
  showLikeButton: true,
  showFeedBackForm: false,
  piwik: {
    url: 's.fixmycity.de',
    siteId: {
      berlin: 1,
      aachen: 4
    },
    options: {
      enableLinkTracking: true,
      trackErrors: true,
      disableCookies: true
    }
  }
};

if (!process.env.BACKEND && process.env.API_URL == null) {
  // need to use console here to avoid circular import when
  // logging helper imports this file
  // eslint-disable-next-line no-console
  console.warn(
    'No BACKEND env var defined. Using production backend by default.'
  );
}

export default baseConfig;
