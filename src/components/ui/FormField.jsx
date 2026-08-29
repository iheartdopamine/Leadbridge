// FormField.jsx
// Envoltorio de label + control + mensaje de error, para no repetir
// esa estructura en cada campo del formulario. Recibe el control ya
// registrado por react-hook-form como children.

function FormField({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-white/80 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
