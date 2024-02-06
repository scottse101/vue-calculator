describe('Form Validation', () => {
  it('disables submit button when form is invalid', () => {
    cy.visit('/ContactForm');  // Assuming the form is on the root path

    // Simulate filling in the form with invalid data
    cy.get('#name').type(' ');
    cy.get('#email').type('invalid-email');
    cy.get('#message').type(' ');

    // Assert that the submit button is disabled
    cy.get('button[type="submit"]').should('be.disabled');
  });

});
