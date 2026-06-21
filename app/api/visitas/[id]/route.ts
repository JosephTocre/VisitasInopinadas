import { VisitaService } from "@/services/visita.service";
import { ControlVisitaService } from "@/services/controlVisita.service";
import { NextRequest, NextResponse } from "next/server";

const visitaService = new VisitaService();
const controlVisitaService = new ControlVisitaService();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const visita = await visitaService.obtenerVisita(Number(params.id));

    if (!visita) {
      return NextResponse.json(
        { error: "Visita no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(visita);
  } catch (error) {
    console.error("ERROR DETALLADO:", error);

    return NextResponse.json(
      { error: "Error al obtener la visita" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const body = await request.json();

  const controlVisita = await controlVisitaService.actualizarVisita(
    Number(id),
    body
  );

  return NextResponse.json(controlVisita);
}