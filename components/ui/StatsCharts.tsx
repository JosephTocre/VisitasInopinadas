import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface StatsChartProps {
  data: any[];
}

export function VisitsTrendChart({ data }: StatsChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[350px] w-full md:w-1/2">
      <h3 className="text-lg font-semibold mb-4">Tendencia de Visitas (7 días)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visitas"
            stroke="#000000"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function VisitsDistributionChart({ data }: StatsChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[350px]">
      <h3 className="text-lg font-semibold mb-4">Visitas por Estado</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#333333" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
