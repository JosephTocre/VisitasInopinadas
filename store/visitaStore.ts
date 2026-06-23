import { create } from "zustand";

const initialControlVisita = {
    sede: "",
    ciclo: "",
    curso: "",
    campoFormativo: "",
    semana: "",
    lugarVisita: "",
    turno: "",
    tipoHora: "",
};

interface VisitaStore {
    visitaId: number | null;
    setVisitaId: (id: number) => void;

    controlVisita: typeof initialControlVisita;

    setControlVisita: (
        data: Partial<typeof initialControlVisita>
    ) => void;

    reset: () => void;
}

export const useVisitaStore = create<VisitaStore>((set) => ({
    visitaId: null,

    setVisitaId: (id) =>
        set({
            visitaId: id,
        }),

    controlVisita: initialControlVisita,

    setControlVisita: (data) =>
        set((state) => ({
            controlVisita: {
                ...state.controlVisita,
                ...data,
            },
        })),

    reset: () =>
        set({
            visitaId: null,
            controlVisita: initialControlVisita,
        }),
}));