import { prisma } from "@/lib/prisma";

export class ControlSilaboRepository {

  async crear(data: any) {
    return prisma.controlSilabo.create({
      data,
    });
  }

  async obtenerPorVisita(visitaId: number) {
    if (!visitaId || isNaN(visitaId)) {
      throw new Error("visitaId inválido");
    }

    return prisma.controlSilabo.findUnique({
      where: {
        visitaId: Number(visitaId),
      },
    });
  }

  async actualizar(id: number, data: any) {
    return prisma.controlSilabo.update({
      where: {
        id_control_silabo: id,
      },
      data,
    });
  }
}