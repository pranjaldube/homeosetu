"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
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
  return (
    <Card className="p-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            height={60}
            tick={<CustomXAxisTick />}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Bar
            dataKey="total"
            fill="#0369a1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
