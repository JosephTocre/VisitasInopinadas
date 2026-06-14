// app/registro/control-silabico/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ControlSilabicoPage() {
  const router = useRouter();

  const [silabo1, setSilabo1] = useState<"cumple" | "no_cumple">("cumple");
  const [silabo2, setSilabo2] = useState<"cumple" | "no_cumple">("cumple");
  const [silabo3, setSilabo3] = useState<"cumple" | "no_cumple">("cumple");
  const [observacionesSilabico, setObservacionesSilabico] = useState("");

  const [guia1, setGuia1] = useState<"cumple" | "no_cumple" | "no_aplica">("cumple");
  const [guia2, setGuia2] = useState<"cumple" | "no_cumple" | "no_aplica">("cumple");
  const [guia3, setGuia3] = useState<"cumple" | "no_cumple" | "no_aplica">("cumple");
  const [observacionesGuia, setObservacionesGuia] = useState("");

  const [responsable, setResponsable] = useState("");
  const [requerimientos, setRequerimientos] = useState("");

  return (
    <main className="min-h-screen bg-[#eaeaea] flex flex-col px-8 py-6">

      <Link
        href="/registro/control-asistencia"
        className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-4 self-start hover:opacity-70 transition-opacity"
      >
        <span>←</span> Atrás
      </Link>

      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm px-10 py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-extrabold text-black">
            Control de avance silábico
          </h1>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              El tema del sílabo coincide con la clase desarrollada en la fecha de la visita
            </p>
            <div className="flex items-center gap-10">
              <RadioOption label="Cumple" checked={silabo1 === "cumple"} onChange={() => setSilabo1("cumple")} bold />
              <RadioOption label="No cumple" checked={silabo1 === "no_cumple"} onChange={() => setSilabo1("no_cumple")} bold />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              El tema desarrollado en la fecha anterior a la visita coincide con el sílabo
            </p>
            <div className="flex items-center gap-10">
              <RadioOption label="Cumple" checked={silabo2 === "cumple"} onChange={() => setSilabo2("cumple")} bold />
              <RadioOption label="No cumple" checked={silabo2 === "no_cumple"} onChange={() => setSilabo2("no_cumple")} bold />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              Ingreso del avance silábico en el aula virtual
            </p>
            <div className="flex items-center gap-10">
              <RadioOption label="Cumple" checked={silabo3 === "cumple"} onChange={() => setSilabo3("cumple")} bold />
              <RadioOption label="No cumple" checked={silabo3 === "no_cumple"} onChange={() => setSilabo3("no_cumple")} bold />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Observaciones</label>
            <input
              type="text"
              value={observacionesSilabico}
              onChange={(e) => setObservacionesSilabico(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-black">
            Cumple con el desarrollo de la guía de práctica
          </h2>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              Cumple con el tema programado en la guía de práctica para el desarrollo de la clase práctica
            </p>
            <div className="flex items-center gap-10">
              <RadioOption label="Cumple" checked={guia1 === "cumple"} onChange={() => setGuia1("cumple")} bold />
              <RadioOption label="No cumple" checked={guia1 === "no_cumple"} onChange={() => setGuia1("no_cumple")} bold />
              <RadioOption label="No aplica" checked={guia1 === "no_aplica"} onChange={() => setGuia1("no_aplica")} bold />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              Se evidencia el logro a medir en la práctica desarrollada
            </p>
            <div className="flex items-center gap-10">
              <RadioOption label="Cumple" checked={guia2 === "cumple"} onChange={() => setGuia2("cumple")} bold />
              <RadioOption label="No cumple" checked={guia2 === "no_cumple"} onChange={() => setGuia2("no_cumple")} bold />
              <RadioOption label="No aplica" checked={guia2 === "no_aplica"} onChange={() => setGuia2("no_aplica")} bold />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              Cuenta con una rúbrica de evaluación
            </p>
            <div className="flex items-center gap-10">
              <RadioOption label="Cumple" checked={guia3 === "cumple"} onChange={() => setGuia3("cumple")} bold />
              <RadioOption label="No cumple" checked={guia3 === "no_cumple"} onChange={() => setGuia3("no_cumple")} bold />
              <RadioOption label="No aplica" checked={guia3 === "no_aplica"} onChange={() => setGuia3("no_aplica")} bold />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Observaciones</label>
            <input
              type="text"
              value={observacionesGuia}
              onChange={(e) => setObservacionesGuia(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Responsable de realizar la actividad
            </label>
            <div className="relative">
              <select
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value=""></option>
                <option>Inspector Harvey Specter</option>
                <option>Inspector Mike Ross</option>
                <option>Inspector Donna Paulsen</option>
                <option>Inspector Jessica Pearson</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Requerimientos solicitados en la visita inopinada
            </label>
            <input
              type="text"
              value={requerimientos}
              onChange={(e) => setRequerimientos(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

        </div>

        <button
          onClick={() => router.push("/registro/resultado")}
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