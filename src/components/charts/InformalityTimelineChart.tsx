import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartDataset, ChartOptions, Plugin } from "chart.js";
import { informalityTimeline, policyBands } from "../../data/policies";
import type { PolicyBand } from "../../data/policies";
import { palette } from "../../theme/palette";

export type PolicyBandId = PolicyBand["id"];

type TimelineVariant = "card" | "full";

interface InformalityTimelineChartProps {
  activePolicyId?: PolicyBandId | null;
  showBands?: boolean;
  variant?: TimelineVariant;
}

const datasetColor = palette.brand;

export const InformalityTimelineChart: React.FC<InformalityTimelineChartProps> = ({
  activePolicyId = null,
  showBands = true,
  variant = "card",
}) => {
  const activePolicy = policyBands.find((band) => band.id === activePolicyId) ?? null;

  const basePoints = useMemo(() => {
    return informalityTimeline.map((point) => ({ x: point.year, y: point.rate }));
  }, []);

  const highlightPoints = useMemo(() => {
    if (!activePolicy) {
      return [];
    }

    return informalityTimeline
      .filter((point) => point.year >= activePolicy.highlightStartYear && point.year <= activePolicy.highlightEndYear)
      .map((point) => ({ x: point.year, y: point.rate }));
  }, [activePolicy]);

  const chartData: ChartData<"line"> = useMemo(() => {
    const datasets: ChartDataset<"line", { x: number; y: number }[]>[] = [
      {
        label: "Tasa de informalidad laboral (%)",
        data: basePoints,
        borderColor: "rgba(77, 114, 72, 0.35)",
        backgroundColor: "transparent",
        pointRadius: 0,
        tension: 0.2,
      },
    ];

    if (highlightPoints.length > 0) {
      datasets.push({
        label: "Política activa",
        data: highlightPoints,
        borderColor: datasetColor,
        backgroundColor: `${datasetColor}22`,
        pointBackgroundColor: palette.surfacePlain,
        pointBorderColor: datasetColor,
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.25,
      });
    }

    return { datasets };
  }, [basePoints, highlightPoints]);

  const bandPlugin = useMemo(() => {
    if (!showBands) {
      return null;
    }

    const plugin: Plugin<"line"> = {
      id: "policyBands",
      beforeDraw: (chart) => {
        if (!chart.chartArea) {
          return;
        }

        const { ctx, scales } = chart;
        const { top, bottom, left, right } = chart.chartArea;
        const xScale = scales.x;
        if (!xScale) {
          return;
        }

        policyBands.forEach((band) => {
          const start = xScale.getPixelForValue(band.startYear);
          const end = xScale.getPixelForValue(band.endYear);
          if (!Number.isFinite(start) || !Number.isFinite(end)) {
            return;
          }

          const width = end - start;
          ctx.save();
          ctx.fillStyle = band.id === activePolicyId ? "rgba(77, 114, 72, 0.18)" : "rgba(77, 114, 72, 0.08)";
          ctx.fillRect(start, top, width, bottom - top);

          if (band.id === activePolicyId) {
            ctx.fillStyle = palette.brandDark;
            ctx.font = "600 12px 'Inter', sans-serif";
            ctx.textBaseline = "top";
            const label = `${band.title} (${band.startYear}-${band.endYear})`;
            const textX = Math.min(Math.max(start + 8, left + 8), right - 140);
            ctx.fillText(label, textX, top + 8);
          }

          ctx.restore();
        });
      },
    };

    return plugin;
  }, [activePolicyId, showBands]);

  const markerPlugin = useMemo(() => {
    if (highlightPoints.length === 0) {
      return null;
    }

    const plugin: Plugin<"line"> = {
      id: "activeMarker",
      afterDatasetsDraw: (chart) => {
        if (!chart.scales.x || !chart.scales.y) {
          return;
        }

        const last = highlightPoints[highlightPoints.length - 1];
        const x = chart.scales.x.getPixelForValue(last.x);
        const y = chart.scales.y.getPixelForValue(last.y);
        const ctx = chart.ctx;
        ctx.save();
        ctx.fillStyle = palette.surfacePlain;
        ctx.strokeStyle = datasetColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      },
    };

    return plugin;
  }, [highlightPoints]);

  const options: ChartOptions<"line"> = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        x: {
          type: "linear",
          min: 1998,
          max: 2024,
          ticks: {
            callback: (value) => `${value}`,
            stepSize: 4,
          },
          grid: {
            color: "rgba(31, 44, 35, 0.08)",
          },
        },
        y: {
          beginAtZero: false,
          suggestedMin: 52,
          suggestedMax: 60,
          ticks: {
            callback: (value) => `${value}%`,
            stepSize: 1,
          },
          grid: {
            color: "rgba(31, 44, 35, 0.08)",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.y?.toFixed(1) ?? context.formattedValue}%`,
          },
        },
      },
    };
  }, []);

  const plugins = [bandPlugin, markerPlugin].filter(Boolean) as Plugin<"line">[];

  const calloutClass = activePolicy ? `policy-callout policy-callout--${activePolicy.placement}` : "policy-callout policy-callout--muted";

  return (
    <div className={`informality-timeline informality-timeline--${variant}`}>
      <div className="informality-timeline__frame">
        <div className="informality-timeline__chart">
          <Line data={chartData} options={options} plugins={plugins} />
        </div>
        {activePolicy ? (
          <div className={calloutClass}>
            <p className="policy-callout__eyebrow">{activePolicy.title}</p>
            <h4>
              {activePolicy.startYear} – {activePolicy.endYear}
            </h4>
            <p className="policy-callout__summary">{activePolicy.summary}</p>
            <p className="policy-callout__result">{activePolicy.result}</p>
          </div>
        ) : (
          <div className={calloutClass}>
            <p className="policy-callout__summary">
              Desplázate para activar cada política y ver cómo apenas altera la línea de informalidad.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
