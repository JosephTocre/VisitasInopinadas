import { NextRequest, NextResponse } from "next/server";
import { ControlSilaboService } from "@/services/controlSilabo.service";

const service = new ControlSilaboService();

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const visitaId = Number(id);

        if (isNaN(visitaId)) {
            return NextResponse.json(
                { mensaje: "visitaId inválido" },
                { status: 400 }
            );
        }

        const body = await request.json();

        const resultado = await service.registrarControlSilabo({
            ...body,
            visitaId,
        });

        return NextResponse.json({
            mensaje: "OK",
            data: resultado,
        });

    } catch (error) {
        return NextResponse.json(
            {
                mensaje: "Error al guardar control silábico",
                detalle: error instanceof Error ? error.message : error,
            },
            { status: 500 }
        );
    }
}