import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { AppRoutes } from "@/constants/routes";

export const loginSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
  remember: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginController() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const expected = useMemo(
    () => ({
      email: import.meta.env.VITE_LOGIN_EMAIL ?? "",
      password: import.meta.env.VITE_LOGIN_PASSWORD ?? "",
    }),
    []
  );

  useEffect(() => {
    const isAuth =
      sessionStorage.getItem("auth") === "1" || localStorage.getItem("auth") === "1";
    if (isAuth) navigate(AppRoutes.Dashboard, { replace: true });
  }, [navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = (values: LoginFormValues) => {
    setError(null);
    const ok = values.email === expected.email && values.password === expected.password;
    if (!ok) {
      setError("Credenciales inválidas");
      return;
    }
    if (values.remember) localStorage.setItem("auth", "1");
    else sessionStorage.setItem("auth", "1");
    navigate(AppRoutes.Dashboard, { replace: true });
  };

  return { form, onSubmit, error };
}
