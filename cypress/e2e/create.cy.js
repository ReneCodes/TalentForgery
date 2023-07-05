import 'cypress-file-upload';

describe('Create tutorial', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(0).click();

    const email = Cypress.env('email');
    const password = Cypress.env('password');

    cy.get('input').eq(0).type(email);
    cy.get('input').eq(1).type(password);

    cy.get('button').eq(1).click();

    cy.contains('Dashboard').should('be.visible');

    cy.contains('Create').click();
  })
  
  it('can submit a form with questions', () => {
    cy.get('button').eq(2).click();
    
    cy.get('input').eq(0).type('1');
    cy.get('textarea').eq(0).type('2');

    const videoFile = 'little_kitten_playing_his_toy_mouse (360p).mp4';
    cy.get('input[type="file"]').eq(0).attachFile(videoFile, { force: true });

    const imageFile = '/Screenshot 2023-05-13 at 08.55.17.png';
    cy.get('input[type="file"]').eq(1).attachFile(imageFile, { force: true });

    cy.get('input').eq(5).type('hi');
    cy.get('input').eq(6).type('hi');
    cy.get('button').eq(13).click();
    cy.get('input').eq(7).type('bye');
    cy.get('button').eq(13).click();
    cy.get('input').eq(6).click();

    cy.get('input').eq(9).type(1);

    cy.get('button').eq(16).click();

    cy.contains('Begin').should('be.visible');
    cy.contains('end').should('be.visible');
  })

  it('can submit a form without questions', () => {
    cy.get('button').eq(3).click();

    cy.get('input').eq(0).type('1');
    cy.get('textarea').eq(0).type('2');

    const videoFile = 'little_kitten_playing_his_toy_mouse (360p).mp4';
    cy.get('input[type="file"]').eq(0).attachFile(videoFile, { force: true });

    const imageFile = '/Screenshot 2023-05-13 at 08.55.17.png';
    cy.get('input[type="file"]').eq(1).attachFile(imageFile, { force: true });

    cy.get('button').eq(13).click();

    cy.contains('Begin').should('be.visible');
    cy.contains('end').should('be.visible');
  })

  it('can see the details about a tutorial', () => {
    cy.get('button').eq(5).click();

    cy.contains('Tutorial Reshedule').should('be.visible');

    cy.get('button').eq(12).click();

    cy.contains('Create').should('be.visible');

    cy.get('button').eq(5).click();

    cy.contains('Tutorial Reshedule').should('be.visible');

    cy.get('button').eq(13).click();

    cy.contains('Begin').should('be.visible');
    cy.contains('end').should('be.visible');
  })
})