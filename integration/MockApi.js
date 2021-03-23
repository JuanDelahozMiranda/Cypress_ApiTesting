// <reference types="cypress" />
describe('ApiMock_Demo', ()=>{
  
  beforeEach(() => {
      cy.server()    
      cy.route('GET', '**/tags', 'fixture:tags.json').as('ElementTag')
      /*
      cy.fixture('user.json').then(function (data) {
          this.data = data;
      })*/
      cy.fixture('ApiTools.json').then(function (data) {this.data = data;})
  })

  it('Mock1', function () {
    expect(this.data).to.be.not.null
    expect(this.data.tools).to.have.property('testing')
    expect(this.data.tools).to.have.property('sience')
    expect(this.data.tools).to.have.property('Dev')

    expect(this.data.tools.sience).to.be.empty
    console.log('sience: ', this.data.tools.sience)

    expect(this.data.tools.testing).to.have.length(5)
    expect(this.data.tools.testing[0]).to.be.not.empty
    console.log('testing: ', this.data.tools.testing)
    /*
    cy.visit('https://shop.demoqa.com/my-account/');
    cy.get('#reg_username').type(this.data.Username);
    cy.get('#reg_email').type(this.data.Email);
    cy.get('#reg_password').type(this.data.Password)
    //
    cy.get('.woocommerce-Button').should('have.attr', 'disabled', 'disabled');
    cy.get('.woocommerce-Button').should('be.disabled');
    //
    cy.get('#reg_password').clear()
    cy.get('#reg_password').type(this.data.NewPassword)
    cy.get('.woocommerce-Button').click();
    //
    cy.get('#username').should('have.value', this.data.Username);
    */
})

  it('Mock2', ()=>{
    cy.visit('https://angular.realworld.io/')
    cy.get('.tag-list').should('contain', 'Cypress').and('contain','selenium')
    expect('.tag-list').to.have.length(9)

  })


  Cypress.on('uncaught:exception', (err, runnable) =>{
    return false;
  })
})