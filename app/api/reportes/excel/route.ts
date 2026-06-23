import { ReporteService } from "@/services/reporte.service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const reporteService = new ReporteService();

export async function GET(request: NextRequest) {
  // 1. Obtener token de cookies o headers
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1]; // Quita el "Bearer "

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // 2. Verificar token y rol
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { rol: string };

    if (decoded.rol !== "ADMIN") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const inicio = searchParams.get("inicio");
    const fin = searchParams.get("fin");

    // 3. Generar reporte
    const buffer = await reporteService.obtenerReporteExcel(
      inicio || "",
      fin || "",
    );

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="reporte_visitas_${inicio || "todos"}_${fin || "todos"}.xlsx"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 },
    );
  }
}
