describe('Form Validation', () => {
  it('disables submit button when form is invalid', () => {
    cy.visit('/ContactForm');  

    cy.get('#name').type(' ');
    cy.get('#email').type('invalid-email');
    cy.get('#message').type(' ');

    cy.get('button[type="submit"]').should('be.disabled');
  });

});
