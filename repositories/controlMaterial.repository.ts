import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ControlMaterialRepository {

  async crear(
    datos: Prisma.ControlMaterialUncheckedCreateInput
  ) {
    return prisma.controlMaterial.create({
      data: datos,
    });
  }

  async obtenerPorVisita(idVisita: number) {
    return prisma.controlMaterial.findFirst({
      where: { visitaId: idVisita },
    });
  }

  async actualizar(
    id: number,
    datos: Prisma.ControlMaterialUncheckedUpdateInput
  ) {
    return prisma.controlMaterial.update({
      where: {
        id_control_material: id,
      },
      data: datos,
    });
  }
}