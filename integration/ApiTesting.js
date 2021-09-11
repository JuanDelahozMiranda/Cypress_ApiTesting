describe('ApiTesting_Demo', ()=>{
  
  beforeEach(() => {
    //https://docs.cypress.io/api/commands/request.html#Arguments
    //var BASE_URI = 'https://petstore.swagger.io/v2/store/order'
    //var parameters = {'id': 77, 'petId': 77, 'quantity': 3, 'shipDate': '2021-03-17', 'status': 'placed', 'complete': false}
  })
  
  it('Test 1 - Request Post', ()=>{
    var parameters = {'id': 88, 'petId': 88, 'quantity': 3, 'shipDate': '2021-03-17', 'status': 'placed', 'complete': false}
    cy.request({method: 'POST', 
                url:'https://petstore.swagger.io/v2/store/order', 
                failOnStatusCode: false, 
                headers: {'Content-Type': 'application/json'},
                body: parameters}).then((response)=>{
                    expect(response).to.have.property('headers')
                    expect(response.status).to.eq(200)
                    console.log('Response_Body: ',response.body)
    })
  })

  it('Test 2 - Request Get Fail', ()=>{
    cy.request({method: 'GET', 
                url:'https://petstore.swagger.io/v2/store/order/99', 
                failOnStatusCode: false, 
                headers: {'Content-Type': 'application/json'}}).then((response)=>{
                    expect(response.status).to.eq(404)
                    expect(response.body).to.have.property('code', 1)
                    expect(response.body).to.have.property('type', 'error')
                    expect(response.body).to.have.property('message', 'Order not found')
                    console.log('Response_Body: ',response.body)
    })
  })

  it('Test 3 - Request Get Succes', ()=>{
    cy.request({method: 'GET', 
                url:'https://petstore.swagger.io/v2/store/order/88', 
                failOnStatusCode: false, 
                headers: {'Content-Type': 'application/json'}}).then((response)=>{
                    expect(response).to.have.property('headers')
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('id', 88)
                    expect(response.body).to.have.property('petId', 88)
                    expect(response.body).to.have.property('quantity', 3)
                    expect(response.body['shipDate']).to.contains('2021-03-17')
                    expect(response.body).to.have.property('status', 'placed')
                    expect(response.body['complete']).to.be.false
                    console.log('Response_Body: ',response.body)
    })
  })

  it('Test 4 - Request Delete Success', ()=>{
    cy.request({method: 'DELETE', 
                url:'https://petstore.swagger.io/v2/store/order/88', 
                failOnStatusCode: false, 
                headers: {'Content-Type': 'application/json'}}).then((response)=>{
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('code', 200)
                    expect(response.body).to.have.property('type', 'unknown')
                    expect(response.body).to.have.property('message', '88')
                    console.log('Response_Body: ',response.body)
    })
  })

  it('Test 5 - Request Delete Fail', ()=>{
    cy.request({method: 'DELETE', 
                url:'https://petstore.swagger.io/v2/store/order/99', 
                failOnStatusCode: false, 
                headers: {'Content-Type': 'application/json'}}).then((response)=>{
                    expect(response.status).to.eq(404)
                    expect(response.body).to.have.property('code', 404)
                    expect(response.body).to.have.property('type', 'unknown')
                    expect(response.body).to.have.property('message', 'Order Not Found')
                    console.log('Response_Body: ',response.body)
    })
  })

  Cypress.on('uncaught:exception', (err, runnable) =>{
    return false;
  })
})