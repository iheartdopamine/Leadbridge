// CTAFinal.jsx
import Container from "../layout/Container.jsx";

function CTAFinal() {
  return (
    <section id="contacto" className="py-24 bg-graphite text-white">
      <Container className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold">
          Dejá de copiar leads a mano.
        </h2>
        <p className="mt-4 text-white/60 max-w-md mx-auto">
          El formulario de cotización se conecta en la Fase 3. Por ahora,
          este es el espacio reservado para esa sección.
        </p>

        {/* Placeholder: en la Fase 3 este bloque se reemplaza por
            <FormularioContacto /> con react-hook-form + zod. */}
        <div className="mt-10 mx-auto max-w-md rounded-2xl border border-white/10 border-dashed p-10 text-white/40 text-sm font-mono">
          [ formulario de cotización — Fase 3 ]
        </div>
      </Container>
    </section>
  );
}

export default CTAFinal;
