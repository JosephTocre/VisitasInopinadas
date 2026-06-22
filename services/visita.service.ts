import { VisitaRepository } from "@/repositories/visita.repository";

export class VisitaService {
  private repository = new VisitaRepository();

  async obtenerHistorial(
    filters: {
      ciclo?: string;
      docente?: string;
      id_inspector?: number;
      rol?: string;
    },
    page: number = 1,
    pageSize: number = 4,
  ) {
    const where: any = {};

    // Filtro por ciclo
    if (filters.ciclo && filters.ciclo !== "todos") {
      where.ciclo = filters.ciclo;
    }

    // Filtro por docente
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

    // Filtro por usuario (solo si es INSPECTOR)
    if (filters.rol === "INSPECTOR" && filters.id_inspector) {
      where.usuarioId = filters.id_inspector;
    }

    // El ADMIN al no tener usuarioId en el 'where', verá todos los registros automáticamente

    // Ejecutamos ambos en paralelo para mayor eficiencia
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
}
