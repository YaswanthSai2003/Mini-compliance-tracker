const express = require("express");
const {
  createTask,
  updateTaskStatus,
} = require("../controllers/task.controller");

const router = express.Router();

router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);

module.exports = router;