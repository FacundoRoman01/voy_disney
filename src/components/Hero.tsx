import React from "react";
import { motion } from "motion/react";

interface HeroProps {
  onQuoteClick: () => void;
  onServicesClick: () => void;
}

const SparkleStar = ({ className, delay = 0, size = "w-6 h-6" }: { className?: string; delay?: number; size?: string }) => (
  <motion.svg
    className={`${size} ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.8, opacity: 0.3 }}
    animate={{ 
      scale: [0.8, 1.1, 0.8],
      opacity: [0.3, 0.9, 0.3]
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
  </motion.svg>
);

export default function Hero({ onQuoteClick, onServicesClick }: HeroProps) {
  const finalHeroImageSrc = "/assets/img/disney_hero.webp";

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] pt-24 lg:pt-28 flex items-center overflow-hidden border-b border-line bg-disney-pink-wash"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-disney-pink-light/20">
        <img
          src={finalHeroImageSrc}
          alt="Disney World Cinderella Castle"
          style={{ color: "transparent" }}
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="sync"
          // La imagen es casi cuadrada, en desktop la anclamos a la derecha
          // para que el castillo quede a la derecha y la card tenga espacio a la izquierda.
          // object-[70%_20%] = 70% horizontal (más a la derecha), 20% vertical (más arriba, más torres)
          className="w-full h-full object-cover object-[center_20%] lg:object-[70%_20%] pointer-events-none"
        />


      </div>

      {/* Sparkle stars en el área del cielo */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <SparkleStar
          className="absolute left-[30%] top-[15%] text-disney-pink/70 hidden sm:block"
          size="w-5 h-5"
          delay={0.2}
        />
        <SparkleStar
          className="absolute left-[46%] top-[10%] text-disney-pink/80"
          size="w-6 h-6"
          delay={1.1}
        />
        <SparkleStar
          className="absolute left-[54%] top-[18%] text-disney-pink/60"
          size="w-4 h-4"
          delay={2.4}
        />
      </div>

      {/* Foreground Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 py-12 flex justify-center lg:justify-start">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-brand-white/95 backdrop-blur-md rounded-[32px] p-8 sm:p-10 lg:p-12 shadow-lg border border-line relative max-w-[460px] w-full flex flex-col items-start text-left mt-8 lg:mt-0"
        >
          <SparkleStar
            className="absolute top-6 right-8 text-disney-pink/70"
            size="w-5 h-5"
            delay={0.5}
          />

          <span
            className="text-disney-pink font-sans font-extrabold text-[11px] tracking-widest uppercase block mb-4 mt-0.5"
            style={{ fontFamily: "'Manrope', 'Inter', sans-serif" }}
          >
            VIAJES DISNEY & UNIVERSAL
          </span>

          <h1 className="font-serif text-ink text-3xl sm:text-[35px] lg:text-[40px] font-medium leading-[1.12] tracking-normal mb-5">
            Tu viaje a Disney comienza{" "}
            <span className="text-disney-pink italic font-normal inline-block">
              mucho antes
            </span>{" "}
            de subir al avión
          </h1>

          <p className="font-sans text-ink-soft text-[14px] leading-relaxed mb-8 max-w-sm font-light">
            Planificamos cada detalle para que vivas la magia sin preocupaciones, desde el primer &ldquo;¿y si vamos?&rdquo; hasta el último día del viaje.
          </p>

          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onQuoteClick}
              className="bg-[#efa9c0] text-brand-white hover:bg-[#e08aa8] font-sans font-bold text-xs sm:text-[13px] tracking-wider uppercase px-10 py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-colors duration-300 shadow-sm cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-disney-pink/50 whitespace-nowrap"
            >
              <span>Cotizar mi viaje</span>
              <span className="text-white text-xs">✦</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onServicesClick}
              className="bg-brand-white text-[#efa9c0] border border-[#efa9c0] hover:bg-disney-pink-light/30 font-sans font-bold text-xs sm:text-[13px] tracking-wider uppercase px-10 py-3.5 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm cursor-pointer select-none focus:outline-none whitespace-nowrap"
            >
              Conocé nuestros servicios
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}