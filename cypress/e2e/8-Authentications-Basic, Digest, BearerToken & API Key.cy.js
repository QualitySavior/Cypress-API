//API Authentications - Basic, Digest, Bearer Token & API Key
//Basic and Digest Authentication
//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
/// <reference types="Cypress" />

describe('Authentication',()=>{
    it('Basic Authentication',()=>{
        cy.request({
            method:'GET',
            url:'https://postman-echo.com/basic-auth',
            auth:{
                user:'postman',
                pass:'password'
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })
    it('Digest Authentication',()=>{
        cy.request({
            method:'GET',
            url:'https://postman-echo.com/basic-auth',
            auth:{
                username:'postman',
                password:'password',
                method:'digest'
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })
    const token='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'
    it('Bearer Token Authentication',()=>{
        cy.request({
            method:'GET',
            url:'https://api.github.com/users/repos',
            headers:{
                Authorization:'Bearer '+token
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
        })
    })
    it('API Key Authentication',()=>{
        cy.request({
            method:'GET',
            url:'https://api.openweathermap.org/data/2.5/forecast/daily',
            qs:{
                q:'Delhi',
                appid:'fe9c5cddb7e01d747b4611c3fc9eaf2c' // API Key and Value
            },
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
        })
    })
})