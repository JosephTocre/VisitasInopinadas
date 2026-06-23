"use client";

import { useControlDocenteStore } from "@/store/controlDocente";
import { useControlMaterialStore } from "@/store/controlMaterial";
import { useState } from "react";

type ControlDocenteStepProps = {
  onBack: () => void;
  onNext: () => void;
  visitaId: number;
};

export default function ControlDocenteStep({
  onBack,
  onNext,
  visitaId,
}: ControlDocenteStepProps) {
  const { controlDocente, setControlDocente } = useControlDocenteStore();
  const { controlMaterial, setControlMaterial } = useControlMaterialStore();

  const [error, setError] = useState("");
  const MAX_CARACTERES = 100;

  const limpiarTexto = (valor: string) => {
    return valor
      .replace(/\s{2,}/g, " ") // evita doble espacio
      .replace(/^\s+/, "") // opcional: evita espacios al inicio
      .slice(0, MAX_CARACTERES);
  };

  const continuar = async () => {
    const d = controlDocente;
    const m = controlMaterial;

    const camposInvalidos =
      !d.nombreDocente?.trim() ||
      !d.apellidoDocente?.trim() ||
      !d.actividad?.trim() ||
      !d.presente ||
      !d.horario ||
      !d.interaccion ||
      !m.cumple;

    if (camposInvalidos) {
      setError("Debe completar todos los campos obligatorios.");

      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("token");

      const [resDocente, resMaterial] = await Promise.all([
        fetch("/api/control-docente", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...controlDocente,
            visitaId,
          }),
        }),

        fetch("/api/control-material", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            visitaId,
            cumple: controlMaterial.cumple === "si",
            observaciones: controlMaterial.observaciones,
          }),
        }),
      ]);

      const dataDocente = await resDocente.json();
      const dataMaterial = await resMaterial.json();

      if (!resDocente.ok || !resMaterial.ok) {
        throw new Error(
          dataDocente?.mensaje ||
          dataMaterial?.mensaje ||
          "Error al guardar"
        );
      }

      onNext();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error desconocido"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="page-container">
      <button
        type="button"
        onClick={onBack}
        className="max-w-3xl mx-auto w-full flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <span>←</span>
        Atrás
      </button>

      <div className="max-w-3xl mx-auto card-modern">
        <div className="space-y-6">
          <div>
            <h1 className="page-title">
              Control de docente
            </h1>

            <p className="page-subtitle">
              Registra la información del docente y su desempeño durante la visita
            </p>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          {/* Docente */}
          {/* Nombre y apellido */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-modern flex justify-between items-center">
                <span>Nombre del docente</span>
                <span className="text-xs text-gray-500">
                  {controlDocente.nombreDocente?.length || 0}/{MAX_CARACTERES}
                </span>
              </label>

              <input
                type="text"
                value={controlDocente.nombreDocente}
                onChange={(e) =>
                  setControlDocente({
                    ...controlDocente,
                    nombreDocente: limpiarTexto(e.target.value),
                  })
                }
                className="input-modern"
                placeholder="Ingrese el nombre"
              />
            </div>

            <div>
              <label className="label-modern flex justify-between items-center">
                <span>Apellido del docente</span>
                <span className="text-xs text-gray-500">
                  {controlDocente.apellidoDocente?.length || 0}/{MAX_CARACTERES}
                </span>
              </label>

              <input
                type="text"
                value={controlDocente.apellidoDocente}
                onChange={(e) =>
                  setControlDocente({
                    ...controlDocente,
                    apellidoDocente: limpiarTexto(e.target.value),
                  })
                }
                className="input-modern"
                placeholder="Ingrese el apellido"
              />
            </div>
          </div>

          {/* Actividad */}
          <div>
            <label className="label-modern flex justify-between items-center">
              <span>Actividad</span>
              <span className="text-xs text-gray-500">
                {controlDocente.actividad?.length || 0}/{MAX_CARACTERES}
              </span>
            </label>

            <input
              type="text"
              value={controlDocente.actividad}
              onChange={(e) =>
                setControlDocente({
                  ...controlDocente,
                  actividad: limpiarTexto(e.target.value),
                })
              }
              className="input-modern"
              placeholder="Actividad realizada"
            />
          </div>

          {/* Presente, horario programado e interacción */}

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="label-modern">
                Presente
              </label>

              <div className="flex flex-col gap-3">
                <RadioOption
                  label="Sí"
                  checked={controlDocente.presente === "si"}
                  onChange={() => setControlDocente({ ...controlDocente, presente: "si" })}
                />

                <RadioOption
                  label="No"
                  checked={controlDocente.presente === "no"}
                  onChange={() => setControlDocente({ ...controlDocente, presente: "no" })}
                />
              </div>
            </div>

            <div>
              <label className="label-modern">
                Horario programado
              </label>

              <div className="flex flex-col gap-3">
                <RadioOption
                  label="Cumple"
                  checked={controlDocente.horario === "cumple"}
                  onChange={() => setControlDocente({ ...controlDocente, horario: "cumple" })}
                />

                <RadioOption
                  label="No cumple"
                  checked={controlDocente.horario === "no_cumple"}
                  onChange={() => setControlDocente({ ...controlDocente, horario: "no_cumple" })}
                />
              </div>
            </div>

            <div>
              <label className="label-modern">
                Interacción
              </label>

              <div className="flex flex-col gap-3">
                <RadioOption
                  label="Sí"
                  checked={controlDocente.interaccion === "si"}
                  onChange={() => setControlDocente({ ...controlDocente, interaccion: "si" })}
                />

                <RadioOption
                  label="No"
                  checked={controlDocente.interaccion === "no"}
                  onChange={() => setControlDocente({ ...controlDocente, interaccion: "no" })}
                />
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <label className="label-modern flex justify-between items-center">
              <span>Observaciones</span>
              <span className="text-xs text-gray-500">
                {controlDocente.observaciones?.length || 0}/{MAX_CARACTERES}
              </span>
            </label>

            <textarea
              value={controlDocente.observaciones}
              onChange={(e) =>
                setControlDocente({
                  ...controlDocente,
                  observaciones: limpiarTexto(e.target.value),
                })
              }
              rows={4}
              className="input-modern resize-none"
              placeholder="Ingrese observaciones"
            />
          </div>

          {/* Materiales en el aula virtual */}
          <div className="border-t-2 border-border pt-8">
            <h2 className="page-title text-xl mb-6">
              Registro de material a utilizar cargado en aula virtual antes del inicio de clases
            </h2>

            <div className="space-y-6">
              <div>
                <label className="label-modern">
                  Cumple
                </label>

                <div className="flex flex-col gap-3">
                  <RadioOption
                    label="Sí"
                    checked={controlMaterial.cumple === "si"}
                    onChange={() =>
                      setControlMaterial({ ...controlMaterial, cumple: "si" })
                    }
                  />

                  <RadioOption
                    label="No"
                    checked={controlMaterial.cumple === "no"}
                    onChange={() =>
                      setControlMaterial({ ...controlMaterial, cumple: "no" })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="label-modern flex justify-between items-center">
                  <span>Observaciones</span>
                  <span className="text-xs text-gray-500">
                    {controlDocente.observacionesMaterial?.length || 0}/{MAX_CARACTERES}
                  </span>
                </label>

                <textarea
                  value={controlMaterial.observaciones}
                  onChange={(e) =>
                    setControlMaterial({
                      ...controlMaterial,
                      observaciones: e.target.value,
                    })
                  }
                  rows={4}
                  className="input-modern resize-none"
                  placeholder="Ingrese observaciones"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={continuar}
            className="btn-primary w-full flex items-center justify-center gap-3 group mt-2"
          >
            Continuar

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>
      </div>

    </main>

  );
}

function RadioOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-2 text-sm text-gray-800 font-medium"
    >
      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? "border-black" : "border-gray-400"
          }`}
      >
        {checked && (
          <span className="w-2.5 h-2.5 rounded-full bg-black block" />
        )}
      </span>
      {label}
    </button>
  );
}