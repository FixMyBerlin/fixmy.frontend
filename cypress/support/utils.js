 /**
 * JS Tag function (taking a template string) to make getting elements by their data-attribute
 * more readable.
 * TODO: Propose adopting this to team. If ok, only use this to get elements by data-attribute.
 * @param {string} args Arguments to the tag function.
 */

 export function getByDataAttr(...args) {
  const dataAttributeValue = args[0][0];
  return cy.get(`[data-cy=${dataAttributeValue}]`);
}
