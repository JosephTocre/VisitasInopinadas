import { create } from "zustand";

const initialControlAsistencia = {
    ambienteCumple: "cumple" as "cumple" | "no_cumple",
    intranetCumple: "cumple" as "cumple" | "no_cumple",

    observacionAmbiente: "",
    observacionIntranet: "",
    observacionesGenerales: "",
};

interface ControlAsistenciaStore {
    controlAsistencia: typeof initialControlAsistencia;

    setControlAsistencia: (
        data: Partial<typeof initialControlAsistencia>
    ) => void;

    reset: () => void;
}

export const useControlAsistenciaStore = create<ControlAsistenciaStore>(
    (set) => ({
        controlAsistencia: initialControlAsistencia,

        setControlAsistencia: (data) =>
            set((state) => ({
                controlAsistencia: {
                    ...state.controlAsistencia,
                    ...data,
                },
            })),

        reset: () =>
            set({
                controlAsistencia: initialControlAsistencia,
            }),
    })
);