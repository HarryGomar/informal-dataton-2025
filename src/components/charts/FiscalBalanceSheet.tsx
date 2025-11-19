import React from "react";
import { fiscalImpact } from "../../data/costs";

type HighlightKey = "iva" | "isrWorkers" | "isrOwners" | null;

interface FiscalBalanceSheetProps {
  highlight?: HighlightKey;
}

const fiscalItems = [
  { id: "iva" as const, label: "IVA en ventas", amount: fiscalImpact.iva },
  { id: "isrOwners" as const, label: "ISR empresas / dueños", amount: fiscalImpact.isrOwners },
  { id: "isrWorkers" as const, label: "ISR asalariados", amount: fiscalImpact.isrWorkers },
];

const totalFiscal = fiscalItems.reduce((sum, item) => sum + item.amount, 0);

export const FiscalBalanceSheet: React.FC<FiscalBalanceSheetProps> = ({ highlight = null }) => {
  return (
    <div className="fiscal-balance-sheet" style={{ width: '100%', paddingRight: '2rem', boxSizing: 'border-box' }}>
      <div className="fiscal-header" style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          color: 'inherit'
        }}>
          Hoja de balance
        </h3>
        <div style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#ef4444',
          lineHeight: 1.1
        }}>
          ${totalFiscal.toLocaleString("es-MX")} mdp
        </div>
        <p style={{ 
          fontSize: '0.875rem', 
          opacity: 0.8,
          marginTop: '0.5rem'
        }}>
          que no entran a la Tesorería
        </p>
      </div>

      <div className="progress-list" aria-label="Detalle de impuestos no recaudados" style={{ width: '100%', maxWidth: '100%' }}>
        {fiscalItems.map((item) => {
          const isHighlighted = highlight === item.id;
          const isDimmed = highlight !== null && !isHighlighted;
          
          return (
            <div 
              className="progress-item" 
              key={item.id}
              style={{ 
                opacity: isDimmed ? 0.3 : 1,
                transition: 'opacity 0.3s ease',
                transform: isHighlighted ? 'scale(1.01)' : 'scale(1)',
                transformOrigin: 'left center',
                marginBottom: '1.5rem'
              }}
            >
              <div className="progress-item__meta" style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{item.label}</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>${item.amount.toLocaleString("es-MX")} mdp</strong>
              </div>
              <div className="progress-item__track" style={{ height: '40px', background: 'rgba(0,0,0,0.06)', borderRadius: '6px' }}>
                <div
                  className={`progress-item__fill progress-item__fill--${item.id}`}
                  style={{ width: `${(item.amount / totalFiscal) * 100}%`, borderRadius: '6px' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
