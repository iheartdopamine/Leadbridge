// site.config.js
// Contenido y estructura de navegación centralizados. Las secciones
// (Hero, Navbar, Footer, etc.) importan de acá en vez de tener strings
// sueltos repartidos por los componentes.

export const site = {
  name: "LeadBridge",
  tagline:
    "Cada cotización, directo a tu planilla, tu CRM y tu Slack — sin que nadie la copie a mano.",
};

export const navLinks = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Preguntas", href: "#preguntas" },
];

// Pasos reales del flujo de datos: en este orden, el numero SÍ aporta
// información (es una secuencia), a diferencia de los "beneficios".
export const pasosFlujo = [
  {
    numero: "01",
    titulo: "Alguien completa el formulario",
    descripcion:
      "Nombre, contacto y qué necesita cotizar. Validado en el momento, sin campos que se pierden.",
  },
  {
    numero: "02",
    titulo: "Apps Script guarda la fila",
    descripcion:
      "El envío llega a un Web App de Google Apps Script que agrega una fila nueva en tu Google Sheet.",
  },
  {
    numero: "03",
    titulo: "Se avisa donde ya trabajás",
    descripcion:
      "El mismo Apps Script dispara una notificación a Discord o Slack, y opcionalmente a tu CRM.",
  },
];
