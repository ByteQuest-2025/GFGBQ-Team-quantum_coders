"use client"

import {
  RadialBar,
  RadialBarChart,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils";

type RiskScoreMeterProps = {
  score: number;
};

export default function RiskScoreMeter({ score }: RiskScoreMeterProps) {
  const getRiskLevel = (value: number) => {
    if (value >= 70) return "High Risk";
    if (value >= 40) return "Medium Risk";
    return "Low Risk";
  };
  
  const getFillColor = (value: number) => {
    if (value >= 70) return "hsl(var(--destructive))";
    if (value >= 40) return "hsl(var(--chart-3))";
    return "hsl(var(--primary))";
  }

  const chartData = [{ name: "Risk", value: score, fill: getFillColor(score) }]

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={chartData}
          startAngle={90}
          endAngle={-270}
          barSize={20}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: 'hsl(var(--muted))' }}
            dataKey="value"
            cornerRadius={10}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-4xl font-bold"
          >
            {score}%
          </text>
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-sm"
          >
            {getRiskLevel(score)}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
