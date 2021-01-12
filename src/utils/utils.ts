import logger from '~/utils/logger';

export function numberFormat(num: number, decimals = 0, locale: string = 'de') {
  if (num == null) return '';

  return Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Returns localized string from number, using one max fractional digit
 *
 * @param num value to format
 * @param locale optional locale code
 */
export function percentageFormat(num: number, locale: string = 'de') {
  if (num == null) return '';

  return Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num);
}

export function isNumeric(val: any) {
  return !Number.isNaN(val) && Number.isFinite(val);
}

export function sortByKey(key = 'id', sortDirection: 'ASC' | any = 'ASC') {
  const isAsc = sortDirection === 'ASC';
  return (a, b) => {
    // Always sort undefined values to come last
    if (a[key] == null) return 1;
    if (b[key] == null) return -1;

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
  if (length === 0) {
    logger(`Project #${id} has no length`);
    return null;
  }
  if (isBisided) {
    return length * 2.0;
  }
  return length;
}

export const isTouch = 'ontouchstart' in window;

/**
 *
 * @param district configuration for the current district
 * @param app name of the app
 */
export const getAppPath = (
  district: { path: string; apps: { [app: string]: { path: string } } },
  app: string
) => `/${district.path}/${district.apps[app].path}`;
