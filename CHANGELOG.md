# Changelog

Todos los cambios relevantes de este proyecto se documentan aquí.

El formato se inspira en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/) cuando salga de `0.x`.

## [Unreleased]

### Added

- Carpeta `docs/` con estrategia MVP, arquitectura, fases de producto y ADRs.
- `CONTRIBUTING.md` y este `CHANGELOG.md`.
- Organización de `src/lib` en capas: `content/`, `citations/`, `calendar/`, `utils/` (además de `auth/`, `cms/`).
- Documentación local en `src/lib/README.md` y `src/data/README.md`.

### Changed

- `/buscar` solo búsqueda del sitio (sin modo IA demo).
- Acceso rápido de portada: “Buscar en el sitio” en lugar de “Preguntar a la IA”.
- Inputs/selects institucionales sin glassmorphism (`SelectField` nativo).

### Removed

- `lib/ai-demo`, `GlassSelect`, `Newsletter`, `FadeInItem`.
- Dependencia `motion`.

### Fixed

- Hidratación de fechas cortas (`formatShortDate` sin puntos divergentes SSR/cliente).
- Snapshot estable de comentarios (`useSyncExternalStore` + caché por slug).

## [0.1.0] — 2026-07-31

### Added

- Primer MVP para investigación UX del portal Centro Tutorial Cereté.
- Rutas públicas: portada, archivo, artículos, buscar, calendario, recursos, citas, bienestar, acceso.
- Panel admin simulado con CMS JSON local y sesión demo.
- Design tokens institucionales y reglas de producto (`.cursorrules`).
