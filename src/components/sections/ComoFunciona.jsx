// ComoFunciona.jsx
import Container from "../layout/Container.jsx";
import { pasosFlujo } from "@/config/site.config.js";

function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 bg-ink/[0.02] border-t border-line">
      <Container>
        <h2 className="font-display text-3xl font-semibold text-ink max-w-lg">
          Qué pasa entre que alguien envía el formulario y vos te enterás
        </h2>

        <ol className="mt-12 grid md:grid-cols-3 gap-8">
          {pasosFlujo.map((paso) => (
            <li key={paso.numero} className="relative pl-2">
              <span className="font-mono text-sm text-brand/60">
                {paso.numero}
              </span>
              <h3 className="mt-2 font-display font-semibold text-ink">
                {paso.titulo}
              </h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                {paso.descripcion}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default ComoFunciona;
