import { NextResponse } from "next/server";
import { ControlDocenteService } from "@/services/controlDocente.service";

export async function POST(request: Request) {
    try {
        const controlService = new ControlDocenteService();

        const body = await request.json();

        const resultado = await controlService.registrarControl({
            id_docente: body.id_docente,
            actividad: body.actividad,
            presente: body.presente,
            horario: body.horario,
            interaccion: body.interaccion,
            observaciones: body.observaciones,
            visitaId: body.visitaId,
        });

        return NextResponse.json(resultado);
    } catch (error) {
        return NextResponse.json(
            {
                mensaje:
                    error instanceof Error
                        ? error.message
                        : "Error al crear control docente",
            },
            { status: 500 }
        );
    }
}