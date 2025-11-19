import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import type { Chart as ChartJS, ChartData, ChartDataset, ChartOptions, Plugin } from "chart.js";
import { informalityTimeline, policyBands, timelineDomain, totalVariation } from "../../data/policies";
import type { PolicyBand } from "../../data/policies";
import { palette } from "../../theme/palette";

export type PolicyBandId = PolicyBand["id"];

type TimelineVariant = "card" | "full";

interface InformalityTimelineChartProps {
  activePolicyId?: PolicyBandId | null;
  showBands?: boolean;
  variant?: TimelineVariant;
  headline?: string;
  annotation?: string | null;
}

const datasetColor = palette.brand;

export const InformalityTimelineChart: React.FC<InformalityTimelineChartProps> = ({
  activePolicyId = null,
  showBands = true,
  variant = "card",
  headline = "A pesar de 25 años de reformas, la línea se mantiene casi plana",
  annotation = null,
}) => {
  type TimelinePoint = { x: number; y: number };

  const chartInstanceRef = useRef<ChartJS<"line", TimelinePoint[]> | null>(null);
  const setChartRef = useCallback((chart: ChartJS<"line", TimelinePoint[]> | null | undefined) => {
    if (!chart) {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
      return;
    }

    if (chartInstanceRef.current && chartInstanceRef.current !== chart) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = chart;
  }, []);

  useEffect(() => {
    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, []);

  const activePolicy = policyBands.find((band) => band.id === activePolicyId) ?? null;

  const basePoints: TimelinePoint[] = useMemo(() => {
    return informalityTimeline.map((point) => ({ x: point.position, y: point.rate }));
  }, []);

  const highlightPoints: TimelinePoint[] = useMemo(() => {
    if (!activePolicy) {
      return [];
    }

    return informalityTimeline
      .filter((point) => point.position >= activePolicy.highlightStart && point.position <= activePolicy.highlightEnd)
      .map((point) => ({ x: point.position, y: point.rate }));
  }, [activePolicy]);

  const chartData: ChartData<"line", TimelinePoint[]> = useMemo(() => {
    const datasets: ChartDataset<"line", TimelinePoint[]>[] = [
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
        const { top, bottom } = chart.chartArea;
        const xScale = scales.x;
        if (!xScale) {
          return;
        }

        policyBands.forEach((band) => {
          const start = xScale.getPixelForValue(band.startPosition);
          const end = xScale.getPixelForValue(band.endPosition);
          if (!Number.isFinite(start) || !Number.isFinite(end)) {
            return;
          }

          const width = end - start;
          ctx.save();
          ctx.fillStyle = band.id === activePolicyId ? "rgba(77, 114, 72, 0.18)" : "rgba(77, 114, 72, 0.05)";
          ctx.fillRect(start, top, width, bottom - top);
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
          min: timelineDomain.min,
          max: timelineDomain.max,
          ticks: {
            callback: (value) => `${Math.round(Number(value))}`,
            stepSize: 2,
            color: "#6b726f",
          },
          grid: {
            color: "rgba(31, 44, 35, 0.06)",
          },
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 70,
          ticks: {
            callback: (value) => `${value}%`,
            stepSize: 10,
            color: "#6b726f",
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

  return (
    <div className={`informality-timeline informality-timeline--${variant}`}>
      <div className="informality-timeline__frame">
        <header className="informality-timeline__meta">
          <div>
            <p className="informality-timeline__eyebrow">Variación total 2000–2025</p>
            <strong>{totalVariation.toFixed(2)} puntos porcentuales</strong>
          </div>
          <p className="informality-timeline__headline">{headline}</p>
        </header>
        <div className="informality-timeline__chart">
          <Line ref={setChartRef} data={chartData} options={options} plugins={plugins} datasetIdKey="label" />
        </div>
        {annotation && <p className="informality-timeline__annotation">{annotation}</p>}
      </div>
    </div>
  );
};
