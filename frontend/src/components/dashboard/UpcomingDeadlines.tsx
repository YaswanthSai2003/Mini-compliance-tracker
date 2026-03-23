import type { Task } from "@/types";
import { formatDate, isOverdue } from "@/lib/utils";

type Props = {
  tasks: Task[];
};

export default function UpcomingDeadlines({ tasks }: Props) {
  return (
    <aside className="flex h-full min-h-0 flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[20px] font-semibold text-slate-900">Upcoming Deadlines</h3>
        <p className="mt-2 text-sm text-slate-500">
          Closest pending items for this client
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-slate-500">
            No upcoming deadlines.
          </div>
        ) : (
          tasks.map((task) => {
            const overdue = isOverdue(task);

            return (
              <div
                key={task.id}
                className={`rounded-2xl border px-4 py-4 ${
                  overdue
                    ? "border-rose-200 bg-rose-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="text-[18px] font-semibold text-slate-900">{task.title}</div>
                <div className="mt-2 text-sm text-slate-500">{task.category}</div>
                <div className="mt-4 text-sm text-slate-700">
                  Due: {formatDate(task.dueDate)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}