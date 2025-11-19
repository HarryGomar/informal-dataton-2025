export interface SectionIndexItem {
  id: string;
  anchor: string;
  eyebrow: string;
  title: string;
  summary: string;
}

export interface SectionPhase {
  id: string;
  title: string;
  kicker: string;
  anchor: string;
  navLabel: string;
  description: string;
  sections: SectionIndexItem[];
}

export const sectionPhases: SectionPhase[] = [
  {
    id: "panorama",
    title: "0 · Panorama",
    kicker: "¿Dónde estamos?",
    anchor: "intro",
  navLabel: "Panorama",
    description:
      "Presentamos el problema y las preguntas que guían toda la lectura: magnitud, impactos y posibles rutas de salida.",
    sections: [
      {
        id: "intro",
        anchor: "intro",
        eyebrow: "Sección 0",
        title: "Contexto y preguntas guía",
        summary: "Narrativa base, fuentes y expectativas para el recorrido completo.",
      },
      {
        id: "hero",
        anchor: "hero",
        eyebrow: "Hero",
        title: "El contexto inevitable",
        summary: "Declaración contundente del problema y credenciales del proyecto Datatón.",
      },
    ],
  },
  {
    id: "costos",
    title: "1 · Costos inmediatos",
    kicker: "Impacto económico",
    anchor: "costos",
  navLabel: "Costos",
    description:
      "Cuantificamos los daños fiscales, sociales y macro de la informalidad comercial antes de entrar al territorio.",
    sections: [
      {
        id: "costos",
        anchor: "costos",
        eyebrow: "2.1",
        title: "Costo integral anual",
        summary: "Tarjetas de recaudación, seguridad social y derrama económica perdida.",
      },
      {
        id: "fiscal-impact",
        anchor: "fiscal-impact",
        eyebrow: "2.2",
        title: "Balance fiscal",
        summary: "Scroll con ISR patronal/asalariado e IVA no cobrado.",
      },
      {
        id: "social-security",
        anchor: "social-security",
        eyebrow: "2.3",
        title: "Seguridad social pendiente",
        summary: "IMSS, INFONAVIT y pensiones con cálculos transparentes.",
      },
      {
        id: "gdp-spillover",
        anchor: "gdp-spillover",
        eyebrow: "2.4",
        title: "Derrama económica",
        summary: "Scroll que conecta valor agregado informal con puntos del PIB.",
      },
    ],
  },
  {
    id: "diagnostico",
    title: "2 · Diagnóstico profundo",
    kicker: "¿Dónde y por qué?",
    anchor: "geografia",
  navLabel: "Diagnóstico",
    description:
      "Pasamos del agregado nacional al mapa, la productividad y la historia institucional detrás de la persistencia.",
    sections: [
      {
        id: "geografia",
        anchor: "geografia",
        eyebrow: "3.0",
        title: "Mapa mayorista vs menudeo",
        summary: "Mapa sincronizado con barras de valor agregado por canal.",
      },
      {
        id: "productividad",
        anchor: "productividad",
        eyebrow: "4.0",
        title: "Brechas de productividad",
        summary: "Scroll con barras de empleo/valor agregado formal vs informal.",
      },
      {
        id: "competencia",
        anchor: "competencia",
        eyebrow: "5.0",
        title: "Competencia desleal",
        summary: "Explicación visual de cómo la informalidad resta 15% a la PTF formal.",
      },
      {
        id: "diagnostico",
        anchor: "diagnostico",
        eyebrow: "4.1",
        title: "Autopsia de políticas",
        summary: "Timeline con REPECOS, SARE, RIF y RESICO para explicar por qué fallaron.",
      },
      {
        id: "marco-teorico",
        anchor: "marco-teorico",
        eyebrow: "5.0",
        title: "Marco teórico",
        summary: "Explorador de literatura con factores de educación, género, empresa e instituciones.",
      },
    ],
  },
  {
    id: "datos",
    title: "3 · Ciencia de datos",
    kicker: "Modelos y perfiles",
    anchor: "predictive-model",
  navLabel: "Datos",
    description:
      "Conectamos microdatos, XGBoost y arquetipos territoriales para priorizar intervenciones.",
    sections: [
      {
        id: "predictive-model",
        anchor: "predictive-model",
        eyebrow: "6.0",
        title: "Modelo predictivo",
        summary: "Pipeline completo, validación rolling y explicabilidad SHAP.",
      },
      {
        id: "profiles",
        anchor: "profiles",
        eyebrow: "7.0",
        title: "Perfiles territoriales",
        summary: "Mascara municipal y mapa interactivo para tres arquetipos.",
      },
    ],
  },
  {
    id: "ruta",
    title: "4 · Ruta de formalización",
    kicker: "De diagnóstico a acción",
    anchor: "transition",
  navLabel: "Ruta",
    description:
      "Del paso intermedio (transition) a la Escalera Comercial, piloto y conclusiones accionables.",
    sections: [
      {
        id: "transition",
        anchor: "transition",
        eyebrow: "8.0",
        title: "Puente",
        summary: "Tarjeta que resume aprendizajes y abre la sección propositiva.",
      },
      {
        id: "proposal-intro",
        anchor: "proposal-intro",
        eyebrow: "9.0",
        title: "Escalera Comercial",
        summary: "Introducción con pilares y lógica de beneficios escalonados.",
      },
      {
        id: "proposal-ladder",
        anchor: "proposal-ladder",
        eyebrow: "9.1",
        title: "Peldaños",
        summary: "Scroll interactivo que explica cada nivel de acompañamiento.",
      },
      {
        id: "proposal-architecture",
        anchor: "proposal-architecture",
        eyebrow: "9.2",
        title: "Arquitectura institucional",
        summary: "Diagrama de roles + timeline de implementación.",
      },
      {
        id: "implementation",
        anchor: "implementation",
        eyebrow: "10.0",
        title: "Piloto experimental",
        summary: "RCT propuesto con métricas, escala y gobernanza.",
      },
      {
        id: "conclusion",
        anchor: "conclusion",
        eyebrow: "11.0",
        title: "Cierre y llamado",
        summary: "Resumen de aprendizajes y CTA a instituciones.",
      },
    ],
  },
];
