describe('Automation API', () => {
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

    it('validate status', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/pikachu').as('pikachu')
        cy.get('@pikachu').its('status').should('equal', 200)
    });

    it('Validate API status', () => {
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/snorlax',
        }).as('snorlax')
        cy.get('@snorlax').its('status').should('equal', 200)
    })

    it('Validate content', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/ivysaur').as('ivysaur')
        cy.get('@ivysaur').its('body').should('include', {name: 'ivysaur'})
    });

    //tugas validate content
    it.only('Successfully update pokemon', () => {
        const pokemon = {
            "name": "limber",
            "url": "https://pokeapi.co/api/v2/ability/7/"
        }
        cy.request('GET', 'https://pokeapi.co/api/v2/ability/7/', pokemon).then((response) => {
            expect(response.status).eq(200);
            expect(response.body.name).to.eq(pokemon.name)
        })
    });
})