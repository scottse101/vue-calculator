describe('Form Validation', () => {
  it('disables submit button when form is invalid', () => {
    cy.visit('/');  // Assuming the form is on the root path

    // Simulate filling in the form with invalid data
    cy.get('#name').type('John');
    cy.get('#email').type('invalid-email');
    cy.get('#message').type('Hello');

    // Assert that the submit button is disabled
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('submits form successfully with valid data', () => {
    cy.visit('/');  // Assuming the form is on the root path

    // Simulate filling in the form with valid data
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#message').type('Hello, this is a test message');

    // Assert that the submit button is enabled
    cy.get('button[type="submit"]').should('not.be.disabled');

    // Submit the form
    cy.get('form').submit();

    // Assert that the success message or server response is displayed
    cy.contains('Form submitted!').should('exist');
  });
});
