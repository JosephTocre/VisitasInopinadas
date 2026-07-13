import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const visitaId = Number(id);

        if (isNaN(visitaId)) {
            return NextResponse.json(
                { error: "ID inválido" },
                { status: 400 }
            );
        }

        const visita = await prisma.hechoVisita.findUnique({
            where: {
                id_visita: visitaId,
            },
            select: {
                firma_docente: true,
            },
        });

        if (!visita) {
            return NextResponse.json(
                { error: "Visita no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            firma: visita.firma_docente,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Error al obtener la firma" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const { id } = await params;

        const visitaId = Number(id);


        if (isNaN(visitaId)) {

            return NextResponse.json(
                {
                    message: "ID inválido"
                },
                {
                    status: 400
                }
            );

        }



        const visita = await prisma.hechoVisita.findUnique({

            where: {
                id_visita: visitaId
            }

        });



        if (!visita) {

            return NextResponse.json(
                {
                    message: "Visita no encontrada"
                },
                {
                    status: 404
                }
            );

        }



        // BLOQUEO
        if (visita.firmado) {

            return NextResponse.json(
                {
                    message: "Esta visita ya fue firmada"
                },
                {
                    status: 400
                }
            );

        }



        const { firma } = await request.json();



        if (!firma) {

            return NextResponse.json(
                {
                    message: "Firma requerida"
                },
                {
                    status: 400
                }
            );

        }



        const updated = await prisma.hechoVisita.update({

            where: {
                id_visita: visitaId
            },


            data: {

                firma_docente: firma,

                firmado: true,

                fechaFirma: new Date()

            }

        });



        return NextResponse.json(updated);



    } catch (error) {

        console.error(error);


        return NextResponse.json(

            {
                message: "Error al guardar firma"
            },

            {
                status: 500
            }

        );

    }

}