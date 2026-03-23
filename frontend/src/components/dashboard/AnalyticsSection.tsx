import StatusBreakdownChart from "./StatusBreakdownChart";
import CategoryDistributionChart from "./CategoryDistributionChart";

type Props = {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
  categoryData: { category: string; count: number }[];
};

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </div>
      <div className={`mt-2 text-2xl font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

export default function AnalyticsSection({
  total,
  pending,
  inProgress,
  completed,
  overdue,
  categoryData,
}: Props) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
        <h3 className="text-[18px] font-semibold text-slate-900">
          Compliance Insights
        </h3>
        <p className="text-sm text-slate-500">
          Status and category breakdown for the selected client
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total Tasks" value={total} tone="text-slate-900" />
        <MetricCard label="Pending" value={pending} tone="text-amber-600" />
        <MetricCard label="In Progress" value={inProgress} tone="text-sky-600" />
        <MetricCard label="Completed" value={completed} tone="text-teal-600" />
        <MetricCard label="Overdue" value={overdue} tone="text-rose-600" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <StatusBreakdownChart
          pending={pending}
          inProgress={inProgress}
          completed={completed}
          overdue={overdue}
        />
        <CategoryDistributionChart data={categoryData} />
      </div>
    </section>
  );
}