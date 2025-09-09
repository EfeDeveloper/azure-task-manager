import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { type SubmitHandler, useForm } from "react-hook-form";

import { type ApoyoOption, useTasksStore, type WorkItem } from "@/store/tasks";

import { useDefaultFormValues, type WorkItemFormValues, workItemSchema } from "./schema";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function toYMD(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function composeISOFromDate(dateYMD: string, hours: number, minutes: number) {
  const [y, m, d] = dateYMD.split("-").map((v) => parseInt(v, 10));
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1, hours, minutes, 0, 0);
  return dt.toISOString();
}

export function useWorkItemController() {
  const {
    staging,
    azure,
    addToStaging,
    updateStaging,
    removeFromStaging,
    syncAll,
    syncOne,
  } = useTasksStore();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<WorkItemFormValues>({
    resolver: zodResolver(workItemSchema),
    defaultValues: useDefaultFormValues(),
    mode: "onChange",
  });

  const initialRange: DateRange = {
    from: new Date(form.getValues("fechaInicio")),
    to: new Date(form.getValues("fechaFin")),
  };
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  const onSubmit: SubmitHandler<WorkItemFormValues> = (values) => {
    const fromDate = new Date(values.fechaInicio);
    const toDate = new Date(values.fechaFin);

    if (editingId) {
      const payload = {
        titulo: values.titulo,
        descripcion: values.descripcion?.trim() || undefined,
        apoyo: values.apoyo as ApoyoOption,
        trabajoCompletado: values.trabajoCompletado,
        estimacionOriginal: values.estimacionOriginal,
        area: "desarrollo" as const,
        fechaInicio: composeISOFromDate(values.fechaInicio, 8, 0),
        fechaFin: composeISOFromDate(values.fechaFin, 18, 0),
      } satisfies Omit<WorkItem, "id" | "createdAt" | "updatedAt">;
      updateStaging(editingId, payload);
    } else {
      const start = startOfDay(fromDate);
      const end = startOfDay(toDate);
      if (end < start) return;
      const days =
        Math.round((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1;
      for (let i = 0; i < days; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const ymd = toYMD(d);
        const payload = {
          titulo: values.titulo,
          descripcion: values.descripcion?.trim() || undefined,
          apoyo: values.apoyo as ApoyoOption,
          trabajoCompletado: values.trabajoCompletado,
          estimacionOriginal: values.estimacionOriginal,
          area: "desarrollo" as const,
          fechaInicio: composeISOFromDate(ymd, 8, 0),
          fechaFin: composeISOFromDate(ymd, 18, 0),
        } satisfies Omit<WorkItem, "id" | "createdAt" | "updatedAt">;
        addToStaging(payload);
      }
    }

    setOpen(false);
    setEditingId(null);
    const defaults = useDefaultFormValues();
    form.reset(defaults);
    setRange({ from: new Date(defaults.fechaInicio), to: new Date(defaults.fechaFin) });
  };

  const startCreate = () => {
    setEditingId(null);
    const defaults = useDefaultFormValues();
    form.reset(defaults);
    setRange({ from: new Date(defaults.fechaInicio), to: new Date(defaults.fechaFin) });
    setOpen(true);
  };

  const startEdit = (item: WorkItem) => {
    setEditingId(item.id);
    form.reset({
      titulo: item.titulo,
      descripcion: item.descripcion ?? "",
      apoyo: item.apoyo,
      trabajoCompletado: item.trabajoCompletado,
      estimacionOriginal: item.estimacionOriginal,
      area: "desarrollo",
      fechaInicio: new Date(item.fechaInicio).toISOString().slice(0, 10),
      fechaFin: new Date(item.fechaFin).toISOString().slice(0, 10),
    });
    setRange({ from: new Date(item.fechaInicio), to: new Date(item.fechaFin) });
    setOpen(true);
  };

  const handleRangeChange = (next?: DateRange) => {
    setRange(next);
    const from = next?.from ? startOfDay(next.from) : undefined;
    const to = next?.to ? startOfDay(next.to) : from;
    if (from) form.setValue("fechaInicio", toYMD(from), { shouldValidate: true });
    if (to) form.setValue("fechaFin", toYMD(to), { shouldValidate: true });
  };

  return {
    // state
    open,
    editingId,
    range,
    form,
    staging,
    azure,
    // actions
    setOpen,
    startCreate,
    startEdit,
    onSubmit,
    handleRangeChange,
    removeFromStaging,
    syncAll,
    syncOne,
  } as const;
}
