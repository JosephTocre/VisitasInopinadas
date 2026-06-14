import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Rol } from "@prisma/client";
import { UsuarioRepository } from "@/repositories/usuario.repository";

export class AuthService {

  private usuarioRepository = new UsuarioRepository();

  async iniciarSesion(
    correo: string,
    password: string
  ) {
    const usuario =
      await this.usuarioRepository.obtenerPorCorreo(correo);

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    const passwordValido =
      await bcrypt.compare(
        password,
        usuario.contrasena
      );

    if (!passwordValido) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "8h",
      }
    );

    return {
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  }

  async registrarUsuario(datos: {
    nombre: string;
    apellidos: string;
    correo: string;
    contrasena: string;
    rol: Rol;
  }) {

    const usuarioExistente =
      await this.usuarioRepository.obtenerPorCorreo(
        datos.correo
      );

    if (usuarioExistente) {
      throw new Error("El correo ya está registrado");
    }

    const hash =
      await bcrypt.hash(datos.contrasena, 10);

    return await this.usuarioRepository.crear({
      ...datos,
      contrasena: hash,
    });
  }

  async cerrarSesion() {
    return true;
  }
}