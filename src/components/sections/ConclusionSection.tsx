import React from "react";
import { Section } from "../layout/Section";

export const ConclusionSection: React.FC = () => {
  return (
    <Section id="conclusion" tone="brand" className="text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Bloque 1: Resumen Visual */}
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-100">Lo que aprendimos sobre la informalidad comercial</h2>
            <div className="grid md:grid-cols-3 gap-8">
                
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 backdrop-blur-sm">
                    <div className="text-4xl mb-4">📉</div>
                    <h3 className="font-bold text-lg mb-2 text-emerald-200">Diagnóstico fallido del pasado</h3>
                    <p className="text-sm text-slate-300">
                        Tratar la informalidad como evasión voluntaria y enfocarse sólo en la recaudación movió la tasa apenas 3–4 puntos en 25 años.
                    </p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 backdrop-blur-sm">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="font-bold text-lg mb-2 text-emerald-200">Nuevo diagnóstico basado en datos</h3>
                    <p className="text-sm text-slate-300">
                        La informalidad comercial es exclusión y baja productividad: microempresas, mujeres cuidadoras y territorios con corrupción e inseguridad.
                    </p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 backdrop-blur-sm">
                    <div className="text-4xl mb-4">🪜</div>
                    <h3 className="font-bold text-lg mb-2 text-emerald-200">Propuesta de solución</h3>
                    <p className="text-sm text-slate-300">
                        Escalera Comercial ofrece un camino de desarrollo productivo escalonado donde la formalidad es consecuencia del crecimiento.
                    </p>
                </div>

            </div>
        </div>

        {/* Bloque 2: Conclusión Narrativa */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6 text-lg text-slate-200 leading-relaxed">
            <p>
                La informalidad en el comercio mexicano es compleja: nace en factores estructurales de educación, tamaño empresarial, género e instituciones débiles. No se resuelve con campañas punitivas ni simples condonaciones.
            </p>
            <p>
                Al entender sus causas con datos —costos fiscales, mapas territoriales, perfiles y modelos predictivos— emergen caminos viables. <strong className="text-white">Escalera Comercial</strong> ataca las raíces: productividad, confianza y acompañamiento.
            </p>
            <p>
                Formalizar no es un castigo ni un trámite: es el resultado natural de crecer y prosperar. Peldaño a peldaño podemos sacar a miles de comercios del círculo vicioso de la informalidad.
            </p>
            <div className="conclusion-benefits">
              <div className="conclusion-benefits__item">
                <strong className="block text-white">Menos evasión</strong>
                <p>Rutas claras para recaudar de forma sostenible y progresiva.</p>
              </div>
              <div className="conclusion-benefits__item">
                <strong className="block text-white">Más seguridad social</strong>
                <p>Cobertura para dueños y trabajadores sin quebrar al negocio.</p>
              </div>
              <div className="conclusion-benefits__item">
                <strong className="block text-white">Mercado interno sólido</strong>
                <p>Mayor productividad y derrama económica en barrios y ciudades.</p>
              </div>
            </div>
        </div>

        {/* Bloque 3: Llamado a la Acción */}
        <div className="text-center border-t border-slate-700 pt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Llamado a la Acción</h3>
            <p className="max-w-2xl mx-auto text-slate-300 mb-8">
                Invitamos a INEGI, ANTAD y a los tomadores de decisión a considerar este enfoque, con la misma seriedad con la que evaluamos programas sociales.
            </p>
            <ul className="conclusion-cta">
              <li>Usar la inteligencia de datos disponible para identificar zonas y perfiles prioritarios.</li>
              <li>Probar Escalera Comercial en un piloto evaluable (RCT) antes de escalar.</li>
              <li>Fortalecer la medición de informalidad —especialmente negocios en el hogar— para perfeccionar las políticas futuras.</li>
            </ul>
            
            
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg mb-12">
                Ver documentación técnica y código
            </button>

            <footer className="text-xs text-slate-500 mt-12">
                <p>Proyecto desarrollado para el Datatón INEGI–ANTAD 2025.</p>
                <p className="mt-1">Equipo: Rafael Harry Gomar Dawson · Eduardo Garcías · Mauricia Peña · Emilia Hernández · ITAM</p>
              <p className="conclusion-footnote">Sólo si el piloto funciona, escalamos.</p>
            </footer>
        </div>

      </div>
    </Section>
  );
};
