# Diagramas de funcionamiento

Diagramas Mermaid que describen los flujos principales del MVP.

---

## Capas de la aplicación

```mermaid
flowchart TB
  subgraph public [Sitio publico]
    appRoutes["app/ rutas"]
    features["features/ dominio"]
  end

  subgraph infra [Infraestructura]
    libCms["lib/cms"]
    libAuth["lib/auth"]
  end

  subgraph storage [Persistencia]
    cmsJson["data/cms/*.json"]
    uploads["public/uploads/"]
  end

  appRoutes --> features
  features --> libCms
  features --> libAuth
  libCms --> cmsJson
  libCms --> uploads
```

---

## Lectura pública

Flujo cuando un usuario visita una página del sitio (p. ej. `/articulos/mi-aviso`).

```mermaid
sequenceDiagram
  participant User as Usuario
  participant Next as Next.js
  participant Page as app/articulos/slug
  participant Feature as features/blog
  participant CMS as lib/cms/read
  participant JSON as posts.json

  User->>Next: GET /articulos/mi-aviso
  Next->>Page: render server component
  Page->>Feature: getPostBySlug
  Feature->>CMS: getPublishedPostBySlug
  CMS->>JSON: readFile
  JSON-->>CMS: CmsPost
  CMS-->>Feature: Post publicado
  Feature-->>Page: datos + componentes
  Page-->>User: HTML con ReadingProgress, body, comments
```

---

## Mutación admin

Flujo cuando un editor guarda un artículo desde el panel.

```mermaid
sequenceDiagram
  participant Editor as Admin
  participant Form as PostForm
  participant Action as blog/actions
  participant Auth as lib/auth
  participant Write as lib/cms/write
  participant Reval as lib/cms/revalidate
  participant JSON as posts.json

  Editor->>Form: submit formulario
  Form->>Action: updatePost (server action)
  Action->>Auth: requireSession + canManageContent
  Auth-->>Action: SessionUser
  Action->>Write: writeCmsPosts
  Write->>JSON: writeFile
  Action->>Reval: revalidatePath /articulos, /archivo, /
  Reval-->>Editor: redirect /admin/articulos
```

---

## Autenticación demo

```mermaid
flowchart TD
  start[Usuario visita /acceso]
  demo[AdminDemoPanel o magic-link simulado]
  action[signInDemoSuperadmin o signInDemoCentroAdmin]
  cookie[Set cookie udc_session]
  admin[Redirect a /admin o next param]

  protect{Request /admin/*}
  valid{Cookie valida?}
  role{Ruta superadmin-only?}
  allowed{Rol superadmin?}
  deny[Redirect /acceso]
  block[Redirect /admin]
  serve[Servir pagina admin]

  start --> demo --> action --> cookie --> admin
  protect --> valid
  valid -->|No| deny
  valid -->|Si| role
  role -->|Si| allowed
  role -->|No| serve
  allowed -->|No| block
  allowed -->|Si| serve
```

---

## Búsqueda del sitio

La búsqueda en `/buscar` es **client-side**: no hay endpoint de API.

```mermaid
flowchart LR
  load[Cargar datos en build o SSR]
  index[posts + resources + events en memoria]
  input[Usuario escribe query]
  norm[Normalizar sin acentos]
  filter[Filtrar por titulo, excerpt, tags]
  results[Mostrar resultados agrupados]

  load --> index
  input --> norm --> filter
  index --> filter --> results
```

Implementación: [`src/features/blog/lib/search.ts`](../../src/features/blog/lib/search.ts).

---

## Exportación de calendario

```mermaid
flowchart LR
  events[readCmsEvents]
  ics[features/calendar/lib/ics.ts]
  blob[Generar string RFC 5545]
  download[Descarga .ics en cliente]

  events --> ics --> blob --> download
```

---

## Revalidación tras mutación

```mermaid
flowchart TD
  mutate[Server action muta CMS]
  write[lib/cms/write.ts]
  pick[Rutas afectadas segun entidad]
  reval[revalidatePath por cada ruta]
  fresh[Proxima visita sirve datos frescos]

  mutate --> write --> pick --> reval --> fresh
```

Entidades y rutas típicas:

| Entidad | Rutas revalidadas |
|---------|-------------------|
| Post | `/`, `/archivo`, `/articulos/[slug]`, `/buscar` |
| Evento | `/calendario` |
| Recurso | `/recursos` |
| Bienestar | `/bienestar` |
