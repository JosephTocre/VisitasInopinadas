"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { DashboardCard } from "@/components/ui/DashboardCard";
import AdminSidebar from "@/components/AdminSidebar";
import { useState, useEffect } from "react";
import { ExportButton } from "@/components/ExportButton";
import { FilterBar } from "@/components/ui/FilterBar";
import { VisitsTrendChart } from "@/components/ui/StatsCharts";

export default function ReportesPage() {
  const [stats, setStats] = useState<{
    visitasHoy: number;
    visitantesActivos: number;
    visitasCompletadas: number;
    tendencia: { name: string; visitas: number }[];
  }>({
    visitasHoy: 0,
    visitantesActivos: 0,
    visitasCompletadas: 0,
    tendencia: [],
  });
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    ciclo: "todos",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/reportes");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="p-8 w-full bg-[#eaeaea]">
        <PageHeader
          title="Reportes y Estadísticas"
          description="Visualiza el desempeño y las métricas detalladas de las visitas realizadas."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Visitas del día"
            value={stats.visitasHoy}
            icon="📅"
          />
          <DashboardCard
            title="Visitantes activos"
            value={stats.visitantesActivos}
            icon="👤"
          />
          <DashboardCard
            title="Visitas completadas"
            value={stats.visitasCompletadas}
            icon="✅"
          />
        </div>

        <FilterBar
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
        
        <div className="flex flex-col md:flex-row gap-6">
          <VisitsTrendChart data={stats.tendencia || []} />
          {/* Aquí podrías agregar otro gráfico si lo deseas */}
        </div>
      </main>
    </div>
  );
}
