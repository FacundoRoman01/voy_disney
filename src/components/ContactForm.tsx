// import React, { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { 
//   Sparkles, 
//   PlaneTakeoff, 
//   Send, 
//   CheckCircle2, 
//   ChevronLeft, 
//   ChevronRight, 
//   User, 
//   Mail, 
//   Phone, 
//   Calendar, 
//   Clock, 
//   Users, 
//   Ticket, 
//   Building, 
//   Compass, 
//   Sparkle 
// } from "lucide-react";
// import { FormularioDisney } from "../types";

// export default function ContactForm() {
// const [formData, setFormData] = useState<FormularioDisney>({
//     email: "",
//     nombreApellido: "",
//     whatsapp: "",
//     pasajes: "", 
//     visa: "",
//     fechaViaje: "",
//     diasViaje: "",
//     personasYEdades: "",
//     reservaPara: "", 
//     parques: "",
//     hospedaje: "",
//     tipoViaje: "",
//     detalles: "",
//     website: "",
//   });

//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 4;
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadTime] = useState(Date.now());

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // --- SISTEMA ANTISPAM INVISIBLE ---
//     const tiempoTardado = Date.now() - loadTime;
    
//     // Si llenó el campo oculto (Bot) o tardó menos de 5 segundos en llenar 4 pasos (Bot)
//     if (formData.website !== "" || tiempoTardado < 5000) {
//       console.warn("Bloqueo Antispam activado. Petición rechazada.");
//       setSubmitted(true); // Le mentimos al bot diciendo que salió bien
//       return; // Cortamos la ejecución para que no llegue al Excel
//     }
//     // ----------------------------------

//     setLoading(true);

//     try {
//       const scriptURL = "TU_URL_DE_GOOGLE_APPS_SCRIPT_ACA";

//       await fetch(scriptURL, {
//         method: "POST",
//         mode: "no-cors", 
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       setSubmitted(true);
      
//     } catch (error) {
//       console.error("Error al enviar el formulario:", error);
//       alert("Hubo un error al enviar tu consulta mágica. Por favor, intentá de nuevo.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const selectOption = (name: keyof FormularioDisney, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNext = () => {
//     if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentStep > 1) setCurrentStep((prev) => prev - 1);
//   };

//   // Validación actualizada para 'pasajes'
//   const isStepValid = (step: number): boolean => {
//     switch (step) {
//       case 1:
//         return (
//           formData.nombreApellido.trim().length > 2 &&
//           formData.email.trim().includes("@") &&
//           formData.whatsapp.trim().length > 4
//         );
//       case 2:
//         return (
//           formData.pasajes !== "" &&
//           formData.visa !== "" &&
//           formData.fechaViaje.trim().length > 0 &&
//           formData.diasViaje.trim().length > 0
//         );
//       case 3:
//         return (
//           formData.personasYEdades.trim().length > 0 &&
//           formData.reservaPara !== "" && // <-- 2. Cambiado acá
//           formData.parques !== "" &&
//           formData.hospedaje !== ""
//         );
//       case 4:
//         return formData.tipoViaje !== "";
//       default:
//         return true;
//     }
//   };

//   const stepTitles = [
//     { num: 1, label: "Tus Datos", desc: "Datos de contacto" },
//     { num: 2, label: "Documentos", desc: "Pasajes, Visa & Fechas" },
//     { num: 3, label: "Estadía Mágica", desc: "Lugar & Parques" },
//     { num: 4, label: "Tu Estilo", desc: "Presupuesto & Sueños" },
//   ];

//   return (
//     <section id="contacto" className="py-20 lg:py-28 bg-brand-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-disney-pink-light/35 rounded-full blur-2xl"></div>
//       <div className="absolute -top-12 right-0 w-60 h-60 bg-disney-pink-wash rounded-full blur-2xl opacity-60"></div>

