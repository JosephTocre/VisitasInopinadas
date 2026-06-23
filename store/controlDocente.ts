import { create } from "zustand";

const initialControlDocente = {
    nombreDocente: "",
    apellidoDocente: "",
    actividad: "",
    observaciones: "",
    observacionesMaterial: "",

    presente: "" as "si" | "no" | "",
    horario: "" as "cumple" | "no_cumple" | "",
    interaccion: "" as "si" | "no" | "",
    materialCumple: "" as "si" | "no" | "",
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