const express = require("express");
const {
  getClients,
  getClientTasks,
  getClientAnalytics,
} = require("../controllers/client.controller");

const router = express.Router();

router.get("/", getClients);
router.get("/:id/tasks", getClientTasks);
router.get("/:id/analytics", getClientAnalytics);

module.exports = router;