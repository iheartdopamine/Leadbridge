// Container.jsx
// Envoltorio para centrar el contenido y mantener un padding horizontal
// consistente en todas las secciones. Evita repetir "max-w-6xl mx-auto
// px-6" en cada sección.

function Container({ children, className = "" }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 ${className}`}>{children}</div>
  );
}

export default Container;
