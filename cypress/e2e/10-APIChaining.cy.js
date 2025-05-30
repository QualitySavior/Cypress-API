/// <reference types="Cypress" />
describe('API Chaining', () => {
    it('Should make API requests and chain them together', () => {
        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts',
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                const postid = response.body[0].id
                return postid
            })
            .then((postid) => {
                cy.request({
                    method: 'GET',
                    url: `https://jsonplaceholder.typicode.com/comments?postId=${postid}`,
                })
                    .then((response) => {
                        expect(response.status).to.eq(201)
                        expect(response.body).to.have.length(5)
                    })
            })
    })
})
