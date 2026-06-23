import { prisma } from "@/lib/prisma";

export class ControlDocenteRepository {

  async obtenerPorVisita(idVisita: number) {
    return prisma.controlDocente.findUnique({
      where: {
        visitaId: idVisita,
      },
    });
  }

  async crear(datos: {
    nombre_docente: string;
    apellido_docente: string;
    actividad: string;
    presente: boolean;
    horario_programado: boolean;
    interaccion: boolean;
    observaciones?: string;
    visitaId: number;
  }) {
    return prisma.controlDocente.create({
      data: datos,
    });
  }

  async actualizar(
    idVisita: number,
    datos: Partial<{
      nombre_docente: string;
      apellido_docente: string;
      actividad: string;
      presente: boolean;
      horario_programado: boolean;
      interaccion: boolean;
      observaciones?: string;
    }>
  ) {
    return prisma.controlDocente.update({
      where: {
        visitaId: idVisita,
      },
      data: datos,
    });
  }
}