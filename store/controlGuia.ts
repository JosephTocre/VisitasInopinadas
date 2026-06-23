import { create } from "zustand";

type EstadoUI = "cumple" | "no_cumple" | "no_aplica";

interface ControlGuiaState {
    guia1: EstadoUI;
    guia2: EstadoUI;
    guia3: EstadoUI;

    observacionesGuia: string;
    requerimientos: string;

    setGuia1: (value: EstadoUI) => void;
    setGuia2: (value: EstadoUI) => void;
    setGuia3: (value: EstadoUI) => void;

    setObservacionesGuia: (value: string) => void;
    setRequerimientos: (value: string) => void;

    reset: () => void;
}

export const useControlGuiaStore = create<ControlGuiaState>((set) => ({
    guia1: "cumple",
    guia2: "cumple",
    guia3: "cumple",

    observacionesGuia: "",
    requerimientos: "",

    setGuia1: (value) => set({ guia1: value }),
    setGuia2: (value) => set({ guia2: value }),
    setGuia3: (value) => set({ guia3: value }),

    setObservacionesGuia: (value) => set({ observacionesGuia: value }),
    setRequerimientos: (value) => set({ requerimientos: value }),

    reset: () =>
        set({
            guia1: "cumple",
            guia2: "cumple",
            guia3: "cumple",
            observacionesGuia: "",
            requerimientos: "",
        }),
}));