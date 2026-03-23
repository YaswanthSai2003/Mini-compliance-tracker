const clientRepository = require("../repositories/client.repository");

async function getClients() {
  return clientRepository.findAllClients();
}

module.exports = { getClients };