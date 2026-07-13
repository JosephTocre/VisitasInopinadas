import { prisma } from "@/lib/prisma";

export class ReporteRepository {
  async obtenerCantidadVisitas(where: any = {}) {
    return await prisma.hechoVisita.count({ where });
  }

  async obtenerCantidadVisitasPorDia(dias: number) {

    const fechaInicio = new Date();

    fechaInicio.setDate(
      fechaInicio.getDate() - dias + 1
    );

    fechaInicio.setHours(0, 0, 0, 0);


    const visitas = await prisma.hechoVisita.findMany({
      where: {
        fecha: {
          gte: fechaInicio
        }
      },
      select: {
        fecha: true
      }
    });


    const resultado: any = {};


    visitas.forEach(v => {

      const fecha = new Date(v.fecha);

      const dia =
        `${fecha.getDate()}/${fecha.getMonth() + 1}`;


      resultado[dia] =
        (resultado[dia] || 0) + 1;

    });


    const datos = [];


    for (let i = dias - 1; i >= 0; i--) {

      const fecha = new Date();

      fecha.setDate(
        fecha.getDate() - i
      );


      const dia =
        `${fecha.getDate()}/${fecha.getMonth() + 1}`;


      datos.push({
        name: dia,
        visitas: resultado[dia] || 0
      });

    }


    return datos;
  }
  
  async obtenerVisitasPorMes() {

    const visitas = await prisma.hechoVisita.findMany({
      select: {
        fecha: true,
      },
    });


    const conteoPorMes: Record<string, number> = {};


    visitas.forEach((v) => {

      const fecha = new Date(v.fecha);

      const mesAnio =
        `${fecha.getFullYear()}-${String(
          fecha.getMonth() + 1
        ).padStart(2, "0")}`;


      conteoPorMes[mesAnio] =
        (conteoPorMes[mesAnio] || 0) + 1;

    });


    return Object.entries(conteoPorMes)
      .map(([mes, visitas]) => ({
        mes,
        visitas,
      }))
      .sort((a, b) =>
        a.mes.localeCompare(b.mes)
      );
  }

  async obtenerVisitasPorInspector() {

    const resultado = await prisma.hechoVisita.groupBy({
      by: ["usuarioId"],
      _count: {
        id_visita: true,
      },
    });


    const usuarios = await prisma.usuario.findMany({
      where: {
        id_usuario: {
          in: resultado.map(r => r.usuarioId),
        },
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellidos: true,
      },
    });


    return resultado.map(r => {

      const usuario = usuarios.find(
        u => u.id_usuario === r.usuarioId
      );


      return {
        inspector: usuario
          ? `${usuario.nombre} ${usuario.apellidos}`
          : "Desconocido",

        _count: {
          id: r._count.id_visita,
        }
      };
    });
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
