// App.jsx
// Compone la landing completa a partir de las secciones de
// src/components/sections. El orden acá define el orden real de la
// página.

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import Beneficios from "./components/sections/Beneficios.jsx";
import ComoFunciona from "./components/sections/ComoFunciona.jsx";
import PruebaSocial from "./components/sections/PruebaSocial.jsx";
import CTAFinal from "./components/sections/CTAFinal.jsx";

function App() {
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
