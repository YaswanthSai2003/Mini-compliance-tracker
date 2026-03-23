const prisma = require("../lib/prisma");

async function findTasksByClient(clientId, filters) {
  const where = { clientId };

  if (filters.status && filters.status !== "ALL") {
    where.status = filters.status;
  }

  if (filters.category && filters.category !== "ALL") {
    where.category = filters.category;
  }

  if (filters.search) {
    where.title = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  return prisma.complianceTask.findMany({
    where,
    orderBy: { dueDate: "asc" },
  });
}

async function findAllTasksByClient(clientId) {
  return prisma.complianceTask.findMany({
    where: { clientId },
    orderBy: { dueDate: "asc" },
  });
}

async function createTask(data) {
  return prisma.complianceTask.create({ data });
}

async function updateTaskStatus(id, status) {
  return prisma.complianceTask.update({
    where: { id },
    data: { status },
  });
}

module.exports = {
  findTasksByClient,
  findAllTasksByClient,
  createTask,
  updateTaskStatus,
};