import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Vite 8: internamente ya usa Rolldown como bundler unificado, pero la
// API de configuración que usamos acá (plugins, resolve.alias, server)
// no cambia respecto a versiones anteriores.
//
// Alias "@" -> "src". Usamos `import.meta.dirname` (disponible desde
// Node 20.11+) en vez de `__dirname`, que Vite 8 marca como no
// soportado por su nuevo cargador de config nativo.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
