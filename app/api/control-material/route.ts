import { NextResponse } from "next/server";
import { ControlMaterialService } from "@/services/controlMaterial.service";

const service = new ControlMaterialService();

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await service.registrarControl(body);

        return NextResponse.json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: "Error al crear control material",
                    detalle: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                error: "Error desconocido",
            },
            { status: 500 }
        );
    }
}