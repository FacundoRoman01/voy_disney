import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Send,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Users,
  Ticket,
  Building,
  Compass,
  Sparkle,
} from "lucide-react";
import { FormularioDisney } from "../types";

// ─── Utilidades de validación y sanitización ──────────────────────────────────

const sanitizarString = (s: string): string =>
  s.trim().replace(/\s+/g, " ");

const capitalizarNombre = (s: string): string =>
  sanitizarString(s)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const normalizarWhatsapp = (tel: string): string =>
  tel.replace(/[\s\-().]/g, "");

const emailValido = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

const whatsappValido = (tel: string): boolean =>
  normalizarWhatsapp(tel).length >= 7;

// ─── Constantes ───────────────────────────────────────────────────────────────

const DRAFT_KEY = "disney_form_draft";
const TIEMPO_MINIMO_MS = 5000;

const valoresIniciales: FormularioDisney = {
  email: "",
  nombreApellido: "",
  whatsapp: "",
  pasajes: "",
  visa: "",
  fechaViaje: "",
  diasViaje: "",
  personasYEdades: "",
  reservaPara: "",
  parques: "",
  hospedaje: "",
  tipoViaje: "",
  detalles: "",
  website: "",
};

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ContactForm() {
  const [loadTime] = useState(Date.now());

  // Recuperar borrador guardado (si existe)
  const [formData, setFormData] = useState<FormularioDisney>(() => {
    try {
      const guardado = localStorage.getItem(DRAFT_KEY);
      return guardado ? { ...valoresIniciales, ...JSON.parse(guardado) } : valoresIniciales;
    } catch {
      return valoresIniciales;
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Campos "tocados" para mostrar errores inline sólo después de que el usuario
  // haya interactuado con ellos
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // ── Persistencia de borrador ──────────────────────────────────────────────
  useEffect(() => {
    if (!submitted) {
      try {
        // No guardar el honeypot en el draft
        const { website, ...datosAGuardar } = formData;
        localStorage.setItem(DRAFT_KEY, JSON.stringify(datosAGuardar));
      } catch {
        // Si el storage falla, no es crítico
      }
    }
  }, [formData, submitted]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const selectOption = (name: keyof FormularioDisney, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleNext = () => {
    // Marcar todos los campos del paso actual como tocados para mostrar errores
    const camposPorPaso: Record<number, string[]> = {
      1: ["nombreApellido", "email", "whatsapp"],
      2: ["pasajes", "visa", "fechaViaje", "diasViaje"],
      3: ["personasYEdades", "reservaPara", "parques", "hospedaje"],
      4: ["tipoViaje"],
    };
    const camposActuales = camposPorPaso[currentStep] ?? [];
    setTouched((prev) => {
      const nuevos = { ...prev };
      camposActuales.forEach((c) => (nuevos[c] = true));
      return nuevos;
    });

    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── Antispam ────────────────────────────────────────────────────────────
    const tiempoTardado = Date.now() - loadTime;
    if (formData.website !== "" || tiempoTardado < TIEMPO_MINIMO_MS) {
      console.warn("Antispam: petición bloqueada silenciosamente.");
      setSubmitted(true);
      return;
    }

    if (!isStepValid(4)) return;

    setLoading(true);

    try {
      // ── Construcción del payload limpio ──────────────────────────────────
      const payload = {
        nombreApellido: capitalizarNombre(formData.nombreApellido),
        email: sanitizarString(formData.email).toLowerCase(),
        whatsapp: normalizarWhatsapp(formData.whatsapp),
        pasajes: formData.pasajes,
        visa: formData.visa,
        fechaViaje: sanitizarString(formData.fechaViaje),
        diasViaje: sanitizarString(formData.diasViaje),
        personasYEdades: sanitizarString(formData.personasYEdades),
        reservaPara: formData.reservaPara,
        parques: formData.parques,
        hospedaje: formData.hospedaje,
        tipoViaje: formData.tipoViaje,
        detalles: sanitizarString(formData.detalles),
        // Metadata útil para el Excel
        fechaEnvio: new Date().toLocaleString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        origen: typeof window !== "undefined" ? window.location.hostname : "",
      };

      const scriptURL = "https://script.google.com/macros/s/AKfycbyMhxspkvFNzr-8CfpZ8TXEs483ahJKoAbkTH8IzWtJCtHqIZzv91WPpg5n1huhP9ZNcQ/exec";

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Limpiar el borrador guardado al enviar con éxito
      localStorage.removeItem(DRAFT_KEY);
      setSubmitted(true);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar tu consulta mágica. Por favor, intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // ── Validación por paso ───────────────────────────────────────────────────

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return (
          formData.nombreApellido.trim().length > 2 &&
          emailValido(formData.email) &&
          whatsappValido(formData.whatsapp)
        );
      case 2:
        return (
          formData.pasajes !== "" &&
          formData.visa !== "" &&
          formData.fechaViaje.trim().length > 0 &&
          formData.diasViaje.trim().length > 0
        );
      case 3:
        return (
          formData.personasYEdades.trim().length > 0 &&
          formData.reservaPara !== "" &&
          formData.parques !== "" &&
          formData.hospedaje !== ""
        );
      case 4:
        return formData.tipoViaje !== "";
      default:
        return true;
    }
  };

  // ── Mensajes de error inline ──────────────────────────────────────────────

  const getError = (campo: string): string | null => {
    if (!touched[campo]) return null;
    switch (campo) {
      case "nombreApellido":
        return formData.nombreApellido.trim().length <= 2
          ? "Ingresá tu nombre y apellido completos."
          : null;
      case "email":
        return !emailValido(formData.email)
          ? "El correo no parece válido. Ej: nombre@dominio.com"
          : null;
      case "whatsapp":
        return !whatsappValido(formData.whatsapp)
          ? "Ingresá un número de teléfono válido."
          : null;
      case "fechaViaje":
        return formData.fechaViaje.trim().length === 0
          ? "Indicá una fecha o mes aproximado."
          : null;
      case "diasViaje":
        return formData.diasViaje.trim().length === 0
          ? "Indicá cuántos días aproximadamente."
          : null;
      case "personasYEdades":
        return formData.personasYEdades.trim().length === 0
          ? "Contanos cuántos viajan y sus edades."
          : null;
      default:
        return null;
    }
  };

  // ── Datos de pasos ────────────────────────────────────────────────────────

  const stepTitles = [
    { num: 1, label: "Tus Datos", desc: "Datos de contacto" },
    { num: 2, label: "Documentos", desc: "Pasajes, Visa & Fechas" },
    { num: 3, label: "Estadía Mágica", desc: "Lugar & Parques" },
    { num: 4, label: "Tu Estilo", desc: "Presupuesto & Sueños" },
  ];

  // ── Estilos reutilizables ─────────────────────────────────────────────────

  const inputBase =
    "w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3 text-ink text-sm shadow-sm outline-none transition-colors";
  const inputError =
    "w-full bg-brand-white border border-red-400 focus:border-red-500 rounded-sm px-4 py-3 text-ink text-sm shadow-sm outline-none transition-colors";
  const labelBase =
    "text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5";
  const errorMsg = "text-[11px] text-red-500 mt-1.5 font-sans";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      id="contacto"
      className="py-20 lg:py-28 bg-brand-white px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-disney-pink-light/35 rounded-full blur-2xl" />
      <div className="absolute -top-12 right-0 w-60 h-60 bg-disney-pink-wash rounded-full blur-2xl opacity-60" />

      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="text-disney-pink font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-4">
            COTIZA TU VIAJE
          </span>
          <h2 className="font-serif text-ink text-3xl sm:text-4xl lg:text-[49px] font-medium leading-[1.08] tracking-[-0.01em] mb-4">
            Empecemos a diseñar tu{" "}
            <span className="text-disney-pink italic font-normal inline-block">
              itinerario mágico
            </span>
          </h2>
          <p className="font-sans text-ink-soft font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Agus & Marti diseñarán una propuesta totalmente personalizado. Rellená este paso a
            paso y dejaselo en manos de expertos oficiales.
          </p>
        </div>

        <div className="bg-disney-pink-wash border border-line rounded-lg shadow-sm relative overflow-hidden">
          {/* Progress Tracker */}
          <div className="border-b border-line bg-brand-white/80 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 bg-disney-pink-wash border border-line py-1 px-3.5 rounded-full w-fit">
                <Sparkles className="w-4 h-4 text-disney-pink" />
                <span className="font-sans text-xs font-bold text-disney-pink uppercase tracking-wider">
                  PASO {currentStep} DE {totalSteps} — {stepTitles[currentStep - 1].desc}
                </span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4 self-center md:self-auto">
                {stepTitles.map((step) => {
                  const isCompleted = step.num < currentStep;
                  const isActive = step.num === currentStep;
                  return (
                    <div key={step.num} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (step.num < currentStep || isStepValid(step.num - 1))
                            setCurrentStep(step.num);
                        }}
                        disabled={step.num > currentStep && !isStepValid(currentStep)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${isCompleted
                            ? "bg-disney-pink text-brand-white shadow-sm"
                            : isActive
                              ? "border-2 border-disney-pink bg-brand-white text-disney-pink shadow-inner scale-110"
                              : "border border-line bg-brand-white text-ink-soft/70 cursor-not-allowed"
                          }`}
                      >
                        {isCompleted ? "✓" : step.num}
                      </button>
                      {step.num < totalSteps && (
                        <div
                          className={`h-[1px] w-4 sm:w-8 ml-2 md:ml-4 ${isCompleted ? "bg-disney-pink" : "bg-line"
                            }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>

                  {/* ── PASO 1 ── */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Honeypot invisible */}
                      <div
                        className="absolute -left-[9999px] top-auto w-1 h-1 overflow-hidden"
                        aria-hidden="true"
                      >
                        <label htmlFor="website">Dejá este campo vacío si sos humano</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div className="border-b border-line pb-4 mb-4">
                        <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">
                          Bienvenida/o, ¿con quién tenemos el gusto de hablar?
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div className="space-y-1">
                          <label className={labelBase}>
                            <User className="w-3.5 h-3.5 text-disney-pink" /> Nombre y Apellido
                          </label>
                          <input
                            type="text"
                            name="nombreApellido"
                            value={formData.nombreApellido}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={80}
                            autoComplete="name"
                            className={getError("nombreApellido") ? inputError : inputBase}
                          />
                          {getError("nombreApellido") && (
                            <p className={errorMsg}>{getError("nombreApellido")}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label className={labelBase}>
                            <Mail className="w-3.5 h-3.5 text-disney-pink" /> Correo Electrónico
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={100}
                            autoComplete="email"
                            className={getError("email") ? inputError : inputBase}
                          />
                          {getError("email") && (
                            <p className={errorMsg}>{getError("email")}</p>
                          )}
                        </div>

                        {/* WhatsApp */}
                        <div className="space-y-1 md:col-span-2">
                          <label className={labelBase}>
                            <Phone className="w-3.5 h-3.5 text-disney-pink" /> Teléfono / WhatsApp
                          </label>
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={20}
                            autoComplete="tel"
                            placeholder="Ej: +54 9 11 1234 5678"
                            className={getError("whatsapp") ? inputError : inputBase}
                          />
                          {getError("whatsapp") && (
                            <p className={errorMsg}>{getError("whatsapp")}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── PASO 2 ── */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-line pb-4 mb-4">
                        <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">
                          Requisitos Legales y Fechas Estimadas
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Pasajes */}
                        <div className="space-y-2">
                          <label className={labelBase}>¿Ya tienen pasajes?</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Sí", "No"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectOption("pasajes", opt)}
                                className={`p-4 rounded-sm border text-xs font-medium transition-all text-center flex flex-col items-center justify-center gap-2 shadow-sm ${formData.pasajes === opt
                                    ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold"
                                    : "border-line bg-brand-white hover:border-disney-pink/50"
                                  }`}
                              >
                                <span className="text-lg">{opt === "Sí" ? "Sí ✈️" : "No ⏳"}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Visa */}
                        <div className="space-y-2">
                          <label className={labelBase}>¿Tienen VISA vigente?</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Sí", "No", "En proceso", "Necesito ayuda"].map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => selectOption("visa", option)}
                                className={`p-2.5 rounded-sm border text-[11px] font-medium transition-all text-center shadow-sm ${formData.visa === option
                                    ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold"
                                    : "border-line bg-brand-white hover:border-disney-pink/50"
                                  }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Fecha */}
                        <div className="space-y-1">
                          <label className={labelBase}>
                            <Calendar className="w-3.5 h-3.5 text-disney-pink" /> ¿Fecha del viaje o mes de preferencia?
                          </label>
                          <input
                            type="text"
                            name="fechaViaje"
                            value={formData.fechaViaje}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={60}
                            placeholder="Ej: 15 de Octubre, o 'Julio 2026'" // <- Este pequeño cambio ayuda muchísimo
                            className={getError("fechaViaje") ? inputError : inputBase}
                          />
                          {getError("fechaViaje") && (
                            <p className={errorMsg}>{getError("fechaViaje")}</p>
                          )}
                        </div>

                        {/* Días */}
                        <div className="space-y-1">
                          <label className={labelBase}>
                            <Clock className="w-3.5 h-3.5 text-disney-pink" /> ¿Cuántos días les gustaría ir?
                          </label>
                          <input
                            type="text"
                            name="diasViaje"
                            value={formData.diasViaje}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={30}
                            placeholder="Ej: 10 días, o 'Una semana'" // <- Más claro para el usuario
                            className={getError("diasViaje") ? inputError : inputBase}
                          />
                          {getError("diasViaje") && (
                            <p className={errorMsg}>{getError("diasViaje")}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── PASO 3 ── */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-line pb-4 mb-4">
                        <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">
                          Contanos sobre el grupo viajero y atractivos
                        </h3>
                      </div>

                      <div className="space-y-5">
                        {/* Personas y edades */}
                        <div className="space-y-1">
                          <label className={labelBase}>
                            <Users className="w-3.5 h-3.5 text-disney-pink" /> ¿Cuántas personas viajan? Detallar edades
                          </label>
                          <input
                            type="text"
                            name="personasYEdades"
                            value={formData.personasYEdades}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={100}
                            placeholder="Ej: 2 adultos + 2 niños de 4 y 7 años"
                            className={getError("personasYEdades") ? inputError : inputBase}
                          />
                          {getError("personasYEdades") && (
                            <p className={errorMsg}>{getError("personasYEdades")}</p>
                          )}
                        </div>

                        {/* Reserva para */}
                        <div className="space-y-2">
                          <label className={labelBase}>
                            <Ticket className="w-3.5 h-3.5 text-disney-pink" /> ¿La reserva sería para?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {[
                              "Entradas a los parques (Disney & Universal)",
                              "Hoteles",
                              "Paquete (Tickets + Hotel)",
                              "Paquete (Tickets + Hotel + Plan comida)",
                              "Cruceros (Disney y NO Disney)",
                              "Otros",
                            ].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectOption("reservaPara", opt)}
                                className={`p-3 rounded-sm border text-xs font-medium transition-all text-left shadow-sm ${formData.reservaPara === opt
                                    ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold"
                                    : "border-line bg-brand-white hover:border-disney-pink/50"
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Parques */}
                        <div className="space-y-2">
                          <label className={labelBase}>
                            <Compass className="w-3.5 h-3.5 text-disney-pink" /> ¿Qué parques te interesa visitar?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {[
                              "Parques de Disney (Magic, Hollywood, Epcot, Animal)",
                              "Parques de Universal (Studios, Island of Adv, Epic Universe)",
                              "Parque acuático Universal (Volcano Bay)",
                              "Parques acuáticos Disney (Typhoon, Blizzard)",
                              "Todos Disney & Universal",
                              "Otros",
                            ].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectOption("parques", opt)}
                                className={`p-3 rounded-sm border text-[11px] sm:text-xs font-medium transition-all text-left shadow-sm ${formData.parques === opt
                                    ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold"
                                    : "border-line bg-brand-white hover:border-disney-pink/50"
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Hospedaje */}
                        <div className="space-y-2">
                          <label className={labelBase}>
                            <Building className="w-3.5 h-3.5 text-disney-pink" /> ¿Qué hospedaje preferís?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              "Dentro de Disney & Universal",
                              "Fuera de los parques",
                              "NO requiero hospedaje",
                            ].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectOption("hospedaje", opt)}
                                className={`p-4 rounded-sm border text-xs font-medium transition-all text-center flex flex-col justify-center shadow-sm ${formData.hospedaje === opt
                                    ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold"
                                    : "border-line bg-brand-white hover:border-disney-pink/50"
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── PASO 4 ── */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-line pb-4 mb-4">
                        <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">
                          Toques Finales y Estilo de Aventura
                        </h3>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className={labelBase}>¿Qué tipo de viaje buscas?</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {["Económico", "Moderado", "Lujoso"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectOption("tipoViaje", opt)}
                                className={`p-4 rounded-sm border text-sm font-bold transition-all text-center shadow-sm ${formData.tipoViaje === opt
                                    ? "border-disney-pink bg-disney-pink-light text-disney-pink"
                                    : "border-line bg-brand-white hover:border-disney-pink/50"
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Detalles con contador de caracteres */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className={labelBase}>
                              Dejanos cualquier detalle importante 🪄
                            </label>
                            <span
                              className={`text-[11px] font-sans tabular-nums ${formData.detalles.length > 450
                                  ? "text-red-400"
                                  : "text-ink-soft/60"
                                }`}
                            >
                              {formData.detalles.length}/500
                            </span>
                          </div>
                          <textarea
                            name="detalles"
                            value={formData.detalles}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                            maxLength={500}
                            className="w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3.5 text-ink text-sm shadow-inner resize-none outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Controles de navegación ── */}
                  <div className="flex items-center justify-between pt-6 border-t border-line mt-8">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentStep === 1 || loading}
                      className={`px-5 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${currentStep === 1
                          ? "opacity-0 pointer-events-none"
                          : "border border-line bg-brand-white hover:bg-disney-pink-light text-disney-pink shadow-sm"
                        }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Volver</span>
                    </button>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStepValid(currentStep)}
                        className={`px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${isStepValid(currentStep)
                            ? "bg-disney-pink text-brand-white hover:bg-disney-pink-deep"
                            : "bg-line border border-line text-ink-soft/40 cursor-not-allowed"
                          }`}
                      >
                        <span>Siguiente paso</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!isStepValid(4) || loading}
                        type="submit"
                        className={`font-sans text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full flex items-center justify-center space-x-2 shadow-sm ${isStepValid(4) && !loading
                            ? "bg-disney-pink hover:bg-disney-pink-deep text-brand-white"
                            : "bg-line border border-line text-ink-soft/40 cursor-not-allowed"
                          }`}
                      >
                        {loading ? (
                          <span className="animate-pulse">Diseñando magia...</span>
                        ) : (
                          <>
                            <span>Enviar Solicitud Mágica</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>
              ) : (
                /* ── Pantalla de confirmación ── */
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 flex flex-col items-center justify-center"
                >
                  <div className="p-4 bg-disney-pink-light text-disney-pink rounded-full mb-6">
                    <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-3xl text-ink mb-3 font-medium">
                    ¡Solicitud enviada con éxito! ✈️
                  </h3>
                  <p className="font-sans text-ink-soft font-light max-w-md mb-8 leading-relaxed">
                    Muchas gracias{" "}
                    <span className="font-semibold text-disney-pink">
                      {capitalizarNombre(formData.nombreApellido)}
                    </span>
                    , recibimos toda la información correctamente.
                    <br />
                    <br />
                    Agus y Marti ya están analizando tus respuestas para armar la mejor propuesta. Nos vamos a poner en contacto a tu WhatsApp{" "}
                    <strong>{normalizarWhatsapp(formData.whatsapp)}</strong> a la brevedad con tu presupuesto personalizado.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
