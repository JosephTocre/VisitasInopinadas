import { NextRequest, NextResponse } from "next/server";
import { DocenteService } from "@/services/docente.service";

const docenteService = new DocenteService();

export async function GET() {
  try {
    const docentes = await docenteService.obtenerTodos();
    return NextResponse.json(docentes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener docentes" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const docente = await docenteService.registrarDocente({
      nombre_docente: body.nombre_docente,
      apellido_docente: body.apellido_docente,
    });

    return NextResponse.json(docente, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al registrar docente" },
      { status: 500 },
    );
  }
}