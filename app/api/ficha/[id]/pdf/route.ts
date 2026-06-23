import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont, RGB } from "pdf-lib";

// ─── helpers ────────────────────────────────────────────────────────────────

const BLACK = rgb(0, 0, 0);
const WHITE = rgb(1, 1, 1);
const LIGHT_GRAY = rgb(0.85, 0.85, 0.85);

function drawRect(
  page: PDFPage,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { fill?: ReturnType<typeof rgb>; stroke?: boolean } = {}
) {
  page.drawRectangle({
    x,
    y,
    width: w,
    height: h,
    color: opts.fill ?? WHITE,
    borderColor: opts.stroke !== false ? BLACK : undefined,
    borderWidth: opts.stroke !== false ? 0.5 : 0,
  });
}

function text(
  page: PDFPage,
  value: string,
  x: number,
  y: number,
  font: PDFFont,
  size = 7,
  color = BLACK
) {
  if (!value) return;
  page.drawText(value, { x, y, size, font, color });
}
const formatDate = (value: string | Date | null | undefined) => {
  if (!value) return "";

  if (value instanceof Date) {
    return value.toLocaleDateString("es-PE");
  }

  // si es string
  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString("es-PE");
  }

  return value; // fallback
};
function centeredText(
  page: PDFPage, value: string, cellX: number, cellY: number, cellW: number, cellH: number, font: PDFFont,
  size = 7,
  color = BLACK
) {
  const lines = String(value ?? "").split("\n");
  const lineHeight = size + 1;
  const totalHeight = lines.length * lineHeight;

  let startY = cellY + (cellH + totalHeight) / 2 - lineHeight;

  for (const line of lines) {
    const w = font.widthOfTextAtSize(line, size);
    const cx = cellX + (cellW - w) / 2;

    page.drawText(line, { x: cx, y: startY, size, font, color });

    startY -= lineHeight;
  }
}

function leftText(
  page: PDFPage, value: string, cellX: number, cellY: number, cellW: number, cellH: number, font: PDFFont,
  size = 7,
  color = BLACK
) {
  const lines = String(value ?? "").split("\n");
  const lineHeight = size + 1;
  const totalHeight = lines.length * lineHeight;
  let startY = cellY + cellH - lineHeight - 2;

  for (const line of lines) {
    page.drawText(line, { x: cellX + 2, y: startY, size, font, color });
    startY -= lineHeight;
  }
}


