import config from '~/config';

describe('Analysis page', () => {
  it('renders', () => {
    cy.server().route('**/projects*').as('getProjects');
    cy.visit(config.routes.analysis)
      .wait('@getProjects')
      .its('status')
      .should('eq', 200);
    cy.get('h1').contains('Analyse');
  });
});
