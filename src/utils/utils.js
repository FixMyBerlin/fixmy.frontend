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

export default {
  numberFormat,
  trackEvent,
  log,
  byKey,
  sortByKey
};
