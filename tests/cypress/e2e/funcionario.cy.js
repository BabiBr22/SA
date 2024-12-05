describe('Gestão de Funcionários', () => {
    const funcionarioData = {
      nome: 'João Silva',
      cargo: 'Engenheiro de Segurança',
      identificacao: '123456'
    };
  
    let funcionarioId;
  
    it('Deve criar um novo funcionário', () => {
      cy.request('POST', '/funcionarios', funcionarioData).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        funcionarioId = response.body.id;
      });
    });
  
    it('Deve editar um funcionário existente', () => {
      const updatedData = { ...funcionarioData, nome: 'João Silva Atualizado' };
      cy.request('PUT', `/funcionarios/${funcionarioId}`, updatedData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq('João Silva Atualizado');
      });
    });
  
    it('Deve remover um funcionário', () => {
      cy.request('DELETE', `/funcionarios/${funcionarioId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Funcionário excluído com sucesso.');
      });
    });
  });
  
  describe('Testes de Funcionários', () => {
    it('Deve carregar a lista de funcionários corretamente', () => {
      cy.request('GET', 'http://localhost:4000/funcionarios').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.greaterThan(0);
      });
    });
  });
  