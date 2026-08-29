# LeadBridge

Landing page comercial con formulario de cotización conectado en tiempo
real a Google Sheets, un CRM y notificaciones por Webhooks (Discord/Slack).

## Qué hace la landing

- **Hero** con un diagrama animado que muestra el recorrido real de un
  envío: Formulario → Google Sheets → CRM → Discord.
- **Beneficios**: por qué conectar el formulario en vez de gestionar
  leads a mano.
- **Cómo funciona**: los tres pasos reales del flujo de datos (completar
  formulario → Apps Script guarda la fila → se notifica por webhook).
- **Prueba social** y **CTA final**, con el espacio reservado para el
  formulario de cotización.

## Stack

| Paquete | Versión |
|---|---|
| vite | ^8.2.2 |
| react / react-dom | ^19.2.8 |
| @vitejs/plugin-react | ^6.1.1 |
| tailwindcss / @tailwindcss/vite | ^4.3.3 |
| lucide-react | ^1.35.0 |
| eslint | ^10.9.1 |
| react-hook-form | ^7.86.0 |
| zod | ^4.5.1 |
| @hookform/resolvers | ^5.9.1 |

## Estructura de carpetas

```
leadbridge/
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
│   │   │   └── CTAFinal.jsx
│   │   └── ui/
│   │       └── FlowDiagram.jsx
│   ├── config/
│   │   └── site.config.js
│   ├── hooks/
│   ├── services/
│   ├── utils/
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
