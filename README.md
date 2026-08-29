# LeadBridge

Landing page comercial con formulario de cotización, lista para conectar
en tiempo real a una Google Sheet, notificaciones por Webhooks
(Discord/Slack) y, opcionalmente, un CRM externo.

**El proyecto corre 100% local por defecto.** No hay backend propio ni
servicio online incluido: el frontend está completo y funcionando, y
este documento explica paso a paso cómo activar cada integración
externa cuando quieras usarla de verdad.

## Características principales

- Landing responsiva (Hero, Beneficios, Cómo funciona, Prueba social,
  CTA) con un diagrama animado que representa el flujo real del dato.
- Formulario de cotización validado con **react-hook-form + zod**,
  con estados de carga, éxito y error.
- **Panel de integraciones** local (`/#admin`): revisa el estado de la
  conexión a Sheets y permite probar webhooks de Discord/Slack a mano,
  sin backend propio — las URLs de prueba se guardan solo en el
  `localStorage` de tu navegador.
- Script de **Google Apps Script** (incluido en `apps-script/Code.gs`)
  que recibe el POST, guarda la fila en tu planilla y reenvía la
  notificación a los webhooks que hayas configurado.

## Flujo de datos

```
 Formulario (React)
        │  POST (fetch, mode: no-cors)
        ▼
 Google Apps Script (doPost)
        │
        ├──▶ Guarda fila en la Google Sheet
        ├──▶ Discord webhook   (si DISCORD_WEBHOOK_URL está seteada)
        ├──▶ Slack webhook     (si SLACK_WEBHOOK_URL está seteada)
        └──▶ CRM externo       (si CRM_WEBHOOK_URL está seteada)
```

Todo el reenvío a webhooks ocurre **del lado de Apps Script**, no del
navegador. Así evitamos exponer las URLs de Discord/Slack en el bundle
público del frontend.

## Stack

| Paquete | Versión |
|---|---|
| vite | ^8.2.2 |
| react / react-dom | ^19.2.8 |
| @vitejs/plugin-react | ^6.1.1 |
| tailwindcss / @tailwindcss/vite | ^4.3.3 |
| lucide-react | ^1.35.0 |
| react-hook-form | ^7.86.0 |
| zod | ^4.5.1 |
| @hookform/resolvers | ^5.9.1 |
| eslint | ^10.9.1 |

## Estructura de archivos

```
leadbridge/
├── apps-script/
│   └── Code.gs                  # Backend de Google Apps Script (ver más abajo)
├── public/
├── src/
│   ├── assets/images/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Beneficios.jsx
│   │   │   ├── ComoFunciona.jsx
│   │   │   ├── PruebaSocial.jsx
│   │   │   ├── CTAFinal.jsx
│   │   │   └── FormularioContacto.jsx
│   │   └── ui/
│   │       ├── FlowDiagram.jsx
│   │       └── FormField.jsx
│   ├── config/
│   │   └── site.config.js
│   ├── pages/
│   │   └── PanelIntegraciones.jsx
│   ├── services/
│   │   ├── leadsService.js
│   │   └── webhookTestService.js
│   ├── utils/
│   │   ├── leadSchema.js
│   │   └── localStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── eslint.config.js
├── vite.config.js
└── package.json
```

## Cómo correrlo

```bash
npm install
npm run dev
```

```bash
npm run build   # build de producción
npm run lint    # ESLint 10, flat config
```

Con esto el sitio funciona completo y local: el formulario valida, y
al enviarlo vas a ver el mensaje "todavía no está conectado a una
planilla" — es el comportamiento esperado hasta que actives el backend
(siguiente sección).

## Panel de integraciones (`/#admin`)

Con `npm run dev` corriendo, entrá a `http://localhost:5173/#admin`.
Vas a ver:

- El estado de `VITE_GOOGLE_SHEETS_WEBAPP_URL` (configurada o no) y un
  botón para enviar una fila de prueba real a tu planilla.
- Dos bloques (Discord y Slack) donde pegás la URL del webhook y
  mandás un mensaje de prueba. Esa URL se guarda solo en el
  `localStorage` de tu navegador — nunca se sube a ningún lado ni se
  commitea al repo.

No hace falta reconstruir el proyecto para usarlo: es una vista más de
la misma app.

## Activar las integraciones

### 1. Google Sheets (obligatorio para guardar leads)

1. Creá una Google Sheet nueva (o abrí una existente).
2. Andá a **Extensiones → Apps Script**.
3. Borrá el contenido de `Code.gs` que abre por defecto y pegá ahí
   todo el contenido de [`apps-script/Code.gs`](./apps-script/Code.gs)
   de este repo (también está copiado íntegro más abajo).
4. Guardá el proyecto.
5. **Implementar → Nueva implementación → tipo "Aplicación web"**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier usuario**.
6. Copiá la URL que te da Google al implementar.
7. En tu proyecto, copiá `.env.example` como `.env` y pegá esa URL:
   ```
   VITE_GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
8. Reiniciá `npm run dev`. Probá el formulario, o entrá a `/#admin` y
   usá el botón "Enviar fila de prueba".

### 2. Discord y/o Slack (opcional)

1. En Discord: **Configuración del servidor → Integraciones →
   Webhooks → Nuevo webhook**. Copiá la URL.
   En Slack: creá una **Incoming Webhook** desde la configuración de
   tu app/workspace. Copiá la URL.
2. En el editor de Apps Script: ícono de engranaje **(Configuración
   del proyecto) → Propiedades del script → Agregar propiedad del
   script**.
   - `DISCORD_WEBHOOK_URL` → tu URL de Discord.
   - `SLACK_WEBHOOK_URL` → tu URL de Slack.
3. Volvé a implementar (**Implementar → Gestionar implementaciones →
   editar → Nueva versión**) para que tome las propiedades nuevas.
4. Probalo desde `/#admin` en la sección de Discord/Slack, o enviando
   el formulario real.

### 3. CRM externo (opcional)

Si tu CRM acepta leads vía un webhook HTTP (HubSpot, Pipedrive, o un
Zapier/Make intermedio), agregá la propiedad de script
`CRM_WEBHOOK_URL` con esa URL. Apps Script le va a reenviar el mismo
JSON que llega del formulario. Si tu CRM espera un formato distinto,
ajustá la función `notificarCRM_` en `Code.gs`.

## Código de Google Apps Script (`apps-script/Code.gs`)

```javascript

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
```
