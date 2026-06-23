import { NextResponse } from "next/server";
import { ControlGuiaService } from "@/services/controlGuia.service";

const service = new ControlGuiaService();

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const idVisita = Number(id);

    const data = await service.obtenerPorVisita(idVisita);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al obtener control guía",
        detalle: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const idVisita = Number(id);

    const body = await req.json();

    const updated = await service.actualizarPorVisita(idVisita, body);

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al actualizar control guía",
        detalle: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}