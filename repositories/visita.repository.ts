import { prisma } from "@/lib/prisma";

export class VisitaRepository {

  async obtenerTodas(
    page: number = 1,
    pageSize: number = 15,
    where: any = {}
  ) {
    try {
      return await prisma.hechoVisita.findMany({
        where,

        take: pageSize,

        skip: (page - 1) * pageSize,

        select: {
          id_visita: true,
          fecha: true,

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

          usuario: {
            select: {
              nombre: true,
              apellidos: true,
            },
          },

          controlDocente: {
            select: {
              docente: {
                select: {
                  nombre_docente: true,
                  apellido_docente: true,
                },
              },
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


  async contar(where: any = {}) {
    return await prisma.hechoVisita.count({
      where,
    });
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

  async obtenerSedes() {
    return await prisma.sede.findMany({
      where: {
        is_active: true
      },
      select: {
        id_sede: true,
        nombre: true
      },
      orderBy: {
        nombre: "asc"
      }
    });
  }

  async obtenerCursos() {
    return await prisma.curso.findMany({
      where: {
        is_active: true
      },
      select: {
        id_curso: true,
        nombre: true
      },
      orderBy: {
        nombre: "asc"
      }
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
