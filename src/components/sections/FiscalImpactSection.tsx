import React from "react";
import { ScrollSection } from "../layout/ScrollSection";
import type { ScrollStepConfig } from "../../types/sections";
import { FiscalBalanceSheet } from "../charts/FiscalBalanceSheet";

type HighlightKey = "iva" | "isrWorkers" | "isrOwners" | null;

const steps: ScrollStepConfig[] = [
  {
    id: "overview",
    title: "Impacto fiscal: impuestos que no se recaudan",
    body:
      "La informalidad implica que ingresos y ventas se registran fuera del radar del SAT. Estimamos la evasión anual en comercio informal en 16.4 mil millones de pesos.",
  },
  {
    id: "workers",
    title: "ISR de trabajadores",
    body: (
      <>
        <p>≈ 2,049 mdp dejan de entrar porque los trabajadores informales no pagan ISR. Es un salario que no contribuye a los bienes públicos que consumen.</p>
        <details className="calculation-details">
          <summary>Cómo lo calculamos</summary>
          <div className="calculation-content">
            <p><strong>Evasión de ISR de asalariados:</strong> ~2,048.66 millones de pesos</p>
            <p><strong>Cálculo:</strong> Para calcular esta cifra buscamos las tablas de ISR de 2023 anual y con base al salario promedio por sector (comercio al por mayor o al por menor), calculamos el ISR promedio por persona remunerada y lo multiplicamos por el número de remunerados. Al final sumamos la evasión en cada sector.</p>
          </div>
        </details>
      </>
    ),
  },
  {
    id: "owners",
    title: "ISR de dueños/empresas",
    body: (
      <>
        <p>≈ 2,109 mdp corresponden a propietarios de negocios informales que no declaran utilidades. El régimen simplificado apenas los toca.</p>
        <details className="calculation-details">
          <summary>Cómo lo calculamos</summary>
          <div className="calculation-content">
            <p><strong>Evasión de ISR de dueños/empresas:</strong> ~2,108.53 millones de pesos</p>
            <p><strong>Cálculo:</strong> Para calcular esta cifra calculamos la proporción de personas dueñas y no remuneradas como el numero de dueños entre el total de ocupados, y ASUMIMOS el valor agregado que crean estas personas es igual al producto entre este factor de proporción y el valor agregado del sector. Con base en esto pudimos aproximar cuánto valor genera en promedio un dueño en una de estos establecimientos. Posteriormente lo multiplicamos por la tasa que correspondía en las tablas de RESICO.</p>
          </div>
        </details>
      </>
    ),
  },
  {
    id: "iva",
    title: "IVA en ventas",
    body: (
      <>
        <p>El gran boquete: ≈ 12,272 mdp en IVA no se recauda porque las ventas informales evitan facturar. Cada punto porcentual financiaba hospitales, carreteras y escuelas.</p>
        <details className="calculation-details">
          <summary>Cómo lo calculamos</summary>
          <div className="calculation-content">
            <p><strong>Evasión de IVA:</strong> ~12,272.43 millones de pesos</p>
            <p><strong>Cálculo:</strong> Sumamos el valor agregado de ambos sectores y le restamos el valor agregado de los sub sectores que se dediquen a la venta de alimentos y bebidas, ya que estos son tasa cero (431: Comercio al por mayor de alimentos, bebidas y tabaco, 461: Comercio al por menor de abarrotes, alimentos, bebidas, hielo y tabaco , 463: Comercio al por menor en tiendas de autoservicio y departamentales (incluyen gran parte de alimentos, pero al final estamos subestimando porque también venden otras cosas que no son tasa cero)). Posteriormente, lo multiplicamos por .16.</p>
          </div>
        </details>
      </>
    ),
    footnote: "En la visual se incluyen íconos de infraestructura para recordar el destino potencial del IVA.",
  },
];

const highlightMap: Record<string, HighlightKey> = {
  overview: null,
  workers: "isrWorkers",
  owners: "isrOwners",
  iva: "iva",
};

export const FiscalImpactSection: React.FC = () => {
  return (
    <ScrollSection
      id="fiscal-impact"
      eyebrow="Paso 2.2"
      title="El agujero fiscal en ISR e IVA"
      lead="El comercio informal erosiona la recaudación federal. La suma de ISR de trabajadores y dueños, más el IVA no cobrado, equivale a proyectos completos de infraestructura y servicios públicos."
      steps={steps}
      background="muted"
      renderGraphic={(activeStepId) => (
        <div className="scroll-graphic-stack" style={{ width: '100%' }}>
          <FiscalBalanceSheet highlight={highlightMap[activeStepId]} />
        </div>
      )}
    />
  );
};
