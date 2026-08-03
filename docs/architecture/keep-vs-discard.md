# Conservar vs descartar (post-MVP)

Los módulos marcados `@mvp` en el código son demos conscientes.

## Conservar (fundación reutilizable)

| Área | Ruta | Notas |
|------|------|--------|
| Tipos de dominio | `src/data/types.ts` | Contrato canónico entre capas |
| CMS read/write API | `src/lib/cms/*` | Sustituir cuerpo por adaptador BD; mantener firmas |
| Permisos y sesión | `src/lib/auth/permissions.ts`, `getSession` | Modelo de roles migrable |
| Middleware admin | `src/middleware.ts` | Patrón de guardas |
| Contenido | `src/lib/content/*` | Posts, búsqueda, lectura |
| Utilidades | `src/lib/utils/*`, `calendar`, `citations` (formato) | Lógica pura |
| SEO | `sitemap.ts`, `robots.ts` | |
| Panel editorial | `components/admin/*` (salvo demo) | TipTap, formularios, tablas |
| Lectura editorial | `components/blog/*` (salvo persistencia demo) | Cards, hero, progreso |

## Ya descartado en limpieza

| Pieza | Motivo |
|-------|--------|
| `lib/ai-demo` + modo IA en `/buscar` | IA falsa; recrear con proveedor real |
| `GlassSelect` + glassmorphism | Viola `.cursorrules` |
| `Newsletter` | Suscripción simulada |
| `FadeInItem` + `motion` | Motion decorativo |

## Descartar / recrear tras feedback UX (aún presentes)

| Pieza | Motivo |
|-------|--------|
| `AdminDemoPanel` + `signInDemo*` | Auth sin verificación |
| `/acceso` Magic Link simulado | Validar copy; no es login real |
| `ArticleComments` (`localStorage`) | Persistencia por dispositivo |
| `CategoryPills` (uso masivo) | Revisar filtros; evitar píldoras en todas partes |
| `demoCitations` | Placeholder DOI |
| Seeds en `src/data/*.ts` + JSON CMS | Pasar a fixtures/migración |
