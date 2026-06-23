import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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
    const page = pdfDoc.addPage([595, 842]);
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
      `Semana: ${visita.n_semana}`,
      `Ciclo: ${visita.ciclo}`,
      "",
      "=== USUARIO ===",
      `Nombre: ${visita.usuario?.nombre ?? "-"}`,
      `Apellidos: ${visita.usuario?.apellidos ?? "-"}`,
      `Correo: ${visita.usuario?.correo ?? "-"}`,
      `Rol: ${visita.usuario?.rol ?? "-"}`,
      "",
      "=== CONTROL DOCENTE ===",
      `Docente: ${visita.controlDocente?.nombre_docente ?? "-"} ${visita.controlDocente?.apellido_docente ?? "-"}`,
      `Actividad: ${visita.controlDocente?.actividad ?? "-"}`,
      `Presente: ${visita.controlDocente?.presente ? "Sí" : "No"}`,
      `Horario: ${visita.controlDocente?.horario_programado ? "Sí" : "No"}`,
      `Interacción: ${visita.controlDocente?.interaccion ? "Sí" : "No"}`,
      "",
      "=== CONTROL MATERIAL ===",
      `Cumple: ${visita.controlMaterial?.cumple ? "Sí" : "No"}`,
      "",
      "=== CONTROL SILABO ===",
      `Tema actual: ${visita.controlSilabo?.coincidencia_actual ? "Sí" : "No"}`,
      `Tema anterior: ${visita.controlSilabo?.coincidencia_anterior ? "Sí" : "No"}`,
      `Avance: ${visita.controlSilabo?.ingreso_avance ? "Sí" : "No"}`,
      "",
      "=== CONTROL ESTUDIANTE ===",
      `Ambiente: ${visita.controlEstudiante?.control_ambiente ? "Sí" : "No"}`,
      `Intranet: ${visita.controlEstudiante?.control_intranet ? "Sí" : "No"}`,
      "",
      "=== CONTROL GUIA ===",
      `Tema: ${visita.controlGuia?.tema_programado ?? "-"}`,
      `Logro: ${visita.controlGuia?.logro ?? "-"}`,
      `Rúbrica: ${visita.controlGuia?.rubrica ?? "-"}`,
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