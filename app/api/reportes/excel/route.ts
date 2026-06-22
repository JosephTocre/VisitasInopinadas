import { ReporteService } from "@/services/reporte.service";
import { NextRequest, NextResponse } from "next/server";

const reporteService = new ReporteService();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const inicio = searchParams.get("inicio");
  const fin = searchParams.get("fin");

  try {
    // Si no hay fechas, pasamos null o undefined para obtener todo
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
      { error: "Error al generar el reporte" },
      { status: 500 },
    );
  }
}
