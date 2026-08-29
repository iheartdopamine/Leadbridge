// FormularioContacto.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { leadSchema, leadDefaultValues } from "@/utils/leadSchema.js";
import { submitLead } from "@/services/leadsService.js";
import FormField from "../ui/FormField.jsx";

const inputClass =
  "w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder-white/35 focus:border-brand focus:outline-none transition-colors";

// Mensajes de error, en la voz de la interfaz: explican qué pasó y
// qué hacer, sin pedir disculpas ni ser vagos.
const MENSAJES_ERROR = {
  ENDPOINT_NOT_CONFIGURED:
    "El envío todavía no está conectado a una planilla. Se resuelve en la Fase 4 del proyecto.",
  NETWORK_ERROR:
    "No se pudo enviar por un problema de conexión. Revisá tu internet e intentá de nuevo.",
};

function FormularioContacto() {
  const [estado, setEstado] = useState("idle"); // idle | enviando | exito | error
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: leadDefaultValues,
  });

  const onSubmit = async (data) => {
    setEstado("enviando");
    setError(null);
    try {
      await submitLead(data);
      setEstado("exito");
      reset();
    } catch (e) {
      setEstado("error");
      setError(MENSAJES_ERROR[e.message] ?? MENSAJES_ERROR.NETWORK_ERROR);
    }
  };

  if (estado === "exito") {
    return (
      <div className="mt-10 mx-auto max-w-md rounded-2xl border border-white/10 p-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-signal mx-auto" />
        <p className="mt-3 font-display font-semibold text-white">
          Cotización enviada
        </p>
        <p className="mt-1 text-sm text-white/60">
          Te vamos a responder a la brevedad.
        </p>
        <button
          onClick={() => setEstado("idle")}
          className="mt-6 text-sm text-brand-light hover:underline"
        >
          Enviar otra
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-10 mx-auto max-w-md text-left space-y-5"
    >
      <FormField label="Nombre" htmlFor="nombre" error={errors.nombre?.message}>
        <input id="nombre" className={inputClass} {...register("nombre")} />
      </FormField>

      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          className={inputClass}
          {...register("email")}
        />
      </FormField>

      <FormField
        label="Teléfono (opcional)"
        htmlFor="telefono"
        error={errors.telefono?.message}
      >
        <input id="telefono" className={inputClass} {...register("telefono")} />
      </FormField>

      <FormField
        label="Qué necesitás cotizar"
        htmlFor="servicio"
        error={errors.servicio?.message}
      >
        <select id="servicio" className={inputClass} {...register("servicio")}>
          <option value="" className="bg-graphite">
            Elegí una opción
          </option>
          <option value="diseno-web" className="bg-graphite">
            Diseño web
          </option>
          <option value="consultoria" className="bg-graphite">
            Consultoría
          </option>
          <option value="otro" className="bg-graphite">
            Otro
          </option>
        </select>
      </FormField>

      <FormField label="Contanos más" htmlFor="mensaje" error={errors.mensaje?.message}>
        <textarea
          id="mensaje"
          rows={4}
          className={inputClass}
          {...register("mensaje")}
        />
      </FormField>

      {estado === "error" && (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full rounded-full bg-brand text-white font-medium px-6 py-3 hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {estado === "enviando" && <Loader2 className="h-4 w-4 animate-spin" />}
        {estado === "enviando" ? "Enviando..." : "Enviar cotización"}
      </button>
    </form>
  );
}

export default FormularioContacto;
