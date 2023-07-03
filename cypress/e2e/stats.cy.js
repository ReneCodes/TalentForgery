describe('stats', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(0).click();

    cy.get('input').eq(0).type('caiankeyes@gmail.com');
    cy.get('input').eq(1).type('User1_123');

    cy.get('button').eq(1).click();

    cy.contains('Dashboard').should('be.visible');

    cy.contains('stats').click();
  })

  it('passes', () => {})
})