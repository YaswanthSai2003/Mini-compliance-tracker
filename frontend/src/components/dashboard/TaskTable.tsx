import type { Task } from "@/types";
import { formatDate, isOverdue, priorityClass, statusBadgeClass } from "@/lib/utils";

type Props = {
  tasks: Task[];
  loading: boolean;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
};

export default function TaskTable({
  tasks,
  loading,
  onStatusChange,
}: Props) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[18px] font-semibold text-slate-900">Tasks</h3>
          <p className="mt-1 text-sm text-slate-500">
            Review, update, and track compliance items
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {tasks.length} tasks
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
          No tasks found for the current filters.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-500">
                <th className="px-4 py-3 font-semibold">Task</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Due Date</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {tasks.map((task) => {
                const overdue = isOverdue(task);

                return (
                  <tr key={task.id} className={overdue ? "bg-rose-50/40" : ""}>
                    <td className="px-4 py-4">
                      <div className="max-w-[280px]">
                        <div className="font-semibold text-slate-900">{task.title}</div>
                        {task.description ? (
                          <div className="mt-1 text-sm text-slate-500">{task.description}</div>
                        ) : null}
                        <div className="mt-1 text-xs text-slate-400">
                          Updated on {formatDate(task.updatedAt)}
                        </div>
                        {overdue ? (
                          <div className="mt-2 inline-flex rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700">
                            Overdue
                          </div>
                        ) : null}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-700">{task.category}</td>
                    <td className="px-4 py-4 text-slate-700">{formatDate(task.dueDate)}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${priorityClass(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          onStatusChange(task.id, e.target.value as Task["status"])
                        }
                        className={`h-10 rounded-full border border-slate-200 px-3 text-sm outline-none ${statusBadgeClass(
                          task.status
                        )}`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}