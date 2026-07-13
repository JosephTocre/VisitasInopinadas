import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// ACTUALIZAR SEDE
export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {

        const { id } = await context.params;

        const idSede = Number(id);

        if (!idSede) {
            return NextResponse.json(
                {
                    error: "ID de sede inválido",
                },
                {
                    status: 400,
                }
            );
        }


        const body = await request.json();


        const sede = await prisma.sede.update({
            where: {
                id_sede: idSede,
            },
            data: {
                nombre: body.nombre,
            },
        });


        return NextResponse.json(sede);


    } catch (error) {

        console.error("ERROR ACTUALIZANDO SEDE:", error);


        return NextResponse.json(
            {
                error: "No se pudo actualizar la sede",
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



// DESACTIVAR SEDE
export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {

        const { id } = await context.params;

        const idSede = Number(id);


        if (!idSede) {
            return NextResponse.json(
                {
                    error: "ID de sede inválido",
                },
                {
                    status: 400,
                }
            );
        }


        await prisma.sede.update({
            where: {
                id_sede: idSede,
            },
            data: {
                is_active: false,
            },
        });


        return NextResponse.json({
            message: "Sede desactivada correctamente",
        });


    } catch (error) {

        console.error("ERROR DESACTIVANDO SEDE:", error);


        return NextResponse.json(
            {
                error: "No se pudo desactivar la sede",
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