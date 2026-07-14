import { VisitaRepository } from "@/repositories/visita.repository";

export class VisitaService {
  private repository = new VisitaRepository();

  async obtenerHistorial(
    filters: {
      fechaInicio?: string;
      fechaFin?: string;
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

    // Filtro por rango de fechas
    if (filters.fechaInicio || filters.fechaFin) {
      where.fecha = {};
      if (filters.fechaInicio) {
        where.fecha.gte = new Date(`${filters.fechaInicio}T00:00:00Z`);
      }
      if (filters.fechaFin) {
        where.fecha.lte = new Date(`${filters.fechaFin}T23:59:59Z`);
      }
    }
    // Filtro por docente
    if (filters.docente && filters.docente.trim() !== "") {
      where.controlDocente = {
        docente: {
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
        },
      };
    }

    // Filtro por sede
    if (filters.sede && filters.sede !== "todos") {
      where.sede = {
        nombre: filters.sede,
      };
    }

    // Filtro por curso
    if (filters.curso && filters.curso !== "todos") {
      where.curso = {
        nombre: filters.curso,
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
  async obtenerSedes(filters: any = {}) {
    return await this.repository.obtenerSedes(filters);
  }

  async obtenerCursos(filters: any = {}) {
    return await this.repository.obtenerCursos(filters);
  }

  async obtenerVisita(id: number) {
    return await this.repository.obtenerPorId(id);
  }

  async registrarVisita(datos: any) {
    return await this.repository.crear(datos);
  }
}
