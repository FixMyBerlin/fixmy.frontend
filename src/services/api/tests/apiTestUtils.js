import config from '~/config';

export const compileAbsoluteRoute = (relativeURL) =>
  relativeURL
    ? `${config.apiUrl.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`
    : config.apiUrl;
export const printError = (value) => JSON.stringify(value, null, 2);
export const delayResponse = (response, after = 500) => () =>
  new Promise((resolve) => setTimeout(resolve, after)).then(() => response);
