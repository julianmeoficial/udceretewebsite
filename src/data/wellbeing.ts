import type { SupportRoute, Testimonial } from "./types";

export const supportRoutes: SupportRoute[] = [
  {
    id: "wellbeing",
    title: "Bienestar universitario",
    description:
      "Coordinación de bienestar, descuentos por cooperación y orientación general para estudiantes.",
    contact: "vanichiaricog@unicartagena.edu.co",
    contactName: "Viviana Anichiario",
    schedule: "Lunes a viernes, 8:00 a.m. – 5:00 p.m.",
  },
  {
    id: "psy",
    title: "Atención psicológica",
    description:
      "Acompañamiento individual para estrés académico, ansiedad y orientación emocional.",
    contact: "psicologia@unicartagena.edu.co",
    schedule: "Lunes a viernes, 8:00 a.m. – 12:00 m. y 2:00 – 5:00 p.m.",
  },
  {
    id: "health",
    title: "Salud y promoción",
    description:
      "Campañas de prevención, orientación en hábitos saludables y remisión a IPS aliadas.",
    contact: "salud.cerete@unicartagena.edu.co",
    schedule: "Martes y jueves, 9:00 a.m. – 4:00 p.m.",
  },
  {
    id: "guidance",
    title: "Orientación estudiantil",
    description:
      "Apoyo en trámites, adaptación a la modalidad tutorial y rutas de permanencia.",
    contact: "orientacion.cerete@unicartagena.edu.co",
    schedule: "Lunes a viernes, 8:00 a.m. – 5:00 p.m.",
  },
];

export const alertTopics = [
  { value: "emocional", label: "Situación emocional" },
  { value: "academica", label: "Dificultad académica" },
  { value: "seguridad", label: "Seguridad / riesgo" },
  { value: "otro", label: "Otro" },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Pude agendar una cita de bienestar sin perder el día de tutorías. Me ayudó a organizar el semestre.",
    author: "Camila R.",
    program: "Administración Financiera",
  },
  {
    id: "t2",
    quote:
      "La ruta de orientación me clarificó el proceso de homologación y me ahorró idas innecesarias.",
    author: "Andrés M.",
    program: "Seguridad y Salud en el Trabajo",
  },
];
