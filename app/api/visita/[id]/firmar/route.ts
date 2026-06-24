import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { id: string | string[] } }
) {
    try {
        const rawId = params.id;
        let visitaId = Array.isArray(rawId)
            ? parseInt(rawId[0], 10)
            : parseInt(rawId ?? "", 10);

        if (isNaN(visitaId)) {
            const url = new URL(request.url);
            const parts = url.pathname.split("/").filter(Boolean);
            const fallbackId = parts[2];
            visitaId = parseInt(fallbackId ?? "", 10);
        }

        if (isNaN(visitaId)) {
            return NextResponse.json(
                { message: "ID inválido", rawId, pathname: new URL(request.url).pathname },
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
            where: { id_visita: visitaId }, // 👈 revisa si esto es UNIQUE
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