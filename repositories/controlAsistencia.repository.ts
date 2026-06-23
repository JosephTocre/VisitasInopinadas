import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ControlAsistenciaRepository {

  async obtenerPorVisita(visitaId: number) {
    return prisma.controlEstudiante.findUnique({
      where: { visitaId },
    });
  }

  async crear(data: Prisma.ControlEstudianteUncheckedCreateInput) {
    return prisma.controlEstudiante.create({ data });
  }

  async actualizarPorVisita(
    visitaId: number,
    data: Prisma.ControlEstudianteUncheckedUpdateInput
  ) {
    return prisma.controlEstudiante.update({
      where: { visitaId },
      data,
    });
  }

  async upsert(
    visitaId: number,
    data: Prisma.ControlEstudianteUncheckedCreateInput
  ) {
    return prisma.controlEstudiante.upsert({
      where: { visitaId },
      create: data,
      update: data,
    });
  }
}