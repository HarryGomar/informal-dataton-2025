
import type { ProfileLayerId } from "../types/geography";

export interface ProfileLogic {
  mask: string[];
  dataSignals: string[];
  interpretation: string;
}

export interface Profile {
  id: ProfileLayerId;
  title: string;
  icon: "care" | "micro" | "desalentados";
  headline: string;
  triangleHook: string;
  shortDescription: string[];
  fullDescription: string;
  needs: string[];
  hotspots: string[];
  logic: ProfileLogic;
  stats: {
    count: number;
    share: number; // Percentage
  };
}

export const profiles: Profile[] = [
  {
    id: "cuidadoras",
    title: "Cuidadoras Invisibles",
    icon: "care",
    headline: "Flexibilidad por obligación",
    triangleHook:
      "Mujeres que manejan un micronegocio informal desde casa mientras cuidan familiares.",
    shortDescription: [
      "Mujeres que gestionan micronegocios desde el hogar.",
      "Conciliar ingresos con cuidado de hijos/familia.",
      "Informalidad por necesidad de flexibilidad.",
    ],
    fullDescription:
      "Corresponde a mujeres que atienden un negocio informal desde el hogar mientras cuidan familiares. Tienditas en casa, venta de comida por encargo, catálogo, etc., al mismo tiempo que se encargan de niños o adultos mayores. Su principal razón para la informalidad es la necesidad de flexibilidad horaria y la falta de apoyos de cuidado.",
    needs: [
      "Sistemas de cuidado (guarderías, estancias).",
      "Empleos formales flexibles.",
      "Acompañamiento fiscal no punitivo.",
    ],
    hotspots: ["Nezahualcóyotl, Méx.", "Iztapalapa, CDMX", "Centro, Tabasco", "Tuxtla Gutiérrez, Chiapas"],
    logic: {
      mask: [
        "is_female == 1",
        "has_children == 1",
        "pos_ocu ∈ autoempleo / trabajadora por cuenta propia",
        "hrsocup ≤ 34 horas (medio tiempo)",
      ],
      dataSignals: [
        "profile_cuidadoras_share",
        "profile_cuidadoras_count",
        "informal_com_occ",
        "care_gap_index",
      ],
      interpretation:
        "Una alta proporción indica que la informalidad surge por falta de sistemas de cuidado y empleos flexibles; reducir la brecha de cuidados puede moverlas a esquemas formales.",
    },
    stats: { count: 1200000, share: 35 },
  },
  {
    id: "microtrap",
    title: "Comerciantes Atrapados en lo Micro",
    icon: "micro",
    headline: "La trampa de la microempresa",
    triangleHook:
      "Dueños con baja escolaridad y negocios diminutos que no crecen ni se formalizan.",
    shortDescription: [
      "Dueños de tienditas o puestos con muy bajo capital.",
      "Negocios de 1–2 empleados (familiares).",
      "Trampa de baja productividad.",
    ],
    fullDescription:
      "Son pequeños dueños de negocios con muy baja escolaridad y escaso capital. Sus negocios rara vez crecen más allá de 1–2 empleados. Permanecen informales porque su productividad es tan baja que formalizarse no les reditúa: los costos de ser formal superarían cualquier ganancia.",
    needs: [
      "Capacitación y apoyo gerencial.",
      "Acceso a tecnología básica.",
      "Compras consolidadas.",
    ],
    hotspots: ["Ocosingo, Chiapas", "San Felipe del Progreso, Méx.", "Chilón, Chiapas", "Huejutla de Reyes, Hidalgo"],
    logic: {
      mask: [
        "owner == 1",
        "avg_workers ≤ 5",
        "escolaridad < 9 años",
        "productivity_percentile < 25",
      ],
      dataSignals: [
        "profile_microtrap_share",
        "avg_workers",
        "productivity_percentile",
        "credit_access_flag",
      ],
      interpretation:
        "Cuando el share supera 40 % sabemos que la economía local está dominada por micronegocios de baja productividad que requieren asistencia productiva más que fiscalización.",
    },
    stats: { count: 1800000, share: 45 },
  },
  {
    id: "desalentados",
    title: "Emprendedores Desalentados",
    icon: "desalentados",
    headline: "Potencial frenado por el miedo",
    triangleHook:
      "Microempresarios que no formalizan por inseguridad, corrupción o falta de confianza institucional.",
    shortDescription: [
      "Negocios que podrían crecer, pero el entorno los frena.",
      "Zonas con alta delincuencia o corrupción.",
      "Se mantienen ‘bajo el radar’ por miedo.",
    ],
    fullDescription:
      "Son dueños de micronegocios que podrían crecer y formalizarse, pero el entorno los desincentiva fuertemente. Operan en zonas con delincuencia, extorsión o corrupción elevadas. No confían en las autoridades y perciben poca ganancia en registrarse.",
    needs: [
      "Seguridad pública y reducción de extorsión.",
      "Estado de derecho creíble.",
      "Simplificación radical de trámites.",
    ],
    hotspots: ["Ecatepec de Morelos, Méx.", "Chilpancingo de los Bravo, Gro.", "Coatzacoalcos, Ver.", "Uruapan, Mich."],
    logic: {
      mask: [
        "owner == 1",
        "crime_incidence alto o encig_corr_index alto",
        "negocio_en_comercio == 1",
        "trámites o sobornos reportados",
      ],
      dataSignals: [
        "profile_desalentados_share",
        "encig_corr_index",
        "crime_incidence",
        "municipal_trust_gap",
      ],
      interpretation:
        "Valores altos señalan territorios donde formalizar sin garantías aumenta el riesgo; cualquier política debe comenzar por seguridad, confianza y simplificación radical.",
    },
    stats: { count: 500000, share: 20 },
  },
];
