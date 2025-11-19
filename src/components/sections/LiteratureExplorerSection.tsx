import React, { useMemo, useState } from "react";
import { Section } from "../layout/Section";
import { SectionHeader } from "../layout/SectionHeader";
import {
  IconCareWork,
  IconEducation,
  IconInstitution,
  IconMicroenterprise,
} from "../icons/FactorIcons";

type TabId = "datos" | "metodo" | "resultados";

type IconKey = "education" | "micro" | "institution" | "care";

interface EvidenceTab {
  id: TabId;
  label: string;
  paragraphs: string[];
  bullets?: string[];
  equation?: string;
}

interface NarrativeBlock {
  title: string;
  paragraphs: string[];
  visual: string;
}

interface DeterminantCard {
  id: string;
  title: string;
  summary: string;
  excerpt: string;
  icon: IconKey;
  paper: string;
  tabs: EvidenceTab[];
  narrative: NarrativeBlock;
}

const iconMap: Record<IconKey, React.ReactNode> = {
  education: <IconEducation />,
  micro: <IconMicroenterprise />,
  institution: <IconInstitution />,
  care: <IconCareWork />,
};

const determinants: DeterminantCard[] = [
  {
    id: "education",
    title: "Capital humano (educación)",
    summary: "La escolaridad es el predictor inverso más fuerte de la informalidad.",
    excerpt:
      "Ovando-Aldana et al. (2021) confirman que sin preparatoria o universidad la probabilidad de informalidad se dispara.",
    icon: "education",
    paper: "Ovando-Aldana et al. (2021)",
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "Encuestas laborales urbanas (ENOE y series históricas) con más de 15 años de observaciones para comparar cohortes.",
          "Variables clave: nivel educativo (sin escuela a universidad), edad, sexo, experiencia y condición formal/informal.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Modelo logit binario donde Y_i = 1 si el trabajador opera en la informalidad. La escolaridad entra como escalón discreto y se controla por edad y experiencia.",
        ],
        equation:
          "P(Y_i = 1) = 1 / (1 + exp(-(beta_0 + beta_1 Escolaridad_i + beta_2 Edad_i + ... )))",
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "Cada escalón educativo reduce significativamente la probabilidad de informalidad incluso manteniendo edad constante.",
        ],
        bullets: [
          "El efecto protector de la educación se mantiene estable entre 2005 y 2020.",
          "La escolaridad explica la capacidad real de ser contratado formalmente (link con Duval-Hernández).",
          "Baja educación = exclusión estructural, no simple decisión de evasión.",
        ],
      },
    ],
    narrative: {
      title: "Educación y capital humano",
      paragraphs: [
        "La educación surge una y otra vez como el predictor individual más importante de la informalidad. A menor escolaridad, mayor probabilidad de permanecer en la informalidad; contar con media superior o superior funciona como escudo.",
        "La educación no solo influye en querer ser formal sino en poder serlo: sin credenciales suficientes, el mercado formal simplemente no contrata. Mejorar capital humano y capacitación es central para reducir la informalidad comercial.",
      ],
      visual:
        "Barras de tasa de informalidad por nivel educativo (sin escuela ~80% vs superior ~20%).",
    },
  },
  {
    id: "micro",
    title: "Tamaño de empresa y productividad",
    summary: "Las microempresas informales son intrínsecamente menos eficientes.",
    excerpt:
      "Báez-Morales (2015) muestra con Fronteras Estocásticas que la baja productividad impide cubrir el costo formal.",
    icon: "micro",
    paper: "Báez-Morales (2015)",
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "Censos económicos y encuestas empresariales con información de tamaño, ventas, capital y uso de tecnología.",
          "Se separan micro, pequeñas, medianas y grandes empresas formales e informales.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Frontera Estocástica de Producción (SFA) para estimar ineficiencia técnica U_i >= 0 diferenciando por tamaño y formalidad.",
        ],
        equation: "ln(Y_i) = f(X_i; beta) + V_i - U_i",
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "Trabajar en una microempresa incrementa hasta 18 veces la probabilidad de ser informal. No es solo evasión: la productividad de subsistencia no soporta los costos de cumplir.",
        ],
        bullets: [
          "Las microinformales muestran U_i mucho mayor que sus pares formales.",
          "80% no usa computadora ni internet; solo 14% capacita personal.",
          "Cerrar brechas de capacidades es condición necesaria antes de bajar impuestos.",
        ],
      },
    ],
    narrative: {
      title: "Tamaño de empresa y productividad",
      paragraphs: [
        "La mayoría de los informales laboran en microempresas de 1–10 empleados. Allí la probabilidad de informalidad se dispara porque las unidades operan en modo subsistencia.",
        "En ciudades pequeñas incluso se observa que costos de apertura más altos reducen informalidad al desincentivar micronegocios de supervivencia. La política debe cerrar brechas de capacidades empresariales, no solo ofrecer descuentos fiscales.",
      ],
      visual:
        "Embudo que parte de 95% de empresas micro y desemboca en su aporte dominante a la informalidad.",
    },
  },
  {
    id: "institution",
    title: "Instituciones y confianza",
    summary: "Corrupción y trámites complejos actúan como impuesto implícito.",
    excerpt:
      "Robles Ortiz & Ambriz Torres (2024) combinan ENCIG con modelos SEM para ligar corrupción e informalidad.",
    icon: "institution",
    paper: "Robles Ortiz & Ambriz Torres (2024)",
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "ENCIG 2023 y módulos de percepción de corrupción, complejidad de trámites y experiencias de pagos extraoficiales.",
          "Serie estatal de calidad regulatoria y estado de derecho.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Modelos de ecuaciones estructurales (SEM) que conectan confianza institucional, tramitología y decisión de formalizar.",
        ],
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "Mayor percepción de corrupción = mayor probabilidad de informalidad. La corrupción opera como impuesto implícito que resta beneficios a ser formal.",
        ],
        bullets: [
          "Estados con peor calidad institucional muestran tasas de informalidad sistemáticamente altas.",
          "Cuando la ley no protege contratos, la ventaja de ser formal se diluye.",
          "Más inversión (IED) y mejor regulación reducen informalidad al crear empleos formales.",
        ],
      },
    ],
    narrative: {
      title: "Entorno institucional y contexto macro",
      paragraphs: [
        "El contexto institucional moldea la informalidad: donde la ley no se cumple y la corrupción es alta, operar informalmente es casi una estrategia racional.",
        "Impuestos altos sin servicios, trámites opacos y falta de seguridad reducen el valor esperado de la formalidad. A la inversa, inversión y cadenas productivas elevan el empleo formal.",
      ],
      visual:
        "Mapa de México coloreado por índice de estado de derecho con tooltips que muestran la tasa informal.",
    },
  },
  {
    id: "care",
    title: "Género y cuidados",
    summary: "Muchas mujeres eligen la informalidad por necesidad de flexibilidad.",
    excerpt:
      "Duval-Hernández (2021) separa la decisión de participar vs ser contratada con un probit bivariado.",
    icon: "care",
    paper: "Duval-Hernández (2021)",
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "Encuestas de empleo urbanas con módulos de género, dependientes en el hogar, horas de cuidado y condición formal.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Modelos de elección discreta (probit bivariado) que separan la decisión de buscar empleo formal de la probabilidad de obtenerlo, controlando por cargas de cuidado.",
        ],
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "Las mujeres con altas responsabilidades de cuidado muestran mayor propensión al autoempleo informal por la flexibilidad que brinda.",
        ],
        bullets: [
          ">50% de los microemprendedores son mujeres \"emprendedoras por necesidad\".",
          "Guarderías, estancias y horarios laborales flexibles reducen la necesidad de optar por la informalidad.",
          "También existe discriminación por disponibilidad percibida en el mercado formal.",
        ],
      },
    ],
    narrative: {
      title: "Género y responsabilidades de cuidado",
      paragraphs: [
        "Las mujeres ya superan a los hombres en probabilidad de estar en informalidad en áreas urbanas. No es el género per se, sino la carga de cuidado que dificulta cumplir horarios rígidos.",
        "Muchas se vuelven emprendedoras por necesidad (ventas desde casa, catálogos, tienditas) para ajustar su disponibilidad. Servicios de cuidado y esquemas laborales flexibles son política laboral, no política social periférica.",
      ],
      visual:
        "Comparativo de tasas de informalidad de mujeres con hijos vs sin hijos, o pictograma 4/5 figuras.",
    },
  },
];

