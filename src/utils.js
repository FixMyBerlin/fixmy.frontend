import Store from '~/redux/store';

export async function getGeoLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, reject);
    } else {
      reject();
    }
  });
}

export function numberFormat(num) {
  return parseFloat(num).toFixed(1).toString().replace('.', ',');
}

export function arrayIsEqual(arrayA, arrayB) {
  return arrayA.length === arrayB.length && arrayA.every((item, i) => item === arrayB[i]);
}

export function trackEvent(category = '', action = '', name = '') {
  if (typeof _paq !== 'undefined') {
    _paq.push(['trackEvent', category, action, name]);
  }
}

export function getHBIbyProps(props, sideKey) {
  const hbiValues = Store.getState().UserState.hbi_values;
  const rv = (hbiValues[0] - 5) / 10;
  const rs = (hbiValues[1] - 5) / 10;

  return ((+props[`${sideKey}_safety`] - rs) * 1.6) + ((+props[`${sideKey}_velocity`] - rv) * 0.5);
}

export function getHBIColorByIndex(index) {
  const stop = config.hbiStops.find(s => index >= s.min && index <= s.max);
  return stop ? stop.color : '#555';
}

export function log(stuff) {
  if (!config.debug) {
    return false;
  }

  return console.log(stuff);
}

export default {
  getGeoLocation,
  numberFormat,
  arrayIsEqual,
  trackEvent,
  getHBIbyProps,
  getHBIColorByIndex,
  log
};
