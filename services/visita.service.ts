import { VisitaRepository } from "@/repositories/visita.repository";

export class VisitaService {
  private repository = new VisitaRepository();

  async obtenerHistorial(filters: { ciclo?: string; docente?: string }) {
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
    return await this.repository.obtenerTodas(where);
  }

  async obtenerVisita(id: number) {
    return await this.repository.obtenerPorId(id);
  }

  async registrarVisita(datos: any) {
    return await this.repository.crear(datos);
  }
}
