/*STEPS:
Pre-requisite: Generate Auth Code
https://github.com/login/oauth/authorize?client_id=7bfe2cb485ba8c2cad6e

1. Get the OAuth2 access token
POST: https://github.com/login/oauth/access_token
QUery Params:
    - client_id
    - client_secret
    - code

//2. Send GET request by using access token
https://github.com/user/repos
*/
/// <reference types="Cypress" />
describe('OAuth2.0', () => {
    let accessToken = "";
    it('OAuth2.0', () => {
        cy.request({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token',
            qs: {
                client_id: '7bfe2cb485ba8c2cad6e',
                client_secret: 'f453ca5de61766bcd6870dee3ffdb4427fcaed0c',
                code: '7620bd927027f0a5e272'
            }
        })
            .then((response) => {
                const params = response.body.split('&')
                accessToken = params[0].split("=")[1]
                cy.log("Generated token is: " + accessToken)
            })
    })
    it('OAuth2.0 Request', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer ' + accessToken
            }

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0].id).to.eq(77416)
        })
    })
})