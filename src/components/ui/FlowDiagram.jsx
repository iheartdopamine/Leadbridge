// FlowDiagram.jsx
// Elemento visual distintivo de LeadBridge: muestra el recorrido real
// que hace un dato al enviarse el formulario. No es decoración — es
// una representación literal del flujo que se documenta en el
// Google Apps Script (Fase 4).

const nodos = ["Formulario", "Google Sheets", "CRM", "Discord"];

function FlowDiagram() {
  return (
    <div className="rounded-2xl bg-graphite text-white p-6 shadow-card">
      {/* Indicador "en vivo" */}
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
        </span>
        <span className="font-mono text-xs text-white/60">
          en vivo · así viaja cada envío
        </span>
      </div>

      {/* Nodos conectados por segmentos animados */}
      <div className="flex items-center">
        {nodos.map((nodo, i) => (
          <div key={nodo} className="flex items-center flex-1 last:flex-none">
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] whitespace-nowrap">
              {nodo}
            </span>

            {i < nodos.length - 1 && (
              <span className="relative h-px flex-1 mx-2 bg-white/15 overflow-visible">
                <span
                  className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-signal"
                  style={{
                    animation: "flow-dot 2.4s ease-in-out infinite",
                    animationDelay: `${i * 0.8}s`,
                  }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Registro simulado, refuerza que el dato llega de verdad */}
      <p className="font-mono text-[11px] text-white/40 mt-6">
        → nueva fila: "Javier P. — Diseño web" · hace 12s
      </p>
    </div>
  );
}

export default FlowDiagram;
