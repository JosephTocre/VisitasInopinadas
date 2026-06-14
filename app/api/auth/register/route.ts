import { NextResponse } from "next/server";
import { AuthService } from "@/services/auth.services";

const authService = new AuthService();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const usuario = await authService.registrarUsuario({
      nombre: body.nombre,
      apellidos: body.apellidos,
      correo: body.correo,
      contrasena: body.contrasena,
      rol: body.rol,
    });

    return NextResponse.json(usuario, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        mensaje:
          error instanceof Error
            ? error.message
            : "Error al registrar usuario",
      },
      {
        status: 400,
      }
    );
  }
}