interface LiteratureModalProps {
  determinant: DeterminantCard;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onClose: () => void;
}

const LiteratureModal: React.FC<LiteratureModalProps> = ({ determinant, activeTab, onTabChange, onClose }) => {
  const currentTab = determinant.tabs.find((tab) => tab.id === activeTab) ?? determinant.tabs[0];
  const titleId = `literature-modal-title-${determinant.id}`;

  return (
    <div className="literature-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="literature-modal__backdrop" aria-label="Cerrar" onClick={onClose} />
      <div className="literature-modal__panel">
        <button type="button" className="literature-modal__close" aria-label="Cerrar" onClick={onClose}>
          ×
        </button>
        <div className="literature-modal__header">
          <span className="literature-modal__icon">{iconMap[determinant.icon]}</span>
          <div>
            <p className="eyebrow">{determinant.paper}</p>
            <h3 id={titleId}>{determinant.title}</h3>
            <p>{determinant.summary}</p>
          </div>
        </div>
        <div className="literature-modal__tabs" role="tablist">
          {determinant.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={currentTab.id === tab.id}
              className={
                "literature-modal__tab" + (currentTab.id === tab.id ? " literature-modal__tab--active" : "")
              }
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="literature-modal__body">
          {currentTab.paragraphs.map((paragraph, index) => (
            <p key={`${currentTab.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
          {currentTab.equation && <pre className="literature-modal__equation">{currentTab.equation}</pre>}
          {currentTab.bullets && (
            <ul>
              {currentTab.bullets.map((bullet, index) => (
                <li key={`${currentTab.id}-bullet-${index}`}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export const LiteratureExplorerSection: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("datos");

  const activeDeterminant = useMemo(
    () => determinants.find((determinant) => determinant.id === activeCardId) ?? null,
    [activeCardId],
  );

  const handleOpen = (id: string) => {
    setActiveCardId(id);
    setActiveTab("datos");
  };

  const handleClose = () => setActiveCardId(null);

  return (
    <Section id="marco-teorico" layout="full">
      <SectionHeader
        eyebrow="Sección 5"
        title="Marco teórico y explorador de literatura"
        kicker="Cuatro factores estructurales explican la persistencia de la informalidad en comercio"
        intro={
          <div>
            <p>
              Si el problema es estructural, hay que mirar a las estructuras: educación, tamaño empresarial,
              género y el entorno institucional. Revisamos literatura académica para condensar estos ejes.
            </p>
            <ul>
              <li>Educación y capital humano insuficiente.</li>
              <li>Tamaño y productividad de las empresas.</li>
              <li>Género y responsabilidades de cuidado.</li>
              <li>Institucionalidad débil y contexto macro.</li>
            </ul>
            <p>
              El explorador permite consultar datos, métodos y resultados concretos para cada eje y conectar el
              diagnóstico con evidencia revisada por pares.
            </p>
          </div>
        }
      />

      <div className="literature-grid">
        {determinants.map((determinant) => (
          <button
            type="button"
            key={determinant.id}
            className="literature-card"
            onClick={() => handleOpen(determinant.id)}
          >
            <span className="literature-card__icon">{iconMap[determinant.icon]}</span>
            <p className="eyebrow">{determinant.paper}</p>
            <h3>{determinant.title}</h3>
            <p>{determinant.summary}</p>
            <span className="literature-card__action">Ver evidencia</span>
          </button>
        ))}
      </div>

      <div className="literature-narratives">
        <h3>Cuatro factores estructurales detrás de la informalidad</h3>
        <div className="literature-narratives__grid">
          {determinants.map((determinant) => (
            <article key={determinant.id}>
              <h4>{determinant.narrative.title}</h4>
              {determinant.narrative.paragraphs.map((paragraph, index) => (
                <p key={`${determinant.id}-narrative-${index}`}>{paragraph}</p>
              ))}
              <p className="literature-narrative__visual">
                <strong>Visual sugerido:</strong> {determinant.narrative.visual}
              </p>
            </article>
          ))}
        </div>
      </div>

      {activeDeterminant && (
        <LiteratureModal
          determinant={activeDeterminant}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={handleClose}
        />
      )}
    </Section>
  );
};
