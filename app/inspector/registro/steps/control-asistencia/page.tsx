"use client";

import { useState } from "react";
import { useControlAsistenciaStore } from "@/store/controlAsistencia";

type ControlAsistenciaStepProps = {
  onBack: () => void;
  onNext: () => void;
  visitaId: number;
};

export default function ControlAsistenciaStep({
  onBack,
  onNext,
  visitaId,
}: ControlAsistenciaStepProps) {
  const { controlAsistencia, setControlAsistencia } = useControlAsistenciaStore();
  const [error, setError] = useState("");

  const continuar = async () => {
    if (
      !controlAsistencia.ambienteCumple ||
      !controlAsistencia.intranetCumple
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

      const res = await fetch(`/api/control-asistencia/${visitaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...controlAsistencia,
          visitaId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mensaje || "Error al guardar control");
      }

      onNext();
    } catch (err: unknown) {
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
              Registro asistencia de estudiantes
            </h1>

            <p className="page-subtitle">
              Completa el siguiente formulario para registrar la asistencia de los estudiantes durante la visita.
            </p>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          {/* Controles ambiente */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-border pb-3">
              Control ambiente
            </h2>

            <div className="flex flex-col gap-3">
              <label className="label-modern">
                Estado
              </label>

              <div className="flex gap-8">
                <RadioOption
                  label="Cumple"
                  checked={controlAsistencia.ambienteCumple === "cumple"}
                  onChange={() =>
                    setControlAsistencia({ ambienteCumple: "cumple" })
                  }
                />

                <RadioOption
                  label="No cumple"
                  checked={controlAsistencia.ambienteCumple === "no_cumple"}
                  onChange={() =>
                    setControlAsistencia({ ambienteCumple: "no_cumple" })
                  }
                />
              </div>
            </div>

            <div>
              <label className="label-modern">
                Observaciones
              </label>

              <input
                type="text"
                value={controlAsistencia.observacionAmbiente}
                onChange={(e) =>
                  setControlAsistencia({
                    ...controlAsistencia,
                    observacionAmbiente: e.target.value,
                  })
                }
                className="input-modern"
              />
            </div>
          </div>

          {/* Controles intranet */}
          <div className="space-y-4 border-t border-border pt-6">
            <h2 className="text-xl font-bold">
              Control en intranet
            </h2>

            <div className="flex flex-col gap-3">
              <label className="label-modern">
                Estado
              </label>

              <div className="flex gap-8">
                <RadioOption
                  label="Cumple"
                  checked={controlAsistencia.intranetCumple === "cumple"}
                  onChange={() =>
                    setControlAsistencia({ intranetCumple: "cumple" })
                  }
                />

                <RadioOption
                  label="No cumple"
                  checked={controlAsistencia.intranetCumple === "no_cumple"}
                  onChange={() =>
                    setControlAsistencia({ intranetCumple: "no_cumple" })
                  }
                />
              </div>
            </div>

            <div>
              <label className="label-modern">
                Observaciones
              </label>

              <input
                type="text"
                value={controlAsistencia.observacionIntranet}
                onChange={(e) =>
                  setControlAsistencia({
                    ...controlAsistencia,
                    observacionIntranet: e.target.value,
                  })
                }
                className="input-modern"
              />
            </div>
          </div>

          {/*observaciones generales */}
          <div className="space-y-4 border-t border-border pt-6">
            <label className="label-modern">
              Observaciones generales
            </label>

            <input
              type="text"
              value={controlAsistencia.observacionesGenerales}
              onChange={(e) =>
                setControlAsistencia({
                  ...controlAsistencia,
                  observacionesGenerales: e.target.value,
                })
              }
              className="input-modern"
            />
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
  bold = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  bold?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-2 text-sm text-gray-800 ${bold ? "font-bold" : "font-medium"}`}
    >
      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${checked ? "border-black" : "border-gray-400"
          }`}
      >
        {checked && <span className="w-2.5 h-2.5 rounded-full bg-black block" />}
      </span>
      {label}
    </button>
  );
}