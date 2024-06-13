//Install Library - XML to JS
//npm install xml2js
//https://www.site24x7.com/tools/json-to-xml.html <--- JSON to XML
//https://tools.onecompiler.com/multiline-to-singleline <--- Multiline XML to Singleline XML converter
/// <reference types="Cypress" />
const xml2js = require('xml2js')
const parser = new xml2js.Parser({explicitArray:false})

describe('XML Parsing',()=>{
    const xmlPayload=" <Pet>      <id>0</id>      <category>          <id>0</id>          <name>Dog</name>      </category>      <name>doggie</name>      <photoUrls>String</photoUrls>      <tags>          <id>0</id>          <name>string</name>      </tags>      <status>available</status>  </Pet>"
    let petid=null;
    before('Creating PET',()=>{
        cy.request({
            method:'POST',
            url:'https://petstore.swagger.io/v2/pet',
            body: xmlPayload,
            headers:{
                'Content-Type':'application/xml',
                'accept':'application/xml'
            }

        }).then((response)=>{
            expect(response.status).to.eq(200)
            parser.parseString(response.body,(err,result)=>{
                petid=result.Pet.id;
            })
        })
    })    
    it('Fetching Pet PET - Parsing XML Response',()=>{
        cy.request({
            method:'GET',
            url:"https://petstore.swagger.io/v2/pet/"+petid,
            headers:{
                'accept':'application/xml'
            }

        }).then((response)=>{
            expect(response.status).to.eq(200)
            parser.parseString(response.body,(err,result)=>{
                expect(result.Pet.id).to.equal(petid)
                expect(result.Pet.name).to.equal("doggie")
            })
        })
    })    
})