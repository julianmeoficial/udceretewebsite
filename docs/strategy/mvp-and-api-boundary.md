# Estrategia del MVP y frontera API

> **Audiencia:** producto, diseño y desarrollo.  
> **Objetivo:** orientar la validación UX actual y dejar criterios claros para decidir, más adelante, si la API vive **dentro** del sitio (Next.js) o como **microservicio** aparte — sin adelantar las apps.

**Estado:** vigente para el MVP · decisión API **diferida** ([ADR-0001](../decisions/0001-api-boundary-deferred.md))

---

## 1. Qué es (y qué no es) este MVP

Este repositorio es un **prototipo de producto** para validar:

- Navegación y hallazgos de contenido académico
- Lectura editorial y archivo
- Calendario, recursos, bienestar, citas
- Flujos del panel editorial (CRUD simulado)
- Identidad visual institucional (tokens, tipografía, jerarquía)

**No** es la arquitectura de producción. No asume apps móviles, PWA ni un backend concurrente.

La persistencia actual (`src/data/cms/*.json` + cookie de sesión demo) existe solo para demos de UX. El dominio útil está en `src/data/types.ts` y en `src/lib/**` (capas documentadas).

---

## 2. Principio rector: dominio primero, transporte después

Hasta que existan **apps** (o un segundo cliente HTTP claro), el coste de un microservicio supera el beneficio.

```
┌─────────────────────────────────────────────────────────┐
│  Hoy (MVP)                                              │
│  Next.js = UI + Server Actions + CMS JSON + auth demo   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼  feedback UX + diseño de apps
┌─────────────────────────────────────────────────────────┐
│  Siguiente paso recomendado                             │
│  Extraer / endurecer el DOMINIO (tipos, reglas, ports)  │
│  sin obligar aún a un proceso API separado              │
└─────────────────────────────────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
     Monolito modular          Microservicio API
     (Next + domain)           (Hono/… + clients)
```

La pregunta correcta no es “¿API sí o no?” sino:

> ¿Cuántos **clientes** necesitan el mismo contrato HTTP, con qué **autonomía de despliegue** y con qué **equipo**?

---

## 3. Opciones de arquitectura (para decidir más tarde)

### Opción A — Monolito modular (Next.js unificado)

La lógica de negocio vive en el mismo repo/deploy que la web.

| Pros | Contras |
|------|---------|
| Un solo despliegue, menos ops | Apps nativas dependen del ciclo de la web |
| Server Actions / Route Handlers simples | Escala de equipo acoplada |
| Ideal mientras solo exista la web (+ PWA) | Extraer API después tiene coste de frontera |

**Encaja si:** tras el MVP, el producto prioritario sigue siendo el portal web (y quizá PWA), y las apps aún no tienen fecha firme.

### Opción B — Microservicio API + website como cliente

API dedicada (p. ej. Hono) con OpenAPI; Next.js solo presenta UI.

| Pros | Contras |
|------|---------|
| Contrato estable para web + apps + integraciones | Dos (o más) deploys, auth, observabilidad |
| Equipos pueden avanzar en paralelo | Riesgo de over-engineering si solo hay un cliente |
| Versionado de API explícito | Duplicación temporal durante la extracción |

**Encaja si:** hay (o habrá pronto) **apps iOS/Android**, terceros, o requisitos de SLA/escala distintos a la web.

### Opción C — Monolito modular ahora → extraer API cuando haya segundo cliente *(recomendada)*

1. **Ahora:** validar UX; limpiar dominio; marcar `@mvp`.
2. **Tras UX:** CMS/auth reales; puertos/adaptadores (`cms/read` → BD).
3. **Cuando exista diseño de apps o un segundo cliente:** publicar HTTP (OpenAPI) desde el dominio ya estable — como módulo en el mismo monorepo o como servicio aparte.

Minimiza trabajo desechable y evita decidir la frontera sin datos de producto.

---

## 4. Criterios de decisión (checklist)

Revisar esta lista **cuando** exista alcance de apps (pantallas, auth, offline, notificaciones) o un segundo consumidor.

| Señal | Inclina a monolito (A/C) | Inclina a API separada (B) |
|-------|--------------------------|----------------------------|
| Clientes HTTP | Solo web / PWA | Web + apps nativas + otros |
| Equipo | 1–2 personas full-stack | Backend y mobile en paralelo |
| Cadencia de release | Web y API siempre juntos | Apps no pueden esperar a la web |
| Dominio | CRUD editorial acotado | Reglas complejas, colas, IA, integraciones SMA |
| Ops | Un entorno Vercel (o similar) | Necesidad de escalar API aparte |
| Auth | Sesión web cookie / Magic Link | Tokens mobile, refresh, SSO compartido |

**Regla práctica:** si al diseñar apps solo necesitáis **lectura pública + pocos endpoints autenticados**, se puede empezar con Route Handlers en Next y extraer después. Si las apps requieren **offline, push, sync y auth mobile-first**, conviene planear API (B) desde el diseño de contratos — no necesariamente desplegarla el día 1.

---

## 5. Qué preparar ya (sin elegir A o B)

Trabajo de bajo arrepentimiento, alineado con este repo:

1. **Mantener tipos de dominio estables** (`src/data/types.ts`).
2. **Tratar `src/lib/cms/*` como puerto** — la UI no debe acoplarse al JSON.
3. **Documentar permisos** (`canAccessSection`, roles) como contrato de autorización.
4. **No inventar IA/API demo** otra vez; cuando llegue, con proveedor real y fuentes.
5. **Evitar lógica de negocio en componentes** — orquestar en `lib/` o server actions delgadas.
6. Cuando haya apps: redactar un **borrador OpenAPI** de recursos (`posts`, `events`, `resources`, `wellbeing`) *antes* de clonar pantallas.

Eso permite tanto A como B sin reescribir el producto.

---

## 6. Relación con apps (aún por diseñar)

Las apps **no** deben dictar la arquitectura del MVP, pero el MVP **sí** debe dejar un dominio limpio para no pintar a las apps en una esquina.

Supuestos seguros hoy:

- El contenido público (avisos, calendario, recursos) será el núcleo compartido.
- Auth institucional será distinto en web (cookie / Magic Link) y en mobile (tokens).
- El panel admin probablemente **siga siendo web**, no app nativa en v1.

Hasta tener wireframes y alcance de apps, **no** crear el microservicio “por si acaso”.

Ver también: [Fases de producto](./product-phases.md).

---

## 7. Recomendación explícita (hoy)

| Pregunta | Respuesta |
|----------|-----------|
| ¿Creamos microservicio API ahora? | **No.** |
| ¿Acoplamos para siempre la lógica a Next? | **No.** Extraemos dominio y puertos. |
| ¿Estrategia por defecto? | **Opción C** — monolito modular → decidir extracción con evidencia de apps. |
| ¿Cuándo reabrir ADR-0001? | Cuando exista alcance de apps **o** un segundo cliente HTTP real. |

---

## Referencias internas

- [Vista de arquitectura](../architecture/overview.md)
- [Conservar vs descartar](../architecture/keep-vs-discard.md)
- [ADR-0001](../decisions/0001-api-boundary-deferred.md)
- [CONTRIBUTING](../../CONTRIBUTING.md)
