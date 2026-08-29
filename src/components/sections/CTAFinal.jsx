// CTAFinal.jsx
import Container from "../layout/Container.jsx";
import FormularioContacto from "./FormularioContacto.jsx";

function CTAFinal() {
  return (
    <section id="contacto" className="py-24 bg-graphite text-white">
      <Container className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold">
          Dejá de copiar leads a mano.
        </h2>
        <p className="mt-4 text-white/60 max-w-md mx-auto">
          Completá el formulario y te respondemos a la brevedad.
        </p>

        <FormularioContacto />
      </Container>
    </section>
  );
}

export default CTAFinal;
