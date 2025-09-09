export const AppRoutes = {
  Dashboard: '/dashboard',
  Tareas: '/tareas',
  TareasExtras: '/tareas-extras',
  Login: '/login',
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];
