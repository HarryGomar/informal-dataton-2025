import React from "react";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { productivityData } from "../../data/productivity";

interface ProductivityBySubsectorChartProps {
  view: "workers" | "value";
}

const chartFontFamily = "'Source Sans 3', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

const baseOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 12,
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        font: {
          family: chartFontFamily,
          size: 13,
        },
        color: "#0f1c12",
      },
    },
    tooltip: {
      backgroundColor: "rgba(18, 37, 26, 0.9)",
      padding: 14,
      titleFont: { family: "'Space Grotesk', 'Segoe UI', system-ui, sans-serif", size: 14 },
      bodyFont: { family: chartFontFamily, size: 13 },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(31, 44, 35, 0.08)",
      },
      ticks: {
        color: "#0f1c12",
        font: {
          family: chartFontFamily,
          size: 12,
        },
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#0f1c12",
        font: {
          family: chartFontFamily,
          size: 12,
        },
        maxRotation: 0,
        autoSkipPadding: 16,
      },
      border: {
        display: false,
      },
    },
  },
};

export const ProductivityBySubsectorChart: React.FC<ProductivityBySubsectorChartProps> = ({ view }) => {
  const labels = productivityData.map((item) => item.subsector);
  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: view === "workers" ? "Trabajadores formales" : "VA formal (mdp)",
        data: productivityData.map((item) => (view === "workers" ? item.formalWorkers : item.formalVA)),
        backgroundColor: "#1B5E20",
      },
      {
        label: view === "workers" ? "Trabajadores informales" : "VA informal (mdp)",
        data: productivityData.map((item) => (view === "workers" ? item.informalWorkers : item.informalVA)),
        backgroundColor: "#A5D6A7",
      },
    ],
  };

  return (
    <div className="productivity-chart">
      <Bar data={data} options={baseOptions} />
    </div>
  );
};
