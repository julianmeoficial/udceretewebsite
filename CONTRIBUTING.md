# Guía de contribución

Repo del **MVP de UX** del Centro Tutorial Cereté. La documentación oficial del sitio en producción se hará en esa fase.

## Antes de empezar

1. [README](./README.md)
2. [Estrategia MVP / API](./docs/mvp-strategy.md) — no inventar microservicio “por si acaso”
3. [`.cursorrules`](./.cursorrules) — identidad editorial y design system

## Entorno

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Flujo

1. Rama desde `main`: `feat/…`, `fix/…`, `docs/…`, `chore/…`
2. Cambio acotado a lo que se valida o a la base post-MVP
3. Demos temporales: marcar `@mvp`
4. Si el cambio importa al equipo, anótalo en [CHANGELOG](./CHANGELOG.md) bajo `[Unreleased]`
5. PR con resumen + rutas a probar

## Estándares

| Área | Práctica |
|------|----------|
| UI copy | Español |
| Estilos | CSS Modules + tokens; sin HEX sueltos |
| Dominio | Lógica y UI de feature en `src/features/<dominio>/` |
| UI compartida | `src/components/ui` y `src/components/layout` |
| Persistencia | Solo vía `src/lib/cms/*` |
| Auth demo | No tratar `signInDemo*` como producción |
| IA | No reintroducir mocks engañosos |

`src/features`: `blog/`, `calendar/`, `resources/`, `wellbeing/`, `citations/`, `admin/`.  
`src/lib`: `auth/`, `cms/`, `utils/`.

## Fuera de alcance (MVP)

Microservicio API, apps nativas, auth/CMS de producción. Ver [docs/mvp-strategy.md](./docs/mvp-strategy.md).
