import { VisitaService } from "@/services/visita.service";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { ControlVisitaService } from "@/services/controlVisita.service";

const visitaService = new VisitaService();
const controlVisitaService = new ControlVisitaService();

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const decoded: any = verify(token, process.env.JWT_SECRET!);
  const idUsuario = decoded.id;
  const rol = decoded.rol;

  const { searchParams } = new URL(request.url);

  const filters = {
    fechaInicio: searchParams.get("fechaInicio") || undefined,
    fechaFin: searchParams.get("fechaFin") || undefined,
    docente: searchParams.get("docente") || undefined,
    id_inspector: idUsuario,
    rol: rol,
  };

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "15");

  try {
    const visitas = await visitaService.obtenerHistorial(
      filters,
      page,
      pageSize,
    );
    return NextResponse.json(visitas);
  } catch (error) {
    console.error("ERROR GET VISITAS:", error);
    return NextResponse.json(
      {
        error: "Error al obtener las visitas",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded: any = verify(token, process.env.JWT_SECRET!);
    const idUsuario = decoded.id;

    const body = await request.json();

    const visita = await controlVisitaService.crearVisita({
      ...body,
      id_inspector: idUsuario,
    });

    return NextResponse.json({
      id_visita: visita.id_visita,
      mensaje: "Visita creada correctamente",
    });
  } catch (error) {
    console.error("ERROR CREANDO VISITA:", error);

    return NextResponse.json(
      {
        error: "Error al crear visita",
        detalle: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
