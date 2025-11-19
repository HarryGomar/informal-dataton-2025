import React, { useState } from "react";
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

// --- Sub-components ---

const ModelSetupCard: React.FC = () => (
  <div className="p-6 bg-white rounded-lg shadow-md border border-emerald-100">
    <h3 className="text-xl font-bold text-emerald-800 mb-4">Modelo XGBoost – Comercio</h3>
    <ul className="space-y-3 text-slate-700">
      <li className="flex items-start">
        <span className="mr-2 text-emerald-500">•</span>
        <span>
          <strong>Observaciones:</strong> ~{modelPerformance.observations.toLocaleString()} (municipio/ZM × año {modelPerformance.period})
        </span>
      </li>
      <li className="flex items-start">
        <span className="mr-2 text-emerald-500">•</span>
        <span>
          <strong>Predictores:</strong> {modelPerformance.predictors} variables (educación, demografía, empresa, instituciones)
        </span>
      </li>
      <li className="flex items-start">
        <span className="mr-2 text-emerald-500">•</span>
        <span>
          <strong>Target:</strong> Tasa de informalidad en comercio
        </span>
      </li>
      <li className="flex items-start">
        <span className="mr-2 text-emerald-500">•</span>
        <span>
          <strong>Algoritmo:</strong> XGBoost (árboles de decisión en boosting)
        </span>
      </li>
    </ul>
  </div>
);

