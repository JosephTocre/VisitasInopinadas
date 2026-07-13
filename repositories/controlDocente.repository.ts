import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ControlDocenteRepository {

  async obtenerPorVisita(idVisita: number) {
    return prisma.controlDocente.findUnique({
      where: {
        visitaId: idVisita,
      },
      include: {
        docente: true,
      },
    });
  }


  async crear(datos: Prisma.ControlDocenteUncheckedCreateInput) {
    return prisma.controlDocente.create({
      data: datos,
    });
  }


  async actualizar(
    idVisita: number,
    datos: Prisma.ControlDocenteUncheckedUpdateInput
  ) {
    return prisma.controlDocente.update({
      where: {
        visitaId: idVisita,
      },
      data: datos,
    });
  }
}