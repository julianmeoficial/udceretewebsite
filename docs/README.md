# Documentación del MVP — UDEC Cereté

Portal académico y blog editorial del **Centro Tutorial Cereté** (Universidad de Cartagena).

> **Estado:** MVP de validación de UX. Esta carpeta documenta el producto **tal como está hoy**. No es documentación de producción ni runbook de despliegue.

---

## Índice

### Diseño

| Documento | Cuándo leerlo |
|-----------|---------------|
| [design/identidad.md](./design/identidad.md) | Principios de producto, tono visual y reglas anti-interfaz genérica |
| [design/colores.md](./design/colores.md) | Tokens de color, jerarquía oro/night, uso semántico |
| [design/tipografia.md](./design/tipografia.md) | Familias, escala tipográfica, lectura editorial |
| [design/layout.md](./design/layout.md) | Contenedores, espaciado, chrome del sitio, navegación |

### Arquitectura

| Documento | Cuándo leerlo |
|-----------|---------------|
| [arquitectura/overview.md](./arquitectura/overview.md) | Stack, capas del código y organización del repo |
| [arquitectura/funciones.md](./arquitectura/funciones.md) | Mapa de rutas, features y panel admin |
| [arquitectura/datos.md](./arquitectura/datos.md) | CMS JSON, tipos de dominio, lectura/escritura |
| [arquitectura/auth.md](./arquitectura/auth.md) | Sesión demo, roles y permisos |
| [arquitectura/flujos.md](./arquitectura/flujos.md) | Diagramas de funcionamiento (Mermaid) |

### Estrategia

| Documento | Cuándo leerlo |
|-----------|---------------|
| [mvp-strategy.md](./mvp-strategy.md) | Frontera API, monolito vs microservicio, fases futuras |

---

## Referencias externas al repo

| Documento | Para qué |
|-----------|----------|
| [README.md](../README.md) | Arranque rápido, scripts y mapa resumido |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Flujo de contribución y estándares de código |
| [CHANGELOG.md](../CHANGELOG.md) | Historial de cambios |
| [`.cursorrules`](../.cursorrules) | Reglas para agentes y design system resumido |

---

## Fuente de verdad visual

Los tokens viven en [`src/styles/tokens.css`](../src/styles/tokens.css). Cualquier discrepancia entre documentación y código se resuelve a favor del código.
