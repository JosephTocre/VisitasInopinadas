import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const docentes = await prisma.docente.findMany({
            where: {
                is_active: true,
            },
            select: {
                id_docente: true,
                nombre_docente: true,
                apellido_docente: true,
            },
            orderBy: {
                apellido_docente: "asc",
            },
        });

        return NextResponse.json(docentes);

    } catch (error) {
        console.error("ERROR OBTENIENDO DOCENTES:", error);

        return NextResponse.json(
            {
                error: "Error al obtener docentes",
                detalle: error instanceof Error ? error.message : error,
            },
            { status: 500 }
        );
    }
}