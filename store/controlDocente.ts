import { create } from "zustand";

const initialControlDocente = {
    nombreDocente: "",
    apellidoDocente: "",
    actividad: "",
    observaciones: "",
    observacionesMaterial: "",

    presente: "si" as "si" | "no",
    horario: "cumple" as "cumple" | "no_cumple",
    interaccion: "si" as "si" | "no",
    materialCumple: "si" as "si" | "no",
};

interface ControlDocenteStore {
    controlDocente: typeof initialControlDocente;

    setControlDocente: (
        data: Partial<typeof initialControlDocente>
    ) => void;

    reset: () => void;
}

export const useControlDocenteStore = create<ControlDocenteStore>(
    (set) => ({
        controlDocente: initialControlDocente,

        setControlDocente: (data) =>
            set((state) => ({
                controlDocente: {
                    ...state.controlDocente,
                    ...data,
                },
            })),

        reset: () =>
            set({
                controlDocente: initialControlDocente,
            }),
    })
);