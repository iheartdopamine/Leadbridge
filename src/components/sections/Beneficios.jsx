// Beneficios.jsx
import { PlugZap, Table2, BellRing } from "lucide-react";
import Container from "../layout/Container.jsx";

const beneficios = [
  {
    icon: PlugZap,
    titulo: "Cero fricción de setup",
    descripcion:
      "Nada de contratar un CRM ni levantar un backend. Un Google Sheet ya es tu base de datos.",
  },
  {
    icon: Table2,
    titulo: "Tus datos, en tus herramientas",
    descripcion:
      "Cada envío es una fila nueva en tu propia planilla. La podés filtrar, exportar o conectar a lo que ya usás.",
  },
  {
    icon: BellRing,
    titulo: "Te enterás al instante",
    descripcion:
      "Discord o Slack avisan al canal del equipo apenas entra una cotización, sin refrescar nada.",
  },
];

function Beneficios() {
  return (
    <section id="beneficios" className="py-20 border-t border-line">
      <Container>
        <h2 className="font-display text-3xl font-semibold text-ink max-w-lg">
          Lo que cambia al conectar tu formulario
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {beneficios.map(({ icon: Icon, titulo, descripcion }) => (
            <div key={titulo}>
              <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-brand" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-display font-semibold text-ink">
                {titulo}
              </h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                {descripcion}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Beneficios;
