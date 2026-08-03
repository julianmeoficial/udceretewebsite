# ADR-0001 — Frontera API: monolito vs microservicio

- **Estado:** Diferida  
- **Fecha:** 2026-08-03  
- **Decisión relacionada:** [Estrategia MVP y frontera API](../strategy/mvp-and-api-boundary.md)

## Contexto

El portal MVP concentra UI, server actions y persistencia JSON en un solo proyecto Next.js. A medio plazo se contemplan:

- Web estable con CMS y auth reales
- Posibles apps móviles (aún **sin diseño ni alcance**)
- Posible asistente con fuentes / integraciones institucionales

Forzar ahora un microservicio API implicaría coste operativo y contratos HTTP sin segundo cliente. Acoplar para siempre la lógica solo a Next dificultaría las apps.

## Decisión (hoy)

**No crear microservicio API en esta fase.**

Adoptar temporalmente un **monolito modular**:

- Dominio y puertos en `src/lib/**` y `src/data/types.ts`
- Persistencia intercambiable detrás de `lib/cms`
- Sin HTTP público de dominio hasta que exista evidencia de segundo cliente

La elección definitiva entre:

- **A** — seguir unificado en Next (Route Handlers / Server Actions), o  
- **B** — extraer API (p. ej. Hono)  

se tomará en **Fase 2** (diseño de apps) o cuando aparezca otro consumidor HTTP, usando el checklist del documento de estrategia.

## Consecuencias

### Positivas

- Menos infraestructura desechable durante la validación UX
- Dominio documentado y movible a A o B
- Equipo pequeño puede iterar en un solo repo

### Negativas / riesgos

- Si las apps se adelantan sin reabrir este ADR, habrá presión por endpoints ad hoc
- Habrá un coste de extracción si se elige B más adelante (aceptable si el dominio está limpio)

## Alternativas consideradas

| Alternativa | Por qué no ahora |
|-------------|------------------|
| Microservicio desde el día 1 | Sin apps diseñadas; over-engineering |
| “Solo Next para siempre” | Cierra mal la puerta a clientes nativos |
| BFF aparte + CMS aparte + API | Demasiadas piezas antes del product-market fit institucional |

## Cuándo reabrir

- Existe alcance y wireframes de apps, **o**
- Aparece un segundo cliente HTTP (integración, widget, partner), **o**
- El equipo backend se separa del de la web con cadencias distintas

Al reabrir: actualizar estado de este ADR, añadir ADR-0002 con la elección A o B, y anotar en el CHANGELOG.
