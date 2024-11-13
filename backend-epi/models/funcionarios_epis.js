const Funcionario = require('./models/Funcionario');
const EPI = require('./models/Epi');

// Suponha que você tenha IDs de funcionário e EPI que deseja associar
const funcionarioId = 1;  // ID do funcionário
const epiId = 1;          // ID do EPI

// Buscar o funcionário e o EPI
Funcionario.findByPk(funcionarioId)
  .then(funcionario => {
    if (!funcionario) {
      console.log("Funcionário não encontrado");
      return;
    }

    EPI.findByPk(epiId)
      .then(epi => {
        if (!epi) {
          console.log("EPI não encontrado");
          return;
        }

        // Adiciona o EPI ao funcionário (cria a associação na tabela intermediária)
        funcionario.addEpi(epi)
          .then(() => {
            console.log(`EPI ${epiId} associado ao funcionário ${funcionarioId}`);
          })
          .catch(error => {
            console.error("Erro ao associar EPI ao funcionário:", error);
          });
      })
      .catch(error => {
        console.error("Erro ao buscar EPI:", error);
      });
  })
  .catch(error => {
    console.error("Erro ao buscar funcionário:", error);
  });
