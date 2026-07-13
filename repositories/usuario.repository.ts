import { prisma } from "@/lib/prisma";
import { Prisma, Rol } from "@prisma/client";

export class UsuarioRepository {
  async obtenerTodos() {
    return await prisma.usuario.findMany({
      select: {
        id_usuario: true,
        nombre: true,
        apellidos: true,
        correo: true,
        rol: true,
      },
    });
  }

  async obtenerPorId(id: number) {
    return await prisma.usuario.findUnique({
      where: {
        id_usuario: id,
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellidos: true,
        correo: true,
        rol: true,
      },
    });
  }

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

  async editar(
    id: number,
    datos: Prisma.UsuarioUpdateInput,
  ) {
    return await prisma.usuario.update({
      where: {
        id_usuario: id,
      },
      data: datos,
    });
  }
}
