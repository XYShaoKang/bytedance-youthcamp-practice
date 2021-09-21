describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('displays count 0 by default', () => {
    cy.get('#root button').should('have.text', 'Count 0')
  })
  it('can add count', () => {
    cy.get('#root button').click()
    cy.get('#root button').should('have.text', 'Count 1')
  })
})
