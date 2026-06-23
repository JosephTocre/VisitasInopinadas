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

      // Para otros textos, solo capitalizar la primera letra
      return (
        value.replace(/_/g, " ").charAt(0).toUpperCase() +
        value.replace(/_/g, " ").slice(1).toLowerCase()
      );
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

    let y = 15;

    doc.setFontSize(16);
    doc.text(`Detalle de Visita #${visita.id_visita}`, 14, y);
    y += 10;

    // DATOS GENERALES
    autoTable(doc, {
      startY: y,
      head: [["Campo", "Detalle"]],
      body: [
        ["Fecha", formatDate(visita.fecha)],
        ["Hora de inicio de visita", formatTime(visita.hora_inicio)],
        ["Hora de término de visita", formatTime(visita.hora_termino)],
        ["Sede o filial", formatField(visita.sede)],
        ["Ciclo", formatField(visita.ciclo)],
        ["Turno", formatField(visita.turno)],
        ["Curso o asignatura", formatField(visita.curso)],
        ["Campo Formativo", formatField(visita.campo_formativo)],
        ["Número de Semana", visita.n_semana || "N/A"],
        ["Hora práctica/hora teoría", visita.hora_practica_teoria || "N/A"],
        [
          "Requerimientos solicitados en la visita inopinada",
          typeof visita.controlGuia.requerimientos === "string"
            ? visita.controlGuia.requerimientos
            : "N/A",
        ],
        ["Lugar de la visita", visita.lugar || "N/A"],
        [
          "Responsable de realizar la actividad",
          visita.usuario
            ? `${visita.usuario.nombre} ${visita.usuario.apellidos}`
            : "N/A",
        ],
      ],
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // CONTROL DOCENTE
    doc.setFontSize(12);
    doc.text("1. CONTROL DOCENTE (ASISTENCIA, HORARIO, COMPORTAMIENTO)", 14, y);
    y += 3;

    autoTable(doc, {
      startY: y,
      body: visita.controlDocente
        ? [
            [
              "Docente",
              `${formatField(
                visita.controlDocente.nombre_docente,
              )} ${formatField(visita.controlDocente.apellido_docente)}`,
            ],
            ["Actividad", formatField(visita.controlDocente.actividad)],
            ["Presente", formatField(visita.controlDocente.presente)],
            [
              "Horario programado",
              formatField(
                visita.controlDocente.horario_programado,
                undefined,
                true,
              ),
            ],
            ["Interacción", formatField(visita.controlDocente.interaccion)],
            ["Observaciones", formatField(visita.controlDocente.observaciones)],
          ]
        : [["Información", "Sin datos"]],
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // CONTROL MATERIAL
    doc.text(
      "2. REGISTRO DE MATERIAL A UTILIZAR CARGADO EN AULA VIRTUAL",
      14,
      y,
    );
    y += 3;

    autoTable(doc, {
      startY: y,
      body: visita.controlMaterial
        ? [
            ["Cumple", formatField(visita.controlMaterial.cumple)],
            [
              "Observaciones",
              formatField(visita.controlMaterial.observaciones),
            ],
          ]
        : [["Información", "Sin datos"]],
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // CONTROL ESTUDIANTE
    doc.text("3. CONTROL DE REGISTRO DE ASISTENCIA DE ESTUDIANTES", 14, y);
    y += 3;

    autoTable(doc, {
      startY: y,
      body: visita.controlEstudiante
        ? [
            [
              "Control en ambiente",
              formatField(
                visita.controlEstudiante.control_ambiente,
                undefined,
                true,
              ),
            ],
            [
              "Observaciones ambiente",
              formatField(visita.controlEstudiante.observaciones_ambiente),
            ],
            [
              "Control en intranet",
              formatField(
                visita.controlEstudiante.control_intranet,
                undefined,
                true,
              ),
            ],
            [
              "Observaciones intranet",
              formatField(visita.controlEstudiante.observaciones_intranet),
            ],
            [
              "Observaciones",
              formatField(visita.controlEstudiante.observaciones),
            ],
          ]
        : [["Información", "Sin datos"]],
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // CONTROL SILABO
    doc.text("4. CONTROL DEL AVANCE SILÁBICO", 14, y);
    y += 3;

    autoTable(doc, {
      startY: y,
      body: visita.controlSilabo
        ? [
            [
              "El tema del sílabo coincide con la clase desarrollada en la fecha de la visita",
              formatField(
                visita.controlSilabo.coincidencia_actual,
                undefined,
                true,
              ),
            ],
            [
              "El tema desarrollado en la fecha anterior a la visita coincide con el sílabo",
              formatField(
                visita.controlSilabo.coincidencia_anterior,
                undefined,
                true,
              ),
            ],
            [
              "Ingreso del avance silabico en el aula virtual",
              formatField(visita.controlSilabo.ingreso_avance, undefined, true),
            ],
            ["Observaciones", formatField(visita.controlSilabo.observaciones)],
          ]
        : [["Información", "Sin datos"]],
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // CONTROL GUÍA
    doc.text("5. CUMPLE CON EL DESARROLLO DE LA GUÍA DE PRÁCTICA", 14, y);
    y += 3;

    autoTable(doc, {
      startY: y,
      body: visita.controlGuia
        ? [
            [
              "Cumple con el tema programado en la guía de práctica para el desarrollo de la clase práctica",
              formatField(visita.controlGuia.tema_programado, undefined, true),
            ],
            [
              "Se evidencia el logro a medir en la práctica desarrollada",
              formatField(visita.controlGuia.logro, undefined, true),
            ],
            [
              "Cuenta con una rúbrica de evaluación",
              formatField(visita.controlGuia.rubrica, undefined, true),
            ],
            [
              "Observaciones",
              formatField(visita.controlGuia.observaciones, undefined, true),
            ],
          ]
        : [["Información", "Sin datos"]],
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
                    Ingreso del avance silabico en el aula virtual:
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
