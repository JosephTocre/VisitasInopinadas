import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const visitaId = parseInt(id, 10);

        if (isNaN(visitaId)) {
            return NextResponse.json(
                { message: "ID inválido" },
                { status: 400 }
            );
        }

        const { firma } = await request.json();

        if (!firma) {
            return NextResponse.json(
                { message: "Firma requerida" },
                { status: 400 }
            );
        }

        const updated = await prisma.hechoVisita.update({
            where: { id_visita: visitaId },
            data: {
                firma,
                firmado: true,
                fechaFirma: new Date(),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Error al guardar firma" },
            { status: 500 }
        );
    }
}