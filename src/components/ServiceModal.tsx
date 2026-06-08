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
} from "lucide-react";
import { Service } from "../types";

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const images = service.images ?? [];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    images.forEach((img) => {
      const el = new Image();
      el.src = img.url;
    });
  }, [service.id]);

  const goTo = (idx: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrentImageIndex(idx);
  };

  const handleNext = () => goTo((currentImageIndex + 1) % images.length, 1);
  const handlePrev = () => goTo((currentImageIndex - 1 + images.length) % images.length, -1);

  const renderIcon = (iconName: string) => {
    const cls = "w-5 h-5 stroke-[1.5]";
    switch (iconName) {
      case "Sparkles":  return <Sparkles className={cls} />;
      case "Compass":   return <Compass className={cls} />;
      case "Milestone": return <Milestone className={cls} />;
      case "Ship":      return <Ship className={cls} />;
      case "Star":      return <Star className={cls} />;
      default:          return <Sparkles className={cls} />;
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
    center: { x: 0 },
    exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.9 }}
        className="relative w-full sm:max-w-lg max-h-[96vh] sm:max-h-[90vh] flex flex-col z-10 rounded-[28px] overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.28)" }}
      >
        {/* ── HERO IMAGE ── */}
        {/* FIX: bg-black en lugar de bg-disney-pink-wash — no se ve rosa entre slides */}
        <div className="relative w-full h-72 sm:h-80 shrink-0 overflow-hidden bg-black select-none">

          <AnimatePresence mode="popLayout" custom={direction}>
            {images.length > 0 ? (
              <motion.img
                key={currentImageIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                // FIX: sin opacity en la transición — solo slide horizontal puro, sin flash
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                src={images[currentImageIndex]?.url}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 magic-stripes opacity-30" />
            )}
          </AnimatePresence>

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none z-10" />

          {/* Floating top bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
              <span className="text-white/90">{renderIcon(service.icon)}</span>
              <span className="text-[10px] font-extrabold tracking-widest text-white/90 uppercase">
                {service.badge}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all flex items-center justify-center focus:outline-none"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6">
            <h3 className="font-serif text-white text-2xl sm:text-3xl font-semibold leading-tight tracking-tight drop-shadow-sm">
              {service.title.split(" ").map((word, i, arr) =>
                i === arr.length - 1
                  ? <em key={i} className="not-italic text-disney-pink">{word}</em>
                  : <span key={i}>{word} </span>
              )}
            </h3>
            {service.subtitle && (
              <p className="text-white/65 text-xs font-light mt-1 font-sans italic">
                &ldquo;{service.subtitle}&rdquo;
              </p>
            )}
          </div>

          {/* Carousel controls */}
          {hasMultiple && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-all flex items-center justify-center focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2]" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/30 transition-all flex items-center justify-center focus:outline-none"
              >
                <ChevronRight className="w-4 h-4 stroke-[2]" />
              </button>
              <div className="absolute bottom-5 right-5 z-30 flex items-center gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); goTo(idx, idx > currentImageIndex ? 1 : -1); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/65"
                    }`}
                    aria-label={`Imagen ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── CONTENT TRAY ── */}
        <div className="bg-brand-white flex flex-col flex-grow overflow-hidden">
          <div className="overflow-y-auto flex-grow px-6 pt-6 pb-2 space-y-5">

            <p className="font-sans text-ink-soft text-sm font-light leading-relaxed">
              {service.detailedDescription || service.description}
            </p>

            {/* FIX: chips sin motion.div — div estático, sin stagger, sin re-animación */}
            {service.includes && service.includes.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-sans font-bold text-[10px] text-disney-pink uppercase tracking-widest">
                  ¿Qué incluye?
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.includes.map((incl, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-disney-pink-wash/50 border border-disney-pink/15 px-3 py-1.5 rounded-full"
                    >
                      <Check className="w-2.5 h-2.5 text-disney-pink stroke-[3] shrink-0" />
                      <span className="text-[11px] font-sans text-ink font-medium leading-none">
                        {incl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky footer */}
          <div className="px-6 py-4 border-t border-line flex items-center gap-3 shrink-0">
            <button
              onClick={onClose}
              className="flex-none px-4 py-2.5 rounded-full font-sans text-xs font-bold text-ink-soft hover:bg-disney-pink-wash/50 transition-colors uppercase tracking-wider focus:outline-none"
            >
              Cerrar
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onClose();
                setTimeout(() => {
                  const el = document.getElementById("contacto");
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                }, 150);
              }}
              className="flex-1 bg-disney-pink hover:bg-disney-pink-deep text-brand-white font-sans text-xs font-bold uppercase tracking-widest py-3 rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors focus:outline-none"
            >
              <span>Cotizar este viaje</span>
              <Sparkles className="w-3.5 h-3.5 opacity-90" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}