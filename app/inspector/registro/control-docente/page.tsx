"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ControlDocentePage() {
  const [presente, setPresente] = useState<"si" | "no">("si");
  const [horario, setHorario] = useState<"cumple" | "no_cumple">("cumple");
  const [interaccion, setInteraccion] = useState<"si" | "no">("si");
  const [materialCumple, setMaterialCumple] = useState<"si" | "no">("si");
  const router = useRouter();

  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({
    nombreDocente: "",
    apellidoDocente: "",
    actividad: "",
    observaciones: "",
  });

  const continuar = () => {
    if (
      !formulario.nombreDocente.trim() ||
      !formulario.apellidoDocente.trim() ||
      !formulario.actividad.trim()
    ) {
      setError("Debe completar todos los campos obligatorios.");
      return;
    }

    setError("");

    sessionStorage.setItem(
      "controlDocente",
      JSON.stringify({
        ...formulario,
        presente,
        horario,
        interaccion,
      })
    );

    router.push("/inspector/registro/control-asistencia");
  };

  return (
    <main className="page-container">
      <Link
        href="/inspector/registro/registro-visita"
        className="max-w-3xl mx-auto w-full flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <span>←</span>
        Atrás
      </Link>

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
                value={formulario.nombreDocente}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
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
                value={formulario.apellidoDocente}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
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
              value={formulario.actividad}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
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
                  checked={presente === "si"}
                  onChange={() => setPresente("si")}
                />

                <RadioOption
                  label="No"
                  checked={presente === "no"}
                  onChange={() => setPresente("no")}
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
                  checked={horario === "cumple"}
                  onChange={() => setHorario("cumple")}
                />

                <RadioOption
                  label="No cumple"
                  checked={horario === "no_cumple"}
                  onChange={() => setHorario("no_cumple")}
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
                  checked={interaccion === "si"}
                  onChange={() => setInteraccion("si")}
                />

                <RadioOption
                  label="No"
                  checked={interaccion === "no"}
                  onChange={() => setInteraccion("no")}
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
              value={formulario.observaciones}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
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
                    checked={materialCumple === "si"}
                    onChange={() => setMaterialCumple("si")}
                  />

                  <RadioOption
                    label="No"
                    checked={materialCumple === "no"}
                    onChange={() => setMaterialCumple("no")}
                  />
                </div>
              </div>

              <div>
                <label className="label-modern">
                  Observaciones
                </label>

                <textarea
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