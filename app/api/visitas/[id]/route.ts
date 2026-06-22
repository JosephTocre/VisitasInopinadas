import { VisitaService } from "@/services/visita.service";
import { NextRequest, NextResponse } from "next/server";

const visitaService = new VisitaService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const visita = await visitaService.obtenerVisita(Number(id));
    if (!visita) {
      return NextResponse.json(
        { error: "Visita no encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json(visita);
  } catch (error) {
    console.error("ERROR DETALLADO:", error); // <-- ESTO TE DIRÁ QUÉ LÍNEA FALLA
    return NextResponse.json(
      { error: "Error al obtener la visita" },
      { status: 500 },
    );
  }
}
