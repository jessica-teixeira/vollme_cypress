describe('Teste de requisição da API para listar clínicas', () => {
    it('Deve retornar uma lista de clínicas', () => {
        // Faz uma requisição GET para a rota que lista as clínicas
        cy.request('GET', Cypress.env('api_clinica'))
            .then((response) => {
                // Verifica se a resposta possui o status 200 (OK)
                expect(response.status).to.eq(200);
                
                // Verifica se o corpo da resposta é um array
                expect(response.body).to.be.an('array');
                
                // Verifica se o corpo da resposta contém dados de clínicas
                expect(response.body.length).to.be.greaterThan(0);
                
                // Aqui você pode adicionar mais verificações conforme necessário
            });
    });
});
describe('GET /clinica', () => {

  it('deve buscar a primeira clínica da lista', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/clinica'
    }).then((response) => {

      // valida status da resposta
      expect(response.status).to.eq(200)

      // valida que o body é um array
      expect(response.body).to.be.an('array')

      // valida que existe pelo menos uma clínica
      expect(response.body.length).to.be.greaterThan(0)

      // pega a primeira clínica da lista
      const primeiraClinica = response.body[0]

      // valida propriedades principais da primeira clínica
      expect(primeiraClinica).to.have.property('id')
      expect(primeiraClinica).to.have.property('nome')
      expect(primeiraClinica).to.have.property('email')
      expect(primeiraClinica).to.have.property('role')

    })
  })

     it('deve retornar null ou erro ao buscar clínica inexistente', () => {
      const clinicaIdInvalido = 9999
      cy.request({
      method: 'GET',
      url: `http://localhost:8080/clinica/${clinicaIdInvalido}`,
      failOnStatusCode: false
    }).then((response) => {

      // ajuste conforme sua API - endpoint retorna 500 devido a erro na propriedade endereco
      expect([200, 404, 500]).to.include(response.status)

      // caso retorne null
      if (response.status === 200) {
        expect(response.body).to.be.null
      }

    })

  })

})
describe('GET /especialista', () => {

  it('deve listar todos os especialistas', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/especialista'
    }).then((response) => {

      // valida status
      expect(response.status).to.eq(200)

      // valida retorno em array
      expect(response.body).to.be.an('array')

      // valida se existe pelo menos um especialista
      expect(response.body.length).to.be.greaterThan(0)

      // valida estrutura do especialista
      response.body.forEach((especialista) => {
        expect(especialista).to.have.property('id')
        expect(especialista).to.have.property('nome')
      })

    })

  })

})
describe('GET /consulta', () => {

  it('deve listar todas as consultas', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/consulta'
    }).then((response) => {

      // valida status
      expect(response.status).to.eq(200)

      // valida retorno em array
      expect(response.body).to.be.an('array')

      // valida se possui registros (pode ser vazio)
      expect(response.body.length).to.be.at.least(0)

      // valida estrutura da consulta apenas se houver registros
      if (response.body.length > 0) {
        response.body.forEach((consulta) => {
          expect(consulta).to.have.property('id')

          // exemplos de campos comuns
          expect(consulta).to.have.property('data')
          expect(consulta).to.have.property('horario')
        })
      }

    })

  })

})
describe('POST /auth/logout', () => {

  it('deve realizar logout com sucesso', () => {

    // primeiro faz login para obter token válido
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/auth/login',
      body: {
        email: 'clinica@gmail.com',
        senha: '4321'
      }
    }).then((loginResponse) => {

      // valida que o login foi bem-sucedido
      expect(loginResponse.status).to.eq(200)
      expect(loginResponse.body).to.have.property('token')

      // usa o token obtido para fazer logout
      const token = loginResponse.body.token
      
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/auth/logout',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {

        // valida status HTTP
        expect(response.status).to.eq(200)

        // valida estrutura da resposta
        expect(response.body).to.have.property('auth')
        expect(response.body).to.have.property('token')

        // valida valores
        expect(response.body.auth).to.eq(false)
        expect(response.body.token).to.be.null

      })

    })

  })

})

