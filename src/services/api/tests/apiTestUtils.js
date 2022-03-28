import config from '~/config';

export const compileAbsoluteRoute = (relativeURL) =>
  relativeURL
    ? `${config.apiUrl.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`
    : config.apiUrl;
