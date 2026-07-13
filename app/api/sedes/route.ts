import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// OBTENER SEDES ACTIVAS
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

        console.error("ERROR OBTENIENDO SEDES:", error);

        return NextResponse.json(
            {
                error: "Error al obtener sedes",
            },
            { status: 500 }
        );
    }
}


// REGISTRAR SEDE
export async function POST(request: Request) {
    try {

        const body = await request.json();


        if (!body.nombre) {
            return NextResponse.json(
                {
                    error: "El nombre de la sede es obligatorio",
                },
                {
                    status: 400,
                }
            );
        }


        const sede = await prisma.sede.create({
            data: {
                nombre: body.nombre,
                is_active: true,
            },
        });


        return NextResponse.json(
            sede,
            {
                status: 201,
            }
        );


    } catch (error) {

        console.error("ERROR REGISTRANDO SEDE:", error);

        return NextResponse.json(
            {
                error: "No se pudo registrar la sede",
                detalle:
                    error instanceof Error
                        ? error.message
                        : error,
            },
            {
                status: 500,
            }
        );
    }
}