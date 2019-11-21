import { formatDefaultLocale } from 'd3-format';

const germanNumberFormat = formatDefaultLocale({
  decimal: ',',
  thousands: '.',
  grouping: [3],
  currency: ['€', '']
});

export function numberFormat(num, decimals = 0) {
  if (typeof num === 'undefined') {
    return '';
  }

  return germanNumberFormat.format(`,.${decimals}f`)(num);
}

export function percentageFormat(num) {
  if (typeof num === 'undefined') {
    return '';
  }

  return germanNumberFormat.format('~%')(num);
}

export function isNumeric(val) {
  return !Number.isNaN(val) && Number.isFinite(val);
}

export function trackEvent(category = '', action = '', name = '') {
  if (typeof _paq !== 'undefined') {
    _paq.push(['trackEvent', category, action, name]);
  }
}

export function log(stuff) {
  if (!config.debug) {
    return false;
  }

  return console.log(stuff);
}

export function byKey(arr = [], key = 'id') {
  return arr.reduce((res, item) => {
    res[item[key]] = item;
    return res;
  }, {});
}

export function sortByKey(key = 'id', sortDirection = 'ASC') {
  const isAsc = sortDirection === 'ASC';
  return (a, b) => {
    if (a[key] < b[key]) {
      return isAsc ? -1 : 1;
    }

    if (a[key] > b[key]) {
      return isAsc ? 1 : -1;
    }

    return 0;
  };
}

export function getParameterByName(name) {
  const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/**
 * Return the length of a project's RVA.
 *
 * This is defined as the length of the project's geometry if the project is
 * one-sided or twice that length if the new bike infrastructure runs along
 * both sides of the geometry.
 */
export function getRVALength({ length, side, id }) {
  const isBisided = side === 2;
  if (length == 0) {
    if (config.debug) console.error(`Project #${id} has no length`);
    return null;
  }
  if (isBisided) {
    return length * 2.0;
  } else {
    return length;
  }
}

export default {
  numberFormat,
  trackEvent,
  log,
  byKey,
  sortByKey,
  isNumeric,
  getParameterByName,
  getRVALength
};
