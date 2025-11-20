import React, { useMemo, useState } from "react";
import { BlockMath } from "react-katex";
import { Section } from "../layout/Section";
import { SectionHeader } from "../layout/SectionHeader";

type TabId = "datos" | "metodo" | "resultados";
type DeterminantId = "macro" | "sociodemografico" | "estructura" | "institucional";

interface PaperStat {
  label: string;
  value: string;
  helper?: string;
}

interface PaperTab {
  id: TabId;
  label: string;
  paragraphs: string[];
  bullets?: string[];
  math?: string;
  footnote?: string;
}

interface PaperEvidence {
  id: string;
  title: string;
  citation: string;
  year: string;
  determinants: DeterminantId[];
  summary: string;
  stats: PaperStat[];
  tabs: PaperTab[];
}

interface DeterminantLane {
  id: DeterminantId;
  title: string;
  subtitle: string;
  description: string;
  policyCue: string;
}

const determinantLanes: DeterminantLane[] = [
  {
    id: "macro",
    title: "Macroeconómico",
    subtitle: "Ciclos, impuestos y costos laborales",
    description:
      "La carga fiscal, el salario mínimo y el desempleo empujan o retraen el tamaño del sector informal cuando la productividad no avanza al mismo ritmo.",
    policyCue: "Reformas tributarias graduales y contracíclicas para MiPyMEs.",
  },
  {
    id: "sociodemografico",
    title: "Sociodemográfico",
    subtitle: "Capital humano y arreglos familiares",
    description:
      "Escolaridad, edad y las cargas de cuidado determinan quién puede acceder a empleos formales y quién necesita flexibilidad a toda costa.",
    policyCue: "Sistemas de cuidado y educación continua orientados al comercio urbano.",
  },
  {
    id: "estructura",
    title: "Estructura empresarial",
    subtitle: "Productividad y escala",
    description:
      "El 95% de las unidades económicas son microempresas de baja eficiencia; su frontera de producción no alcanza para cubrir las obligaciones de la formalidad.",
    policyCue: "Servicios empresariales y tecnología accesible en barrios comerciales.",
  },
  {
    id: "institucional",
    title: "Institucional",
    subtitle: "Regulación, confianza y ley",
    description:
      "Cuando los trámites son costosos y no existe protección efectiva de contratos, la formalidad pierde sentido económico para hogares y negocios.",
    policyCue: "Simplificar trámites y elevar la probabilidad de cumplimiento del Estado de derecho.",
  },
];

