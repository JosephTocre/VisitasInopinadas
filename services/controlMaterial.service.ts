import { ControlMaterialRepository } from "@/repositories/controlMaterial.repository";

export interface ControlMaterialDTO {
  cumple: boolean;
  observaciones?: string;
  visitaId: number;
}

export class ControlMaterialService {
  private repository = new ControlMaterialRepository();

  async registrarControl(datos: ControlMaterialDTO) {
    return await this.repository.crear(datos);
  }

  async obtenerPorVisita(idVisita: number) {
    return await this.repository.obtenerPorVisita(idVisita);
  }
}