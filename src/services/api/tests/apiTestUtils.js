import config from '~/config';

export const compileAbsoluteRoute = (relativeURL) =>
  relativeURL
    ? `${config.apiUrl.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`
    : config.apiUrl;
export const delayResponse = (response, after = 500) => () =>
  new Promise((resolve) => setTimeout(resolve, after)).then(() => response);
