// Navbar.jsx
import Container from "./Container.jsx";
import { navLinks, site } from "@/config/site.config.js";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-line">
      <Container className="flex items-center justify-between h-16">
        <a href="#top" className="font-display font-semibold text-lg text-ink">
          {site.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/70 hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-dark transition-colors"
        >
          Cotizar ahora
        </a>
      </Container>
    </header>
  );
}

export default Navbar;
