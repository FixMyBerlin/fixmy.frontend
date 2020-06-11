// Return true if usage for the signup's category is allowed on week days
const usageWeekday = ({ category }) =>
  ['retail', 'workshop'].includes(category);

// Return true if usage for the signup's category is allowed on weekends
const usageWeekend = ({ category }) =>
  ['restaurant', 'social', 'other'].includes(category);

/**
 * Return true if the given regulation requires applications to
 * draw a requested area for their application
 *
 * @param zone Text description of a regulation
 */
const requiresArea = (zone: string) =>
  [
    'Parkplatz',
    'Gehweg',
    'Parken längs',
    'Parken quer',
    'Parken diagonal',
    'Sonstige'
  ].includes(zone);

/** Return a description of the category given an application */
const getCategoryDescription = (application: any) => {
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

export { usageWeekday, usageWeekend, requiresArea, getCategoryDescription };
