// app/registro/control-docente/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ControlDocentePage() {
  const router = useRouter();

  const [presente, setPresente] = useState<"si" | "no">("si");
  const [horario, setHorario] = useState<"cumple" | "no_cumple">("cumple");
  const [interaccion, setInteraccion] = useState<"si" | "no">("si");
  const [materialCumple, setMaterialCumple] = useState<"si" | "no">("si");

  return (
    <main className="min-h-screen bg-[#eaeaea] flex flex-col px-8 py-6">

      <Link
        href="/registro"
        className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-4 self-start hover:opacity-70 transition-opacity"
      >
        <span>←</span> Atrás
      </Link>

      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm px-10 py-8 flex flex-col gap-6">

        <h1 className="text-2xl font-extrabold text-black leading-snug">
          Control docente (Asistencia, horario, comportamiento)
        </h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Docente</label>
          <div className="relative">
            <select className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black">
              <option value=""></option>
              <option>Prof. García</option>
              <option>Prof. Martínez</option>
              <option>Prof. López</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Actividad</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Presente</label>
            <RadioOption
              label="Sí"
              checked={presente === "si"}
              onChange={() => setPresente("si")}
            />
            <RadioOption
              label="NO"
              checked={presente === "no"}
              onChange={() => setPresente("no")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Horario Programado</label>
            <RadioOption
              label="Cumple"
              checked={horario === "cumple"}
              onChange={() => setHorario("cumple")}
            />
            <RadioOption
              label="No Cumple"
              checked={horario === "no_cumple"}
              onChange={() => setHorario("no_cumple")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Interacción</label>
            <RadioOption
              label="Sí"
              checked={interaccion === "si"}
              onChange={() => setInteraccion("si")}
            />
            <RadioOption
              label="NO"
              checked={interaccion === "no"}
              onChange={() => setInteraccion("no")}
            />
          </div>

        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observaciones</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <h2 className="text-xl font-extrabold text-black leading-snug">
          Registro de material a utilizar cargado en aula virtual antes del inicio de clases
        </h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Cumple</label>
          <RadioOption
            label="Sí"
            checked={materialCumple === "si"}
            onChange={() => setMaterialCumple("si")}
          />
          <RadioOption
            label="NO"
            checked={materialCumple === "no"}
            onChange={() => setMaterialCumple("no")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observaciones</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <button
          onClick={() => router.push("/registro/control-asistencia")}
          className="w-full bg-black text-white font-semibold text-base rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors"
        >
          Continuar <span>→</span>
        </button>

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
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          checked ? "border-black" : "border-gray-400"
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