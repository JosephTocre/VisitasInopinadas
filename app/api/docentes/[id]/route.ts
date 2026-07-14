import { NextRequest, NextResponse } from "next/server";
import { DocenteService } from "@/services/docente.service";

const docenteService = new DocenteService();

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const docente = await docenteService.obtenerPorId(Number(id));

    if (!docente) {
      return NextResponse.json(
        { error: "Docente no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(docente);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener docente" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const docente = await docenteService.actualizarDocente(Number(id), {
      dni: body.dni,
      nombre_docente: body.nombre_docente,
      apellido_docente: body.apellido_docente,
      correo: body.correo,
      telefono: body.telefono,
    });

    return NextResponse.json(docente);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al actualizar docente" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await docenteService.eliminarDocente(Number(id));

    return NextResponse.json({
      mensaje: "Docente eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al eliminar docente" },
      { status: 500 },
    );
  }
}
