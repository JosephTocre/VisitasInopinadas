"use client";

import { create } from "zustand";

type EstadoCumplimiento = "cumple" | "no_cumple" | "";

interface ControlSilaboState {
    silabo1: EstadoCumplimiento;
    silabo2: EstadoCumplimiento;
    silabo3: EstadoCumplimiento;
    observacionesSilabo: string;
}

interface ControlSilaboStore {
    controlSilabo: ControlSilaboState;

    setControlSilabo: (
        data: Partial<ControlSilaboState>
    ) => void;

    reset: () => void;
}

const initialControlSilabo: ControlSilaboState = {
    silabo1: "",
    silabo2: "",
    silabo3: "",
    observacionesSilabo: "",
};

export const useControlSilaboStore = create<ControlSilaboStore>((set) => ({
    controlSilabo: initialControlSilabo,

    setControlSilabo: (data) =>
        set((state) => ({
            controlSilabo: {
                ...state.controlSilabo,
                ...data,
            },
        })),

    reset: () =>
        set({
            controlSilabo: initialControlSilabo,
        }),
}));