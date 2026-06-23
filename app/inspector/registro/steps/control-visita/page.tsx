"use client";

import { useState } from "react";
import { useVisitaStore } from "@/store/visitaStore";

type ControlVisitaStepProps = {
  onBack: () => void;
  onNext: (id: number) => void;
};

export default function ControlVisitaStep({
  onBack,
  onNext,
}: ControlVisitaStepProps) {
  const visitaId = useVisitaStore((state) => state.visitaId);
  const setVisitaId = useVisitaStore((state) => state.setVisitaId);
  const setControlVisita = useVisitaStore((state) => state.setControlVisita);
  const formulario = useVisitaStore((state) => state.controlVisita);
  const turno = useVisitaStore((state) => state.controlVisita.turno);
  const tipoHora = useVisitaStore((state) => state.controlVisita.tipoHora);

  const [error, setError] = useState("");
  const MAX_CARACTERES = 100;

  const limpiarTexto = (valor: string) => {
    return valor
      .replace(/\s{2,}/g, " ") // evita doble o más espacios
      .slice(0, MAX_CARACTERES); // limita a 100
  };

  const continuar = async () => {
    if (
      !formulario.sede ||
      !formulario.ciclo ||
      !formulario.turno ||
      !formulario.curso ||
      !formulario.campoFormativo ||
      !formulario.semana ||
      !formulario.tipoHora ||
      !formulario.lugarVisita.trim()
    ) {
      setError("Debe completar todos los campos.");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("token");

      // =========================
      // 1. SI YA EXISTE → UPDATE
      // =========================
      if (visitaId) {
        await fetch(`/api/visitas/${visitaId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sede: formulario.sede,
            ciclo: formulario.ciclo,
            curso: formulario.curso,
            campoFormativo: formulario.campoFormativo,
            semana: formulario.semana,
            lugarVisita: formulario.lugarVisita,
            turno,
            tipoHora,
          }),
        });

        onNext(visitaId);
        return;
      }

      const res = await fetch("/api/visitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sede: formulario.sede,
          ciclo: formulario.ciclo,
          curso: formulario.curso,
          campoFormativo: formulario.campoFormativo,
          semana: formulario.semana,
          lugarVisita: formulario.lugarVisita,
          turno,
          tipoHora,
          hora_inicio: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al guardar");
      }

      setVisitaId(data.id_visita);

      onNext(data.id_visita);
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
        <div className="space-y-6">
          <div>
            <h1 className="page-title">
              Registro de visita
            </h1>

            <p className="page-subtitle">
              Complete los datos de la visita
            </p>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          {/*sede y ciclo*/}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-modern">
                Sede o filial
              </label>

              <select
                value={formulario.sede}
                onChange={(e) =>
                  setControlVisita({
                    ...formulario,
                    sede: e.target.value,
                  })
                }
                className="select-modern"
              >
                <option value=""></option>
                <option>Lima Centro</option>
                <option>Lima Norte</option>
                <option>Lima Sur</option>
                <option>San Juan de Lurigancho</option>
                <option>Ate</option>
                <option>Arequipa</option>
                <option>Chiclayo</option>
                <option>Chimbote</option>
                <option>Piura</option>
                <option>Huancayo</option>
                <option>Ica</option>
                <option>Trujillo</option>
                <option>Tacna</option>
                <option>Iquitos</option>
                <option>Pucallpa</option>
              </select>
            </div>

            <div>
              <label className="label-modern">
                Ciclo
              </label>

              <select
                value={formulario.ciclo}
                onChange={(e) =>
                  setControlVisita({
                    ...formulario,
                    ciclo: e.target.value,
                  })
                }
                className="select-modern"
              >
                <option value=""></option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Turno */}
          <div>
            <label className="label-modern">
              Turno
            </label>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setControlVisita({
                    ...formulario,
                    turno: "mañana",
                  })
                }
                className={`btn-option ${turno === "mañana"
                  ? "btn-option-active"
                  : ""
                  }`}
              >
                Mañana
              </button>

              <button
                type="button"
                onClick={() =>
                  setControlVisita({
                    ...formulario,
                    turno: "noche",
                  })
                }
                className={`btn-option ${turno === "noche"
                  ? "btn-option-active"
                  : ""
                  }`}
              >
                Noche
              </button>
            </div>
          </div>

          {/* Asignatura */}
          <div>
            <label className="label-modern">
              Asignatura
            </label>

            <select
              value={formulario.curso}
              onChange={(e) =>
                setControlVisita({
                  ...formulario,
                  curso: e.target.value,
                })
              }
              className="select-modern"
            >
              <option value=""></option>
              <option>DESARROLLO FULL STACK</option>
              <option>TALLER DE PROGRAMACIÓN WEB</option>
              <option>SISTEMAS OPERATIVOS</option>
              <option>ALGORITMOS Y ESTRUCTURAS DE DATOS</option>
              <option>REDES Y COMUNICACIÓN DE DATOS 1</option>
              <option>REDES Y COMUNICACIÓN DE DATOS 2</option>
              <option>DISEÑO DE PATRONES</option>
              <option>BASE DE DATOS</option>
              <option>CURSO INTEGRADOR 1</option>
              <option>CURSO INTEGRADOR 2</option>
              <option>SEGURIDAD INFORMÁTICA</option>
              <option>DESARROLLO WEB INTEGRADO</option>
              <option>CALIDAD DE SOFTWARE</option>
            </select>
          </div>

          {/* Campo formativo y semana */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-modern">
                Campo formativo
              </label>

              <select
                value={formulario.campoFormativo}
                onChange={(e) =>
                  setControlVisita({
                    ...formulario,
                    campoFormativo: e.target.value,
                  })
                }
                className="select-modern"
              >
                <option value=""></option>
                <option>Ingeniería</option>
                <option>Ciencias humanas</option>
                <option>Arquitectura</option>
                <option>Administración y negocios</option>
                <option>Ciencias de la comunicación</option>
              </select>
            </div>

            <div>
              <label className="label-modern">
                Semana N°
              </label>

              <select
                value={formulario.semana}
                onChange={(e) =>
                  setControlVisita({
                    ...formulario,
                    semana: e.target.value,
                  })
                }
                className="select-modern"
              >
                <option value=""></option>

                {[...Array(16)].map((_, i) => (
                  <option key={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tipo de hora */}
          <div>
            <label className="label-modern">
              Tipo de hora
            </label>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setControlVisita({
                    ...formulario,
                    tipoHora: "practica",
                  })
                } className={`btn-option ${tipoHora === "practica"
                  ? "btn-option-active"
                  : ""
                  }`}
              >
                Hora práctica
              </button>

              <button
                type="button"
                onClick={() =>
                  setControlVisita({
                    ...formulario,
                    tipoHora: "teoria",
                  })
                } className={`btn-option ${tipoHora === "teoria"
                  ? "btn-option-active"
                  : ""
                  }`}
              >
                Hora teoría
              </button>
            </div>
          </div>

          {/* Lugar de visita */}
          <div>
            <label className="label-modern flex justify-between items-center">
              <span>Lugar de visita</span>
              <span className="text-xs text-gray-500">
                {formulario.lugarVisita?.length || 0}/{MAX_CARACTERES}
              </span>
            </label>

            <input
              type="text"
              value={formulario.lugarVisita}
              onChange={(e) =>
                setControlVisita({
                  ...formulario,
                  lugarVisita: limpiarTexto(e.target.value),
                })
              }
              className="input-modern"
              placeholder="Ingrese el lugar de visita "
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