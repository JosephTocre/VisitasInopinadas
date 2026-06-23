import { ReporteService } from "@/services/reporte.service";
import { NextResponse } from "next/server";

const reporteService = new ReporteService();

export async function GET() {
  try {
    const [stats, visitasPorMes, visitasPorInspector, visitasPorPeriodo] =
      await Promise.all([
        reporteService.obtenerDashboard(),
        reporteService.obtenerVisitasPorMes(),
        reporteService.obtenerVisitasPorInspector(),
        reporteService.obtenerVisitasPorPeriodo(),
      ]);

    return NextResponse.json({
      ...stats,
      visitasPorMes,
      visitasPorInspector,
      visitasPorPeriodo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 },
    );
  }
}
