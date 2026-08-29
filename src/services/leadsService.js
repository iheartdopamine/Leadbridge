// leadsService.js
// Capa de acceso a datos: es el único lugar del proyecto que sabe
// cómo se envía un lead. Si en el futuro cambia el transporte (por
// ejemplo, a una API propia en vez de Apps Script), solo se toca este
// archivo — los componentes no se enteran.

/**
 * Envía los datos de un lead al Web App de Google Apps Script
 * configurado en VITE_GOOGLE_SHEETS_WEBAPP_URL.
 *
 * Nota técnica sobre CORS: los Web Apps de Apps Script no siempre
 * devuelven encabezados legibles desde el navegador cuando se los
 * llama desde otro dominio. Usamos mode: "no-cors" para que el POST
 * se entregue igual — no podemos leer la respuesta desde el
 * JavaScript del cliente, pero Apps Script sí recibe y procesa el
 * envío. Por eso este servicio resuelve en éxito si el fetch no
 * lanzó una excepción de red, no porque haya podido inspeccionar
 * una respuesta JSON.
 *
 * @param {object} data - datos ya validados por leadSchema.
 * @throws {Error} con message "ENDPOINT_NOT_CONFIGURED" o "NETWORK_ERROR"
 */
export async function submitLead(data) {
  const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL;

  if (!endpoint) {
    throw new Error("ENDPOINT_NOT_CONFIGURED");
  }

  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      // text/plain evita que el navegador dispare un preflight
      // OPTIONS, que Apps Script no siempre responde bien.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        ...data,
        enviadoEn: new Date().toISOString(),
      }),
    });
  } catch {
    throw new Error("NETWORK_ERROR");
  }

  return { ok: true };
}
