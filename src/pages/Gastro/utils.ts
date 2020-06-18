// Return true if usage for the signup's category is allowed on week days
export const usageWeekday = ({ category }) =>
  ['retail', 'workshop', 'social', 'other'].includes(category);

// Return true if usage for the signup's category is allowed on weekends
export const usageWeekend = ({ category }) => ['restaurant'].includes(category);

/**
 * Return true if the given regulation requires applications to
 * draw a requested area for their application
 *
 * @param zone Text description of a regulation
 */
export const requiresArea = (zone: string) =>
  [
    'Parkplatz',
    'Gehweg',
    'Parken längs',
    'Parken quer',
    'Parken diagonal',
    'Sonstige'
  ].includes(zone);

/** Return a description of the category given an application */
export const getCategoryDescription = (application: any) => {
  let categoryDescription = null;
  switch (application.category) {
    case 'restaurant':
      categoryDescription =
        'Herausstellen von Tischen & Stühlen für Schankzwecke';
      break;
    case 'retail':
      categoryDescription = 'Herausstellen von Waren';
      break;
    case 'workshop':
      categoryDescription = 'Ausführen von Dienstleistungen';
      break;
    default:
      categoryDescription = application.usage;
      break;
  }
  return categoryDescription;
};

// eslint-disable-next-line camelcase
export const dateReceived = ({ application_received }) =>
  new Date(application_received).toLocaleDateString('de-DE');

// eslint-disable-next-line camelcase
export const dateDecided = ({ application_decided }) =>
  new Date(application_decided).toLocaleDateString('de-DE');

export const isBoardwalk = ({ regulation }) => regulation === 10;

export enum REGULATION {
  'Parkplatz' = 0,
  'Zone1' = 1,
  'Zone2' = 2,
  'Zone3' = 3,
  'Zone4' = 4,
  'Zone5' = 5,
  'Zone6' = 6,
  'Zone7' = 7,
  'Zone8' = 8,
  'Zone9' = 9,
  'Gehweg' = 10,
  'ParkenLängs' = 11,
  'ParkenQuer' = 12,
  'ParkenDiagonal' = 13,
  'Sonstige' = 14
}
