/**
 * Cypress selector shorthand
 *
 * Can be used to select elements by their data-cy dom attribute. Foe example an
 * element
 *
 *  <div data-cy="menu-searchbar" />
 *
 * could be selected with
 *
 *  cyElem('menu-searchbar');
 *
 * @param {string} arg Value of the element's data-cy attribute
 */

function cyElem(arg) {
  return cy.get(`[data-cy=${arg}]`);
}

export { cyElem };
