describe('Successful Form Submission', () => {
  it('displays a success message when the form is submitted', () => {
    cy.intercept('POST', 'http://localhost:3001/responses', (req) => {
      req.reply({ 
        status: 200, 
        body: { 
          name: 'Max Millian',
          email: 'max@millian.com',
          message: 'Hello, World!'
         },
         });
    }).as('submitForm');

    cy.visit('/ContactForm');

    cy.get('#name').type('Max Millian');
    cy.get('#email').type('max@millian.com');
    cy.get('#message').type('Hello, World!');

    cy.get('button[type="submit"]').click();

    cy.wait('@submitForm').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
});