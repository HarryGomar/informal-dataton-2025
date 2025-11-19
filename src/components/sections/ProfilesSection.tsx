import React, { useState } from "react";
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

const PROFILE_ID_ORDER: ProfileLayerId[] = ["microtrap", "desalentados", "cuidadoras"];
const PROFILE_STEP_MAP: Record<string, ProfileLayerId> = {
  microtrap: "microtrap",
  desalentados: "desalentados",
  cuidadoras: "cuidadoras",
};
const INTERACTIVE_STEPS = new Set(["explore", "conclusion"]);


// --- Sub-components ---

const ProfileCard: React.FC<{ profile: Profile; isActive: boolean; onClick: () => void }> = ({
  profile,
  isActive,
  onClick,
}) => {
  const Icon =
    profile.icon === "care"
      ? IconCareWork
      : profile.icon === "micro"
      ? IconMicroenterprise
      : IconInstitution;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${
        isActive
          ? "bg-emerald-50 border-emerald-500 shadow-md transform scale-105"
          : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm"
      }`}
    >
      <div className={`mb-3 ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
        <Icon />
      </div>
      <h4 className="font-bold text-slate-800 mb-2">{profile.title}</h4>
      <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
        {profile.shortDescription.slice(0, 2).map((desc, i) => (
          <li key={i}>{desc}</li>
        ))}
      </ul>
    </div>
  );
};

const ProfileDetail: React.FC<{ profile: Profile }> = ({ profile }) => {
  return (
    <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-100">
      <h4 className="text-lg font-bold text-emerald-800 mb-3">{profile.title}</h4>
      <p className="text-slate-700 mb-4">{profile.fullDescription}</p>
      
      <h5 className="font-semibold text-emerald-700 mb-2 text-sm uppercase tracking-wide">Necesidades Clave</h5>
      <ul className="space-y-2">
        {profile.needs.map((need, i) => (
          <li key={i} className="flex items-start text-sm text-slate-700">
            <span className="mr-2 text-emerald-500">→</span>
            {need}
          </li>
        ))}
      </ul>
    </div>
  );
};

const VarianceExplained: React.FC = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 text-center">
    <div className="relative w-32 h-32 mx-auto mb-4">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="56"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
        />
        <circle
          cx="64"
          cy="64"
          r="56"
          fill="none"
          stroke="#10b981"
          strokeWidth="12"
          strokeDasharray="351.86"
          strokeDashoffset={351.86 * (1 - 0.83)}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold text-emerald-600">83%</span>
      </div>
    </div>
    <p className="text-slate-600 font-medium">Varianza explicada por perfiles</p>
    <p className="text-xs text-slate-400 mt-1">
      Solo con estos indicadores logramos explicar la mayor parte de la informalidad.
    </p>
  </div>
);

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

// --- Main Section Component ---

