describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => cy.visit('./src/index.html'))
        it('verifica o título da aplicação', function() {
            cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

        it('preenche os campos obrigatórios e envia o formulário', function() {
            cy.get('#firstName').type('José').should('have.value', 'José')
            cy.get('#lastName').type('Silva').should('have.value', 'Silva')
            cy.get('#email').type('jose-silva@mailinator.com').should('have.value', 'jose-silva@mailinator.com')
            cy.get('#open-text-area').type('Testando Cypress')
            cy.get('.button').click()
            cy.get('.success').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
            cy.get('#firstName').type('José')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('jose-silva@mailinator.com')
            cy.get('.button').click()
            cy.get('.error').should('be.visible')
        })

        it('campo telefone continua vazio quando não preenchido com valor não numérico', function() {
            cy.get('#phone').type('abcdefghij').should('have.value', '')
        })

        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
            cy.get('#firstName').type('José')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('jose-silva@mailinator.com')
            cy.get('#open-text-area').type('Testando Cypress')
            cy.get('#phone-checkbox').check()
            cy.get('.button').click()
            cy.get('.error').should('be.visible')
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
            cy.get('#firstName').type('José').should('have.value', 'José')
            .clear().should('have.value', '')
            cy.get('#lastName').type('Silva').should('have.value', 'Silva')
            .clear().should('have.value', '')
            cy.get('#email').type('jose-silva@mailinator.com').should('have.value', 'jose-silva@mailinator.com')
            .clear().should('have.value', '')
            cy.get('#open-text-area').type('Testando Cypress').should('have.value', 'Testando Cypress')
            .clear().should('have.value', '')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
            cy.get('.button').click()
            cy.get('.error').should('be.visible')
        })

        it('envia o formuário com sucesso usando um comando customizado', function() {
            cy.fillMandatoryFieldsAndSubmit()

            cy.get('.success').should('be.visible')
        })

        it('seleciona um produto (YouTube) por seu texto', function() {
            cy.get('#product').select('YouTube').should('have.value', 'youtube')
        })

        it('seleciona um produto (Mentoria) por seu valor (value)', function() {
            cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
        })

        it('seleciona um produto (Blog) por seu índice', function() {
            cy.get('#product').select(1).should('have.value', 'blog')
        })

        it('marca o tipo de atendimento "Feedback', function() {
            cy.get('input[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
        })

        it('marca cada tipo de atendimento', function() {
            cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
            
        })

        it('marca ambos checkboxes, depois desmarca o último', function() {
            cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
        })

        it('seleciona um arquivo da pasta fixtures', function() {
            cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('seleciona um arquivo simulando um drag-and-drop', function() {
            cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
            cy.fixture('example.json').as('sampleFile')
            cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
            cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
            cy.get('#privacy a')
                .invoke('removeAttr', 'target')
                .click()

            cy.contains('Talking About Testing').should('be.visible')
        })

        
})