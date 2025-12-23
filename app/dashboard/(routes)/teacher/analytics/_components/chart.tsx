"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";

/* =======================
   Types
======================= */
interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

/* =======================
   Text Wrapping Helper
======================= */
const wrapText = (
  text: string,
  maxWidth: number,
  fontSize = 12
): string[] => {
  if (typeof window === "undefined") return [text];

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return [text];

  context.font = `${fontSize}px sans-serif`;

  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const { width } = context.measureText(testLine);

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);

  return lines;
};

/* =======================
   Custom XAxis Tick
======================= */
const CustomXAxisTick = ({ x, y, payload }: any) => {
  const MAX_WIDTH = 70; // px
  const FONT_SIZE = 12;

  const lines = wrapText(payload.value, MAX_WIDTH, FONT_SIZE);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor="middle"
        fill="#888888"
        fontSize={FONT_SIZE}
        dy={16}
      >
        {lines.map((line, index) => (
          <tspan
            key={index}
            x={0}
            dy={index === 0 ? 0 : 14}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

/* =======================
   Chart Component
======================= */
export const Chart = ({ data }: ChartProps) => {

  console.log("chartData",data)
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
