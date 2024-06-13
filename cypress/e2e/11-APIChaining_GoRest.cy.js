/*
POST https://gorest.co.in/public/v2/users
PUT https://gorest.co.in/public/v2/users/${userId}
DELETE https://gorest.co.in/public/v2/users/${userId}
--- Create your token from: https://gorest.co.in ---
*/

/// <reference types="Cypress" />
describe('GoRest API Chaining', () => {

    const auth_token = '3d0a9fb448a67c9fc6e8653aeb9ab467fffbbf9d51306a8729b7f314ef37d97f'

    it('create, update, delete user in GoRest API', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            body: {
                name: 'Bhumit Kataria',
                gender: 'male',
                email: Math.random.toString(5).substring(2) + '@gmail.com',
                status: 'active'
            },
            header: {
                Authorization: 'Bearer ' + auth_token            }
        })
            .then((response) => {
                expect(response.status).to.eq(201)
                const userId = response.body.id

                //update user name
                cy.request({
                    method: 'PUT',
                    url: `https://gorest.co.in/public/v2/users/${userId}`,
                    body: {
                        name: 'Parth Kataria'
                    },
                    header: {
                        Authorization: auth_token
                    }
                })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.body.name).to.equal('Parth Kataria')
                    })

                //delete resource
                cy.request({
                    method: 'DELETE',
                    url: `https://gorest.co.in/public/v2/users/${userId}`,
                    header: {
                        Authorization: auth_token
                    }
                })
                    .then((response) => {
                        expect(response.status).to.eq(204)
                    })
            })
    })
})