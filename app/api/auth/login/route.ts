import { NextResponse } from "next/server";
import { AuthService } from "@/services/auth.services";

const authService = new AuthService();

export async function POST(request: Request) {
  try {
    const { correo, contrasena } =
      await request.json();

    const resultado =
      await authService.iniciarSesion(
        correo,
        contrasena
      );

    return NextResponse.json(resultado);
  } catch (error) {
    return NextResponse.json(
      {
        mensaje:
          error instanceof Error
            ? error.message
            : "Credenciales inválidas",
      },
      {
        status: 401,
      }
    );
  }
}