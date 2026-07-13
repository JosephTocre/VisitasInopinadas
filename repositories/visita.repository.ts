import { prisma } from "@/lib/prisma";

export class VisitaRepository {
  // Ahora pasamos la página y el tamaño como argumentos
  async obtenerTodas(page: number = 1, pageSize: number = 4, where: any = {}) {
    try {
      return await prisma.hechoVisita.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          sede: {
            select: {
              nombre: true,
            },
          },
          curso: {
            select: {
              nombre: true,
            },
          },
          controlDocente: {
            include: {
              docente: {
                select: {
                  nombre_docente: true,
                  apellido_docente: true,
                },
              },
            },
          },
          usuario: {
            select: {
              nombre: true,
              apellidos: true,
            },
          },
        },
        orderBy: {
          fecha: "desc",
        },
      });
    } catch (error) {
      console.error("PRISMA ERROR:", error);
      throw error;
    }
  }

  // Método adicional para contar el total (útil para el frontend)
  async contar(where: any = {}) {
    return await prisma.hechoVisita.count({ where });
  }

  async obtenerPorId(id: number) {
    return await prisma.hechoVisita.findUnique({
      where: { id_visita: id },
      include: {
        controlDocente: {
          include: {
            docente: {
              select: {
                nombre_docente: true,
                apellido_docente: true,
              },
            },
          },
        },
        controlMaterial: true,
        controlSilabo: true,
        controlEstudiante: true,
        controlGuia: true,
        usuario: {
          select: { nombre: true, apellidos: true },
        },
      },
    });
  }

  async obtenerSedes(filters: any = {}) {
    return await prisma.sede.findMany({
      select: {
        nombre: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });
  }

  async obtenerCursos(filters: any = {}) {
    return await prisma.curso.findMany({
      select: {
        nombre: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });
  }

  async crear(datos: any) {
    return await prisma.hechoVisita.create({ data: datos });
  }

  async actualizar(id: number, datos: any) {
    return await prisma.hechoVisita.update({
      where: { id_visita: id },
      data: datos,
    });
  }

  async eliminar(id: number) {
    return await prisma.hechoVisita.delete({
      where: { id_visita: id },
    });
  }
}
