import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";

export const Chart = ({ data }: { data: any[] }) => {
  console.log("chartData", data);

  return (
    <Card className="p-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 80 }}
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            interval={0}
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={16}
                  textAnchor="end"
                  fill="#555"
                  transform="rotate(-35)"
                  style={{ fontSize: 11 }}
                >
                  {payload.value.length > 25
                    ? payload.value.slice(0, 25) + "…"
                    : payload.value}
                </text>
              </g>
            )}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            formatter={(value: number) => [`₹${value}`, "Revenue"]}
            labelStyle={{ fontWeight: "bold" }}
          />

          <Bar
            dataKey="total"
            fill="#0369a1"
            radius={[6, 6, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
