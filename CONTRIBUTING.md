# Guía de contribución

Gracias por contribuir al portal del **Centro Tutorial Cereté**. Este repo es un **MVP de validación UX**: priorizamos claridad de producto y deuda consciente sobre infraestructura prematura.

## Antes de empezar

1. Lee el [README](./README.md) y [docs/](./docs/README.md).
2. Revisa [estrategia MVP / API](./docs/strategy/mvp-and-api-boundary.md): **no** introduzcas un microservicio “por si acaso”.
3. Respeta [`.cursorrules`](./.cursorrules) (identidad editorial, tokens, anti-patrones AI-looking).

## Entorno

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Flujo de trabajo

1. Crea una rama desde `main`: `feat/…`, `fix/…`, `docs/…`, `chore/…`.
2. Mantén el cambio **acotado** a lo que se está validando o documentando.
3. Si tocas dominio reutilizable, documenta el módulo (JSDoc breve).
4. Marca demos temporales con `@mvp` en comentario/JSDoc.
5. Actualiza [CHANGELOG.md](./CHANGELOG.md) bajo `[Unreleased]` si el cambio es visible para el equipo.
6. Abre PR con resumen + plan de prueba (rutas afectadas).

## Estándares de código

| Área | Práctica |
|------|----------|
| UI copy | Español |
| Componentes | Un propósito; sin decoración vacía |
| Estilos | CSS Modules + tokens; sin HEX sueltos |
| Dominio | Lógica en `src/lib/**`; UI delgada |
| Persistencia | Solo vía `src/lib/cms/*` |
| Auth demo | No extender `signInDemo*` como si fuera producción |
| IA / búsqueda avanzada | No reintroducir mocks engañosos |

### Organización de `src/lib`

```
auth/  cms/  content/  citations/  calendar/  utils/
```

Detalle: [docs/architecture/codebase.md](./docs/architecture/codebase.md).

## Commits

Mensajes claros, en español o inglés consistente con el historial reciente, orientados al **porqué**:

```
docs: añadir estrategia de frontera API del MVP

fix: estabilizar snapshot de comentarios para useSyncExternalStore
```

No uses `--no-verify` ni force-push a `main`.

## Documentación

- Decisiones duraderas → ADR en `docs/decisions/`.
- Estrategia de producto → `docs/strategy/`.
- Keep/discard → `docs/architecture/keep-vs-discard.md`.
- No dupliques párrafos largos en el README; enlaza a `docs/`.

## Qué queda fuera (por ahora)

- Microservicio API dedicado
- Apps nativas
- Auth de producción
- CMS de producción concurrente

Ver [fases de producto](./docs/strategy/product-phases.md).

## Revisión de PR

Checklist mínimo:

- [ ] ¿Sigue siendo necesario para la prueba UX o la base post-MVP?
- [ ] ¿Respeta design system / `.cursorrules`?
- [ ] ¿Evita acoplar UI a detalles de persistencia?
- [ ] ¿Actualizó docs o CHANGELOG si aplica?
- [ ] `npm run lint` y `npm run build` OK
