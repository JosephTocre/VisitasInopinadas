import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ControlGuiaRepository {
  async crear(data: Prisma.ControlGuiaUncheckedCreateInput) {
    return prisma.controlGuia.upsert({
      where: {
        visitaId: data.visitaId,
      },
      update: {
        tema_programado: data.tema_programado,
        logro: data.logro,
        rubrica: data.rubrica,
        observaciones: data.observaciones,
        requerimientos: data.requerimientos,
      },
      create: data,
    });
  }
  async obtenerPorVisita(visitaId: number) {
    return prisma.controlGuia.findFirst({
      where: { visitaId },
    });
  }

  async actualizarPorVisita(
    visitaId: number,
    data: Prisma.ControlGuiaUncheckedUpdateInput
  ) {
    return prisma.controlGuia.update({
      where: { visitaId },
      data,
    });
  }
}