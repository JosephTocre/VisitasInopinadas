import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const personalId = Number(id);

        if (isNaN(personalId)) {
            return NextResponse.json(
                {
                    error: "ID inválido",
                },
                {
                    status: 400,
                }
            );
        }


        const { firma } = await request.json();


        if (!firma) {
            return NextResponse.json(
                {
                    error: "Firma requerida",
                },
                {
                    status: 400,
                }
            );
        }


        const inspector = await prisma.usuario.findUnique({
            where: {
                id_usuario: personalId,
            },
        });


        if (!inspector) {
            return NextResponse.json(
                {
                    error: "Inspector no encontrado",
                },
                {
                    status: 404,
                }
            );
        }


        const actualizado = await prisma.usuario.update({

            where: {
                id_usuario: personalId,
            },

            data: {
                firma,
            },

        });


        return NextResponse.json({
            message: "Firma del inspector guardada correctamente",
            inspector: actualizado,
        });


    } catch (error) {

        console.error("ERROR POST FIRMA INSPECTOR:", error);

        return NextResponse.json(
            {
                error: "Error al guardar firma del inspector",
                detalle: error instanceof Error
                    ? error.message
                    : error
            },
            {
                status: 500,
            }
        );

    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const { id } = await params;

        const personalId = Number(id);


        if (isNaN(personalId)) {

            return NextResponse.json(
                {
                    error: "ID inválido"
                },
                {
                    status: 400
                }
            );

        }



        const inspector = await prisma.usuario.findUnique({

            where: {
                id_usuario: personalId
            },

            select: {
                firma: true
            }

        });



        if (!inspector) {

            return NextResponse.json(
                {
                    error: "Inspector no encontrado"
                },
                {
                    status: 404
                }
            );

        }



        return NextResponse.json(inspector);



    } catch (error) {


        console.error("ERROR GET FIRMA INSPECTOR:", error);


        return NextResponse.json(
            {
                error: "Error al obtener firma",
                detalle: error instanceof Error
                    ? error.message
                    : error
            },
            {
                status: 500
            }
        );

    }

}