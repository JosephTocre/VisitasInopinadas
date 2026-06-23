import { ControlSilaboRepository } from "@/repositories/controlSilabo.repository";

interface RegistrarControlSilaboDTO {
  visitaId: number;
  silabo1: "cumple" | "no_cumple";
  silabo2: "cumple" | "no_cumple";
  silabo3: "cumple" | "no_cumple";
  observacionesSilabo?: string;
}

export class ControlSilaboService {
  private repo = new ControlSilaboRepository();

  async registrarControlSilabo(
    datos: RegistrarControlSilaboDTO
  ) {
    const visitaId = Number(datos.visitaId);

    if (!visitaId) {
      throw new Error("visitaId inválido en service");
    }

    const existe = await this.repo.obtenerPorVisita(visitaId);

    const payload = {
      coincidencia_actual: datos.silabo1 === "cumple",
      coincidencia_anterior: datos.silabo2 === "cumple",
      ingreso_avance: datos.silabo3 === "cumple",
      observaciones: datos.observacionesSilabo,
      visitaId: datos.visitaId,
    };

    if (existe) {
      return this.repo.actualizar(
        existe.id_control_silabo,
        payload
      );
    }

    return this.repo.crear(payload);
  }
}