//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <span className="text-disney-pink font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-4">
//             COTIZA TU VIAJE
//           </span>
//           <h2 className="font-serif text-ink text-3xl sm:text-4xl lg:text-[49px] font-medium leading-[1.08] tracking-[-0.01em] mb-4">
//             Empecemos a diseñar tu <span className="text-disney-pink italic font-normal inline-block">itinerario mágico</span>
//           </h2>
//           <p className="font-sans text-ink-soft font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
//             Agus & Marti diseñarán una propuesta totalmente personalizada. Rellená este paso a paso boutique y dejaselo en manos de expertas oficiales.
//           </p>
//         </div>

//         <div className="bg-disney-pink-wash border border-line rounded-lg shadow-sm relative overflow-hidden">
//           {/* Progress Tracker */}
//           <div className="border-b border-line bg-brand-white/80 p-6">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="flex items-center space-x-3 bg-disney-pink-wash border border-line py-1 px-3.5 rounded-full w-fit">
//                 <Sparkles className="w-4 h-4 text-disney-pink" />
//                 <span className="font-sans text-xs font-bold text-disney-pink uppercase tracking-wider">
//                   PASO {currentStep} DE {totalSteps} — {stepTitles[currentStep - 1].desc}
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2 md:space-x-4 self-center md:self-auto">
//                 {stepTitles.map((step) => {
//                   const isCompleted = step.num < currentStep;
//                   const isActive = step.num === currentStep;
//                   return (
//                     <div key={step.num} className="flex items-center">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           if (step.num < currentStep || isStepValid(step.num - 1)) setCurrentStep(step.num);
//                         }}
//                         disabled={step.num > currentStep && !isStepValid(currentStep)}
//                         className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
//                           isCompleted ? "bg-disney-pink text-brand-white shadow-sm" : isActive ? "border-2 border-disney-pink bg-brand-white text-disney-pink shadow-inner scale-110" : "border border-line bg-brand-white text-ink-soft/70 cursor-not-allowed"
//                         }`}
//                       >
//                         {isCompleted ? "✓" : step.num}
//                       </button>
//                       {step.num < totalSteps && (
//                         <div className={`h-[1px] w-4 sm:w-8 ml-2 md:ml-4 ${isCompleted ? "bg-disney-pink" : "bg-line"}`} />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="p-6 sm:p-10 lg:p-12">
//             <AnimatePresence mode="wait">
//               {!submitted ? (
//                 <form onSubmit={handleSubmit} className="space-y-8">
                  
//                   {/* PASO 1 */}
//                  {/* PASO 1 */}
//                   {currentStep === 1 && (
//                     <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      
//                       {/* --- TRAMPA HONEYPOT - INVISIBLE PARA HUMANOS --- */}
//                       <div className="absolute -left-[9999px] top-auto w-1 h-1 overflow-hidden" aria-hidden="true">
//                         <label htmlFor="website">Dejá este campo vacío si sos humano</label>
//                         <input 
//                           type="text" 
//                           id="website" 
//                           name="website" 
//                           value={formData.website} 
//                           onChange={handleChange} 
//                           tabIndex={-1} 
//                           autoComplete="off" 
//                         />
//                       </div>
//                       {/* --- FIN TRAMPA --- */}

