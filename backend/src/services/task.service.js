const taskRepository = require("../repositories/task.repository");

function isOverdue(task) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  return task.status !== "COMPLETED" && dueDate < today;
}

function sortTasks(tasks, sort) {
  if (sort === "PRIORITY") {
    const rank = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return [...tasks].sort((a, b) => rank[b.priority] - rank[a.priority]);
  }

  if (sort === "OVERDUE_FIRST") {
    return [...tasks].sort((a, b) => Number(isOverdue(b)) - Number(isOverdue(a)));
  }

  return [...tasks].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
}

async function getTasksByClient(clientId, filters) {
  const tasks = await taskRepository.findTasksByClient(clientId, filters);
  return sortTasks(tasks, filters.sort || "DUE_DATE");
}

async function getAnalyticsByClient(clientId) {
  const tasks = await taskRepository.findAllTasksByClient(clientId);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "PENDING").length,
    inProgress: tasks.filter((task) => task.status === "IN_PROGRESS").length,
    completed: tasks.filter((task) => task.status === "COMPLETED").length,
    overdue: tasks.filter((task) => isOverdue(task)).length,
  };

  const categoryMap = {};
  for (const task of tasks) {
    categoryMap[task.category] = (categoryMap[task.category] || 0) + 1;
  }

  const categoryDistribution = Object.entries(categoryMap).map(([category, count]) => ({
    category,
    count,
  }));

  const upcomingDeadlines = tasks
    .filter((task) => task.status !== "COMPLETED")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 6);

  return {
    stats,
    categoryDistribution,
    upcomingDeadlines,
  };
}

async function createTask(payload) {
  return taskRepository.createTask({
    clientId: payload.clientId,
    title: payload.title,
    description: payload.description || null,
    category: payload.category,
    dueDate: new Date(payload.dueDate),
    priority: payload.priority,
    status: "PENDING",
  });
}

async function changeTaskStatus(taskId, status) {
  return taskRepository.updateTaskStatus(taskId, status);
}

module.exports = {
  getTasksByClient,
  getAnalyticsByClient,
  createTask,
  changeTaskStatus,
};