export const ProfilesSection: React.FC = () => {
  const [activeProfileId, setActiveProfileId] = useState<ProfileLayerId | null>(null);
  const [profileFilter, setProfileFilter] = useState<ProfileLayerId>(PROFILE_ID_ORDER[0]);
  const [metricFilter, setMetricFilter] = useState<ProfileMetricType>("share_pct");


  const steps = [
    {
      id: "intro",
      title: "Perfiles de la informalidad: humanizando los datos",
      body: (
        <>
          <p>
            Con los resultados del modelo, dimos un paso adicional: definir perfiles arquetípicos de informales en el comercio. La idea es humanizar el fenómeno y reconocer que no todos los informales son iguales.
          </p>
          <p className="mt-4">
            Basados en combinaciones de variables de educación, tamaño de negocio, entorno institucional y género/cuidados, identificamos <strong>tres perfiles clave</strong>.
          </p>
          <p className="mt-4">
            Al estimar cuántos informales de comercio caen en cada perfil en cada municipio, mostramos que <strong>solo con estos indicadores logramos explicar ~83% de la variación</strong> de la informalidad en comercio.
          </p>
        </>
      ),
    },
    {
      id: "carousel",
      title: "Tres perfiles clave",
      body: (
        <div className="space-y-4">
          <p>
            Estos perfiles resumen en personajes-tipo lo que de otra forma serían más de 20 variables sueltas. Haz clic en las tarjetas para explorar cada uno.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isActive={activeProfileId === profile.id}
                onClick={() => {
                  setActiveProfileId(profile.id);
                  setProfileFilter(profile.id);
                }}
              />
            ))}
          </div>
          {activeProfileId && (
            <ProfileDetail profile={profiles.find((p) => p.id === activeProfileId)!} />
          )}
        </div>
      ),
    },
    {
      id: "microtrap",
      title: "Comerciantes atrapados en lo micro",
      eyebrow: "Perfil 1",
      body: (
        <>
          <p>
            Cuando seleccionamos el perfil “Comerciantes atrapados en lo micro”, el mapa muestra dónde se concentran los micro-negocios informales estancados.
          </p>
          <p className="mt-4">
            Observamos que se extienden por todo el país, pero con <strong>mayor densidad en estados del sur y centro</strong> donde predominan microempresas de baja productividad.
          </p>
          <div className="mt-6 p-4 bg-slate-50 rounded border border-slate-200">
            <h5 className="font-bold text-sm text-slate-700 mb-2">Top Municipios (Concentración)</h5>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>1. Ocosingo, Chiapas</li>
              <li>2. San Felipe del Progreso, México</li>
              <li>3. Chilón, Chiapas</li>
              <li>4. Huejutla de Reyes, Hidalgo</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "desalentados",
      title: "Emprendedores desalentados",
      eyebrow: "Perfil 2",
      body: (
        <>
          <p>
            Al activar el perfil “Emprendedores desalentados”, el mapa resalta zonas donde la informalidad está ligada a inseguridad y corrupción.
          </p>
          <p className="mt-4">
            Se concentran en municipios con alta incidencia delictiva y altos índices de extorsión reportada, tanto en grandes zonas urbanas como en corredores comerciales específicos del sur.
          </p>
          <div className="mt-6 p-4 bg-slate-50 rounded border border-slate-200">
            <h5 className="font-bold text-sm text-slate-700 mb-2">Top Municipios (Riesgo Institucional)</h5>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>1. Ecatepec de Morelos, México</li>
              <li>2. Chilpancingo de los Bravo, Guerrero</li>
              <li>3. Coatzacoalcos, Veracruz</li>
              <li>4. Uruapan, Michoacán</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "cuidadoras",
      title: "Cuidadoras invisibles",
      eyebrow: "Perfil 3",
      body: (
        <>
          <p>
            Al enfocarnos en las “Cuidadoras invisibles”, vemos un patrón distinto. Este perfil tiende a concentrarse en <strong>zonas urbanas populares y periferias metropolitanas</strong>.
          </p>
          <p className="mt-4">
            En varios estados del sur –como Chiapas, Oaxaca o Veracruz– la proporción de cuidadoras entre los informales de comercio es especialmente alta.
          </p>
          <div className="mt-6 p-4 bg-slate-50 rounded border border-slate-200">
            <h5 className="font-bold text-sm text-slate-700 mb-2">Top Municipios (Cuidados)</h5>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>1. Nezahualcóyotl, México</li>
              <li>2. Iztapalapa, México</li>
              <li>3. Centro, Tabasco</li>
              <li>4. Tuxtla Gutiérrez, Chiapas</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "explore",
      title: "Explora y filtra el mapa",
      body: (
        <>
          <p>
            Tras revisar los perfiles, usa el panel de filtros en el mapa para alternar entre perfiles y métricas.
          </p>
          <p className="mt-4">
            Puedes ver el porcentaje, el ranking o el número estimado de personas por perfil. Elige tu combinación y observa cómo cambia el patrón territorial.
          </p>
        </>
      ),
    },
    {
      id: "conclusion",
      title: "De perfiles a políticas",
      body: (
        <>
          <p>
            En síntesis, estos tres perfiles capturan gran parte de la diversidad de la informalidad comercial en México.
          </p>
          <p className="mt-4">
            Para los <em>policymakers</em>, esto significa que podemos pasar de diagnósticos abstractos a <strong>intervenciones concretas</strong>:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 ml-2">
            <li>Guarderías y esquemas flexibles para <strong>Cuidadoras</strong>.</li>
            <li>Productividad y financiamiento para <strong>Atrapados</strong>.</li>
            <li>Seguridad y simplificación para <strong>Desalentados</strong>.</li>
          </ul>
        </>
      ),
    },
  ];

  const renderGraphic = (stepId: string) => {
    if (stepId === "intro") {
      return (
        <div className="flex items-center justify-center h-full">
          <VarianceExplained />
        </div>
      );
    }

    const forcedProfile = PROFILE_STEP_MAP[stepId];
    const profileForMap = forcedProfile ?? (activeProfileId ?? profileFilter);
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
                profile={profileFilter}
                metric={metricFilter}
                onProfileChange={(value: ProfileLayerId) => {
                  setProfileFilter(value);
                  setActiveProfileId(value);
                }}
                onMetricChange={setMetricFilter}
              />
            ) : undefined
          }
        />
      </div>
    );
  };

  return (
    <ScrollSection
      id="profiles"
      title="Perfiles de la Informalidad"
      eyebrow="Sección 7"
      lead="Humanizando los datos"
      steps={steps}
      renderGraphic={renderGraphic}
    />
  );
};
