import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class VisitaRepository {

  async crear(data: Prisma.HechoVisitaUncheckedCreateInput) {
    return prisma.hechoVisita.create({
      data,
    });
  }

  async actualizar(
    id: number,
    data: Prisma.HechoVisitaUncheckedUpdateInput
  ) {
    return prisma.hechoVisita.update({
      where: {
        id_visita: id,
      },
      data,
    });
  }
}