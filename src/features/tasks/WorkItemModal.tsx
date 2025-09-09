import { Plus } from "lucide-react";
import type { DateRange } from "react-day-picker";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type { WorkItemFormValues } from "./schema";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}
function formatDisplayDate(d?: Date) {
  if (!d) return "";
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
}

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  editingId: string | null;
  range: DateRange | undefined;
  handleRangeChange: (next?: DateRange) => void;
  startCreate: () => void;
  onSubmit: SubmitHandler<WorkItemFormValues>;
  form: UseFormReturn<WorkItemFormValues>;
};

export function WorkItemModal({
  open,
  setOpen,
  editingId,
  range,
  handleRangeChange,
  startCreate,
  onSubmit,
  form,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={startCreate}>
          <Plus className="mr-2 size-4" /> Nueva tarea
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingId ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apoyo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apoyo</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="si">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimacionOriginal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimación original</FormLabel>
                    <Select
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trabajoCompletado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trabajo completado</FormLabel>
                    <Select
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Área</FormLabel>
                    <FormControl>
                      <Input value={field.value} readOnly disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormItem className="flex flex-col">
                  <FormLabel>Rango de fechas</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start w-full font-normal text-left"
                      >
                        {range?.from ? (
                          range.to ? (
                            <span>
                              {formatDisplayDate(range.from)} -{" "}
                              {formatDisplayDate(range.to)}
                            </span>
                          ) : (
                            <span>{formatDisplayDate(range.from)}</span>
                          )
                        ) : (
                          <span>Selecciona un rango</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto" align="start">
                      <Calendar
                        mode="range"
                        selected={range}
                        onSelect={handleRangeChange}
                        numberOfMonths={2}
                        disabled={(date) => {
                          if (!range?.from) return false;
                          const d0 = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate()
                          );
                          const f0 = new Date(
                            range.from.getFullYear(),
                            range.from.getMonth(),
                            range.from.getDate()
                          );
                          return d0 < f0;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              </div>
            </div>

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción" rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{editingId ? "Guardar cambios" : "Agregar"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
