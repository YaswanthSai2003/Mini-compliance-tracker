const { z } = require("zod");
const taskService = require("../services/task.service");

const createTaskSchema = z.object({
  clientId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().min(1),
  dueDate: z.string().min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});

async function createTask(req, res) {
  try {
    const payload = createTaskSchema.parse(req.body);
    const task = await taskService.createTask(payload);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid task data" });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const { id } = req.params;
    const payload = updateStatusSchema.parse(req.body);
    const task = await taskService.changeTaskStatus(id, payload.status);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid status update" });
  }
}

module.exports = {
  createTask,
  updateTaskStatus,
};