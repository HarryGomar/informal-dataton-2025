import React, { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Section } from "../layout/Section";
import { ScrollSection } from "../layout/ScrollSection";
import { profiles } from "../../data/profiles";
import type { Profile } from "../../data/profiles";
import {
  IconCareWork,
  IconMicroenterprise,
  IconInstitution,
} from "../icons/FactorIcons";
import { InformalityMap } from "../maps/InformalityMap";
import {
  PROFILE_METRIC_OPTIONS,
  getProfileLayerConfig,
} from "../maps/mapLayerConfig";
import type { ProfileMetricType } from "../maps/mapLayerConfig";
import type { ProfileLayerId } from "../../types/geography";
import { PROFILE_LAYER_LABELS } from "../../types/geography";
import type { ScrollStepConfig } from "../../types/sections";

const PROFILE_ID_ORDER: ProfileLayerId[] = ["microtrap", "desalentados", "cuidadoras"];
const PROFILE_STEP_MAP: Record<string, ProfileLayerId> = {
  microtrap: "microtrap",
  desalentados: "desalentados",
  cuidadoras: "cuidadoras",
};
const INTERACTIVE_STEPS = new Set(["explore", "policy"]);

const PROFILE_COORDINATES: Record<ProfileLayerId, { x: number; y: number }> = {
  microtrap: { x: 50, y: 18 },
  desalentados: { x: 78, y: 80 },
  cuidadoras: { x: 22, y: 80 },
};

type TriangleNodeStyle = CSSProperties & {
  "--triangle-x"?: string;
  "--triangle-y"?: string;
};

type TriangleTooltipStyle = CSSProperties & {
  "--tooltip-x"?: string;
  "--tooltip-y"?: string;
};

const profileDictionary = profiles.reduce<Record<ProfileLayerId, Profile>>((acc, profile) => {
  acc[profile.id] = profile;
  return acc;
}, {} as Record<ProfileLayerId, Profile>);

interface ProfileMapControlsProps {
  profile: ProfileLayerId;
  metric: ProfileMetricType;
  onProfileChange: (value: ProfileLayerId) => void;
  onMetricChange: (value: ProfileMetricType) => void;
}

