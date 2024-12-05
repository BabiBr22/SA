describe('Testes de Funcionários', () => {
    it('Deve carregar a lista de funcionários corretamente', () => {
      cy.request('GET', 'http://localhost:4000/funcionarios').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.greaterThan(0);
      });
    });
  });
  