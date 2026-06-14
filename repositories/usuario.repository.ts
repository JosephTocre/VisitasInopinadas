import { prisma } from "@/lib/prisma";
import { Rol } from "@prisma/client";

export class UsuarioRepository {

  async obtenerPorCorreo(correo: string) {
    return await prisma.usuario.findUnique({
      where: {
        correo,
      },
    });
  }

  async crear(datos: {
    nombre: string;
    apellidos: string;
    correo: string;
    contrasena: string;
    rol: Rol;
  }) {
    return await prisma.usuario.create({
      data: datos,
    });
  }
}