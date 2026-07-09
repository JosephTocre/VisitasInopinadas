import { UsuarioRepository } from "@/repositories/usuario.repository";

export class UsuarioService {
  private repository = new UsuarioRepository();

  async obtenerTodos() {
    return await this.repository.obtenerTodos();
  }

  async obtenerPorId(id: number) {
    void id;
  }

  async registrarUsuario(datos: unknown) {
    void datos;
  }

  async actualizarUsuario(id: number, datos: unknown) {
    void id;
    void datos;
  }

  async eliminarUsuario(id: number) {
    void id;
  }
}
