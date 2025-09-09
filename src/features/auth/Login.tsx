import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useLoginController } from "./useLoginController";

export default function Login() {
  const { form, onSubmit, error } = useLoginController();

  return (
    <main className="place-items-center grid bg-background px-4 min-h-screen">
      <div className="w-full max-w-sm">
        <Card className="border-input/60">
          <CardHeader>
            <CardTitle>Bienvenido</CardTitle>
            <CardDescription>Inicia sesión para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Correo</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tucorreo@correo.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(Boolean(v))}
                          />
                        </FormControl>
                        <FormLabel
                          className="cursor-pointer"
                          onClick={() => field.onChange(!field.value)}
                        >
                          Recordarme
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground text-sm hover:underline underline-offset-4"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {error ? (
                  <p className="font-medium text-destructive text-sm" role="alert">
                    {error}
                  </p>
                ) : null}

                <Button type="submit" className="w-full">
                  Ingresar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
