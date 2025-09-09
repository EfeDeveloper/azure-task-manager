import { create } from "zustand";

export type ApoyoOption = "si" | "no";

export type WorkItem = {
  id: string;
  titulo: string;
  descripcion?: string;
  apoyo: ApoyoOption;
  trabajoCompletado: number; // 1-9
  estimacionOriginal: number; // 1-9
  area: "desarrollo"; // fixed
  fechaInicio: string; // ISO string, time normalized to 08:00
  fechaFin: string; // ISO string, time normalized to 18:00
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

type NewWorkItem = Omit<WorkItem, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};

type TasksState = {
  staging: WorkItem[];
  azure: WorkItem[];
  addToStaging: (item: NewWorkItem) => void;
  updateStaging: (id: string, patch: Partial<WorkItem>) => void;
  removeFromStaging: (id: string) => void;
  syncOne: (id: string) => void;
  syncAll: () => void;
  setAzure: (items: WorkItem[]) => void;
  reset: () => void;
};

function nowISO() {
  return new Date().toISOString();
}

export const useTasksStore = create<TasksState>((set, get) => ({
  staging: [],
  azure: [],

  addToStaging: (item) =>
    set((state) => {
      const id = item.id ?? crypto.randomUUID();
      const wi: WorkItem = {
        ...item,
        id,
        createdAt: nowISO(),
        updatedAt: nowISO(),
      } as WorkItem;
      return { staging: [wi, ...state.staging] };
    }),

  updateStaging: (id, patch) =>
    set((state) => ({
      staging: state.staging.map((t) =>
        t.id === id ? { ...t, ...patch, updatedAt: nowISO() } : t
      ),
    })),

  removeFromStaging: (id) =>
    set((state) => ({ staging: state.staging.filter((t) => t.id !== id) })),

  syncOne: (id) => {
    const { staging, azure } = get();
    const item = staging.find((s) => s.id === id);
    if (!item) return;
    set({
      staging: staging.filter((s) => s.id !== id),
      azure: [item, ...azure],
    });
  },

  syncAll: () => {
    const { staging, azure } = get();
    if (staging.length === 0) return;
    set({ staging: [], azure: [...staging, ...azure] });
  },

  setAzure: (items) => set({ azure: items }),

  reset: () => set({ staging: [], azure: [] }),
}));
