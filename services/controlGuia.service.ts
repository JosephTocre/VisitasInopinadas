import { ControlGuiaRepository } from "@/repositories/controlGuia.repository";

export class ControlGuiaService {
  private repository = new ControlGuiaRepository();

  async crear(datos: any) {
    return await this.repository.crear(datos);
  }
}