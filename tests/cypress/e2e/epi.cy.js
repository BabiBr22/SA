describe('Gestão de EPIs', () => {
  const epiData = {
    nome: 'Capacete de Segurança',
    descricao: 'Capacete para proteção contra impactos',
    validade: '2025-12-31',
    quantidade: 10 // Adicionando o campo quantidade
  };

  let epiId;

  it('Deve criar um novo EPI', () => {
    cy.request('POST', '/epis', epiData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      epiId = response.body.id;
    });
  });

  it('Deve editar um EPI existente', () => {
    const updatedData = { ...epiData, nome: 'Capacete de Segurança Atualizado' };
    cy.request('PUT', `/epis/${epiId}`, updatedData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.nome).to.eq('Capacete de Segurança Atualizado');
    });
  });

  it('Deve remover um EPI', () => {
    cy.request('DELETE', `/epis/${epiId}`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});


describe('Testes de EPIs', () => {
  it('Deve carregar a lista de EPIs corretamente', () => {
    cy.request('GET', 'http://localhost:4000/epis').then((response) => {
      expect(response.status).to.eq(200); // Verifica se a resposta tem status 200
      expect(response.body).to.be.an('array'); // Verifica se a resposta é um array
      expect(response.body).to.have.length.greaterThan(0); // Verifica se há pelo menos um EPI
    });
  });
});