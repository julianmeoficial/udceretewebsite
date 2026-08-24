# Datos y CMS

## Modelo de dominio

Contrato canónico en [`src/data/types.ts`](../../src/data/types.ts). Preservar estas shapes al migrar a base de datos o API.

### Entidades principales

| Tipo | Campos clave | Uso |
|------|--------------|-----|
| `Post` / `CmsPost` | slug, title, body, category, tags, status | Artículos del blog |
| `CalendarEvent` | id, title, date, category, description | Calendario académico |
| `Resource` | id, title, programs, type, fileUrl | Repositorio de guías |
| `SupportRoute` | id, title, contact, schedule | Rutas de bienestar |
| `Testimonial` | id, quote, author, program | Testimonios de bienestar |
| `CmsUser` | id, email, name, role, active | Usuarios del panel |
| `CitationMetadata` | authors, title, year, doi, journal | Generador de citas |

### Tipos auxiliares

- `Category` — 7 categorías editoriales
- `ResourceType` — guía | formato | plantilla
- `PostStatus` — draft | published | archived
- `UserRole` — superadmin | centro_admin
- `Program` — programas académicos (desde `programs.ts`)

---

## Persistencia JSON

Directorio: `src/data/cms/`

| Archivo | Contenido |
|---------|-----------|
| `posts.json` | Artículos con estado CMS |
| `resources.json` | Recursos y metadatos de adjuntos |
| `events.json` | Eventos del calendario |
| `wellbeing.json` | Rutas de apoyo y testimonios |
| `users.json` | Usuarios del panel admin |
| `site.json` | Configuración global del sitio |

Mapa de archivos en [`src/lib/cms/paths.ts`](../../src/lib/cms/paths.ts):

```ts
export const CMS_DIR = path.join(process.cwd(), "src/data/cms");
export const CMS_FILES = {
  posts: "posts.json",
  resources: "resources.json",
  events: "events.json",
  wellbeing: "wellbeing.json",
  users: "users.json",
  site: "site.json",
};
```

---

## Capa de lectura (`lib/cms/read.ts`)

Funciones principales:

| Función | Retorna |
|---------|---------|
| `readCmsPosts()` | Todos los posts CMS |
| `getPublishedPosts()` | Posts con `status: "published"` |
| `getPublishedPostBySlug(slug)` | Post publicado por slug |
| `toPublicPost(cmsPost)` | Post sin campos internos CMS |
| `readCmsResources()` | Recursos |
| `readCmsEvents()` | Eventos |
| `readCmsWellbeing()` | Bienestar |
| `readCmsUsers()` | Usuarios |
| `readCmsSite()` | Configuración del sitio |

La UI **no** importa paths de JSON directamente; siempre pasa por estas funciones o por helpers de feature (`features/blog/lib/posts.ts`).

---

## Capa de escritura (`lib/cms/write.ts`)

- Escritura directa con `writeFile` (sin locking — solo demo)
- Invocada exclusivamente desde server actions de cada feature
- Tras mutación, `lib/cms/revalidate.ts` invalida rutas afectadas

---

## Seeds y fallbacks

En `src/data/` hay datos estáticos que sirven de fallback cuando el JSON no existe o para datos de referencia:

| Archivo | Contenido |
|---------|-----------|
| `posts.ts` | Posts de ejemplo |
| `resources.ts` | Recursos de ejemplo |
| `calendar.ts` | Tablas de cronograma académico |
| `wellbeing.ts` | Rutas y testimonios de ejemplo |
| `authors.ts` | Autores |
| `programs.ts` | Programas académicos |
| `nav.ts` | Navegación principal |
| `site.ts` | Configuración del sitio |

---

## Uploads

Adjuntos de recursos se guardan en `public/uploads/` y se referencian con `fileUrl` (p. ej. `/uploads/resources/documento.pdf`).

Metadatos del archivo: `fileName`, `fileFormat`, `size`.

---

## Flujo de datos

```
Server Action (feature)
    → lib/cms/write.ts (mutación)
    → lib/cms/revalidate.ts (invalidar cache)
    → Next.js re-renderiza rutas afectadas

Página / componente
    → lib/cms/read.ts (lectura)
    → render
```

Ver diagramas en [flujos.md](./flujos.md).

---

## Migración futura

`lib/cms` actúa como **puerto de persistencia**. Al migrar a BD o API:

1. Reemplazar implementación de `read.ts` / `write.ts`
2. Conservar firmas y tipos de `types.ts`
3. No tocar componentes de feature salvo imports si cambian nombres
