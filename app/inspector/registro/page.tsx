// app/registro/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegistroPage() {
  const [turno, setTurno] = useState<"mañana" | "noche">("mañana");
  const [tipoHora, setTipoHora] = useState<"practica" | "teoria">("teoria");

  return (
    <main className="min-h-screen bg-[#eaeaea] flex flex-col px-8 py-6">

      <Link href="/inicio" className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-4 self-start hover:opacity-70 transition-opacity">
        <span>←</span> Volver al inicio
      </Link>

      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm px-10 py-8 flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-extrabold text-black">Registro de visita</h1>
          <p className="text-sm text-gray-500 mt-1">Complete los datos del visitante</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Sede o filial</label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black">
                <option value=""></option>
                <option>Sede Central</option>
                <option>Filial Norte</option>
                <option>Filial Sur</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Ciclo</label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black">
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
              className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                turno === "mañana"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Mañana
            </button>
            <button
              onClick={() => setTurno("noche")}
              className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                turno === "noche"
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
            <select className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black">
              <option value=""></option>
              <option>Desarrollo Full Stack</option>
              <option>Taller de programación web</option>
              <option>Desarrollo de aplicaciones móviles</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Campo formativo</label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black">
                <option value=""></option>
                <option>Ciencias</option>
                <option>Humanidades</option>
                <option>Artes</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Semana N°</label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black">
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
              className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                tipoHora === "practica"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Hora práctica
            </button>
            <button
              onClick={() => setTipoHora("teoria")}
              className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                tipoHora === "teoria"
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
            className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <Link
          href="/registro/control-docente"
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
        </Link>

      </div>

    </main>
  );
}