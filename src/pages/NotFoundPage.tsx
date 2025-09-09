import { ArrowLeft, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="place-items-center grid bg-background px-6 min-h-screen">
      <section className="mx-auto w-full max-w-2xl text-center">
        <div className="flex justify-center mx-auto mb-6">
          <SearchX className="drop-shadow-lg size-20 text-primary" aria-hidden="true" />
        </div>

        <h2 className="mb-2 font-extrabold text-6xl sm:text-7xl leading-none tracking-tight">
          404
        </h2>
        <h1 className="mb-3 font-semibold text-3xl sm:text-4xl leading-tight">
          Página no encontrada
        </h1>
        <p className="mx-auto mb-8 max-w-prose text-muted-foreground text-sm sm:text-base text-balance">
          La URL que intentas visitar no existe o fue movida. Revisa el enlace o vuelve a
          una ruta conocida.
        </p>

        <div className="flex justify-center items-center">
          <Button onClick={() => navigate(-1)} aria-label="Volver atrás">
            <ArrowLeft className="mr-2 size-4" /> Volver atrás
          </Button>
        </div>
      </section>
    </main>
  );
}
