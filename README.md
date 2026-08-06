# Blog UDEC Cereté

Portal académico y blog editorial del **Centro Tutorial Cereté** (Universidad de Cartagena).

> **Estado:** MVP de validación de UX  
> **Objetivo:** probar flujos, jerarquía y usabilidad con la comunidad estudiantil  
> **No es** producción. CMS, auth, API y apps llegan por fases.

---

## Docs (MVP)

| Documento | Para qué |
|-----------|----------|
| [docs/mvp-strategy.md](./docs/mvp-strategy.md) | Estrategia del MVP y cuándo decidir API monolito vs microservicio |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Cómo contribuir |
| [CHANGELOG.md](./CHANGELOG.md) | Historial de cambios |
| [`.cursorrules`](./.cursorrules) | Design system y reglas de producto |

La documentación oficial del sitio se creará al pasar a producción.

---

## Arranque rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

| Script | Uso |
|--------|-----|
| `npm run dev` | Desarrollo local |
| `npm run build` | Build de producción |
| `npm start` | Servir el build |
| `npm run lint` | ESLint |

---

## Stack (MVP)

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Estilos | CSS Modules + `src/styles/tokens.css` |
| Motion | GSAP |
| Editor admin | TipTap |
| Datos | JSON en `src/data/cms/` |
| Auth | Sesión demo por cookie |

---

## Mapa de rutas

### Público

| Ruta | Qué prueba |
|------|------------|
| `/` | Portada y accesos rápidos |
| `/archivo` | Listado filtrable |
| `/articulos/[slug]` | Lectura |
| `/buscar` | Búsqueda del sitio |
| `/calendario` | Agenda + `.ics` |
| `/recursos` | Guías por programa |
| `/citas` | APA 7 / Vancouver (demo) |
| `/bienestar` | Rutas de atención |
| `/acceso` | Acceso simulado |

### Admin (sesión demo vía `/acceso` → `[admin test]`)

`/admin`, artículos, calendario, recursos, bienestar, usuarios, ajustes.

---

## Estructura

```
src/
├── app/            # Rutas (capa delgada)
├── components/     # UI compartida (ui, layout)
├── features/       # Dominios: blog, calendar, resources, wellbeing, citations, admin
├── data/           # Tipos, seeds, cms JSON
├── lib/            # auth, cms, utils (infra compartida)
├── styles/         # Design tokens
└── middleware.ts
```

---

## Principios

1. Institucional y editorial — no look “AI-generated”.
2. Cada pantalla tiene una tarea real.
3. Mobile-first; copy público en español.
4. Oro dominante / night — solo tokens.
5. Inter; lectura máx. `680px`; desktop máx. `1200px`.

---

## Cómo testear UX

1. Encontrar un aviso reciente.
2. Consultar una fecha y exportar `.ics` si aplica.
3. Descargar un recurso de su programa.
4. Generar una cita APA o Vancouver.
5. Localizar una ruta de bienestar.
6. *(Staff)* `/acceso` → `[admin test]` y editar un aviso.

---

## Fuera de alcance (ahora)

CMS/auth de producción, microservicio API, apps nativas. Criterio: [docs/mvp-strategy.md](./docs/mvp-strategy.md).

---

## Referencias

- Blog legado: [ctcerete.blogspot.com](https://ctcerete.blogspot.com/)