const papers: PaperEvidence[] = [
  {
    id: "paper1",
    title: "Características del empleo informal en México, 2005-2020",
    citation: "Ovando-Aldana, Rivera-Rojo y Salgado-Vega",
    year: "2021",
    determinants: ["sociodemografico", "estructura"],
    summary:
      "Con datos ENOE, las probabilidades logísticas confirman que el capital humano es el factor inverso más poderoso y que el tamaño de empresa multiplica el riesgo de informalidad.",
    stats: [
      { label: "Odds ratio microempresa", value: "4.2×" },
      { label: "Sector primario vs secundario", value: "+2.8×" },
      { label: "Efecto universidad", value: "-60% prob." },
    ],
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "Muestra ENOE 2005-2020 (áreas urbanas y rurales) con más de 60 mil observaciones por corte para comparar cohortes de trabajadores formales e informales.",
          "Variables independientes: sexo, edad, educación, estado civil, tamaño de unidad económica, sector, horas trabajadas y ubicación urbana/rural.",
        ],
        bullets: [
          "Se mantiene la misma definición institucional de informalidad: falta de seguridad social.",
          "Dos cortes temporales permiten medir persistencia estructural de los coeficientes.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Modelo logit binario donde la probabilidad de informalidad depende de características individuales y del puesto.",
          "Los coeficientes se interpretan como odds ratios para estimar cuánto se multiplican las probabilidades relativas.",
        ],
        math:
          "P\\left(Y_i=1\\right)=\\frac{1}{1+e^{-(\\beta_0+\\beta_1\\text{Escolaridad}_i+\\beta_2\\text{TamañoEmpresa}_i+\\cdots)}}",
        footnote: "Y_i = 1 representa empleo informal; las variables binarias capturan escalones educativos, género y tipo de empresa.",
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "El tamaño de la empresa domina: trabajar en una unidad de menos de 10 personas multiplica por 4 la probabilidad de ser informal.",
          "El efecto protector de la educación se mantiene casi inalterado entre 2005 y 2020, señalando inercia estructural.",
        ],
        bullets: [
          "Las microempresas explican 70% del empleo informal urbano.",
          "La escolaridad media superior reduce a la mitad la propensión a la informalidad.",
          "Edad tiene elasticidad baja, confirmando que el fenómeno no es generacional sino estructural.",
        ],
      },
    ],
  },
  {
    id: "paper2",
    title: "Differences in efficiency between Formal and Informal Micro Firms",
    citation: "Antonio Báez-Morales",
    year: "2015",
    determinants: ["estructura", "institucional"],
    summary:
      "A partir de ENAMIN 2008 y fronteras estocásticas, muestra que la ineficiencia técnica de microempresas informales impide costear la formalidad aunque lo deseen.",
    stats: [
      { label: "TE firmas formales", value: "0.75" },
      { label: "TE firmas informales", value: "0.60" },
      { label: "Capacitación documentada", value: "14%" },
    ],
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "Encuesta Nacional de Micronegocios (ENAMIN) 2008 con desagregación por tamaño, sector y formalidad.",
          "Variables de producción: trabajo (empleados), capital (valor contable de activos) e ingresos anuales.",
        ],
        bullets: [
          "Permite separar microempresas de subsistencia vs de acumulación.",
          "Identifica uso de tecnología, acceso a crédito y prácticas de gestión.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Análisis de Frontera Estocástica (SFA) con función Cobb-Douglas para estimar la distancia de cada firma respecto a la tecnología óptima.",
          "El término de ineficiencia U_i captura cuánta productividad pierde la empresa por falta de capacidades.",
        ],
        math: "\\ln(Y_i)=\\beta_0+\\beta_L\\ln(L_i)+\\beta_K\\ln(K_i)+v_i-u_i",
        footnote: "TE_i = exp(-U_i) mide eficiencia técnica; valores cercanos a 1 indican uso óptimo de insumos.",
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "Las microempresas informales se ubican 15 puntos porcentuales por debajo de la frontera; sin mejoras tecnológicas la formalidad resultaría inviable.",
          "La institucionalidad importa porque acceso a crédito, programas y compras públicas sólo llega a firmas formales.",
        ],
        bullets: [
          "El diferencial de eficiencia explica más de la mitad de la brecha de ingresos entre formal e informal.",
          "Programas de desarrollo empresarial elevan TE_i al reducir U_i mediante asesoría y financiamiento.",
        ],
      },
    ],
  },
  {
    id: "paper3",
    title: "Determinants of Micro Firms Informality in Mexican States",
    citation: "Antonio Báez-Morales",
    year: "2015",
    determinants: ["macro", "institucional", "estructura"],
    summary:
      "Modelo de panel estatal 2008-2012 que liga esfuerzo regulatorio, PIB per cápita y cumplimiento de la ley con la tasa de informalidad de microempresas.",
    stats: [
      { label: "Estados analizados", value: "32" },
      { label: "Elasticidad PIBpc", value: "β < 0" },
      { label: "Impacto regulación", value: "+" },
    ],
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "Panel a nivel estatal con tasas de informalidad ENAMIN, PIB per cápita, Doing Business subnacional y gasto público.",
          "Incluye indicadores de cumplimiento de contratos y percepción de corrupción.",
        ],
        bullets: [
          "Controla choques macro con dummies de año.",
          "Permite separar heterogeneidad estructural fija por entidad.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Modelo de efectos fijos que captura características inmutables de cada estado y evalúa el impacto marginal de variables macro e institucionales.",
        ],
        math:
          "Informalidad_{it}=\\alpha_i+\\lambda_t+\\beta_1 GDPpc_{it}+\\beta_2 Regulacion_{it}+\\beta_3 RuleOfLaw_{it}+\\varepsilon_{it}",
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "Estados con mayor PIB per cápita y mejor Rule of Law presentan tasas consistentemente menores.",
          "Cada punto adicional en costos regulatorios (Doing Business) se asocia con incrementos estadísticamente significativos en informalidad.",
        ],
        bullets: [
          "La institucionalidad pesa tanto como el crecimiento económico.",
          "Existen retornos decrecientes: una vez simplificados los trámites básicos, el impacto adicional es menor.",
        ],
      },
    ],
  },
  {
    id: "paper4",
    title: "By Choice or by Force? Informal Employment in Urban Mexico",
    citation: "Robert Duval-Hernández",
    year: "2021",
    determinants: ["sociodemografico", "institucional"],
    summary:
      "Modela la informalidad voluntaria vs. forzada mostrando cómo la cobertura de salud del hogar y la carga de dependientes condicionan la decisión.",
    stats: [
      { label: "Coef. salud no laboral", value: "+0.468" },
      { label: "Razón dependencia", value: "+" },
      { label: "Elasticidad escolaridad", value: "-" },
    ],
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "ENOE urbana con módulos de hogar: dependientes menores, otros adultos que cotizan y acceso a salud por programas.",
          "Permite distinguir entre trabajadores principales y secundarios en el hogar.",
        ],
        bullets: [
          "Segmenta informalidad \"por elección\" (second earners) vs \"por fuerza\" (jefes).",
          "Incluye variables institucionales como acceso a IMSS vía cónyuge.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Probit bivariado que estima simultáneamente la decisión de participar y la probabilidad de ser informal, controlando la correlación de errores.",
        ],
        math:
          "Y_1^*=\\gamma X + u_1,\\quad Y_2^*=\\beta Z + u_2,\\quad Corr(u_1,u_2)=\\rho",
        footnote: "Y_1 observa participación y Y_2 condición informal; la significancia de ρ confirma procesos conjuntos.",
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "Los trabajadores con cobertura de salud ajena al empleo formal tienen mayor propensión a buscar opciones informales con más flexibilidad.",
          "Hogares con alta razón de dependencia empujan a los jefes a aceptar cualquier empleo, incluso informal y de baja remuneración.",
        ],
        bullets: [
          "La política de cuidado infantil y horarios flexibles reduce la informalidad 'por necesidad'.",
          "La informalidad 'por elección' se concentra en cónyuges con ingresos complementarios.",
        ],
      },
    ],
  },
  {
    id: "paper5",
    title: "Informal Employment, the Tertiary Sector and GDP",
    citation: "Robles Ortiz & Ambriz Torres",
    year: "2024",
    determinants: ["macro", "institucional"],
    summary:
      "Modelo de ecuaciones estructurales para 1980-2022 que vincula impuestos, salario mínimo y desempleo con la expansión del sector terciario informal y el PIB.",
    stats: [
      { label: "Elasticidad impuestos→informalidad", value: "+" },
      { label: "Carga salarial", value: "+" },
      { label: "Impacto informalidad→PIB terciario", value: "0.37" },
    ],
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "Series anuales agregadas (Banco de México, INEGI, Banco Mundial) para empleo informal, PIB, sector servicios, impuestos, gasto y salario mínimo real.",
        ],
        bullets: [
          "Controla shocks externos con variables instrumentales (precio del crudo, crisis).",
          "Incluye gasto público como contrapeso institucional.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Modelo de ecuaciones estructurales (SEM) que estima simultáneamente la causalidad entre política fiscal, informalidad y crecimiento del sector terciario.",
          "La informalidad funciona como variable latente alimentada por los indicadores observables.",
        ],
        math:
          "Informalidad = \\lambda_1 Impuestos + \\lambda_2 Desempleo + \\lambda_3 SalarioMin - \\lambda_4 Gasto + \\zeta",
        footnote: "La variable latente Informalidad impacta en 0.37 al crecimiento del sector servicios y arrastra al PIB.",
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "Incrementos en impuestos, salarios mínimos sin mejoras de productividad y desempleo aceleran la informalidad.",
          "A su vez, un punto de informalidad adicional alimenta el crecimiento del sector terciario pero con baja productividad, frenando el PIB.",
        ],
        bullets: [
          "El gasto público focalizado amortigua parcialmente el efecto.",
          "Sugiere coordinación macro para no trasladar cargas abruptas a microempresas.",
        ],
      },
    ],
  },
  {
    id: "paper6",
    title: "Determinantes de la informalidad en zonas metropolitanas",
    citation: "Guzmán Segura & Quezada Garza",
    year: "2025",
    determinants: ["macro", "sociodemografico", "institucional"],
    summary:
      "Panel 2005-2020 para 74 zonas metropolitanas que muestra cómo escala urbana, demografía y factores institucionales moldean la tasa de informalidad laboral.",
    stats: [
      { label: "Zonas analizadas", value: "74" },
      { label: "Efecto tamaño poblacional", value: "+" },
      { label: "Efecto educación promedio", value: "-" },
    ],
    tabs: [
      {
        id: "datos",
        label: "Datos",
        paragraphs: [
          "Construye panel metropolitano con tasas de informalidad ENOE, estructura demográfica, logaritmo poblacional y educación promedio.",
          "Incluye variables institucionales locales (capacidad administrativa, inspecciones).",
        ],
        bullets: [
          "Restringido al ámbito urbano, útil para trazar política territorial.",
        ],
      },
      {
        id: "metodo",
        label: "Método",
        paragraphs: [
          "Modelo de efectos fijos siguiendo a Dougherty & Escobar (2013) con corrección por heterocedasticidad panel.",
        ],
        math: "TIL_{it}=\\alpha_i+\\beta_1\\ln(Poblacion_{it})+\\beta_2 Educacion_{it}+\\beta_3 Instituciones_{it}+\\varepsilon_{it}",
      },
      {
        id: "resultados",
        label: "Resultados",
        paragraphs: [
          "La elasticidad del tamaño poblacional es positiva y significativa: las metrópolis grandes concentran mayor informalidad.",
          "La educación promedio amortigua el efecto, mostrando que el capital humano colectivo importa.",
        ],
        bullets: [
          "Las zonas con políticas pro-competencia y ventanillas únicas muestran coeficientes institucionales negativos.",
          "El agobio de costos urbanos (vivienda, transporte) empuja a nuevos migrantes a actividades informales.",
        ],
      },
    ],
  },
];

