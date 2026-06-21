import { ControlDocenteRepository } from "@/repositories/controlDocente.repository";

export class ControlDocenteService {

  private repo = new ControlDocenteRepository();

  async registrarControl(datos) {
    const existe = await this.repo.obtenerPorVisita(datos.visitaId);

    const data = {
      nombre_docente: datos.nombreDocente,
      apellido_docente: datos.apellidoDocente,
      actividad: datos.actividad,
      presente: datos.presente === "si",
      horario_programado: datos.horario === "cumple",
      interaccion: datos.interaccion === "si",
      observaciones: datos.observaciones,
      visitaId: datos.visitaId,
    };

    if (existe) {
      return this.repo.actualizar(datos.visitaId, data);
    }

    return this.repo.crear(data);
  }

  async obtenerPorVisita(idVisita: number) {
    return this.repo.obtenerPorVisita(idVisita);
  }

  async actualizarControl(id: number, datos: {
    nombreDocente?: string;
    apellidoDocente?: string;
    actividad?: string;
    presente?: "si" | "no";
    horario?: "cumple" | "no_cumple";
    interaccion?: "si" | "no";
    observaciones?: string;
  }) {

    const data = {
      nombre_docente: datos.nombreDocente,
      apellido_docente: datos.apellidoDocente,
      actividad: datos.actividad,
      presente: datos.presente ? datos.presente === "si" : undefined,
      horario_programado: datos.horario ? datos.horario === "cumple" : undefined,
      interaccion: datos.interaccion ? datos.interaccion === "si" : undefined,
      observaciones: datos.observaciones,
    };

    return this.repo.actualizar(id, data);
  }
}