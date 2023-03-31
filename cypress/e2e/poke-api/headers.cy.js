describe('Successfully call headers API', () => {
    it('Validate Header', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/pikachu').as('pikachu')
        cy.get('@pikachu').its('headers').its('content-type')
            .should('include', 'application/json; charset=utf-8')

        cy.get('@pikachu').its('headers').its('connection')
            .should('include', 'keep-alive')

        cy.get('@pikachu').its('headers').its('cache-control')
            .should('include', 'public, max-age=86400, s-maxage=86400')

        cy.get('@pikachu').its('headers').its('server')
        .should('include', 'cloudflare')
    });
})