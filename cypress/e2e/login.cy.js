describe('template spec', () => {
  it('can login a user', () => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(0).click();

    cy.get('input').eq(0).type('caiankeyes@gmail.com');
    cy.get('input').eq(1).type('User1_123');

    cy.get('button').eq(1).click();

    cy.contains('Dashboard').should('be.visible');
  })

  it('does not login a user who does not exsist', () => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(0).click();

    cy.get('input').eq(0).type('jimmy@gmail.com');
    cy.get('input').eq(1).type('User1_123');

    cy.get('button').eq(1).click();

    cy.contains("User doesn't exist").should('be.visible');
  })

  it('should have a register button ', () => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(0).click();
    cy.get('button').eq(2).click();

    cy.contains("Register").should('be.visible');
  })
})