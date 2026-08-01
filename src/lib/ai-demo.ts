export type AiSource = {
  label: string;
  href: string;
};

export type AiAnswer = {
  body: string;
  sources: AiSource[];
  suggested: string[];
};

export const AI_DAILY_LIMIT = 10;

const answers: Array<{ keywords: string[]; answer: AiAnswer }> = [
  {
    keywords: ["matricula", "matrículas", "matriculas", "abren", "ordinaria", "legalizacion"],
    answer: {
      body:
        "El proceso de legalización de matrículas ordinarias para periodo 2026-2 está programado del 17 al 29 de julio de 2026. Después de esa fecha aplica la matrícula extraordinaria con recargo. Puedes formalizar el proceso desde la plataforma institucional con tu correo activo.",
      sources: [
        { label: "Guía de matrícula 2026-2", href: "/archivo" },
        { label: "Calendario académico", href: "/calendario" },
        { label: "Legalización de matrícula", href: "/articulos/legalizacion-matricula-2026-2" },
      ],
      suggested: [
        "¿Qué documentos necesito para reingreso?",
        "¿Hay matrícula extraordinaria?",
        "¿Dónde pago la matrícula?",
      ],
    },
  },
  {
    keywords: ["reingreso", "documentos", "reingresar"],
    answer: {
      body:
        "Para reingreso debes radicar solicitud en SMA, adjuntar certificado de notas, carta de motivos y documento de identidad. El Centro Tutorial Cereté orienta el trámite en registro y control.",
      sources: [
        { label: "Repositorio de recursos", href: "/recursos" },
        { label: "Contacto", href: "/acceso" },
      ],
      suggested: [
        "¿Cuándo abren las matrículas?",
        "¿Hay matrícula extraordinaria?",
        "¿Dónde pago la matrícula?",
      ],
    },
  },
  {
    keywords: ["extraordinaria", "recargo", "extraordinario"],
    answer: {
      body:
        "La matrícula extraordinaria 2026-2 se realiza los días 23 y 24 de julio de 2026, con recargo según el calendario institucional. Consulta tu factura en SMA antes de pagar.",
      sources: [
        { label: "Factura semestre 2026-2", href: "/articulos/factura-semestre-2026-2" },
        { label: "Calendario académico", href: "/calendario" },
      ],
      suggested: [
        "¿Dónde pago la matrícula?",
        "¿Qué documentos necesito para reingreso?",
      ],
    },
  },
  {
    keywords: ["pago", "pagar", "factura", "banco", "sma"],
    answer: {
      body:
        "Descarga tu factura en SMA → Reporte → Comprobante generado → Matrícula 2026 periodo 2. Paga solo en los bancos indicados en la factura y conserva el comprobante para legalización.",
      sources: [
        { label: "Factura semestre 2026-2", href: "/articulos/factura-semestre-2026-2" },
        { label: "SMA", href: "https://sma.unicartagena.edu.co:8443/Smaix12/vista/mainMenu.jsp" },
      ],
      suggested: [
        "¿Cuándo abren las matrículas?",
        "¿Hay matrícula extraordinaria?",
      ],
    },
  },
];

const defaultAnswer: AiAnswer = {
  body:
    "No encontré una respuesta exacta en el catálogo demo. Prueba con «matrícula», «calendario» o «habilitaciones», o usa la búsqueda en el sitio para ver artículos y recursos.",
  sources: [
    { label: "Blog del centro", href: "/archivo" },
    { label: "Recursos", href: "/recursos" },
  ],
  suggested: [
    "¿Cuándo abren las matrículas?",
    "¿Qué documentos necesito para reingreso?",
    "¿Dónde pago la matrícula?",
  ],
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function resolveAiAnswer(query: string): AiAnswer {
  const normalized = normalize(query.trim());
  if (!normalized) return defaultAnswer;

  for (const entry of answers) {
    if (entry.keywords.some((keyword) => normalized.includes(normalize(keyword)))) {
      return entry.answer;
    }
  }

  return defaultAnswer;
}

const USAGE_KEY = "udc-ai-usage";

export function getAiUsageCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = sessionStorage.getItem(USAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { date: string; count: number };
    const today = new Date().toISOString().slice(0, 10);
    if (parsed.date !== today) return 0;
    return parsed.count;
  } catch {
    return 0;
  }
}

export function incrementAiUsage(): number {
  const today = new Date().toISOString().slice(0, 10);
  const current = getAiUsageCount();
  const next = current + 1;
  sessionStorage.setItem(USAGE_KEY, JSON.stringify({ date: today, count: next }));
  return next;
}
