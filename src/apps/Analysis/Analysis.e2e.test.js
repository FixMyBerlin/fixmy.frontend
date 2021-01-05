import config from '~/config';

describe('Analysis page', () => {
  before(() => {
    cy.server().route('**/projects*').as('getProjects');
  });

  it('renders', () => {
    cy.visit(config.routes.analysis)
      .wait('@getProjects')
      .its('status')
      .should('eq', 200);
    cy.get('h1').contains('Analyse');
  });
});
