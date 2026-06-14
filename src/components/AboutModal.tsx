import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkle,
  Heart,
  Star,
  Map,
  HeartHandshake
} from "lucide-react";

interface AboutModalProps {
  onClose: () => void;
  onConsultClick: () => void;
}

export default function AboutModal({ onClose, onConsultClick }: AboutModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { url: "/assets/img/Disney_y_Universal_Orlando/4C9B331D-B7E2-431F-9078-D0009C669E14.webp" },
    { url: "/assets/img/Disney_y_Universal_Orlando/9E804503-D892-4900-A14A-181C3A7D31FD.webp" },
    { url: "/assets/img/Disney_y_Universal_Orlando/30C16CE8-AC78-4878-ABFB-CBF019131F13.webp" },
    { url: "/assets/img/Disney_y_Universal_Orlando/FC9B1910-46CD-4A0B-9FC1-AE360C3B5001.webp" }
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#efa9c0]/15 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative bg-brand-white rounded-[32px] w-full max-w-4xl overflow-hidden shadow-2xl border border-line/45 z-10 flex flex-col max-h-[96vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-9 h-9 rounded-full border border-black/10 bg-brand-white text-black hover:text-[#efa9c0] hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-sm focus:outline-none"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        {/* CONTENEDOR SCROLLEABLE */}
        <div className="overflow-y-auto flex-1 custom-scrollbar w-full">
          
          {/* NUEVA ESTRUCTURA: Flex en Mobile (usando 'order') y Grid en Desktop */}
          <div className="flex flex-col md:grid md:grid-cols-2 w-full h-full">
            
            {/* 1. CAROUSEL (Top-Left en Desktop, 1ro en Mobile) */}
            <div className="order-1 md:col-start-1 md:row-start-1 relative w-full aspect-[4/3] md:aspect-auto md:h-[350px] rounded-t-[32px] md:rounded-tr-none md:rounded-tl-[32px] overflow-hidden bg-white select-none shrink-0 border-b md:border-b-0 border-line/30">
              
              <div className="absolute top-5 left-5 z-20 bg-[#1a1a1a]/45 backdrop-blur-[2px] text-brand-white font-sans text-[11px] font-bold px-3 py-1.5 rounded-full select-none shadow-xs">
                {currentImageIndex + 1} / {images.length}
              </div>

              <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-brand-white text-black hover:text-[#efa9c0] hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-xs focus:outline-none">
                <ChevronLeft className="w-5 h-5 stroke-[2]" />
              </button>

              <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-brand-white text-black hover:text-[#efa9c0] hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-xs focus:outline-none">
                <ChevronRight className="w-5 h-5 stroke-[2]" />
              </button>

              <AnimatePresence>
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex].url}
                  alt={`Foto ${currentImageIndex + 1} de Agus y Marti`}
                  width="450"      
                  height="350"    
                  decoding="async" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-brand-white/30 px-2.5 py-1.5 rounded-full backdrop-blur-[1px]">
                {images.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentImageIndex ? "w-4 bg-brand-white" : "w-1.5 bg-brand-white/50"}`} />
                ))}
              </div>
            </div>

            {/* 2. TEXTO HISTORIA (Top-Right en Desktop, 2do en Mobile) */}
            <div className="order-2 md:col-start-2 md:row-start-1 p-6 md:p-8 md:pl-4 pt-8 md:pt-10 flex flex-col justify-center">
              <span className="text-[#efa9c0] font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-2.5">
                NUESTRA HISTORIA
              </span>
              
              <h3 className="font-serif text-[28px] sm:text-[34px] text-ink font-semibold leading-[1.12] tracking-tight mb-4">
                Hola, somos <span className="text-[#efa9c0] italic font-serif font-normal">Agus y Marti</span>
              </h3>

              <div className="space-y-3.5 font-sans text-[#555555] text-[13.5px] sm:text-[14px] font-light leading-relaxed">
                <p>
                  Lo nuestro empezó como empieza la magia: con un sueño. Viajar a Disney nos cambió la forma de ver las vacaciones, y nos dimos cuenta de que lo que más nos llenaba era ayudar a otros a vivir lo mismo.
                </p>
                <p>
                  Así nació Voydisney. Hoy somos agentes certificados Disney & Universal y viajamos cada año para probar todo en persona: hoteles, parques, restaurantes y experiencias. Esa pasión y experiencia real es lo que ponemos en cada viaje que armamos para vos.
                </p>
              </div>
            </div>

            {/* 3. FEATURES IZQUIERDA (Bottom-Left en Desktop, 3ro en Mobile) */}
            <div className="order-3 md:col-start-1 md:row-start-2 px-6 md:px-8 pb-2 md:pb-8 pt-4 md:pt-6 space-y-5 md:space-y-6">
              
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf5f7] border border-[#fbebf0] text-[#efa9c0] flex items-center justify-center shrink-0 shadow-xs">
                  <Heart className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-ink text-[14px]">Pasión real</h4>
                  <p className="font-sans font-light text-[12.5px] text-ink-soft leading-normal">
                    Amamos lo que hacemos y se nota en cada detalle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf5f7] border border-[#fbebf0] text-[#efa9c0] flex items-center justify-center shrink-0 shadow-xs">
                  <Map className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-ink text-[14px]">Experiencia propia</h4>
                  <p className="font-sans font-light text-[12.5px] text-ink-soft leading-normal">
                    Viajamos y probamos todo antes de recomendarlo.
                  </p>
                </div>
              </div>

            </div>

            {/* 4. FEATURES DERECHA (Bottom-Right en Desktop, 4to en Mobile) */}
            <div className="order-4 md:col-start-2 md:row-start-2 px-6 md:px-8 md:pl-4 pb-8 md:pb-8 pt-3 md:pt-6 space-y-5 md:space-y-6">
              
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf5f7] border border-[#fbebf0] text-[#efa9c0] flex items-center justify-center shrink-0 shadow-xs">
                  <Star className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-ink text-[14px]">Agentes certificados</h4>
                  <p className="font-sans font-light text-[12.5px] text-ink-soft leading-normal">
                    Formación oficial Disney & Universal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf5f7] border border-[#fbebf0] text-[#efa9c0] flex items-center justify-center shrink-0 shadow-xs">
                  <HeartHandshake className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-ink text-[14px]">Trato cercano</h4>
                  <p className="font-sans font-light text-[12.5px] text-ink-soft leading-normal">
                    Te acompañamos como un amigo que ya estuvo ahí.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-[#f0e2e5] mx-6 md:mx-8 shrink-0" />

        {/* Footer Fixed */}
        <div className="px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 select-none shrink-0 bg-brand-white">
          <p className="font-sans font-light text-xs sm:text-[13px] text-ink-soft text-center sm:text-left">
            ¿Nos conocemos? Contanos tu viaje soñado.
          </p>
          
          <button
            onClick={() => {
              onClose();
              onConsultClick();
            }}
            className="w-full sm:w-auto bg-[#efa9c0] hover:bg-[#e08aa8] text-brand-white font-sans text-xs sm:text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
          >
            <span>Quiero que me asesoren</span>
            <Sparkle className="w-3.5 h-3.5 text-white/90 fill-current" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}