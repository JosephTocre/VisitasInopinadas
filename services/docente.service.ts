import { Prisma } from "@prisma/client";
import { DocenteRepository } from "@/repositories/docente.repository";

export class DocenteService {
  private repository = new DocenteRepository();

  async obtenerTodos() {
    return this.repository.obtenerTodos();
  }

  async obtenerPorId(id: number) {
    return this.repository.obtenerPorId(id);
  }

  async registrarDocente(datos: Prisma.DocenteCreateInput) {
    return this.repository.crear(datos);
  }

  async actualizarDocente(
    id: number,
    datos: Prisma.DocenteUpdateInput,
  ) {
    return this.repository.editar(id, datos);
  }

  async eliminarDocente(id: number) {
    return this.repository.eliminar(id);
  }
}