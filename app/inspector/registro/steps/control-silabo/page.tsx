"use client";

import { useState } from "react";
import { useControlSilaboStore } from "@/store/controlSilabo";

type ControlSilabicoStepProps = {
  onBack: () => void;
  onNext: () => void;
  visitaId: number;
};

export default function ControlSilaboStep({
  onBack,
  onNext,
  visitaId,
}: ControlSilabicoStepProps) {

  const { controlSilabo, setControlSilabo } = useControlSilaboStore();

  const [error, setError] = useState("");
  const MAX_CARACTERES = 100;

  const limpiarTexto = (valor: string) => {
    return valor
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+/, "")
      .slice(0, MAX_CARACTERES);
  };

  const continuar = async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(`/api/control-silabo/${visitaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...controlSilabo,
          visitaId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mensaje || "Error al guardar control silábico");
      }

      onNext();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
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
        <div className="space-y-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="page-title">
                Control de avance silábico
              </h1>

              <p className="page-subtitle">
                Registra el cumplimiento del avance silábico
              </p>
              {error && (
                <div className="mt-4 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="label-modern">
                El tema del sílabo coincide con la clase desarrollada en la fecha de la visita
              </label>
              <div className="flex flex-col gap-3">
                <RadioOption
                  label="Cumple"
                  checked={controlSilabo.silabo1 === "cumple"}
                  onChange={() => setControlSilabo({ silabo1: "cumple" })}
                />

                <RadioOption
                  label="No cumple"
                  checked={controlSilabo.silabo1 === "no_cumple"}
                  onChange={() => setControlSilabo({ silabo1: "no_cumple" })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="label-modern">
                El tema desarrollado en la fecha anterior a la visita coincide con el sílabo
              </label>
              <div className="flex flex-col gap-3">
                <RadioOption
                  label="Cumple"
                  checked={controlSilabo.silabo2 === "cumple"}
                  onChange={() => setControlSilabo({ silabo2: "cumple" })}
                />

                <RadioOption
                  label="No cumple"
                  checked={controlSilabo.silabo2 === "no_cumple"}
                  onChange={() => setControlSilabo({ silabo2: "no_cumple" })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="label-modern">
                Ingreso del avance silábico en el aula virtual
              </label>
              <div className="flex flex-col gap-3">
                <RadioOption
                  label="Cumple"
                  checked={controlSilabo.silabo3 === "cumple"}
                  onChange={() => setControlSilabo({ silabo3: "cumple" })}
                />

                <RadioOption
                  label="No cumple"
                  checked={controlSilabo.silabo3 === "no_cumple"}
                  onChange={() => setControlSilabo({ silabo3: "no_cumple" })}
                />
              </div>
            </div>

            <div>
              <label className="label-modern flex justify-between items-center">
                <span>Observaciones</span>
                <span className="text-xs text-gray-500">
                  {controlSilabo.observacionesSilabo?.length || 0}/{MAX_CARACTERES}
                </span>
              </label>

              <textarea
                value={controlSilabo.observacionesSilabo}
                onChange={(e) =>
                  setControlSilabo({
                    ...controlSilabo,
                    observacionesSilabo: limpiarTexto(e.target.value),
                  })
                }
                rows={4}
                className="input-modern resize-none"
                placeholder="Ingrese observaciones sobre el control silábico"
              />
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