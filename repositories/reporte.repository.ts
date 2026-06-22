import { prisma } from "@/lib/prisma";

export class ReporteRepository {

  async obtenerCantidadVisitas(where: any = {}) {
    return await prisma.hechoVisita.count({ where });
  }

  async obtenerCantidadVisitasPorDia(dias: number) {
    const resultados = [];
    for (let i = dias - 1; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      fecha.setHours(0, 0, 0, 0);

      const fin = new Date(fecha);
      fin.setHours(23, 59, 59, 999);

      const count = await prisma.hechoVisita.count({
        where: {
          fecha: {
            gte: fecha,
            lte: fin,
          },
        },
      });

      resultados.push({
        name: `${fecha.getDate()}/${fecha.getMonth() + 1}`,
        visitas: count,
      });
    }
    return resultados;
  }

  async obtenerVisitasPorMes() {
    // Ejemplo de consulta de agrupamiento
    return await prisma.hechoVisita.groupBy({
      by: ['fecha'],
      _count: true,
    });
  }

  async obtenerVisitasPorInspector() {
    return await prisma.hechoVisita.groupBy({
      by: ['usuarioId'],
      _count: true,
    });
  }

  async obtenerInspectoresCount() {
    return await prisma.usuario.count({
      where: { rol: "INSPECTOR" },
    });
  }

  async obtenerVisitasPorCiclo() {
    return await prisma.hechoVisita.groupBy({
      by: ["ciclo"],
      _count: {
        id_visita: true,
      },
    });
  }
}

