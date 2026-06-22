import { ControlGuiaRepository } from "@/repositories/controlGuia.repository";
import { EstadoCumplimiento } from "@prisma/client";

interface ControlGuiaDTO {
  tema_programado: EstadoCumplimiento;
  logro: EstadoCumplimiento;
  rubrica: EstadoCumplimiento;
  observaciones?: string;
  visitaId: number;
}

export class ControlGuiaService {
  private repository = new ControlGuiaRepository();

  async crear(datos: ControlGuiaDTO) {
    return await this.repository.crear(datos);
  }
}