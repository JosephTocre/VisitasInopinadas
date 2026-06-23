import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ControlSilaboRepository {

  async crear(data: Prisma.ControlSilaboUncheckedCreateInput) {
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

  async actualizar(
    id: number,
    data: Prisma.ControlSilaboUncheckedUpdateInput
  ) {
    return prisma.controlSilabo.update({
      where: {
        id_control_silabo: id,
      },
      data,
    });
  }
}