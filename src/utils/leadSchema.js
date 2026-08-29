// leadSchema.js
import { z } from "zod";

// Validación del formulario de cotización. Los mensajes son los que
// ve la persona que completa el formulario, así que están escritos en
// segunda persona y dicen exactamente qué corregir.
export const leadSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresá al menos 2 caracteres"),
  email: z
    .string()
    .trim()
    .email("Ingresá un email válido"),
  telefono: z.string().trim().optional(),
  servicio: z.string().min(1, "Elegí una opción"),
  mensaje: z
    .string()
    .trim()
    .min(10, "Contanos un poco más (mínimo 10 caracteres)"),
});

// Valores iniciales del formulario, usados por useForm() y por reset()
// tras un envío exitoso.
export const leadDefaultValues = {
  nombre: "",
  email: "",
  telefono: "",
  servicio: "",
  mensaje: "",
};
