import React from "react";
import { motion } from "motion/react";

interface MagicCallToActionProps {
  onQuoteClick: () => void;
}

// Custom elegant 4-pointed star vector to match the design screenshot exactly
const SparkleStar = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.8, opacity: 0.3 }}
    animate={{ 
      scale: [0.8, 1.1, 0.8],
      opacity: [0.3, 0.9, 0.3]
    }}
    transition={{
      duration: 3 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
  </motion.svg>
);

export default function MagicCallToAction({ onQuoteClick }: MagicCallToActionProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-white px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-disney-pink-deep rounded-[32px] px-8 py-16 md:py-24 text-center shadow-lg border border-disney-pink-deeper/20"
        >
          {/* Elegant background gradients/ambience within the card */}
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />

          {/* Upper Left Sparkle Star */}
          <SparkleStar 
            className="absolute left-6 sm:left-12 lg:left-24 top-8 sm:top-12 lg:top-16 w-8 h-8 text-white/50" 
            delay={0}
          />

          {/* Bottom Right Sparkle Star */}
          <SparkleStar 
            className="absolute right-6 sm:right-12 lg:right-24 bottom-8 sm:bottom-12 lg:bottom-16 w-6 h-6 text-white/40" 
            delay={1.5}
          />

          {/* Main Content Card Wrapper */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            {/* Title */}
            <h2 className="font-serif text-white text-3xl sm:text-4xl lg:text-[49px] font-medium leading-[1.1] tracking-tight">
              La magia los está esperando
            </h2>

            {/* Subtitle / text */}
            <p className="font-sans text-white/90 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto px-2">
              No dejes el viaje de tus sueños para &ldquo;algún día&rdquo;. Escribinos hoy y empezá a planificarlo con quienes ya lo vivieron.
            </p>

            {/* Premium Pill Button with a tiny sparkle */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-white text-disney-pink-deep font-sans text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none select-none group"
              >
                <span>Cotizar mi viaje</span>
                <span className="text-disney-pink-deep text-sm transition-transform duration-300 group-hover:rotate-12">✦</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
