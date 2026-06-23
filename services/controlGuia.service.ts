import { ControlGuiaRepository } from "@/repositories/controlGuia.repository";
import { EstadoCumplimiento } from "@prisma/client";

interface ControlGuiaDTO {
  tema_programado: EstadoCumplimiento;
  logro: EstadoCumplimiento;
  rubrica: EstadoCumplimiento;
  observaciones?: string;
  requerimientos?: string;
  visitaId: number;
}

export class ControlGuiaService {
  private repository = new ControlGuiaRepository();

  async crear(datos: ControlGuiaDTO) {
    return this.repository.crear(datos);
  }

  async obtenerPorVisita(visitaId: number) {
    return this.repository.obtenerPorVisita(visitaId);
  }

  async actualizarPorVisita(
    visitaId: number,
    datos: Partial<ControlGuiaDTO>
  ) {
    return this.repository.actualizarPorVisita(visitaId, datos);
  }
}