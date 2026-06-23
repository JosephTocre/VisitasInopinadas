import { ReporteRepository } from "@/repositories/reporte.repository";
import { VisitaRepository } from "@/repositories/visita.repository"; // Importa este
import ExcelJS from "exceljs";

export class ReporteService {
  private reporteRepository = new ReporteRepository();
  private visitaRepository = new VisitaRepository();

  async obtenerDashboard() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [visitasHoy, visitasCompletadas, inspectoresActivos, tendencia] =
      await Promise.all([
        this.reporteRepository.obtenerCantidadVisitas({
          fecha: { gte: today },
        }),
        this.reporteRepository.obtenerCantidadVisitas(),
        this.reporteRepository.obtenerInspectoresCount(),
        this.reporteRepository.obtenerCantidadVisitasPorDia(7),
      ]);

    return {
      visitasHoy,
      visitantesActivos: inspectoresActivos,
      visitasCompletadas,
      tendencia,
    };
  }

  async obtenerVisitasPorMes() {
    return await this.reporteRepository.obtenerVisitasPorMes();
  }

  async obtenerVisitasPorInspector() {
    return await this.reporteRepository.obtenerVisitasPorInspector();
  }

  async obtenerVisitasPorPeriodo() {
    return await this.reporteRepository.obtenerVisitasPorPeriodo();
  }

  async obtenerReporteExcel(fechaInicio: string, fechaFin: string) {
    // 1. Obtener datos usando un método que filtre por fecha
    // Ajustamos la query para obtener TODAS las visitas en el rango
    let where = {};

    if (fechaInicio && fechaFin) {
      where = {
        fecha: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin),
        },
      };
    }
    // Obtenemos todos los registros (sin paginación para el reporte)
    const visitas = await this.visitaRepository.obtenerTodas(1, 10000, where);

    // 2. Crear libro de trabajo
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Visitas");

    // 3. Definir columnas
    worksheet.columns = [
      { header: "ID Visita", key: "id", width: 10 },
      { header: "Inspector", key: "inspector", width: 25 },
      { header: "Fecha", key: "fecha", width: 15 },
      { header: "Hora Inicio", key: "hInicio", width: 15 },
      { header: "Hora Término", key: "hTermino", width: 15 },
      { header: "Sede", key: "sede", width: 20 },
      { header: "Lugar", key: "lugar", width: 20 },
      { header: "Curso", key: "curso", width: 20 },
      { header: "Campo Formativo", key: "campo", width: 20 },
      { header: "Ciclo", key: "ciclo", width: 15 },
      { header: "Turno", key: "turno", width: 15 },
      { header: "Semana", key: "semana", width: 10 },
      { header: "Hora P/T", key: "horaPT", width: 15 },
      // { header: "Requerimientos", key: "req", width: 30 },
    ];

    // 4. Agregar filas
    visitas.forEach((v: any) => {
      worksheet.addRow({
        id: v.id_visita,
        inspector: v.usuario
          ? `${v.usuario.nombre} ${v.usuario.apellidos}`
          : "N/A",
        fecha: new Date(v.fecha).toLocaleDateString(),
        hInicio: new Date(v.hora_inicio).toLocaleTimeString(),
        hTermino: new Date(v.hora_termino).toLocaleTimeString(),
        sede: v.sede,
        lugar: v.lugar,
        curso: v.curso,
        campo: v.campo_formativo,
        ciclo: v.ciclo,
        turno: v.turno,
        semana: v.n_semana,
        horaPT: v.hora_practica_teoria,
        // req: v.requerimientos,
      });
    });

    // 5. Retornar buffer
    return await workbook.xlsx.writeBuffer();
  }
}
