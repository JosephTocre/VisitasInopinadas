import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
      <div>
        {icon && <div className="text-3xl mb-4">{icon}</div>}
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        <h3 className="text-1xl font-medium text-gray-500 mt-2">{title}</h3>
      </div>
    </div>
  );
}
