import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass,
  Milestone,
  Ship,
  Star,
  Sparkle,
} from "lucide-react";
import { Service } from "../types";

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = service.images ?? [];
  const hasMultiple = images.length > 1;
  const includes = service.includes ?? [];

  useEffect(() => {
    images.forEach((img) => {
      const el = new Image();
      el.src = img.url;
    });
  }, [service.id, images]);

  const handleNext = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const renderIcon = (iconName: string) => {
    const cls = "w-4 h-4 stroke-[1.5]";
    switch (iconName) {
      case "Sparkles": return <Sparkles className={cls} />;
      case "Compass":  return <Compass className={cls} />;
      case "Milestone": return <Milestone className={cls} />;
      case "Ship":      return <Ship className={cls} />;
      case "Star":      return <Star className={cls} />;
      default:          return <Sparkles className={cls} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#efa9c0]/20 backdrop-blur-md"
      />

      {/* Modal Box — max-h-[90vh] para que nunca se pase de la pantalla */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-brand-white rounded-[28px] w-full max-w-[1000px] shadow-2xl border border-white/50 z-10 flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:h-[85vh]"
      >
        {/* Botón de cierre global */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-[#efa9c0]/20 text-ink hover:text-[#efa9c0] hover:scale-105 hover:bg-white transition-all flex items-center justify-center cursor-pointer shadow-sm focus:outline-none"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        {/* ── LEFT: Carousel ── */}
        {/* Reducimos la altura a 45vh en mobile para dar espacio al texto */}
        <div className="relative w-full h-[45vh] md:h-full md:w-5/12 shrink-0 bg-gray-50 flex flex-col overflow-hidden group">
          


          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
               <motion.img
  key={currentImageIndex}
  src={images[currentImageIndex]?.url}
  alt={`${service.title} – foto ${currentImageIndex + 1}`}
  width="800" 
  height="600" 
  decoding="async"
  initial={{ opacity: 0, scale: 1.05 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.35 }}
  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
  referrerPolicy="no-referrer"
/>
              ) : (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-gray-300" />
                </div>
              )}
            </AnimatePresence>
          </div>

          {hasMultiple && (
            <>
              {/* BOTONES SOLO PARA MOBILE (Visibles por defecto en pequeño, ocultos en md+) */}
              <div className="absolute inset-0 flex items-center justify-between px-4 z-30 md:hidden pointer-events-none">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-ink flex items-center justify-center shadow-lg active:scale-95 transition-all pointer-events-auto"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2]" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-ink flex items-center justify-center shadow-lg active:scale-95 transition-all pointer-events-auto"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2]" />
                </button>
              </div>

              {/* Botones Desktop (con group-hover) */}
              <div className="absolute inset-y-0 left-0 flex items-center px-3 opacity-0 group-hover:opacity-100 transition-opacity z-20 hidden md:flex">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md text-ink hover:text-[#efa9c0] hover:bg-white transition-all flex items-center justify-center cursor-pointer shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2]" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 opacity-0 group-hover:opacity-100 transition-opacity z-20 hidden md:flex">
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md text-ink hover:text-[#efa9c0] hover:bg-white transition-all flex items-center justify-center cursor-pointer shadow-md"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              <div className="absolute bottom-5 left-0 right-0 z-20 flex flex-col items-center gap-2">
                <div className="bg-black/30 backdrop-blur-md text-white font-sans text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {currentImageIndex + 1} / {images.length}
                </div>
                <div className="flex items-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                        idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Ir a imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT: Content ── */}
        {/* Usamos flex-1 y min-h-0 para forzar el scroll interno en flexbox */}
        <div className="flex flex-col w-full md:w-7/12 flex-1 min-h-0 bg-brand-white relative">
          
          {/* Contenido scrolleable - flex-1 activa el scroll */}
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 md:px-10 md:pt-12 scrollbar-thin scrollbar-thumb-[#efa9c0]/50 scrollbar-track-transparent">
            
            <div className="mb-6">
              <h3 className="font-serif text-[28px] sm:text-[40px] text-ink font-semibold leading-[1.05] tracking-tight mb-3 pr-4">
                {service.title.split(" ").map((word, i, arr) =>
                  i === arr.length - 1
                    ? <em key={i} className="not-italic text-[#efa9c0] font-serif font-normal">{word}</em>
                    : <span key={i}>{word} </span>
                )}
              </h3>
              {service.subtitle && (
                <p className="font-sans text-[14px] text-ink-soft italic leading-snug border-l-2 border-[#efa9c0] pl-3">
                  {service.subtitle}
                </p>
              )}
            </div>

            <p className="font-sans text-gray-600 text-[14px] font-light leading-relaxed mb-8">
              {service.detailedDescription || service.description}
            </p>

            {includes.length > 0 && (
              <div className="space-y-4 mb-4">
                <h4 className="font-sans font-extrabold text-[11px] text-[#efa9c0] uppercase tracking-widest flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Lo que incluye
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.slice(0, 4).map((incl, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-[#fdf5f7]/50 border border-[#fbebf0] rounded-xl p-3">
                      <div className="w-5 h-5 rounded-full bg-white text-[#efa9c0] shadow-sm flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-sans text-[12.5px] text-ink font-medium leading-snug mt-0.5">
                        {incl}
                      </span>
                    </div>
                  ))}
                </div>

                {includes.length > 4 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {includes.slice(4).map((incl, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-[11.5px] font-medium">
                        <Sparkle className="w-3 h-3 text-gray-400" /> {incl}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer CTA anclado al fondo (shrink-0 asegura que no se comprima) */}
          <div className="border-t border-[#f0e2e5] px-6 py-5 md:px-10 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 z-10">
            <div className="flex flex-col text-center sm:text-left hidden sm:flex">
              <span className="font-serif text-lg font-medium text-ink">¿Te interesa?</span>
              <span className="font-sans font-light text-[12.5px] text-ink-soft">
                Cotizamos tu viaje sin compromiso.
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  const el = document.getElementById("contacto");
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                }, 150);
              }}
              className="w-full sm:w-auto bg-[#efa9c0] hover:bg-[#e08aa8] text-white font-sans text-[12px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg shadow-[#efa9c0]/30 hover:shadow-xl hover:shadow-[#efa9c0]/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 focus:outline-none"
            >
              Cotizar viaje
              <Sparkle className="w-4 h-4 text-white/90 fill-current" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}