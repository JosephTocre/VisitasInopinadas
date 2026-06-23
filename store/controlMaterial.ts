import { create } from "zustand";

type ControlMaterial = {
    cumple: "si" | "no" | "";
    observaciones: string;
};

type ControlMaterialStore = {
    controlMaterial: ControlMaterial;
    setControlMaterial: (data: ControlMaterial) => void;
    reset: () => void;
};

const initialState: ControlMaterial = {
    cumple: "",
    observaciones: "",
};

export const useControlMaterialStore = create<ControlMaterialStore>((set) => ({
    controlMaterial: initialState,

    setControlMaterial: (data) =>
        set(() => ({
            controlMaterial: data,
        })),

    reset: () =>
        set(() => ({
            controlMaterial: initialState,
        })),
}));