const determinantOrder: DeterminantId[] = ["macro", "sociodemografico", "estructura", "institucional"];

const determinantLabels: Record<DeterminantId, string> = {
  macro: "Macro",
  sociodemografico: "Sociodemográfico",
  estructura: "Estructura",
  institucional: "Institucional",
};

const PaperDetailPanel: React.FC<{
  paper: PaperEvidence;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}> = ({ paper, activeTab, onTabChange }) => {
  const currentTab = paper.tabs.find((tab) => tab.id === activeTab) ?? paper.tabs[0];

  return (
    <section className="literature-paper-detail" aria-live="polite">
      <header className="literature-paper-detail__header">
        <div>
          <p className="eyebrow">{paper.citation} · {paper.year}</p>
          <h3>{paper.title}</h3>
          <p>{paper.summary}</p>
        </div>
        <div className="literature-paper-detail__tags" aria-label="Determinantes cubiertos">
          {paper.determinants.map((determinant) => (
            <span key={`${paper.id}-${determinant}`} className={`determinant-pill determinant-pill--${determinant}`}>
              {determinantLabels[determinant]}
            </span>
          ))}
        </div>
      </header>

      <div className="literature-paper-detail__body">
        <div className="literature-paper-detail__stats">
          <h4>Señales cuantitativas</h4>
          <dl>
            {paper.stats.map((stat) => (
              <div key={`${paper.id}-${stat.label}`}>
                <dt>{stat.label}</dt>
                <dd>
                  {stat.value}
                  {stat.helper && <span>{stat.helper}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="literature-paper-detail__tabs">
          <div className="literature-tabs__controls" role="tablist" aria-label="Detalle del artículo">
            {paper.tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={currentTab.id === tab.id}
                className={
                  "literature-tabs__button" + (currentTab.id === tab.id ? " literature-tabs__button--active" : "")
                }
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="literature-tabs__panel">
            {currentTab.paragraphs.map((paragraph, index) => (
              <p key={`${currentTab.id}-paragraph-${index}`}>{paragraph}</p>
            ))}
            {currentTab.math && (
              <div className="literature-tabs__equation" aria-label="Expresión matemática">
                <BlockMath math={currentTab.math} />
              </div>
            )}
            {currentTab.bullets && (
              <ul>
                {currentTab.bullets.map((bullet, index) => (
                  <li key={`${currentTab.id}-bullet-${index}`}>{bullet}</li>
                ))}
              </ul>
            )}
            {currentTab.footnote && <p className="literature-tabs__footnote">{currentTab.footnote}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export const LiteratureExplorerSection: React.FC = () => {
  const [activePaperId, setActivePaperId] = useState<string>(papers[0].id);
  const [activeTab, setActiveTab] = useState<TabId>("datos");

  const activePaper = useMemo(() => papers.find((paper) => paper.id === activePaperId) ?? papers[0], [activePaperId]);

  const lanesWithCount = useMemo(() => {
    return determinantLanes.map((lane) => {
      const related = papers.filter((paper) => paper.determinants.includes(lane.id)).length;
      return {
        ...lane,
        related,
        share: related / papers.length,
      };
    });
  }, []);

  return (
    <Section id="marco-teorico" layout="full">
      <SectionHeader
        eyebrow="Sección 5"
        title="Literatura estructural de la informalidad"
        kicker="Seis artículos, cuatro determinantes y una narrativa conectada"
        intro={
          <div>
            <p>
              La evidencia académica converge en cuatro fuerzas: condiciones macro, composición sociodemográfica,
              estructura empresarial e instituciones. En lugar de tarjetas aisladas, trazamos un mapa relacional
              para ver qué papers nutren cada variable y cómo se combinan.
            </p>
            <p>
              Selecciona un artículo en la matriz para explorar sus datos, métodos y resultados con el detalle
              original del paper, incluidas las ecuaciones clave.
            </p>
          </div>
        }
      />

      <div className="literature-constellation">
        <section className="determinant-lattice" aria-label="Resumen de determinantes">
          {lanesWithCount.map((lane) => (
            <article key={lane.id} className="determinant-lattice__item">
              <header>
                <div>
                  <p className="eyebrow">{lane.subtitle}</p>
                  <h3>{lane.title}</h3>
                </div>
                <div className="determinant-lattice__metric">
                  <strong>{lane.related}</strong>
                  <span>papers</span>
                </div>
              </header>
              <p>{lane.description}</p>
              <p className="determinant-lattice__policy">{lane.policyCue}</p>
              <div className="determinant-lattice__progress" aria-hidden="true">
                <span style={{ width: `${lane.share * 100}%` }} />
              </div>
            </article>
          ))}
        </section>

        <section className="literature-matrix" aria-label="Relación papers-determinantes">
          <div className="literature-matrix__legend">
            <p className="eyebrow">Cruce evidencia vs determinantes</p>
            <p>Los puntos sólidos indican una relación directa del artículo con el eje estructural.</p>
          </div>
          <div className="literature-matrix__scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Artículo</th>
                  {determinantOrder.map((det) => (
                    <th scope="col" key={`head-${det}`}>
                      {determinantLabels[det]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {papers.map((paper) => (
                  <tr key={paper.id} className={paper.id === activePaper.id ? "is-active" : undefined}>
                    <th scope="row">
                      <button type="button" onClick={() => {
                        setActivePaperId(paper.id);
                        setActiveTab("datos");
                      }}>
                        <span>{paper.title}</span>
                        <small>{paper.citation}</small>
                      </button>
                    </th>
                    {determinantOrder.map((determinant) => {
                      const isLinked = paper.determinants.includes(determinant);
                      return (
                        <td key={`${paper.id}-${determinant}`}>
                          <span
                            className={
                              "matrix-dot" +
                              (isLinked ? ` matrix-dot--${determinant}` : " matrix-dot--empty")
                            }
                            aria-label={
                              isLinked
                                ? `${paper.title} aporta evidencia para ${determinantLabels[determinant]}`
                                : `${paper.title} no aborda ${determinantLabels[determinant]}`
                            }
                            role="img"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <PaperDetailPanel paper={activePaper} activeTab={activeTab} onTabChange={setActiveTab} />
    </Section>
  );
};
