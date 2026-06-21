import { prisma } from "@/lib/prisma";

export class ControlGuiaRepository {
  async crear(data: any) {
    return await prisma.controlGuia.create({
      data: {
        tema_programado: data.guia1,
        logro: data.guia2,
        rubrica: data.guia3,
        observaciones: data.observacionesGuia,
        visitaId: data.visitaId,
      },
    });
  }
}