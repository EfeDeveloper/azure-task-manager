import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { type WorkItem } from "@/store/tasks";

import { useWorkItemController } from "./useWorkItemController";
import { WorkItemModal } from "./WorkItemModal";
import { WorkItemTables } from "./WorkItemTables";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function formatLocal(dtISO?: string) {
  if (!dtISO) return "-";
  const d = new Date(dtISO);
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(
    d.getMinutes()
  )}`;
}

export default function WorkItemFeature() {
  const controller = useWorkItemController();
  const { staging, azure, startEdit, removeFromStaging, syncAll, syncOne } = controller;

  const columnsStaging: ColumnDef<WorkItem>[] = useMemo(
    () => [
      { accessorKey: "titulo", header: "Título" },
      { accessorKey: "apoyo", header: "Apoyo" },
      { accessorKey: "trabajoCompletado", header: "Trabajo completado" },
      { accessorKey: "estimacionOriginal", header: "Estimación original" },
      { accessorKey: "area", header: "Área" },
      {
        id: "inicio",
        header: "Inicio",
        cell: ({ row }) => formatLocal(row.original.fechaInicio),
      },
      { id: "fin", header: "Fin", cell: ({ row }) => formatLocal(row.original.fechaFin) },
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => startEdit(row.original)}>
              <Pencil className="size-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => removeFromStaging(row.original.id)}
            >
              <Trash2 className="size-4" />
            </Button>
            <Button size="sm" onClick={() => syncOne(row.original.id)}>
              Sync
            </Button>
          </div>
        ),
      },
    ],
    [removeFromStaging, startEdit, syncOne]
  );

  const columnsAzure: ColumnDef<WorkItem>[] = useMemo(
    () => [
      { accessorKey: "titulo", header: "Título" },
      { accessorKey: "apoyo", header: "Apoyo" },
      { accessorKey: "trabajoCompletado", header: "Trabajo completado" },
      { accessorKey: "estimacionOriginal", header: "Estimación original" },
      { accessorKey: "area", header: "Área" },
      {
        id: "inicio",
        header: "Inicio",
        cell: ({ row }) => formatLocal(row.original.fechaInicio),
      },
      { id: "fin", header: "Fin", cell: ({ row }) => formatLocal(row.original.fechaFin) },
    ],
    []
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Tareas</h1>
        <WorkItemModal
          open={controller.open}
          setOpen={controller.setOpen}
          editingId={controller.editingId}
          range={controller.range}
          handleRangeChange={controller.handleRangeChange}
          startCreate={controller.startCreate}
          onSubmit={controller.onSubmit}
          form={controller.form}
        />
      </div>

      <WorkItemTables
        staging={staging}
        azure={azure}
        columnsStaging={columnsStaging}
        columnsAzure={columnsAzure}
        onSyncAll={syncAll}
      />
    </div>
  );
}
