import { ControlSilaboRepository } from "@/repositories/controlSilabo.repository";

export class ControlSilaboService {

  private repo = new ControlSilaboRepository();

  async registrarControlSilabo(datos: any) {

    const visitaId = Number(datos.visitaId);

    if (!visitaId) {
      throw new Error("visitaId inválido en service");
    }

    const existe = await this.repo.obtenerPorVisita(visitaId);

    const payload = {
      coincidencia_actual: datos.silabo1 === "cumple",
      coincidencia_anterior: datos.silabo2 === "cumple",
      ingreso_avance: datos.silabo3 === "cumple",

      observaciones: datos.observacionesSilabico,
      visitaId: datos.visitaId,
    };

    if (existe) {
      return this.repo.actualizar(existe.id_control_silabo, payload);
    }

    return this.repo.crear(payload);
  }
}