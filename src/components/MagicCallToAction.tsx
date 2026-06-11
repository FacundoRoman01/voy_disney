import React from "react";

interface MagicCallToActionProps {
  onQuoteClick: () => void;
}

const SparkleStar = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
  </svg>
);

export default function MagicCallToAction({ onQuoteClick }: MagicCallToActionProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-white px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-disney-pink-deep rounded-[32px] px-8 py-16 md:py-24 text-center shadow-lg border border-disney-pink-deeper/20">

          {/* Background ambience */}
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />

          {/* Estrellas estáticas — sin loop animate */}
          <SparkleStar className="absolute left-6 sm:left-12 lg:left-24 top-8 sm:top-12 lg:top-16 w-8 h-8 text-white/50" />
          <SparkleStar className="absolute right-6 sm:right-12 lg:right-24 bottom-8 sm:bottom-12 lg:bottom-16 w-6 h-6 text-white/40" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-white text-3xl sm:text-4xl lg:text-[49px] font-medium leading-[1.1] tracking-tight">
              La magia los está esperando
            </h2>

            <p className="font-sans text-white/90 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto px-2">
              No dejes el viaje de tus sueños para &ldquo;algún día&rdquo;. Escribinos hoy y empezá a planificarlo con quienes ya lo vivieron.
            </p>

            <div className="pt-4">
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-white text-disney-pink-deep font-sans text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer focus:outline-none select-none group"
              >
                <span>Cotizar mi viaje</span>
                <span className="text-disney-pink-deep text-sm transition-transform duration-300 group-hover:rotate-12">✦</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}