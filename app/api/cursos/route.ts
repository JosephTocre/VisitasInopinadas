import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const cursos = await prisma.curso.findMany({
            select: {
                id_curso: true,
                nombre: true,
            },
            orderBy: {
                nombre: "asc",
            },
        });

        return NextResponse.json(cursos);

    } catch (error) {
        console.error("ERROR OBTENIENDO CURSOS:", error);

        return NextResponse.json(
            {
                error: "Error al obtener cursos",
                detalle: error instanceof Error ? error.message : error,
            },
            { status: 500 }
        );
    }
}