# Colores

Fuente de verdad: [`src/styles/tokens.css`](../../src/styles/tokens.css).

## Jerarquía

| Rol | Token | Uso |
|-----|-------|-----|
| Dominante | `--brand-gold` | Acento institucional, estados activos, highlights editoriales |
| Estructura | `--brand-night` | Texto principal, encabezados, bordes de foco, barra admin |
| Superficie | `--color-surface`, `--color-surface-2` | Fondos de página y secciones alternas |
| Texto secundario | `--color-ink-700`, `--color-ink-400` | Cuerpo secundario, metadatos, placeholders |

**Regla:** no introducir valores HEX literales en CSS Modules. Usar siempre variables del token source.

---

## Marca

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--brand-gold` | `#f1c23d` | Acento principal, nav activa, fondos suaves con `color-mix` |
| `--brand-night` | `#151532` | Texto, encabezados, acciones primarias oscuras |
| `--brand-plum` | `#3d2361` | Acento secundario (categorías, énfasis puntuales) |
| `--brand-teal` | `#23b994` | Éxito, confirmaciones |
| `--brand-coral` | `#f05446` | Peligro, acciones destructivas |
| `--brand-amber` | `#f2a139` | Acento cálido alternativo |

---

## Neutros

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--color-ink-700` | `#3a3a55` | Texto secundario |
| `--color-ink-400` | `#767690` | Metadatos, labels, estados inactivos |
| `--color-surface` | `#ffffff` | Tarjetas, inputs, paneles |
| `--color-surface-2` | `#f7f6fa` | Fondo de página (`body`) |
| `--color-border` | `#e7e5ee` | Bordes de controles y separadores |
| `--color-border-subtle` | `rgba(21, 21, 50, 0.15)` | Divisores ligeros |

---

## Semánticos

| Token | Referencia | Uso |
|-------|------------|-----|
| `--color-primary` | `--brand-gold` | Acción o énfasis principal |
| `--color-action` | `--brand-night` | Botones y enlaces de acción |
| `--color-success` | `--brand-teal` | Estados exitosos |
| `--color-warning` | `--brand-gold` | Advertencias |
| `--color-danger` | `--brand-coral` | Errores, confirmaciones destructivas |

---

## Sombras

| Token | Uso |
|-------|-----|
| `--shadow-sm` | Elevación mínima (controles, dropdowns) |
| `--shadow-md` | Tarjetas destacadas cuando la elevación aporta |

Usar sombras con moderación. La jerarquía debe lograrse primero con tipografía y espaciado.

---

## Patrones de uso

### Fondos suaves con oro

Para estados activos o selección sin saturar:

```css
background: color-mix(in srgb, var(--brand-gold) 22%, white);
```

### Bordes de foco

```css
outline: 2px solid var(--brand-night);
outline-offset: 2px;
```

Definido globalmente en `:focus-visible` de [`src/app/globals.css`](../../src/app/globals.css).

### Admin

El panel admin invierte la jerarquía: fondo `--brand-night` en la barra lateral, texto claro, acentos en `--brand-gold`. Ver `AdminShell.module.css`.

---

## Qué no hacer

- No usar colores arbitrarios fuera de los tokens
- No depender de gradientes o blur para jerarquía
- No usar coral/teal como decoración; reservarlos para semántica
