import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const sedes = await prisma.sede.findMany({
            where: {
                is_active: true,
            },
            orderBy: {
                nombre: "asc",
            },
            select: {
                id_sede: true,
                nombre: true,
            },
        });

        return NextResponse.json(sedes);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error al obtener sedes",
            },
            { status: 500 }
        );
    }
}