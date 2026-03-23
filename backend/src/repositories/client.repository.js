const prisma = require("../lib/prisma");

async function findAllClients() {
  return prisma.client.findMany({
    orderBy: { companyName: "asc" },
  });
}

module.exports = { findAllClients };