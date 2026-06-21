import { VisitaRepository } from "@/repositories/visita.repository";

export class VisitaService {
  private repository = new VisitaRepository();

  async obtenerHistorial(
    filters: { ciclo?: string; docente?: string },
    page: number = 1,
    pageSize: number = 4,
  ) {
    const where: any = {};
    if (filters.ciclo && filters.ciclo !== "todos") {
      where.ciclo = filters.ciclo;
    }
    if (filters.docente) {
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

    // Ejecutamos ambos en paralelo para mayor eficiencia
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

  async registrarVisita(datos: any) {
    return await this.repository.crear(datos);
  }
}
