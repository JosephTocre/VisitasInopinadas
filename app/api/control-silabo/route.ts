import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { ControlSilaboService } from "@/services/controlSilabo.service";

const service = new ControlSilaboService();

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        verify(token, process.env.JWT_SECRET!);

        const body = await request.json();

        const data = await service.registrarControlSilabo({
            coincidencia_actual: body.silabo1 === "cumple",
            coincidencia_anterior: body.silabo2 === "cumple",
            ingreso_avance: body.silabo3 === "cumple",
            observaciones: body.observacionesSilabico,
            visitaId: Number(body.visitaId),
        });

        return NextResponse.json({
            mensaje: "Control silábico guardado",
            id: data.id_control_silabo,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error al guardar control silábico",
                detalle: error instanceof Error ? error.message : error,
            },
            { status: 500 }
        );
    }
}