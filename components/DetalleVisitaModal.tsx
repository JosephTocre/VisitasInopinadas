import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DetalleVisitaModalProps {
  visita: any;
  onClose: () => void;
}

export function DetalleVisitaModal({
  visita,
  onClose,
}: DetalleVisitaModalProps) {
  const formatField = (
    value: any,
    formatter?: (val: any) => string,
    useCumpleFormat = false,
  ) => {
    // Cambiamos a esta validación para permitir 'false' y '0'
    if (value === null || value === undefined || value === "") {
      return <span className="text-gray-400 italic">N/A</span>;
    }

    // Si el valor es booleano, lo convertimos a texto explícito
    if (typeof value === "boolean") {
      if (useCumpleFormat) {
        return value ? "Cumple" : "No cumple";
      }
      return value ? "Sí" : "No";
    }

    // Si es string, manejar normalización
    if (typeof value === "string") {
      // Reemplazar guiones bajos por espacios y convertir a minúsculas para comparar
      const normalized = value.replace(/_/g, " ").toLowerCase();

      // Si es un estado de cumplimiento, capitalizarlo y retornar
      if (["no cumple", "no aplica", "cumple"].includes(normalized)) {
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
      }
    }

    return formatter ? formatter(value) : value;
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    // Validamos si la fecha es válida
    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Cambia a false si prefieres formato 24h
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Validamos si la fecha es realmente válida
    if (isNaN(date.getTime())) return "Fecha inválida";

    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const exportarVisitaPDF = (visita: any) => {
    const doc = new jsPDF();

    let y = 20; // Aumentado de 10 a 20

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    doc.text("UNIVERSIDAD PRIVADA ...", 105, 20, { align: "center" }); 
    doc.text("VICERRECTORADO ACADÉMICO", 105, 25, { align: "center" });
    doc.text(
      "FACULTAD DE INGENIERÍAS - ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS",
      105,
      30, // Ajustado de 20 a 30
      { align: "center" },
    );

    y = 40;

    // Función auxiliar para configurar autoTable de forma consistente
    const createTable = (doc: any, startY: number, body: any[]) => {
      autoTable(doc, {
        startY,
        body,
        theme: "grid",
        styles: { fontSize: 8, cellPadding: 1 },
        headStyles: { fontSize: 8, cellPadding: 2 },
      });
      return (doc as any).lastAutoTable.finalY + 5;
    };

    // DATOS GENERALES
    y = createTable(doc, y, [
      [
        {
          content: "FECHA DE VISITA:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        formatDate(visita.fecha),
        {
          content: "HORA DE INICIO DE VISITA:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        formatTime(visita.hora_inicio),
        {
          content: "HORA DE TÉRMINO DE VISITA:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        formatTime(visita.hora_termino),
      ],
      [
        {
          content: "SEDE O FILIAL:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        formatField(visita.sede),
        {
          content: "CICLO:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        formatField(visita.ciclo),
        {
          content: "TURNO:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        formatField(visita.turno),
      ],
      [
        {
          content: "ASIGNATURA:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        {
          content: formatField(visita.curso),
          colSpan: 3,
        },
        {
          content: "CAMPO FORMATIVO",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        formatField(visita.campo_formativo),
      ],
      [
        {
          content: "SEMANA N°:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        {
          content: visita.n_semana || "N/A",
          colSpan: 3,
        },
        {
          content: "HORA PRÁCTICA/HORA TEORÍA:",
          styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
        },
        visita.hora_practica_teoria || "N/A",
      ],
      [
        { content: "LUGAR DE LA VISITA:", styles: { fontStyle: "bold" } },
        {
          content: visita.lugar || "N/A",
          colSpan: 5,
        },
      ],
    ]);

    // CONTROL DOCENTE
    doc.setFontSize(10);
    doc.text("1. CONTROL DOCENTE (ASISTENCIA, HORARIO, COMPORTAMIENTO)", 14, y);
    y += 2;

    y = createTable(
      doc,
      y,
      visita.controlDocente
        ? [
            [
              {
                content: "DOCENTE:",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: `${formatField(
                  visita.controlDocente.nombre_docente,
                )} ${formatField(visita.controlDocente.apellido_docente)}`,
              },
              {
                content: "PRESENTE",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                  halign: "center",
                },
              },
              {
                content: "HORARIO PROGRAMADO",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                  halign: "center",
                },
              },
              {
                content: "INTERACCIÓN",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                  halign: "center",
                },
              },
            ],
            [
              {
                content: "ACTIVIDAD:",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: formatField(visita.controlDocente.actividad),
              },
              {
                content: formatField(visita.controlDocente.presente),
                styles: {
                  halign: "center",
                },
              },
              {
                content: formatField(
                  visita.controlDocente.horario_programado,
                  undefined,
                  true,
                ),
                styles: {
                  halign: "center",
                },
              },
              {
                content: formatField(visita.controlDocente.interaccion),
                styles: {
                  halign: "center",
                },
              },
            ],
            [
              {
                content: "OBSERVACIONES:",
                styles: { fontStyle: "bold" },
              },
              {
                content: visita.controlDocente.observaciones || "N/A",
                colSpan: 4,
              },
            ],
          ]
        : [
            [
              {
                content: "INFORMACIÓN:",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: "Sin datos",
              },
            ],
          ],
    );

    // CONTROL MATERIAL
    doc.text(
      "2. REGISTRO DE MATERIAL A UTILIZAR CARGADO EN AULA VIRTUAL",
      14,
      y,
    );
    y += 2;

    y = createTable(
      doc,
      y,
      visita.controlMaterial
        ? [
            [
              {
                content: "CUMPLE:",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: formatField(visita.controlMaterial.cumple),
              },
            ],
            [
              {
                content: "OBSERVACIONES:",
                styles: { fontStyle: "bold" },
              },
              {
                content: visita.controlMaterial.observaciones || "N/A",
              },
            ],
          ]
        : [
            [
              {
                content: "INFORMACIÓN:",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                },
              },
              {
                content: "Sin datos",
              },
            ],
          ],
    );

    // CONTROL ESTUDIANTE
    doc.text("3. CONTROL DE REGISTRO DE ASISTENCIA DE ESTUDIANTES", 14, y);
    y += 2;

    y = createTable(
      doc,
      y,
      visita.controlEstudiante
        ? [
            [
              {
                content: "CONTROL",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                  halign: "center",
                },
              },
              {
                content: "CONTROL EN AMBIENTE",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                  halign: "center",
                },
                colSpan: 2,
              },
              {
                content: "CONTROL EN INTRANET",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                  halign: "center",
                },
                colSpan: 2,
              },
            ],
            [
              {
                content: "ASISTENCIA",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                  halign: "center",
                },
              },
              {
                content: formatField(
                  visita.controlEstudiante.control_ambiente,
                  undefined,
                  true,
                ),
              },
              // {
              //   content: "OBSERVACIONES AMBIENTE:",
              //   styles: {
              //     fillColor: [230, 230, 230],
              //     fontStyle: "bold",
              //   },
              // },
              {
                content: formatField(
                  visita.controlEstudiante.observaciones_ambiente || "N/A",
                ),
              },
              {
                content: formatField(
                  visita.controlEstudiante.control_intranet,
                  undefined,
                  true,
                ),
              },
              // {
              //   content: "OBSERVACIONES INTRANET:",
              //   styles: {
              //     fontStyle: "bold",
              //   },
              // },
              {
                content: formatField(
                  visita.controlEstudiante.observaciones_intranet || "N/A",
                ),
              },
            ],
            [
              {
                content: "OBSERVACIONES:",
                styles: {
                  fontStyle: "bold",
                },
              },
              {
                content: visita.controlEstudiante.observaciones || "N/A",
                colSpan: 4,
              },
            ],
          ]
        : [
            [
              {
                content: "INFORMACIÓN:",
                styles: {
                  fillColor: [230, 230, 230],
                  fontStyle: "bold",
                },
              },
              {
                content: "Sin datos",
              },
            ],
          ],
    );

    // CONTROL SILABO
    doc.text("4. CONTROL DEL AVANCE SILÁBICO", 14, y);
    y += 2;

    y = createTable(
      doc,
      y,
      visita.controlSilabo
        ? [
            [
              {
                content:
                  "EL TEMA DEL SÍLABO COINCIDE CON LA CLASE DESARROLLADA EN LA FECHA DE LA VISITA",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: formatField(
                  visita.controlSilabo.coincidencia_actual,
                  undefined,
                  true,
                ),
              },
            ],
            [
              {
                content:
                  "EL TEMA DESARROLLADO EN LA FECHA ANTERIOR A LA VISITA COINCIDE CON EL SÍLABO",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: formatField(
                  visita.controlSilabo.coincidencia_anterior,
                  undefined,
                  true,
                ),
              },
            ],
            [
              {
                content: "INGRESO DEL AVANCE SILÁBICO EN EL AULA VIRTUAL",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: formatField(
                  visita.controlSilabo.ingreso_avance,
                  undefined,
                  true,
                ),
              },
            ],
            [
              {
                content: "OBSERVACIONES:",
                styles: { fontStyle: "bold" },
              },
              {
                content: visita.controlSilabo.observaciones || "N/A",
              },
            ],
          ]
        : [
            [
              {
                content: "INFORMACIÓN:",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: "Sin datos",
              },
            ],
          ],
    );

    // CONTROL GUÍA
    doc.text("5. CUMPLE CON EL DESARROLLO DE LA GUÍA DE PRÁCTICA", 14, y);
    y += 2;

    y = createTable(
      doc,
      y,
      visita.controlGuia
        ? [
            [
              {
                content:
                  "CUMPLE CON EL TEMA PROGRAMADO EN LA GUÍA DE PRÁCTICA PARA EL DESARROLLO DE LA CLASE PRÁCTICA",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: formatField(
                  visita.controlGuia.tema_programado,
                  undefined,
                  true,
                ),
              },
            ],
            [
              {
                content:
                  "SE EVIDENCIA EL LOGRO A MEDIR EN LA PRÁCTICA DESARROLLADA",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: formatField(visita.controlGuia.logro, undefined, true),
              },
            ],
            [
              {
                content: "CUENTA CON UNA RÚBRICA DE EVALUACIÓN",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: formatField(
                  visita.controlGuia.rubrica,
                  undefined,
                  true,
                ),
              },
            ],
            [
              {
                content: "OBSERVACIONES:",
                styles: { fontStyle: "bold" },
              },
              {
                content: visita.controlGuia.observaciones
                  ? formatField(
                      visita.controlGuia.observaciones,
                      undefined,
                      true,
                    )
                  : "N/A",
              },
            ],
          ]
        : [
            [
              {
                content: "INFORMACIÓN:",
                styles: { fillColor: [230, 230, 230], fontStyle: "bold" },
              },
              {
                content: "Sin datos",
              },
            ],
          ],
    );

    // TABLA ADICIONAL: RESPONSABLE Y REQUERIMIENTOS
    y = createTable(doc, y, [
      [
        {
          content: "RESPONSABLE DE REALIZAR LA ACTIVIDAD:",
          styles: { fontStyle: "bold" },
        },
        {
          content: visita.usuario
            ? `${visita.usuario.nombre} ${visita.usuario.apellidos}`
            : "N/A",
        },
      ],
      [
        {
          content: "REQUERIMIENTOS SOLICITADOS EN LA VISITA INOPINADA:",
          styles: { fontStyle: "bold" },
        },
        {
          content: visita.controlGuia?.requerimientos || "N/A",
        },
      ],
    ]);

    // Aseguramos que haya espacio suficiente para las firmas
    let firmaY = (doc as any).lastAutoTable.finalY + 20;

    // Si supera el alto de página, agregamos una página nueva
    if (firmaY + 30 > doc.internal.pageSize.height - 20) {
      doc.addPage();
      firmaY = 30;
    }

    doc.setFontSize(13);
    doc.text("VISITA INOPINADA – CLASES PRESENCIALES", 105, firmaY, {
      align: "center",
    });

    firmaY += 30;

    doc.line(30, firmaY, 90, firmaY);
    doc.line(110, firmaY, 190, firmaY); // Raya de la 2da firma más larga

    doc.setFontSize(10);
    doc.text("FIRMA DEL DOCENTE", 60, firmaY + 5, {
      align: "center",
    });

    doc.text("FIRMA DEL RESPONSABLE DE LA VISITA", 150, firmaY + 5, {
      align: "center",
    });

    doc.save(`visita-${visita.id_visita}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl font-bold">
            Detalle de Visita #{visita.id_visita}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => exportarVisitaPDF(visita)}
              className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:opacity-90"
            >
              Generar PDF
            </button>
            <button
              onClick={onClose}
              className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:opacity-90"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="space-y-6 text-sm">
          <section>
            <div className="grid grid-cols-2 gap-2 px-2">
              <p>
                <span className="font-semibold">Fecha:</span>{" "}
                {formatDate(visita.fecha)}
              </p>
              <p>
                <span className="font-semibold">Hora de inicio de visita:</span>{" "}
                {formatTime(visita.hora_inicio)}
              </p>
              <p>
                <span className="font-semibold">
                  Hora de término de visita:
                </span>{" "}
                {formatTime(visita.hora_termino)}
              </p>
              <p>
                <span className="font-semibold">Sede o filial:</span>{" "}
                {formatField(visita.sede)}
              </p>
              <p>
                <span className="font-semibold">Ciclo:</span>{" "}
                {formatField(visita.ciclo)}
              </p>
              <p>
                <span className="font-semibold">Turno:</span>{" "}
                {formatField(visita.turno)}
              </p>
              <p>
                <span className="font-semibold">Curso o asignatura:</span>{" "}
                {formatField(visita.curso)}
              </p>
              <p>
                <span className="font-semibold">Campo Formativo:</span>{" "}
                {formatField(visita.campo_formativo)}
              </p>
              <p>
                <span className="font-semibold">Número de Semana:</span>{" "}
                {formatField(visita.n_semana)}
              </p>
              <p>
                <span className="font-semibold">
                  Hora práctica/hora teoría:
                </span>{" "}
                {formatField(visita.hora_practica_teoria)}
              </p>
              <p>
                <span className="font-semibold">
                  Requerimientos solicitados en la visita inopinada:
                </span>{" "}
                {formatField(visita.requerimientos)}
              </p>
              <p>
                <span className="font-semibold">Lugar de la visita:</span>{" "}
                {formatField(visita.lugar)}
              </p>
              <p>
                <span className="font-semibold">
                  Responsable de realizar la actividad:
                </span>{" "}
                {visita.usuario
                  ? `${visita.usuario.nombre} ${visita.usuario.apellidos}`
                  : "N/A"}
              </p>
            </div>
          </section>
          <section>
            <h3 className="font-bold text-gray-800 bg-gray-200 p-2 rounded mb-2">
              1. CONTROL DOCENTE (ASISTENCIA, HORARIO, COMPORTAMIENTO)
            </h3>
            {visita.controlDocente ? (
              <div className="grid grid-cols-2 gap-2 px-2">
                <p>
                  <span className="font-semibold">Docente:</span>{" "}
                  {formatField(visita.controlDocente.nombre_docente)}{" "}
                  {formatField(visita.controlDocente.apellido_docente)}
                </p>
                <p>
                  <span className="font-semibold">Actividad:</span>{" "}
                  {formatField(visita.controlDocente.actividad)}
                </p>
                <p>
                  <span className="font-semibold">Presente:</span>{" "}
                  {formatField(visita.controlDocente.presente)}
                </p>
                <p>
                  <span className="font-semibold">Horario programado:</span>{" "}
                  {formatField(
                    visita.controlDocente.horario_programado,
                    undefined,
                    true,
                  )}
                </p>
                <p>
                  <span className="font-semibold">Interacción:</span>{" "}
                  {formatField(visita.controlDocente.interaccion)}
                </p>
                <p>
                  <span className="font-semibold">Observaciones:</span>{" "}
                  {formatField(visita.controlDocente.observaciones)}
                </p>
              </div>
            ) : (
              <p className="px-2 italic text-gray-500">Sin datos</p>
            )}
          </section>

          <section>
            <h3 className="font-bold text-gray-800 bg-gray-200 p-2 rounded mb-2">
              2. REGISTRO DE MATERIAL A UTILIZAR CARGADO EN AULA VIRTUAL ANTES
              DEL INICIO DE CLASES
            </h3>
            {visita.controlMaterial ? (
              <div className="grid grid-cols-2 gap-2 px-2">
                <p>
                  <span className="font-semibold">Cumple:</span>{" "}
                  {formatField(visita.controlMaterial.cumple)}
                </p>
                <p>
                  <span className="font-semibold">Observaciones:</span>{" "}
                  {formatField(visita.controlMaterial.observaciones)}
                </p>
              </div>
            ) : (
              <p className="px-2 italic text-gray-500">Sin datos</p>
            )}
          </section>
          <section>
            <h3 className="font-bold text-gray-800 bg-gray-200 p-2 rounded mb-2">
              3. CONTROL DE REGISTRO DE ASISTENCIA DE ESTUDIANTES
            </h3>
            {visita.controlEstudiante ? (
              <div className="grid grid-cols-2 gap-2 px-2">
                <p>
                  <span className="font-semibold">Control en ambiente:</span>{" "}
                  {formatField(
                    visita.controlEstudiante.control_ambiente,
                    undefined,
                    true,
                  )}
                </p>
                <p>
                  <span className="font-semibold">
                    Observaciones en ambiente:
                  </span>{" "}
                  {formatField(visita.controlEstudiante.observaciones_ambiente)}
                </p>
                <p>
                  <span className="font-semibold">Control en intranet:</span>{" "}
                  {formatField(
                    visita.controlEstudiante.control_intranet,
                    undefined,
                    true,
                  )}
                </p>
                <p>
                  <span className="font-semibold">
                    Observaciones en intranet:
                  </span>{" "}
                  {formatField(visita.controlEstudiante.observaciones_intranet)}
                </p>
                <p>
                  <span className="font-semibold">Observaciones:</span>{" "}
                  {formatField(visita.controlEstudiante.observaciones)}
                </p>
              </div>
            ) : (
              <p className="px-2 italic text-gray-500">Sin datos</p>
            )}
          </section>
          <section>
            <h3 className="font-bold text-gray-800 bg-gray-200 p-2 rounded mb-2">
              4. CONTROL DEL AVANCE SILÁBICO
            </h3>
            {visita.controlSilabo ? (
              <div className="grid grid-cols-1 gap-2 px-2">
                <p>
                  <span className="font-semibold">
                    El tema del sílabo coincide con la clase desarrollada en la
                    fecha de la visita:
                  </span>{" "}
                  {formatField(
                    visita.controlSilabo.coincidencia_actual,
                    undefined,
                    true,
                  )}
                </p>
                <p>
                  <span className="font-semibold">
                    El tema desarrollado en la fecha anterior a la visita
                    coincide con el sílabo:
                  </span>{" "}
                  {formatField(
                    visita.controlSilabo.coincidencia_anterior,
                    undefined,
                    true,
                  )}
                </p>
                <p>
                  <span className="font-semibold">
                    Ingreso del avance del silabo en el aula virtual:
                  </span>{" "}
                  {formatField(
                    visita.controlSilabo.ingreso_avance,
                    undefined,
                    true,
                  )}
                </p>
                <p>
                  <span className="font-semibold">Observaciones:</span>{" "}
                  {formatField(visita.controlSilabo.observaciones)}
                </p>
              </div>
            ) : (
              <p className="px-2 italic text-gray-500">Sin datos</p>
            )}
          </section>
          <section>
            <h3 className="font-bold text-gray-800 bg-gray-200 p-2 rounded mb-2">
              5. CUMPLE CON EL DESARROLLO DE LA GUÍA DE PRÁCTICA
            </h3>
            {visita.controlGuia ? (
              <div className="grid grid-cols-1 gap-2 px-2">
                <p>
                  <span className="font-semibold">
                    Cumple con el tema programado en la guía de práctica para el
                    desarrollo de la clase práctica:
                  </span>{" "}
                  {formatField(visita.controlGuia.tema_programado)}
                </p>
                <p>
                  <span className="font-semibold">
                    Se evidencia el logro a medir en la práctica desarrollada:
                  </span>{" "}
                  {formatField(visita.controlGuia.logro)}
                </p>
                <p>
                  <span className="font-semibold">
                    Cuenta con una rúbrica de evaluación:
                  </span>{" "}
                  {formatField(visita.controlGuia.rubrica)}
                </p>
                <p>
                  <span className="font-semibold">Observaciones:</span>{" "}
                  {formatField(visita.controlGuia.observaciones)}
                </p>
              </div>
            ) : (
              <p className="px-2 italic text-gray-500">Sin datos</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
