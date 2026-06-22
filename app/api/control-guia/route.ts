import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { ControlGuiaService } from "@/services/controlGuia.service";

const service = new ControlGuiaService();

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        verify(token, process.env.JWT_SECRET!);

        const body = await request.json();

        const data = await service.crear({
            tema_programado: body.guia1,
            logro: body.guia2,
            rubrica: body.guia3,
            observaciones: body.observacionesGuia,
            visitaId: body.visitaId,
        });

        return NextResponse.json({
            id_control_guia: data.id_control_guia,
            mensaje: "Control de guía creado correctamente",
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error al crear control guía",
                detalle: error instanceof Error ? error.message : error,
            },
            { status: 500 }
        );
    }
}