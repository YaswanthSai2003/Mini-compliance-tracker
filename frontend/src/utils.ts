import type { Task } from "./types";

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB");
}

export function isOverdue(task: Task) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);

  return task.status !== "COMPLETED" && due < today;
}

export function priorityClass(priority: Task["priority"]) {
  if (priority === "HIGH") return "bg-amber-100 text-amber-700";
  if (priority === "MEDIUM") return "bg-orange-100 text-orange-700";
  return "bg-emerald-100 text-emerald-700";
}

export function statusBadgeClass(status: Task["status"]) {
  if (status === "COMPLETED") return "bg-teal-100 text-teal-700";
  if (status === "IN_PROGRESS") return "bg-sky-100 text-sky-700";
  return "bg-slate-100 text-slate-700";
}