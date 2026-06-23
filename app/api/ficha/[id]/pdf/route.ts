import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const visita = await prisma.hechoVisita.findUnique({
            where: {
                id_visita: Number(id),
            },
            include: {
                usuario: true,
                controlDocente: true,
                controlMaterial: true,
                controlSilabo: true,
                controlEstudiante: true,
                controlGuia: true,
            },
        });

        if (!visita) {
            return NextResponse.json(
                { error: "Visita no encontrada" },
                { status: 404 }
            );
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const lines: string[] = [
            "REPORTE DE VISITA",
            "",

            "=== DATOS GENERALES ===",
            `ID Visita: ${visita.id_visita}`,
            `Sede: ${visita.sede}`,
            `Lugar: ${visita.lugar}`,
            `Curso: ${visita.curso}`,
            `Campo formativo: ${visita.campo_formativo}`,
            `Fecha: ${new Date(visita.fecha).toLocaleDateString()}`,
            `Turno: ${visita.turno}`,
            `Hora práctica/teoría: ${visita.hora_practica_teoria}`,
            `Semana: ${visita.n_semana}`,
            `Hora inicio: ${new Date(visita.hora_inicio).toLocaleString()}`,
            `Hora término: ${new Date(visita.hora_termino).toLocaleString()}`,
            `Ciclo: ${visita.ciclo}`,
            `Usuario ID: ${visita.usuarioId}`,

            "",
            "=== USUARIO ===",
            `ID Usuario: ${visita.usuario?.id_usuario ?? "-"}`,
            `Nombre: ${visita.usuario?.nombre ?? "-"}`,
            `Apellidos: ${visita.usuario?.apellidos ?? "-"}`,
            `Correo: ${visita.usuario?.correo ?? "-"}`,
            `Rol: ${visita.usuario?.rol ?? "-"}`,

            "",
            "=== CONTROL DOCENTE ===",
            `ID Control Docente: ${visita.controlDocente?.id_control_docente ?? "-"}`,
            `Nombre docente: ${visita.controlDocente?.nombre_docente ?? "-"}`,
            `Apellido docente: ${visita.controlDocente?.apellido_docente ?? "-"}`,
            `Actividad: ${visita.controlDocente?.actividad ?? "-"}`,
            `Presente: ${visita.controlDocente
                ? visita.controlDocente.presente
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Horario programado: ${visita.controlDocente
                ? visita.controlDocente.horario_programado
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Interacción: ${visita.controlDocente
                ? visita.controlDocente.interaccion
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Observaciones: ${visita.controlDocente?.observaciones ?? "-"}`,
            `Visita ID: ${visita.controlDocente?.visitaId ?? "-"}`,

            "",
            "=== CONTROL MATERIAL ===",
            `ID Control Material: ${visita.controlMaterial?.id_control_material ?? "-"}`,
            `Cumple: ${visita.controlMaterial
                ? visita.controlMaterial.cumple
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Observaciones: ${visita.controlMaterial?.observaciones ?? "-"}`,
            `Visita ID: ${visita.controlMaterial?.visitaId ?? "-"}`,

            "",
            "=== CONTROL SILABO ===",
            `ID Control Silabo: ${visita.controlSilabo?.id_control_silabo ?? "-"}`,
            `Coincidencia actual: ${visita.controlSilabo
                ? visita.controlSilabo.coincidencia_actual
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Coincidencia anterior: ${visita.controlSilabo
                ? visita.controlSilabo.coincidencia_anterior
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Ingreso avance: ${visita.controlSilabo
                ? visita.controlSilabo.ingreso_avance
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Observaciones: ${visita.controlSilabo?.observaciones ?? "-"}`,
            `Visita ID: ${visita.controlSilabo?.visitaId ?? "-"}`,

            "",
            "=== CONTROL ESTUDIANTE ===",
            `ID Control Estudiante: ${visita.controlEstudiante?.id_control_estudiante ?? "-"}`,
            `Control ambiente: ${visita.controlEstudiante
                ? visita.controlEstudiante.control_ambiente
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Observaciones ambiente: ${visita.controlEstudiante?.observaciones_ambiente ?? "-"
            }`,
            `Control intranet: ${visita.controlEstudiante
                ? visita.controlEstudiante.control_intranet
                    ? "Sí"
                    : "No"
                : "-"
            }`,
            `Observaciones intranet: ${visita.controlEstudiante?.observaciones_intranet ?? "-"
            }`,
            `Observaciones generales: ${visita.controlEstudiante?.observaciones ?? "-"
            }`,
            `Visita ID: ${visita.controlEstudiante?.visitaId ?? "-"}`,

            "",
            "=== CONTROL GUIA ===",
            `ID Control Guía: ${visita.controlGuia?.id_control_guia ?? "-"}`,
            `Tema programado: ${visita.controlGuia?.tema_programado ?? "-"}`,
            `Logro: ${visita.controlGuia?.logro ?? "-"}`,
            `Rúbrica: ${visita.controlGuia?.rubrica ?? "-"}`,
            `Requerimientos: ${visita.controlGuia?.requerimientos ?? "-"}`,
            `Observaciones: ${visita.controlGuia?.observaciones ?? "-"}`,
            `Visita ID: ${visita.controlGuia?.visitaId ?? "-"}`,
        ];

        let y = 780;

        let currentPage = page;

        for (const line of lines) {
            currentPage.drawText(line, {
                x: 50,
                y,
                size: 10,
                font,
            });

            y -= 18;

            if (y < 50) {
                currentPage = pdfDoc.addPage([595, 842]);
                y = 780;
            }
        }

        const pdfBytes = await pdfDoc.save();

        return new NextResponse(Buffer.from(pdfBytes), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename=ficha-${id}.pdf`,
            },
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: String(error) },
            { status: 500 }
        );
    }
}