import React from "react";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { productivityData } from "../../data/productivity";

interface ProductivityBySubsectorChartProps {
  view: "workers" | "value";
}

const baseOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
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
    <div style={{ height: "360px" }}>
      <Bar data={data} options={baseOptions} />
    </div>
  );
};
