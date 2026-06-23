import { create } from "zustand";

const initialControlAsistencia = {
    ambienteCumple: "" as "cumple" | "no_cumple" | "",
    intranetCumple: "" as "cumple" | "no_cumple" | "",

    observacionAmbiente: "",
    observacionIntranet: "",
    observacionesGenerales: "",
    observacionesSilabo: "",
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