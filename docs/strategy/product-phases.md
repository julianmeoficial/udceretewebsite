# Fases de producto

Roadmap orientativo. Las fechas las define el feedback UX y la capacidad del equipo; este doc fija el **orden** de inversión.

```
Fase 0          Fase 1            Fase 2              Fase 3
MVP UX    →   Web estable   →   Apps (diseño)   →   Apps (build)
(ahora)       CMS + auth        contratos API       clientes nativos
```

## Fase 0 — MVP de UX *(actual)*

- Validar tareas reales de estudiantes y staff
- Identidad editorial y navegación
- CMS JSON + auth demo solo para demos
- Documentar keep/discard y frontera API (diferida)

**Salida:** hallazgos UX priorizados; lista de pantallas a recrear.

## Fase 1 — Web estable

- CMS real + persistencia concurrente
- Auth institucional
- Sustituir piezas `@mvp` (comentarios, acceso, pills, etc.)
- Dominio detrás de puertos/adaptadores
- Búsqueda / IA solo si hay proveedor y fuentes reales

**Salida:** portal en producción; OpenAPI *borrador* opcional si ya se vislumbran apps.

## Fase 2 — Diseño de apps

- Alcance: ¿lectura? ¿trámites? ¿notificaciones? ¿offline?
- Auth mobile vs web
- Mapa de endpoints vs pantallas
- **Reabrir** [ADR-0001](../decisions/0001-api-boundary-deferred.md) con el checklist de [estrategia API](./mvp-and-api-boundary.md)

**Salida:** decisión A/B/C actualizada; contratos; no necesariamente el servicio desplegado.

## Fase 3 — Build de apps

- Implementar API según ADR (Route Handlers o microservicio)
- Clientes iOS/Android (o PWA reforzada si el alcance lo permite)
- Observabilidad y versionado de API

**Salida:** al menos un cliente adicional consumiendo el mismo dominio.

---

No saltar de Fase 0 a Fase 3. El valor de este MVP es **reducir incertidumbre de producto** antes de pagar complejidad de plataforma.
