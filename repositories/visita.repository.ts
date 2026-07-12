import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class VisitaRepository {
  async obtenerTodas(page: number = 1, pageSize: number = 15, where: any = {}) {
    try {
      return await prisma.hechoVisita.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          sede: { select: { nombre: true } },
          curso: { select: { nombre: true } },
          controlDocente: { include: { docente: true } },
          controlMaterial: true,
          controlSilabo: true,
          controlEstudiante: true,
          controlGuia: true,
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
        sede: { select: { nombre: true } },
        curso: { select: { nombre: true } },
        controlDocente: { include: { docente: true } },
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

  async obtenerSedes(where: any = {}) {
    return prisma.sede.findMany({
      where: { visitas: where },
      select: {
        nombre: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });
  }

  async obtenerCursos(where: any = {}) {
    return prisma.curso.findMany({
      where: { visitas: where },
      select: {
        nombre: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });
  }

  async crear(datos: Prisma.HechoVisitaUncheckedCreateInput) {
    return prisma.hechoVisita.create({
      data: datos,
    });
  }

  async actualizar(id: number, datos: Prisma.HechoVisitaUncheckedUpdateInput) {
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
