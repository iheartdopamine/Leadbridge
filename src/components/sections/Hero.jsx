// Hero.jsx
import Container from "../layout/Container.jsx";
import FlowDiagram from "../ui/FlowDiagram.jsx";

function Hero() {
  return (
    <section id="top" className="pt-16 pb-20 md:pt-24 md:pb-28">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-xs tracking-wide text-brand mb-4">
            PARA EQUIPOS QUE NO QUIEREN PERDER UN LEAD
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
            Cada cotización, directo a tu planilla, tu CRM y tu Slack.
          </h1>
          <p className="mt-5 text-lg text-ink/70 max-w-md">
            Sin backend propio ni licencia de CRM. Publicás el formulario,
            conectás un Google Sheet y listo: cada envío queda guardado y
            avisado donde ya trabajás.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-brand text-white font-medium px-6 py-3 hover:bg-brand-dark transition-colors"
            >
              Cotizar ahora
            </a>
            <a
              href="#como-funciona"
              className="rounded-full border border-line text-ink font-medium px-6 py-3 hover:bg-ink/5 transition-colors"
            >
              Ver cómo funciona
            </a>
          </div>

          <p className="mt-6 text-xs text-ink/50">
            Tus datos quedan en tu propia Google Sheet — nunca en un servidor de terceros.
          </p>
        </div>

        <FlowDiagram />
      </Container>
    </section>
  );
}

export default Hero;
