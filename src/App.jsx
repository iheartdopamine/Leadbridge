// App.jsx
// Fase 1: solo confirmamos que el entorno funciona. En la Fase 2
// reemplazamos este contenido por los componentes reales de
// src/components/sections (Hero, Beneficios, Formulario, etc.).

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-mono text-sm text-brand mb-2">
          LEADBRIDGE · FASE 1 · SETUP OK
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">
          Entorno base funcionando 🎉
        </h1>
        <p className="mt-3 text-ink/70 max-w-md mx-auto">
          Vite 8 + React 19 + Tailwind 4 están conectados. La landing real
          se construirá en la Fase 2.
        </p>
      </div>
    </main>
  );
}

export default App;
