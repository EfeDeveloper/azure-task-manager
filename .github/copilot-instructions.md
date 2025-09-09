## Rutas actuales

- `/login` (Lazy) -> LoginPage.
- `/dashboard` (Lazy, protegida simple mediante flag en `sessionStorage`).
- `/*` -> NotFoundPage.

## Autenticación (temporal)

- Mock local con usuario y contraseña en `LoginPage` (const `MOCK_USER`).
- Flag de sesión: `sessionStorage.setItem('auth', '1')`.
- TODO: Migrar a Firebase Auth (email/password) y manejar estado global con Zustand.

Notas actuales:

- Las credenciales del mock se leen desde variables de entorno `VITE_LOGIN_EMAIL` y `VITE_LOGIN_PASSWORD` (.env). No hardcodear usuarios en código.
- Validación de formularios con `zod` + `react-hook-form` para tipado seguro y mensajes consistentes.

## Próximos pasos sugeridos

1. Añadir capa de estado global de auth con Zustand (`/src/store/auth.ts`).
2. Sustituir mock por Firebase Auth.
3. Implementar guard más robusto (redirect si ya autenticado y visita `/login`).
4. Añadir layout protegido (app bar, navegación lateral) para `/dashboard` y futuras páginas.
5. Configurar scripts de verificación pre-commit (husky + lint-staged) si se desea.

Resumen: Proyecto base listo con tema central en `src/theme/theme.ts`, login estilizado acorde a la paleta, routing con protección básica y estructura preparada para evolución (Firebase + Zustand).

## Componentes UI (shadcn/ui)

Adoptaremos shadcn/ui para la capa de componentes.

- Fuente oficial de componentes: https://ui.shadcn.com (sección Components).
- Carpeta destino de componentes generados: `src/components/ui/` (ya existe, p. ej. `button.tsx`).
- Registro del proyecto: usar `components.json` para validar/añadir componentes.

Flujo al necesitar un componente:

1. Verificar si ya existe
   - Buscar en `src/components/ui/`.
   - Revisar `components.json` para confirmar si el item ya fue agregado.

2. Si no existe, intentar instalarlo con el CLI de shadcn
   - Preferir `npx shadcn@latest add <componente>` respetando el `components.json` del repo.
   - Mantener la ubicación y convenciones del proyecto (`src/components/ui/<nombre>.tsx`).
   - Si el CLI no está disponible o falla, crear el componente manualmente alineado a shadcn/ui.

3. Si el componente no existe en el catálogo de shadcn/ui
   - Te consultaré qué prefieres:
     a) Crear uno nuevo inspirado en shadcn/ui (API y estilos compatibles), o
     b) Crear uno manual con los estilos alineados a shadcn/ui y al tema del proyecto.

Guías de estilo para componentes nuevos:

- Reutilizar `theme.palette` (ver sección Tema Global) y utilidades como `alpha` para transparencias; evitar hex hardcodeado.
- Mantener accesibilidad (roles/aria), variantes y tamaños coherentes con shadcn/ui cuando aplique.
- Ubicar tipos y utilidades compartidas en `src/lib/` si procede (p. ej. `utils.ts`).
- Documentar props y variantes de forma concisa en el propio archivo del componente.

Iconos

- La librería de iconos por defecto es `lucide-react`. Reutilizar sus íconos para acciones/estados.

## Buenas prácticas y Clean Code

- Componentizar formularios y vistas, separando UI (en `src/components/ui/`) de componentes de feature (p. ej. `src/components/auth/`).
- Evitar lógica de negocio en páginas: delegar a hooks/stores o componentes especializados.
- Usar variables de entorno para configuraciones sensibles o que cambian por entorno (Vite `VITE_*`).
- Mantener tipado estricto y esquemas de validación (zod) cerca del uso.
- Import sorting y consistencia de estilos siguiendo ESLint/Prettier del proyecto.

### Páginas y Controladores

- Separar lógica de presentación de la lógica de negocio/control: cada Page debe ser un componente presentacional y su controlador (hooks/acciones) vivir en el mismo feature.
- Estructura recomendada por feature: `src/features/<feature>/<Nombre>.tsx` (presentacional) y `src/features/<feature>/<Nombre>Controller.ts` (o hook `use<Nombre>Controller.ts`). Ej.: `src/features/auth/Login.tsx` + `LoginController.ts`.
- Mantener un shim en `src/pages/<PageName>.tsx` que re-exporte desde `src/features/...` para simplificar el routing. Ej.: `src/pages/LoginPage.tsx` re-exporta `features/auth/Login`.

## Lineamientos de diseño

- La app debe ser elegante, minimalista y atractiva.
- Priorizar claridad, jerarquía visual y buen uso de espacios; evitar ruido visual.
- Mantener coherencia con shadcn/ui (variantes sobrias, estados y transiciones sutiles) y la paleta del tema.
