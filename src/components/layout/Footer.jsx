// Footer.jsx
import Container from "./Container.jsx";
import { navLinks, site } from "@/config/site.config.js";

function Footer() {
  const año = new Date().getFullYear();

  return (
    <footer className="bg-graphite text-white/70">
      <Container className="py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-display font-semibold text-white text-lg">
            {site.name}
          </p>
          <p className="text-sm mt-1 max-w-xs">{site.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#admin" className="text-sm hover:text-white transition-colors">
            Panel de integraciones
          </a>
        </nav>
      </Container>

      <Container className="py-6 border-t border-white/10 text-xs text-white/40">
        © {año} {site.name}. Datos guardados en tu propia Google Sheet — nunca en un servidor de terceros.
      </Container>
    </footer>
  );
}

export default Footer;
