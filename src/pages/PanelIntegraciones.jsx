// PanelIntegraciones.jsx
// Módulo de administración, 100% local: no hay backend propio ni
// base de datos. Las URLs de prueba se guardan solo en el
// localStorage de este navegador — nunca se envían a ningún lado
// salvo cuando la persona hace clic en "Enviar prueba".

import { useState } from "react";
import { Send, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { leerLocal, guardarLocal } from "@/utils/localStorage.js";
import { enviarPruebaWebhook } from "@/services/webhookTestService.js";
import { submitLead } from "@/services/leadsService.js";

const CLAVE_DISCORD = "leadbridge:webhook:discord";
const CLAVE_SLACK = "leadbridge:webhook:slack";

const SHEETS_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL;

function EstadoConexion({ configurado }) {
  return configurado ? (
    <span className="inline-flex items-center gap-1.5 text-sm text-signal-dark">
      <CheckCircle2 className="h-4 w-4" /> Configurada
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-sm text-danger">
      <XCircle className="h-4 w-4" /> No configurada
    </span>
  );
}

function BloqueWebhook({ titulo, claveStorage, payloadDePrueba }) {
  const [url, setUrl] = useState(() => leerLocal(claveStorage));
  const [estado, setEstado] = useState("idle"); // idle | enviando | enviado | error

  const handleGuardarYEnviar = async () => {
    guardarLocal(claveStorage, url);
    setEstado("enviando");
    try {
      await enviarPruebaWebhook(url, payloadDePrueba);
      setEstado("enviado");
    } catch {
      setEstado("error");
    }
  };

  return (
    <div className="rounded-xl border border-line p-5">
      <h3 className="font-display font-semibold text-ink">{titulo}</h3>
      <label className="block text-xs text-ink/50 mt-3 mb-1">
        URL del webhook (se guarda solo en este navegador)
      </label>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://..."
        className="w-full rounded-lg border border-line px-3 py-2 text-sm font-mono focus:border-brand focus:outline-none"
      />
      <button
        onClick={handleGuardarYEnviar}
        disabled={!url.trim() || estado === "enviando"}
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-3.5 w-3.5" />
        {estado === "enviando" ? "Enviando..." : "Enviar prueba"}
      </button>

      {estado === "enviado" && (
        <p className="mt-2 text-xs text-ink/50">
          Solicitud enviada. El navegador no puede confirmar la respuesta por
          política de CORS — revisá el canal para verificar que llegó.
        </p>
      )}
      {estado === "error" && (
        <p className="mt-2 text-xs text-danger">
          No se pudo enviar. Revisá que la URL sea correcta.
        </p>
      )}
    </div>
  );
}

function PanelIntegraciones() {
  const [estadoSheets, setEstadoSheets] = useState("idle");

  const probarSheets = async () => {
    setEstadoSheets("enviando");
    try {
      await submitLead({
        nombre: "Prueba del panel",
        email: "prueba@leadbridge.local",
        telefono: "",
        servicio: "otro",
        mensaje: "Fila de prueba generada desde el Panel de integraciones.",
      });
      setEstadoSheets("enviado");
    } catch (e) {
      setEstadoSheets(e.message === "ENDPOINT_NOT_CONFIGURED" ? "sin-configurar" : "error");
    }
  };

  return (
    <main className="min-h-screen bg-paper px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al sitio
        </a>

        <h1 className="font-display text-2xl font-semibold text-ink mt-6">
          Panel de integraciones
        </h1>
        <p className="text-sm text-ink/60 mt-1">
          Módulo local para revisar y probar las conexiones. No hay backend
          propio: cada acción de esta página dispara, como mucho, un único
          request al servicio que elijas probar.
        </p>

        {/* Estado de Google Sheets (vía Apps Script) */}
        <section className="mt-8 rounded-xl border border-line p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-ink">
              Google Sheets (Apps Script)
            </h3>
            <EstadoConexion configurado={Boolean(SHEETS_ENDPOINT)} />
          </div>
          <p className="text-xs text-ink/50 mt-2">
            {SHEETS_ENDPOINT
              ? "Configurada desde VITE_GOOGLE_SHEETS_WEBAPP_URL."
              : "Agregá VITE_GOOGLE_SHEETS_WEBAPP_URL en tu archivo .env y reiniciá npm run dev."}
          </p>

          <button
            onClick={probarSheets}
            disabled={estadoSheets === "enviando"}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            {estadoSheets === "enviando" ? "Enviando..." : "Enviar fila de prueba"}
          </button>

          {estadoSheets === "enviado" && (
            <p className="mt-2 text-xs text-ink/50">
              Solicitud enviada. Abrí tu planilla para confirmar la fila nueva.
            </p>
          )}
          {estadoSheets === "sin-configurar" && (
            <p className="mt-2 text-xs text-danger">
              Todavía no configuraste VITE_GOOGLE_SHEETS_WEBAPP_URL.
            </p>
          )}
          {estadoSheets === "error" && (
            <p className="mt-2 text-xs text-danger">
              Falló el envío por conexión. Revisá tu internet e intentá de nuevo.
            </p>
          )}
        </section>

        {/* Webhooks */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <BloqueWebhook
            titulo="Discord"
            claveStorage={CLAVE_DISCORD}
            payloadDePrueba={{ content: "🔔 Prueba desde el Panel de integraciones de LeadBridge" }}
          />
          <BloqueWebhook
            titulo="Slack"
            claveStorage={CLAVE_SLACK}
            payloadDePrueba={{ text: "🔔 Prueba desde el Panel de integraciones de LeadBridge" }}
          />
        </div>
      </div>
    </main>
  );
}

export default PanelIntegraciones;
