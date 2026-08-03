# Vista general de arquitectura (MVP)

```
                    ┌──────────────────────┐
                    │   Navegador / PWA    │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  Next.js App Router  │
                    │  app/ + components/  │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        lib/content      lib/auth          lib/cms
        lib/utils        (sesión demo)     (JSON file)
        lib/calendar
        lib/citations
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                      data/types.ts
                      data/cms/*.json
```

## Capas

| Capa | Ubicación | Notas |
|------|-----------|--------|
| Presentación | `src/app`, `src/components` | Copy en español; CSS Modules + tokens |
| Dominio / aplicación | `src/lib/*` | Sin acoplar a React cuando sea posible |
| Datos | `src/data` | Tipos + seeds + JSON CMS |
| Borde | `middleware.ts` | Guardas `/admin` |

## Límites que hay que respetar

1. Los componentes no leen/escriben archivos ni conocen rutas del CMS.
2. Las server actions del admin son delgadas: validan → llaman `lib/cms` → revalidan.
3. Los tipos de dominio no importan Next ni React.
4. Cualquier feature marcada `@mvp` no se promociona a “producción” sin recrearla.

Detalle de carpetas: [codebase.md](./codebase.md).  
Keep/discard: [keep-vs-discard.md](./keep-vs-discard.md).  
API: [mvp-and-api-boundary.md](../strategy/mvp-and-api-boundary.md).
