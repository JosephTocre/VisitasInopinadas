import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class VisitaRepository {
  // Ahora pasamos la página y el tamaño como argumentos
  async obtenerTodas(page: number = 1, pageSize: number = 4, where: any = {}) {
    try {
      return await prisma.hechoVisita.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          controlDocente: true,
          usuario: {
            select: { nombre: true, apellidos: true },
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

  async contar(where: Prisma.HechoVisitaWhereInput = {}) {
    return prisma.hechoVisita.count({ where });
  }

  async obtenerPorId(id: number) {
    return prisma.hechoVisita.findUnique({
      where: { id_visita: id },
      include: {
        controlDocente: true,
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

  async crear(datos: Prisma.HechoVisitaUncheckedCreateInput) {
    return prisma.hechoVisita.create({
      data: datos,
    });
  }

  async actualizar(
    id: number,
    datos: Prisma.HechoVisitaUncheckedUpdateInput
  ) {
    return prisma.hechoVisita.update({
      where: { id_visita: id },
      data: datos,
    });
  }

  async eliminar(id: number) {
    return prisma.hechoVisita.delete({
      where: { id_visita: id },
    });
  }
}