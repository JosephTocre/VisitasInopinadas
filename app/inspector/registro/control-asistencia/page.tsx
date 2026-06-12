// app/registro/control-asistencia/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ControlAsistenciaPage() {
  const router = useRouter();

  const [ambienteCumple, setAmbienteCumple] = useState<"cumple" | "no_cumple">("cumple");
  const [intranetCumple, setIntranetCumple] = useState<"cumple" | "no_cumple">("cumple");
  const [silabo1, setSilabo1] = useState<"cumple" | "no_cumple">("cumple");
  const [silabo2, setSilabo2] = useState<"cumple" | "no_cumple">("cumple");
  const [silabo3, setSilabo3] = useState<"cumple" | "no_cumple">("cumple");

  return (
    <main className="min-h-screen bg-[#eaeaea] flex flex-col px-8 py-6">

      <Link
        href="/registro"
        className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-4 self-start hover:opacity-70 transition-opacity"
      >
        <span>←</span> Atrás
      </Link>

      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm px-10 py-8 flex flex-col gap-6">

        <h1 className="text-2xl font-extrabold text-black">
          Control registro asistencia a estudiantes
        </h1>

        <div className="flex flex-col gap-3">
            <h2 className="text-base font-extrabold text-black">Control ambiente</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10">
            <div className="flex items-center gap-6 shrink-0">
                <RadioOption
                label="Cumple"
                checked={ambienteCumple === "cumple"}
                onChange={() => setAmbienteCumple("cumple")}
                />
                <RadioOption
                label="No Cumple"
                checked={ambienteCumple === "no_cumple"}
                onChange={() => setAmbienteCumple("no_cumple")}
                />
            </div>
            <input
                type="text"
                placeholder="Observaciones"
                className="w-full sm:flex-1 border border-gray-300 rounded-2xl py-2 px-3 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
            </div>
        </div>

        <div className="flex flex-col gap-3">
            <h2 className="text-base font-extrabold text-black">Control en intranet</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10">
            <div className="flex items-center gap-6 shrink-0">
                <RadioOption
                label="Cumple"
                checked={intranetCumple === "cumple"}
                onChange={() => setIntranetCumple("cumple")}
                />
                <RadioOption
                label="No Cumple"
                checked={intranetCumple === "no_cumple"}
                onChange={() => setIntranetCumple("no_cumple")}
                />
            </div>
            <input
                type="text"
                placeholder="Observaciones"
                className="w-full sm:flex-1 border border-gray-300 rounded-2xl py-2 px-3 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
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

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-black">Control de avance silábico</h2>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              El tema del sílabo coincide con la clase desarrollada en la fecha de la visita
            </p>
            <div className="flex items-center gap-6">
              <RadioOption
                label="Cumple"
                checked={silabo1 === "cumple"}
                onChange={() => setSilabo1("cumple")}
                bold
              />
              <RadioOption
                label="No cumple"
                checked={silabo1 === "no_cumple"}
                onChange={() => setSilabo1("no_cumple")}
                bold
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              El tema desarrollado en la fecha anterior a la visita coincide con el sílabo
            </p>
            <div className="flex items-center gap-6">
              <RadioOption
                label="Cumple"
                checked={silabo2 === "cumple"}
                onChange={() => setSilabo2("cumple")}
                bold
              />
              <RadioOption
                label="No cumple"
                checked={silabo2 === "no_cumple"}
                onChange={() => setSilabo2("no_cumple")}
                bold
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              Ingreso del avance silábico en el aula virtual
            </p>
            <div className="flex items-center gap-6">
              <RadioOption
                label="Cumple"
                checked={silabo3 === "cumple"}
                onChange={() => setSilabo3("cumple")}
                bold
              />
              <RadioOption
                label="No cumple"
                checked={silabo3 === "no_cumple"}
                onChange={() => setSilabo3("no_cumple")}
                bold
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observaciones</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <button
          onClick={() => router.push("/registro/control-final")}
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
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
          checked ? "border-black" : "border-gray-400"
        }`}
      >
        {checked && <span className="w-2.5 h-2.5 rounded-full bg-black block" />}
      </span>
      {label}
    </button>
  );
}