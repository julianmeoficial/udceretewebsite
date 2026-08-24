# Layout y estructura

Fuente de verdad: [`src/styles/tokens.css`](../../src/styles/tokens.css), [`src/app/globals.css`](../../src/app/globals.css).

## Contenedores

| Token / clase | Valor | Uso |
|---------------|-------|-----|
| `--container-max` | `1200px` | Ancho máximo del contenido en desktop |
| `.container` | max-width + padding inline `16px` | Wrapper principal de páginas |
| `--reading-max` | `680px` | Ancho de lectura para artículos |
| `.reading` | max-width centrado | Cuerpo editorial |
| `--header-height` | `65px` | Altura del header fijo |
| `--mobile-nav-height` | `64px` | Barra de navegación inferior en móvil |

Padding horizontal en móvil: `16px` (`--space-4`). En pantallas más amplias puede extenderse según el componente.

---

## Espaciado

Escala de tokens (usar solo estos valores):

| Token | Valor |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |
| `--space-9` | 96px |

### Utilidades en `globals.css`

| Clase | Comportamiento |
|-------|----------------|
| `.stack` | Flex column con `gap: --space-4` |
| `.cluster` | Flex row wrap con alineación centrada |

---

## Radios

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `8px` | Controles: botones, inputs, pills |
| `--radius-md` | `16px` | Tarjetas de contenido |
| `--radius-lg` | `24px` | Secciones editoriales destacadas |
| `--radius-thumb` | `6px` | Miniaturas |

No abusar del radio. La jerarquía no debe depender de esquinas redondeadas.

---

## Grid y flex

- **CSS Grid** — layout de página, grillas de archivo, calendario mensual, listados
- **Flexbox** — internals de componentes (header, nav, formularios, clusters)

Desktop: grid de 12 columnas implícito en los layouts de feature. Mobile: una columna, contenido apilado.

---

## Chrome del sitio

Componentes en [`src/components/layout/`](../../src/components/layout/):

| Componente | Responsabilidad |
|------------|-----------------|
| `SiteChrome` | Envuelve header, main y footer; aplica padding para nav móvil |
| `SiteHeader` | Logo, navegación principal, acceso |
| `SiteFooter` | Enlaces secundarios, créditos |
| `MobileNav` | Barra inferior fija en viewports pequeños |
| `Breadcrumbs` | Migas en páginas internas |

La navegación se define en [`src/data/nav.ts`](../../src/data/nav.ts):

- `mainNav` — Inicio, Blog, Calendario, Recursos, Bienestar
- `mobileNav` — Inicio, Blog, Buscar, Calendario, Más (recursos)
- `footerNav` — Buscar, Acceso, Archivo, Calendario
- `quickLinks` — accesos rápidos en portada (calendario, búsqueda, citas, repositorio, bienestar)

---

## Componentes UI compartidos

En [`src/components/ui/`](../../src/components/ui/):

| Componente | Uso |
|------------|-----|
| `Button` | Acciones primarias y secundarias |
| `Badge` | Estados y categorías puntuales |
| `Input` | Campos de formulario |
| `CategoryPills` | Filtros por categoría en archivo y búsqueda |

Estilos en CSS Modules; consumen tokens, no valores sueltos.

---

## Panel admin

`AdminShell` ([`src/features/admin/components/AdminShell.tsx`](../../src/features/admin/components/AdminShell.tsx)):

- Sidebar fija con navegación filtrada por rol
- Área de contenido con `AdminPageHeader`, tablas (`AdminTable`) y formularios
- Transición de entrada con GSAP (respetando `prefers-reduced-motion`)

Secciones admin: dashboard, artículos, recursos, calendario, bienestar, usuarios (solo superadmin), ajustes (solo superadmin).

---

## Animación

| Token | Valor |
|-------|-------|
| `--duration-fast` | 120ms |
| `--duration-normal` | 200ms |
| `--duration-slow` | 300ms |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |

Usar animación solo cuando aporta feedback (transiciones de panel, progreso de lectura). No como decoración.

---

## Breakpoints

El diseño es mobile-first. Los breakpoints concretos viven en los CSS Modules de cada feature; el patrón general es:

1. Una columna, nav inferior, padding `16px`
2. A ~768px: nav principal en header, grillas de 2 columnas
3. A ~1024px: layouts de 3 columnas donde aplica (archivo, recursos)

No escalar un layout de escritorio hacia abajo; construir desde móvil hacia arriba.
