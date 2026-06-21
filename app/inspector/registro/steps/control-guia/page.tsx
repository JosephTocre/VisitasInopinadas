"use client";

import { useState } from "react";

type ControlGuiaStepProps = {
    onBack: () => void;
    onNext: () => void;
    visitaId: number;
};

export default function ControlGuiaStep({
    onBack,
    onNext,
    visitaId,
}: ControlGuiaStepProps) {
    const [guia1, setGuia1] = useState<"cumple" | "no_cumple" | "no_aplica">("cumple");
    const [guia2, setGuia2] = useState<"cumple" | "no_cumple" | "no_aplica">("cumple");
    const [guia3, setGuia3] = useState<"cumple" | "no_cumple" | "no_aplica">("cumple");

    const [observacionesGuia, setObservacionesGuia] = useState("");
    const [responsable, setResponsable] = useState("");
    const [requerimientos, setRequerimientos] = useState("");
    const [error, setError] = useState("");

    const continuar = async () => {
        try {
            setError("");

            const mapEstado = (valor: string) => {
                if (valor === "cumple") return "CUMPLE";
                if (valor === "no_cumple") return "NO_CUMPLE";
                return "NO_APLICA";
            };

            const res = await fetch("/api/control-guia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    visitaId,
                    guia1: mapEstado(guia1),
                    guia2: mapEstado(guia2),
                    guia3: mapEstado(guia3),
                    observacionesGuia,
                    responsable,
                    requerimientos,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            onNext();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error");
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
                                Control de guía de práctica
                            </h1>

                            <p className="page-subtitle">
                                Registra el cumplimiento de la guía de práctica
                            </p>

                            {error && (
                                <div className="mt-4 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">

                            <div className="flex flex-col gap-2">
                                <label className="label-modern">
                                    Cumple con el tema programado en la guía de práctica para el desarrollo de la clase práctica
                                </label>

                                <div className="flex items-center gap-10">
                                    <RadioOption label="Cumple" checked={guia1 === "cumple"} onChange={() => setGuia1("cumple")} />
                                    <RadioOption label="No cumple" checked={guia1 === "no_cumple"} onChange={() => setGuia1("no_cumple")} />
                                    <RadioOption label="No aplica" checked={guia1 === "no_aplica"} onChange={() => setGuia1("no_aplica")} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label-modern">
                                    Se evidencia el logro a medir en la práctica desarrollada
                                </label>

                                <div className="flex items-center gap-10">
                                    <RadioOption label="Cumple" checked={guia2 === "cumple"} onChange={() => setGuia2("cumple")} />
                                    <RadioOption label="No cumple" checked={guia2 === "no_cumple"} onChange={() => setGuia2("no_cumple")} />
                                    <RadioOption label="No aplica" checked={guia2 === "no_aplica"} onChange={() => setGuia2("no_aplica")} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="label-modern">
                                    Cuenta con una rúbrica de evaluación
                                </label>

                                <div className="flex items-center gap-10">
                                    <RadioOption label="Cumple" checked={guia3 === "cumple"} onChange={() => setGuia3("cumple")} />
                                    <RadioOption label="No cumple" checked={guia3 === "no_cumple"} onChange={() => setGuia3("no_cumple")} />
                                    <RadioOption label="No aplica" checked={guia3 === "no_aplica"} onChange={() => setGuia3("no_aplica")} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label-modern">Observaciones</label>

                                <textarea
                                    value={observacionesGuia}
                                    onChange={(e) => setObservacionesGuia(e.target.value)}
                                    rows={4}
                                    className="input-modern resize-none"
                                    placeholder="Ingrese observaciones"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-200 my-6" />

                        <div className="space-y-6">

                            <div className="flex flex-col gap-1">
                                <label className="label-modern">
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

                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        ▼
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="label-modern">
                                    Requerimientos solicitados en la visita inopinada
                                </label>

                                <textarea
                                    value={requerimientos}
                                    onChange={(e) => setRequerimientos(e.target.value)}
                                    rows={4}
                                    className="input-modern resize-none"
                                    placeholder="Ingrese los requerimientos solicitados"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={continuar}
                                className="btn-primary w-full flex items-center justify-center gap-3 group"
                            >
                                Continuar
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </div>
                    </div>
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
                {checked && <span className="w-2.5 h-2.5 rounded-full bg-black block" />}
            </span>
            {label}
        </button>
    );
}