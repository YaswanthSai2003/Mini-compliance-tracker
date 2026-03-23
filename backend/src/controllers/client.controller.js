const clientService = require("../services/client.service");
const taskService = require("../services/task.service");

async function getClients(req, res) {
  try {
    const clients = await clientService.getClients();
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
}

async function getClientTasks(req, res) {
  try {
    const { id } = req.params;
    const { status = "ALL", category = "ALL", search = "", sort = "DUE_DATE" } = req.query;

    const tasks = await taskService.getTasksByClient(id, {
      status,
      category,
      search,
      sort,
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

async function getClientAnalytics(req, res) {
  try {
    const { id } = req.params;
    const analytics = await taskService.getAnalyticsByClient(id);
    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
}

module.exports = {
  getClients,
  getClientTasks,
  getClientAnalytics,
};