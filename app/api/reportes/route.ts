import { ReporteService } from "@/services/reporte.service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const reporteService = new ReporteService();

export async function GET(request: NextRequest) {
  // Verificar autorización
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      rol: string;
    };

    if (decoded.rol !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

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
