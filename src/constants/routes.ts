export const AppRoutes = {
  Dashboard: "/dashboard",
  WorkItem: "/tareas",
  ExtraWorkItem: "/tareas-extras",
  Login: "/login",
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];