export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const visita = await prisma.hechoVisita.findUnique({
      where: { id_visita: Number(id) },
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
      return NextResponse.json({ error: "Visita no encontrada" }, { status: 404 });
    }

    // ── shortcuts ──────────────────────────────────────────────────────────
    const cd = visita.controlDocente;
    const cm = visita.controlMaterial;
    const cs = visita.controlSilabo;
    const ce = visita.controlEstudiante;
    const cg = visita.controlGuia;

    const bool = (v: boolean | null | undefined) => (v ? "X" : "");
    const str = (v: string | null | undefined) => v ?? "";

    const docenteNombre = `${str(cd?.nombre_docente)} ${str(cd?.apellido_docente)}`.trim();
    const responsable = `${str(visita.usuario?.nombre)} ${str(visita.usuario?.apellidos)}`.trim();
    const fecha = visita.fecha
      ? new Date(visita.fecha).toLocaleDateString("es-PE")
      : "";

    // ── pdf setup ──────────────────────────────────────────────────────────
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);          // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const L = 28;
    const W = 539;

    // ── title ─────────────────────────────────────────────────────────────
    const titleY = 805;
    const title = "VISITA INOPINADA – CLASES PRESENCIALES";
    const titleW = fontB.widthOfTextAtSize(title, 11);
    page.drawText(title, { x: L + (W - titleW) / 2, y: titleY, size: 11, font: fontB, color: BLACK });
    page.drawLine({
      start: { x: L + (W - titleW) / 2, y: titleY - 1 },
      end: { x: L + (W - titleW) / 2 + titleW, y: titleY - 1 },
      thickness: 0.8, color: BLACK,
    });


    let rowTop = 795;

    const ROW = (h: number) => {
      const top = rowTop;
      rowTop -= h;
      return { top, bot: rowTop, h };
    };

    const labelCell = (
      label: string, value: string,
      x: number, y: number, w: number, h: number,
      boldLabel = true
    ) => {
      drawRect(page, x, y - h, w, h);
      text(page, label, x + 2, y - h + (h - 7) / 2 + 0.5, boldLabel ? fontB : font, 6.5);
      text(page, value, x + font.widthOfTextAtSize(label, 6.5) + 5, y - h + (h - 7) / 2 + 0.5, font, 7);
    };

    const headerCell = (
      label: string, x: number, y: number, w: number, h: number, size = 6.5
    ) => {
      drawRect(page, x, y - h, w, h, { fill: LIGHT_GRAY });
      centeredText(page, label, x, y - h, w, h, fontB, size);
    };

    const valueCell = (value: string, x: number, y: number, w: number, h: number, fill?: RGB) => {
      drawRect(
        page, x, y - h, w, h, fill ? { fill } : {}
      );

      centeredText(page, value, x, y - h, w, h, font, 7);
    };

    // ─────────────────────────────────────────────────────────────────────
    // ROW 1: FECHA | HORA INICIO | HORA TÉRMINO
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(14);

      const totalW = W;
      const colW = totalW / 3;

      labelCell("FECHA DE VISITA:", formatDate(fecha), L, top, colW, h);
      labelCell("HORA DE INICIO VISITA:", visita.hora_inicio?.toLocaleTimeString("es-PE") ?? "", L + colW, top, colW, h);
      labelCell("HORA DE TÉRMINO DE VISITA:", visita.hora_termino?.toLocaleTimeString("es-PE") ?? "", L + colW * 2, top, colW, h);
    }

    // ─────────────────────────────────────────────────────────────────────
    // ROW 2: SEDE | CICLO | TURNO
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(14);

      const colW = W / 3;

      labelCell("SEDE O FILIAL:", str(visita.sede), L, top, colW, h);
      labelCell("CICLO:", str(visita.ciclo), L + colW, top, colW, h);
      labelCell("TURNO:", str(visita.turno), L + colW * 2, top, colW, h);
    }
    // ─────────────────────────────────────────────────────────────────────
    // ROW 3: ASIGNATURA | CAMPO FORMATIVO
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(14);

      const colW = W / 2;

      labelCell("ASIGNATURA:", str(visita.curso), L, top, colW, h);
      labelCell("CAMPO FORMATIVO:", str(visita.campo_formativo), L + colW, top, colW, h);
    }

    // ─────────────────────────────────────────────────────────────────────
    // ROW 4: SEMANA | HORA PRÁCTICA/TEORÍA
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(14);

      const colW = W / 2;

      labelCell("SEMANA N°:", visita.n_semana != null ? String(visita.n_semana) : "", L, top, colW, h);
      labelCell("HORA PRÁCTICA/HORA TEORÍA:", str(visita.hora_practica_teoria), L + colW, top, colW, h);
    }

    // ─────────────────────────────────────────────────────────────────────
    // ROW 5: LUGAR DE LA VISITA
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(14);
      labelCell("LUGAR DE LA VISITA:", str(visita.lugar), L, top, W, h);
    }

    // ─────────────────────────────────────────────────────────────────────
    // SECTION 1: CONTROL DOCENTE
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(13);
      drawRect(page, L, top - h, W, h, { fill: LIGHT_GRAY });
      text(page, "1.   CONTROL DOCENTE (ASISTENCIA, HORARIO, COMPORTAMIENTO)", L + 3, top - h + (h - 7) / 2, fontB, 7);
    }

    // docente header row
    {
      const { top, h } = ROW(13);
      const presW = 50;
      const horW = 90;
      const intW = 70;
      const nameW = W - presW - horW - intW;
      const labelW = 60;
      const valueW = nameW - labelW;

      drawRect(page, L, top - h, nameW, h);

      page.drawLine({ start: { x: L + labelW, y: top - h }, end: { x: L + labelW, y: top }, thickness: 0.5 });
      text(page, "DOCENTE:", L + 3, top - h + (h - 7) / 2, fontB, 6.5);
      text(page, docenteNombre, L + labelW + 3, top - h + (h - 7) / 2, font, 7);

      // HEADERS DERECHA
      headerCell("PRESENTE", L + nameW, top, presW, h, 6);
      headerCell("HORARIO PROGRAMADO", L + nameW + presW, top, horW, h, 6);
      headerCell("INTERACCIÓN", L + nameW + presW + horW, top, intW, h, 6);
    }

    {
      const { top, h } = ROW(11);
      const presW = 50, horW = 90, intW = 70;
      const nameW = W - presW - horW - intW;
      drawRect(page, L, top - h, nameW, h, { fill: LIGHT_GRAY });
      text(page, "ACTIVIDAD:", L + 2, top - h + (h - 7) / 2, fontB, 6.5);

      // PRESENTE: SI / NO
      headerCell("SI", L + nameW, top, presW / 2, h, 6);
      headerCell("NO", L + nameW + presW / 2, top, presW / 2, h, 6);

      // HORARIO: Cumple /
      headerCell("CUMPLE", L + nameW + presW, top, horW / 2, h, 6);
      headerCell("NO CUMPLE", L + nameW + presW + horW / 2, top, horW / 2, h, 5.5);

      // INTERACCIÓN: SI / NO
      headerCell("SI", L + nameW + presW + horW, top, intW / 2, h, 6);
      headerCell("NO", L + nameW + presW + horW + intW / 2, top, intW / 2, h, 6);
    }

    // valores de control docente
    {
      const { top, h } = ROW(13);
      const presW = 50, horW = 90, intW = 70;
      const nameW = W - presW - horW - intW;

      drawRect(page, L, top - h, nameW, h);
      text(page, str(cd?.actividad), L + 2, top - h + (h - 7) / 2, font, 7);

      valueCell(cd?.presente === true ? "X" : "", L + nameW, top, presW / 2, h, cd?.presente === true ? rgb(1, 0.9, 0.4) : undefined);
      valueCell(cd?.presente === false ? "X" : "", L + nameW + presW / 2, top, presW / 2, h, cd?.presente === false ? rgb(1, 0.9, 0.4) : undefined);

      valueCell(cd?.horario_programado === true ? "X" : "", L + nameW + presW, top, horW / 2, h, cd?.horario_programado === true ? rgb(1, 0.9, 0.4) : undefined);
      valueCell(cd?.horario_programado === false ? "X" : "", L + nameW + presW + horW / 2, top, horW / 2, h, cd?.horario_programado === false ? rgb(1, 0.9, 0.4) : undefined);

      valueCell(cd?.interaccion === true ? "X" : "", L + nameW + presW + horW, top, intW / 2, h, cd?.interaccion === true ? rgb(1, 0.9, 0.4) : undefined);
      valueCell(cd?.interaccion === false ? "X" : "", L + nameW + presW + horW + intW / 2, top, intW / 2, h, cd?.interaccion === false ? rgb(1, 0.9, 0.4) : undefined);
    }

    // observaciones 1
    {
      const { top, h } = ROW(24);
      drawRect(page, L, top - h, W, h);

      leftText(page, "OBSERVACIONES:", L + 2, top - h, 80, h, fontB, 6.5);
      leftText(page, cd?.observaciones ?? "", L + 90, top - h, W - 90, h, font, 6.5);
    }

    // ─────────────────────────────────────────────────────────────────────
    // SECTION 2: MATERIAL AULA VIRTUAL
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(13);
      drawRect(page, L, top - h, W, h, { fill: LIGHT_GRAY });
      text(page, "2.   REGISTRO DE MATERIAL A UTILIZAR CARGADO EN AULA VIRTUAL ANTES DEL INICIO DE CLASES", L + 3, top - h + (h - 7) / 2, fontB, 7);
    }

    {
      const { top, h } = ROW(13);
      const col1 = 80;
      const col2 = (W - col1) / 2;
      const col3 = W - col1 - col2;

      const isCumple = cm?.cumple === true;
      const isNoCumple = cm?.cumple === false;

      headerCell("CUMPLE", L, top, col1, h, 6.5);

      drawRect(page, L + col1, top - h, col2, h);
      drawRect(page, L + col1 + col2, top - h, col3, h);

      if (isCumple) { drawRect(page, L + col1, top - h, col2, h, { fill: rgb(1, 0.9, 0.4) }) };
      if (isNoCumple) { drawRect(page, L + col1 + col2, top - h, col3, h, { fill: rgb(1, 0.9, 0.4) }) };

      centeredText(page, "SI", L + col1, top - h, col2, h, fontB, 6.5);
      centeredText(page, "NO", L + col1 + col2, top - h, col3, h, fontB, 6.5);
    }

    {
      const { top, h } = ROW(24);
      drawRect(page, L, top - h, W, h);

      leftText(page, "OBSERVACIONES:", L + 2, top - h, 80, h, fontB, 6.5);
      leftText(page, cm?.observaciones ?? "", L + 90, top - h, W - 90, h, font, 6.5);
    }
    // ─────────────────────────────────────────────────────────────────────
    // SECTION 3: CONTROL ASISTENCIA ESTUDIANTES
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(13);
      drawRect(page, L, top - h, W, h, { fill: LIGHT_GRAY });
      text(page, "3.   CONTROL DE REGISTRO DE ASISTENCIA DE ESTUDIANTES", L + 3, top - h + (h - 7) / 2, fontB, 7);
    }

    const ambW = W / 2;
    const intraW = W - ambW;
    const ctrlW = 70;

    const totalAmb = ambW - ctrlW;
    const ambCumpleW = totalAmb * 0.25;
    const ambNoCumpleW = totalAmb * 0.25;
    const ambObsW = totalAmb * 0.5;

    const totalIntra = intraW;
    const intraCumpleW = totalIntra * 0.25;
    const intraNoCumpleW = totalIntra * 0.25;
    const intraObsW = totalIntra * 0.5;

    {
      const { top, h } = ROW(11);

      drawRect(page, L, top - h, ctrlW, h, { fill: LIGHT_GRAY });

      headerCell("CONTROL EN AMBIENTE", L + ctrlW, top, totalAmb, h, 6.5);
      headerCell("CONTROL EN INTRANET", L + ambW, top, totalIntra, h, 6.5);
    }

    {
      const { top, h } = ROW(11);

      headerCell("CONTROL", L, top, ctrlW, h, 6);
      headerCell("CUMPLE", L + ctrlW, top, ambCumpleW, h, 6);
      headerCell("NO CUMPLE", L + ctrlW + ambCumpleW, top, ambNoCumpleW, h, 6);
      headerCell("Observaciones", L + ctrlW + ambCumpleW + ambNoCumpleW, top, ambObsW, h, 6);
      headerCell("CUMPLE", L + ambW, top, intraCumpleW, h, 6);
      headerCell("NO CUMPLE", L + ambW + intraCumpleW, top, intraNoCumpleW, h, 6);
      headerCell("Observaciones", L + ambW + intraCumpleW + intraNoCumpleW, top, intraObsW, h, 6);
    }

    {
      const { top, h } = ROW(13);

      headerCell("ASISTENCIA", L, top, ctrlW, h, 6);

      valueCell(bool(ce?.control_ambiente), L + ctrlW, top, ambCumpleW, h, ce?.control_ambiente === true ? rgb(1, 0.9, 0.4) : undefined);
      valueCell(ce?.control_ambiente === false ? "X" : "", L + ctrlW + ambCumpleW, top, ambNoCumpleW, h, ce?.control_ambiente === false ? rgb(1, 0.9, 0.4) : undefined);
      drawRect(page, L + ctrlW + ambCumpleW + ambNoCumpleW, top - h, ambObsW, h);
      leftText(page, ce?.observaciones_ambiente ?? "", L + ctrlW + ambCumpleW + ambNoCumpleW + 2, top - h, ambObsW - 4, h, font, 6.5);
      valueCell(bool(ce?.control_intranet), L + ambW, top, intraCumpleW, h, ce?.control_intranet === true ? rgb(1, 0.9, 0.4) : undefined);
      valueCell(ce?.control_intranet === false ? "X" : "", L + ambW + intraCumpleW, top, intraNoCumpleW, h, ce?.control_intranet === false ? rgb(1, 0.9, 0.4) : undefined);
      drawRect(page, L + ambW + intraCumpleW + intraNoCumpleW, top - h, intraObsW, h);
      leftText(page, ce?.observaciones_intranet ?? "", L + ambW + intraCumpleW + intraNoCumpleW + 2, top - h, intraObsW - 4, h, font, 6.5);
    }
    {
      const { top, h } = ROW(24);
      drawRect(page, L, top - h, W, h);

      leftText(page, "OBSERVACIONES:", L + 2, top - h, 80, h, fontB, 6.5);
      leftText(page, ce?.observaciones ?? "", L + 90, top - h, W - 90, h, font, 6.5);
    }
    // ─────────────────────────────────────────────────────────────────────
    // SECTION 4: CONTROL AVANCE SILÁBICO
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(13);
      drawRect(page, L, top - h, W, h, { fill: LIGHT_GRAY });
      text(page, "4.   CONTROL DEL AVANCE SILÁBICO", L + 3, top - h + (h - 7) / 2, fontB, 7);
    }

    const silaboLabelW = 300, silaboColW = (W - silaboLabelW) / 2;

    {
      const { top, h } = ROW(11);
      drawRect(page, L, top - h, silaboLabelW, h, { fill: LIGHT_GRAY });
      headerCell("CUMPLE", L + silaboLabelW, top, silaboColW, h, 6.5);
      headerCell("NO CUMPLE", L + silaboLabelW + silaboColW, top, silaboColW, h, 6.5);
    }

    const silaboRow = (label: string, value: boolean | null | undefined) => {
      const { top, h } = ROW(20);
      drawRect(page, L, top - h, silaboLabelW, h);
      leftText(page, label, L + 2, top - h, silaboLabelW - 4, h, font, 6.5);
      valueCell(value === true ? "X" : "", L + silaboLabelW, top, silaboColW, h, value === true ? rgb(1, 0.9, 0.4) : undefined);
      valueCell(value === false ? "X" : "", L + silaboLabelW + silaboColW, top, silaboColW, h, value === false ? rgb(1, 0.9, 0.4) : undefined);
    };

    silaboRow("EL TEMA DEL SÍLABO COINCIDE CON LA CLASE DESARROLLADA EN LA\nFECHA DE LA VISITA", cs?.coincidencia_actual);
    silaboRow("EL TEMA DESARROLLADO EN LA FECHA ANTERIOR A LA VISITA\nCOINCIDE CON EL SÍLABO", cs?.coincidencia_anterior);
    silaboRow("INGRESO DEL AVANCE SILABICO EN EL AULA VIRTUAL", cs?.ingreso_avance);

    {
      const { top, h } = ROW(24);
      drawRect(page, L, top - h, W, h);

      leftText(page, "OBSERVACIONES:", L + 2, top - h, 80, h, fontB, 6.5);
      leftText(page, cs?.observaciones ?? "", L + 90, top - h, W - 90, h, font, 6.5);
    }

    // ─────────────────────────────────────────────────────────────────────
    // SECTION 5: GUÍA DE PRÁCTICA
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(13);
      drawRect(page, L, top - h, W, h, { fill: LIGHT_GRAY });
      text(page, "5.   CUMPLE CON EL DESARROLLO DE LA GUÍA DE PRÁCTICA", L + 3, top - h + (h - 7) / 2, fontB, 7);
    }

    const guiaLabelW = 270, guiaColW = (W - guiaLabelW) / 3;

    {
      const { top, h } = ROW(11);
      drawRect(page, L, top - h, guiaLabelW, h, { fill: LIGHT_GRAY });
      headerCell("CUMPLE", L + guiaLabelW, top, guiaColW, h, 6.5);
      headerCell("NO CUMPLE", L + guiaLabelW + guiaColW, top, guiaColW, h, 6.5);
      headerCell("NO APLICA", L + guiaLabelW + guiaColW * 2, top, guiaColW, h, 6.5);
    }

    const guiaRow = (label: string, value: string | boolean | null | undefined) => {
      const { top, h } = ROW(20);

      drawRect(page, L, top - h, guiaLabelW, h);
      leftText(page, label, L + 2, top - h, guiaLabelW - 4, h, font, 6.5);

      const v = typeof value === "string" ? value.toLowerCase() : value;

      let cumple = "", noCumple = "", noAplica = "";

      const isCumple = v === true || v === "cumple";
      const isNoCumple = v === false || v === "no_cumple";
      const isNoAplica = v === "no_aplica";

      if (isCumple) cumple = "X";
      if (isNoCumple) noCumple = "X";
      if (isNoAplica) noAplica = "X";

      valueCell(cumple, L + guiaLabelW, top, guiaColW, h, isCumple ? rgb(1, 0.9, 0.4) : undefined);
      valueCell(noCumple, L + guiaLabelW + guiaColW, top, guiaColW, h, isNoCumple ? rgb(1, 0.9, 0.4) : undefined);
      valueCell(noAplica, L + guiaLabelW + guiaColW * 2, top, guiaColW, h, isNoAplica ? rgb(1, 0.9, 0.4) : undefined);
    };
    guiaRow("CUMPLE CON EL TEMA PROGRAMADO EN LA GUÍA DE PRÁCTICA PARA\nEL DESARROLLO DE LA CLASE PRÁCTICA", cg?.tema_programado);
    guiaRow("SE EVIDENCIA EL LOGRO A MEDIR EN LA PRÁCTICA DESARROLLADA", cg?.logro);
    guiaRow("CUENTA CON UNA RÚBRICA DE EVALUACIÓN", cg?.rubrica);

    {
      const { top, h } = ROW(24);
      drawRect(page, L, top - h, W, h);

      leftText(page, "OBSERVACIONES:", L + 2, top - h, 80, h, fontB, 6.5);
      leftText(page, cg?.observaciones ?? "", L + 90, top - h, W - 90, h, font, 6.5);
    }

    // ─────────────────────────────────────────────────────────────────────
    // RESPONSABLE
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(14);
      drawRect(page, L, top - h, W, h);
      text(page, "RESPONSABLE DE REALIZAR LA ACTIVIDAD:", L + 2, top - h + (h - 7) / 2, fontB, 6.5);
      text(page, responsable, L + 165, top - h + (h - 7) / 2, font, 7);
    }

    // ─────────────────────────────────────────────────────────────────────
    // REQUERIMIENTOS
    // ─────────────────────────────────────────────────────────────────────
    {
      const { top, h } = ROW(24);
      drawRect(page, L, top - h, W, h);
      text(page, "REQUERIMIENTOS SOLICITADOS EN LA VISITA INOPINADA:", L + 2, top - h + (h - 7) / 2, fontB, 6.5);
      text(page, cg?.requerimientos ?? "", L + 210, top - h + (h - 7) / 2, font, 7);
    }

    // ─────────────────────────────────────────────────────────────────────
    // FIRMAS
    // ─────────────────────────────────────────────────────────────────────
    {
      const sigY = rowTop - 35;
      const lineLen = 150;
      const leftSigX = L + 60;
      const rightSigX = L + W - 60 - lineLen;

      page.drawLine({ start: { x: leftSigX, y: sigY }, end: { x: leftSigX + lineLen, y: sigY }, thickness: 0.8, color: BLACK });
      centeredText(page, "FIRMA DEL   DOCENTE", leftSigX, sigY - 14, lineLen, 11, fontB, 7.5);

      page.drawLine({ start: { x: rightSigX, y: sigY }, end: { x: rightSigX + lineLen, y: sigY }, thickness: 0.8, color: BLACK });
      centeredText(page, "FIRMA DEL RESPONSABLE DE LA VISITA", rightSigX, sigY - 14, lineLen, 11, fontB, 7.5);
    }

    // ─────────────────────────────────────────────────────────────────────
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=ficha-${id}.pdf`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}