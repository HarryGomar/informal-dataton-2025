import React from "react";
import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { socialSecurityImpact } from "../../data/costs";
import { formatMillions } from "./chartConfig";

type Segment = "imss" | "infonavit" | "pensions";

interface SocialSecurityDonutChartProps {
  highlight?: Segment | null;
}

const getTotal = () =>
  socialSecurityImpact.imssPatronal +
  socialSecurityImpact.imssObrera +
  socialSecurityImpact.infonavit +
  socialSecurityImpact.pensions;

const colors: Record<Segment, string> = {
  imss: "#4D7248",
  infonavit: "#C3A86B",
  pensions: "#D27F6C",
};

export const SocialSecurityDonutChart: React.FC<SocialSecurityDonutChartProps> = ({
  highlight = null,
}) => {
  const data: ChartData<"doughnut"> = {
    labels: ["IMSS", "INFONAVIT", "Pensiones"],
    datasets: [
      {
        label: "Aportaciones perdidas",
        data: [
          socialSecurityImpact.imssPatronal + socialSecurityImpact.imssObrera,
          socialSecurityImpact.infonavit,
          socialSecurityImpact.pensions,
        ],
        backgroundColor: ["imss", "infonavit", "pensions"].map((key) => {
          const typedKey = key as Segment;
          const base = colors[typedKey];
          return highlight && highlight !== typedKey ? `${base}40` : base;
        }),
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "65%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${formatMillions(context.parsed ?? 0)}`,
        },
      },
    },
  };

  return (
    <div className="donut-chart">
      <Doughnut data={data} options={options} />
      <div className="donut-chart__center">
        <p>Aportaciones perdidas</p>
        <strong>{formatMillions(getTotal())}</strong>
      </div>
    </div>
  );
};
