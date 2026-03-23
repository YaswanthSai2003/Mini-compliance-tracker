const categories = [
  "GST Filing",
  "TDS Return",
  "Income Tax",
  "ROC Filing",
  "Payroll Compliance",
  "Audit Preparation",
];

type Props = {
  search: string;
  statusFilter: string;
  categoryFilter: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function FiltersBar({
  search,
  statusFilter,
  categoryFilter,
  sortBy,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onSortChange,
}: Props) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <input
          type="text"
          placeholder="Search task title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-teal-600"
        />

        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-teal-600"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-teal-600"
        >
          <option value="ALL">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-teal-600"
        >
          <option value="DUE_DATE">Sort by Due Date</option>
          <option value="PRIORITY">Sort by Priority</option>
          <option value="OVERDUE_FIRST">Overdue First</option>
        </select>
      </div>
    </section>
  );
}