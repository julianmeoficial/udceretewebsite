import type { Post } from "./types";

/**
 * Contenido representativo del blog oficial:
 * https://ctcerete.blogspot.com/
 * Adaptado a HTML legible para el MVP (sin emojis de título).
 */
export const posts: Post[] = [
  {
    slug: "seminario-opcion-de-grado",
    title: "Seminario opción de grado",
    excerpt:
      "Citación el sábado 1 de agosto a las 11:00 a.m. en la biblioteca para estudiantes de X semestre y quienes ya terminaron académicamente.",
    body: `<p>Apreciados estudiantes del Centro Tutorial Cereté:</p>
<p>Se cita este <strong>sábado 01 de agosto a las 11:00 a.m.</strong> en la biblioteca a los estudiantes de <strong>X semestre</strong> de los programas Administración Financiera, Administración de Empresas, Administración Pública y a aquellos que terminaron académicamente y no les han generado recibos de seminario de grado o tienen la fecha vencida.</p>
<h2>Qué debes tener presente</h2>
<ul>
<li>Asiste con documento de identidad vigente</li>
<li>Lleva avance o inquietudes sobre tu opción de grado</li>
<li>La sesión orienta requisitos, cronograma y lineamientos del centro</li>
</ul>
<p>Fuente: aviso publicado en el blog del Centro Tutorial Cereté.</p>`,
    category: "Académico",
    tags: ["2026-2"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-29",
    coverImage: "/images/posts/biblioteca.jpg",
    featured: false,
  },
  {
    slug: "horario-calendario-academico-2026-2",
    title: "Horario y calendario académico 2026-2",
    excerpt:
      "Inicio de tutorías: 31 de julio para SST y Tecnología Agroindustrial; 1 de agosto para los demás programas.",
    body: `<p>Buen día, apreciados estudiantes:</p>
<p>Ya está disponible la información de <strong>horario y calendario académico 2026-2</strong> del Centro Tutorial Cereté, Universidad de Cartagena.</p>
<h2>Inicio de tutorías</h2>
<ul>
<li><strong>Seguridad y Salud en el Trabajo</strong> y <strong>Tecnología Agroindustrial:</strong> 31 de julio</li>
<li><strong>Demás programas:</strong> 01 de agosto</li>
</ul>
<p>Consulta también la sección <a href="/calendario">Calendario académico</a> de este portal para exportar fechas clave del semestre.</p>`,
    category: "Académico",
    tags: ["2026-2", "calendario"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-25",
    coverImage: "/images/posts/calendario.jpg",
    featured: true,
  },
  {
    slug: "solicitud-financiacion-matricula-2026-2",
    title: "Solicitud de financiación matrícula 2026-2",
    excerpt:
      "Proceso activo solo para quienes no les aplicó matrícula cero. Financiación hasta matrículas extraordinarias (24 de julio) por plataforma SMA.",
    body: `<p>Apreciados estudiantes:</p>
<p>Este proceso es <strong>solo</strong> para quienes no les aplicó matrícula cero. La financiación se realiza con el valor de la matrícula extraordinaria, hasta la fecha de matrículas extraordinarias (<strong>24 de julio</strong>).</p>
<h2>Quiénes no pueden realizar el proceso</h2>
<ul>
<li>Estudiantes de 10.º semestre de todos los programas</li>
<li>Estudiantes de 4.º, 5.º, 7.º y 8.º de Administración Pública</li>
</ul>
<h2>Paso a paso en SMA</h2>
<ol>
<li>Actualizar → Estudiantes → Solicitud de financiación</li>
<li>Clic en la lupa y seleccionar la factura <em>Matrícula 2026 periodo 2</em></li>
<li>Clic en Plan → seleccionar plan de financiación → ver detalles (cuota inicial)</li>
<li>Guardar → Aceptar → seleccionar el pagaré e imprimirlo</li>
</ol>
<p>Completa el pagaré según instructivo institucional y conserva el soporte del trámite.</p>`,
    category: "Trámites",
    tags: ["matrícula", "SMA"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-17",
    coverImage: "/images/posts/tramites.jpg",
  },
  {
    slug: "kiosko-virtual-autoatencion",
    title: "Lanzamiento Kiosko Virtual de Autoatención",
    excerpt:
      "En cada Centro Tutorial se instalará un kiosko con acceso por código QR a trámites y servicios institucionales.",
    body: `<p>Como parte de la estrategia de acercar los servicios institucionales a la comunidad universitaria, se instalará en cada Centro Tutorial un <strong>kiosko de autoatención</strong>, a través del cual los usuarios podrán acceder al Kiosko Virtual mediante código QR.</p>
<p>La iniciativa busca facilitar el acceso oportuno a trámites y servicios, fortaleciendo una atención más cercana y digital. Desde la Sección de Atención al Ciudadano se compartió la pieza gráfica oficial del Kiosko Virtual de Autoatención.</p>
<h2>Qué habilita</h2>
<ul>
<li>Consulta y orientación de trámites frecuentes</li>
<li>Atención guiada en el centro tutorial</li>
<li>Canal digital complementario a ventanilla presencial</li>
</ul>`,
    category: "Institucional",
    tags: ["2026-2"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-17",
    coverImage: "/images/posts/digital.jpg",
  },
  {
    slug: "legalizacion-matricula-2026-2",
    title: "Legalización de matrícula 2026-2",
    excerpt:
      "Del 17 al 29 de julio: envía carné, certificado EPS y recibo de pago en un solo PDF desde tu correo institucional.",
    body: `<p>Según el <strong>Acuerdo N.º 46-26 de mayo 2026</strong> y la <strong>Resolución N.º 13</strong>, apreciados estudiantes que en 2026-2 cursarán de II semestre en adelante:</p>
<p>Del <strong>17 al 29 de julio</strong> se reciben documentos para legalización de matrícula académica.</p>
<h2>Documentos (un solo PDF, en este orden)</h2>
<ol>
<li>Carné estudiantil</li>
<li>Certificado de EPS vigente (no mayor a 2 meses; no se acepta ADRES)</li>
<li>Recibo de pago de matrícula 2026-2 cancelada</li>
</ol>
<p>En el asunto del correo debes colocar exactamente: <strong>AUTORIZACIÓN MATRÍCULA 2026-2</strong>. Solo se aceptan envíos desde correos institucionales (<code>@unicartagena.edu.co</code>).</p>
<p>Contactos de referencia del aviso original: Ingeniería y Administración Financiera — Icela López (<code>ilopezh@unicartagena.edu.co</code>); Administración de Servicios de Salud (IV a X) — Nelly García.</p>`,
    category: "Trámites",
    tags: ["matrícula", "2026-2"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-16",
    coverImage: "/images/posts/documentos.jpg",
  },
  {
    slug: "descuento-cooperacion-vida-universitaria-2026-2",
    title: "Descuento por cooperación a la vida universitaria 2026-2",
    excerpt:
      "Para estudiantes sin matrícula cero. Al finalizar, envía captura a descuentoporcooperacion@unicartagena.edu.co.",
    body: `<p>Apreciados estudiantes:</p>
<p>El descuento por cooperación a la vida universitaria está dirigido a quienes <strong>no les aplicó matrícula cero</strong>.</p>
<p>Una vez finalizado el proceso deben enviar captura al correo <code>descuentoporcooperacion@unicartagena.edu.co</code>.</p>
<p>Dudas: Bienestar Universitario — Viviana Anichiario (<code>vanichiaricog@unicartagena.edu.co</code>, 300 827 1809).</p>`,
    category: "Beneficios",
    tags: ["matrícula"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-14",
    coverImage: "/images/posts/estudiantes.jpg",
  },
  {
    slug: "pensum-programas",
    title: "Pensum de programas",
    excerpt:
      "Consulta y descarga la malla curricular de los programas del Centro Tutorial Cereté.",
    body: `<p>Se publica el material de pensum de los programas adscritos al Centro Tutorial Cereté de la Universidad de Cartagena.</p>
<ul>
<li>Administración Financiera</li>
<li>Seguridad y Salud en el Trabajo</li>
<li>Tecnología Agroindustrial</li>
<li>Demás programas ofertados en el centro</li>
</ul>
<p>Revisa los documentos en <a href="/recursos">Recursos</a> o solicítalos en registro y control del centro.</p>`,
    category: "Recursos",
    tags: ["2026-2"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-11",
    coverImage: "/images/posts/libros.jpg",
  },
  {
    slug: "homologacion-cursos-libres-2026-2",
    title: "Homologación cursos libres 2026-2",
    excerpt:
      "Hasta el 28 de julio: homologa con cursos virtuales SENA (≥40 h) o Coursera. Envío a ilopezh@unicartagena.edu.co.",
    body: `<p>Apreciados estudiantes:</p>
<p>Si para el semestre 2026-2 deseas homologar los cursos libres de tu plan gráfico, puedes hacerlo con cursos virtuales del <strong>SENA</strong> (recepción hasta el <strong>28 de julio</strong>) o con cursos de Coursera.</p>
<h2>Requisitos</h2>
<ul>
<li>Dos certificados SENA virtual de al menos 40 horas cada uno (homologan 1 curso libre), <em>o</em> dos cursos de Coursera</li>
<li>Deben corresponder al año en que comenzaste a estudiar en la universidad</li>
<li>El curso libre a homologar <strong>no</strong> debe estar matriculado; si ya lo matriculan, solicita eliminación</li>
</ul>
<p>Envía los certificados a <code>ilopezh@unicartagena.edu.co</code>.</p>`,
    category: "Académico",
    tags: ["homologación", "2026-2"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-11",
    coverImage: "/images/posts/estudio.jpg",
  },
  {
    slug: "habilitaciones-2026-1",
    title: "Habilitaciones 2026-1 — horario y paso a paso",
    excerpt:
      "SST y Tecnología Agroindustrial: 3 de julio; demás programas: 4 de julio. Solicitud por SMA del 1 al 3 de julio.",
    body: `<p>Apreciado estudiante:</p>
<p>Habilitaciones: <strong>Seguridad y Salud en el Trabajo</strong> y <strong>Tecnología Agroindustrial</strong> el 03 de julio; demás programas el 04 de julio. La solicitud en SMA puede realizarse del <strong>01 al 03 de julio</strong>.</p>
<h2>Condiciones</h2>
<ul>
<li>Solo si pierdes 1 o 2 materias</li>
<li>Si pierdes 3 (incluyendo inglés) no puedes habilitar: debes repetir en 2026-2</li>
<li>La nota de la materia debe estar entre 2.0 y 2.99</li>
<li>La asignatura debe ser habilitable; <strong>inglés no se habilita</strong></li>
</ul>
<p>La nota obtenida en la habilitación será la definitiva de la materia. Consulta también el listado de asignaturas no habilitables.</p>`,
    category: "Académico",
    tags: ["habilitaciones", "SMA"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-07-01",
    coverImage: "/images/posts/aula.jpg",
  },
  {
    slug: "asignaturas-no-habilitables-2026-1",
    title: "Asignaturas no habilitables por programa 2026-1",
    excerpt:
      "Antes de solicitar habilitación, verifica que tu asignatura esté permitida según el programa y periodo.",
    body: `<p>Antes de solicitar una habilitación en SMA, verifica que la asignatura esté permitida para tu programa en el periodo 2026-1.</p>
<p>El listado completo se publica en el blog del Centro Tutorial Cereté y como documento de apoyo en <a href="/recursos">Recursos</a>. Asignaturas de práctica, opción de grado e inglés suelen tener restricciones adicionales.</p>`,
    category: "Académico",
    tags: ["habilitaciones"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-06-25",
    coverImage: "/images/posts/notas.jpg",
  },
  {
    slug: "factura-semestre-2026-2",
    title: "Factura semestre 2026-2",
    excerpt:
      "Facturas disponibles en SMA. Ordinario: 22 de julio. Extraordinario: 23–24 de julio. Matrícula cero: paga la factura de $47.151.",
    body: `<p>Apreciada comunidad udeceísta:</p>
<p>Estudiantes de 2.º semestre en adelante ya cuentan con su factura 2026-2 en la plataforma <strong>SMA</strong>.</p>
<ul>
<li><strong>Pago ordinario:</strong> 22 de julio de 2026</li>
<li><strong>Pago extraordinario:</strong> 23 y 24 de julio de 2026</li>
</ul>
<p>Descarga: SMA → Reporte → Comprobante generado → Matrícula 2026 periodo 2.</p>
<p>Quienes aplican matrícula cero reciben dos facturas: deben descargar, pagar y subir la de <strong>$47.151</strong>; la otra la asume el gobierno al final del semestre.</p>
<p>Si aún no tienes factura, escribe a <code>jmartinezf2@unicartagena.edu.co</code> con código y nombres completos.</p>`,
    category: "Trámites",
    tags: ["matrícula", "SMA"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-06-23",
    coverImage: "/images/posts/tramites.jpg",
  },
  {
    slug: "horario-supletorios-2026-1",
    title: "Horario de supletorios 2026-1 y pasos en SMA",
    excerpt:
      "Solicita el supletorio en SMA, cancela la factura ($63.282) y entrega el comprobante a tu tutor.",
    body: `<p>Apreciados estudiantes:</p>
<p>El supletorio es para quienes, por justificación válida, no pudieron presentar su parcial.</p>
<h2>Solicitud en SMA</h2>
<ol>
<li>Actualizar → Estudiantes → Solicitud de supletorio</li>
<li>Seleccionar la asignatura, opción de cuarto parcial y Guardar</li>
<li>Descargar factura en Reporte → Comprobante generado ($63.282)</li>
</ol>
<p>Paga solo en los bancos indicados en la factura. Entrega el comprobante cancelado a cada tutor; sin pago no se sube la nota ni se presenta el supletorio.</p>`,
    category: "Académico",
    tags: ["SMA", "2026-2"],
    author: "Centro Tutorial Cereté",
    publishedAt: "2026-06-20",
    coverImage: "/images/posts/reunion.jpg",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): Post {
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return posts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return [...new Set(posts.map((post) => post.category))];
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((post) => post.category === category);
}

export function sortPostsByDate(items: Post[]): Post[] {
  return [...items].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
