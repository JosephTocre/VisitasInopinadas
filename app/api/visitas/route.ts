import { VisitaService } from "@/services/visita.service";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const visitaService = new VisitaService();

export async function GET(request: NextRequest) {
  // 1. Obtener token de cookies o headers
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1]; // Quita el "Bearer "

  if (!token)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  // 2. Decodificar el token (asegúrate de usar la misma clave secreta)
  const decoded: any = verify(token, process.env.JWT_SECRET!);
  const idUsuario = decoded.id;
  const rol = decoded.rol;

  const { searchParams } = new URL(request.url);

  const filters = {
    periodo: searchParams.get("periodo") || undefined,
    docente: searchParams.get("docente") || undefined,
    id_inspector: idUsuario, // Enviamos el ID siempre
    rol: rol, // Enviamos el rol para que el servicio decida
  };

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "4");

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
