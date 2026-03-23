import type { TaskFormData } from "../../types/index";

const categories = [
  "GST Filing",
  "TDS Return",
  "Income Tax",
  "ROC Filing",
  "Payroll Compliance",
  "Audit Preparation",
];

type Props = {
  isOpen: boolean;
  formData: TaskFormData;
  onToggle: () => void;
  onChange: (field: keyof TaskFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function AddTaskCard({
  isOpen,
  formData,
  onToggle,
  onChange,
  onSubmit,
}: Props) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-5 text-left"
        type="button"
      >
        <div>
          <h3 className="text-[18px] font-semibold text-slate-900">Add New Task</h3>
          <p className="mt-1 text-sm text-slate-500">
            Create a compliance task for the selected client.
          </p>
        </div>
        <span className="text-sm font-medium text-teal-700">{isOpen ? "Hide" : "Open"}</span>
      </button>

      {isOpen ? (
        <div className="border-t border-slate-200 px-5 py-5">
          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <input
              type="text"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-teal-600"
              required
            />

            <select
              value={formData.category}
              onChange={(e) => onChange("category", e.target.value)}
              className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-teal-600"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => onChange("dueDate", e.target.value)}
              className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-teal-600"
              required
            />

            <select
              value={formData.priority}
              onChange={(e) => onChange("priority", e.target.value)}
              className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-teal-600"
            >
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
            </select>

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={4}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-teal-600 md:col-span-2"
            />

            <button
              type="submit"
              className="h-11 rounded-2xl bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 md:w-fit"
            >
              Save Task
            </button>
          </form>
        </div>
      ) : null}
    </section>
  );
}