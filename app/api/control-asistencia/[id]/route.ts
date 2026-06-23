import { NextRequest, NextResponse } from "next/server";
import { ControlAsistenciaService } from "@/services/controlAsistencia.service";

const service = new ControlAsistenciaService();

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const visitaId = Number(id);

    if (isNaN(visitaId)) {
      return NextResponse.json(
        { mensaje: "visitaId inválido en API" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const resultado = await service.registrarControlAsistencia({
      ...body,
      visitaId,
    });

    return NextResponse.json({
      mensaje: "OK",
      data: resultado,
    });
  } catch (error) {
    return NextResponse.json(
      {
        mensaje: "Error al actualizar control asistencia",
        detalle: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}