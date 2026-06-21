"use client";

import { create } from "zustand";

const initialControlSilabo = {
    silabo1: "cumple" as "cumple" | "no_cumple",
    silabo2: "cumple" as "cumple" | "no_cumple",
    silabo3: "cumple" as "cumple" | "no_cumple",
    observacionesSilabico: "",
};

interface ControlSilaboStore {
    controlSilabo: typeof initialControlSilabo;

    setControlSilabo: (
        data: Partial<typeof initialControlSilabo>
    ) => void;

    reset: () => void;
}

export const useControlSilaboStore = create<ControlSilaboStore>(
    (set) => ({
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
    })
);