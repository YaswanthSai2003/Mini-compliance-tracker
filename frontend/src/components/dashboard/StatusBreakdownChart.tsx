import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type Props = {
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
};

const COLORS = ["#f4c76a", "#63b3c2", "#4da39f", "#e07a6f"];

export default function StatusBreakdownChart({
  pending,
  inProgress,
  completed,
  overdue,
}: Props) {
  const data = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed },
    { name: "Overdue", value: overdue },
  ];

  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4">
        <h4 className="text-[17px] font-semibold text-slate-900">
          Task Status Breakdown
        </h4>
        <p className="mt-1 text-sm text-slate-500">
          Current workload distribution by task state
        </p>
      </div>

      <div className="grid grid-cols-[190px_1fr] items-center gap-4">
        <div className="h-[190px] w-[190px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={50}
                outerRadius={78}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span>{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}