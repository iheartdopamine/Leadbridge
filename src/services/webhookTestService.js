// webhookTestService.js
// Igual que leadsService.js, pero para probar webhooks de forma
// manual desde el Panel de integraciones. Nunca se llama sola: solo
// se dispara cuando la persona hace clic en "Enviar prueba".

/**
 * Envía un payload de prueba a una URL de webhook (Discord o Slack).
 *
 * Mismo motivo que en leadsService.js: usamos mode "no-cors" porque
 * ni Discord ni Slack garantizan encabezados CORS legibles desde el
 * navegador. El request llega igual — lo que hay que confirmar
 * manualmente es que el mensaje apareció en el canal.
 */
export async function enviarPruebaWebhook(url, payload) {
  if (!url || !url.trim()) {
    throw new Error("URL_VACIA");
  }

  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("NETWORK_ERROR");
  }

  return { ok: true };
}
