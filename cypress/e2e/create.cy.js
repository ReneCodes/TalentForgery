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
  
  it('passes', () => {
    cy.get('input').eq(0).type('How to put out a fire');
    cy.get('input').eq(1).type('How to put out a fire in the office using a multi-tude of diffrent methods such as fire extingushing');

    cy.get('input').eq(2).type('fire');
    cy.get('button').eq(3).click();

    cy.get('input').eq(2).type('safety');
    cy.get('button').eq(3).click();

    cy.get('input').eq(3).type('1');

    cy.get('button').eq(4).click();

    cy.get('input').eq(6).type('what fuesl fire?');

    cy.get('input').eq(7).type('magic');
    cy.get('button').eq(4).click();

    cy.get('input').eq(7).type('oxygen');
    cy.get('button').eq(4).click();

    cy.get('input').eq(7).type('fear');
    cy.get('button').eq(4).click();

    cy.contains('magic').should('be.visible');
    cy.contains('oxygen').click();
    cy.contains('fear').should('be.visible');
    cy.contains('oxygen').should('be.visible');

    cy.get('button').eq(5).click();

    cy.contains('1/2').should('be.visible');

    cy.get('button').eq(5).click();

    cy.on('window:alert',(t)=>{
      expect(t).to.contains('video is needed');
    })
  })

  it('should send an alert if title is not included', () => {
    cy.get('button').eq(5).click();

    cy.on('window:alert',(t)=>{
      expect(t).to.contains('form information missing');
    })
  })

  it('should send an alert if description is not included', () => {
    cy.get('input').eq(0).type('How to put out a fire');
    cy.get('button').eq(5).click();

    cy.on('window:alert',(t)=>{
      expect(t).to.contains('form information missing');
    })
  });

  it('should send an alert if test length is not included', () => {
    cy.get('input').eq(0).type('How to put out a fire');
    cy.get('input').eq(1).type('How to');
    cy.get('button').eq(5).click();

    cy.on('window:alert',(t)=>{
      expect(t).to.contains('form information missing');
    })
  });

  it('should send an alert if test length is more then questions.length', () => {
    cy.get('input').eq(0).type('How to put out a fire');
    cy.get('input').eq(1).type('How to');
    cy.get('input').eq(3).type('7');
    cy.get('button').eq(5).click();

    cy.on('window:alert',(t)=>{
      expect(t).to.contains('must have more or equal questions to the length');
    })
  });
})