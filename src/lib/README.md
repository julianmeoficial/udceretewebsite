# `src/lib` — capas de dominio

La UI (`app/`, `components/`) importa desde aquí; no al revés.

| Carpeta | Responsabilidad | Destino en producción |
|---------|-----------------|----------------------|
| `auth/` | Sesión, roles, permisos | Auth institucional / IdP |
| `cms/` | Persistencia y revalidación | Adaptador BD / Payload |
| `content/` | Posts, búsqueda, lectura | Misma API; backend intercambiable |
| `citations/` | Formateo APA / Vancouver | + citeproc si hace falta |
| `calendar/` | Export ICS | Conservar |
| `utils/` | Fechas, formatos, archivos | Conservar |

La decisión **API monolito vs microservicio** está en [`docs/strategy/mvp-and-api-boundary.md`](../../docs/strategy/mvp-and-api-boundary.md).
