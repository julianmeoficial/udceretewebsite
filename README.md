# Blog UDEC Cereté

Portal académico y blog editorial del **Centro Tutorial Cereté** (Universidad de Cartagena).

> **Estado:** MVP de validación de UX  
> **Objetivo:** probar flujos, jerarquía de información y usabilidad con la comunidad estudiantil  
> **No es** la versión de producción. La arquitectura definitiva (CMS, auth real, API, IA, PWA) llega en fases posteriores.

---

## Propósito de este MVP

Este repositorio existe para **testear la experiencia de usuario** antes de invertir en infraestructura sólida.

| Validamos ahora | Dejamos para después |
|-----------------|----------------------|
| Navegación y hallazgos de contenido | Payload CMS / base de datos |
| Lectura editorial y archivo | Auth real (Supabase / Magic Link) |
| Calendario, recursos, bienestar | API Hono + backend |
| Panel admin simulado (CMS en JSON) | Perplexity Sonar / IA en producción |
| Generador de citas y búsqueda client-side | PWA y apps móviles |
| Identidad visual institucional | Despliegue endurecido y observabilidad |

Los aprendizajes de este MVP alimentan el diseño y la priorización de la versión estable.

---

## Stack actual (MVP)

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Estilos | CSS Modules + tokens en `src/styles/tokens.css` |
| Motion | GSAP (hero) + Motion |
| Editor admin | TipTap |
| Datos | JSON local en `src/data/cms/` (sin backend) |
| Auth | Sesión simulada por cookie (`/acceso` → `/admin`) |

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

## Mapa de rutas

### Público

| Ruta | Qué prueba |
|------|------------|
| `/` | Portada, destacado editorial, accesos rápidos |
| `/archivo` | Listado filtrable de avisos |
| `/articulos/[slug]` | Lectura de artículo |
| `/buscar` | Búsqueda client-side |
| `/calendario` | Calendario académico + export `.ics` |
| `/recursos` | Guías y formatos por programa |
| `/citas` | Generador APA 7 / Vancouver (demo) |
| `/bienestar` | Rutas de atención |
| `/acceso` | Acceso simulado (Magic Link / OTP demo) |

### Admin (requiere sesión demo)

| Ruta | Qué prueba |
|------|------------|
| `/admin` | Dashboard editorial |
| `/admin/articulos` | CRUD de avisos (TipTap) |
| `/admin/calendario` | Eventos académicos |
| `/admin/recursos` | Recursos descargables |
| `/admin/bienestar` | Contenido de bienestar |
| `/admin/usuarios` | Usuarios (solo superadmin) |
| `/admin/ajustes` | Ajustes del sitio (solo superadmin) |

---

## Estructura del proyecto

```
src/
├── app/                 # Rutas App Router (público + admin)
├── components/
│   ├── admin/           # Panel editorial
│   ├── blog/            # Lectura y cards
│   ├── calendar/        # Calendario académico
│   ├── citations/       # Generador de citas
│   ├── home/            # Secciones de portada
│   ├── layout/          # Header, footer, nav
│   └── ui/              # Controles reutilizables
├── data/
│   ├── cms/             # Fuente de verdad del MVP (JSON)
│   └── *.ts             # Config, nav, tipos, helpers de datos
├── lib/
│   ├── auth/            # Sesión y permisos simulados
│   ├── cms/             # Lectura/escritura JSON + revalidate
│   └── *.ts             # Utilidades (fechas, búsqueda, ICS…)
├── styles/
│   └── tokens.css       # Design tokens institucionales
└── middleware.ts        # Protección de /admin
```

### Contenido del MVP

- Avisos inspirados en [ctcerete.blogspot.com](https://ctcerete.blogspot.com/).
- Datos editables en `src/data/cms/` (`posts`, `events`, `resources`, `wellbeing`, `users`, `site`).
- El admin escribe sobre esos JSON; es suficiente para demos de UX, no para producción concurrente.

---

## Principios de producto y diseño

Resumen operativo (detalle en `.cursorrules`):

1. **Institucional y editorial** — no SaaS genérico ni look “AI-generated”.
2. **Útil para estudiantes** — cada pantalla tiene una tarea real.
3. **Mobile-first** y baja fricción en conexiones lentas.
4. **Copy público en español**.
5. **Oro dominante / night para contraste** — solo tokens del design system.
6. **Tipografía:** Inter. Lectura máx. `680px`. Contenido desktop máx. `1200px`.

---

## Cómo testear UX

Sugerencia de sesiones con usuarios (estudiantes / staff del centro):

1. **Encontrar un aviso reciente** desde la portada o el archivo.
2. **Consultar una fecha** del calendario y exportar `.ics` si aplica.
3. **Descargar un recurso** de su programa.
4. **Generar una cita** APA o Vancouver.
5. **Localizar una ruta de bienestar**.
6. *(Staff)* Entrar por `/acceso` y publicar o editar un aviso en `/admin`.

Anota fricción, copy confuso, jerarquía rota y tareas que el MVP aún no cubre. Esos hallazgos priorizan la versión sólida.

---

## Fuera de alcance (post-MVP)

Planeado para la construcción sólida, no implementado aquí de forma definitiva:

- [ ] CMS real (p. ej. Payload) + persistencia
- [ ] Auth y roles productivos
- [ ] API dedicada (p. ej. Hono)
- [ ] Búsqueda / asistente con fuentes (p. ej. Perplexity Sonar)
- [ ] PWA y posibles apps móviles
- [ ] Observabilidad, backups y hardening de despliegue

Cuando una pieza salga del MVP y entre a producción, actualiza esta sección y el stack.

---

## Contribuir en este MVP

1. Mantén cambios acotados a lo que se está validando.
2. No introduzcas infraestructura “de producción” sin necesidad de la prueba UX.
3. Respeta tokens y reglas de diseño (`.cursorrules`).
4. Prefiere datos en `src/data/cms/` sobre hardcodear contenido en componentes.
5. Actualiza este README si cambias rutas, stack o alcance.

---

## Referencias

- Blog legado: [ctcerete.blogspot.com](https://ctcerete.blogspot.com/)
- Design system y propuesta técnica: documentación interna (Notion — Blog UDEC Cereté)
- Reglas del agente / diseño: [`.cursorrules`](./.cursorrules)
