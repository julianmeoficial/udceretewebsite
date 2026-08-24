# Tipografía

Fuente de verdad: [`src/styles/tokens.css`](../../src/styles/tokens.css) y [`src/app/globals.css`](../../src/app/globals.css).

## Familias

| Token | Familia | Uso |
|-------|---------|-----|
| `--font-ui` | Inter (`--font-inter`) | **Principal.** Body, títulos, navegación, botones, formularios, tablas, admin |
| `--font-serif` | Source Serif 4 (`--font-source-serif`) | Citas o bloques editoriales puntuales (p. ej. testimonios en bienestar) |
| `--font-mono` | JetBrains Mono (`--font-jetbrains-mono`) | Código, citas bibliográficas generadas, bloques del editor TipTap |

Las tres familias se cargan en [`src/app/layout.tsx`](../../src/app/layout.tsx) vía `next/font/google` con `display: swap`.

**Regla general:** Inter para casi todo el producto. Serif y mono solo donde el contenido lo exige (citas, código, citas de testimonio).

---

## Escala

| Token | Tamaño | Uso |
|-------|--------|-----|
| `--text-display` | `clamp(2.125rem, 4.8vw, 3.25rem)` | Hero editorial, portada |
| `--text-title` | `clamp(1.75rem, 3.5vw, 2.375rem)` | Títulos de página (`h1`) |
| `--text-section` | `clamp(1.25rem, 2.4vw, 1.5rem)` | Subtítulos de sección (`h2`) |
| `--text-body` | `1rem` | Cuerpo por defecto |
| `--text-body-lg` | `1.125rem` | Lead, introducciones |
| `--text-meta` | `0.8125rem` | Fechas, autores, etiquetas |
| `--text-kicker` | `0.6875rem` | Overlines, categorías (con tracking amplio) |

---

## Tracking (letter-spacing)

| Token | Valor | Uso |
|-------|-------|-----|
| `--track-display` | `-0.035em` | Display y `h1` |
| `--track-title` | `-0.028em` | Títulos de sección |
| `--track-body` | `-0.011em` | Cuerpo y `h3` |
| `--track-meta` | `-0.005em` | Metadatos |
| `--track-kicker` | `0.16em` | Kickers en mayúsculas |

---

## Interlineado

| Token | Valor | Uso |
|-------|-------|-----|
| `--leading-display` | `1.05` | Display |
| `--leading-title` | `1.15` | Títulos |
| `--leading-body` | `1.6` | Cuerpo de lectura |
| `--leading-tight` | `1.35` | Subtítulos compactos |

---

## Pesos

- **400** — cuerpo, párrafos, listas
- **500** — labels, metadatos con énfasis
- **600** — encabezados (`h1`–`h3`), botones, navegación activa

Evitar pesos decorativos (300, 800) salvo necesidad puntual.

---

## Lectura editorial

- Ancho máximo de artículo: `--reading-max` (`680px`), clase utilitaria `.reading` en `globals.css`
- `text-wrap: balance` en encabezados para evitar viudas feas
- `font-variant-numeric: lining-nums proportional-nums` en body; usar números tabulares (`tabular-nums`) en fechas, horarios, tamaños de archivo y datos académicos

---

## Jerarquía HTML

Definida en `globals.css`:

| Elemento | Familia | Tamaño | Peso |
|----------|---------|--------|------|
| `h1` | `--font-ui` | `--text-title` | 600 |
| `h2` | `--font-ui` | `--text-section` | 600 |
| `h3` | `--font-ui` | `1.125rem` | 600 |
| `body` | `--font-ui` | `--text-body` | 400 |

Los artículos largos heredan el ritmo del body; el editor TipTap (`ArticleEditor`) usa mono para bloques de código y UI para el resto.

---

## Accesibilidad

- Contraste: texto principal en `--brand-night` sobre `--color-surface` o `--color-surface-2`
- `:focus-visible` con outline de 2px en `--brand-night`
- `prefers-reduced-motion: reduce` desactiva animaciones y transiciones en `globals.css`
