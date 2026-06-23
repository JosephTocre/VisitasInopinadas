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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

interface StatsChartProps {
  data: any[];
}

export function VisitsTrendChart({ data }: StatsChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[350px] w-full">
      <h3 className="text-lg font-semibold mb-4">
        Tendencia de Visitas (7 días)
      </h3>
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

export function VisitsByMonthChart({ data }: StatsChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[350px] w-full">
      <h3 className="text-lg font-semibold mb-4">Visitas por Mes</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis dataKey="mes" type="category" width={80} />
          <Tooltip />
          <Bar dataKey="visitas" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function VisitsByInspectorChart({ data }: StatsChartProps) {
  // Convertir data al formato del gráfico
  const dataForChart = data.map((item) => ({
    inspector: item.inspector,
    visitas: item._count.id,
  }));

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[350px] w-full">
      <h3 className="text-lg font-semibold mb-4">Visitas por Inspector</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={dataForChart}
            dataKey="visitas"
            nameKey="inspector"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function VisitsByPeriodChart({ data }: StatsChartProps) {
  // Convertir data al formato del gráfico
  const dataForChart = data
    .map((item) => ({
      periodo: item.periodo,
      visitas: item._count.id_visita,
    }))
    .sort((a, b) => a.periodo.localeCompare(b.periodo));

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[350px] w-full">
      <h3 className="text-lg font-semibold mb-4">Visitas por Periodo</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={dataForChart}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="periodo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="visitas" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
