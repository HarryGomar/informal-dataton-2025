import React, { useMemo, useState } from "react";
import { ScrollSection } from "../layout/ScrollSection";
import { modelPerformance, shapVariables } from "../../data/predictiveModel";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- Shared helpers ---

const formatNumber = (value: number) => new Intl.NumberFormat("es-MX").format(value);

// --- Data blueprints ---

const dataSources = [
  {
    title: "ENOE · INEGI",
    pill: "Microdatos trimestrales",
    summary:
      "Núcleo del panel. Define el universo laboral, la variable objetivo y las covariables demográficas base.",
    highlights: [
      "Filtros: eda 15–98, c_res ∈ {1,3}, r_def = 00 (entrevista completa).",
      "Targets: emp_ppal = 1 → informalidad laboral; tue_ppal = 1 → sector informal; seg_soc = 2 → sin seguridad social.",
      "Covariables: clase1/clase2 (PEA/ocupados), sex → female_share, anios_esc ponderado por fac.",
      "Ponderación crítica: cada registro pesa su fac al estimar tasas y promedios (Σ facᵢ·xᵢ / Σ facᵢ).",
    ],
  },
  {
    title: "ENCIG · INEGI",
    pill: "Instituciones y corrupción",
    summary:
      "Bianual, mide fricción burocrática y experiencias reales con servicios públicos, trámites y sobornos.",
    highlights: [
      "Corrupción: P3_2 normalizado (percepción) + P8_3_1/P8_5 (soborno directo) → bribe_share estatal.",
      "Burocracia: tiempos de trámite P7_5A_A/M, P7_5B_D unificados a tramite_time_days; satisfacción SAT P7_12A.",
      "Mapeo espacial: valores estatales asignados a ZMs; si una ZM cruza estados se promedia por población aportada.",
    ],
  },
  {
    title: "Censos Económicos",
    pill: "Estructura productiva",
    summary:
      "Caracteriza empresas comercio SCIAN 46-47: productividad, capital, remuneraciones y tamaño típico de planta.",
    highlights: [
      "Variables crudas: H001A personal ocupado, A111A producción bruta, A131A VACB, A211A inversión, Q000A capital, J000A remuneraciones.",
      "Derivadas: productividad = VACB / personal, intensidad de capital = activos fijos / personal, tamaño promedio = personal / unidades.",
      "Frecuencia quinquenal → se interpola linealmente a una serie trimestral para no romper la tendencia estructural.",
    ],
  },
];

const pipelineStages = [
  {
    title: "Filtros y expansión",
    period: "Trimestral (ENOE)",
    actions: [
      "Se limpian claves CVE_ENT/CVE_MUN y sólo se conservan hogares definitivos.",
      "Se aplica el factor fac para llevar cada registro a población efectiva.",
    ],
  },
  {
    title: "Crosswalk espacial",
    period: "Archivo Metropolis_2020.shp",
    actions: [
      "Join municipio → Zona Metropolitana; municipios fuera de ZM se excluyen del panel.",
      "Variables de conteo se agregan (Σ) y las de intensidad se promedian ponderadas (μ_w).",
    ],
  },
  {
    title: "Armonización temporal",
    period: "Panel trimestral final",
    actions: [
      "Censos (quinquenal) y ENCIG (bianual) interpolados linealmente contra cada trimestre ENOE.",
      "Doing Business u otras fuentes anuales se rellenan forward-fill, asumiendo rigidez institucional de corto plazo.",
    ],
  },
  {
    title: "Salida",
    period: "informality_ml_panel.parquet",
    actions: [
      "53 predictores consolidados + objetivo rate_informal_empleo listos para model.ipynb.",
    ],
  },
];

const featureBlocks = [
  {
    label: "Log(1+x)",
    detail: "IED, remesas, capital per cápita y stock de activos se transforman para domar colas largas y estabilizar gradientes.",
  },
  {
    label: "Rezagos",
    detail: "Se generan Xₜ₋₁ y Xₜ₋₄ para atrapar inercia trimestral y efectos estacionales anuales.",
  },
  {
    label: "Binning empresarial",
    detail: "avg_workers_per_unit se discretiza en micro, small, medium, large y se crean dummies para interacciones no lineales.",
  },
  {
    label: "Índices PCA",
    detail: "Bloques colineales (corrupción, burocracia) se condensan en un primer componente institucional que retiene la varianza útil.",
  },
  {
    label: "Pesos",
    detail: "Todos los KPIs se calculan con fac, asegurando que la señal urbana no sobre-represente municipios chicos.",
  },
];

