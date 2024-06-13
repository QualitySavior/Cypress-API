/// <reference types="Cypress" />
describe('Parsing JSON Response',()=>{
    it('Parsing JSON Response',()=>{
    cy.request({
        method:'GET',
        url:'https://fakestoreapi.com/products'
    })
    .then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body[0].id).to.equal(1)
        expect(response.body[0].title).to.equal("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
        expect(response.body[0].price).to.equal(109.95)
        expect(response.body[0].rating.rate).to.equal(3.9)
    })
    })    

    it.only('Parsing complex JSON Response',()=>{
        let totalprice=0;
        cy.request({
            method:'GET',
            url:'https://fakestoreapi.com/products',
            qs:{limit:5} //qs <--- Query Parameter --- https://fakestoreapi.com/products?limit=5
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
            response.body.forEach(element => {
                totalprice=totalprice+element.price;
            });
            expect(totalprice).to.eq(899.23); //limit 5
        })
        })
})