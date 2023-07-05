import 'cypress-file-upload';

describe('Create tutorial', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(0).click();

    cy.get('input').eq(0).type('caiankeyes@gmail.com');
    cy.get('input').eq(1).type('User1_123');

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
    cy.get('button').eq(12).click();
    cy.get('input').eq(7).type('bye');
    cy.get('button').eq(12).click();
    cy.get('input').eq(6).click();

    cy.get('input').eq(9).type(1);

    cy.get('button').eq(15).click();

    cy.contains('Begin').should('be.visible');
    cy.contains('end').should('be.visible');
  })

  // it('should send an alert if title is not included', () => {
  //   cy.get('button').eq(5).click();

  //   cy.on('window:alert',(t)=>{
  //     expect(t).to.contains('form information missing');
  //   })
  // })

  // it('should send an alert if description is not included', () => {
  //   cy.get('input').eq(0).type('How to put out a fire');
  //   cy.get('button').eq(5).click();

  //   cy.on('window:alert',(t)=>{
  //     expect(t).to.contains('form information missing');
  //   })
  // });

  // it('should send an alert if test length is not included', () => {
  //   cy.get('input').eq(0).type('How to put out a fire');
  //   cy.get('input').eq(1).type('How to');
  //   cy.get('button').eq(5).click();

  //   cy.on('window:alert',(t)=>{
  //     expect(t).to.contains('form information missing');
  //   })
  // });

  // it('should send an alert if test length is more then questions.length', () => {
  //   cy.get('input').eq(0).type('How to put out a fire');
  //   cy.get('input').eq(1).type('How to');
  //   cy.get('input').eq(3).type('7');
  //   cy.get('button').eq(5).click();

  //   cy.on('window:alert',(t)=>{
  //     expect(t).to.contains('must have more or equal questions to the length');
  //   })
  // });
})