import { NextResponse } from "next/server";
import { ControlMaterialService } from "@/services/controlMaterial.service";

const service = new ControlMaterialService();

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const idVisita = Number(id);

    if (isNaN(idVisita)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const result = await service.obtenerPorVisita(idVisita);

    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Error al obtener control material",
          detalle: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Error desconocido",
      },
      { status: 500 }
    );
  }
}