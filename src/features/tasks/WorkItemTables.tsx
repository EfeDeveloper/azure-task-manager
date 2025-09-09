import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type WorkItem } from "@/store/tasks";

type Props = {
  staging: WorkItem[];
  azure: WorkItem[];
  columnsStaging: ColumnDef<WorkItem>[];
  columnsAzure: ColumnDef<WorkItem>[];
  onSyncAll: () => void;
};

function BasicDataTable<TData>({
  columns,
  data,
}: {
  columns: ColumnDef<TData>[];
  data: TData[];
}) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function WorkItemTables({
  staging,
  azure,
  columnsStaging,
  columnsAzure,
  onSyncAll,
}: Props) {
  return (
    <>
      {staging.length > 0 && (
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg">Staging</h2>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={onSyncAll}>
                <RefreshCw className="mr-2 size-4" /> Sincronizar todas
              </Button>
            </div>
          </div>
          <BasicDataTable columns={columnsStaging} data={staging} />
        </section>
      )}

      <section className="space-y-3">
        <h2 className="font-medium text-lg">Tareas en Azure</h2>
        <BasicDataTable columns={columnsAzure} data={azure} />
      </section>
    </>
  );
}
