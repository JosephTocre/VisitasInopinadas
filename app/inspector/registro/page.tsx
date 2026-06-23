"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ControlVisitaStep from "./steps/control-visita/page";
import ControlDocenteStep from "./steps/control-docente/page";
import ControlAsistenciaStep from "./steps/control-asistencia/page";
import ControlSilaboStep from "./steps/control-silabo/page";
import ControlGuiaStep from "./steps/control-guia/page";
import ResultadoStep from "./steps/resultado/page";
import { useVisitaStore } from "@/store/visitaStore";
import { useControlDocenteStore } from "@/store/controlDocente";
import { useControlAsistenciaStore } from "@/store/controlAsistencia";
import { useControlSilaboStore } from "@/store/controlSilabo";    


export default function RegistroPage() {
    const [visitaId, setVisitaId] = useState<number | null>(null);
    const [paso, setPaso] = useState(1);
    const reset = useVisitaStore((state) => state.reset);
    const resetControlDocente = useControlDocenteStore((state) => state.reset);
    const resetControlAsistencia = useControlAsistenciaStore((state) => state.reset);
    const resetControlSilabo = useControlSilaboStore((state) => state.reset);
    const router = useRouter();

    return (
        <>
            {paso === 1 && (
                <ControlVisitaStep
                    onBack={() => {
                        reset();
                        resetControlDocente();
                        resetControlAsistencia();
                        resetControlSilabo();
                        router.push("/inspector");
                    }}
                    onNext={(id: number) => {
                        setVisitaId(id);
                        setPaso(2);
                    }}
                />
            )}

            {paso === 2 && visitaId && (
                <ControlDocenteStep
                    visitaId={visitaId}
                    onBack={() => setPaso(1)}
                    onNext={() => setPaso(3)}
                />
            )}

            {paso === 3 && visitaId && (
                <ControlAsistenciaStep
                    visitaId={visitaId}
                    onBack={() => setPaso(2)}
                    onNext={() => setPaso(4)}
                />
            )}

            {paso === 4 && visitaId && (
                <ControlSilaboStep
                    visitaId={visitaId}
                    onBack={() => setPaso(3)}
                    onNext={() => setPaso(5)}
                />
            )}

            {paso === 5 && visitaId && (
                <ControlGuiaStep
                    visitaId={visitaId}
                    onBack={() => setPaso(4)}
                    onNext={() => setPaso(6)}
                />
            )}

            {paso === 6 && (
                <ResultadoStep
                    visitaId={visitaId!}
                    onFinalizar={() => {
                        reset();
                        resetControlDocente();
                        resetControlAsistencia();
                        resetControlSilabo();
                        router.push("/inspector");
                    }}
                    onRegistrarOtro={() => {
                        reset();
                        resetControlDocente();
                        resetControlAsistencia();
                        resetControlSilabo();
                        setVisitaId(null);
                        setPaso(1);
                    }}
                />
            )}
        </>
    );
}