# Estructura del código

## Árbol relevante

```
udceretewebsite/
├── CONTRIBUTING.md
├── CHANGELOG.md
├── README.md
├── docs/                    # Documentación de producto y arquitectura
├── public/
└── src/
    ├── app/                 # Rutas App Router (público + admin)
    ├── components/
    │   ├── admin/           # Panel editorial
    │   ├── blog/            # Lectura y cards
    │   ├── calendar/
    │   ├── citations/
    │   ├── layout/
    │   └── ui/              # Primitivas (Button, Input, …)
    ├── data/
    │   ├── cms/             # JSON editable (MVP)
    │   ├── types.ts         # Contrato de dominio
    │   └── *.ts             # Seeds / config
    ├── lib/
    │   ├── auth/
    │   ├── cms/
    │   ├── content/         # posts, search, reading-time
    │   ├── citations/
    │   ├── calendar/        # ICS
    │   └── utils/           # format, dates, files
    ├── styles/tokens.css
    └── middleware.ts
```

## Convenciones

| Tema | Convención |
|------|------------|
| Idioma UI | Español |
| Idioma código / docs técnicas | Español preferido; identificadores en inglés |
| Estilos | CSS Modules + tokens (`styles/tokens.css`) |
| Componentes | Un motivo funcional; sin decoración vacía |
| Demos | Comentario / JSDoc `@mvp` |
| Imports | Alias `@/` → `src/` |
| Server Actions | Archivos `actions.ts` junto a la ruta admin |

## Imports recomendados

```ts
// Dominio
import { getAllPosts } from "@/lib/content/posts";
import { formatShortDate } from "@/lib/utils/format";
import { buildIcs } from "@/lib/calendar/ics";
import { formatApa7 } from "@/lib/citations/citation";

// Persistencia / auth
import { readCmsPosts } from "@/lib/cms/read";
import { canAccessSection } from "@/lib/auth/permissions";
```

## Qué no hacer en este MVP

- Introducir microservicio “por adelantado” (ver estrategia API).
- Añadir glassmorphism, gradientes decorativos o IA falsa.
- Hardcodear contenido en componentes si cabe en `data/cms`.
- Ampliar el alcance a apps nativas sin pasar por Fase 2 de producto.