//                       <div className="border-b border-line pb-4 mb-4">
//                         <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">Bienvenida/o, ¿con quién tenemos el gusto de hablar?</h3>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-disney-pink" /> Nombre y Apellido</label>
//                           <input required type="text" name="nombreApellido" value={formData.nombreApellido} onChange={handleChange} className="w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3 text-ink text-sm shadow-sm" />
//                         </div>
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-disney-pink" /> Correo Electrónico</label>
//                           <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3 text-ink text-sm shadow-sm" />
//                         </div>
//                         <div className="space-y-2 md:col-span-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-disney-pink" /> Teléfono / WhatsApp</label>
//                           <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Ej: +54 9 11 1234 5678" className="w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3 text-ink text-sm shadow-sm" />
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* PASO 2 */}
//                   {currentStep === 2 && (
//                     <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
//                       <div className="border-b border-line pb-4 mb-4">
//                         <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">Requisitos Legales y Fechas Estimadas</h3>
//                       </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
//                         {/* Pasajes */}
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider block">¿Ya tienen pasajes?</label>
//                           <div className="grid grid-cols-2 gap-3">
//                             {["Sí", "No"].map((opt) => (
//                               <button key={opt} type="button" onClick={() => selectOption("pasajes", opt)} className={`p-4 rounded-sm border text-xs font-medium transition-all text-center flex flex-col items-center justify-center gap-2 shadow-sm ${formData.pasajes === opt ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold" : "border-line bg-brand-white hover:border-disney-pink/50"}`}>
//                                 <span className="text-lg">{opt === "Sí" ? "Sí ✈️" : "No ⏳"}</span>
//                               </button>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Visa */}
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider block">¿Tienen VISA vigente?</label>
//                           <div className="grid grid-cols-2 gap-2">
//                             {["Sí", "No", "En proceso", "Necesito ayuda"].map((option) => (
//                               <button key={option} type="button" onClick={() => selectOption("visa", option)} className={`p-2.5 rounded-sm border text-[11px] font-medium transition-all text-center shadow-sm ${formData.visa === option ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold" : "border-line bg-brand-white hover:border-disney-pink/50"}`}>
//                                 {option}
//                               </button>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-disney-pink" /> ¿Fecha del viaje o mes de preferencia?</label>
//                           <input type="text" name="fechaViaje" value={formData.fechaViaje} onChange={handleChange} className="w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3 text-ink text-sm shadow-sm" />
//                         </div>

//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-disney-pink" /> ¿Cuantos días les gustaría ir?</label>
//                           <input type="text" name="diasViaje" value={formData.diasViaje} onChange={handleChange} placeholder="En caso de no tener fecha definida" className="w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3 text-ink text-sm shadow-sm" />
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* PASO 3 */}
//                   {currentStep === 3 && (
//                     <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
//                       <div className="border-b border-line pb-4 mb-4">
//                         <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">Contanos sobre el grupo viajero y atractivos</h3>
//                       </div>
//                       <div className="space-y-5">
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-disney-pink" /> ¿Cuántas personas viajan? Detallar edades</label>
//                           <input required type="text" name="personasYEdades" value={formData.personasYEdades} onChange={handleChange} placeholder="Ej: 2 adultos + 2 niños de 4 y 7 años" className="w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3 text-ink text-sm shadow-sm" />
//                         </div>

