/**
 * LeadBridge — Google Apps Script (Code.gs)
 *
 * Qué hace:
 *  1. Recibe el POST del formulario (doPost).
 *  2. Guarda una fila nueva en la hoja "Leads" de esta planilla.
 *  3. Notifica a Discord y/o Slack si configuraste sus webhooks.
 *  4. Reenvía el lead a un CRM externo si configuraste su webhook.
 *
 * Cómo activarlo: ver "Activar las integraciones" en el README.md
 * del proyecto. Resumen rápido:
 *   1. Creá una Google Sheet nueva.
 *   2. Extensiones -> Apps Script, borrá el contenido de Code.gs y
 *      pegá este archivo completo.
 *   3. Editor -> ícono de engranaje (Configuración del proyecto) ->
 *      "Propiedades del script" -> agregá las que necesites:
 *        DISCORD_WEBHOOK_URL
 *        SLACK_WEBHOOK_URL
 *        CRM_WEBHOOK_URL
 *      (Las que no configures, simplemente no se usan.)
 *   4. Implementar -> Nueva implementación -> tipo "Aplicación web".
 *      Ejecutar como: "Yo". Quién tiene acceso: "Cualquier usuario".
 *   5. Copiá la URL que te da y pegala en tu .env como
 *      VITE_GOOGLE_SHEETS_WEBAPP_URL.
 */

var NOMBRE_HOJA = "Leads";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    guardarEnSheet_(data);
    notificarDiscord_(data);
    notificarSlack_(data);
    notificarCRM_(data);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite abrir la URL del deploy en el navegador para confirmar que
// está activo (un GET no hace nada más que esto).
function doGet() {
  return ContentService.createTextOutput(
    "LeadBridge Apps Script está activo. Este endpoint solo procesa POST."
  );
}

function guardarEnSheet_(data) {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(NOMBRE_HOJA) || libro.insertSheet(NOMBRE_HOJA);

  if (hoja.getLastRow() === 0) {
    hoja.appendRow(["Fecha", "Nombre", "Email", "Teléfono", "Servicio", "Mensaje"]);
  }

  hoja.appendRow([
    data.enviadoEn || new Date().toISOString(),
    data.nombre || "",
    data.email || "",
    data.telefono || "",
    data.servicio || "",
    data.mensaje || "",
  ]);
}

function notificarDiscord_(data) {
  var url = PropertiesService.getScriptProperties().getProperty("DISCORD_WEBHOOK_URL");
  if (!url) return;

  var contenido =
    "**Nueva cotización — LeadBridge**\n" +
    "Nombre: " + data.nombre + "\n" +
    "Email: " + data.email + "\n" +
    "Servicio: " + data.servicio + "\n" +
    "Mensaje: " + data.mensaje;

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ content: contenido }),
    muteHttpExceptions: true,
  });
}

function notificarSlack_(data) {
  var url = PropertiesService.getScriptProperties().getProperty("SLACK_WEBHOOK_URL");
  if (!url) return;

  var texto =
    "*Nueva cotización — LeadBridge*\n" +
    "Nombre: " + data.nombre + "\n" +
    "Email: " + data.email + "\n" +
    "Servicio: " + data.servicio + "\n" +
    "Mensaje: " + data.mensaje;

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ text: texto }),
    muteHttpExceptions: true,
  });
}

// Reenvío genérico a un CRM que acepte leads vía webhook (HubSpot,
// Pipedrive, un Zapier/Make en el medio, etc.). Si tu CRM espera un
// formato distinto, ajustá el "payload" de este fetch.
function notificarCRM_(data) {
  var url = PropertiesService.getScriptProperties().getProperty("CRM_WEBHOOK_URL");
  if (!url) return;

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(data),
    muteHttpExceptions: true,
  });
}
