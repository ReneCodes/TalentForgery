describe('landing page', () => {
  it('renders the content', () => {
    cy.visit('http://localhost:5173');

    cy.contains("Start using Minon Mentor Today").should('be.visible');
  })
})

describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    cy.get('button').eq(0).click();

    cy.get('input').eq(0).type('caiankeyes@gmail.com');
    cy.get('input').eq(1).type('User1_123');

    cy.get('button').eq(1).click();

    cy.contains('Dashboard').should('be.visible');
  })

  it('renders the content', () => {
    cy.contains('Home').click();

    cy.contains('How to peel a Banana').should('be.visible');
    cy.contains('science').should('be.visible');
    cy.contains("What's that sound").should('be.visible');
    
    cy.get('button').eq(3).click();

    cy.contains("How to peel a Banana").should('be.visible');

    cy.get('button').eq(16).click();

    cy.get('button').eq(4).click();

    cy.contains("How to peel a Banana").should('be.visible');

    cy.contains("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatem cupiditate, corporis laudantium explicabo maiores harum aliquid non nobis impedit, recusandae laborum rem alias ducimus id numquam aliquam. Sequi ad earum a deleniti, cum veritatis accusantium recusandae laboriosam autem nesciunt.").should('be.visible');

    cy.get('button').eq(16).click();

    cy.get('button').eq(5).click();

    cy.contains("What's that sound").should('be.visible');

    cy.get('button').eq(16).click();

    cy.get('button').eq(6).click();

    cy.contains("What's that sound").should('be.visible');

    cy.contains("Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque iste totam perferendis ratione at quia fugit praesentium aliquam labore vel voluptate illo dolorem reiciendis nesciunt minus voluptatem, assumenda excepturi nulla et libero harum neque sunt? Sunt illum nihil, aliquid eos sit neque repellat qui cum placeat eum praesentium temporibus laudantium perferendis a, nobis inventore dolorem aliquam autem debitis excepturi porro quasi eligendi consequatur mollitia? Tenetur adipisci perferendis quisquam eius?").should('be.visible');

    cy.get('button').eq(16).click();

    cy.get('button').eq(9).click();

    cy.contains("Personal information").should('be.visible');
    cy.contains("First Name: Bob").should('be.visible');
    cy.contains("Last Name: Bob").should('be.visible');
    cy.contains("Email: Bob@mail.com").should('be.visible');
    cy.contains("Department: Finanace").should('be.visible');
    cy.contains("Second email: Bob@mail.com").should('be.visible');
    cy.contains("Phone Number: 0 500 555 555").should('be.visible');

    cy.get('button').eq(17).click();

    cy.get('button').eq(10).click();

    cy.contains("Pofile Info").should('be.visible');

    cy.get('button').eq(17).click();

    cy.get('button').eq(15).click();

    cy.contains("Warehaouse Safty Regulations").should('be.visible');

    cy.contains("Learn how to use a forklift and move around safely in the warehouse").should('be.visible');

    cy.get('button').eq(16).click();
  })

  it('should take the quiz', () => {
    cy.contains('Home').click();

    cy.get('button').eq(11).click();
    cy.get('button').eq(17).click();

    cy.get('.checkbox').eq(0).click();
    
    cy.get('button').eq(17).click();

    cy.get('.checkbox').eq(0).click();

    cy.get('button').eq(17).click();

    cy.contains("Thank you!").should('be.visible');

    cy.get('button').eq(17).click();

    cy.contains("Home").should('be.visible');
  })
})