//                         {/* Intereses */}
//                        {/* Intereses -> Reserva Para */}
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5 text-disney-pink" /> ¿La reserva seria para?</label>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                             {[
//                               "Entradas a los parques (Disney & Universal)",
//                               "Hoteles",
//                               "Paquete (Tickets + Hotel)",
//                               "Paquete (Tickets + Hotel + Plan comida)",
//                               "Cruceros (Disney y NO Disney)",
//                               "Otros"
//                             ].map((opt) => (
//                               <button 
//                                 key={opt} 
//                                 type="button" 
//                                 onClick={() => selectOption("reservaPara", opt)} // <-- 3. Cambiado acá
//                                 className={`p-3 rounded-sm border text-xs font-medium transition-all text-left shadow-sm ${formData.reservaPara === opt ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold" : "border-line bg-brand-white hover:border-disney-pink/50"}`} // <-- 4. Cambiado acá
//                               >
//                                 {opt}
//                               </button>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Parques */}
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-disney-pink" /> ¿Qué parques te interesa visitar?</label>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                             {[
//                               "Parques de Disney (Magic, Hollywood, Epcot, Animal)",
//                               "Parques de Universal (Studios, Island of Adv, Epic Universe)",
//                               "Parque acuático Universal (Volcano Bay)",
//                               "Parques acuáticos Disney (Typhoon, Blizzard)",
//                               "Todos Disney & Universal",
//                               "Otros"
//                             ].map((opt) => (
//                               <button key={opt} type="button" onClick={() => selectOption("parques", opt)} className={`p-3 rounded-sm border text-[11px] sm:text-xs font-medium transition-all text-left shadow-sm ${formData.parques === opt ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold" : "border-line bg-brand-white hover:border-disney-pink/50"}`}>
//                                 {opt}
//                               </button>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-disney-pink" /> ¿Qué hospedaje preferís?</label>
//                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                             {["Dentro de Disney & Universal", "Fuera de los parques", "NO requiero hospedaje"].map((opt) => (
//                               <button key={opt} type="button" onClick={() => selectOption("hospedaje", opt)} className={`p-4 rounded-sm border text-xs font-medium transition-all text-center flex flex-col justify-center shadow-sm ${formData.hospedaje === opt ? "border-disney-pink bg-disney-pink-light text-disney-pink font-bold" : "border-line bg-brand-white hover:border-disney-pink/50"}`}>
//                                 {opt}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* PASO 4 */}
//                   {currentStep === 4 && (
//                     <motion.div key="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
//                       <div className="border-b border-line pb-4 mb-4">
//                         <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium">Toques Finales y Estilo de Aventura</h3>
//                       </div>
//                       <div className="space-y-6">
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider block">¿Qué tipo de viaje buscas?</label>
//                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                             {["Económico", "Moderado", "Lujoso"].map((opt) => (
//                               <button key={opt} type="button" onClick={() => selectOption("tipoViaje", opt)} className={`p-4 rounded-sm border text-sm font-bold transition-all text-center shadow-sm ${formData.tipoViaje === opt ? "border-disney-pink bg-disney-pink-light text-disney-pink" : "border-line bg-brand-white hover:border-disney-pink/50"}`}>
//                                 {opt}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <label className="text-[10px] sm:text-xs font-bold text-ink uppercase tracking-wider block">Déjanos cualquier detalle que sea importante para la planificación del viaje 🪄</label>
//                           <textarea name="detalles" value={formData.detalles} onChange={handleChange} rows={4} className="w-full bg-brand-white border border-line focus:border-disney-pink rounded-sm px-4 py-3.5 text-ink text-sm shadow-inner resize-none"></textarea>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Controles */}
//                   <div className="flex items-center justify-between pt-6 border-t border-line mt-8">
//                     <button type="button" onClick={handlePrev} disabled={currentStep === 1 || loading} className={`px-5 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${currentStep === 1 ? "opacity-0 pointer-events-none" : "border border-line bg-brand-white hover:bg-disney-pink-light text-disney-pink shadow-sm"}`}>
//                       <ChevronLeft className="w-4 h-4" /><span>Volver</span>
//                     </button>
//                     {currentStep < totalSteps ? (
//                       <button type="button" onClick={handleNext} disabled={!isStepValid(currentStep)} className={`px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${isStepValid(currentStep) ? "bg-disney-pink text-brand-white hover:bg-disney-pink-deep" : "bg-line border border-line text-ink-soft/40 cursor-not-allowed"}`}>
//                         <span>Siguiente paso</span><ChevronRight className="w-4 h-4" />
//                       </button>
//                     ) : (
//                       <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!isStepValid(4) || loading} type="submit" className={`font-sans text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full flex items-center justify-center space-x-2 shadow-sm ${isStepValid(4) && !loading ? "bg-disney-pink hover:bg-disney-pink-deep text-brand-white" : "bg-line border border-line text-ink-soft/40 cursor-not-allowed"}`}>
//                         {loading ? <span className="animate-pulse">Diseñando magia...</span> : <><span>Enviar Solicitud Mágica</span><Send className="w-4 h-4" /></>}
//                       </motion.button>
//                     )}
//                   </div>
//                 </form>
//               ) : (
//                 <motion.div key="thank-you" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-12 flex flex-col items-center justify-center">
//                   <div className="p-4 bg-disney-pink-light text-disney-pink rounded-full mb-6 relative">
//                     <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
//                     <Sparkle className="w-4 h-4 text-disney-pink absolute top-1 right-1 animate-spin" />
//                   </div>
//                   <h3 className="font-serif text-3xl text-ink mb-3 font-medium">¡Hada Madrina en camino! ✨</h3>
//                   <p className="font-sans text-ink-soft font-light max-w-md mb-8 leading-relaxed">
//                     Muchas gracias <span className="font-semibold text-disney-pink">{formData.nombreApellido}</span>, hemos recibido tu solicitud de viaje de forma exitosa. <br/><br/>
//                     Agustín y Marti coordinarán presupuesto y disponibilidad. ¡Te enviaremos novedades a tu WhatsApp <strong>{formData.whatsapp}</strong> muy pronto!
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }