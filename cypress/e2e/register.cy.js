describe('template spec', () => {
  it('has a working form', () => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(1).click();

    cy.contains('Register').should('be.visible');

    cy.get('input').eq(1).type('Jon');
    cy.get('input').eq(2).type('Smith');
    cy.get('input').eq(3).type('jonsmith@gmail.com');
    cy.get('input').eq(4).type('HR');
    cy.get('input').eq(5).type('Password123');
    cy.get('input').eq(6).type('Password123');
    cy.get('input').eq(7).type('jonsmith@hotmail.com');
    cy.get('input').eq(8).type('+447399583330');

    cy.get('button').eq(3).click();

    cy.contains('Invalid invite').should('be.visible');
  })

  it('should reroute to the login page', () => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(1).click();

    cy.get('button').eq(1).click();

    cy.contains('Login').should('be.visible');
  })

  it('should not register incorect details', () => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(1).click();

    cy.get('button').eq(3).click();

    cy.contains('Your first name is required').should('be.visible');
    cy.contains('Your first name is required').should('be.visible');
    cy.contains('Your first name is required').should('be.visible');
    cy.contains('Your first name is required').should('be.visible');
    cy.contains('Your first name is required').should('be.visible');
    cy.contains('Your first name is required').should('be.visible');

    cy.get('input').eq(3).type('jonsmith');

    cy.contains('Not a valid email').should('be.visible');

    cy.get('input').eq(8).type('hi how are you');

    cy.contains('Not a valid phone number').should('be.visible');

    cy.get('button').eq(3).click();
    cy.contains('Register').should('be.visible');
  })
})