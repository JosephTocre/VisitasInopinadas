import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class DocenteRepository {
  async obtenerTodos() {
    return prisma.docente.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        apellido_docente: "asc",
      },
    });
  }

  async obtenerPorId(id: number) {
    return prisma.docente.findUnique({
      where: {
        id_docente: id,
      },
    });
  }

  async crear(datos: Prisma.DocenteCreateInput) {
    return prisma.docente.create({
      data: datos,
    });
  }

  async editar(
    id: number,
    datos: Prisma.DocenteUpdateInput,
  ) {
    return prisma.docente.update({
      where: {
        id_docente: id,
      },
      data: datos,
    });
  }

  // Eliminación lógica
  async eliminar(id: number) {
    return prisma.docente.update({
      where: {
        id_docente: id,
      },
      data: {
        is_active: false,
      },
    });
  }
}