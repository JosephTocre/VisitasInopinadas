import { VisitaRepository } from "@/repositories/visita.repository";
import { Prisma } from "@prisma/client";

interface VisitaFilters {
  ciclo?: string;
  docente?: string;
  id_inspector?: number;
  rol?: string;
}

export class VisitaService {
  private repository = new VisitaRepository();

  async obtenerHistorial(
    filters: VisitaFilters,
    page: number = 1,
    pageSize: number = 4,
  ) {
    const where: Prisma.HechoVisitaWhereInput = {};

    if (filters.ciclo && filters.ciclo !== "todos") {
      where.ciclo = filters.ciclo;
    }

    if (filters.docente) {
      where.controlDocente = {
        OR: [
          {
            nombre_docente: {
              contains: filters.docente,
              mode: "insensitive",
            },
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

    if (filters.rol === "INSPECTOR" && filters.id_inspector) {
      where.usuarioId = filters.id_inspector;
    }

    const [data, total] = await Promise.all([
      this.repository.obtenerTodas(page, pageSize, where),
      this.repository.contar(where),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async obtenerVisita(id: number) {
    return await this.repository.obtenerPorId(id);
  }

  async registrarVisita(datos: Prisma.HechoVisitaUncheckedCreateInput) {
    return await this.repository.crear(datos);
  }
}