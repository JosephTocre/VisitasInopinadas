import { VisitaService } from "@/services/visita.service";
import { NextRequest, NextResponse } from "next/server";

const visitaService = new VisitaService();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filters = {
    ciclo: searchParams.get("ciclo") || undefined,
    docente: searchParams.get("docente") || undefined,
  };

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "4");

  try {
    const visitas = await visitaService.obtenerHistorial(
      filters,
      page,
      pageSize,
    );
    return NextResponse.json(visitas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las visitas" },
      { status: 500 },
    );
  }
}