const ModelPerformanceCard: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#5F8D65] text-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8 flex-grow flex flex-col justify-center items-center text-center border-b border-emerald-700/30">
        <h3 className="text-2xl font-light mb-2">Resultados del</h3>
        <h2 className="text-4xl font-bold mb-8">XG-BOOST</h2>
        
        <div className="text-8xl font-bold tracking-tighter mb-2">
          R2 = {modelPerformance.r2}
        </div>
      </div>
      
      <div className="p-6 bg-[#537e58]">
        <h4 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
          Variables usadas = {modelPerformance.predictors}
        </h4>
        <ul className="space-y-2 text-sm font-medium">
          <li className="flex justify-between">
            <span>Composición y capital humano:</span>
            <span className="font-bold">{modelPerformance.variableCounts.human_capital}</span>
          </li>
          <li className="flex justify-between">
            <span>Productividad y capital:</span>
            <span className="font-bold">{modelPerformance.variableCounts.productivity}</span>
          </li>
          <li className="flex justify-between">
            <span>Estructura empresarial:</span>
            <span className="font-bold">{modelPerformance.variableCounts.enterprise}</span>
          </li>
          <li className="flex justify-between">
            <span>Instituciones y trámites:</span>
            <span className="font-bold">{modelPerformance.variableCounts.institution}</span>
          </li>
          <li className="flex justify-between">
            <span>Flujos externos:</span>
            <span className="font-bold">{modelPerformance.variableCounts.external}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ShapImportanceChart: React.FC<{ filterCategory?: string }> = ({ filterCategory }) => {
  const filteredVariables = filterCategory 
    ? shapVariables.filter(v => v.category === filterCategory)
    : shapVariables;

  // Sort by importance
  const sortedVariables = [...filteredVariables].sort((a, b) => b.importance - a.importance);
  const formatShapLabel = (label: string) => (label.length > 26 ? `${label.slice(0, 24)}…` : label);
  const yTickFontSize = sortedVariables.length > 10 ? 11 : 13;
  const chartMinHeight = Math.max(360, sortedVariables.length * 34);

  const data = {
    labels: sortedVariables.map(v => v.label),
    datasets: [
      {
        label: 'Impacto SHAP (promedio absoluto)',
        data: sortedVariables.map(v => v.importance),
        backgroundColor: '#86b086',
        borderColor: '#5F8D65',
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 32,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const variable = sortedVariables[context.dataIndex];
            return `${variable.description} (SHAP: ${variable.importance})`;
          }
        },
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#f1f5f9',
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#64748b',
          maxTicksLimit: 4,
        },
        border: {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: yTickFontSize,
            weight: 600,
          },
          color: '#334155',
          autoSkip: false,
          mirror: false,
          padding: 10,
          callback: (value: string | number) => formatShapLabel(String(value)),
        },
        border: {
          display: false,
        }
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 12,
        top: 20,
        bottom: 20
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-emerald-100 h-full flex flex-col">
      <h3 className="text-xl font-bold text-emerald-800 mb-6">
        Importancia de Variables (SHAP)
        {filterCategory && <span className="text-sm font-normal text-slate-500 ml-2">({filterCategory})</span>}
      </h3>
      <div className="flex-grow w-full" style={{ minHeight: `${chartMinHeight}px` }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

const CategoryExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const categories = [
    { id: undefined, label: "Todos" },
    { id: "human_capital", label: "Capital Humano" },
    { id: "enterprise", label: "Empresa" },
    { id: "demography", label: "Demografía" },
    { id: "institution", label: "Instituciones" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeCategory === cat.id
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex-grow">
        <ShapImportanceChart filterCategory={activeCategory} />
      </div>
    </div>
  );
};

// --- Main Section Component ---

export const PredictiveModelSection: React.FC = () => {
  const steps = [
    {
      id: "setup",
      title: "Validando los factores con datos: el modelo XGBoost",
      body: (
        <>
          <p>
            Tras identificar estos cuatro factores estructurales en la literatura, quisimos validarlos y afinarlos con datos propios enfocados en el sector comercio. Para ello construimos un modelo predictivo de la tasa de informalidad usando machine learning.
          </p>
          <p className="mt-4">
            Utilizamos <strong>XGBoost</strong>, un algoritmo de <em>boosting</em> de árboles de decisión, sobre datos a nivel municipal y de zonas metropolitanas para el periodo aproximado <strong>2013–2020</strong>.
          </p>
          <p className="mt-4">
            ¿Por qué XGBoost? Porque la informalidad es un fenómeno complejo: queríamos capturar <strong>relaciones no lineales e interacciones</strong> entre decenas de variables socioeconómicas. XGBoost nos permitió usar <strong>más de 50 predictores</strong> sin imponer una forma funcional fija.
          </p>
        </>
      ),
    },
    {
      id: "performance",
      title: "Entrenamiento y validación: rigor técnico",
      body: (
        <>
          <p>
            Para evitar sobreajuste y respetar la naturaleza temporal de los datos, utilizamos una validación cruzada temporal tipo “expanding window”. Esta estrategia imita un escenario realista de pronóstico (<em>train pasado → predecir futuro</em>).
          </p>
          <p className="mt-4">
            El resultado: <strong>R² de validación ≈ {modelPerformance.r2}</strong> y <strong>RMSE ≈ {modelPerformance.rmse}</strong> para el sector comercio.
          </p>
          <p className="mt-4">
            Es decir, el modelo explica alrededor del <strong>80% de la variación</strong> de la informalidad entre municipios y se equivoca en promedio sólo <strong>2 puntos porcentuales</strong>.
          </p>
        </>
      ),
    },
    {
      id: "shap_global",
      title: "¿Qué variables pesan más? Análisis SHAP",
      body: (
        <>
          <p>
            Más allá del buen desempeño, el modelo es interpretable gracias a los valores SHAP. El análisis SHAP descompone cada predicción en contribuciones de cada variable, permitiéndonos medir <strong>qué tanto empuja cada factor la informalidad hacia arriba o hacia abajo</strong>.
          </p>
          <p className="mt-4">
            Los resultados confirman y afinan los insights de la literatura:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-2 ml-2">
            <li><strong>Educación promedio</strong> es el predictor #1 (impacto negativo).</li>
            <li><strong>Tamaño de empresa</strong> es el predictor #2 (impacto negativo).</li>
            <li><strong>Corrupción</strong> y factores institucionales tienen impacto positivo.</li>
          </ol>
        </>
      ),
    },
    {
      id: "shap_explorer",
      title: "Explorador de importancia por categoría",
      body: (
        <>
          <p>
            Para conectar mejor con el marco teórico, agrupamos los predictores en cuatro categorías:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
            <li><strong>Capital humano</strong> (educación, habilidades).</li>
            <li><strong>Estructura empresarial</strong> (tamaño, productividad).</li>
            <li><strong>Demografía</strong> (edad, género).</li>
            <li><strong>Instituciones</strong> (corrupción, inseguridad).</li>
          </ul>
          <p className="mt-4">
            En el gráfico, puedes <strong>filtrar por categoría</strong> para aislar el impacto de factores específicos.
          </p>
        </>
      ),
    },
    {
      id: "conclusion",
      title: "Asocio, no causalidad… pero consistente",
      body: (
        <>
          <p>
            Es importante subrayar que nuestro modelo es correlacional. Por prudencia hablamos de que “la escolaridad está asociada a menor informalidad” en vez de afirmar causalidad determinista.
          </p>
          <p className="mt-4">
            Sin embargo, al combinar estos resultados con estudios causales de la literatura, podemos inferir direcciones plausibles. Lo crucial es que el modelo <strong>traduce la teoría a datos locales</strong> y nos permite ver <strong>en qué municipios</strong> confluyen múltiples factores de riesgo.
          </p>
          <p className="mt-4">
            Esa combinación es la que usaremos en la siguiente sección para <strong>definir perfiles humanos</strong> y <strong>mapear dónde se concentran</strong>.
          </p>
        </>
      ),
    },
  ];

  const renderGraphic = (stepId: string) => {
    switch (stepId) {
      case "setup":
        return <ModelSetupCard />;
      case "performance":
        return <ModelPerformanceCard />;
      case "shap_global":
        return <ShapImportanceChart />;
      case "shap_explorer":
        return <CategoryExplorer />;
      case "conclusion":
        // Reusing SHAP chart or could be a heatmap placeholder
        return (
            <div className="relative">
                <ShapImportanceChart />
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm rounded-lg">
                    <div className="text-center p-6">
                        <h4 className="text-xl font-bold text-emerald-800 mb-2">Hacia los Perfiles</h4>
                        <p className="text-slate-600">
                            Estos factores nos permiten identificar<br/>
                            <strong>quiénes son</strong> y <strong>dónde están</strong><br/>
                            los informales.
                        </p>
                    </div>
                </div>
            </div>
        );
      default:
        return <ModelSetupCard />;
    }
  };

  return (
    <ScrollSection
      id="predictive-model"
      title="El Modelo Predictivo"
      eyebrow="Sección 6"
      lead="XGBoost y Explicabilidad (SHAP)"
      steps={steps}
      renderGraphic={renderGraphic}
      background="light"
    />
  );
};
