import { ReporteService } from "@/services/reporte.service";
import { NextResponse } from "next/server";

const reporteService = new ReporteService();

export async function GET() {
  try {
    const stats = await reporteService.obtenerDashboard();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}