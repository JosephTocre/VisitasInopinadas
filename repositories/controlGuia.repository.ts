import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class ControlGuiaRepository {
  async crear(data: Prisma.ControlGuiaUncheckedCreateInput) {
    return await prisma.controlGuia.create({
      data,
    });
  }
}