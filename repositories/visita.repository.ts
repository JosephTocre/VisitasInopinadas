import { prisma } from "@/lib/prisma";

export class VisitaRepository {
  // Ahora pasamos la página y el tamaño como argumentos
  async obtenerTodas(page: number = 1, pageSize: number = 4, where: any = {}) {
    return await prisma.hechoVisita.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        controlDocente: true,
      },
      orderBy: {
        fecha: "desc",
      },
    });
  }

  // Método adicional para contar el total (útil para el frontend)
  async contar(where: any = {}) {
    return await prisma.hechoVisita.count({ where });
  }

  async obtenerPorId(id: number) {
    return await prisma.hechoVisita.findUnique({
      where: { id_visita: id },
      include: {
        controlDocente: true,
        controlMaterial: true,
        controlSilabo: true,
        controlEstudiante: true,
        controlGuia: true,
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
