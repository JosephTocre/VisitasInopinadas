import { prisma } from "@/lib/prisma";

export class VisitaRepository {
  async obtenerTodas(where: any = {}) {
    return await prisma.hechoVisita.findMany({
      where,
      include: {
        controlDocente: true,
      },
      orderBy: {
        fecha: "desc",
      },
    });
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
