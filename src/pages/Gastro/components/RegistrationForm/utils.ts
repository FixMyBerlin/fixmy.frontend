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

export { usageWeekday, usageWeekend, requiresArea };
