Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('José').should('have.value', 'José')
            cy.get('#lastName').type('Silva').should('have.value', 'Silva')
            cy.get('#email').type('jose-silva@mailinator.com').should('have.value', 'jose-silva@mailinator.com')
            cy.get('#open-text-area').type('Testando Cypress')
            cy.get('.button').click()
})