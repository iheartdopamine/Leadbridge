// localStorage.js
// Wrappers defensivos: localStorage puede lanzar excepción en modo
// incógnito estricto de algunos navegadores. Nunca queremos que eso
// rompa la app, así que todo queda en try/catch con un valor de
// respaldo.

export function leerLocal(key, valorPorDefecto = "") {
  try {
    const valor = window.localStorage.getItem(key);
    return valor === null ? valorPorDefecto : valor;
  } catch {
    return valorPorDefecto;
  }
}

export function guardarLocal(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Silencioso a propósito: guardar la preferencia es una
    // comodidad, no algo crítico para el funcionamiento del panel.
  }
}

export function borrarLocal(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // idem
  }
}
