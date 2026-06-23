"use client";

import { useControlDocenteStore } from "@/store/controlDocente";
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

  const [error, setError] = useState("");

  const continuar = async () => {
    if (
      !controlDocente.nombreDocente.trim() ||
      !controlDocente.apellidoDocente.trim() ||
      !controlDocente.actividad.trim() ||
      !controlDocente.presente ||
      !controlDocente.horario ||
      !controlDocente.interaccion ||
      !controlDocente.materialCumple
    ) {
      setError("Debe completar todos los campos obligatorios.");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch("/api/control-docente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...controlDocente,
          visitaId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mensaje || "Error al guardar");
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
              <label className="label-modern">
                Nombre del docente
              </label>

              <input
                type="text"
                value={controlDocente.nombreDocente}
                onChange={(e) =>
                  setControlDocente({
                    ...controlDocente,
                    nombreDocente: e.target.value,
                  })
                }
                className="input-modern"
                placeholder="Ingrese el nombre"
              />
            </div>

            <div>
              <label className="label-modern">
                Apellido del docente
              </label>

              <input
                type="text"
                value={controlDocente.apellidoDocente}
                onChange={(e) =>
                  setControlDocente({
                    ...controlDocente,
                    apellidoDocente: e.target.value,
                  })
                }
                className="input-modern"
                placeholder="Ingrese el apellido"
              />
            </div>
          </div>

          {/* Actividad */}
          <div>
            <label className="label-modern">
              Actividad
            </label>

            <input
              type="text"
              value={controlDocente.actividad}
              onChange={(e) =>
                setControlDocente({
                  ...controlDocente,
                  actividad: e.target.value,
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
            <label className="label-modern">
              Observaciones
            </label>

            <textarea
              value={controlDocente.observaciones}
              onChange={(e) =>
                setControlDocente({
                  ...controlDocente,
                  observaciones: e.target.value,
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
                    checked={controlDocente.materialCumple === "si"}
                    onChange={() => setControlDocente({ ...controlDocente, materialCumple: "si" })}
                  />

                  <RadioOption
                    label="No"
                    checked={controlDocente.materialCumple === "no"}
                    onChange={() => setControlDocente({ ...controlDocente, materialCumple: "no" })}
                  />
                </div>
              </div>

              <div>
                <label className="label-modern">
                  Observaciones
                </label>

                <textarea
                  value={controlDocente.observacionesMaterial}
                  onChange={(e) =>
                    setControlDocente({
                      ...controlDocente,
                      observacionesMaterial: e.target.value,
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