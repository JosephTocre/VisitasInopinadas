import { UsuarioRepository } from "@/repositories/usuario.repository";
import bcrypt from "bcrypt";

export class UsuarioService {
  private repository = new UsuarioRepository();

  async obtenerTodos() {
    return await this.repository.obtenerTodos();
  }

  async obtenerPorId(id: number) {
    return await this.repository.obtenerPorId(id);
  }

  async actualizarUsuario(id: number, datos: any) {
    const { contrasena, ...datosSinContrasena } = datos;

    const datosActualizacion = contrasena
      ? { ...datosSinContrasena, contrasena: await bcrypt.hash(contrasena, 10) }
      : datosSinContrasena;

    return await this.repository.editar(id, datosActualizacion);
  }
}
