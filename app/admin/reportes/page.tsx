"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DashboardCard } from "@/components/ui/DashboardCard";
import AdminSidebar from "@/components/AdminSidebar";
import { useState, useEffect } from "react";
import { ExportButton } from "@/components/ExportButton";
import { FilterBar } from "@/components/ui/FilterBar";
import { CalendarDays, UserRound, CircleCheck } from "lucide-react";
import {
  VisitsTrendChart,
  VisitsByInspectorChart,
  VisitsByPeriodChart,
  VisitsByMonthChart,
} from "@/components/ui/StatsCharts";

export default function ReportesPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    ciclo: "todos",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const res = await fetch("/api/reportes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("No tienes permisos para ver estas estadísticas.");
        }

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <AdminSidebar />
      <div className="w-px bg-gray-300" />
      <main className="p-8 w-full">
        <PageHeader
          title="Reportes y Estadísticas"
          description="Visualiza el desempeño y las métricas detalladas de las visitas realizadas."
        />

        {loading && (
          <div className="mb-6">
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full animate-pulse">
              Cargando estadísticas...
            </span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Visitas del día"
              value={stats?.visitasHoy || 0}
              icon={<CalendarDays size={24} />}
            />

            <DashboardCard
              title="Visitantes activos"
              value={stats?.visitantesActivos || 0}
              icon={<UserRound size={24} />}
            />

            <DashboardCard
              title="Visitas completadas"
              value={stats?.visitasCompletadas || 0}
              icon={<CircleCheck size={24} />}
            />
          </div>
        )}

        <FilterBar
          title="Exportar Reportes"
          fields={[
            {
              label: "Fecha Inicio",
              key: "fechaInicio",
              type: "date",
            },
            {
              label: "Fecha Fin",
              key: "fechaFin",
              type: "date",
            },
          ]}
          values={filtros}
          onChange={(newValues) =>
            setFiltros({
              ...filtros,
              ...newValues,
            })
          }
        >
          <div className="flex h-full items-end">
            <ExportButton
              type="excel"
              filtros={filtros}
              filename="reporte-visitas"
            />
          </div>
        </FilterBar>

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <VisitsTrendChart data={stats?.tendencia || []} />
            <VisitsByMonthChart data={stats?.visitasPorMes || []} />
            <VisitsByInspectorChart data={stats?.visitasPorInspector || []} />
            <VisitsByPeriodChart data={stats?.visitasPorPeriodo || []} />
          </div>
        )}
      </main>
    </div>
  );
}