const DataSourceMatrix: React.FC = () => (
  <div className="predictive-stack">
    <header>
      <p className="predictive-eyebrow">Materia prima</p>
      <h3 className="predictive-title">Fuentes y microdatos</h3>
      <p className="predictive-subtext">
        Cada bloque del pipeline usa códigos originales de cuestionario; así la narrativa tiene trazabilidad directa al microdato.
      </p>
    </header>
    <div className="predictive-source-matrix">
      {dataSources.map((source, idx) => (
        <article key={source.title} className="predictive-source-row" data-seq={idx + 1}>
          <div className="predictive-source-meta">
            <span className="predictive-pill">{source.pill}</span>
            <p className="predictive-source-title">{source.title}</p>
          </div>
          <div className="predictive-source-body">
            <p>{source.summary}</p>
            <ul>
              {source.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const PipelineTimeline: React.FC = () => (
  <div className="predictive-stack">
    <header>
      <p className="predictive-eyebrow">ETL minimalista</p>
      <h3 className="predictive-title">Crosswalk espacial y temporal</h3>
      <p className="predictive-subtext">
        El panel trimestral respeta la malla ENOE. Cada etapa documenta cómo armonizamos códigos territoriales y periodicidades.
      </p>
    </header>
    <ul className="predictive-timeline">
      {pipelineStages.map((stage, idx) => (
        <li key={stage.title} className="predictive-timeline__item">
          <div className="predictive-timeline__node">
            <span className="predictive-timeline__index">{String(idx + 1).padStart(2, "0")}</span>
            <span className="predictive-timeline__period">{stage.period}</span>
          </div>
          <div className="predictive-timeline__body">
            <p className="predictive-timeline__title">{stage.title}</p>
            <ul>
              {stage.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const FeatureEngineeringBoard: React.FC = () => (
  <div className="predictive-stack">
    <header>
      <p className="predictive-eyebrow">Transformaciones</p>
      <h3 className="predictive-title">Ingeniería de características</h3>
      <p className="predictive-subtext">
        El notebook <code>model.ipynb</code> deja documentada cada capa para que los árboles sólo aprendan interacciones.
      </p>
    </header>
    <div className="predictive-feature-grid">
      {featureBlocks.map((block) => (
        <article key={block.label}>
          <p className="predictive-pill predictive-pill--ghost">{block.label}</p>
          <p>{block.detail}</p>
        </article>
      ))}
    </div>
  </div>
);

const ModelSpecPanel: React.FC = () => (
  <div className="predictive-stack">
    <header>
      <p className="predictive-eyebrow">Especificación técnica</p>
      <h3 className="predictive-title">Modelo XGBoost · Comercio</h3>
      <p className="predictive-subtext">
        Target <code>rate_informal_empleo</code>, bloques Demografía + Empresa + Instituciones + Flujos sobre <code>informality_ml_panel.parquet</code>.
      </p>
    </header>
    <dl className="predictive-stat-grid">
      <div>
        <dt>Observaciones</dt>
        <dd>
          <span className="predictive-stat__value">~{formatNumber(modelPerformance.observations)}</span>
          <span className="predictive-stat__caption">municipio/ZM × trimestre</span>
        </dd>
      </div>
      <div>
        <dt>Predictores</dt>
        <dd>
          <span className="predictive-stat__value">{modelPerformance.predictors}</span>
          <span className="predictive-stat__caption">capital humano · empresa · instituciones · flujos</span>
        </dd>
      </div>
      <div>
        <dt>Objective</dt>
        <dd>
          <span className="predictive-stat__value">reg:squarederror</span>
          <span className="predictive-stat__caption">eta &lt; 0.1 · max_depth 3–6 · n_estimators ≈ 1000</span>
        </dd>
      </div>
      <div>
        <dt>Regularización</dt>
        <dd>
          <span className="predictive-stat__value">γ &gt; 0 · subsample 0.8</span>
          <span className="predictive-stat__caption">Forzamos generalización y evitamos memorizar ZMs.</span>
        </dd>
      </div>
    </dl>
  </div>
);

const ValidationPanel: React.FC = () => (
  <div className="predictive-stack">
    <header>
      <p className="predictive-eyebrow">Rolling window</p>
      <h3 className="predictive-title">Validación temporal</h3>
      <p className="predictive-subtext">
        Entrenamos 2013–2015 y probamos en 2016; luego extendemos la ventana. Es la forma más honesta de emular un forecast real.
      </p>
    </header>
    <div className="predictive-validation">
      <div>
        <p>R² validación</p>
        <strong>{(modelPerformance.r2 * 100).toFixed(0)}%</strong>
        <span>≈80% de la variación territorial explicada</span>
      </div>
      <div>
        <p>RMSE</p>
        <strong>{(modelPerformance.rmse * 100).toFixed(1)} pp</strong>
        <span>Error medio ≈2 puntos de informalidad</span>
      </div>
    </div>
    <ul className="predictive-checklist">
      <li>Grid corto de hiperparámetros → estabilidad sobre overfitting.</li>
      <li>Respetamos rezagos: jamás se mezcla información futura en el entrenamiento.</li>
      <li>Split final 2013–2019 → 2020 valida el modelo en un año de shock.</li>
    </ul>
  </div>
);

const ShapImportanceChart: React.FC<{ filterCategory?: string; embedded?: boolean }> = ({ filterCategory, embedded }) => {
  const filteredVariables = useMemo(
    () => (filterCategory ? shapVariables.filter((v) => v.category === filterCategory) : shapVariables),
    [filterCategory]
  );

  const sortedVariables = useMemo(
    () => [...filteredVariables].sort((a, b) => b.importance - a.importance).slice(0, 15),
    [filteredVariables]
  );

  const formatShapLabel = (label: string) => (label.length > 26 ? `${label.slice(0, 24)}…` : label);
  const yTickFontSize = 12;
  const colors = sortedVariables.map((variable) => (variable.direction === "positive" ? "#4d7248" : "#9cbc88"));

  const data = {
    labels: sortedVariables.map((v) => v.label),
    datasets: [
      {
        label: "Impacto SHAP (|valor medio|)",
        data: sortedVariables.map((v) => v.importance),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 24,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const variable = sortedVariables[context.dataIndex];
            const directionText = variable.direction === "positive" ? "↑ mayor informalidad" : "↓ menor informalidad";
            return `${variable.description} · ${directionText} (SHAP ${variable.importance.toFixed(4)})`;
          },
        },
        titleFont: { size: 13, family: "'Source Sans 3', sans-serif" },
        bodyFont: { size: 12, family: "'Source Sans 3', sans-serif" },
        padding: 10,
        backgroundColor: "rgba(30, 31, 26, 0.95)",
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(31, 44, 35, 0.08)" },
        ticks: {
          font: { size: 10, family: "'Source Sans 3', sans-serif" },
          color: "#4d4f49",
          maxTicksLimit: 4,
        },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { size: yTickFontSize, weight: 500, family: "'Source Sans 3', sans-serif" },
          color: "#1e1f1a",
          autoSkip: false,
          padding: 8,
          callback: (value: string | number) => formatShapLabel(String(value)),
        },
        border: { display: false },
      },
    },
    layout: { padding: { left: 0, right: 10, top: 10, bottom: 0 } },
  };

  if (embedded) {
    return (
      <div style={{ height: "100%", minHeight: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    );
  }

  return (
    <div className="predictive-stack predictive-chart-container">
      <header className="predictive-chart-header">
        <div className="predictive-chart-header-row">
          <div>
            <p className="predictive-eyebrow text-emerald">Explicabilidad SHAP</p>
            <h3 className="predictive-chart-title">
              Importancia de Variables
              {filterCategory && <span className="predictive-chart-subtitle">({filterCategory})</span>}
            </h3>
          </div>
          <p className="predictive-chart-caption">Top 15 factores · Tonalidad indica dirección</p>
        </div>
      </header>
      <div className="predictive-chart-body" style={{ height: "100%", minHeight: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

const CategoryExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const categories = [
    { id: undefined, label: "Todos" },
    { id: "human_capital", label: "Capital humano" },
    { id: "enterprise", label: "Empresa" },
    { id: "demography", label: "Demografía" },
    { id: "institution", label: "Instituciones" },
  ];

  return (
    <div className="predictive-stack predictive-chart-container">
      <header className="predictive-chart-header">
        <p className="predictive-eyebrow text-emerald">Filtro temático</p>
        <h3 className="predictive-chart-title">Explorador por categoría</h3>
        <p className="predictive-chart-caption">
          Aísla capital humano, empresa, demografía o instituciones para leer los drivers específicos.
        </p>
      </header>
      <div className="predictive-chip-group">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.id)}
            className={`predictive-chip${activeCategory === cat.id ? " is-active" : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="predictive-chart-body">
        <ShapImportanceChart filterCategory={activeCategory} embedded={true} />
      </div>
    </div>
  );
};

const RiskAtlasBridge: React.FC = () => {
  const regions = [
    {
      name: "Bajío manufacturero",
      risk: "Alto",
      drivers: ["mean_anios_esc bajo", "microempresas densas (avg_workers_per_unit < 5)", "capital fijo rezagado"],
      cue: "Target early wins con formación dual y crédito a formalización",
      value: 0.67,
    },
    {
      name: "ZM Sureste (Villahermosa, Tuxtla, Mérida)",
      risk: "Medio",
      drivers: ["bribe_share ENCIG elevado", "tramite_time_days > 45", "seg_soc = 2 masivo"],
      cue: "Necesitamos ventanillas exprés y trazabilidad de trámites",
      value: 0.58,
    },
    {
      name: "Frontera norte",
      risk: "Mixto",
      drivers: ["productividad censal alta", "migración y remesas que suavizan shocks", "PEA femenina creciente"],
      cue: "Conservar competitividad evitando que la informalidad rebase 40%",
      value: 0.39,
    },
  ];

  return (
    <div className="predictive-stack">
      <header>
        <p className="predictive-eyebrow">Puente a mapas</p>
        <h3 className="predictive-title">Score territorial compuesto</h3>
        <p className="predictive-subtext">
          El índice mezcla escolaridad, estructura empresarial, institucionalidad y flujos interpolados para priorizar zonas antes del mapa interactivo.
        </p>
      </header>
      <ul className="predictive-risk-list">
        {regions.map((region) => (
          <li key={region.name}>
            <div className="predictive-risk-row">
              <div>
                <p className="predictive-risk__label">{region.risk} riesgo</p>
                <p className="predictive-risk__name">{region.name}</p>
              </div>
              <span className="predictive-risk__value">{(region.value * 100).toFixed(0)}%</span>
            </div>
            <p className="predictive-risk__drivers">{region.drivers.join(" · ")}</p>
            <p className="predictive-risk__cue">{region.cue}</p>
          </li>
        ))}
      </ul>
      <p className="predictive-footnote">
        Este ranking alimenta perfiles y mapas posteriores, manteniendo la estética deliberadamente sobria (tipografía + líneas).
      </p>
    </div>
  );
};

// --- Main Section Component ---

export const PredictiveModelSection: React.FC = () => {
  const introContent = (
    <div className="predictive-intro-grid">
      <div className="predictive-intro-panel">
        <p className="predictive-eyebrow">Arquitectura narrativa</p>
        <h3>La informalidad se puede leer como un pipeline</h3>
        <p>
          Partimos de ENOE (hogares), ENCIG (instituciones) y Censos Económicos para formar un panel trimestral 2013–2020. El modelo XGBoost no es caja negra:
          registramos filtros, transformaciones y validación rolling window para mostrar cómo los factores estructurales explican la variación territorial.
        </p>
        <div className="predictive-intro-pillars">
          <div>
            <span>Datos crudos</span>
            <p>SDEMT (`emp_ppal`, `tue_ppal`, `seg_soc`), tiempos P7 y códigos SCIAN 46–47.</p>
          </div>
          <div>
            <span>ETL</span>
            <p>Crosswalk municipio→ZM, interpolación lineal y ponderadores fac en cada KPI.</p>
          </div>
          <div>
            <span>Modelado</span>
            <p>XGBoost con 53 predictores, log(1+x), rezagos y PCA para bloques colineales.</p>
          </div>
        </div>
      </div>
      <div className="predictive-intro-aside">
        <p className="predictive-eyebrow">Lo esencial</p>
        <h3>“Con datos pesados explicamos ~80%”</h3>
        <ul className="predictive-checklist">
          <li>Target: tasa de informalidad laboral ponderada (rate_informal_empleo).</li>
          <li>Validación expanding window mantiene la direccionalidad temporal.</li>
          <li>Explicabilidad SHAP conecta con los cuatro factores del marco conceptual.</li>
        </ul>
        <dl className="predictive-stat-grid predictive-stat-grid--compact">
          <div>
            <dt>Observaciones</dt>
            <dd>
              <span className="predictive-stat__value">~{formatNumber(modelPerformance.observations)}</span>
              <span className="predictive-stat__caption">municipio/ZM × trimestre</span>
            </dd>
          </div>
          <div>
            <dt>Predictores</dt>
            <dd>
              <span className="predictive-stat__value">{modelPerformance.predictors}</span>
              <span className="predictive-stat__caption">capital humano · empresa · instituciones · flujos</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );

  const steps = [
    {
      id: "sources",
      eyebrow: "Paso 6.1",
      title: "Microdatos y códigos de pregunta",
      body: (
        <>
          <p>
            Documentamos cada fuente y su rol en el pipeline: ENOE define el universo laboral con <code>emp_ppal</code>, <code>tue_ppal</code>,
            <code>seg_soc</code> y ponderadores <code>fac</code>; ENCIG aporta <code>P3_2</code>, <code>P8_3_1</code>, <code>P7_5</code> para medir corrupción
            y fricción; los Censos proveen productividad, capital y tamaño de planta para SCIAN 46-47.
          </p>
          <p className="mt-4">
            El objetivo es “ponerle apellido” a cada variable del modelo usando el mismo código que aparece en los cuestionarios originales.
            Así podemos rastrear cualquier insight hasta su pregunta primaria.
          </p>
        </>
      ),
    },
    {
      id: "etl",
      eyebrow: "Paso 6.2",
      title: "Crosswalk espacial y armonización temporal",
      body: (
        <>
          <p>
            El panel final es trimestral porque respeta la frecuencia ENOE. Creamos un crosswalk que estandariza claves CVE_ENT/CVE_MUN y conecta cada municipio
            con su Zona Metropolitana usando <code>Metropolis_2020.shp</code>. Variables de conteo se suman; intensidades se promedian ponderadas.
          </p>
          <p className="mt-4">
            Las fuentes desalineadas (Censos quinquenales, ENCIG bianual, Doing Business anual) se interpolan linealmente o se rellenan forward fill para evitar saltos
            artificiales. Todo desemboca en <code>informality_ml_panel.parquet</code> con 53 campos listos para model.ipynb.
          </p>
        </>
      ),
    },
    {
      id: "features",
      eyebrow: "Paso 6.3",
      title: "Ingeniería de características",
      body: (
        <>
          <p>
            Las transformaciones son explícitas: log(1+x) para finanzas con sesgos extremos, rezagos <code>Xₜ₋₁</code> y <code>Xₜ₋₄</code> para capturar inercia,
            discretización de <code>avg_workers_per_unit</code> en dummies y PCA para sintetizar los cinco indicadores de corrupción en un índice institucional.
          </p>
          <p className="mt-4">
            Todo se calcula respetando los factores de expansión <code>fac</code>; ningún KPI es un promedio simple. Así se mantiene proporcionalidad poblacional entre ZMs.
          </p>
        </>
      ),
    },
    {
      id: "modeling",
      eyebrow: "Paso 6.4",
      title: "Especificación XGBoost",
      body: (
        <>
          <p>
            El target es <code>rate_informal_empleo</code> (0–1). Alimentamos al modelo con bloques Demografía + Empresa + Instituciones + Flujos. Configuramos
            <code>objective = reg:squarederror</code>, <code>n_estimators ≈ 1000</code> con early stopping, <code>eta &lt; 0.1</code>, <code>max_depth 3–6</code> y
            regularización (γ &gt; 0, subsample 0.8) para privilegiar generalización.
          </p>
          <p className="mt-4">
            XGBoost permite capturar interacciones complejas (ej. baja escolaridad + soborno alto) sin sacrificar el control sobre hiperparámetros.
          </p>
        </>
      ),
    },
    {
      id: "validation",
      eyebrow: "Paso 6.5",
      title: "Validación rolling window",
      body: (
        <>
          <p>
            Entrenamos 2013–2015 → probamos 2016, luego extendemos hasta 2019 → probamos 2020. Nunca mezclamos información futura ni aleatorizamos los splits.
            Así emulamos un forecast real y demostramos robustez frente a shocks (2020).
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li>
              <strong>R² validación:</strong> {(modelPerformance.r2 * 100).toFixed(0)}% de la variación espacial explicada.
            </li>
            <li>
              <strong>RMSE:</strong> {(modelPerformance.rmse * 100).toFixed(1)} puntos porcentuales → error promedio ≈2 pp.
            </li>
            <li>Los hiperparámetros se afinan en grids cortos para evitar sobreajuste.</li>
          </ul>
        </>
      ),
    },
    {
      id: "shap_global",
      eyebrow: "Paso 6.6",
      title: "Explicabilidad global (SHAP)",
      body: (
        <>
          <p>
            SHAP descompone cada predicción en contribuciones marginales. El ranking global confirma que <code>mean_anios_esc</code> y <code>female_share</code>
            reducen informalidad, mientras que <code>bribe_share</code>, <code>tramite_time_days</code> o <code>seg_soc = 2</code> la elevan.
          </p>
          <p className="mt-4">
            Al citar los códigos originales mantenemos la trazabilidad hacia el cuestionario y reforzamos que los insights salen directamente de los microdatos.
          </p>
        </>
      ),
    },
    {
      id: "shap_explorer",
      eyebrow: "Paso 6.7",
      title: "Explorador temático",
      body: (
        <>
          <p>
            El filtro permite aislar capital humano, empresa, demografía o instituciones. Puedes ver sólo el bloque institucional para medir el costo de los sobornos
            (P8_3_1) o quedarte con capital humano para observar la relación casi monotónica de los años de escolaridad.
          </p>
          <p className="mt-4">
            Esta vista hace match con la narrativa cualitativa: cada bloque corresponde a un factor del marco conceptual y sostiene las decisiones de política.
          </p>
        </>
      ),
    },
    {
      id: "conclusion",
      eyebrow: "Paso 6.8",
      title: "Del modelo al territorio",
      body: (
        <>
          <p>
            El modelo es correlacional, pero las asociaciones coinciden con la evidencia causal previa. Con el score compuesto podemos detectar ZMs donde convergen
            baja escolaridad, microempresas y mala institucionalidad antes de cargar los mapas.
          </p>
          <p className="mt-4">
            Esta síntesis alimenta los perfiles y el mapa de calor que sigue: mantenemos la estética minimalista (tipografía + líneas) para que la atención se concentre
            en los datos, no en decoraciones.
          </p>
        </>
      ),
      footnote: "Los mapas siguientes reutilizan estos factores para mostrar dónde se acumulan los riesgos."
    },
  ];

  const graphics: Record<string, React.ReactNode> = {
    sources: <DataSourceMatrix />,
    etl: <PipelineTimeline />,
    features: <FeatureEngineeringBoard />,
    modeling: <ModelSpecPanel />,
    validation: <ValidationPanel />,
    shap_global: <ShapImportanceChart />,
    shap_explorer: <CategoryExplorer />,
    conclusion: <RiskAtlasBridge />,
  };

  return (
    <ScrollSection
      id="predictive-model"
      title="El Modelo Predictivo"
      eyebrow="Sección 6"
      lead="XGBoost y Explicabilidad (SHAP)"
      introContent={introContent}
      steps={steps}
  renderGraphic={(stepId) => graphics[stepId] ?? graphics.sources}
      background="light"
      className="section--scrolly scroll-section--predictive"
    />
  );
};
