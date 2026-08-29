// PruebaSocial.jsx
import Container from "../layout/Container.jsx";

// Nombres ficticios a propósito: no usamos logos ni marcas reales de
// terceros. Sirve como placeholder de "empresas que confían en
// LeadBridge" hasta que el cliente final tenga casos reales.
const equipos = ["Vertex Studio", "Norte Arquitectura", "Cauce Legal", "Muta Diseño", "Rioja Digital"];

function PruebaSocial() {
  return (
    <section className="py-14 border-t border-line">
      <Container>
        <p className="text-center text-xs font-mono tracking-wide text-ink/40 mb-8">
          EQUIPOS QUE YA DEJARON DE COPIAR LEADS A MANO
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {equipos.map((nombre) => (
            <span
              key={nombre}
              className="font-display font-semibold text-ink/30 text-lg"
            >
              {nombre}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PruebaSocial;
