## Checklist inicial

- [x] Verificar que el archivo copilot-instructions.md en la carpeta .github existe.
- [x] Clarificar requerimientos del proyecto: React, Vite, TypeScript, Material-UI, Icons, @mui/lab, Zustand, Router, ESLint, Prettier, absolute imports.
- [x] Crear estructura y dependencias principales.
- [x] Personalizar el proyecto según requerimientos iniciales.
- [x] Configurar alias `@` y funcionamiento en editor y build.
- [x] Añadir configuración ESLint + Prettier + sort imports + format on save.
- [ ] Instalar extensiones necesarias (si aplica).
- [x] Compilar el proyecto y resolver problemas.
- [ ] Crear y ejecutar tareas (VSCode tasks) (pendiente si se requieren scripts específicos).
- [ ] Lanzar el proyecto en modo debug (pendiente configuración launch.json si se necesita).
- [x] Documentar en README.md y copilot-instructions.md.
- [x] Inicializar repo Git y crear commit inicial.
- [x] Crear rama feature/login-ui.
- [x] Implementar Login UI inicial + routing + 404.

## Tema (Theme) Global

Ruta del archivo de tema principal: `src/theme/theme.ts`.

- Paleta primaria y secundaria basada en escala `scooter` definida manualmente.
- Se debe reutilizar `theme.palette` para colores en componentes nuevos (evitar hardcodear hex excepto transparencias con `alpha`).
- Para fondos degradados preferir combinar `theme.palette.primary.dark`, `theme.palette.primary.main`, `theme.palette.secondary.dark`.
- Para overlays translúcidos usar `alpha(theme.palette.common.white, x)` o `alpha(theme.palette.common.black, x)` según contraste.

## Rutas actuales

- `/login` (Lazy) -> LoginPage.
- `/dashboard` (Lazy, protegida simple mediante flag en `sessionStorage`).
- `/*` -> NotFoundPage.

## Autenticación (temporal)

- Mock local con usuario y contraseña en `LoginPage` (const `MOCK_USER`).
- Flag de sesión: `sessionStorage.setItem('auth', '1')`.
- TODO: Migrar a Firebase Auth (email/password) y manejar estado global con Zustand.

## Próximos pasos sugeridos

1. Añadir capa de estado global de auth con Zustand (`/src/store/auth.ts`).
2. Sustituir mock por Firebase Auth.
3. Implementar guard más robusto (redirect si ya autenticado y visita `/login`).
4. Añadir layout protegido (app bar, navegación lateral) para `/dashboard` y futuras páginas.
5. Configurar scripts de verificación pre-commit (husky + lint-staged) si se desea.

Resumen: Proyecto base listo con tema central en `src/theme/theme.ts`, login estilizado acorde a la paleta, routing con protección básica y estructura preparada para evolución (Firebase + Zustand).

## Reglas de flujo de trabajo

- No sugerir ni ejecutar commits, pushes o creación de ramas adicionales a menos que el usuario lo solicite explícitamente.
- Priorizar uso del tema desde `src/theme/theme.ts` para cualquier color / fondo.
- Mantener imports absolutos con alias `@`.
