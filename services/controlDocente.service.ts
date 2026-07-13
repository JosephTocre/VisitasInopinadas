import { ControlDocenteRepository } from "@/repositories/controlDocente.repository";

interface RegistrarControlDocenteDTO {
  visitaId: number;
  id_docente: number;
  actividad: string;
  presente: "si" | "no";
  horario: "cumple" | "no_cumple";
  interaccion: "si" | "no";
  observaciones?: string;
}

export class ControlDocenteService {
  private repo = new ControlDocenteRepository();

  async registrarControl(datos: RegistrarControlDocenteDTO) {

    if (!datos.id_docente) {
      throw new Error("Debe seleccionar un docente");
    }

    const existe = await this.repo.obtenerPorVisita(datos.visitaId);

    const data = {
      docenteId: datos.id_docente,
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
    id_docente?: number;
    actividad?: string;
    presente?: "si" | "no";
    horario?: "cumple" | "no_cumple";
    interaccion?: "si" | "no";
    observaciones?: string;
  }) {

    const data = {
      docenteId: datos.id_docente,

      actividad: datos.actividad,

      presente: datos.presente
        ? datos.presente === "si"
        : undefined,

      horario_programado: datos.horario
        ? datos.horario === "cumple"
        : undefined,

      interaccion: datos.interaccion
        ? datos.interaccion === "si"
        : undefined,

      observaciones: datos.observaciones,
    };

    return this.repo.actualizar(id, data);
  }
}