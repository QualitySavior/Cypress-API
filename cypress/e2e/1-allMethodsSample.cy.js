describe('HTTP Requests', () => {
    it('GET Request', () => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
            //.its('status')
            //.should('eq', 200)
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('POST Request', () => {
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: {
                userId: 1,
                title: "testtitlepart1",
                body: "testbodypart1"
            }
        })
            .then((response) => {
                expect(response.status).to.eq(201)
            })
    })
    it('PUT Request', () => {
        cy.request({
            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: {
                userId: 1,
                id: 1,
                title: "testtitlepart1",
                body: "testbodypart1"
            }
        })
    })

    it('DELETE Request', () => {
        cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/1')
            .its('status')
            .should('eq', 200)
    })
})