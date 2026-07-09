import { NextResponse } from "next/server";
import { UsuarioService } from "@/services/usuario.service";

const usuarioService = new UsuarioService();
export async function GET() {
  try {
    const usuarios = await usuarioService.obtenerTodos();
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 },
    );
  }
}
