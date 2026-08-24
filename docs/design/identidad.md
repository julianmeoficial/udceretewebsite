# Identidad de producto

## Qué es

Portal digital académico y blog editorial del **Centro Tutorial Cereté — Universidad de Cartagena**.

El producto debe sentirse:

- **Institucional** — confianza y pertenencia a la universidad
- **Editorial** — lectura cómoda, jerarquía clara, contenido útil
- **Útil** — orientado a tareas reales del estudiante
- **Accesible** — legible, navegable, respetuoso del ancho de banda
- **Calmo y moderno** — sin ruido visual ni adornos vacíos

No es un landing de startup, un dashboard genérico ni una plantilla SaaS.

---

## Audiencia

- Estudiantes del centro tutorial que buscan avisos, fechas, recursos y apoyo
- Personal administrativo que valida flujos de edición en el panel demo

---

## Principios de diseño

1. **Claridad antes que decoración** — tipografía, espaciado y alineación crean jerarquía; los contenedores solo envuelven entidades reales (artículos, eventos, recursos, formularios, alertas).
2. **Tareas reales** — cada pantalla responde a una necesidad concreta: leer un aviso, consultar el calendario, descargar una guía, generar una cita, localizar bienestar.
3. **Lectura editorial** — artículos con ancho máximo de `680px`, ritmo vertical generoso, metadatos legibles.
4. **Mobile-first** — el móvil es el breakpoint principal; los layouts responden, no se escalan desde escritorio.
5. **Bajo ancho de banda** — patrones ligeros, sin animaciones pesadas ni assets innecesarios.
6. **Una acción principal por pantalla** — evitar competencia visual entre CTAs.
7. **Copy en español** — todo el texto público del sitio.

---

## Jerarquía visual

La relación dominante del sistema es:

- **Oro (`--brand-gold`)** — acento institucional, estados activos, énfasis editorial
- **Night (`--brand-night`)** — tipografía, contraste, estructura y énfasis

Los colores secundarios de marca (plum, teal, coral, amber) se usan con moderación para categorías, estados o acentos puntuales. Ver [colores.md](./colores.md).

---

## Reglas anti-interfaz genérica

Evitar:

- Glassmorphism, gradientes neón, blobs 3D flotantes
- Tarjetas alrededor de cada bloque de texto
- Contenedores circulares para iconos decorativos
- Pills en exceso, badges innecesarios, sombras pesadas
- Hero gigante con poco contenido útil
- Grids de “features” con copy de marketing vacío
- Ilustraciones sin valor informativo
- Lenguaje visual de dashboard con métricas falsas

Preferir:

- Composiciones planas con bordes finos y alineación clara
- Espacio en blanco y jerarquía tipográfica antes de añadir cajas
- Sombras solo cuando la elevación aporta significado
- Marcos circulares solo para avatares u otro contenido naturalmente circular

---

## Estado del MVP

Este producto valida UX, navegación y flujos editoriales. La persistencia (CMS JSON) y la autenticación (cookie demo) **no son de producción**. La identidad visual y los principios anteriores sí son reutilizables al pasar a producción.
