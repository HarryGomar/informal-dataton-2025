
import type { ProfileLayerId } from "../types/geography";

export interface Profile {
  id: ProfileLayerId;
  title: string;
  icon: "care" | "micro" | "desalentados";
  shortDescription: string[];
  fullDescription: string;
  needs: string[];
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
    stats: { count: 1200000, share: 35 },
  },
  {
    id: "microtrap",
    title: "Comerciantes Atrapados en lo Micro",
    icon: "micro",
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
    stats: { count: 1800000, share: 45 },
  },
  {
    id: "desalentados",
    title: "Emprendedores Desalentados",
    icon: "desalentados",
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
    stats: { count: 500000, share: 20 },
  },
];
