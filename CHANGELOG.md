# Changelog

Todos los cambios relevantes de este proyecto se documentan aquí.

El formato se inspira en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/) cuando salga de `0.x`.

## [Unreleased]

### Added

- `docs/mvp-strategy.md` — estrategia del MVP y frontera API (decisión diferida).
- `CONTRIBUTING.md` y `CHANGELOG.md`.
- Organización de `src/lib` en capas: `content/`, `citations/`, `calendar/`, `utils/` (además de `auth/`, `cms/`).
- Reorganización por features en `src/features/` (`blog`, `calendar`, `resources`, `wellbeing`, `citations`, `admin`).

### Changed

- Código de dominio movido de `components/*` y `lib/content` a `src/features/*`; `app/` queda como capa de rutas.

- `/buscar` solo búsqueda del sitio (sin modo IA demo).
- Acceso rápido de portada: “Buscar en el sitio” en lugar de “Preguntar a la IA”.
- Inputs/selects institucionales sin glassmorphism (`SelectField` nativo).

### Removed

- `lib/ai-demo`, `GlassSelect`, `Newsletter`, `FadeInItem`.
- Dependencia `motion`.
- Documentación MVP excesiva (ADRs, architecture/, READMEs de carpetas); se retomará en producción.

### Fixed

- Hidratación de fechas cortas (`formatShortDate` sin puntos divergentes SSR/cliente).
- Snapshot estable de comentarios (`useSyncExternalStore` + caché por slug).

## [0.1.0] — 2026-07-31

### Added

- Primer MVP para investigación UX del portal Centro Tutorial Cereté.
- Rutas públicas: portada, archivo, artículos, buscar, calendario, recursos, citas, bienestar, acceso.
- Panel admin simulado con CMS JSON local y sesión demo.
- Design tokens institucionales y reglas de producto (`.cursorrules`).
