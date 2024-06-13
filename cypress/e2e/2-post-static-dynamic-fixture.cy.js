/// <reference types="Cypress" />
describe('HTTP Requests', () => {
    it('Approach 1 - POST Request with static data - Hard Coded', () => {
        const requestbody = {
            userId: 1,
            title: "testtitlepart1",
            body: "testbodypart1"
        }
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: requestbody
        })
            .then((response) => {
                expect(response.status).to.eq(201)
            })
    })

    it('Approach 2 - POST Request while generating random title and body', () => {
        const requestbody = {
            userId: 1,
            title: Math.random().toString(2).substring(2) + "testtitlepart1",
            body: Math.random().toString(2).substring(2) + "testbodypart1"
        }
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: requestbody
        })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.title).to.eq(requestbody.title)
                expect(response.body.body).to.eq(requestbody.body)
            })
    })

    it.('Approach 3 - POST Request using Fixture', () => {
        cy.fixture('test').then((data) => {
            const requestbody = data;
            cy.request({
                method: 'POST',
                url: 'https://jsonplaceholder.typicode.com/posts',
                body: requestbody
            })
                .then((response) => {
                    expect(response.status).to.eq(201)
                    expect(response.body.title).to.eq(requestbody.title)
                    expect(response.body.body).to.eq(requestbody.body)
                    expect(response.body).has.property('title', requestbody.title)
                    expect(response.body).to.have.property('title', requestbody.title)
                })
        })
    })
})