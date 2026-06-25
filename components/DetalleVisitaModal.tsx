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
  const formatField = (value: any) => {
    // Agregamos trim() para detectar cadenas que solo tengan espacios
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    )
      return "N/A";

    // boolean
    if (typeof value === "boolean") {
      return value ? "Sí" : "No";
    }

    // number
    if (typeof value === "number") {
      return value.toString();
    }

    // string
    if (typeof value === "string") {
      const v = value.trim().toLowerCase();

      if (v === "no_cumple" || v === "no cumple") return "No cumple";
      if (v === "cumple") return "Cumple";
      if (v === "no_aplica" || v === "no aplica") return "No aplica";

      return value;
    }

    return String(value);
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    // Validamos si la fecha es válida
    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl font-bold">
            Detalle de Visita #{visita.id_visita}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() =>
                window.open(`/api/ficha/${visita.id_visita}/pdf`, "_blank")
              }
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
                {formatField(visita.controlGuia?.requerimientos)}
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
                  {formatField(visita.controlDocente.horario_programado)}
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
                  {formatField(visita.controlEstudiante.control_ambiente)}
                </p>
                <p>
                  <span className="font-semibold">
                    Observaciones en ambiente:
                  </span>{" "}
                  {formatField(visita.controlEstudiante.observaciones_ambiente)}
                </p>
                <p>
                  <span className="font-semibold">Control en intranet:</span>{" "}
                  {formatField(visita.controlEstudiante.control_intranet)}
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
                  {formatField(visita.controlSilabo.coincidencia_actual)}
                </p>
                <p>
                  <span className="font-semibold">
                    El tema desarrollado en la fecha anterior a la visita
                    coincide con el sílabo:
                  </span>{" "}
                  {formatField(visita.controlSilabo.coincidencia_anterior)}
                </p>
                <p>
                  <span className="font-semibold">
                    Ingreso del avance del silabo en el aula virtual:
                  </span>{" "}
                  {formatField(visita.controlSilabo.ingreso_avance)}
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
