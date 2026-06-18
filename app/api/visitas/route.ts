import { VisitaService } from "@/services/visita.service";
import { NextRequest, NextResponse } from "next/server";

const visitaService = new VisitaService();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filters = {
    ciclo: searchParams.get("ciclo") || undefined,
    docente: searchParams.get("docente") || undefined,
  };

  try {
    const visitas = await visitaService.obtenerHistorial(filters);
    return NextResponse.json(visitas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las visitas" },
      { status: 500 },
    );
  }
}