const ProfileMapControls: React.FC<ProfileMapControlsProps> = ({
  profile,
  metric,
  onProfileChange,
  onMetricChange,
}) => (
  <form className="profile-map-controls" aria-label="Filtros del mapa de perfiles">
    <label className="profile-map-controls__field">
      <span>Perfil</span>
      <select
        value={profile}
        onChange={(event) => onProfileChange(event.target.value as ProfileLayerId)}
      >
        {PROFILE_ID_ORDER.map((id) => (
          <option key={id} value={id}>
            {PROFILE_LAYER_LABELS[id]}
          </option>
        ))}
      </select>
    </label>
    <label className="profile-map-controls__field">
      <span>Métrica</span>
      <select
        value={metric}
        onChange={(event) => onMetricChange(event.target.value as ProfileMetricType)}
      >
        {Object.entries(PROFILE_METRIC_OPTIONS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </label>
  </form>
);

interface TriangleNodeProps {
  profile: Profile;
  order: number;
  position: "top" | "left" | "right";
  isActive: boolean;
  onSelect: (profileId: ProfileLayerId) => void;
  onFocusProfile: (profileId: ProfileLayerId | null) => void;
  coordinates: { x: number; y: number };
}

const TriangleNode: React.FC<TriangleNodeProps> = ({
  profile,
  order,
  position,
  isActive,
  onSelect,
  onFocusProfile,
  coordinates,
}) => {
  const Icon =
    profile.icon === "care"
      ? IconCareWork
      : profile.icon === "micro"
      ? IconMicroenterprise
      : IconInstitution;

  const nodeStyle: TriangleNodeStyle = {
    "--triangle-x": `${coordinates.x}%`,
    "--triangle-y": `${coordinates.y}%`,
  };

  return (
    <button
      type="button"
      aria-label={`Perfil ${order}: ${profile.title}`}
      className={`profiles-triangle__node profiles-triangle__node--${position} ${
        isActive ? "is-active" : ""
      }`}
      style={nodeStyle}
      onClick={() => onSelect(profile.id)}
      onMouseEnter={() => onFocusProfile(profile.id)}
      onMouseLeave={() => onFocusProfile(null)}
      onFocus={() => onFocusProfile(profile.id)}
      onBlur={() => onFocusProfile(null)}
    >
      <span className="profiles-triangle__badge">{order}</span>
      <div className="profiles-triangle__glyph" aria-hidden="true">
        <Icon />
      </div>
    </button>
  );
};

interface TriangleCopyProps {
  profile: Profile;
  order: number;
  position: "top" | "right" | "left";
  isActive: boolean;
  onSelect: (profileId: ProfileLayerId) => void;
  onFocusProfile: (profileId: ProfileLayerId | null) => void;
}

const TriangleCopy: React.FC<TriangleCopyProps> = ({
  profile,
  order,
  position,
  isActive,
  onSelect,
  onFocusProfile,
}) => (
  <article
    className={`profiles-triangle__copy profiles-triangle__copy--${position} ${isActive ? "is-active" : ""}`}
  >
    <button
      type="button"
      className="profiles-triangle__copy-trigger"
      aria-pressed={isActive}
      onClick={() => onSelect(profile.id)}
      onMouseEnter={() => onFocusProfile(profile.id)}
      onMouseLeave={() => onFocusProfile(null)}
      onFocus={() => onFocusProfile(profile.id)}
      onBlur={() => onFocusProfile(null)}
    >
      <span className="profiles-triangle__copy-eyebrow">Perfil {order}</span>
      <h3>{profile.title}</h3>
    </button>
    <p>{profile.triangleHook}</p>
  </article>
);

const PROFILE_POSITION_CLASS: Record<ProfileLayerId, "top" | "right" | "left"> = {
  microtrap: "top",
  desalentados: "right",
  cuidadoras: "left",
};

const TOOLTIP_OFFSETS: Record<"top" | "right" | "left", { x: number; y: number }> = {
  top: { x: 0, y: -14 },
  right: { x: 10, y: -6 },
  left: { x: -10, y: -6 },
};

const TriangleTooltip: React.FC<{
  profile: Profile;
  position: "top" | "right" | "left";
  coordinates: { x: number; y: number };
}> = ({ profile, position, coordinates }) => {
  const offset = TOOLTIP_OFFSETS[position];
  const tooltipStyle: TriangleTooltipStyle = {
    "--tooltip-x": `${coordinates.x + offset.x}%`,
    "--tooltip-y": `${coordinates.y + offset.y}%`,
  };

  return (
    <div
      className={`profiles-triangle__tooltip profiles-triangle__tooltip--${position}`}
      style={tooltipStyle}
    >
    <p className="profiles-triangle__tooltip-eyebrow">{PROFILE_LAYER_LABELS[profile.id]}</p>
    <h5>{profile.headline}</h5>
    <p>{profile.fullDescription}</p>
    <ul>
      {profile.needs.map((need) => (
        <li key={need}>{need}</li>
      ))}
    </ul>
    </div>
  );
};

interface DisclosureProps {
  summary: string;
  questions: string[];
  dataPoints: string[];
}

const DetailsDisclosure: React.FC<DisclosureProps> = ({ summary, questions, dataPoints }) => (
  <details className="profiles-disclosure">
    <summary>{summary}</summary>
    <div className="profiles-disclosure__body">
      <div>
        <p className="profiles-disclosure__label">Preguntas que guiaron esta vista</p>
        <ul>
          {questions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="profiles-disclosure__label">Datos y columnas utilizadas</p>
        <ul>
          {dataPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </details>
);

const buildProfileStep = (profile: Profile, order: number): ScrollStepConfig => ({
  id: profile.id,
  eyebrow: `Perfil ${order}`,
  title: profile.title,
  body: (
    <div className="profiles-step-body">
      <p>{profile.fullDescription}</p>
      <ul className="profiles-step-list">
        {profile.needs.map((need) => (
          <li key={need}>{need}</li>
        ))}
      </ul>
      <DetailsDisclosure
        summary="Preguntas & datos"
        questions={[
          "¿En qué municipios domina este perfil?",
          "¿Qué barrera específica lo mantiene informal?",
        ]}
        dataPoints={[`Máscara: ${profile.logic.mask.join(" · ")}`, ...profile.logic.dataSignals]}
      />
    </div>
  ),
});

export const ProfilesSection: React.FC = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<ProfileLayerId>(PROFILE_ID_ORDER[0]);
  const [hoveredProfileId, setHoveredProfileId] = useState<ProfileLayerId | null>(null);
  const [metricFilter, setMetricFilter] = useState<ProfileMetricType>("share_pct");

  const steps: ScrollStepConfig[] = useMemo(
    () => {
      const introStep: ScrollStepConfig = {
        id: "overview",
        title: "83% de la variación, explicado sin ruido",
        body: (
          <div className="profiles-step-body">
            <p>
              Tres máscaras bastan para capturar el 83 % de la varianza municipal de la informalidad en comercio. No son personajes inventados, sino concentrados de variables de educación, tamaño de negocio, entorno delictivo y cuidados.
            </p>
            <DetailsDisclosure
              summary="Ver metodología"
              questions={[
                "¿Cómo se llegó al 83 %?",
                "¿Qué fuentes alimentan `profiles_mun.parquet`?",
              ]}
              dataPoints={[
                "Modelo lineal regularizado (R² municipal 0.83)",
                "Microdatos ENOE/ENCIG 2022",
                "Agregación por municipio/ZM",
              ]}
            />
          </div>
        ),
      };

      const profileSteps = PROFILE_ID_ORDER.map((id, index) => buildProfileStep(profileDictionary[id], index + 1));

      const exploreStep: ScrollStepConfig = {
        id: "explore",
        title: "Explora el mapa",
        body: (
          <div className="profiles-step-body">
            <p>
              Usa los selectores para alternar el perfil activo y la métrica (participación, ranking o conteo). Observa cómo cambia la geografía y detecta hotspots que requieran intervención.
            </p>
            <DetailsDisclosure
              summary="Preguntas & datos"
              questions={["¿Qué municipios concentran el perfil?", "¿Cómo varía el share vs. el conteo?"]}
              dataPoints={["`profile_*_share`", "`profile_*_count`", "`informal_com_occ`"]}
            />
          </div>
        ),
      };

      const policyStep: ScrollStepConfig = {
        id: "policy",
        title: "De perfiles a políticas",
        body: (
          <div className="profiles-step-body">
            <p>
              Con los perfiles identificados podemos diseñar rutas diferenciadas: cuidados y flexibilidad para Cuidadoras, productividad y crédito para Atrapados, seguridad y simplificación para Desalentados.
            </p>
            <DetailsDisclosure
              summary="Checklist de decisión"
              questions={["¿Qué incentivos priorizar por municipio?", "¿Qué indicador gatilla una intervención?"]}
              dataPoints={["`profile_*_share` > 40% → acción inmediata", "Cruzar con tasas de delitos, brecha de cuidados"]}
            />
          </div>
        ),
      };

      return [introStep, ...profileSteps, exploreStep, policyStep];
    },
    [],
  );

  const renderGraphic = (stepId: string) => {
    const forcedProfile = PROFILE_STEP_MAP[stepId];
    const profileForMap = forcedProfile ?? selectedProfileId;
    const metricForMap: ProfileMetricType = forcedProfile ? "share_pct" : metricFilter;
    const showControls = INTERACTIVE_STEPS.has(stepId);
    const layerConfig = getProfileLayerConfig(profileForMap, metricForMap);

    return (
      <div className="map-panel">
        <InformalityMap
          layer={layerConfig}
          controlsSlot={
            showControls ? (
              <ProfileMapControls
                profile={selectedProfileId}
                metric={metricFilter}
                onProfileChange={(value) => {
                  setSelectedProfileId(value);
                  setHoveredProfileId(null);
                }}
                onMetricChange={setMetricFilter}
              />
            ) : undefined
          }
        />
      </div>
    );
  };

  const handleStepChange = (stepId: string) => {
    const forcedProfile = PROFILE_STEP_MAP[stepId];
    if (forcedProfile && forcedProfile !== selectedProfileId) {
      setSelectedProfileId(forcedProfile);
      setHoveredProfileId(null);
    }
  };

  return (
    <>
      <Section id="profiles" tone="plain" layout="full" className="profiles-section">
        <div className="profiles-band profiles-hero" data-band="hero">
          <div className="profiles-hero__text">
            <p className="eyebrow">Sección 7</p>
            <h2>Perfiles de informalidad: datos que se convierten en historia humana</h2>
            <p>
              Destilamos más de 20 variables en solo tres arquetipos. Cada uno sintetiza causas y necesidades específicas para intervenir sin disparar a ciegas.
            </p>
          </div>
          <div className="profiles-hero__meta">
            <p className="eyebrow">Pipeline</p>
            <ul>
              <li>Microdatos ENOE / ENCIG 2022</li>
              <li>Máscaras lógicas → `profiles_mun.parquet`</li>
              <li>Visualización sincronizada (triángulo + mapa)</li>
            </ul>
          </div>
        </div>

        <div className="profiles-band" data-band="triangle">
          <div className="profiles-triangle">
            {PROFILE_ID_ORDER.map((profileId, index) => (
              <TriangleCopy
                key={`copy-${profileId}`}
                profile={profileDictionary[profileId]}
                order={index + 1}
                position={PROFILE_POSITION_CLASS[profileId]}
                isActive={selectedProfileId === profileId}
                onSelect={(id) => {
                  setSelectedProfileId(id);
                  setHoveredProfileId(null);
                }}
                onFocusProfile={setHoveredProfileId}
              />
            ))}
            <div className="profiles-triangle__canvas">
              <svg className="profiles-triangle__mesh" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M50 6 L93 88 L7 88 Z" />
              </svg>
              {PROFILE_ID_ORDER.map((profileId, index) => (
                <TriangleNode
                  key={profileId}
                  profile={profileDictionary[profileId]}
                  order={index + 1}
                  position={PROFILE_POSITION_CLASS[profileId]}
                  isActive={selectedProfileId === profileId}
                  coordinates={PROFILE_COORDINATES[profileId]}
                  onSelect={(id) => {
                    setSelectedProfileId(id);
                    setHoveredProfileId(null);
                  }}
                  onFocusProfile={setHoveredProfileId}
                />
              ))}
              {hoveredProfileId && (
                <TriangleTooltip
                  profile={profileDictionary[hoveredProfileId]}
                  position={PROFILE_POSITION_CLASS[hoveredProfileId]}
                  coordinates={PROFILE_COORDINATES[hoveredProfileId]}
                />
              )}
            </div>
          </div>
        </div>
      </Section>

      <ScrollSection
        id="profiles-scroll"
        title="Perfiles + mapa sincronizado"
        lead="Desplázate por la explicación mientras el mapa permanece fijo a la derecha."
        steps={steps}
        renderGraphic={renderGraphic}
        background="muted"
        eyebrow="Zoom analítico"
        onStepChange={handleStepChange}
      />
    </>
  );
};
