import { z } from "zod";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export function todayYMD() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function defaultTitulo(): string {
  const d = new Date();
  const day = pad2(d.getDate());
  const month = pad2(d.getMonth() + 1);
  const year = d.getFullYear();
  return `TS-EV-${day}${month}${year} | `;
}

export const workItemSchema = z.object({
  titulo: z.string().min(3, "Min. 3 caracteres"),
  descripcion: z.string().optional(),
  apoyo: z.enum(["si", "no"]),
  trabajoCompletado: z.number().int().min(1).max(9),
  estimacionOriginal: z.number().int().min(1).max(9),
  area: z.literal("desarrollo"),
  fechaInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  fechaFin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
});

export type WorkItemFormValues = z.infer<typeof workItemSchema>;

export function useDefaultFormValues(): WorkItemFormValues {
  return {
    titulo: defaultTitulo(),
    descripcion: "",
    apoyo: "no",
    trabajoCompletado: 1,
    estimacionOriginal: 1,
    area: "desarrollo",
    fechaInicio: todayYMD(),
    fechaFin: todayYMD(),
  } as WorkItemFormValues;
}
