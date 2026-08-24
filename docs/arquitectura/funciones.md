# Funciones del MVP

Mapa de rutas, features, datos y panel admin.

---

## Rutas públicas

| Ruta | Feature | Componente principal | Datos |
|------|---------|---------------------|-------|
| `/` | Blog + sitio | `FeaturedHero`, `quickLinks`, últimos posts | `posts.json`, `events.json` |
| `/archivo` | Blog | `ArchivePageContent` | `posts.json` (filtros: categoría, mes, tag, query, orden) |
| `/articulos/[slug]` | Blog | Lectura con `ReadingProgress`, `TagList`, `ArticleComments` | `posts.json` por slug |
| `/buscar` | Blog | Página client-side | Posts, recursos, eventos (`search.ts`) |
| `/calendario` | Calendario | Grid mensual, `AcademicScheduleTables`, export `.ics` | `events.json`, `calendar.ts` |
| `/recursos` | Recursos | `ResourcesPageContent` | `resources.json` |
| `/citas` | Citas | `CitationTool` | Catálogo local en `citation.ts` |
| `/bienestar` | Bienestar | `WellbeingPageContent` | `wellbeing.json` |
| `/acceso` | Auth demo | Login simulado + `AdminDemoPanel` | Cookie de sesión |

### Detalle por función

#### Blog

- Categorías: Académico, Trámites, Institucional, Beneficios, Tecnología y productividad, Recursos, Bienestar
- Tiempo de lectura calculado (`reading-time.ts`)
- Comentarios con snapshot estable (`ArticleComments`)
- Progreso de lectura en scroll (`ReadingProgress`)
- `generateStaticParams` para slugs publicados

#### Calendario

- Grid mensual navegable con marcadores de días con eventos
- Tablas de cronograma académico (`AcademicScheduleTables`)
- Exportación `.ics` (RFC 5545) vía `features/calendar/lib/ics.ts`

#### Recursos

- Filtro por programa y tipo (guía, formato, plantilla)
- Adjuntos servidos desde `public/uploads/`

#### Citas

- Formatos APA 7 y Vancouver
- Resolución mock de DOIs con catálogo demo

#### Bienestar

- Rutas de atención con contacto y horario
- Testimonios de estudiantes

#### Búsqueda

- Normalización sin acentos
- Índice client-side sobre posts, recursos, eventos y trámites

---

## Rutas admin

Requieren sesión demo (ver [auth.md](./auth.md)).

| Ruta | Feature | Acción |
|------|---------|--------|
| `/admin` | Admin | Dashboard: borradores, publicados, próximos eventos |
| `/admin/articulos` | Blog | Listado de artículos |
| `/admin/articulos/nuevo` | Blog | Crear artículo (`PostForm` + `ArticleEditor`) |
| `/admin/articulos/[id]/editar` | Blog | Editar artículo |
| `/admin/recursos` | Recursos | Listado |
| `/admin/recursos/nuevo` | Recursos | Crear (`ResourceForm`) |
| `/admin/recursos/[id]/editar` | Recursos | Editar |
| `/admin/calendario` | Calendario | Listado de eventos |
| `/admin/calendario/nuevo` | Calendario | Crear (`EventForm`) |
| `/admin/calendario/[id]/editar` | Calendario | Editar |
| `/admin/bienestar` | Bienestar | Editor de rutas y testimonios (`WellbeingEditor`) |
| `/admin/usuarios` | Admin | Gestión de usuarios (`UsersManager`) — **solo superadmin** |
| `/admin/ajustes` | Admin | Configuración del sitio (`SiteSettingsForm`) — **solo superadmin** |

### Server actions por feature

| Feature | Archivo | Operaciones |
|---------|---------|-------------|
| Blog | `features/blog/actions.ts` | `createPost`, `updatePost`, `deletePost` |
| Recursos | `features/resources/actions.ts` | CRUD de recursos |
| Calendario | `features/calendar/actions.ts` | CRUD de eventos |
| Bienestar | `features/wellbeing/actions.ts` | Actualizar rutas y testimonios |
| Admin | `features/admin/actions/` | Usuarios, ajustes del sitio |

Todas las mutaciones pasan por `lib/cms/write.ts` y disparan revalidación vía `lib/cms/revalidate.ts`.

---

## Matriz feature → archivos

| Feature | Directorio | CMS | Admin |
|---------|------------|-----|-------|
| Blog | `src/features/blog/` | `posts.json` | `/admin/articulos/*` |
| Calendario | `src/features/calendar/` | `events.json` | `/admin/calendario/*` |
| Recursos | `src/features/resources/` | `resources.json` | `/admin/recursos/*` |
| Bienestar | `src/features/wellbeing/` | `wellbeing.json` | `/admin/bienestar` |
| Citas | `src/features/citations/` | — (catálogo local) | — |
| Admin shell | `src/features/admin/` | `users.json`, `site.json` | `/admin`, usuarios, ajustes |

---

## Fuera de alcance del MVP

- CMS y auth de producción
- Microservicio API
- Apps nativas
- Newsletter, analytics dashboard, IA generativa

Criterio de evolución: [mvp-strategy.md](../mvp-strategy.md).
