import { Loader2 } from "lucide-react";

export default function AppFallback() {
  return (
    <div
      className="place-items-center grid p-6 min-h-svh"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5 bg-card shadow-sm p-8 border rounded-xl w-full max-w-md">
        <div className="place-items-center grid bg-primary/10 rounded-full size-20">
          <Loader2 className="size-8 text-primary animate-spin" aria-label="Cargando" />
        </div>
        <div className="text-center">
          <p className="font-medium text-base">Cargando</p>
          <p className="text-muted-foreground text-sm">Un momento, por favor…</p>
        </div>
      </div>
    </div>
  );
}
