import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// ACTUALIZAR CURSO
export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const idCurso = Number(id);

        const body = await request.json();

        const curso = await prisma.curso.update({
            where: {
                id_curso: idCurso,
            },
            data: {
                nombre: body.nombre,
            },
        });

        return NextResponse.json(curso);

    } catch (error) {
        console.error("ERROR ACTUALIZANDO CURSO:", error);

        return NextResponse.json(
            {
                error: "No se pudo actualizar el curso",
                detalle: error instanceof Error ? error.message : error,
            },
            {
                status: 500,
            }
        );
    }
}



// ELIMINAR CURSO
export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {

        const { id } = await context.params;

        const idCurso = Number(id);


        if (!idCurso) {
            return NextResponse.json(
                {
                    error: "ID de curso inválido",
                },
                {
                    status: 400,
                }
            );
        }


        await prisma.curso.update({
            where: {
                id_curso: idCurso,
            },
            data: {
                is_active: false,
            },
        });

        return NextResponse.json({
            message: "Curso desactivado correctamente",
        });


    } catch (error) {

        console.error("ERROR ELIMINANDO CURSO:", error);


        return NextResponse.json(
            {
                error: "No se pudo eliminar el curso",
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