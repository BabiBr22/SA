describe('EPI Management', () => {
  const epiData = { nome: 'Capacete', descricao: 'Capacete de segurança', quantidade: 10 };

  it('Deve criar um novo EPI', () => {
    cy.request('POST', '/epis', epiData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('nome', 'Capacete');
      expect(Number(response.body.quantidade)).to.eq(10);
    });
  });
  
    it('Deve editar um EPI existente', () => {
      cy.request('POST', '/epi', epiData).then((postResponse) => {
        const epiId = postResponse.body.id;
        cy.request('PUT', `/epi/${epiId}`, { nome: 'Capacete Atualizado' }).then((putResponse) => {
          expect(putResponse.status).to.eq(200);
          expect(putResponse.body).to.have.property('nome', 'Capacete Atualizado');
        });
      });
    });
  
    it('Deve retornar 404 ao tentar editar um EPI inexistente', () => {
      cy.request({
        method: 'PUT',
        url: '/epi/9999',
        failOnStatusCode: false,
        body: { nome: 'Capacete Atualizado' },
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('error', 'EPI não encontrado');
      });
    });
  
    it('Deve deletar um EPI existente', () => {
      cy.request('POST', '/epi', epiData).then((postResponse) => {
        const epiId = postResponse.body.id;
        cy.request('DELETE', `/epi/${epiId}`).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204);
        });
      });
    });
  
    it('Deve retornar 404 ao tentar deletar um EPI inexistente', () => {
      cy.request({
        method: 'DELETE',
        url: '/epi/9999',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('error', 'EPI não encontrado');
      });
    });
  
    it('Deve listar todos os EPIs', () => {
      cy.request('GET', '/epis').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  });
  