import { NextResponse } from "next/server";
import { UsuarioService } from "@/services/usuario.service";

const usuarioService = new UsuarioService();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const datos = await request.json();

    const usuarioActualizado = await usuarioService.actualizarUsuario(
      id,
      datos,
    );

    return NextResponse.json(usuarioActualizado);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 },
    );
  }
}
