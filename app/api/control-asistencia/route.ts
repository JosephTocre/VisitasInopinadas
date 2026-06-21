import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { ControlAsistenciaService } from "@/services/controlAsistencia.service";

const service = new ControlAsistenciaService();

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        verify(token, process.env.JWT_SECRET!);

        const body = await request.json();
        console.log("BODY RECIBIDO:", body);
console.log("VISITA ID:", body.visitaId);

        const data = await service.registrarControlAsistencia({
            control_ambiente: body.ambienteCumple === "cumple",
            observaciones_ambiente: body.observacionAmbiente,

            control_intranet: body.intranetCumple === "cumple",
            observaciones_intranet: body.observacionIntranet,

            observaciones: body.observacionesGenerales,

            visitaId: Number(body.visitaId),
        });

        return NextResponse.json({
            mensaje: "Control de asistencia guardado",
            id: data.id_control_estudiante,
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error al guardar control asistencia",
                detalle: error instanceof Error ? error.message : error,
            },
            { status: 500 }
        );
    }
}