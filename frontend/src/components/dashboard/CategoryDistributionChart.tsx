import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

type Props = {
  data: { category: string; count: number }[];
};

const BAR_COLORS = ["#73b7c1", "#7fc4c6", "#9dcfd0", "#b9dbd9", "#8ebdc7", "#6faab4"];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <div className="text-sm font-semibold text-slate-900">{label}</div>
      <div className="mt-1 text-sm text-slate-600">Tasks: {payload[0].value}</div>
    </div>
  );
}

export default function CategoryDistributionChart({ data }: Props) {
  const formattedData = data.map((item, index) => ({
    ...item,
    shortCategory:
      item.category.length > 16 ? item.category.slice(0, 16) + "..." : item.category,
    fill: BAR_COLORS[index % BAR_COLORS.length],
  }));

  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4">
        <h4 className="text-[17px] font-semibold text-slate-900">
          Category Distribution
        </h4>
        <p className="mt-1 text-sm text-slate-500">
          Volume of compliance work by category
        </p>
      </div>

      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ left: 10, right: 20 }}
          >
            <CartesianGrid horizontal stroke="#e5e7eb" vertical={false} />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="shortCategory"
              type="category"
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 10, 10, 0]}>
              {formattedData.map((entry) => (
                <Cell key={entry.category} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}