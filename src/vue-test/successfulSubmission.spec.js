describe('Successful Submission Scenario', () => {
    it('displays the correct response from the server on successful submission', () => {
      cy.visit('/ContactForm');
  
      // Fill in valid form data
      cy.get('#name').type('John Doe');
      cy.get('#email').type('john@example.com');
      cy.get('#message').type('Hello');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Assert that the success message is displayed
      cy.get('.status-message.success').should('be.visible');
    });
  });