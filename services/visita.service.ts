import { VisitaRepository } from "@/repositories/visita.repository";

export class VisitaService {
  private repository = new VisitaRepository();

  async obtenerHistorial(
    filters: {
      periodo?: string;
      docente?: string;
      sede?: string;
      curso?: string;
      id_inspector?: number;
      rol?: string;
    },
    page: number = 1,
    pageSize: number = 15,
  ) {
    const where: any = {};

    if (filters.periodo && filters.periodo !== "todos") {
      let gte: Date;
      let lte: Date;

      if (filters.periodo === "2025-verano") {
        gte = new Date("2025-01-01T00:00:00Z");
        lte = new Date("2025-02-28T23:59:59Z");
      } else if (filters.periodo === "2026-verano") {
        gte = new Date("2026-01-01T00:00:00Z");
        lte = new Date("2026-02-28T23:59:59Z");
      } else if (filters.periodo === "2026-1") {
        gte = new Date("2026-03-01T00:00:00Z");
        lte = new Date("2026-07-31T23:59:59Z");
      } else if (filters.periodo === "2026-2") {
        gte = new Date("2026-08-01T00:00:00Z");
        lte = new Date("2026-12-31T23:59:59Z");
      } else if (filters.periodo === "2025-1") {
        gte = new Date("2025-03-01T00:00:00Z");
        lte = new Date("2025-07-31T23:59:59Z");
      } else if (filters.periodo === "2025-2") {
        gte = new Date("2025-08-01T00:00:00Z");
        lte = new Date("2025-12-31T23:59:59Z");
      } else {
        gte = new Date("1900-01-01");
        lte = new Date("2100-12-31");
      }

      where.fecha = {
        gte,
        lte,
      };
    }

    if (filters.docente && filters.docente.trim() !== "") {
      where.controlDocente = {
        OR: [
          {
            nombre_docente: { contains: filters.docente, mode: "insensitive" },
          },
          {
            apellido_docente: {
              contains: filters.docente,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    if (filters.sede && filters.sede !== "todos") {
      where.sede = filters.sede;
    }

    if (filters.curso && filters.curso !== "todos") {
      where.curso = filters.curso;
    }


    if (filters.rol === "INSPECTOR" && filters.id_inspector) {
      where.usuarioId = filters.id_inspector;
    }

    const [data, total] = await Promise.all([
      this.repository.obtenerTodas(page, pageSize, where),
      this.repository.contar(where),
    ]);

    return {
      data,
      meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    };
  }

  async obtenerVisita(id: number) {
    return await this.repository.obtenerPorId(id);
  }

  async registrarVisita(datos: any) {
    return await this.repository.crear(datos);
  }

  async obtenerSedes(where: any = {}) {
    return this.repository.obtenerSedes(where);
  }

  async obtenerCursos(where: any = {}) {
    return this.repository.obtenerCursos(where);
  }

  async obtenerFiltros(periodo?: string) {
    const where: any = {};

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
      } else {
        gte = new Date("2025-08-01T00:00:00Z");
        lte = new Date("2025-12-31T23:59:59Z");
      }

      where.fecha = {
        gte,
        lte,
      };
    }

    const [sedes, cursos] = await Promise.all([
      this.repository.obtenerSedes(where),
      this.repository.obtenerCursos(where),
    ]);

    return { sedes, cursos };
  }
}