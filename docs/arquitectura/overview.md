# Arquitectura — visión general

## Propósito del MVP

Validar UX del portal académico: navegación, lectura editorial, calendario, recursos, bienestar, citas y flujos del panel admin con CMS JSON y auth demo.

**No es arquitectura de producción.** Lo reutilizable al migrar: tipos de dominio (`src/data/types.ts`) y capas de infraestructura (`src/lib/**`).

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Estilos | CSS Modules + `src/styles/tokens.css` |
| Motion | GSAP + `@gsap/react` |
| Editor admin | TipTap 3 |
| Datos | JSON en `src/data/cms/` |
| Auth | Cookie de sesión demo (`udc_session`) |
| Iconos | Heroicons, Lucide |

---

## Capas del código

```
src/
├── app/            # Rutas Next.js (capa delgada: metadata, params, composición)
├── components/     # UI compartida (layout, ui)
├── features/       # Dominios por feature (blog, calendar, resources, …)
├── data/           # Tipos, seeds, JSON del CMS
├── lib/            # Infra compartida (auth, cms, utils)
├── styles/         # Design tokens
└── middleware.ts   # Protección /admin/*
```

### Responsabilidades

| Capa | Qué hace | Qué no hace |
|------|----------|-------------|
| `app/` | Define rutas, `generateMetadata`, `generateStaticParams`, compone features | Lógica de negocio, acceso directo a JSON |
| `features/` | Componentes de dominio, formularios, server actions por módulo | Importar paths de archivos JSON |
| `lib/cms/` | Lectura/escritura/revalidación del CMS | Renderizar UI |
| `lib/auth/` | Sesión, permisos, acciones de login demo | Autenticación institucional real |
| `data/` | Tipos canónicos, seeds, archivos JSON | Lógica de transformación |

---

## Organización por dominio (`features/`)

| Feature | Directorio | Responsabilidad |
|---------|------------|-----------------|
| Blog | `src/features/blog/` | Artículos, archivo, búsqueda, editor TipTap |
| Calendario | `src/features/calendar/` | Eventos, grid mensual, export `.ics` |
| Recursos | `src/features/resources/` | Repositorio de guías y adjuntos |
| Bienestar | `src/features/wellbeing/` | Rutas de apoyo y testimonios |
| Citas | `src/features/citations/` | Generador APA 7 / Vancouver |
| Admin | `src/features/admin/` | Shell, tablas, usuarios, ajustes |

Cada feature expone componentes de página y, cuando aplica, `actions.ts` con server actions que delegan en `lib/cms`.

---

## Infraestructura compartida (`lib/`)

| Módulo | Archivos clave | Función |
|--------|----------------|---------|
| `lib/cms/` | `read.ts`, `write.ts`, `paths.ts`, `revalidate.ts` | Puerto de persistencia JSON |
| `lib/auth/` | `session.ts`, `actions.ts`, `permissions.ts`, `types.ts` | Sesión demo y matriz de permisos |
| `lib/utils/` | `dates.ts`, `files.ts`, `format.ts` | Utilidades transversales |

---

## Middleware

[`src/middleware.ts`](../../src/middleware.ts) protege `/admin/*`:

1. Sin cookie válida → redirect a `/acceso?next=…`
2. `centro_admin` en `/admin/usuarios` o `/admin/ajustes` → redirect a `/admin`

Conservar este patrón al migrar a auth real.

---

## SEO e infraestructura web

- `metadataBase`: `https://ctcerete.udec.edu.co`
- `app/sitemap.ts` — rutas estáticas + artículos publicados
- `app/robots.ts` — robots permisivo con sitemap
- JSON-LD `BlogPosting` en detalle de artículo

---

## Estrategia API

Hoy: **monolito modular** sin microservicio. La decisión de frontera HTTP se documenta en [mvp-strategy.md](../mvp-strategy.md).

Preparación sin decidir aún:

1. Tipos estables en `types.ts`
2. `lib/cms` como puerto (UI no acoplada al JSON)
3. Lógica de negocio fuera de componentes
4. No reintroducir APIs demo falsas

---

## Diagrama de capas

Ver [flujos.md](./flujos.md#capas-de-la-aplicacion) para el diagrama Mermaid completo.
