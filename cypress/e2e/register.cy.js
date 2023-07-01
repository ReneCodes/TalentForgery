describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Start using Minon Mentor Today').should('be.visible');

    cy.get('button').eq(1).click();
  })
})