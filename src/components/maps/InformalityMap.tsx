import React, { useEffect, useMemo, useRef } from "react";
import maplibregl, { Map as MapLibreMap } from "maplibre-gl";
import type { ExpressionSpecification, MapLayerMouseEvent } from "maplibre-gl";
import type { InformalityFeatureProperties } from "../../types/geography";
import { useInformalityGeoData } from "../../hooks/useInformalityGeoData";
import type { MapLayerConfig } from "./mapLayerConfig";

interface InformalityMapProps {
  layer: MapLayerConfig;
  controlsSlot?: React.ReactNode;
}

const SOURCE_ID = "informality-states";
const FILL_LAYER_ID = "informality-states-fill";
const OUTLINE_LAYER_ID = "informality-states-outline";

export const InformalityMap: React.FC<InformalityMapProps> = ({ layer, controlsSlot }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const layerRef = useRef(layer);
  const eventsBoundRef = useRef(false);
  const hoverHandlersRef = useRef<{
    move?: (event: MapLayerMouseEvent) => void;
    leave?: () => void;
  }>({});

  const { data, loading, error } = useInformalityGeoData();

  useEffect(() => {
    layerRef.current = layer;
    const map = mapRef.current;
    if (map && map.getLayer(FILL_LAYER_ID)) {
      applyLayerPaint(map, layer);
    }
  }, [layer]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: getStadiaStyleUrl(),
      center: [-102.5528, 23.6345],
      zoom: 4,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;
    popupRef.current = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: "informality-map-popup",
    });

    return () => {
      if (hoverHandlersRef.current.move) {
        map.off("mousemove", FILL_LAYER_ID, hoverHandlersRef.current.move);
      }
      if (hoverHandlersRef.current.leave) {
        map.off("mouseleave", FILL_LAYER_ID, hoverHandlersRef.current.leave);
      }
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
      eventsBoundRef.current = false;
      hoverHandlersRef.current = {};
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !data) {
      return;
    }

    const syncSourceAndLayers = () => {
      const existingSource = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
      if (existingSource) {
        existingSource.setData(data);
      } else {
        map.addSource(SOURCE_ID, {
          type: "geojson",
          data,
        });
      }

      ensureLayers(map);
      applyLayerPaint(map, layerRef.current);
      bindHoverHandlers(map);
    };

    if (map.isStyleLoaded()) {
      syncSourceAndLayers();
    } else {
      map.once("load", syncSourceAndLayers);
    }
  }, [data]);

  const legendGradient = useMemo(() => buildLegendGradient(layer), [layer]);

  return (
    <div className="map-wrapper">
      <div ref={containerRef} className="map-container map-container--choropleth" />

      <div className="map-overlay">
        <div className="map-info-card">
          {layer.eyebrow && <p className="map-info-card__eyebrow">{layer.eyebrow}</p>}
          <h3 className="map-info-card__title">{layer.label}</h3>
          {layer.description && <p className="map-info-card__description">{layer.description}</p>}
          <div className="map-legend">
            <span>{layer.legend.minLabel}</span>
            <div className="map-legend-gradient" style={{ backgroundImage: legendGradient }} />
            <span>{layer.legend.maxLabel}</span>
          </div>
          {(loading || error) && (
            <div className="map-status-pill">
              {loading ? "Cargando datos…" : error?.message ?? "Error"}
            </div>
          )}
        </div>

        {controlsSlot && <div className="map-controls-card">{controlsSlot}</div>}
      </div>
    </div>
  );

  function bindHoverHandlers(map: MapLibreMap) {
    if (eventsBoundRef.current || !popupRef.current) {
      return;
    }

    const handleMove = (event: MapLayerMouseEvent) => {
      map.getCanvas().style.cursor = "pointer";
      const feature = event.features?.[0];
      if (!feature?.properties) {
        popupRef.current?.remove();
        return;
      }
      const properties = feature.properties as unknown as InformalityFeatureProperties;
      showPopup(map, popupRef.current!, properties, layerRef.current, event.lngLat.lng, event.lngLat.lat);
    };

    const handleLeave = () => {
      map.getCanvas().style.cursor = "";
      popupRef.current?.remove();
    };

    hoverHandlersRef.current = {
      move: handleMove,
      leave: handleLeave,
    };

    map.on("mousemove", FILL_LAYER_ID, handleMove);
    map.on("mouseleave", FILL_LAYER_ID, handleLeave);
    eventsBoundRef.current = true;
  }
};

function buildLegendGradient(layer: MapLayerConfig) {
  const [min, max] = layer.domain;
  if (max - min <= 0) {
    return "linear-gradient(90deg, #d1d5db, #111827)";
  }
  const stops = layer.palette
    .map(([value, color]) => {
      const position = ((value - min) / (max - min)) * 100;
      const clamped = Math.min(100, Math.max(0, position));
      return `${color} ${clamped.toFixed(2)}%`;
    })
    .join(", ");
  return `linear-gradient(90deg, ${stops})`;
}

function buildColorExpression(layer: MapLayerConfig): ExpressionSpecification {
  const expression: (string | number | unknown[])[] = [
    "interpolate",
    ["linear"],
    ["coalesce", ["to-number", ["get", layer.property]], 0],
  ];
  layer.palette.forEach(([value, color]) => {
    expression.push(value, color);
  });
  return expression as ExpressionSpecification;
}

function ensureLayers(map: MapLibreMap) {
  if (!map.getLayer(FILL_LAYER_ID)) {
    map.addLayer({
      id: FILL_LAYER_ID,
      type: "fill",
      source: SOURCE_ID,
      paint: {
        "fill-opacity": 0.85,
        "fill-color": "#cccccc",
      },
    });
  }
  if (!map.getLayer(OUTLINE_LAYER_ID)) {
    map.addLayer({
      id: OUTLINE_LAYER_ID,
      type: "line",
      source: SOURCE_ID,
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.8,
      },
    });
  }
}

function applyLayerPaint(map: MapLibreMap, config: MapLayerConfig) {
  const colorExpression = buildColorExpression(config);
  if (map.getLayer(FILL_LAYER_ID)) {
    map.setPaintProperty(FILL_LAYER_ID, "fill-color", colorExpression);
  }
}

function showPopup(
  map: MapLibreMap,
  popup: maplibregl.Popup,
  properties: InformalityFeatureProperties,
  config: MapLayerConfig,
  lng: number,
  lat: number,
) {
  const displayKey = config.displayProperty ?? config.property;
  const rawValue = Number(properties?.[displayKey]);
  const formatted = config.formatValue ? config.formatValue(rawValue, properties) : `${rawValue}`;

  const html = `
    <div class="map-popup">
      <p class="map-popup__eyebrow">${config.label}</p>
      <p class="map-popup__title">${properties?.stateName ?? ""}</p>
      <p class="map-popup__metric">${formatted}</p>
    </div>
  `;

  popup.setLngLat([lng, lat]).setHTML(html).addTo(map);
}

function getStadiaStyleUrl() {
  const apiKey = import.meta.env.VITE_STADIA_API_KEY;
  const base = "https://tiles.stadiamaps.com/styles/stamen_terrain.json";
  return apiKey ? `${base}?api_key=${apiKey}` : base;
}
