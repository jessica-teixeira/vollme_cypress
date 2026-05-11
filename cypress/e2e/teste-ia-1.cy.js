describe('GET /clinicas', () => {

  it('deve listar todas as clínicas', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/clinica'
    }).then((response) => {

      // valida status
      expect(response.status).to.eq(200)

      // valida que o corpo é um array
      expect(response.body).to.be.an('array')

      // valida que existe pelo menos uma clínica
      expect(response.body.length).to.be.greaterThan(0)

      // valida propriedades da clínica
      response.body.forEach((clinica) => {
        expect(clinica).to.have.property('id')
        expect(clinica).to.have.property('nome')
      })

    })

  })

})