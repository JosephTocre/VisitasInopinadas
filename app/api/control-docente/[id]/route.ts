import { NextRequest, NextResponse } from "next/server";
import { ControlDocenteService } from "@/services/controlDocente.service";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const controlService = new ControlDocenteService();

    const { id } = await context.params;
    const idVisita = Number(id);

    const body = await request.json();

    const resultado = await controlService.actualizarControl(
      idVisita,
      body
    );

    return NextResponse.json(resultado);
  } catch (error) {
    return NextResponse.json(
      {
        mensaje:
          error instanceof Error
            ? error.message
            : "Error al actualizar control docente",
      },
      { status: 500 }
    );
  }
}