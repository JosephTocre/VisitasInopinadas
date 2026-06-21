"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ControlVisitaStep from "./steps/control-visita/page";
import ControlDocenteStep from "./steps/control-docente/page";
import ControlAsistenciaStep from "./steps/control-asistencia/page";
import ControlSilabicoStep from "./steps/control-silabico/page";
import ControlGuiaStep from "./steps/control-guia/page";
import ResultadoStep from "./steps/resultado/page";

export default function RegistroPage() {
    const [paso, setPaso] = useState(1);
    const router = useRouter();

    return (
        <>
            {paso === 1 && (
                <ControlVisitaStep
                    onBack={() => router.push("/inspector")}
                    onNext={() => setPaso(2)}
                />
            )}

            {paso === 2 && (
                <ControlDocenteStep
                    onBack={() => setPaso(1)}
                    onNext={() => setPaso(3)}
                />
            )}

            {paso === 3 && (
                <ControlAsistenciaStep
                    onBack={() => setPaso(2)}
                    onNext={() => setPaso(4)}
                />
            )}

            {paso === 4 && (
                <ControlSilabicoStep
                    onBack={() => setPaso(3)}
                    onNext={() => setPaso(5)}
                />
            )}

            {paso === 5 && (
                <ControlGuiaStep
                    onBack={() => setPaso(4)}
                    onNext={() => setPaso(6)}
                />
            )}

            {paso === 6 && (
                <ResultadoStep
                    onFinalizar={() => {
                        router.push("/inspector");
                    }}
                    onRegistrarOtro={() => {
                        setPaso(1);
                    }}
                />
            )}
        </>
    );
}