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
    periodo: searchParams.get("periodo") || undefined,
    docente: searchParams.get("docente") || undefined,
    sede: searchParams.get("sede") || undefined,
    curso: searchParams.get("curso") || undefined,
    id_inspector: idUsuario,
    rol: rol,
  };

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "15");

  const mode = searchParams.get("mode");
  if (mode === "filtros") {
    const periodo = searchParams.get("periodo") || undefined;
    const sede = searchParams.get("sede") || undefined;
    const curso = searchParams.get("curso") || undefined;

    const filters: any = {};

    if (rol === "INSPECTOR" && idUsuario) {
      filters.usuarioId = idUsuario;
    }

    if (periodo && periodo !== "todos") {
      let gte: Date;
      let lte: Date;

      if (periodo === "2025-verano") {
        gte = new Date("2025-01-01T00:00:00Z");
        lte = new Date("2025-02-28T23:59:59Z");
      } else if (periodo === "2026-verano") {
        gte = new Date("2026-01-01T00:00:00Z");
        lte = new Date("2026-02-28T23:59:59Z");
      } else if (periodo === "2026-1") {
        gte = new Date("2026-03-01T00:00:00Z");
        lte = new Date("2026-07-31T23:59:59Z");
      } else if (periodo === "2026-2") {
        gte = new Date("2026-08-01T00:00:00Z");
        lte = new Date("2026-12-31T23:59:59Z");
      } else if (periodo === "2025-1") {
        gte = new Date("2025-03-01T00:00:00Z");
        lte = new Date("2025-07-31T23:59:59Z");
      } else if (periodo === "2025-2") {
        gte = new Date("2025-08-01T00:00:00Z");
        lte = new Date("2025-12-31T23:59:59Z");
      } else {
        gte = new Date("1900-01-01");
        lte = new Date("2100-12-31");
      }

      filters.fecha = { gte, lte };
    }

    if (sede && sede !== "todos") {
      filters.sede = { nombre: sede };
    }

    if (curso && curso !== "todos") {
      filters.curso = { nombre: curso };
    }

    const [sedes, cursos] = await Promise.all([
      visitaService.obtenerSedes(filters),
      visitaService.obtenerCursos(filters),
    ]);

    return NextResponse.json({
      sedes: sedes.map((s: any) => s.nombre),
      cursos: cursos.map((c: any) => c.nombre),
    });
  }

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
