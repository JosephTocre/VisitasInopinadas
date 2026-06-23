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
    const visitas = await prisma.hechoVisita.findMany({
      select: { fecha: true },
    });

    const conteoPorMes: Record<string, number> = {};

    visitas.forEach((v) => {
      const fecha = new Date(v.fecha);
      const mesAnio = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
      conteoPorMes[mesAnio] = (conteoPorMes[mesAnio] || 0) + 1;
    });

    return Object.entries(conteoPorMes)
      .map(([mes, count]) => ({
        mes,
        visitas: count,
      }))
      .sort((a, b) => a.mes.localeCompare(b.mes));
  }

  async obtenerVisitasPorInspector() {
    const visitas = await prisma.hechoVisita.findMany({
      include: {
        usuario: {
          select: { nombre: true, apellidos: true },
        },
      },
    });

    const conteoPorInspector: Record<string, number> = {};

    visitas.forEach((v) => {
      const nombreCompleto = v.usuario
        ? `${v.usuario.nombre} ${v.usuario.apellidos}`
        : "Desconocido";
      conteoPorInspector[nombreCompleto] =
        (conteoPorInspector[nombreCompleto] || 0) + 1;
    });

    return Object.entries(conteoPorInspector).map(([nombre, count]) => ({
      inspector: nombre,
      _count: { id: count },
    }));
  }

  async obtenerInspectoresCount() {
    return await prisma.usuario.count({
      where: { rol: "INSPECTOR" },
    });
  }

  async obtenerVisitasPorPeriodo() {
    const visitas = await prisma.hechoVisita.findMany({
      select: {
        id_visita: true,
        fecha: true,
      },
    });

    const conteoPorPeriodo: Record<string, number> = {};

    visitas.forEach((v) => {
      const fecha = new Date(v.fecha);
      let periodo = "Desconocido";

      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();

      if (anio === 2025) {
        if (anio === 2025) {
          if (mes >= 1 && mes <= 2) periodo = "2025-verano";
          else if (mes >= 3 && mes <= 7) periodo = "2025-1";
          else if (mes >= 8 && mes <= 12) periodo = "2025-2";
        }
      } else if (anio === 2026) {
        if (mes >= 1 && mes <= 2) periodo = "2026-verano";
        else if (mes >= 3 && mes <= 7) periodo = "2026-1";
        else if (mes >= 8 && mes <= 12) periodo = "2026-2";
      }

      conteoPorPeriodo[periodo] = (conteoPorPeriodo[periodo] || 0) + 1;
    });

    return Object.entries(conteoPorPeriodo).map(([periodo, count]) => ({
      periodo,
      _count: { id_visita: count },
    }));
  }
}
