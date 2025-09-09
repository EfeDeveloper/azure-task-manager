import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "@/components/AppLayout";
import { AppRoutes } from "@/constants/routes";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const TareasPage = lazy(() => import("@/pages/TareasPage"));
const TareasExtrasPage = lazy(() => import("@/pages/TareasExtrasPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const isAuthenticated = () => {
  if (sessionStorage.getItem("auth") === "1") return true;
  if (localStorage.getItem("auth") === "1") return true;
  return false;
};

function PrivateRoute({ children }: { children: React.ReactElement }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 32 }}>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to={AppRoutes.Login} replace />} />
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route path={AppRoutes.Dashboard} element={<DashboardPage />} />
            <Route path={AppRoutes.WorkItem} element={<TareasPage />} />
            <Route path={AppRoutes.ExtraWorkItem} element={<TareasExtrasPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
