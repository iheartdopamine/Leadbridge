// App.jsx
// "Router" mínimo sin dependencias: todo el proyecto es un sitio
// estático de una sola página, así que alcanza con mirar el hash de
// la URL para decidir si se muestra la landing o el panel local.
// No agregamos react-router para esto porque sería una dependencia
// entera para resolver un único switch de dos vistas.

import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import Beneficios from "./components/sections/Beneficios.jsx";
import ComoFunciona from "./components/sections/ComoFunciona.jsx";
import PruebaSocial from "./components/sections/PruebaSocial.jsx";
import CTAFinal from "./components/sections/CTAFinal.jsx";
import PanelIntegraciones from "./pages/PanelIntegraciones.jsx";

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash === "#admin") {
    return <PanelIntegraciones />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Beneficios />
        <ComoFunciona />
        <PruebaSocial />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}

export default App;
