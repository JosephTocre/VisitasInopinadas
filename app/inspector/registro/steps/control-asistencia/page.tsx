"use client";

import { useState } from "react";

type ControlAsistenciaStepProps = {
  onBack: () => void;
  onNext: () => void;
};

export default function ControlAsistenciaStep({
  onBack,
  onNext,
}: ControlAsistenciaStepProps) {
  const [ambienteCumple, setAmbienteCumple] = useState<"cumple" | "no_cumple">("cumple");
  const [intranetCumple, setIntranetCumple] = useState<"cumple" | "no_cumple">("cumple");
  const [error, setError] = useState("");

  const [formulario, setFormulario] = useState({
    observacionAmbiente: "",
    observacionIntranet: "",
    observacionesGenerales: "",
    observacionesSilabo: "",
  });

  const continuar = () => {
    if (
      !formulario.observacionAmbiente.trim() ||
      !formulario.observacionIntranet.trim()
    ) {
      setError("Debe completar todos los campos obligatorios.");
      return;
    }

    setError("");

    sessionStorage.setItem(
      "controlAsistencia",
      JSON.stringify({
        ambienteCumple,
        intranetCumple,
        ...formulario,
      })
    );

    onNext();
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
                  checked={ambienteCumple === "cumple"}
                  onChange={() => setAmbienteCumple("cumple")}
                />

                <RadioOption
                  label="No cumple"
                  checked={ambienteCumple === "no_cumple"}
                  onChange={() => setAmbienteCumple("no_cumple")}
                />
              </div>
            </div>

            <div>
              <label className="label-modern">
                Observaciones
              </label>

              <input
                type="text"
                value={formulario.observacionAmbiente}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
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
                  checked={intranetCumple === "cumple"}
                  onChange={() => setIntranetCumple("cumple")}
                />

                <RadioOption
                  label="No cumple"
                  checked={intranetCumple === "no_cumple"}
                  onChange={() => setIntranetCumple("no_cumple")}
                />
              </div>
            </div>

            <div>
              <label className="label-modern">
                Observaciones
              </label>

              <input
                type="text"
                value={formulario.observacionIntranet}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
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
              value={formulario.observacionesGenerales}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
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