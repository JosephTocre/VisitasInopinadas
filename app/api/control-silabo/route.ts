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
            visitaId: Number(body.visitaId),

            silabo1: body.silabo1,
            silabo2: body.silabo2,
            silabo3: body.silabo3,

            observacionesSilabo: body.observacionesSilabo,
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