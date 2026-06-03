"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const [turno, setTurno] = useState<"mañana" | "noche">("mañana");
  const [tipoHora, setTipoHora] = useState<"practica" | "teoria">("teoria");
  const router = useRouter();

  const [error, setError] = useState("");

  const [formulario, setFormulario] = useState({
    sede: "",
    ciclo: "",
    curso: "",
    campoFormativo: "",
    semana: "",
    lugarVisita: "",
  });

  const continuar = () => {
    if (
      !formulario.sede ||
      !formulario.ciclo ||
      !formulario.curso ||
      !formulario.campoFormativo ||
      !formulario.semana ||
      !formulario.lugarVisita.trim()
    ) {
      setError(
        "Debe completar todos los campos."
      );
      return;
    }

    setError("");

    const visita = {
      sede: formulario.sede,
      ciclo: formulario.ciclo,
      curso: formulario.curso,
      campoFormativo: formulario.campoFormativo,
      semana: formulario.semana,
      lugarVisita: formulario.lugarVisita,
      turno,
      tipoHora,
      hora_inicio: new Date().toISOString(),
    };

    sessionStorage.setItem(
      "visita",
      JSON.stringify(visita)
    );

    router.push(
      "/inspector/registro/control-docente"
    );
  };

  return (
    <main className="min-h-screen bg-[#eaeaea] flex flex-col px-8 py-6">

      <Link href="#" className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-4 self-start hover:opacity-70 transition-opacity">
        <span>←</span> Atrás
      </Link>

      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm px-10 py-8 flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-extrabold text-black">Registro de visita</h1>
          <p className="text-sm text-gray-500 mt-1">Complete los datos del visitante</p>
          {error && (
            <div className="mt-3 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Sede o filial</label>
            <div className="relative">
              <select
                value={formulario.sede}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    sede: e.target.value,
                  })
                }
                className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black"
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Ciclo</label>
            <div className="relative">
              <select
                value={formulario.ciclo}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    ciclo: e.target.value,
                  })
                }
                className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value=""></option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
            </div>
          </div>
        </div>

        {/* Turno */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Turno</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTurno("mañana")}
              className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${turno === "mañana"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Mañana
            </button>
            <button
              onClick={() => setTurno("noche")}
              className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${turno === "noche"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Noche
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Asignatura</label>
          <div className="relative">
            <select
              value={formulario.curso}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  curso: e.target.value,
                })
              }
              className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black"
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
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Campo formativo</label>
            <div className="relative">
              <select
                value={formulario.campoFormativo}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    campoFormativo: e.target.value,
                  })
                }
                className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value=""></option>
                <option>Ingeniería</option>
                <option>Ciencias humanas</option>
                <option>Arquitectura</option>
                <option>Administración y negocios</option>
                <option>Ciencias de la comunicación</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Semana N°</label>
            <div className="relative">
              <select
                value={formulario.semana}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    semana: e.target.value,
                  })
                }
                className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value=""></option>
                {[...Array(16)].map((_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Tipo de hora</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTipoHora("practica")}
              className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${tipoHora === "practica"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Hora práctica
            </button>
            <button
              onClick={() => setTipoHora("teoria")}
              className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${tipoHora === "teoria"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Hora teoría
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Lugar de visita</label>
          <input
            type="text"
            value={formulario.lugarVisita}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                lugarVisita: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <button
          type="button"
          onClick={continuar}
          className="
            w-full
            bg-black
            text-white
            font-semibold
            text-base
            rounded-xl
            py-3
            flex
            items-center
            justify-center
            gap-3
            hover:bg-gray-900
            transition-colors
            mt-2">
          Continuar <span>→</span>
        </button>

      </div>

    </main>
  );
}