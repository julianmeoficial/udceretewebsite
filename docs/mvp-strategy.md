# Estrategia del MVP y frontera API

Documento de trabajo del MVP. La documentación oficial del sitio en producción se creará en esa fase.

**Decisión hoy:** no crear microservicio API. Mantener monolito modular (dominio en `src/lib`) y decidir la frontera HTTP cuando existan apps o un segundo cliente.

---

## Qué valida este MVP

- Navegación, lectura editorial, calendario, recursos, bienestar, citas
- Flujos del panel admin (CMS JSON + auth demo)
- Identidad visual institucional

No es arquitectura de producción. Persistencia y auth actuales son solo para demos UX. Lo reutilizable: `src/data/types.ts` y `src/lib/**`.

---

## Opciones (para más adelante)

| Opción | Idea | Cuándo |
|--------|------|--------|
| **A** Monolito Next | UI + Server Actions / Route Handlers | Solo web (o PWA) |
| **B** API aparte | Microservicio + web/apps como clientes | Apps nativas u otros consumidores HTTP |
| **C** Modular → extraer *(recomendada)* | Dominio limpio ahora; HTTP cuando haya 2.º cliente | Default hasta diseñar apps |

## Checklist para reabrir la decisión

Inclina a **API separada** si: hay apps nativas, equipos en paralelo, releases desacoplados, auth mobile (tokens), o integraciones con SLA distinto.

Inclina a **seguir en Next** si: un solo cliente web, equipo pequeño, dominio CRUD acotado.

## Qué preparar sin elegir aún

1. Tipos de dominio estables (`types.ts`)
2. `lib/cms` como puerto (UI no acoplada al JSON)
3. Lógica de negocio fuera de componentes
4. No reintroducir IA/API demo falsa
5. Cuando haya alcance de apps: borrador de contratos *antes* de clonar pantallas

## Fases (orden, no calendario)

1. **MVP UX** (ahora) → hallazgos
2. **Web estable** → CMS/auth reales, quitar `@mvp`
3. **Diseño de apps** → reabrir esta decisión con el checklist
4. **Build de apps** → API según lo decidido

Hasta la fase 3, no crear el microservicio “por si acaso”.
