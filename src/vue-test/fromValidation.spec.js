describe('Form Validation Scenario', () => {
    it('disables the submit button when the form is invalid', () => {
      cy.visit('/ContactForm');
  
      cy.get('button[type="submit"]').should('be.disabled');
  
      // Fill in invalid form data (empty fields)
      cy.get('#name').type('John Doe');
      cy.get('#email').type('john@example.com');
      cy.get('#message').type('Hello');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Ensure the submit button is still disabled
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });
  